/**
 * Integração Astro: gera as telas (capas, faixas, abertura da home) e as imagens OG no início
 * do `astro dev`/`astro build`, em public/telas e public/og (fora do Git).
 *
 * - Determinístico: semente = slug (capas/OG) ou nome fixo (home, hubs, eixos).
 * - Incremental: um manifesto guarda a impressão digital de cada saída (versão do gerador +
 *   semente + título); só o que mudou é regerado.
 * - No build de produção, aplica a mesma regra do filtro `publicado` (src/lib/publicado.ts):
 *   texto com data futura ou com [CONFIRMAR] não ganha OG/capa, e sobras de um `dev` anterior
 *   são apagadas — nada de título não publicado vazando em /og.
 */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { telaSharp, capaComTitulo } from './render.mjs';
import { VERSAO } from './pincel.mjs';
import { CAPA, FAIXA, ABERTURA, QUALIDADE, caminhoTela, caminhoOg } from './config.mjs';

const EIXO_LABEL = { engenharia: 'Engenharia & IA', negocios: 'Negócios', bastidores: 'Bastidores' };
/** Faixas de abertura dos hubs: semente = nome da página. */
export const FAIXAS = ['insights', 'radar', 'newsletter', 'engenharia', 'negocios', 'bastidores'];

function frontmatter(arquivo) {
  const txt = fs.readFileSync(arquivo, 'utf8');
  const m = txt.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) return null;
  const campo = (k) => {
    const l = m[1].match(new RegExp(`^${k}:\\s*(.*)$`, 'm'));
    if (!l) return undefined;
    let v = l[1].trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1).replace(/\\"/g, '"');
    return v;
  };
  return { title: campo('title'), eixo: campo('eixo'), date: campo('date'), isExternal: campo('isExternal') === 'true', body: m[2] };
}

function lerColecao(raiz, colecao) {
  const dir = path.join(raiz, 'src/content', colecao);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => ({ colecao, id: f.replace(/\.md$/, ''), ...frontmatter(path.join(dir, f)) }));
}

const hoje = () => new Date().toLocaleDateString('en-CA', { timeZone: 'America/Campo_Grande' });

async function gravarResponsiva(pub, grupo, nome, semente, { proporcao, larguras, fallback }, saidas) {
  const maior = Math.max(...larguras);
  const base = await telaSharp({ semente, largura: maior, altura: Math.round(maior / proporcao) }).png().toBuffer();
  const sharp = (await import('sharp')).default;
  const tarefas = [];
  for (const w of larguras) {
    const h = Math.round(w / proporcao);
    for (const ext of ['avif', 'webp']) {
      const rel = caminhoTela(grupo, nome, w, ext);
      saidas.add(rel);
      const img = sharp(base).resize(w, h);
      tarefas.push((ext === 'avif' ? img.avif({ quality: QUALIDADE.avif, effort: 2 }) : img.webp({ quality: QUALIDADE.webp })).toFile(path.join(pub, rel)));
    }
  }
  const relJpg = caminhoTela(grupo, nome, fallback, 'jpg');
  saidas.add(relJpg);
  tarefas.push(sharp(base).resize(fallback, Math.round(fallback / proporcao)).jpeg({ quality: QUALIDADE.jpg, mozjpeg: true }).toFile(path.join(pub, relJpg)));
  await Promise.all(tarefas);
}

export async function gerarTelas({ raiz, producao, log = console.log }) {
  const pub = path.join(raiz, 'public');
  const manifestoArq = path.join(pub, 'telas', '.manifesto.json');
  let manifesto = {};
  try {
    manifesto = JSON.parse(fs.readFileSync(manifestoArq, 'utf8'));
  } catch {}
  const novo = {};
  const saidas = new Set();
  let geradas = 0;

  const corte = hoje();
  const entradas = [...lerColecao(raiz, 'insights'), ...lerColecao(raiz, 'radar')].filter(
    (e) => e.title && (!producao || (e.date <= corte && !e.body.includes('[CONFIRMAR')))
  );

  const jobs = [];
  const job = (chave, impressao, arquivos, fn) => {
    const digest = crypto.createHash('sha1').update(`v${VERSAO}|${impressao}`).digest('hex').slice(0, 12);
    novo[chave] = { digest, arquivos };
    arquivos.forEach((a) => saidas.add(a));
    const existe = arquivos.every((a) => fs.existsSync(path.join(pub, a)));
    if (manifesto[chave]?.digest === digest && existe) return;
    jobs.push(async () => {
      for (const a of arquivos) fs.mkdirSync(path.dirname(path.join(pub, a)), { recursive: true });
      await fn();
      geradas++;
    });
  };
  const listaResp = (grupo, nome, cfg) => [
    ...cfg.larguras.flatMap((w) => ['avif', 'webp'].map((ext) => caminhoTela(grupo, nome, w, ext))),
    caminhoTela(grupo, nome, cfg.fallback, 'jpg'),
  ];

  // Abertura da home
  job('home', ABERTURA.semente, [...listaResp('home', 'abertura', ABERTURA.larga), ...listaResp('home', 'abertura-m', ABERTURA.estreita)], async () => {
    const s = new Set();
    await gravarResponsiva(pub, 'home', 'abertura', ABERTURA.semente, ABERTURA.larga, s);
    await gravarResponsiva(pub, 'home', 'abertura-m', ABERTURA.semente, ABERTURA.estreita, s);
  });

  // OG padrão (home e páginas sem texto próprio): a tela da abertura + a tagline em faixa sólida
  job('og:padrao', ABERTURA.semente, [caminhoOg('site', 'padrao')], async () => {
    const img = await capaComTitulo({ semente: ABERTURA.semente, titulo: ABERTURA.semente });
    await img.jpeg({ quality: QUALIDADE.jpg, mozjpeg: true }).toFile(path.join(pub, caminhoOg('site', 'padrao')));
  });

  // Faixas dos hubs e dos eixos
  for (const nome of FAIXAS) {
    job(`faixa:${nome}`, nome, listaResp('faixa', nome, FAIXA), () => gravarResponsiva(pub, 'faixa', nome, nome, FAIXA, new Set()));
  }

  // Capas e OG por texto (semente = slug: estável mesmo se o título for revisado)
  for (const e of entradas) {
    job(`capa:${e.colecao}/${e.id}`, e.id, listaResp(e.colecao, e.id, CAPA), () => gravarResponsiva(pub, e.colecao, e.id, e.id, CAPA, new Set()));
    if (e.colecao === 'radar' && e.isExternal) continue; // item externo não tem página nem OG
    const og = caminhoOg(e.colecao, e.id);
    job(`og:${e.colecao}/${e.id}`, `${e.id}|${e.title}|${e.eixo}`, [og], async () => {
      const img = await capaComTitulo({ semente: e.id, titulo: e.title, rotulo: EIXO_LABEL[e.eixo] });
      await img.jpeg({ quality: QUALIDADE.jpg, mozjpeg: true }).toFile(path.join(pub, og));
    });
  }

  // Concorrência limitada: sharp já paraleliza internamente.
  const fila = [...jobs];
  await Promise.all(
    Array.from({ length: 4 }, async () => {
      while (fila.length) await fila.shift()();
    })
  );

  // Poda: no build de produção, tudo que não é saída esperada sai de public/telas e public/og.
  let podadas = 0;
  if (producao) {
    for (const raizPoda of ['telas', 'og']) {
      const dir = path.join(pub, raizPoda);
      if (!fs.existsSync(dir)) continue;
      for (const f of fs.readdirSync(dir, { recursive: true, withFileTypes: true })) {
        if (!f.isFile() || f.name.startsWith('.')) continue;
        const rel = '/' + path.relative(pub, path.join(f.parentPath ?? f.path, f.name)).split(path.sep).join('/');
        if (!saidas.has(rel)) {
          fs.rmSync(path.join(pub, rel));
          podadas++;
        }
      }
    }
  }

  fs.mkdirSync(path.dirname(manifestoArq), { recursive: true });
  fs.writeFileSync(manifestoArq, JSON.stringify(novo, null, 1));
  log(`telas: ${geradas} geradas, ${Object.keys(novo).length - geradas} em cache${podadas ? `, ${podadas} sobras removidas` : ''}`);
}

export default function telas() {
  return {
    name: 'gusflopes-telas',
    hooks: {
      'astro:config:setup': async ({ command, config, logger }) => {
        if (command !== 'dev' && command !== 'build' && command !== 'preview') return;
        if (command === 'preview') return;
        const raiz = new URL('.', config.root).pathname;
        await gerarTelas({ raiz, producao: command === 'build', log: (m) => logger.info(m) });
      },
    },
  };
}

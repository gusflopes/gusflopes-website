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
import os from 'node:os';
import { Worker } from 'node:worker_threads';
import { janelaRaw, capaComTitulo } from './render.mjs';
import { VERSAO, MATERIAL_PADRAO } from './pincel.mjs';
import { PAPEIS, ABERTURA, ARQUETIPO_FAIXA, QUALIDADE, caminhoTela, caminhoOg, paramsCapa, ARQUETIPO_CONVITE } from './config.mjs';

const EIXO_LABEL = { engenharia: 'Engenharia & IA', negocios: 'Negócios', bastidores: 'Bastidores' };
/** Faixas de abertura dos hubs: semente = nome da página. */
export const FAIXAS = ['insights', 'radar', 'engenharia', 'negocios', 'bastidores'];
/**
 * Telas com papel próprio fora dos textos: [grupo, nome, papel, semente]. Cada papel tem a sua
 * semente — nunca a mesma tela repetida como textura. Ver src/lib/telas.ts.
 */
export const TELAS_PAPEL = [
  // três estratos ao lado das três portas: a tela tem a estrutura da lista
  ['home', 'portas', 'capitulo', 'O que eu escrevo, e para quem', { arquetipo: 'faixas', bandas: 3, luz: 1.8 }],
  // o pintor chegando perto: o único close (2,5×) do site, uma corrente de vento vista de perto
  ['home', 'ferramenta', 'close', 'Simulador da Reforma Tributária', { arquetipo: 'vento' }],
  // a fala: ondas largas na tela de projeção do vídeo
  ['home', 'video', 'projecao', 'Vídeo em Destaque', { arquetipo: 'ondas' }],
  // a tela da newsletter (semente da capa no Substack): correntes que passam, 1:1
  ['marca', 'newsletter', 'convite', 'Radar de IA', { arquetipo: ARQUETIPO_CONVITE }],
  ['marca', 'newsletter-fita', 'fita', 'Radar de IA', { arquetipo: 'horizonte' }],
  ['marca', 'nao-encontrada', 'painel', 'nao-encontrada', { arquetipo: 'massas' }],
  // a fita do rodapé de toda página: do claro (o campo acima) para a noite (o rodapé)
  ['marca', 'rodape', 'rodape', 'gusflopes.dev', { arquetipo: 'faixas', degrade: true }],
];

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

/** Arquivos de uma janela: avif+webp em cada largura do srcset, jpg na largura 1×. */
export function arquivosJanela(grupo, nome, papel) {
  const out = [];
  for (const [jn, j] of Object.entries(PAPEIS[papel].janelas)) {
    if (!j.larguras) continue;
    for (const w of j.larguras) for (const ext of ['avif', 'webp']) out.push(caminhoTela(grupo, `${nome}-${jn}`, w, ext));
    out.push(caminhoTela(grupo, `${nome}-${jn}`, j.larguras[0], 'jpg'));
  }
  return out;
}

/**
 * Executa uma tarefa de geração (no processo principal ou num worker):
 * - `papel`: pinta cada janela do papel na maior largura e deriva as menores por redução;
 * - `og`: compõe tela + faixa sólida com o título (1200×630).
 */
export async function executar(t) {
  const sharp = (await import('sharp')).default;
  if (t.tipo === 'papel') {
    for (const [jn, j] of Object.entries(PAPEIS[t.papel].janelas)) {
      if (!j.larguras) continue;
      const maior = Math.max(...j.larguras);
      const r = janelaRaw({ semente: t.semente, papel: t.papel, janela: jn, larguraArquivo: maior, material: MATERIAL_PADRAO, params: t.params });
      const base = sharp(r.data, { raw: { width: r.width, height: r.height, channels: 3 } });
      const png = await base.png({ compressionLevel: 1 }).toBuffer();
      const tarefas = [];
      for (const w of j.larguras) {
        const h = Math.round((w * r.height) / r.width);
        const arq = (ext) => path.join(t.pub, caminhoTela(t.grupo, `${t.nome}-${jn}`, w, ext));
        const img = () => (w === maior ? sharp(png) : sharp(png).resize(w, h, { kernel: 'lanczos3' }));
        // acima de 1× o pixel é menor que o olho: qualidade mais baixa segura o peso sem perder a cerda
        const hi = w > j.larguras[0];
        tarefas.push(img().avif({ quality: hi ? QUALIDADE.avifHi : QUALIDADE.avif, effort: 2 }).toFile(arq('avif')));
        tarefas.push(img().webp({ quality: hi ? QUALIDADE.webpHi : QUALIDADE.webp }).toFile(arq('webp')));
        if (w === j.larguras[0]) tarefas.push(img().jpeg({ quality: QUALIDADE.jpg, mozjpeg: true }).toFile(arq('jpg')));
      }
      await Promise.all(tarefas);
    }
  } else if (t.tipo === 'og') {
    const img = await capaComTitulo({ semente: t.semente, titulo: t.titulo, rotulo: t.rotulo, params: t.params });
    await img.jpeg({ quality: QUALIDADE.jpg, mozjpeg: true }).toFile(t.arquivo);
  }
}

/** Fila de tarefas em workers (a pintura é CPU pura em JS; um worker por núcleo, até 4). */
async function rodarFila(tarefas) {
  const n = Math.max(1, Math.min(4, os.availableParallelism?.() ?? os.cpus().length, tarefas.length));
  if (n <= 1) {
    for (const t of tarefas) await executar(t);
    return;
  }
  const fila = [...tarefas];
  await Promise.all(
    Array.from({ length: n }, () => new Promise((ok, falha) => {
      const w = new Worker(new URL('./trabalhador.mjs', import.meta.url));
      const proxima = () => {
        const t = fila.shift();
        if (!t) {
          w.terminate().then(() => ok());
          return;
        }
        w.postMessage(t);
      };
      w.on('message', (m) => (m.erro ? (w.terminate(), falha(new Error(m.erro))) : proxima()));
      w.on('error', falha);
      proxima();
    }))
  );
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

  const corte = hoje();
  const entradas = [...lerColecao(raiz, 'insights'), ...lerColecao(raiz, 'radar')].filter(
    (e) => e.title && (!producao || (e.date <= corte && !e.body.includes('[CONFIRMAR')))
  );

  const tarefas = [];
  const job = (chave, impressao, arquivos, tarefa) => {
    const digest = crypto.createHash('sha1').update(`v${VERSAO}|${MATERIAL_PADRAO}|${JSON.stringify(QUALIDADE)}|${JSON.stringify(PAPEIS[tarefa.papel] ?? PAPEIS.capa)}|${impressao}`).digest('hex').slice(0, 12);
    novo[chave] = { digest, arquivos };
    arquivos.forEach((a) => saidas.add(a));
    const existe = arquivos.every((a) => fs.existsSync(path.join(pub, a)));
    if (manifesto[chave]?.digest === digest && existe) return;
    for (const a of arquivos) fs.mkdirSync(path.dirname(path.join(pub, a)), { recursive: true });
    tarefas.push(tarefa);
  };
  const papel = (chave, grupo, nome, papelNome, semente, params = {}) =>
    job(chave, `${semente}|${JSON.stringify(params)}`, arquivosJanela(grupo, nome, papelNome), { tipo: 'papel', pub, grupo, nome, papel: papelNome, semente, params });

  // Abertura da home
  papel('home', 'home', 'abertura', 'abertura', ABERTURA.semente, ABERTURA.params);

  // Telas com papel próprio na home: cada uma com sua semente (nunca a mesma tela repetida).
  for (const [grupo, nome, p, semente, params] of TELAS_PAPEL) papel(`${grupo}:${nome}`, grupo, nome, p, semente, params);

  // OG padrão (home e páginas sem texto próprio): a tagline em faixa sólida sob a tela
  const ogPadrao = caminhoOg('site', 'padrao');
  job('og:padrao', ABERTURA.semente, [ogPadrao], { tipo: 'og', arquivo: path.join(pub, ogPadrao), semente: ABERTURA.semente, titulo: ABERTURA.semente });

  // Faixas dos hubs e dos eixos
  for (const nome of FAIXAS) papel(`faixa:${nome}`, 'faixa', nome, 'faixa', nome, ARQUETIPO_FAIXA[nome] ? { arquetipo: ARQUETIPO_FAIXA[nome] } : {});

  // Capas e OG por texto (semente = slug: estável mesmo se o título for revisado)
  for (const e of entradas) {
    papel(`capa:${e.colecao}/${e.id}`, e.colecao, e.id, 'capa', e.id, paramsCapa(e.eixo));
    if (e.colecao === 'radar' && e.isExternal) continue; // item externo não tem página nem OG
    const og = caminhoOg(e.colecao, e.id);
    job(`og:${e.colecao}/${e.id}`, `${e.id}|${e.title}|${e.eixo}`, [og], { tipo: 'og', arquivo: path.join(pub, og), semente: e.id, titulo: e.title, rotulo: EIXO_LABEL[e.eixo], params: paramsCapa(e.eixo) });
  }

  const t0 = Date.now();
  await rodarFila(tarefas);
  const geradas = tarefas.length;

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
  log(`telas: ${geradas} geradas em ${((Date.now() - t0) / 1000).toFixed(1)} s, ${Object.keys(novo).length - geradas} em cache${podadas ? `, ${podadas} sobras removidas` : ''}`);
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

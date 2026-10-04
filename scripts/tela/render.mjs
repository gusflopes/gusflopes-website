/**
 * Rasterização das telas (sharp/librsvg) e composições com texto: OG 1200×630 e capas do Substack.
 * O texto entra sempre numa faixa sólida, nunca sobre a textura.
 */
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import sharp from 'sharp';
import { telaSvg, CORES } from './pincel.mjs';
import { woffParaSfnt } from './woff.mjs';

const require = createRequire(import.meta.url);

/** Fontes estáticas do @fontsource (WOFF 1) convertidas para TTF num cache local. */
const FONTES = {
  literata: { pacote: '@fontsource/literata', arquivo: (p) => `literata-latin-${p}-normal.woff`, nome: { 400: 'Literata', 500: 'Literata Medium', 600: 'Literata SemiBold', 700: 'Literata Bold' } },
  hanken: { pacote: '@fontsource/hanken-grotesk', arquivo: (p) => `hanken-grotesk-latin-${p}-normal.woff`, nome: { 400: 'Hanken Grotesk', 500: 'Hanken Grotesk Medium', 600: 'Hanken Grotesk SemiBold', 700: 'Hanken Grotesk Bold' } },
};
const CACHE = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../../node_modules/.cache/gusflopes-telas');

function fonte(familia, peso) {
  const f = FONTES[familia];
  const dir = path.join(CACHE, 'fontes');
  const ttf = path.join(dir, `${familia}-${peso}.ttf`);
  if (!fs.existsSync(ttf)) {
    const pkg = path.dirname(require.resolve(`${f.pacote}/package.json`));
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(ttf, woffParaSfnt(fs.readFileSync(path.join(pkg, 'files', f.arquivo(peso)))));
  }
  // vírgula final: o Pango lê o nome inteiro como família ("Literata SemiBold"), sem tratar "SemiBold" como peso
  return { arquivo: ttf, descricao: `${f.nome[peso]},` };
}

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Texto → PNG transparente (Pango). `px` é o tamanho em pixels (dpi 72). */
// A altura natural da linha da Literata/Hanken no Pango é ~1,25 × o corpo; line_height é fator sobre ela.
export async function texto({ conteudo, familia = 'literata', peso = 600, px = 48, cor = '#ffffff', largura, entrelinha = 1.15, espacamento = 0, alinhamento = 'left' }) {
  const f = fonte(familia, peso);
  const ls = espacamento ? ` letter_spacing="${Math.round(espacamento * px * 1024)}"` : '';
  const { data, info } = await sharp({
    text: {
      text: `<span foreground="${cor}" font_size="${px}pt" line_height="${(entrelinha / 1.25).toFixed(3)}"${ls}>${esc(conteudo)}</span>`,
      font: f.descricao,
      fontfile: f.arquivo,
      width: largura,
      dpi: 72,
      rgba: true,
      align: alinhamento,
      wrap: 'word',
    },
  })
    .png()
    .toBuffer({ resolveWithObject: true });
  return { input: data, width: info.width, height: info.height };
}

/** Título que cabe em `maxLinhas`: tenta tamanhos decrescentes. */
export async function tituloQueCabe({ conteudo, largura, tamanhos, maxLinhas, ...rest }) {
  for (const px of tamanhos) {
    const t = await texto({ conteudo, largura, px, ...rest });
    if (t.height <= px * (rest.entrelinha ?? 1.15) * maxLinhas + px * 0.5) return { ...t, px };
  }
  const px = tamanhos.at(-1);
  return { ...(await texto({ conteudo, largura, px, ...rest })), px };
}

/** Tela rasterizada (Buffer sharp) no tamanho pedido. */
export function telaSharp({ semente, largura, altura, params }) {
  const svg = telaSvg({ semente, proporcao: largura / altura, largura, params });
  return sharp(Buffer.from(svg)).resize(largura, altura);
}

/**
 * Composição "tela + faixa sólida com título" — OG do site (faixa azul-escuro) e capa do
 * Substack (faixa papel). O fio laranja separa a pintura da faixa, como na home.
 */
export async function capaComTitulo({ semente, titulo, rotulo, largura = 1200, altura = 630, tema = 'noite', assinatura = 'gusflopes.dev' }) {
  const claro = tema === 'papel';
  const fundo = claro ? '#F2F4F7' : CORES.noite;
  const corTitulo = claro ? CORES.noite : '#F5F7FA';
  const corRotulo = claro ? '#C2410C' : CORES.laranjaClaro;
  const corAssin = claro ? '#3D4E68' : CORES.nevoa;
  const s = largura / 1200;
  const margem = Math.round(64 * s);
  const fio = Math.max(4, Math.round(5 * s));
  const alturaTela = Math.round(altura * 0.4);
  const larguraTexto = largura - margem * 2;

  const [tela, rot, tit, ass] = await Promise.all([
    telaSharp({ semente, largura, altura: alturaTela }).png().toBuffer(),
    rotulo ? texto({ conteudo: rotulo.toUpperCase(), familia: 'hanken', peso: 700, px: Math.round(21 * s), cor: corRotulo, espacamento: 0.12 }) : null,
    tituloQueCabe({ conteudo: titulo, largura: larguraTexto, tamanhos: [58, 52, 46, 40].map((n) => Math.round(n * s)), maxLinhas: 3, familia: 'literata', peso: 600, cor: corTitulo, entrelinha: 1.12 }),
    texto({ conteudo: assinatura, familia: 'hanken', peso: 600, px: Math.round(22 * s), cor: corAssin }),
  ]);

  const topoFaixa = alturaTela + fio;
  const camadas = [
    { input: tela, top: 0, left: 0 },
    { input: { create: { width: largura, height: fio, channels: 4, background: CORES.laranja } }, top: alturaTela, left: 0 },
  ];
  // bloco de texto centrado verticalmente na faixa, assinatura ancorada embaixo
  const gap = Math.round(18 * s);
  const baseAssin = altura - margem * 0.75 - ass.height;
  const blocoAltura = (rot ? rot.height + gap : 0) + tit.height;
  let y = Math.round(topoFaixa + Math.max(margem * 0.6, (baseAssin - topoFaixa - blocoAltura) / 2 - gap / 2));
  if (rot) {
    camadas.push({ input: rot.input, top: y, left: margem });
    y += rot.height + gap;
  }
  camadas.push({ input: tit.input, top: y, left: margem });
  camadas.push({ input: ass.input, top: Math.round(baseAssin), left: margem });

  return sharp({ create: { width: largura, height: altura, channels: 4, background: fundo } }).composite(camadas);
}

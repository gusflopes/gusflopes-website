// Utilitários do kit Substack (sistema "Evolução"): texto → contornos SVG com as fontes
// self-hosted do site, para que logo, wordmark e capas não dependam de fonte instalada.
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { create } from 'fontkitten';
import { createRequire } from 'node:module';
const { decompress } = createRequire(import.meta.url)('wawoff2');

const RAIZ = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
export const raiz = (...p) => resolve(RAIZ, ...p);

export const COR = {
  noite: '#0B1A33',
  noite2: '#13284D',
  fio: '#22385C',
  laranja: '#F97316',
  laranjaFundo: '#C2410C',
  laranjaClaro: '#FB923C',
  ceu: '#8FB3D9',
  nevoa: '#C9D6E6',
  papel: '#F2F4F7',
  marca: '#E4EBF3', // o branco-azulado do logo original
};

export const QUADRO = raiz('src/assets/326189a758fea0fe0e2da42349b6da943b29ba51.png');

// O fontkitten só aplica eixos variáveis em TTF: o WOFF2 do @fontsource é descompactado antes (wawoff2).
const cache = new Map();
async function ttf(arq) {
  if (!cache.has(arq)) {
    const woff2 = readFileSync(raiz('node_modules/@fontsource-variable', arq));
    cache.set(arq, Buffer.from(await decompress(woff2)));
  }
  return cache.get(arq);
}
const fonte = (arq, vari) => create(cacheSync.get(arq)).getVariation(vari);
const cacheSync = new Map();
const ARQ_LITERATA = 'literata/files/literata-latin-opsz-normal.woff2';
const ARQ_HANKEN = 'hanken-grotesk/files/hanken-grotesk-latin-wght-normal.woff2';
for (const arq of [ARQ_LITERATA, ARQ_HANKEN]) cacheSync.set(arq, await ttf(arq));

export const literata = (wght = 600, opsz = 72) => fonte(ARQ_LITERATA, { wght, opsz });
export const hanken = (wght = 700) => fonte(ARQ_HANKEN, { wght });
/** Largura do texto em px no tamanho dado (soma de avanços, com tracking em em). */
export function largura(font, texto, size, tracking = 0) {
  const s = size / font.unitsPerEm;
  return font.glyphsForString(texto).reduce((w, g) => w + g.advanceWidth * s + tracking * size, 0) - tracking * size;
}

/** Contorno SVG (atributo d) do texto com a linha de base em (x, y). */
export function caminho(font, texto, x, y, size, tracking = 0) {
  const s = size / font.unitsPerEm;
  let cx = x;
  let d = '';
  for (const g of font.glyphsForString(texto)) {
    d += g.path.scale(s, -s).translate(cx, y).toSVG();
    cx += g.advanceWidth * s + tracking * size;
  }
  return d;
}

/** Quebra o texto em linhas que caibam em `max` px. */
export function quebrar(font, texto, size, max, tracking = 0) {
  const linhas = [];
  let atual = '';
  for (const palavra of texto.split(/\s+/)) {
    const tentativa = atual ? `${atual} ${palavra}` : palavra;
    if (atual && largura(font, tentativa, size, tracking) > max) {
      linhas.push(atual);
      atual = palavra;
    } else atual = tentativa;
  }
  if (atual) linhas.push(atual);
  return linhas;
}

/**
 * Wordmark "gusflopes.dev" (Hanken 800, ponto em laranja) como grupo SVG.
 * Retorna { svg, w, h } com origem no canto superior esquerdo.
 */
export function wordmark(size, tinta) {
  const f = hanken(800);
  const tr = -0.02;
  const a = 'gusflopes';
  const wa = largura(f, a, size, tr);
  const wp = largura(f, '.', size, tr);
  const asc = (f.ascent / f.unitsPerEm) * size;
  const y = asc * 0.86;
  const svg =
    `<path fill="${tinta}" d="${caminho(f, a, 0, y, size, tr)}"/>` +
    `<path fill="${COR.laranja}" d="${caminho(f, '.', wa + tr * size, y, size, tr)}"/>` +
    `<path fill="${tinta}" d="${caminho(f, 'dev', wa + wp + 2 * tr * size, y, size, tr)}"/>`;
  const w = wa + wp + largura(f, 'dev', size, tr) + 2 * tr * size;
  const desc = (Math.abs(f.descent) / f.unitsPerEm) * size;
  return { svg, w, h: y + desc * 0.9 };
}

/**
 * Monograma: o "G" do logo original com o quadrado laranja em cima e o ponto laranja embaixo,
 * redesenhado em vetor com Hanken Grotesk 800.
 */
export function monograma(size, tinta) {
  const f = hanken(800);
  const g = f.glyphsForString('G')[0];
  const s = size / f.unitsPerEm;
  const cap = (f.capHeight / f.unitsPerEm) * size;
  const bb = g.bbox;
  const gw = (bb.maxX - bb.minX) * s;
  const x = -bb.minX * s;
  const topo = cap * 0.34; // espaço do quadrado acima do G
  const y = topo + cap;
  const sq = cap * 0.2;
  const ponto = cap * 0.11;
  const svg =
    `<rect fill="${COR.laranja}" x="${gw * 0.36}" y="0" width="${sq * 1.45}" height="${sq}"/>` +
    `<path fill="${tinta}" d="${g.path.scale(s, -s).translate(x, y).toSVG()}"/>` +
    `<circle fill="${COR.laranja}" cx="${gw * 0.5}" cy="${y + ponto * 2.6}" r="${ponto}"/>`;
  return { svg, w: gw, h: y + ponto * 3.6 };
}

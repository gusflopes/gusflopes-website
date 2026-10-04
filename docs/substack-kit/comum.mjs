/**
 * Base comum do kit Substack (direção "Metrô Noturno"): paleta, fontes e o quadro.
 * As fontes vêm dos pacotes @fontsource-variable do próprio site (woff2), expostas ao
 * librsvg do sharp por um fonts.conf temporário — por isso o sharp é importado depois.
 */
import { mkdtempSync, writeFileSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export const AQUI = dirname(fileURLToPath(import.meta.url));
export const RAIZ = resolve(AQUI, '../..');

// O freetype embutido no sharp não lê woff2: descomprime para TTF numa pasta temporária.
const conf = mkdtempSync(join(tmpdir(), 'kit-fontes-'));
const { decompress } = (await import('wawoff2')).default;
for (const [pkg, arq] of [
  ['hanken-grotesk', 'hanken-grotesk-latin-wght-normal'],
  ['source-serif-4', 'source-serif-4-latin-opsz-normal'],
]) {
  const woff2 = readFileSync(`${RAIZ}/node_modules/@fontsource-variable/${pkg}/files/${arq}.woff2`);
  writeFileSync(join(conf, `${arq}.ttf`), await decompress(woff2));
}
writeFileSync(
  join(conf, 'fonts.conf'),
  `<?xml version="1.0"?><!DOCTYPE fontconfig SYSTEM "fonts.dtd"><fontconfig>
  <dir>${conf}</dir>
  <dir>/usr/share/fonts</dir>
  <cachedir>${conf}/cache</cachedir>
</fontconfig>`
);
process.env.FONTCONFIG_FILE = join(conf, 'fonts.conf');

export const sharp = (await import('sharp')).default;

export const COR = {
  noite: '#0B1A33',
  noite2: '#13284D',
  trilho: '#24406B',
  luz: '#EEF2F8',
  nevoa: '#A9BCD3',
  laranja: '#F97316',
  laranjaClaro: '#FB923C',
  ambar: '#FDBA74',
  ceu: '#8FB3D9',
  papel: '#F2F4F7',
  brasa: '#1C0A02',
};

/** Linhas da rede. Os três eixos espelham src/lib/linhas.ts; Radar e Newsletter são serviço tracejado. */
export const LINHAS = {
  engenharia: { rotulo: 'Engenharia & IA', cor: COR.laranja },
  negocios: { rotulo: 'Negócios', cor: COR.ceu },
  bastidores: { rotulo: 'Bastidores', cor: COR.ambar },
  radar: { rotulo: 'Radar', cor: COR.laranjaClaro, tracejado: true },
  newsletter: { rotulo: 'Newsletter', cor: COR.laranja, tracejado: true },
};

export const SANS = "'Hanken Grotesk'";
export const QUADRO = join(RAIZ, 'src/assets/326189a758fea0fe0e2da42349b6da943b29ba51.png');

export const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Quebra o título em linhas por estimativa de largura (Hanken 800 ≈ 0,52 em por caractere). */
export function quebrar(texto, tamanho, largura) {
  const max = Math.max(8, Math.floor(largura / (tamanho * 0.52)));
  const linhas = [];
  let atual = '';
  for (const p of texto.split(/\s+/)) {
    if ((atual + ' ' + p).trim().length > max && atual) {
      linhas.push(atual);
      atual = p;
    } else atual = (atual + ' ' + p).trim();
  }
  if (atual) linhas.push(atual);
  return linhas;
}

/**
 * O quadro apagado no topo: redimensionado para cobrir, com alfa em degradê
 * (opacidade máxima `op`, some até `fim` da altura). Nunca atrás do texto.
 */
export async function quadroApagado(w, h, { op = 0.3, fim = 0.6 } = {}) {
  const base = await sharp(QUADRO).resize(w, h, { fit: 'cover', position: 'top' }).ensureAlpha().toBuffer();
  const mascara = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#fff" stop-opacity="${op}"/><stop offset="${fim}" stop-color="#fff" stop-opacity="0"/></linearGradient></defs>
      <rect width="${w}" height="${h}" fill="url(#g)"/></svg>`
  );
  return sharp(base).composite([{ input: mascara, blend: 'dest-in' }]).png().toBuffer();
}

/** Marca: duas linhas (tecnologia em laranja, negócio em azul-céu) e a estação de baldeação. */
export function marcaSvg(tam = 512, { fundo = true } = {}) {
  const c = tam / 2;
  const e = tam * 0.086; // espessura da linha
  const r = tam * 0.115;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${tam}" height="${tam}" viewBox="0 0 ${tam} ${tam}">
  ${fundo ? `<rect width="${tam}" height="${tam}" rx="${tam * 0.18}" fill="${COR.noite}"/>` : ''}
  <path d="M${tam * 0.12} ${c} H${tam * 0.88}" stroke="${COR.laranja}" stroke-width="${e}" stroke-linecap="round"/>
  <path d="M${c} ${tam * 0.12} V${tam * 0.88}" stroke="${COR.ceu}" stroke-width="${e}" stroke-linecap="round"/>
  <circle cx="${c}" cy="${c}" r="${r}" fill="${COR.noite}" stroke="${COR.luz}" stroke-width="${tam * 0.05}"/>
</svg>`;
}

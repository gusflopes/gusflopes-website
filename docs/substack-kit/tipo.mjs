// Tipo em curvas para os rasters do kit: lê o Archivo / Source Serif 4 variáveis que o site já
// usa (pacotes @fontsource-variable), descomprime o WOFF2 e converte texto em <path> SVG.
// Assim o PNG sai idêntico em qualquer máquina, sem depender de fonte instalada.
import fs from 'node:fs';
import { createRequire } from 'node:module';
import { create } from 'fontkitten';
import wawoff from 'wawoff2';

const require = createRequire(import.meta.url);
const cache = new Map();

async function base(arquivo) {
  if (!cache.has(arquivo)) {
    const ttf = Buffer.from(await wawoff.decompress(fs.readFileSync(require.resolve(arquivo))));
    cache.set(arquivo, create(ttf));
  }
  return cache.get(arquivo);
}

/** Fonte numa instância (eixos variáveis) com medição e desenho. */
export async function fonte(familia, eixos, tracking = 0) {
  const arquivo =
    familia === 'serif'
      ? '@fontsource-variable/source-serif-4/files/source-serif-4-latin-wght-normal.woff2'
      : '@fontsource-variable/archivo/files/archivo-latin-wdth-normal.woff2';
  const f = (await base(arquivo)).getVariation(eixos);
  const upm = f.unitsPerEm;
  const glifo = (ch) => f.glyphForCodePoint(ch.codePointAt(0));
  return {
    largura(texto, tam) {
      let w = 0;
      for (const ch of texto) w += glifo(ch).advanceWidth / upm + tracking;
      return w * tam;
    },
    /** d de um <path> com o texto, linha de base em y. */
    caminho(texto, tam, x, y) {
      const s = tam / upm;
      let cx = x;
      let d = '';
      for (const ch of texto) {
        const g = glifo(ch);
        d += g.path.transform(s, 0, 0, -s, cx, y).toSVG();
        cx += g.advanceWidth * s + tracking * tam;
      }
      return d;
    },
    /** Altura da maiúscula, em fração do corpo. */
    capHeight: (f.capHeight || 0.7 * upm) / upm,
  };
}

/** Quebra de texto corrido por largura. */
export function quebrar(f, texto, tam, max) {
  const linhas = [];
  let atual = '';
  for (const p of texto.split(/\s+/)) {
    const teste = atual ? `${atual} ${p}` : p;
    if (f.largura(teste, tam) > max && atual) {
      linhas.push(atual);
      atual = p;
    } else atual = teste;
  }
  if (atual) linhas.push(atual);
  return linhas;
}

export const COR = {
  azul: '#0B1A33',
  azul2: '#13284D',
  azul3: '#1D3866',
  papel: '#F2F4F7',
  laranja: '#F97316',
  // texto e ícone sobre laranja: azul-escuro da marca (6,19:1 sobre #F97316), nunca quase-preto
  tintaLaranja: '#0B1A33',
  laranjaFundo: '#C2410C',
  ceu: '#8FB3D9',
  ceuClaro: '#B7C6DA',
};

export const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

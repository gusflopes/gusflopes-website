// Gera src/lib/abertura-metricas.json: larguras de avanço (unidades de 1000/em) das instâncias
// de display do Archivo variável (wght 900/wdth 100 e a estreita wght 850/wdth 62, cada uma com a linha leve em wght 100) — a mesma que o CSS usa nas aberturas.
// Com isso a quebra e a escala das aberturas tipográficas são calculadas no build, sem JS no cliente.
// Uso: node scripts/gerar-metricas-abertura.mjs
import fs from 'node:fs';
import { createRequire } from 'node:module';
import { create } from 'fontkitten';
import wawoff from 'wawoff2';

const require = createRequire(import.meta.url);
const arquivo = require.resolve('@fontsource-variable/archivo/files/archivo-latin-wdth-normal.woff2');
const ttf = Buffer.from(await wawoff.decompress(fs.readFileSync(arquivo)));
const base = create(ttf);
const fonte = base.getVariation({ wght: 900, wdth: 100 });
// Segunda instância: a "estreita" (wght 850, wdth 62), para aberturas de seção que precisam
// de outra textura sem sair da família (mesmo desenho, outra largura).
const estreita = base.getVariation({ wght: 850, wdth: 62 });
// Linha leve do par 900/100: o mesmo desenho no peso 100, em cada largura.
const leve = base.getVariation({ wght: 100, wdth: 100 });
const estreitaLeve = base.getVariation({ wght: 100, wdth: 62 });

const chars =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZÁÀÂÃÄÉÈÊËÍÌÎÏÓÒÔÕÖÚÙÛÜÇÑ0123456789 .,:;!?-–—()[]\'"“”‘’&/+#%@_*';
const medir = (f) => {
  const out = {};
  for (const ch of chars) out[ch] = Math.round(f.glyphForCodePoint(ch.codePointAt(0)).advanceWidth);
  return out;
};
const larguras = medir(fonte);
const saida = {
  instancia: { wght: 900, wdth: 100 },
  upm: fonte.unitsPerEm,
  padrao: 760,
  larguras,
  leve: { instancia: { wght: 100, wdth: 100 }, padrao: 680, larguras: medir(leve) },
  estreita: {
    instancia: { wght: 850, wdth: 62 },
    padrao: 500,
    larguras: medir(estreita),
    leve: { instancia: { wght: 100, wdth: 62 }, padrao: 440, larguras: medir(estreitaLeve) },
  },
};
fs.writeFileSync(new URL('../src/lib/abertura-metricas.json', import.meta.url), JSON.stringify(saida, null, 1) + '\n');
console.log('ok', Object.keys(larguras).length, 'glifos');

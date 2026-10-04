// Gera src/lib/abertura-metricas.json: larguras de avanço (unidades de 1000/em) da instância
// de display do Archivo variável (wght 900, wdth 100) — a mesma que o CSS usa nas aberturas.
// Com isso a quebra e a escala das aberturas tipográficas são calculadas no build, sem JS no cliente.
// Uso: node scripts/gerar-metricas-abertura.mjs
import fs from 'node:fs';
import { createRequire } from 'node:module';
import { create } from 'fontkitten';
import wawoff from 'wawoff2';

const require = createRequire(import.meta.url);
const arquivo = require.resolve('@fontsource-variable/archivo/files/archivo-latin-wdth-normal.woff2');
const ttf = Buffer.from(await wawoff.decompress(fs.readFileSync(arquivo)));
const fonte = create(ttf).getVariation({ wght: 900, wdth: 100 });

const chars =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZÁÀÂÃÄÉÈÊËÍÌÎÏÓÒÔÕÖÚÙÛÜÇÑ0123456789 .,:;!?-–—()[]\'"“”‘’&/+#%@_*';
const larguras = {};
for (const ch of chars) {
  const g = fonte.glyphForCodePoint(ch.codePointAt(0));
  larguras[ch] = Math.round(g.advanceWidth);
}
const saida = { instancia: { wght: 900, wdth: 100 }, upm: fonte.unitsPerEm, padrao: 760, larguras };
fs.writeFileSync(new URL('../src/lib/abertura-metricas.json', import.meta.url), JSON.stringify(saida, null, 1) + '\n');
console.log('ok', Object.keys(larguras).length, 'glifos');

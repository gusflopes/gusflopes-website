/**
 * Capa de post do Substack: a tela gerada (semente = título) + título em faixa sólida clara,
 * com o fio laranja — o mesmo gerador das capas e OGs do site (scripts/tela/).
 *
 * Uso:  node docs/substack-kit/gerar-capa.mjs "Título do post" [eixo] [pasta-de-saída]
 *       eixo: engenharia | negocios | bastidores | radar   (default: radar → "Radar de IA")
 * Saída: <slug>-1456x816.png (capa do post) e <slug>-1200x630.png (prévia social).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { capaComTitulo } from '../../scripts/tela/render.mjs';

const ROTULOS = { engenharia: 'Engenharia & IA', negocios: 'Negócios', bastidores: 'Bastidores', radar: 'Radar de IA' };
const [titulo, eixo = 'radar', saida = path.join(path.dirname(fileURLToPath(import.meta.url)), 'exemplos')] = process.argv.slice(2);
if (!titulo || !ROTULOS[eixo]) {
  console.error('Uso: node docs/substack-kit/gerar-capa.mjs "Título" [engenharia|negocios|bastidores|radar] [pasta]');
  process.exit(1);
}
const slug = titulo.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60);
fs.mkdirSync(saida, { recursive: true });
for (const [w, h] of [[1456, 816], [1200, 630]]) {
  const img = await capaComTitulo({ semente: titulo, titulo, rotulo: ROTULOS[eixo], largura: w, altura: h, tema: 'papel' });
  const arq = path.join(saida, `${slug}-${w}x${h}.png`);
  await img.png({ compressionLevel: 9 }).toFile(arq);
  console.log(arq);
}

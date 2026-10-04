/**
 * Estudo de calibragem do MATERIAL das pinceladas: chapado × cerda × empasto, mesma semente,
 * nos tamanhos reais de exibição (abertura da home a 1366, faixa de hub a 1366, card no celular a
 * 358), com um recorte do quadro da marca em 100% para comparar.
 * Uso: node scripts/tela/estudo.mjs  → docs/design-review/estudo-pinceladas.png
 */
import fs from 'node:fs';
import sharp from 'sharp';
import { janelaRaw, texto } from './render.mjs';
import { PAPEIS } from './config.mjs';

export const MATERIAIS_ESTUDO = [
  { id: 'chapado', nome: 'Chapado', nota: 'polígono afinado de cor única: a forma certa, mas ainda lê como vetor recortado' },
  { id: 'cerda', nome: 'Cerda', nota: '2–4 sub-estrias de cerda, entrada carregada, saída seca: já é tinta, mas plana' },
  { id: 'empasto', nome: 'Empasto (escolhido)', nota: 'cerda + relevo de cada traço sob luz rasante: a tinta tem corpo, como no quadro' },
];

const SEMENTE = 'agent-skills-pacotes-de-contexto';
const M = 40;
const W = 1366 + 2 * M;
const COR = '#0B1A33';
const COR2 = '#3D4E68';

const raw = (r) => sharp(r.data, { raw: { width: r.width, height: r.height, channels: 3 } });
async function janela(papel, jn, largura, altura, material) {
  const j = PAPEIS[papel].janelas[jn];
  const r = janelaRaw({ semente: SEMENTE, papel, janela: jn, larguraArquivo: largura, material });
  // a janela é pintada exatamente na largura de exibição e recortada ao centro na altura exibida
  const h = Math.round((largura * j.h) / j.w);
  const top = Math.max(0, Math.round((h - altura) / 2));
  return raw(r).extract({ left: 0, top, width: largura, height: Math.min(altura, h) }).png().toBuffer();
}

const camadas = [];
let y = M;
const rotulo = async (txt, px = 26, cor = COR, peso = 600) => {
  const t = await texto({ conteudo: txt, familia: 'hanken', peso, px, cor, largura: W - 2 * M });
  camadas.push({ input: t.input, left: M, top: y });
  y += t.height + 10;
};

await rotulo('Estudo de material das telas: chapado × cerda × empasto', 34);
await rotulo(`Mesma semente (${SEMENTE}), escala de traço fixa em px de tela, cada formato no tamanho em que é exibido.`, 19, COR2, 400);
y += 16;

// 1. Abertura da home, 1366×428 (1366×900 menos cabeçalho e faixa do título)
for (const mt of MATERIAIS_ESTUDO) {
  await rotulo(`Abertura da home a 1366 px · ${mt.nome}`, 21);
  camadas.push({ input: await janela('abertura', 'larga', W - 2 * M, 300, mt.id), left: M, top: y });
  y += 300 + 8;
  await rotulo(mt.nota, 17, COR2, 400);
  y += 14;
}
// 2. Faixa de hub a 1366 (6:1)
for (const mt of MATERIAIS_ESTUDO) {
  await rotulo(`Faixa de hub a 1366 px · ${mt.nome}`, 21);
  const h = Math.round((W - 2 * M) / 6);
  camadas.push({ input: await janela('faixa', 'larga', W - 2 * M, h, mt.id), left: M, top: y });
  y += h + 20;
}
// 3. Card no celular (358×201) ao lado de um recorte do quadro em 100%
await rotulo('Card no celular a 358 px, e o quadro da marca em 100% para comparar', 21);
const cw = 358;
const ch = 201;
let x = M;
for (const mt of MATERIAIS_ESTUDO) {
  camadas.push({ input: await janela('capa', 'recorte', cw, ch, mt.id), left: x, top: y });
  const t = await texto({ conteudo: mt.nome, familia: 'hanken', peso: 600, px: 16, cor: COR2 });
  camadas.push({ input: t.input, left: x, top: y + ch + 8 });
  x += cw + 14;
}
const quadro = await sharp('src/assets/326189a758fea0fe0e2da42349b6da943b29ba51.png').extract({ left: 1500, top: 430, width: cw - 60, height: ch }).png().toBuffer();
camadas.push({ input: quadro, left: x, top: y });
const tq = await texto({ conteudo: 'Quadro (100%)', familia: 'hanken', peso: 600, px: 16, cor: COR2 });
camadas.push({ input: tq.input, left: x, top: y + ch + 8 });
y += ch + 50;

fs.mkdirSync('docs/design-review', { recursive: true });
await sharp({ create: { width: W, height: y + M, channels: 3, background: '#F2F4F7' } })
  .composite(camadas)
  .png({ palette: true, quality: 92, effort: 8 })
  .toFile('docs/design-review/estudo-pinceladas.png');
console.log('docs/design-review/estudo-pinceladas.png');

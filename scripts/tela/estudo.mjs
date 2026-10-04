/**
 * Estudo de calibragem das pinceladas: 4 variações de parâmetros, mesma semente, lado a lado.
 * Uso: node scripts/tela/estudo.mjs  → docs/design-review/estudo-pinceladas.png
 */
import fs from 'node:fs';
import sharp from 'sharp';
import { telaSharp, texto } from './render.mjs';

export const VARIACOES = [
  { id: 'A', nome: 'A · Maquete', nota: 'traço fino e uniforme, 6 luzes, ruído alto: textura de filtro', params: { densidade: 0.75, espessura: 0.7, redemoinho: 0.3, ruido: 1.1, luzes: 6, realce: 1.7 } },
  { id: 'B', nome: 'B · Contida', nota: 'pouco redemoinho, quase sem realce: some na tela, vira papel de parede', params: { densidade: 0.8, espessura: 1.35, redemoinho: 0.2, ruido: 0.3, luzes: 1, realce: 0.35 } },
  { id: 'C', nome: 'C · Equilíbrio (escolhida)', nota: 'redemoinho deslocado + ruído suave, 3 luzes, realce no anel', params: {} },
  { id: 'D', nome: 'D · Redemoinho forte', nota: 'vórtice dominante e denso: vira citação literal da Noite Estrelada', params: { densidade: 1.3, espessura: 0.9, redemoinho: 1.1, ruido: 0.25, luzes: 3, realce: 1.6 } },
];

const SEMENTE = 'agent-skills-pacotes-de-contexto';
const TW = 800;
const TH = 450;
const M = 40;
const LEG = 70;

const tiles = await Promise.all(
  VARIACOES.map(async (v, i) => {
    const img = await telaSharp({ semente: SEMENTE, largura: TW, altura: TH, params: { ...v.params, fixo: true } }).png().toBuffer();
    const t1 = await texto({ conteudo: v.nome, familia: 'hanken', peso: 700, px: 22, cor: '#0B1A33' });
    const t2 = await texto({ conteudo: v.nota, familia: 'hanken', peso: 400, px: 17, cor: '#3D4E68', largura: TW });
    const x = M + (i % 2) * (TW + M);
    const y = M + Math.floor(i / 2) * (TH + LEG + M);
    return [
      { input: img, left: x, top: y },
      { input: t1.input, left: x, top: y + TH + 12 },
      { input: t2.input, left: x, top: y + TH + 42 },
    ];
  })
);

const W = M * 3 + TW * 2;
const H = M * 3 + (TH + LEG) * 2;
fs.mkdirSync('docs/design-review', { recursive: true });
await sharp({ create: { width: W, height: H, channels: 3, background: '#F2F4F7' } })
  .composite(tiles.flat())
  .png({ compressionLevel: 9 })
  .toFile('docs/design-review/estudo-pinceladas.png');
console.log('docs/design-review/estudo-pinceladas.png');

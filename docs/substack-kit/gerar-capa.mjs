#!/usr/bin/env node
// Gera a capa de um post do Substack (1456×816 e 1200×630) no sistema "Evolução":
// painel azul-escuro com o título em Literata e o eixo em laranja; à direita, um recorte do quadro.
// Uso: node docs/substack-kit/gerar-capa.mjs "Título do post" engenharia|negocios|bastidores [pasta-saida]
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { COR, QUADRO, literata, hanken, caminho, quebrar, largura, wordmark, raiz } from './lib.mjs';

const EIXOS = { engenharia: 'Engenharia & IA', negocios: 'Negócios', bastidores: 'Bastidores' };

// Cada eixo recorta uma região diferente do quadro (1920×1080): sempre o mesmo para o mesmo eixo.
const RECORTE = {
  engenharia: { cx: 0.69, cy: 0.42 }, // a torre alta e a lua
  negocios: { cx: 0.47, cy: 0.5 }, // casario do centro
  bastidores: { cx: 0.16, cy: 0.5 }, // torres da esquerda
};

const slug = (t) =>
  t.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60);

export async function gerarCapa(titulo, eixo, W, H, saida) {
  if (!EIXOS[eixo]) throw new Error(`eixo inválido: ${eixo} (use ${Object.keys(EIXOS).join(', ')})`);
  const u = W / 1456; // unidade de escala
  const painel = Math.round(W * 0.56);
  const fotoW = W - painel;

  // Recorte do quadro na proporção da área direita
  const meta = await sharp(QUADRO).metadata();
  const escala = Math.max(fotoW / meta.width, H / meta.height) * 1.25; // aproxima a pincelada
  const rw = Math.round(fotoW / escala), rh = Math.round(H / escala);
  const { cx, cy } = RECORTE[eixo];
  const left = Math.min(Math.max(0, Math.round(cx * meta.width - rw / 2)), meta.width - rw);
  const top = Math.min(Math.max(0, Math.round(cy * meta.height - rh / 2)), meta.height - rh);
  const foto = await sharp(QUADRO).extract({ left, top, width: rw, height: rh }).resize(fotoW, H).png().toBuffer();

  // Título: Literata 600, até 4 linhas, reduz o corpo até caber
  const fT = literata(600, 72);
  const margem = 88 * u;
  const maxW = painel - margem * 2;
  let size = 76 * u, linhas;
  do {
    linhas = quebrar(fT, titulo, size, maxW, -0.015);
    if (linhas.length <= 4) break;
    size -= 4 * u;
  } while (size > 40 * u);
  const lh = size * 1.1;

  const fE = hanken(700);
  const eixoTxt = EIXOS[eixo].toUpperCase();
  const eSize = 22 * u;
  const yEixo = margem + 24 * u;
  const blocoTitulo = linhas.length * lh;
  const yTitulo0 = yEixo + 56 * u + size * 0.8;

  const wm = wordmark(30 * u, COR.marca);
  const yWm = H - margem - wm.h;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${painel}" height="${H}" fill="${COR.noite}"/>
  <rect x="${margem}" y="${yEixo - eSize - 18 * u}" width="${40 * u}" height="${3 * u}" fill="${COR.laranja}"/>
  <path fill="${COR.laranjaClaro}" d="${caminho(fE, eixoTxt, margem, yEixo, eSize, 0.12)}"/>
  ${linhas.map((l, i) => `<path fill="#FFFFFF" d="${caminho(fT, l, margem, yTitulo0 + i * lh, size, -0.015)}"/>`).join('\n  ')}
  <g transform="translate(${margem} ${yWm})">${wm.svg}</g>
</svg>`;
  void blocoTitulo;

  const base = await sharp({ create: { width: W, height: H, channels: 4, background: COR.noite } })
    .composite([
      { input: foto, left: painel, top: 0 },
      { input: Buffer.from(svg), left: 0, top: 0 },
    ])
    .png({ compressionLevel: 9 })
    .toBuffer();
  await sharp(base).toFile(saida);
  return saida;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const [titulo, eixo = 'engenharia', pasta = raiz('docs/substack-kit/exemplos')] = process.argv.slice(2);
  if (!titulo) {
    console.error('Uso: node docs/substack-kit/gerar-capa.mjs "Título" engenharia|negocios|bastidores [pasta]');
    process.exit(1);
  }
  mkdirSync(pasta, { recursive: true });
  for (const [W, H] of [[1456, 816], [1200, 630]]) {
    const out = resolve(pasta, `${slug(titulo)}-${W}x${H}.png`);
    await gerarCapa(titulo, eixo, W, H, out);
    console.log(out);
  }
}

#!/usr/bin/env node
// Gera os arquivos fixos do kit Substack: logo (SVG + PNG 512), wordmark (SVG + PNG, transparente
// e sobre azul-escuro) e a capa da publicação. Tudo vetorizado com as fontes do site (lib.mjs).
// Uso: node docs/substack-kit/gerar-kit.mjs
import sharp from 'sharp';
import { writeFileSync } from 'node:fs';
import { COR, QUADRO, wordmark, monograma, literata, hanken, caminho, raiz } from './lib.mjs';

const dir = (f) => raiz('docs/substack-kit', f);
const svgDoc = (w, h, corpo, fundo) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">` +
  (fundo ? `<rect width="${w}" height="${h}" fill="${fundo}"/>` : '') +
  corpo +
  `</svg>\n`;
const r = (n) => Math.round(n * 100) / 100;

// Logo quadrado: monograma sobre azul-escuro
{
  const S = 512;
  const m = monograma(330, COR.marca);
  const x = (S - m.w) / 2, y = (S - m.h) / 2;
  const svg = svgDoc(S, S, `<g transform="translate(${r(x)} ${r(y)})">${m.svg}</g>`, COR.noite);
  writeFileSync(dir('logo.svg'), svg);
  await sharp(Buffer.from(svg)).png().toFile(dir('logo-512.png'));
}

// Wordmark: transparente (tinta azul, para fundo claro) e sobre azul-escuro
{
  const size = 120, pad = 24;
  const claro = wordmark(size, COR.noite);
  const W = Math.ceil(claro.w + pad * 2), H = Math.ceil(claro.h + pad * 2);
  const svgT = svgDoc(W, H, `<g transform="translate(${pad} ${pad})">${claro.svg}</g>`);
  writeFileSync(dir('wordmark.svg'), svgT);
  await sharp(Buffer.from(svgT), { density: 144 }).png().toFile(dir('wordmark.png'));

  const escuro = wordmark(size, COR.marca);
  const pad2 = 64;
  const W2 = Math.ceil(escuro.w + pad2 * 2), H2 = Math.ceil(escuro.h + pad2 * 2);
  const svgN = svgDoc(W2, H2, `<g transform="translate(${pad2} ${pad2})">${escuro.svg}</g>`, COR.noite);
  writeFileSync(dir('wordmark-noite.svg'), svgN);
  await sharp(Buffer.from(svgN), { density: 144 }).png().toFile(dir('wordmark-noite.png'));
}

// Capa da publicação (1600×900): quadro à direita, nome e tagline no painel azul
{
  const W = 1600, H = 900, painel = 860, m = 96;
  const foto = await sharp(QUADRO).resize(W - painel, H, { fit: 'cover', position: 'right' }).png().toBuffer();
  const fT = literata(600, 72), fS = hanken(600);
  const wm = wordmark(40, COR.marca);
  const corpo =
    `<rect width="${painel}" height="${H}" fill="${COR.noite}"/>` +
    `<g transform="translate(${m} ${m})">${wm.svg}</g>` +
    `<path fill="#FFFFFF" d="${caminho(fT, 'Newsletter', m, 470, 112, -0.018)}"/>` +
    `<path fill="${COR.laranja}" d="${caminho(fT, 'Tecnologia e negócio,', m, 580, 46, -0.01)}"/>` +
    `<path fill="${COR.laranja}" d="${caminho(fT, 'partes do mesmo sistema', m, 640, 46, -0.01)}"/>` +
    `<rect x="${m}" y="${H - m - 2}" width="56" height="3" fill="${COR.laranja}"/>` +
    `<path fill="${COR.nevoa}" d="${caminho(fS, 'Gustavo Lopes', m + 76, H - m + 7, 24, 0.01)}"/>`;
  const svg = svgDoc(W, H, corpo);
  await sharp({ create: { width: W, height: H, channels: 4, background: COR.noite } })
    .composite([{ input: foto, left: painel, top: 0 }, { input: Buffer.from(svg), left: 0, top: 0 }])
    .png({ compressionLevel: 9 })
    .toFile(dir('capa-publicacao.png'));
}

console.log('kit gerado em docs/substack-kit/');

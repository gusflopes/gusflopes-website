#!/usr/bin/env node
// Gera as peças fixas do kit Substack: logo (SVG + PNG 512), wordmark (SVG + PNG, transparente
// e em bloco azul-escuro) e a capa da publicação. Tudo em curvas, a partir das fontes do site.
// Uso: node docs/substack-kit/gerar-kit.mjs
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { fonte, COR } from './tipo.mjs';
import { png } from './comum.mjs';
import { capa } from './gerar-capa.mjs';

const aqui = (f) => fileURLToPath(new URL(f, import.meta.url));
const display = await fonte('sans', { wght: 900, wdth: 100 }, -0.02);

// Logo quadrado: G em Archivo 900 sobre azul-escuro + o bloco laranja girado do sistema.
{
  const S = 512;
  const tam = 430;
  const wG = display.largura('G', tam);
  const g = display.caminho('G', tam, 52, 452);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}">
<rect width="${S}" height="${S}" fill="${COR.azul}"/>
<path d="${g}" fill="${COR.papel}"/>
<rect x="${52 + wG - 20}" y="58" width="104" height="104" fill="${COR.laranja}" transform="rotate(12 ${52 + wG + 32} 110)"/>
</svg>`;
  fs.writeFileSync(aqui('logo.svg'), svg);
  await png(svg, aqui('logo-512.png'));
  // favicon do site: mesmo desenho
  fs.writeFileSync(aqui('../../public/favicon.svg'), svg.replace(`width="${S}" height="${S}" `, ''));
}

// Wordmark: GUSFLOPES.DEV — versão transparente (tinta azul) e versão em bloco azul-escuro.
{
  const tam = 120;
  const w1 = display.largura('GUSFLOPES', tam);
  const w2 = display.largura('.DEV', tam);
  const padX = 56;
  const padY = 44;
  const W = Math.ceil(w1 + w2 + 2 * padX);
  const H = Math.ceil(tam * display.capHeight + 2 * padY);
  const base = padY + tam * display.capHeight;
  const a = display.caminho('GUSFLOPES', tam, padX, base);
  const b = display.caminho('.DEV', tam, padX + w1, base);
  const transp = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
<path d="${a}" fill="${COR.azul}"/><path d="${b}" fill="${COR.laranjaFundo}"/>
</svg>`;
  const bloco = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
<rect width="${W}" height="${H}" fill="${COR.azul}"/>
<path d="${a}" fill="${COR.papel}"/><path d="${b}" fill="${COR.laranja}"/>
</svg>`;
  fs.writeFileSync(aqui('wordmark.svg'), transp);
  fs.writeFileSync(aqui('wordmark-azul.svg'), bloco);
  await png(transp, aqui('wordmark.png'));
  await png(bloco, aqui('wordmark-azul.png'));
}

// Capa da publicação: a tese da marca no sistema de abertura.
await png(await capa('Tecnologia e negócio, partes do mesmo sistema', 'newsletter', 1456, 816), aqui('capa-publicacao.png'));
console.log('kit gerado');

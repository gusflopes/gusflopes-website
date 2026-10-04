/**
 * Gera a marca do kit Substack: logo (quadrado) e wordmark (horizontal), em SVG com o texto
 * convertido em contornos (não depende de fonte instalada) e em PNG.
 *
 * Uso: node docs/substack-kit/gerar-marca.mjs
 * Proveniência: Literata SemiBold (@fontsource/literata, OFL) → contornos via opentype.js;
 * capa da publicação = tela do gerador (scripts/tela/pincel.mjs, semente "Radar de IA").
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import opentype from 'opentype.js';
import sharp from 'sharp';
import { fonte, texto, telaSharp } from '../../scripts/tela/render.mjs';
import { CORES } from '../../scripts/tela/pincel.mjs';

const DIR = path.dirname(fileURLToPath(import.meta.url));
const lit = opentype.loadSync(fonte('literata', 600).arquivo);

/** Texto → <path> (contornos), com cores por trecho. Retorna { paths, largura }. */
function contornos(trechos, tamanho, x0, baseline) {
  let x = x0;
  const paths = trechos.map(([str, cor]) => {
    const p = lit.getPath(str, x, baseline, tamanho, { kerning: true });
    x += lit.getAdvanceWidth(str, tamanho, { kerning: true });
    return `<path fill="${cor}" d="${p.toPathData(2)}"/>`;
  });
  return { paths: paths.join(''), largura: x - x0 };
}

async function salvar(nome, svg, png) {
  fs.writeFileSync(path.join(DIR, nome + '.svg'), svg);
  if (png) await sharp(Buffer.from(svg), { density: 144 }).resize(png.w, png.h).png({ compressionLevel: 9 }).toFile(path.join(DIR, png.arquivo));
}

// Logo: quadrado azul-escuro, "g" em Literata com o ponto laranja (o mesmo gesto do favicon do site).
{
  const S = 512;
  const g = contornos([['g', '#F5F7FA'], ['.', CORES.laranja]], 400, 0, 0);
  const x = (S - g.largura) / 2;
  const { paths } = contornos([['g', '#F5F7FA'], ['.', CORES.laranja]], 400, x, 330);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${S} ${S}" width="${S}" height="${S}"><rect width="${S}" height="${S}" fill="${CORES.noite}"/><rect y="${S - 16}" width="${S}" height="16" fill="${CORES.laranja}"/>${paths}</svg>`;
  await salvar('logo', svg, { arquivo: 'logo-512.png', w: 512, h: 512 });
}

// Wordmark: "gusflopes.dev" — versão transparente (texto azul-escuro) e versão sobre azul-escuro.
for (const [nome, corTexto, fundo] of [['wordmark', CORES.noite, null], ['wordmark-noite', '#F5F7FA', CORES.noite]]) {
  const tam = 120;
  const pad = 48;
  const medida = contornos([['gusflopes', corTexto], ['.', CORES.laranja], ['dev', corTexto]], tam, 0, 0).largura;
  const W = Math.ceil(medida + pad * 2);
  const H = 220;
  const { paths } = contornos([['gusflopes', corTexto], ['.', CORES.laranja], ['dev', corTexto]], tam, pad, 135);
  const bg = fundo ? `<rect width="${W}" height="${H}" fill="${fundo}"/>` : '';
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">${bg}${paths}</svg>`;
  await salvar(nome, svg, { arquivo: nome + '.png', w: W * 2, h: H * 2 });
}

// Capa da publicação (cabeçalho/cover): tela do gerador + faixa papel com o nome e a promessa.
{
  const W = 2400;
  const H = 1350;
  const alturaTela = Math.round(H * 0.5);
  const fio = 10;
  const m = 140;
  const tela = await telaSharp({ semente: 'Radar de IA', largura: W, altura: alturaTela }).png().toBuffer();
  const nome = await texto({ conteudo: 'Radar de IA', familia: 'literata', peso: 600, px: 150, cor: CORES.noite });
  const pitch = await texto({
    conteudo: 'Toda semana: o que mudou em IA, por que importa para quem trabalha ou empreende, e uma coisa prática para testar. Sem hype.',
    familia: 'literata', peso: 400, px: 46, cor: '#3D4E68', largura: 1500, entrelinha: 1.35,
  });
  const ass = await texto({ conteudo: 'gusflopes.dev · Gustavo Lopes', familia: 'hanken', peso: 700, px: 38, cor: '#C2410C' });
  const y0 = alturaTela + fio + 110;
  await sharp({ create: { width: W, height: H, channels: 3, background: '#F2F4F7' } })
    .composite([
      { input: tela, top: 0, left: 0 },
      { input: { create: { width: W, height: fio, channels: 4, background: CORES.laranja } }, top: alturaTela, left: 0 },
      { input: nome.input, top: y0, left: m },
      { input: pitch.input, top: y0 + nome.height + 30, left: m },
      { input: ass.input, top: H - 100 - ass.height, left: m },
    ])
    .png({ compressionLevel: 9 })
    .toFile(path.join(DIR, 'capa-publicacao.png'));
}
console.log('marca gerada em', DIR);

/**
 * Capa de post do Substack: o trecho da linha do eixo (ou o serviço tracejado do Radar /
 * da Newsletter) com o título, em 1456×816 e 1200×630.
 *
 * Uso: node docs/substack-kit/gerar-capa.mjs "Título" <engenharia|negocios|bastidores|radar|newsletter> [rótulo] [saída-sem-extensão]
 *   rótulo: texto curto opcional já existente (ex.: "Edição #1"); padrão = nome da linha.
 */
import { join } from 'node:path';
import { sharp, AQUI, COR, LINHAS, SANS, esc, quebrar, marcaSvg, quadroApagado } from './comum.mjs';

const [titulo, eixo = 'engenharia', rotulo, saida] = process.argv.slice(2);
if (!titulo || !LINHAS[eixo]) {
  console.error('uso: gerar-capa.mjs "Título" <' + Object.keys(LINHAS).join('|') + '> [rótulo] [saída]');
  process.exit(1);
}
const linha = LINHAS[eixo];
const slug = titulo.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 50);
const base = saida ?? join(AQUI, 'exemplos', `capa-${slug}`);

async function capa(w, h) {
  const s = w / 1456; // escala
  const m = Math.round(80 * s);
  const tam = Math.round((titulo.length > 70 ? 66 : 76) * s);
  const linhas = quebrar(titulo, tam, w - 2 * m).slice(0, 4);
  const yTitulo = Math.round(250 * s);
  const yLinha = Math.round(h - 150 * s);
  const esp = Math.round(16 * s);
  const dash = linha.tracejado ? `stroke-dasharray="${Math.round(34 * s)} ${Math.round(16 * s)}"` : '';
  const estacoes = [0.08, 0.24, 0.4, 0.56, 0.72].map((f) => Math.round(m + f * (w - 2 * m)));
  const atual = estacoes[4];
  const pill = (linha.rotulo.length + 2) * 15 * s + 40 * s;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
    <g transform="translate(${m} ${Math.round(70 * s)})">${marcaSvg(Math.round(64 * s)).replace(/<\/?svg[^>]*>/g, '')}</g>
    <text x="${m + Math.round(84 * s)}" y="${Math.round(116 * s)}" font-family="${SANS}" font-weight="800" font-size="${Math.round(40 * s)}" letter-spacing="-1" fill="${COR.luz}">gusflopes<tspan fill="${COR.laranja}">.</tspan>dev</text>
    <rect x="${w - m - pill}" y="${Math.round(76 * s)}" width="${pill}" height="${Math.round(52 * s)}" rx="${Math.round(26 * s)}" fill="${linha.cor}"/>
    <text x="${w - m - pill / 2}" y="${Math.round(111 * s)}" text-anchor="middle" font-family="${SANS}" font-weight="800" font-size="${Math.round(26 * s)}" fill="${COR.brasa}">${esc(rotulo ?? linha.rotulo)}</text>
    ${linhas
      .map((l, i) => `<text x="${m}" y="${yTitulo + i * Math.round(tam * 1.08)}" font-family="${SANS}" font-weight="800" font-size="${tam}" letter-spacing="${(-tam * 0.025).toFixed(1)}" fill="#fff">${esc(l)}</text>`)
      .join('')}
    <path d="M${m} ${yLinha} H${w - m}" stroke="${linha.cor}" stroke-width="${esp}" stroke-linecap="round" ${dash}/>
    ${estacoes
      .slice(0, 4)
      .map((x) => `<circle cx="${x}" cy="${yLinha}" r="${Math.round(13 * s)}" fill="${COR.noite}" stroke="${COR.luz}" stroke-width="${Math.round(7 * s)}"/>`)
      .join('')}
    <circle cx="${atual}" cy="${yLinha}" r="${Math.round(30 * s)}" fill="none" stroke="${COR.luz}" stroke-width="${Math.round(5 * s)}"/>
    <circle cx="${atual}" cy="${yLinha}" r="${Math.round(21 * s)}" fill="${COR.noite}" stroke="${linha.cor}" stroke-width="${Math.round(10 * s)}"/>
  </svg>`;
  const quadro = await quadroApagado(w, h, { op: 0.26, fim: 0.42 });
  await sharp({ create: { width: w, height: h, channels: 4, background: COR.noite } })
    .composite([{ input: quadro }, { input: Buffer.from(svg) }])
    .png()
    .toFile(`${base}-${w}x${h}.png`);
  console.log(`${base}-${w}x${h}.png`);
}

await capa(1456, 816);
await capa(1200, 630);

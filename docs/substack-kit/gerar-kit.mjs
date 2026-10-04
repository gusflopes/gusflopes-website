/**
 * Gera o kit fixo do Substack: logo, wordmark (transparente e sobre azul-escuro) e a capa
 * da publicação. Uso: node docs/substack-kit/gerar-kit.mjs
 */
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { sharp, AQUI, COR, LINHAS, SANS, esc, marcaSvg, quadroApagado } from './comum.mjs';

const out = (f) => join(AQUI, f);

// Logo quadrado
const logo = marcaSvg(512);
writeFileSync(out('logo.svg'), logo);
await sharp(Buffer.from(logo)).png().toFile(out('logo-512.png'));

// Wordmark: marca + "gusflopes.dev" (o ponto em laranja)
function wordmark({ fundo }) {
  const w = 1200, h = 300;
  const texto = fundo ? COR.luz : COR.noite;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  ${fundo ? `<rect width="${w}" height="${h}" fill="${COR.noite}"/>` : ''}
  <g transform="translate(40 50)">${marcaSvg(200, { fundo: true }).replace(/<\/?svg[^>]*>/g, '')}</g>
  <text x="290" y="192" font-family="${SANS}" font-weight="800" font-size="128" letter-spacing="-4" fill="${texto}">gusflopes<tspan fill="${COR.laranja}">.</tspan>dev</text>
</svg>`;
}
writeFileSync(out('wordmark.svg'), wordmark({ fundo: false }));
writeFileSync(out('wordmark-noite.svg'), wordmark({ fundo: true }));
await sharp(Buffer.from(wordmark({ fundo: false }))).png().toFile(out('wordmark.png'));
await sharp(Buffer.from(wordmark({ fundo: true }))).png().toFile(out('wordmark-noite.png'));

// Capa da publicação: as três linhas da rede sob a cidade apagada, wordmark e tagline.
{
  const w = 1456, h = 816;
  const quadro = await quadroApagado(w, h, { op: 0.32, fim: 0.62 });
  const eixos = ['engenharia', 'negocios', 'bastidores'];
  const ys = [520, 600, 680];
  const linhas = eixos
    .map((id, i) => {
      const y = ys[i];
      const cor = LINHAS[id].cor;
      const pts = [180, 420, 660, 900, 1140];
      return `<path d="M80 ${y} H${w - 80}" stroke="${cor}" stroke-width="16" stroke-linecap="round"/>
      ${pts.map((x) => `<circle cx="${x + i * 40}" cy="${y}" r="13" fill="${COR.noite}" stroke="${COR.luz}" stroke-width="7"/>`).join('')}
      <text x="80" y="${y - 22}" font-family="${SANS}" font-weight="700" font-size="24" fill="${cor}">${esc(LINHAS[id].rotulo)}</text>`;
    })
    .join('');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
    <g transform="translate(80 96)">${marcaSvg(96).replace(/<\/?svg[^>]*>/g, '')}</g>
    <text x="200" y="166" font-family="${SANS}" font-weight="800" font-size="64" letter-spacing="-2" fill="${COR.luz}">gusflopes<tspan fill="${COR.laranja}">.</tspan>dev</text>
    <text x="80" y="330" font-family="${SANS}" font-weight="800" font-size="76" letter-spacing="-2.5" fill="#fff">Tecnologia e negócio,</text>
    <text x="80" y="414" font-family="${SANS}" font-weight="800" font-size="76" letter-spacing="-2.5" fill="${COR.laranjaClaro}">partes do mesmo sistema</text>
    ${linhas}
  </svg>`;
  await sharp({ create: { width: w, height: h, channels: 4, background: COR.noite } })
    .composite([{ input: quadro }, { input: Buffer.from(svg) }])
    .png()
    .toFile(out('capa-publicacao.png'));
}

console.log('kit gerado em', AQUI);

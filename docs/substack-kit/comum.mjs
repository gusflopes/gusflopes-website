// Peças compartilhadas pelos geradores do kit: janela laranja com o quadro e wordmark.
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { COR } from './tipo.mjs';

const QUADRO = fileURLToPath(new URL('../../src/assets/326189a758fea0fe0e2da42349b6da943b29ba51.png', import.meta.url));
let quadroB64;

/** Recorte do quadro (cidade noturna) em JPEG base64, para embutir no SVG. */
export async function quadro() {
  if (!quadroB64) {
    const buf = await sharp(QUADRO).extract({ left: 860, top: 120, width: 900, height: 900 }).resize(700).jpeg({ quality: 82 }).toBuffer();
    quadroB64 = `data:image/jpeg;base64,${buf.toString('base64')}`;
  }
  return quadroB64;
}

/** Bloco laranja girado 12° com o quadro dentro: a "janela" do sistema. */
export async function janela(cx, cy, lado) {
  const img = await quadro();
  const m = lado * 0.09;
  const dentro = lado - 2 * m;
  const id = `j${Math.round(cx)}${Math.round(cy)}`;
  return `<g transform="rotate(12 ${cx} ${cy})">
  <rect x="${cx - lado / 2}" y="${cy - lado / 2}" width="${lado}" height="${lado}" fill="${COR.laranja}"/>
  <clipPath id="${id}"><rect x="${cx - dentro / 2}" y="${cy - dentro / 2}" width="${dentro}" height="${dentro}"/></clipPath>
  <g clip-path="url(#${id})"><rect x="${cx - dentro / 2}" y="${cy - dentro / 2}" width="${dentro}" height="${dentro}" fill="${COR.azul2}"/>
  <image href="${img}" x="${cx - dentro * 0.8}" y="${cy - dentro * 0.8}" width="${dentro * 1.6}" height="${dentro * 1.6}" transform="rotate(-12 ${cx} ${cy})" preserveAspectRatio="xMidYMid slice"/></g>
</g>`;
}

export async function png(svg, arquivo, largura) {
  const img = sharp(Buffer.from(svg), { density: 72 });
  await (largura ? img.resize(largura) : img).png({ compressionLevel: 9 }).toFile(arquivo);
}

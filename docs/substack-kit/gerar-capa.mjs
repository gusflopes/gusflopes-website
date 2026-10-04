#!/usr/bin/env node
// Capa de post para o Substack com o sistema de abertura tipográfica do site.
// Uso: node docs/substack-kit/gerar-capa.mjs "Título da edição" [engenharia|negocios|bastidores|newsletter] [pasta-de-saída]
// Saída: <slug>-1456x816.png (capa do post) e <slug>-1200x630.png (prévia social).
// A quebra, a escala e a linha leve (par 900/100) vêm de src/lib/abertura.ts (as mesmas regras do site).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { abertura } from '../../src/lib/abertura.ts';
import { fonte, quebrar, COR } from './tipo.mjs';
import { janela, png } from './comum.mjs';

const ROTULOS = { engenharia: 'Engenharia & IA', negocios: 'Negócios', bastidores: 'Bastidores', newsletter: 'Newsletter' };

export async function capa(titulo, eixo, W, H) {
  const display = await fonte('sans', { wght: 900, wdth: 100 }, -0.02);
  const leve = await fonte('sans', { wght: 100, wdth: 100 }, -0.02); // linha leve do par 900/100
  const fina = await fonte('sans', { wght: 500, wdth: 87 }, -0.005);
  const rotulo = await fonte('sans', { wght: 650, wdth: 75 }, 0.12);
  const a = abertura(titulo, eixo);

  const pad = Math.round(W * 0.055);
  const lado = Math.round(H * 0.3);
  const barra = Math.round(H * 0.11); // faixa de rodapé
  const larguraBloco = W - 2 * pad - lado * 1.15;
  const topo = pad;
  const disponivel = H - barra - pad * 0.6 - topo;

  // tamanhos: fit (cqi) sobre a largura do bloco, teto proporcional à altura
  const teto = H * 0.2;
  const tamCauda = Math.round(H * 0.052);
  const medir = (k) => {
    const wb = larguraBloco * k;
    const linhas = a.linhas.map((l) => ({ ...l, tam: Math.min((l.fit * wb) / 100, teto * k) }));
    const alturaBloco = linhas.reduce((s, l) => s + l.tam * 0.94, 0);
    const cauda = a.cauda ? quebrar(fina, a.cauda, tamCauda, Math.min(wb, W * 0.62)) : [];
    const alturaCauda = cauda.length ? tamCauda * 0.6 + cauda.length * tamCauda * 1.18 : 0;
    return { wb, linhas, cauda, total: alturaBloco + alturaCauda };
  };
  let k = 1;
  let m = medir(k);
  while (m.total > disponivel && k > 0.4) m = medir((k -= 0.03));

  let y = topo + (disponivel - m.total) * 0.35;
  let corpo = '';
  const ultima = m.linhas.length - 1;
  m.linhas.forEach((l, i) => {
    const txt = l.texto.toLocaleUpperCase('pt-BR');
    const sep = i === ultima && a.sep ? a.sep : '';
    const f = l.estilo === 'leve' ? leve : display;
    const wTxt = f.largura(txt, l.tam);
    const wTot = wTxt + (sep ? display.largura(sep, l.tam) : 0);
    let x = pad + (l.recuo * m.wb) / 100;
    if (a.alinhamento === 'end') x = pad + m.wb - wTot;
    const base = y + l.tam * 0.94 * 0.86;
    const d = f.caminho(txt, l.tam, x, base);
    corpo +=
      l.estilo === 'vazado'
        ? `<path d="${d}" fill="none" stroke="${COR.papel}" stroke-width="${Math.max(1.5, l.tam * 0.022)}" stroke-linejoin="round"/>`
        : `<path d="${d}" fill="${COR.papel}"/>`;
    if (sep) corpo += `<path d="${display.caminho(sep, l.tam, x + wTxt, base)}" fill="${COR.laranja}"/>`;
    y += l.tam * 0.94;
  });
  if (m.cauda.length) {
    y += tamCauda * 0.6;
    for (const linha of m.cauda) {
      y += tamCauda * 1.18;
      corpo += `<path d="${fina.caminho(linha, tamCauda, pad, y - tamCauda * 0.25)}" fill="${COR.ceu}"/>`;
    }
  }

  // rodapé: filete, wordmark e eixo
  const yBarra = H - barra;
  const tamMarca = Math.round(barra * 0.3);
  const marca = display.caminho('GUSFLOPES', tamMarca, pad, yBarra + barra * 0.62);
  const wMarca = display.largura('GUSFLOPES', tamMarca);
  const ponto = display.caminho('.DEV', tamMarca, pad + wMarca, yBarra + barra * 0.62);
  const rot = (ROTULOS[eixo] ?? ROTULOS.engenharia).toLocaleUpperCase('pt-BR');
  const tamRot = Math.round(barra * 0.22);
  const wRot = rotulo.largura(rot, tamRot);
  const jan = await janela(W - pad - lado * 0.55, pad + lado * 0.62, lado);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
<rect width="${W}" height="${H}" fill="${COR.azul}"/>
${jan}
${corpo}
<rect x="${pad}" y="${yBarra}" width="${W - 2 * pad}" height="2" fill="${COR.papel}"/>
<path d="${marca}" fill="${COR.papel}"/><path d="${ponto}" fill="${COR.laranja}"/>
<path d="${rotulo.caminho(rot, tamRot, W - pad - wRot, yBarra + barra * 0.6)}" fill="${COR.laranja}"/>
</svg>`;
}

const slug = (s) =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60);

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const [titulo, eixo = 'newsletter', pasta = path.join(path.dirname(fileURLToPath(import.meta.url)), 'capas')] = process.argv.slice(2);
  if (!titulo) {
    console.error('uso: node docs/substack-kit/gerar-capa.mjs "Título" [engenharia|negocios|bastidores|newsletter] [pasta]');
    process.exit(1);
  }
  fs.mkdirSync(pasta, { recursive: true });
  for (const [W, H] of [[1456, 816], [1200, 630]]) {
    const arquivo = path.join(pasta, `${slug(titulo)}-${W}x${H}.png`);
    await png(await capa(titulo, eixo, W, H), arquivo);
    console.log(arquivo);
  }
}

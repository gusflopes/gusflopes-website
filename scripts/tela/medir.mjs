/**
 * Medição de cor por família das telas (rodada 4). Pinta a janela principal de cada papel e
 * classifica os pixels nas famílias do quadro: escuro, quente (areia + ferrugem/marrom + laranja),
 * petróleo/aqua, azul médio, azul-claro, claro neutro. Mesmas fronteiras do script do revisor.
 * Uso: node scripts/tela/medir.mjs [pasta-para-png]
 */
import fs from 'node:fs';
import sharp from 'sharp';
import { janelaRaw } from './render.mjs';
import { ABERTURA, ARQUETIPO_FAIXA, paramsCapa, ARQUETIPO_CONVITE } from './config.mjs';

export function familias(data) {
  const c = { escuro: 0, quente: 0, laranja: 0, areia: 0, ferrugem: 0, petroleo: 0, azul: 0, azulClaro: 0, claroNeutro: 0, ceuClaro: 0 };
  let N = 0;
  for (let i = 0; i < data.length; i += 3) {
    N++;
    const R = data[i] / 255, G = data[i + 1] / 255, B = data[i + 2] / 255;
    const mx = Math.max(R, G, B), mn = Math.min(R, G, B), v = mx, s = mx ? (mx - mn) / mx : 0, d = mx - mn;
    let h = 0;
    if (d) { if (mx === R) h = 60 * (((G - B) / d) % 6); else if (mx === G) h = 60 * ((B - R) / d + 2); else h = 60 * ((R - G) / d + 4); }
    if (h < 0) h += 360;
    if (v >= 0.6 && s <= 0.5 && h >= 15 && h <= 55) c.ceuClaro++; // passagem clara de céu (areia/pêssego)
    if (v < 0.32) { c.escuro++; continue; }
    if (h >= 8 && h <= 55 && s > 0.15) { c.quente++; if (s > 0.55 && v > 0.55) c.laranja++; else if (v >= 0.5 && s <= 0.55) c.areia++; else c.ferrugem++; continue; }
    if (v > 0.85 && s < 0.15) { c.claroNeutro++; continue; }
    if (h >= 165 && h < 200 && s > 0.15) { c.petroleo++; continue; }
    if (h >= 200 && h < 260) { if (v > 0.7 && s < 0.4) c.azulClaro++; else c.azul++; }
  }
  return Object.fromEntries(Object.entries(c).map(([k, x]) => [k, (100 * x) / N]));
}

export const metas = (f, abertura = false) => {
  const falhas = [];
  if (f.quente < 12) falhas.push('quente<12');
  if (f.areia < 5) falhas.push('areia<5');
  if (f.ferrugem < 5) falhas.push('ferrugem/marrom<5');
  if (f.petroleo < 15) falhas.push('petroleo<15');
  if (f.azulClaro > 3) falhas.push('azulClaro>3');
  if (f.escuro > (abertura ? 40 : 45)) falhas.push(`escuro>${abertura ? 40 : 45}`);
  if (abertura && f.ceuClaro < 10) falhas.push('ceuClaro<10');
  return falhas;
};

export const TELAS = [
  ['abertura', ABERTURA.semente, 'abertura', 'larga', ABERTURA.params],
  ...Object.entries(ARQUETIPO_FAIXA).filter(([n]) => n !== 'nao-encontrada').map(([n, a]) => [`faixa ${n}`, n, 'faixa', 'larga', { arquetipo: a }]),
  ['eixos (portas)', 'O que eu escrevo, e para quem', 'capitulo', 'coluna', { arquetipo: 'faixas', bandas: 3, luz: 1.8 }],
  ['close ferramenta', 'Simulador da Reforma Tributária', 'close', 'quadro', { arquetipo: 'vento' }],
  ['video', 'Vídeo em Destaque', 'projecao', 'quadro', { arquetipo: 'ondas' }],
  ['convite newsletter', 'Radar de IA', 'convite', 'topo', { arquetipo: ARQUETIPO_CONVITE }],
  ['fita newsletter', 'Radar de IA', 'fita', 'larga', { arquetipo: 'horizonte' }],
  ['fita do rodapé', 'gusflopes.dev', 'rodape', 'larga', { arquetipo: 'faixas', degrade: true }],
  ['404 painel', 'nao-encontrada', 'painel', 'quadro', { arquetipo: 'massas' }],
  ['capa agent-skills (retrato)', 'agent-skills-pacotes-de-contexto', 'capa', 'retrato', paramsCapa('engenharia')],
  ['capa agent-skills (OG)', 'agent-skills-pacotes-de-contexto', 'capa', 'og', paramsCapa('engenharia')],
  ['capa governanca (larga)', 'governanca-de-ia-sem-teatro', 'capa', 'larga', paramsCapa('negocios')],
  ['capa governanca (Substack)', 'governanca-de-ia-sem-teatro', 'capa', 'substack', paramsCapa('negocios')],
  ['OG padrão (tagline)', ABERTURA.semente, 'capa', 'og', {}],
];

if (import.meta.url === `file://${process.argv[1]}`) {
  const out = process.argv[2];
  if (out) fs.mkdirSync(out, { recursive: true });
  const so = process.env.SO?.split(',');
  for (const [nome, semente, papel, janela, params] of TELAS) {
    if (so && !so.some((s) => nome.includes(s))) continue;
    const r = janelaRaw({ semente, papel, janela, larguraArquivo: undefined ?? (await import('./config.mjs')).PAPEIS[papel].janelas[janela].w * ((await import('./config.mjs')).PAPEIS[papel].ampliacao ?? 1), params });
    const f = familias(r.data);
    const falhas = metas(f, papel === 'abertura');
    const d = r.discos;
    const tot = Object.values(d.familias).reduce((a, b) => a + b, 0) || 1;
    const maxFam = Math.max(0, ...Object.values(d.familias)) / tot;
    const fams = Object.keys(d.familias).filter((k) => k !== 'laranja').length;
    if (d.n >= 8 && (fams < 4 || maxFam > 0.4 || d.razao < 6)) falhas.push(`discos(${fams} famílias, maior ${(maxFam * 100).toFixed(0)}%, razão ${d.razao.toFixed(1)})`);
    console.log(`${nome.padEnd(30)} ${r.arquetipo.padEnd(9)} escuro ${f.escuro.toFixed(1)} | quente ${f.quente.toFixed(1)} (areia ${f.areia.toFixed(1)}, ferrugem/marrom ${f.ferrugem.toFixed(1)}, laranja ${f.laranja.toFixed(1)}) | petróleo/aqua ${f.petroleo.toFixed(1)} | azul ${f.azul.toFixed(1)} | azul-claro ${f.azulClaro.toFixed(1)} | céu claro ${f.ceuClaro.toFixed(1)} | discos ${d.n} (razão ${d.razao.toFixed(1)}:1, ${Object.entries(d.familias).map(([k, v]) => `${k} ${Math.round((v / tot) * 100)}%`).join(', ')})  ${falhas.length ? 'FALHA ' + falhas.join(' ') : 'ok'}`);
    if (out) await sharp(r.data, { raw: { width: r.width, height: r.height, channels: 3 } }).png().toFile(`${out}/${nome.replace(/[^a-z0-9]+/gi, '-')}.png`);
  }
}

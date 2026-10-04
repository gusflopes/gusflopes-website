/**
 * Estudo de COMPOSIÇÃO e COR das telas (rodadas 3 e 4): os arquétipos lado a lado, cada um no tamanho
 * real da abertura da home (1366×428, a 1366×900 menos cabeçalho e faixa do título), ao lado do quadro
 * original inteiro, com a medição por família de cor de cada um (escuro, quente = areia + ferrugem/
 * marrom + laranja, petróleo/aqua, azul-claro) — a mesma do script do revisor (scripts/tela/medir.mjs).
 * É a prova de que não há anatomia repetida e de que a paleta é a do quadro, não só os azuis dele.
 * Uso: node scripts/tela/estudo.mjs  → docs/design-review/estudo-pinceladas.png
 */
import fs from 'node:fs';
import zlib from 'node:zlib';
import sharp from 'sharp';
import { janelaRaw, texto } from './render.mjs';
import { ARQUETIPOS, VERSAO } from './pincel.mjs';
import { familias } from './medir.mjs';

const M = 40;
const CW = 1366;
const CH = 428;
const W = CW * 2 + M * 3;
const COR = '#0B1A33';
const COR2 = '#3D4E68';

const NOTAS = {
  horizonte: 'céu salpicado de manchas, massa escura com crista, linha d’água e reflexos',
  vento: 'correntes diagonais largas atravessando, faixas de valor e respiros',
  manchas: 'manchas redondas de vários tamanhos e cores espalhadas sem centro',
  ondas: 'ondas largas: cristas claras, cavas que descansam',
  massas: 'massas (blocos verticais, campo, área clara) que se encontram numa costura de luz',
  faixas: 'estratos de alturas, escalas e densidades diferentes',
};
// Sementes reais do site; as seis primeiras com o arquétipo fixado, as duas últimas sorteadas pela semente.
const AMOSTRAS = [
  ...ARQUETIPOS.map((a, i) => ({
    semente: ['Tecnologia e negócio, partes do mesmo sistema', 'radar', 'insights', 'Vídeo em Destaque', 'engenharia', 'bastidores'][i],
    arquetipo: a,
  })),
  { semente: 'agent-skills-pacotes-de-contexto' },
  { semente: 'governanca-de-ia-sem-teatro' },
];

const camadas = [];
const pct = (v) => `${v.toFixed(1).replace('.', ',')}%`;
const medida = (f) => `escuro ${pct(f.escuro)} · quente ${pct(f.quente)} (areia ${pct(f.areia)}, ferrugem/marrom ${pct(f.ferrugem)}, laranja ${pct(f.laranja)}) · petróleo/aqua ${pct(f.petroleo)} · azul-claro ${pct(f.azulClaro)}`;
const rot = async (txt, x, y, px = 22, cor = COR, peso = 600, largura = CW) => {
  const t = await texto({ conteudo: txt, familia: 'hanken', peso, px, cor, largura });
  camadas.push({ input: t.input, left: x, top: y });
  return t.height;
};

let y = M;
y += (await rot('Estudo de composição e cor das telas: seis arquétipos na paleta do quadro', M, y, 34, COR, 600, W - 2 * M)) + 8;
y += (await rot('Cada tela no tamanho real da abertura da home (1366×428), escala de traço fixa, com a medição por família de cor. À esquerda, no alto, o quadro original inteiro: amplitude, manchas sem centro, o par ferrugem × petróleo, areia clara no céu. Metas por tela: quente ≥ 12% (areia ≥ 5%, ferrugem/marrom ≥ 5%), petróleo/aqua ≥ 15%, azul-claro ≤ 3%, escuro ≤ 45%.', M, y, 19, COR2, 400, W - 2 * M)) + 24;

// O quadro original inteiro (1366×768) na primeira célula, ocupando duas linhas.
const quadroH = Math.round((CW * 1080) / 1920);
const topo = y;
y += (await rot('O quadro original (inteiro)', M, y)) + 8;
const quadro = sharp('src/assets/326189a758fea0fe0e2da42349b6da943b29ba51.png').removeAlpha().resize(CW, quadroH);
camadas.push({ input: await quadro.clone().png().toBuffer(), left: M, top: y });
const fq = familias((await quadro.clone().raw().toBuffer()));
const hq = await rot(medida(fq), M, y + quadroH + 6, 17, COR2, 600);
const fimQuadro = y + quadroH + 6 + hq;

const celula = async (a, x, yy) => {
  const r = janelaRaw({ semente: a.semente, papel: 'abertura', janela: 'larga', larguraArquivo: CW, params: a.arquetipo ? { arquetipo: a.arquetipo } : {} });
  const h0 = await rot(`${r.arquetipo}${a.arquetipo ? '' : ' (sorteado)'} · semente “${a.semente}”`, x, yy);
  const img = sharp(r.data, { raw: { width: r.width, height: r.height, channels: 3 } }).extract({ left: 0, top: Math.max(0, Math.round((r.height - CH) / 2)), width: CW, height: Math.min(CH, r.height) });
  camadas.push({ input: await img.clone().png().toBuffer(), left: x, top: yy + h0 + 8 });
  const f = familias(await img.clone().raw().toBuffer());
  const h1 = await rot(NOTAS[r.arquetipo], x, yy + h0 + 8 + CH + 6, 17, COR2, 400);
  const h2 = await rot(medida(f), x, yy + h0 + 8 + CH + 6 + h1 + 2, 17, COR, 600);
  console.log(r.arquetipo, a.semente, medida(f));
  return h0 + 8 + CH + 6 + h1 + 2 + h2 + 26;
};

// coluna direita ao lado do quadro: duas telas
let yd = topo;
yd += await celula(AMOSTRAS[0], M * 2 + CW, yd);
yd += await celula(AMOSTRAS[1], M * 2 + CW, yd);
y = Math.max(fimQuadro + 26, yd);
for (let i = 2; i < AMOSTRAS.length; i += 2) {
  const h = await celula(AMOSTRAS[i], M, y);
  const h2 = AMOSTRAS[i + 1] ? await celula(AMOSTRAS[i + 1], M * 2 + CW, y) : 0;
  y += Math.max(h, h2);
}

fs.mkdirSync('docs/design-review', { recursive: true });
const png = await sharp({ create: { width: W, height: y + M, channels: 3, background: '#F2F4F7' } })
  .composite(camadas)
  .png({ palette: true, quality: 90, effort: 8 })
  .toBuffer();
// proveniência embutida (chunk tEXt logo após o IHDR)
const txt = Buffer.from(`impeccable:prompt\0Gerado por código: node scripts/tela/estudo.mjs (gerador scripts/tela/pincel.mjs VERSAO ${VERSAO}, paleta do quadro, medição por família de scripts/tela/medir.mjs, arquétipos ${ARQUETIPOS.join('/')}, sementes reais do site, janela larga da abertura) + o quadro da marca inteiro src/assets/326189a758fea0fe0e2da42349b6da943b29ba51.png`, 'latin1');
const chunk = Buffer.alloc(12 + txt.length);
chunk.writeUInt32BE(txt.length, 0);
chunk.write('tEXt', 4, 'ascii');
txt.copy(chunk, 8);
chunk.writeUInt32BE(zlib.crc32(chunk.subarray(4, 8 + txt.length)) >>> 0, 8 + txt.length);
fs.writeFileSync('docs/design-review/estudo-pinceladas.png', Buffer.concat([png.subarray(0, 33), chunk, png.subarray(33)]));
console.log('docs/design-review/estudo-pinceladas.png');

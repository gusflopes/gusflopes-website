/**
 * Estudo de COMPOSIÇÃO das telas (rodada 3): os arquétipos lado a lado, cada um no tamanho real da
 * abertura da home (1366×428, a 1366×900 menos cabeçalho e faixa do título), ao lado do quadro
 * original inteiro. É a prova de que não há mais anatomia repetida (vórtice + luzes-alvo).
 * Uso: node scripts/tela/estudo.mjs  → docs/design-review/estudo-pinceladas.png
 */
import fs from 'node:fs';
import zlib from 'node:zlib';
import sharp from 'sharp';
import { janelaRaw, texto } from './render.mjs';
import { ARQUETIPOS } from './pincel.mjs';

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
const rot = async (txt, x, y, px = 22, cor = COR, peso = 600, largura = CW) => {
  const t = await texto({ conteudo: txt, familia: 'hanken', peso, px, cor, largura });
  camadas.push({ input: t.input, left: x, top: y });
  return t.height;
};

let y = M;
y += (await rot('Estudo de composição das telas: seis arquétipos, nenhuma anatomia repetida', M, y, 34, COR, 600, W - 2 * M)) + 8;
y += (await rot('Cada tela no tamanho real da abertura da home (1366×428), escala de traço fixa. À esquerda, no alto, o quadro original inteiro: amplitude, manchas espalhadas sem centro, massas que organizam a cena.', M, y, 19, COR2, 400, W - 2 * M)) + 24;

// O quadro original inteiro (1366×768) na primeira célula, ocupando duas linhas.
const quadroH = Math.round((CW * 1080) / 1920);
const topo = y;
y += (await rot('O quadro original (inteiro)', M, y)) + 8;
camadas.push({ input: await sharp('src/assets/326189a758fea0fe0e2da42349b6da943b29ba51.png').resize(CW, quadroH).png().toBuffer(), left: M, top: y });
const fimQuadro = y + quadroH;

const celula = async (a, x, yy) => {
  const r = janelaRaw({ semente: a.semente, papel: 'abertura', janela: 'larga', larguraArquivo: CW, params: a.arquetipo ? { arquetipo: a.arquetipo } : {} });
  const h0 = await rot(`${r.arquetipo}${a.arquetipo ? '' : ' (sorteado)'} · semente “${a.semente}”`, x, yy);
  const img = sharp(r.data, { raw: { width: r.width, height: r.height, channels: 3 } }).extract({ left: 0, top: Math.max(0, Math.round((r.height - CH) / 2)), width: CW, height: Math.min(CH, r.height) });
  camadas.push({ input: await img.png().toBuffer(), left: x, top: yy + h0 + 8 });
  const h1 = await rot(NOTAS[r.arquetipo], x, yy + h0 + 8 + CH + 6, 17, COR2, 400);
  return h0 + 8 + CH + 6 + h1 + 26;
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
const txt = Buffer.from(`impeccable:prompt\0Gerado por código: node scripts/tela/estudo.mjs (gerador scripts/tela/pincel.mjs VERSAO 9, arquétipos ${ARQUETIPOS.join('/')}, sementes reais do site, janela larga da abertura) + o quadro da marca inteiro src/assets/326189a758fea0fe0e2da42349b6da943b29ba51.png`, 'latin1');
const chunk = Buffer.alloc(12 + txt.length);
chunk.writeUInt32BE(txt.length, 0);
chunk.write('tEXt', 4, 'ascii');
txt.copy(chunk, 8);
chunk.writeUInt32BE(zlib.crc32(chunk.subarray(4, 8 + txt.length)) >>> 0, 8 + txt.length);
fs.writeFileSync('docs/design-review/estudo-pinceladas.png', Buffer.concat([png.subarray(0, 33), chunk, png.subarray(33)]));
console.log('docs/design-review/estudo-pinceladas.png');

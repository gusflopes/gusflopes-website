/**
 * Gerador de "telas": cenas amplas em pinceladas de tinta, nas cores do quadro e da marca.
 *
 * Composição (v9): o segredo do quadro da marca é a AMPLITUDE, não um foco. Cada tela usa a
 * superfície inteira com uma estrutura grande — um ARQUÉTIPO escolhido pela semente (ou fixado
 * pelo papel da tela na página):
 * - horizonte: céu salpicado de manchas redondas, uma massa escura com crista, linha d'água e
 *   reflexos verticais;
 * - vento: correntes diagonais largas que atravessam a tela, faixas de valor e respiros;
 * - manchas: campo de manchas redondas de vários tamanhos e cores, espalhadas sem centro;
 * - ondas: ondas largas de comprimento longo, cristas claras e cavas que descansam;
 * - massas: duas ou três massas (blocos verticais, campo horizontal, área clara) que se encontram
 *   numa costura de luz;
 * - faixas: estratos horizontais de alturas, escalas de traço e densidades diferentes.
 * Não há vórtice nem luz-alvo: quando há luz, é mancha ou disco espalhado, de tamanho e valor variados.
 *
 * Renderizador raster próprio, em camadas (subpintura → corpo → realce → marcas do arquétipo →
 * manchas → faíscas). Cada traço é um feixe de cerdas em 2 a 4 sub-estrias de valores vizinhos,
 * entrada carregada, saída seca, falhas da cerda; no material "empasto", cada cerda deixa relevo num
 * mapa de altura iluminado por luz rasante. O comprimento do traço varia muito (log-normal): toques
 * quase quadrados ao lado de correntes longas, como na v1.
 *
 * Escala fixa: todas as medidas são em px de tela (CSS). Cada papel tem uma tela-mestre virtual em
 * px de tela, e cada formato servido é uma JANELA dela renderizada em `escala` px de dispositivo por
 * px de tela. Marcas laranja ficam inteiras (ou inteiramente fora) em todas as janelas do papel;
 * as azuis podem ser cortadas pela borda, como as manchas do céu no quadro.
 *
 * Determinístico: a mesma semente e o mesmo papel produzem sempre a mesma tela, em qualquer janela.
 * Saída: RGB 8 bits cru ({ data, width, height }); quem codifica é o sharp (scripts/tela/render.mjs).
 */

export const VERSAO = 10; // a semente das telas (mudar refaz todas as composições)
/** Revisão do gerador: entra só na impressão digital do cache (não muda a semente das telas). */
export const REVISAO = "r5-zonas-3";

/**
 * Paleta (v10): derivada da amostra do quadro por agrupamento, não só dos azuis dele. O motor do
 * quadro é o contraste complementar ferrugem × petróleo, com areia clara no céu e o fundo
 * azul-acinzentado por baixo. Os laranjas da marca são a luz (janelas, reflexos, poucas manchas).
 * `ceu` e `nevoa` (azul-claro) ficaram só como acento raro nas manchas.
 */
export const CORES = {
  noite: '#0B1A33', // chão das páginas e faixa do OG (fora da tinta)
  papel: '#FFF8F2', // claro padrão das páginas (Shelfye): as emendas tela → página casam com ele
  creme: '#FDEED9', // campo claro quente (Shelfye)
  nevoa: '#C9D6E6', // assinatura do OG; acento raro
  ceu: '#8FB3D9', // acento raro
  fundo: '#223040',
  fundo2: '#1C1F27',
  azulNoite: '#284559',
  petroleo: '#457183',
  petroleo2: '#315B6F',
  aqua: '#86B5BF',
  ardosia: '#648188',
  ardosia2: '#7F989A',
  areia: '#AA9C87',
  areiaClara: '#C4B49A',
  branco: '#E4DDCF',
  ocre: '#B38A52',
  marrom: '#907A5F',
  terra: '#74553C',
  marrom2: '#50372A',
  ferrugem: '#8A4C1B',
  laranja: '#F97316',
  laranjaClaro: '#FB923C',
  pessego: '#FDBA74',
};

/** Materiais do estudo de material (rodada 2). */
export const MATERIAIS = {
  chapado: { cerdas: false, relevo: 0 },
  cerda: { cerdas: true, relevo: 0 },
  empasto: { cerdas: true, relevo: 1 },
};
export const MATERIAL_PADRAO = 'empasto';

/** Arquétipos de composição (a estrutura grande da cena). */
export const ARQUETIPOS = ['horizonte', 'vento', 'manchas', 'ondas', 'massas', 'faixas'];

export const PARAMS_PADRAO = {
  densidade: 1, // multiplica a cobertura do corpo
  espessura: 1, // multiplica a largura dos traços
  realce: 1, // quantidade de traços claros (céu/névoa)
  arquetipo: null, // fixa o arquétipo; null = a semente escolhe
  luz: 1, // multiplica a quantidade de manchas quentes (0 = cena sem laranja)
  bandas: undefined, // só no arquétipo faixas: número fixo de estratos
  evita: [], // arquétipos que a semente não pode sortear (ex.: o da faixa do hub onde a capa aparece)
  degrade: false, // só no arquétipo faixas: três estratos do claro (areia) para a noite, de cima para baixo (a fita do rodapé)
  // v11 (rodada 5)
  luas: true, // false: sem "lua garantida" por janela; discos translúcidos, sobrepostos, com traço por cima (telas pequenas)
  zonas: true, // cor em zonas grandes (famílias do quadro), em vez de confete uniforme
  familias: undefined, // só no arquétipo faixas: a família de cada estrato (ex.: ['petroleo', 'ferrugem', 'areia'])
  borda: false, // só com degrade: a borda de cima é pintada e irregular (transparente acima dela, RGBA)
};


function hash(str) {
  let h = 2166136261;
  for (const c of String(str)) {
    h ^= c.codePointAt(0);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(a) {
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Hash inteiro → [0,1) (falhas das cerdas). */
function hashInt(i, s) {
  let h = Math.imul(i ^ s, 0x27d4eb2d);
  h ^= h >>> 15;
  h = Math.imul(h, 0x85ebca6b);
  h ^= h >>> 13;
  return (h >>> 0) / 4294967296;
}
/** Ruído de valor 1D ao longo de uma cerda (falhas do pincel seco), local a cada cerda. */
function ruido1(x, s) {
  const i = Math.floor(x);
  const f = x - i;
  const u = f * f * (3 - 2 * f);
  return hashInt(i, s) * (1 - u) + hashInt(i + 1, s) * u;
}

/** Ruído de valor 2D suave (só para o campo de fluxo e a distribuição de densidade). */
function criaRuido(rnd) {
  const N = 256;
  const perm = new Uint8Array(N * 2);
  const vals = new Float32Array(N);
  for (let i = 0; i < N; i++) {
    perm[i] = i;
    vals[i] = rnd() * 2 - 1;
  }
  for (let i = N - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [perm[i], perm[j]] = [perm[j], perm[i]];
  }
  for (let i = 0; i < N; i++) perm[N + i] = perm[i];
  const v = (x, y) => vals[perm[(perm[x & 255] + y) & 255]];
  const f = (t) => t * t * t * (t * (t * 6 - 15) + 10);
  const n = (x, y) => {
    const xi = Math.floor(x);
    const yi = Math.floor(y);
    const u = f(x - xi);
    const w = f(y - yi);
    const a = v(xi, yi) + u * (v(xi + 1, yi) - v(xi, yi));
    const b = v(xi, yi + 1) + u * (v(xi + 1, yi + 1) - v(xi, yi + 1));
    return a + w * (b - a);
  };
  return (x, y) => n(x, y) * 0.7 + n(x * 2.1 + 17, y * 2.1 + 31) * 0.3;
}

const rgb = (hex) => [parseInt(hex.slice(1, 3), 16), parseInt(hex.slice(3, 5), 16), parseInt(hex.slice(5, 7), 16)];
const C = Object.fromEntries(Object.entries(CORES).map(([k, v]) => [k, rgb(v)]));
/** Valor vizinho do mesmo matiz: v<0 escurece (multiplica), v>0 clareia (mistura com branco). */
const valor = (c, v) => (v < 0 ? c.map((x) => x * (1 + v)) : c.map((x) => x + (255 - x) * v));

// Buffers de rascunho reaproveitados entre traços (o traço é montado num ladrilho e composto uma vez).
let TCAP = 0;
let tCov, tR, tG, tB, tT, tH;
function ladrilho(n) {
  if (n <= TCAP) return;
  TCAP = Math.max(n, TCAP * 2);
  tCov = new Float32Array(TCAP);
  tR = new Float32Array(TCAP);
  tG = new Float32Array(TCAP);
  tB = new Float32Array(TCAP);
  tT = new Float32Array(TCAP);
  tH = new Float32Array(TCAP);
}

/**
 * Pinta uma janela da tela-mestre.
 * @param {object} o
 * @param {string} o.semente
 * @param {[number, number]} o.mestre  largura e altura da tela-mestre, em px de tela
 * @param {{x:number,y:number,w:number,h:number}} [o.janela]  recorte a renderizar (px de tela); padrão: a tela inteira
 * @param {Array<{x:number,y:number,w:number,h:number}>} [o.janelas]  TODAS as janelas do papel (as marcas laranja respeitam cada uma)
 * @param {number} [o.escala=1]  px de dispositivo por px de tela
 * @param {string} [o.material]  chapado | cerda | empasto
 * @param {object} [o.params]  sobrescreve PARAMS_PADRAO; `fixo: true` desliga a variação por semente
 */
export function pintar({ semente, mestre, janela, janelas = [], escala = 1, material = MATERIAL_PADRAO, params = {} }) {
  const [MW, MH] = mestre;
  const jan = janela ?? { x: 0, y: 0, w: MW, h: MH };
  const mat = MATERIAIS[material] ?? MATERIAIS[MATERIAL_PADRAO];
  const rnd = mulberry32(hash(`${semente}|v${VERSAO}`));
  const mao = { densidade: 0.88 + rnd() * 0.24, espessura: 0.9 + rnd() * 0.22 };
  const base = { ...PARAMS_PADRAO, ...params };
  const p = params.fixo ? base : { ...base, densidade: base.densidade * mao.densidade, espessura: base.espessura * mao.espessura };
  const sorte = rnd();
  const candidatos = ARQUETIPOS.filter((a) => !(p.evita ?? []).includes(a));
  const arquetipo = ARQUETIPOS.includes(p.arquetipo) ? p.arquetipo : candidatos[Math.floor(sorte * candidatos.length)];
  const ruido = criaRuido(rnd);

  const W = Math.round(jan.w * escala);
  const H = Math.round(jan.h * escala);
  const cor = new Float32Array(W * H * 3);
  const alt = new Float32Array(W * H);
  // borda pintada (fita do rodapé): a tela começa transparente acima da borda; cada traço acumula cobertura
  const alfa = p.borda && p.degrade ? new Float32Array(W * H).fill(1) : null;
  for (let i = 0; i < W * H; i++) {
    cor[i * 3] = C.fundo[0];
    cor[i * 3 + 1] = C.fundo[1];
    cor[i * 3 + 2] = C.fundo[2];
  }

  // --- Rasterização de um traço (coordenadas de dispositivo) ---
  const relevo = mat.relevo;
  function pincelada(pts, larg, cbase, op, r, o) {
    const n = pts.length / 2;
    if (n < 2) return;
    const s = new Float32Array(n);
    for (let k = 1; k < n; k++) s[k] = s[k - 1] + Math.hypot(pts[2 * k] - pts[2 * k - 2], pts[2 * k + 1] - pts[2 * k - 1]);
    const L = s[n - 1];
    if (L < 1) return;
    let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
    for (let k = 0; k < n; k++) {
      x0 = Math.min(x0, pts[2 * k]);
      x1 = Math.max(x1, pts[2 * k]);
      y0 = Math.min(y0, pts[2 * k + 1]);
      y1 = Math.max(y1, pts[2 * k + 1]);
    }
    const mg = larg * 0.8 + 3;
    const bx0 = Math.max(0, Math.floor(x0 - mg));
    const by0 = Math.max(0, Math.floor(y0 - mg));
    const bx1 = Math.min(W - 1, Math.ceil(x1 + mg));
    const by1 = Math.min(H - 1, Math.ceil(y1 + mg));
    if (bx1 < bx0 || by1 < by0) return;
    const bw = bx1 - bx0 + 1;
    const bh = by1 - by0 + 1;
    ladrilho(bw * bh);

    // amostragem do caminho por comprimento de arco
    let seg = 0;
    const amostra = (sv, out) => {
      if (sv < s[seg]) seg = 0;
      while (seg < n - 2 && s[seg + 1] < sv) seg++;
      const ds = s[seg + 1] - s[seg] || 1;
      const f = Math.min(1, Math.max(0, (sv - s[seg]) / ds));
      const ax = pts[2 * seg], ay = pts[2 * seg + 1], bx = pts[2 * seg + 2], by = pts[2 * seg + 3];
      out[0] = ax + (bx - ax) * f;
      out[1] = ay + (by - ay) * f;
      const dl = Math.hypot(bx - ax, by - ay) || 1;
      out[2] = -(by - ay) / dl;
      out[3] = (bx - ax) / dl;
    };
    // largura ao longo do traço: carregada na entrada, afinando até a saída seca
    const perfil = (t) => (t < 0.08 ? 0.82 + t * 2.6 : 1.03) * (1 - o.afina * Math.pow(t, 1.5));
    const carimbo = (cx, cy, rb, ld, cr, cg, cb, t) => {
      const R = rb + 1;
      const px0 = Math.max(bx0, Math.floor(cx - R)), px1 = Math.min(bx1, Math.ceil(cx + R));
      const py0 = Math.max(by0, Math.floor(cy - R)), py1 = Math.min(by1, Math.ceil(cy + R));
      const ir = 1 / (rb * rb);
      for (let py = py0; py <= py1; py++) {
        const dy = py + 0.5 - cy;
        let idx = (py - by0) * bw + (px0 - bx0);
        for (let px = px0; px <= px1; px++, idx++) {
          const dx = px + 0.5 - cx;
          const d2 = dx * dx + dy * dy;
          if (d2 > R * R) continue;
          const d = Math.sqrt(d2);
          let c = rb + 0.5 - d;
          if (c <= 0) continue;
          if (c > 1) c = 1;
          c *= ld;
          if (c > tCov[idx]) {
            tCov[idx] = c;
            tR[idx] = cr;
            tG[idx] = cg;
            tB[idx] = cb;
            tT[idx] = t;
          }
          // relevo: máximo contínuo, com perfil de platô (1 − (d/r)⁴), sem degraus entre carimbos
          const q2 = d2 * ir;
          const hh = ld * (0.68 + 0.32 * (1 - q2 * q2)); // corpo do traço + sulcos finos das cerdas
          if (hh > tH[idx]) tH[idx] = hh;
        }
      }
    };

    const q = [0, 0, 0, 0];
    if (!mat.cerdas) {
      // chapado: um polígono afinado de cor única (referência do estudo)
      for (let sv = 0; sv <= L; ) {
        const t = sv / L;
        amostra(sv, q);
        const rb = Math.max(0.6, (larg / 2) * perfil(t));
        carimbo(q[0], q[1], rb, 1, cbase[0], cbase[1], cbase[2], t);
        sv += Math.max(0.5, rb * 0.3);
      }
    } else {
      const nb = Math.max(3, Math.min(18, Math.round(larg / escala / 1.9)));
      const nest = 2 + Math.floor(r() * 3);
      const est = [];
      const ordem = [-1, 1, -0.4, 0.6].sort(() => r() - 0.5);
      for (let e = 0; e < nest; e++) {
        est.push({
          cor: valor(cbase, ordem[e] * (0.05 + r() * 0.09) * o.contraste),
          dl: (r() - 0.5) * 0.14 * larg, // desalinhamento lateral
          t0: r() * 0.1,
          corte: r() * 0.18,
        });
      }
      const sp = larg / nb;
      const rb0 = sp * 0.82 + 0.3 * escala;
      for (let i = 0; i < nb; i++) {
        const e = est[Math.min(nest - 1, Math.floor((i * nest) / nb))];
        const u = (i + 0.5) / nb - 0.5 + (r() - 0.5) * (0.45 / nb);
        const jit = 1 + (r() - 0.5) * 0.1;
        const cr = Math.min(255, e.cor[0] * jit), cg = Math.min(255, e.cor[1] * jit), cb = Math.min(255, e.cor[2] * jit);
        const t0 = e.t0 + r() * 0.05 + u * u * 0.35; // entrada arredondada: as cerdas de fora tocam depois
        const t1 = Math.max(t0 + 0.25, 1 - e.corte - Math.pow(r(), 1.6) * 0.3 - Math.abs(u) * 0.3);
        const carga = 0.82 + r() * 0.18;
        const semC = (r() * 1e9) | 0;
        const fase = r() * 6.28;
        const rb = rb0 * (0.8 + r() * 0.4);
        const passo = Math.max(0.5, rb * 0.55);
        for (let sv = t0 * L; sv <= t1 * L; sv += passo) {
          const t = sv / L;
          const tt = (t - t0) / (t1 - t0);
          let ld = carga * (1 - o.secura * 0.45 * tt * tt);
          if (tt > 0.3) {
            const seco = Math.pow((tt - 0.3) / 0.7, 1.2) * o.secura;
            if (ruido1(sv / (2.4 * escala), semC) < seco) continue; // falha da cerda seca
          }
          amostra(sv, q);
          const w = larg * perfil(t);
          const off = u * w + e.dl * (1 - t * 0.5) + Math.sin(t * 6 + fase) * 0.035 * larg;
          carimbo(q[0] + q[2] * off, q[1] + q[3] * off, Math.max(0.55, rb), ld, cr, cg, cb, t);
        }
      }
    }

    // composição: cobertura parcial + arrasto da tinta de baixo na saída + relevo
    const arr = o.arrasto;
    for (let py = by0; py <= by1; py++) {
      let idx = (py - by0) * bw;
      let ci = py * W + bx0;
      for (let px = bx0; px <= bx1; px++, idx++, ci++) {
        const cv = tCov[idx];
        if (cv <= 0) continue;
        tCov[idx] = 0;
        const th = tH[idx];
        tH[idx] = 0;
        const a = cv * op;
        const k3 = ci * 3;
        const mix = arr * tT[idx];
        const r0 = cor[k3], g0 = cor[k3 + 1], b0 = cor[k3 + 2];
        const nr = tR[idx] + (r0 - tR[idx]) * mix;
        const ng = tG[idx] + (g0 - tG[idx]) * mix;
        const nb2 = tB[idx] + (b0 - tB[idx]) * mix;
        if (alfa) {
          // composição "sobre" com alfa: onde ainda é vazio, a cor é a do traço
          const a0 = alfa[ci];
          const na = a0 + (1 - a0) * a;
          const w1 = na > 0 ? a / na : 1;
          cor[k3] = r0 + (nr - r0) * w1;
          cor[k3 + 1] = g0 + (ng - g0) * w1;
          cor[k3 + 2] = b0 + (nb2 - b0) * w1;
          alfa[ci] = na;
        } else {
          cor[k3] = r0 + (nr - r0) * a;
          cor[k3 + 1] = g0 + (ng - g0) * a;
          cor[k3 + 2] = b0 + (nb2 - b0) * a;
        }
        if (relevo) alt[ci] = alt[ci] * (1 - a * 0.85) + th * o.carga * a;
      }
    }
  }


  // ===================== Composição =====================
  const OPT = { afina: 0.5, secura: 0.6, contraste: 1, arrasto: 0.22, carga: 1 };
  const e = p.espessura;
  const sub = () => (rnd() * 4294967296) >>> 0;
  const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
  const pick = (r, pares) => {
    let t = r() * pares.reduce((s, [, w]) => s + w, 0);
    for (const [c, w] of pares) if ((t -= w) <= 0) return c;
    return pares[0][0];
  };
  /** log-normal barato: m × e^(±s), mais denso perto de m. */
  const varia = (m, s) => m * Math.exp((rnd() + rnd() - 1) * s);
  const freq = 1 / (300 + rnd() * 220);
  const fluxoBase = (rnd() - 0.5) * 0.5;

  // Paletas por valor (o arquétipo distribui pela cena). Cada uma mistura as famílias do quadro:
  // o escuro é fundo azul-acinzentado com marrom; o médio é petróleo/ardósia com terra; o claro é
  // ardósia clara, areia e aqua; o quente é ferrugem, terra e marrom (as torres do quadro).
  const PAL = {
    escuro: [[C.fundo, 1.6], [C.fundo2, 0.6], [C.azulNoite, 0.3], [C.petroleo2, 4], [C.marrom2, 1.2], [C.terra, 0.9], [C.ferrugem, 0.4]],
    medio: [[C.petroleo, 4], [C.petroleo2, 3], [C.ardosia, 3], [C.marrom, 1.6], [C.terra, 1.6], [C.ferrugem, 0.7], [C.areia, 0.8], [C.azulNoite, 0.3]],
    claro: [[C.ardosia2, 3], [C.areia, 3], [C.areiaClara, 2], [C.aqua, 1.5], [C.ardosia, 1.5], [C.ocre, 0.6], [C.marrom, 0.6], [C.terra, 0.5]],
    ceu: [[C.petroleo, 4], [C.ardosia, 3], [C.ardosia2, 2.5], [C.aqua, 1.4], [C.petroleo2, 1.5], [C.areia, 0.8], [C.terra, 0.5], [C.ferrugem, 0.3], [C.ocre, 0.3]],
    quente: [[C.ferrugem, 3], [C.terra, 3], [C.marrom, 2.5], [C.areia, 1.4], [C.ocre, 1], [C.marrom2, 1], [C.petroleo, 1.3], [C.ardosia, 0.6]],
    passagem: [[C.areiaClara, 4], [C.areia, 3], [C.branco, 1], [C.pessego, 0.5], [C.ardosia2, 1], [C.ocre, 0.6]],
    emenda: [[C.creme, 4], [C.papel, 1.5], [C.areiaClara, 2], [C.pessego, 0.6], [C.branco, 1]], // topo da fita do rodapé: casa com papel/creme
  };

  const REAL = {
    frio: [[C.ardosia2, 3], [C.aqua, 2], [C.areia, 1.5], [C.petroleo, 1]],
    claro: [[C.areiaClara, 3], [C.branco, 1.5], [C.aqua, 1.5], [C.ardosia2, 2]],
    costura: [[C.areiaClara, 3], [C.branco, 1.5], [C.pessego, 1], [C.ocre, 1]],
    quente: [[C.ocre, 2], [C.pessego, 1.2], [C.areia, 2], [C.ferrugem, 1.2]],
  };
  // Zonas de cor (v11): como no quadro, a cor se organiza em áreas grandes — o céu de areia, o
  // azul-petróleo das montanhas, a cidade de ferrugem —, cada uma dominada por uma família, com um
  // pouco da complementar dentro (nunca monocromático). `pal` é o corpo, `claro` o valor alto
  // (cristas, faixas claras), `escuro` a subpintura e as cavas. Gerador próprio: não altera o
  // sorteio das telas já aprovadas (abertura).
  const FAM = {
    petroleo: { pal: [[C.petroleo, 4], [C.petroleo2, 3], [C.aqua, 1], [C.ardosia, 1.3], [C.terra, 0.6], [C.ferrugem, 0.4]], claro: [[C.aqua, 3], [C.ardosia2, 2.5], [C.areiaClara, 1], [C.petroleo, 1]], escuro: [[C.petroleo2, 4], [C.azulNoite, 2], [C.fundo, 1], [C.marrom2, 0.5]] },
    ferrugem: { pal: [[C.ferrugem, 3.5], [C.terra, 3], [C.marrom, 1.5], [C.ocre, 1], [C.petroleo2, 1.2], [C.petroleo, 0.8]], claro: [[C.ocre, 3], [C.areia, 2.5], [C.areiaClara, 1.2], [C.pessego, 0.4]], escuro: [[C.marrom2, 3], [C.terra, 2], [C.petroleo2, 1.5], [C.fundo2, 0.6]] },
    areia: { pal: [[C.areiaClara, 3.5], [C.areia, 3], [C.branco, 1], [C.ocre, 1], [C.petroleo, 1.2], [C.ardosia2, 0.8]], claro: [[C.areiaClara, 3], [C.branco, 2], [C.areia, 1.5]], escuro: [[C.marrom, 2], [C.terra, 1.5], [C.petroleo2, 2]] },
    ardosia: { pal: [[C.ardosia, 4], [C.ardosia2, 3], [C.aqua, 1], [C.petroleo, 1.5], [C.marrom, 0.6]], claro: [[C.ardosia2, 3], [C.aqua, 2], [C.branco, 1]], escuro: [[C.petroleo2, 3], [C.ardosia, 1.5], [C.fundo, 1]] },
    marrom: { pal: [[C.marrom, 4], [C.terra, 2.5], [C.marrom2, 1.2], [C.areia, 1], [C.petroleo, 1.2], [C.ocre, 0.6]], claro: [[C.areia, 3], [C.areiaClara, 2], [C.ocre, 1]], escuro: [[C.marrom2, 3], [C.terra, 2], [C.petroleo2, 1.2]] },
  };
  // subpintura da zona: o próprio corpo um tom abaixo — o chão entre os traços é da cor da zona,
  // não o azul-noite (é isso que faz a zona ler como área, e não como confete sobre fundo escuro)
  for (const F of Object.values(FAM)) F.sub = F.pal.map(([c, w]) => [valor(c, -0.22), w]);
  const rz = mulberry32(hash(`${semente}|zonas|v${VERSAO}`));
  const ruidoZ = criaRuido(rz);
  // petróleo duas vezes no ciclo: é a família-mãe do quadro (e a meta de petróleo das capas)
  const CICLO = ['petroleo', 'ferrugem', 'areia', 'petroleo', 'ardosia', 'marrom'];
  // centros em grade com folga (toda tela, mesmo pequena, vê mais de uma zona); vizinhos de família diferente
  const nZ0 = clamp(Math.round((MW * MH) / (360 * 360)), 3, 12);
  const colsZ = Math.max(1, Math.round(Math.sqrt((nZ0 * MW) / MH)));
  const linsZ = Math.max(1, Math.ceil(nZ0 / colsZ));
  const nZ = colsZ * linsZ;
  const f0 = Math.floor(rz() * CICLO.length);
  const centrosZ = Array.from({ length: nZ }, (_, i) => {
    const cx = i % colsZ, cy = Math.floor(i / colsZ);
    return { x: ((cx + 0.2 + rz() * 0.6) / colsZ) * MW, y: ((cy + 0.2 + rz() * 0.6) / linsZ) * MH, fam: CICLO[(f0 + i + cy) % CICLO.length] };
  });
  // o centro da mestre (onde caem o recorte dos cards e o retrato) é sempre de petróleo, a família-mãe:
  // troca de família com o centro de petróleo mais próximo
  {
    const dC = (c) => Math.hypot(c.x - MW / 2, c.y - MH / 2);
    const centro = centrosZ.reduce((a, c) => (dC(c) < dC(a) ? c : a));
    const pet = centrosZ.filter((c) => c.fam === 'petroleo').sort((a, b) => dC(a) - dC(b))[0];
    if (centro.fam !== 'petroleo') [centro.fam, (pet ?? { fam: 'petroleo' }).fam] = ['petroleo', centro.fam];
  }
  const fZ = 1 / 240;
  const zonaCor = (x, y) => {
    let best = Infinity, f = centrosZ[0].fam;
    for (let i = 0; i < nZ; i++) {
      const c = centrosZ[i];
      const d = Math.hypot(x - c.x, (y - c.y) * 1.25) + ruidoZ(x * fZ + i * 7.1, y * fZ + i * 3.7) * 110;
      if (d < best) [best, f] = [d, c.fam];
    }
    return FAM[f];
  };
  // o chão também é da zona (um tom fundo da família), não o azul-noite uniforme: entre os traços,
  // a zona continua lendo como área de cor. A abertura (horizonte) e a fita do rodapé têm chão próprio.
  const CHAO = { petroleo: valor(C.petroleo2, -0.3), ferrugem: valor(C.terra, -0.4), areia: valor(C.marrom, -0.35), ardosia: valor(C.ardosia, -0.42), marrom: valor(C.marrom2, -0.1) };
  for (const [k, F] of Object.entries(FAM)) F.chao = CHAO[k];
  if (p.zonas && arquetipo !== 'horizonte' && !p.degrade) {
    const passo = Math.max(1, Math.round(3 * escala));
    for (let py = 0; py < H; py += passo) {
      for (let px = 0; px < W; px += passo) {
        const c = zonaCor(jan.x + (px + passo / 2) / escala, jan.y + (py + passo / 2) / escala).chao;
        for (let yy = py; yy < Math.min(H, py + passo); yy++) {
          for (let xx = px; xx < Math.min(W, px + passo); xx++) {
            const k = (yy * W + xx) * 3;
            cor[k] = c[0];
            cor[k + 1] = c[1];
            cor[k + 2] = c[2];
          }
        }
      }
    }
  }

  // Manchas: a cor é sorteada primeiro por FAMÍLIA do quadro (nenhuma passa de ~30% dos discos),
  // depois o tom dentro dela. O azul-claro da marca entra só como acento raro.
  const FAMILIAS = [
    [[[C.areiaClara, 3], [C.areia, 2], [C.pessego, 1]], 0.95], // areia/pêssego
    [[[C.aqua, 3], [C.ardosia2, 2], [C.ceu, 0.2]], 1.1], // aqua
    [[[C.branco, 3], [C.nevoa, 0.25]], 0.8], // branco
    [[[C.ocre, 3], [C.marrom, 1.5], [C.terra, 0.8]], 0.9], // ocre
    [[[C.azulNoite, 3], [C.petroleo2, 2], [C.fundo, 0.8]], 0.9], // azul-noite
  ];
  const NOMES_FAMILIA = ['areia', 'aqua', 'branco', 'ocre', 'azul-noite'];
  let ultimaFamilia = 0;
  // as famílias se revezam (a partir de uma sorteada, com saltos ocasionais): mesmo uma tela com
  // poucos discos mostra a variedade do quadro e nenhuma família domina; o peso decide os saltos
  let fam = Math.floor(rnd() * FAMILIAS.length);
  const corMancha = (r) => {
    fam = (fam + 1 + (r() < 0.3 ? 1 : 0)) % FAMILIAS.length;
    if (r() > FAMILIAS[fam][1]) fam = (fam + 1) % FAMILIAS.length; // família de peso menor cede a vez às vezes
    const fi = fam;
    ultimaFamilia = fi;
    return pick(r, FAMILIAS[fi][0]);
  };
  const MANCHA = {
    quente: [[C.pessego, 2], [C.laranjaClaro, 2], [C.laranja, 1.5], [C.ferrugem, 1]],
    luz: [[C.laranja, 2.5], [C.laranjaClaro, 2], [C.pessego, 1], [C.ocre, 1]],
  };
  const ehQuente = (c) => c === C.pessego || c === C.laranja || c === C.laranjaClaro;

  // Respiro: áreas em que o corpo rareia e o chão aparece (o "ar" da v1). Baixa frequência.
  const ar = (x, y) => clamp(0.5 + ruido(x * freq * 0.45 + 300, y * freq * 0.45 + 120) * 1.7, 0, 1);

  // --- Marcas laranja: inteiras ou inteiramente fora de cada janela do papel ---
  const todas = janelas.length ? janelas : [{ x: 0, y: 0, w: MW, h: MH }];
  const inteira = (x, y, rv) =>
    todas.every((j) => {
      const mg = rv + 3;
      const dentro = x - mg >= j.x && x + mg <= j.x + j.w && y - mg >= j.y && y + mg <= j.y + j.h;
      const fora = x + mg < j.x || x - mg > j.x + j.w || y + mg < j.y || y - mg > j.y + j.h;
      return j.semLuz ? fora : dentro || fora;
    });

  const lum = (c) => c[0] * 0.3 + c[1] * 0.59 + c[2] * 0.11;
  // Manchas redondas (lista montada pelo arquétipo). Tamanho, opacidade, sobreposição e borda
  // variam por disco: nenhum carimbo repetido. Os primeiros sorteios de cada lote são grandes, para
  // garantir a razão de tamanho (o quadro tem luas de 6–10× o diâmetro dos pingos).
  const manchas = [];
  const semear = ({ n, rMin = 3.5, rMax, aceita = () => true, quente = 0.12, sobrepoe = 0.78 }) => {
    // sem luas (telas pequenas): discos menores, translúcidos e sobrepostos, nenhum garantido por janela
    const rTeto = Math.max(rMin + 1, p.luas ? rMax : rMax * 0.7);
    if (!p.luas) sobrepoe *= 0.3;
    const comLua = todas.filter((j) => !j.semLua);
    const grandes = p.luas && comLua.length ? Math.max(3, Math.round(n / 12)) : 0;
    const tetoQuente = Math.max(1, Math.round(n * 0.12)); // manchas laranja nunca dominam a tela
    let quentes = 0;
    for (let i = 0; i < n; i++) {
      // as grandes caem dentro das janelas do papel (uma por vez), para toda janela ter a sua lua
      const jg = i < grandes ? comLua[i % comLua.length] : null;
      const x = jg ? jg.x + rnd() * jg.w : rnd() * MW;
      const y = jg ? jg.y + rnd() * jg.h : rnd() * MH;
      const r = i < grandes ? rTeto * (0.62 + rnd() * 0.38) : rMin + (rTeto - rMin) * Math.pow(rnd(), 2.9);
      // luz rara: manchas quentes são mais prováveis pequenas (disco grande laranja só às vezes)
      const q = rnd() < quente * p.luz * (r > 26 ? 0.3 : 1.15 - r / 40) && quentes < tetoQuente;
      let c = q ? pick(rnd, MANCHA.quente) : corMancha(rnd);
      const familia = q ? 'laranja' : NOMES_FAMILIA[ultimaFamilia];
      let c2 = q ? pick(rnd, MANCHA.quente) : rnd() < 0.5 ? corMancha(rnd) : c;
      const s = sub();
      const op = p.luas ? 0.6 + rnd() * 0.37 : 0.32 + rnd() * 0.3;
      const sob = sobrepoe * (0.5 + rnd() * 0.65);
      const borda = rnd(); // < 0.28: sem borda; senão arcos com falhas de densidade variável
      if (!aceita(x, y, r)) continue;
      // janela sem lua (o recorte do celular na abertura): disco grande que a toque fica de fora
      if (r > 16 && todas.some((j) => j.semLua && x + r > j.x && x - r < j.x + j.w && y + r > j.y && y - r < j.y + j.h)) continue;
      if (manchas.some((m) => Math.hypot(m.x - x, m.y - y) < (m.r + r) * sob)) continue;
      if (q && !inteira(x, y, r)) [c, c2] = [C.areiaClara, C.areia]; // laranja cortado lê como defeito: vira areia
      // segunda cor sempre de valor vizinho: nada de miolo escuro numa mancha clara
      if (!q && Math.abs(lum(c2) - lum(c)) > 60) c2 = c;
      if (q) quentes++;
      manchas.push({ x, y, r, c, c2, s, op, borda, familia });
    }
    // pingos: gotas pequenas espalhadas entre as luas (no quadro, os pontos miúdos do céu)
    const nP = Math.round(n * 0.35) + 2;
    for (let i = 0; i < nP; i++) {
      const x = rnd() * MW;
      const y = rnd() * MH;
      const r = rMin * (0.9 + rnd() * 0.6);
      const c = corMancha(rnd);
      const familia = NOMES_FAMILIA[ultimaFamilia];
      const s = sub();
      const op = p.luas ? 0.7 + rnd() * 0.27 : 0.45 + rnd() * 0.3;
      if (!aceita(x, y, r)) continue;
      if (manchas.some((m) => Math.hypot(m.x - x, m.y - y) < m.r + r)) continue;
      manchas.push({ x, y, r, c, c2: c, s, op, borda: 0, familia });
    }
  };
  // Pequenos toques quentes (janelas acesas, reflexos): cada um só se couber inteiro.
  const toques = [];
  const toque = (x, y, ang, comp, larg, cores = MANCHA.quente) => {
    const c = pick(rnd, cores);
    const s = sub();
    if (ehQuente(c) && !inteira(x, y, Math.max(comp, larg) * 0.7)) return;
    toques.push({ x, y, ang, comp, larg, c, s });
  };

  // --- Arquétipos: campo de ângulo, zonas (paleta/densidade/escala) e marcas próprias ---
  let angulo;
  let zona;
  let foraDaBorda = () => false; // fita com borda pintada: faíscas não caem acima da borda
  let marcas = () => {};
  const rMaxMancha = Math.min(66, Math.max(MH * 0.17, 26), MW * 0.17);

  if (arquetipo === 'horizonte') {
    const vertical = MH > MW * 1.2;
    const hy = MH * (vertical ? 0.62 + rnd() * 0.12 : 0.64 + rnd() * 0.12);
    const amp = Math.min(MH * 0.44, 240) * (0.7 + rnd() * 0.4);
    const fr = 1 / (240 + rnd() * 300);
    const off = rnd() * 100;
    const crista = (x) => hy - amp * clamp(0.1 + 0.9 * ((ruido(x * fr + off, 7.3) * 2.2 + 1) / 2), 0.06, 1);
    angulo = (x, y) => {
      const cy = crista(x);
      if (y < cy) return fluxoBase + ruido(x * freq, y * freq) * 1.15;
      if (y < hy) return Math.atan2(crista(x + 8) - crista(x - 8), 16) * 0.8 + ruido(x * freq * 2, y * freq * 2) * 0.35;
      return ruido(x * freq * 3, y * freq) * 0.12;
    };
    // passagem clara de céu: uma massa de areia/pêssego de baixa frequência, puxada para o alto e
    // para um dos lados (no quadro, o alto-esquerdo), sem contorno duro
    const ladoP = rnd() < 0.65 ? 0 : 1;
    const fP = 1 / (420 + rnd() * 200);
    const passagem = (x, y) => ruido(x * fP + 50, y * fP + 80) * 1.3 + (ladoP ? x / MW : 1 - x / MW) * 0.75 + (1 - y / Math.max(hy, 1)) * 0.55 - 1.04;
    // a massa é a cidade: colunas de largura variada, umas de tijolo (ferrugem/terra), outras azul-noite
    const fC = 1 / (55 + rnd() * 40);
    const coluna = (x) => {
      const k = Math.floor(x * fC + ruido(x * fC * 0.3, 3.7) * 0.6);
      return hashInt(k, 977) < 0.62 ? 'tijolo' : 'noite';
    };
    zona = (x, y) => {
      const cy = crista(x);
      if (y < cy) {
        if (passagem(x, y) > 0) return { cheio: true, pal: PAL.passagem, dens: 0.95, comp: 30, larg: 13, realce: 0.18, palR: REAL.claro, sub: [[C.areia, 3], [C.ardosia2, 2], [C.marrom, 1]] };
        return { cheio: true, pal: PAL.ceu, dens: 0.92, comp: 30, larg: 12, realce: 0.2, palR: REAL.claro, sub: [[C.petroleo2, 4], [C.petroleo, 3], [C.ardosia, 2]] };
      }
      if (y < hy) {
        const borda = cy + 16 > y;
        const tijolo = coluna(x) === 'tijolo';
        return {
          cheio: true,
          pal: tijolo ? [[C.ferrugem, 3], [C.terra, 3], [C.marrom, 1.5], [C.marrom2, 1.5], [C.azulNoite, 0.8]] : [[C.fundo, 3], [C.fundo2, 2], [C.azulNoite, 2.5], [C.marrom2, 1.2], [C.petroleo2, 0.6]],
          dens: 0.95, comp: 40, larg: 13, realce: borda ? 0.9 : 0.03, palR: REAL.claro,
          sub: tijolo ? [[C.terra, 3], [C.marrom2, 3], [C.ferrugem, 1]] : [[C.fundo, 3], [C.azulNoite, 3], [C.fundo2, 1]],
        };
      }
      // água: petróleo claro na frente (a meta de petróleo das capas, cujo recorte cai na linha d'água)
      return { pal: [[C.petroleo, 4.5], [C.petroleo2, 2.5], [C.azulNoite, 1.5], [C.fundo, 1], [C.terra, 1], [C.ardosia, 1.2]], dens: 0.7, comp: 24, larg: 9, realce: 0.05, palR: REAL.frio, sub: [[C.fundo, 3], [C.petroleo2, 3], [C.azulNoite, 2], [C.marrom2, 1]] };
    };
    // céu salpicado (mais denso no alto), poucas manchas descendo sobre a massa
    semear({ n: Math.round((MW * hy) / 1700), rMax: rMaxMancha, quente: 0.16, aceita: (x, y, r) => y + r * 0.4 < crista(x) && rnd() < 0.45 + 0.55 * (1 - y / hy) });
    marcas = () => {
      // crista: traços claros que desenham o contorno da massa contra o céu
      for (let x = -30; x < MW + 30; ) {
        const comp = 22 + rnd() * 40;
        const y = crista(x) + 3 + rnd() * 5;
        const a = Math.atan2(crista(x + 10) - crista(x - 10), 20);
        const c = pick(rnd, [[C.areiaClara, 3], [C.branco, 1.5], [C.aqua, 1.5]]);
        const s = sub();
        reto(x + Math.cos(a) * comp * 0.5, y + Math.sin(a) * comp * 0.5, a, comp, (4 + rnd() * 2.5) * e, c, 0.9, s);
        x += comp * (0.6 + rnd() * 1.1);
      }
      // linha d'água
      for (let x = -40; x < MW + 40; ) {
        const comp = 40 + rnd() * 90;
        const c = pick(rnd, [[C.areiaClara, 2], [C.branco, 1], [C.ocre, 1.5], [C.aqua, 1.2], [C.ferrugem, 1]]);
        const s = sub();
        reto(x + comp / 2, hy + (rnd() - 0.5) * 4, (rnd() - 0.5) * 0.04, comp, (4 + rnd() * 2.5) * e, c, 0.9, s);
        x += comp * (0.7 + rnd() * 0.9);
      }
      // reflexos: faixas verticais descendo da linha d'água, como no quadro — a maioria quente
      // (laranja, ocre, ferrugem, areia: as luzes da cidade na água), algumas frias (aqua, branco)
      const nCol = Math.round(MW / 34);
      for (let i = 0; i < nCol; i++) {
        const x = rnd() * MW;
        const quente = rnd() < 0.62 * Math.min(1.3, p.luz);
        const cores = quente ? [[C.laranja, 1.6 * p.luz], [C.laranjaClaro, 1.2], [C.ocre, 2], [C.ferrugem, 2.2], [C.areia, 1.2], [C.pessego, 0.6]] : [[C.aqua, 2], [C.branco, 1], [C.ardosia2, 2], [C.petroleo, 1]];
        const prof = (MH - hy) * (0.3 + rnd() * 0.65);
        const larg = (9 + rnd() * 11) * e;
        for (let y = hy + 6; y < hy + prof; ) {
          const comp = 16 + rnd() * 40;
          if (rnd() < 0.86 - ((y - hy) / prof) * 0.45) toque(x + (rnd() - 0.5) * 5, y + comp / 2, Math.PI / 2 + (rnd() - 0.5) * 0.06, comp, larg * (0.8 + rnd() * 0.4), cores);
          y += comp + 1 + rnd() * 7;
        }
      }
      // janelas acesas nas colunas de tijolo, em grupos (andares), perto da base
      const nJ = Math.round(MW / 60);
      for (let i = 0; i < nJ; i++) {
        let x = rnd() * MW;
        if (coluna(x) !== 'tijolo' && rnd() < 0.7) x = rnd() * MW;
        const yb = hy - 10 - rnd() * Math.max(4, hy - crista(x) - 24);
        const n = 1 + Math.floor(rnd() * 3);
        for (let k = 0; k < n; k++) toque(x + k * (14 + rnd() * 5), yb, Math.PI / 2, 12 + rnd() * 9, (8 + rnd() * 4) * e, MANCHA.luz);
      }
    };
  } else if (arquetipo === 'vento') {
    const th = (rnd() < 0.5 ? -1 : 1) * (0.3 + rnd() * 0.42);
    const lam = 170 + rnd() * 260;
    const dx = Math.cos(th), dy = Math.sin(th);
    const faseV = (x, y) => ((-x * dy + y * dx) / lam) * 6.283 + ruido(x * freq * 0.7, y * freq * 0.7) * 2.4;
    const banda = (x, y) => 0.5 + 0.5 * Math.sin(faseV(x, y));
    angulo = (x, y) => th + ruido(x * freq, y * freq) * 0.42 + Math.sin((x * dx + y * dy) / 260) * 0.12;
    // correntes alternam frio e quente (petróleo × ferrugem), o par complementar do quadro
    // (no lado que sobe de cada corrente, terra/ferrugem; no que desce, petróleo)
    const quenteV = (x, y) => Math.cos(faseV(x, y)) > -0.15;
    zona = (x, y) => {
      const b = banda(x, y);
      if (p.zonas) {
        // as correntes atravessam zonas de cor: o valor vem da corrente, a família vem da zona
        const F = zonaCor(x, y);
        if (b > 0.72) return { pal: F.claro, dens: 0.95, comp: 62, larg: 11, realce: 0.2 + (b - 0.72) * 2.2, palR: REAL.claro, sub: F.sub };
        if (b > 0.36) return { pal: F.pal, dens: 0.92, comp: 56, larg: 12, realce: 0.06, palR: quenteV(x, y) ? REAL.quente : REAL.frio, sub: F.sub };
        return { pal: F.escuro, dens: 0.82, comp: 46, larg: 13, realce: 0.02, palR: REAL.frio, sub: F.escuro };
      }
      if (b > 0.72) return { pal: PAL.claro, dens: 0.95, comp: 62, larg: 11, realce: 0.2 + (b - 0.72) * 2.2, palR: REAL.claro };
      if (b > 0.36) return quenteV(x, y) ? { pal: PAL.quente, dens: 0.88, comp: 56, larg: 12, realce: 0.07, palR: REAL.quente } : { pal: PAL.medio, dens: 0.88, comp: 56, larg: 12, realce: 0.06, palR: REAL.frio };
      return { pal: [[C.petroleo2, 3.5], [C.fundo, 2], [C.azulNoite, 0.8], [C.marrom2, 1], [C.petroleo, 1.5]], dens: 0.78, comp: 46, larg: 13, realce: 0.02, palR: REAL.frio };
    };
    semear({ n: Math.round((MW * MH) / 11000), rMax: Math.min(34, rMaxMancha), quente: 0.22 });
    marcas = () => {
      // rajadas: traços muito longos e finos que atravessam
      const n = Math.round((MW * MH) / 26000);
      for (let i = 0; i < n; i++) {
        const x = rnd() * MW, y = rnd() * MH;
        const c = pick(rnd, [[C.areiaClara, 2.5], [C.aqua, 2], [C.ardosia2, 1.5], [C.ocre, 1.5], [C.laranjaClaro, 0.4]]);
        const s = sub();
        const comp = 110 + rnd() * 160;
        if (banda(x, y) > 0.45) traco(x, y, comp, (3.8 + rnd() * 2.4) * e, c, 0.85, s, { ...OPT, secura: 0.75, afina: 0.75 });
      }
    };
  } else if (arquetipo === 'manchas') {
    angulo = (x, y) => fluxoBase + ruido(x * freq, y * freq) * 1.25;
    zona = (x, y) => {
      const a = ar(x, y);
      const q = ruido(x * freq * 0.5 + 11, y * freq * 0.5 + 29) > 0.36;
      if (p.zonas) {
        const F = zonaCor(x, y);
        return { pal: F.pal, dens: 0.8 + 0.2 * a, comp: 30, larg: 12, realce: 0.07, palR: q ? REAL.quente : REAL.frio, sub: F.sub };
      }
      return { pal: q ? PAL.quente : PAL.ceu, dens: 0.75 + 0.25 * a, comp: 30, larg: 12, realce: 0.07, palR: q ? REAL.quente : REAL.frio };
    };
    const alvo = MW * MH * 0.2;
    let area = 0;
    const fC = freq * 0.8;
    for (let lote = 0; lote < 40 && area < alvo; lote++) {
      const antes = manchas.length;
      semear({ n: 60, rMax: rMaxMancha * 1.1, quente: 0.14, sobrepoe: 0.82, aceita: (x, y) => rnd() < 0.3 + 0.7 * clamp(0.5 + ruido(x * fC + 40, y * fC + 9), 0, 1) });
      for (let k = antes; k < manchas.length; k++) area += Math.PI * manchas[k].r ** 2;
    }
  } else if (arquetipo === 'ondas') {
    const lam = 520 + rnd() * 620;
    const k = 6.283 / lam;
    const A = (0.17 + rnd() * 0.2) / k;
    const f1 = rnd() * 6.28, f2 = rnd() * 6.28;
    const P = 95 + rnd() * 110;
    const env = (y) => 0.65 + 0.35 * Math.sin((y / Math.max(MH, 1)) * Math.PI);
    const y0 = (x, y) => (A * Math.sin(k * x + f1) + A * 0.35 * Math.sin(2.3 * k * x + f2)) * env(y);
    const inclina = (x, y) => (A * k * Math.cos(k * x + f1) + A * 0.35 * 2.3 * k * Math.cos(2.3 * k * x + f2)) * env(y);
    const fase = (x, y) => {
      const v = (y - y0(x, y) + ruido(x * freq, y * freq) * 22) / P;
      return v - Math.floor(v);
    };
    angulo = (x, y) => Math.atan(inclina(x, y)) + ruido(x * freq * 2, y * freq * 2) * 0.22;
    zona = (x, y) => {
      const f = fase(x, y);
      const crista = Math.exp(-(((f - 0.5) / 0.13) ** 2));
      if (p.zonas) {
        const F = zonaCor(x, y);
        if (crista > 0.5) return { pal: F.claro, dens: 0.95, comp: 48, larg: 11, realce: 0.3 + crista * 0.55, palR: REAL.claro, sub: F.sub };
        if (f < 0.25) return { pal: F.escuro, dens: 0.7, comp: 52, larg: 12, realce: 0.03, palR: REAL.frio, sub: F.escuro };
        return { pal: F.pal, dens: 0.9, comp: 52, larg: 12, realce: 0.04, palR: REAL.frio, sub: F.sub };
      }
      if (crista > 0.5) return { pal: PAL.claro, dens: 0.95, comp: 48, larg: 11, realce: 0.3 + crista * 0.55, palR: REAL.claro };
      // ondas alternadas: uma de petróleo, a seguinte de terra/ferrugem (o par complementar)
      const quente = Math.floor((y - y0(x, y) + ruido(x * freq, y * freq) * 22) / P) % 2 !== 0;
      if (f < 0.25) return { pal: PAL.escuro, dens: 0.6, comp: 52, larg: 12, realce: 0.03, palR: REAL.frio };
      return { pal: quente ? PAL.quente : PAL.medio, dens: 0.86, comp: 52, larg: 12, realce: 0.04, palR: quente ? REAL.quente : REAL.frio };
    };
    semear({ n: Math.round((MW * MH) / 9000), rMax: Math.min(30, rMaxMancha), quente: 0.16, aceita: (x, y) => fase(x, y) < 0.3 });
    marcas = () => {
      // espuma: toques curtos claros pousados nas cristas
      const n = Math.round((MW * MH) / 2400);
      for (let i = 0; i < n; i++) {
        const x = rnd() * MW, y = rnd() * MH;
        const comp = 6 + rnd() * 10;
        const c = pick(rnd, [[C.branco, 2], [C.areiaClara, 2], [C.aqua, 1.5]]);
        const s = sub();
        const f = fase(x, y);
        if (Math.abs(f - 0.42) < 0.05) reto(x, y, Math.atan(inclina(x, y)), comp, (5 + rnd() * 3) * e, c, 0.92, s);
      }
    };
  } else if (arquetipo === 'massas') {
    const longo = MW >= MH;
    // as três massas sempre: bloco (tijolo e noite), campo (petróleo) e área clara (areia)
    const n = 3;
    const tipos = ['bloco', 'campo', 'claro'].sort(() => rnd() - 0.5);
    const sementes = tipos.map((tipo, i) => {
      const t = (i + 0.2 + rnd() * 0.6) / n;
      const u = 0.25 + rnd() * 0.5;
      return { tipo, x: longo ? MW * t : MW * u, y: longo ? MH * u : MH * t, a: tipo === 'bloco' ? Math.PI / 2 : tipo === 'campo' ? (rnd() - 0.5) * 0.25 : (rnd() < 0.5 ? -1 : 1) * (0.5 + rnd() * 0.3) };
    });
    const fM = 1 / (260 + rnd() * 200);
    const dono = (x, y) => {
      let a = Infinity, b = Infinity, ia = 0;
      sementes.forEach((s, i) => {
        const d = Math.hypot(x - s.x, (y - s.y) * (longo ? 1.6 : 0.6)) + ruido(x * fM + i * 13, y * fM + i * 7) * 120;
        if (d < a) [b, a, ia] = [a, d, i];
        else if (d < b) b = d;
      });
      return [sementes[ia], b - a];
    };
    angulo = (x, y) => {
      const [s] = dono(x, y);
      return s.a + ruido(x * freq, y * freq) * (s.tipo === 'bloco' ? 0.12 : 0.4);
    };
    zona = (x, y) => {
      const [s, borda] = dono(x, y);
      const costura = borda < 14;
      if (s.tipo === 'bloco') return { pal: [[C.ferrugem, 2.5], [C.terra, 3], [C.marrom2, 1.2], [C.azulNoite, 0.8], [C.petroleo, 1.6], [C.petroleo2, 1], [C.marrom, 1.8], [C.ocre, 0.6]], dens: 0.95, comp: 16, larg: 13, realce: costura ? 0.95 : 0.04, palR: REAL.costura, sub: [[C.terra, 2.5], [C.marrom2, 1.5], [C.petroleo2, 2], [C.fundo, 1]] };
      if (s.tipo === 'campo' && p.zonas) {
        const F = zonaCor(x, y);
        return { pal: F.pal, dens: 0.7 + 0.3 * ar(x, y), comp: 70, larg: 11, realce: costura ? 0.95 : 0.06, palR: REAL.costura, sub: F.sub };
      }
      if (s.tipo === 'campo') return { pal: PAL.medio, dens: 0.6 + 0.3 * ar(x, y), comp: 70, larg: 11, realce: costura ? 0.95 : 0.06, palR: REAL.costura };
      return { pal: PAL.claro, dens: 0.9, comp: 34, larg: 12, realce: costura ? 0.95 : 0.22, palR: REAL.claro };
    };
    semear({ n: Math.round((MW * MH) / 5200), rMax: rMaxMancha, quente: 0.14, aceita: (x, y) => dono(x, y)[0].tipo === 'claro' || (dono(x, y)[0].tipo === 'campo' && rnd() < 0.25) });
    marcas = () => {
      const nJ = Math.round((MW * MH) / 9000);
      for (let i = 0; i < nJ; i++) {
        const x = rnd() * MW, y = rnd() * MH;
        const vert = rnd() < 0.65;
        const comp = 7 + rnd() * 7, larg = (5 + rnd() * 2.5) * e;
        const quente = rnd() < 0.55 * p.luz;
        if (dono(x, y)[0].tipo === 'bloco') toque(x, y, vert ? Math.PI / 2 : 0, comp, larg, quente ? MANCHA.luz : REAL.frio);
      }
    };
  } else {
    // faixas: estratos horizontais
    const sorteio = 3 + Math.floor(rnd() * 4);
    const nB = p.degrade ? 3 : p.bandas ?? sorteio; // `bandas` fixa estratos de alturas quase iguais (a tela segue a lista)
    const pesos = Array.from({ length: nB }, () => (p.bandas || p.degrade ? 0.9 + rnd() * 0.2 : 0.35 + rnd()));
    const tot = pesos.reduce((a, b) => a + b, 0);
    let acc = 0;
    let limites = pesos.map((w) => (acc += (w / tot) * MH));
    // borda pintada: a fita ocupa só o que está abaixo de uma borda irregular (o resto é transparente)
    const fE = 1 / (180 + rnd() * 160);
    const fE2 = 1 / (38 + rnd() * 30);
    const offE = rnd() * 100;
    const bordaY = (x) => MH * 0.3 + ruido(x * fE + offE, 9.1) * MH * 0.32 + ruido(x * fE2 + offE, 3.3) * MH * 0.1;
    if (alfa) limites = [0.55, 0.78, 1].map((f) => f * MH);
    const incl = (rnd() - 0.5) * 0.12;
    const fB = 1 / (300 + rnd() * 300);
    const ondula = 10 + rnd() * 26;
    // valores dos estratos: sempre há um quente (ferrugem/terra) e um claro (areia) entre eles
    const valores = ['escuro', 'medio', 'claro', 'quente'];
    const obrig = [1, 2, 3].sort(() => rnd() - 0.5);
    let antes = -1;
    let escuros = 0;
    const descanso = p.bandas ? -1 : Math.floor(rnd() * nB);
    const reflexo = Math.floor(rnd() * nB);
    // famílias dos estratos (modo zonas): sempre petróleo, uma quente e uma clara entre os três
    // primeiros, em ordem sorteada; os seguintes nunca repetem o vizinho
    const famsB = ['petroleo', rz() < 0.5 ? 'ferrugem' : 'marrom', rz() < 0.5 ? 'areia' : 'ardosia'].sort(() => rz() - 0.5);
    while (famsB.length < nB) {
      let f;
      do f = CICLO[Math.floor(rz() * CICLO.length)];
      while (f === famsB[famsB.length - 1]);
      famsB.push(f);
    }
    // o estrato do meio (onde caem o recorte e o retrato da capa) é o de petróleo
    if (!p.familias && !p.degrade) {
      const im = Math.max(0, limites.findIndex((l) => l >= MH / 2));
      const ip = famsB.indexOf('petroleo');
      if (ip >= 0 && ip !== im) [famsB[im], famsB[ip]] = [famsB[ip], famsB[im]];
    }
    const bandas = limites.map((_, i) => {
      let v;
      if (p.degrade) {
        // do claro para a noite: areia/branco em cima, petróleo e terra no meio, fundo e noite embaixo
        const pal = [PAL.emenda, [[C.petroleo, 3], [C.petroleo2, 2], [C.terra, 2], [C.ferrugem, 1.3], [C.marrom, 1], [C.ardosia, 1]], [[C.fundo, 3], [C.fundo2, 2], [C.noite, alfa ? 4 : 2], [C.petroleo2, 1.2], [C.marrom2, 1]]][i];
        return { pal, ang: (rnd() - 0.5) * 0.2, comp: [30, 30, 64][i], dens: 0.95, reflexo: i === 1, claro: i === 0, palR: i === 0 ? REAL.claro : REAL.quente };
      }
      if (p.familias?.[i] && FAM[p.familias[i]]) {
        // estrato de uma família só (com a complementar dentro): a tela tem a estrutura da lista
        const F = FAM[p.familias[i]];
        return { pal: F.pal, sub: F.sub, ang: (rnd() - 0.5) * 0.3, comp: [48, 30, 60][i % 3], dens: 1, cheio: true, reflexo: false, claro: p.familias[i] === 'areia', palR: p.familias[i] === 'petroleo' ? REAL.frio : REAL.quente };
      }
      if (i < obrig.length && obrig[i] !== antes) v = obrig[i];
      else do v = Math.floor(rnd() * 4);
      while (v === antes || (v === 0 && escuros >= 1));
      if (v === 0) escuros++;
      antes = v;
      const comp = [15, 30, 64][Math.floor(rnd() * 3)];
      if (p.zonas) {
        // cada estrato toma uma família diferente da vizinha; o valor do estrato escolhe o registro
        const F = FAM[famsB[i]];
        const pal = v === 0 ? F.escuro : v === 2 ? F.claro : F.pal;
        return { pal, sub: v === 0 ? F.escuro : F.sub, cheio: v !== 0, ang: (rnd() - 0.5) * 0.3, comp, dens: i === descanso ? 0.7 : 0.95, reflexo: i === reflexo, claro: v === 2, palR: v === 3 ? REAL.quente : REAL.frio };
      }
      return { pal: PAL[valores[v]], ang: (rnd() - 0.5) * 0.3, comp, dens: i === descanso ? 0.6 : v === 0 ? 0.8 : 0.95, reflexo: i === reflexo, claro: v === 2, palR: v === 3 ? REAL.quente : REAL.frio };
    });
    const qual = (x, y) => {
      for (let i = 0; i < nB; i++) {
        const lim = limites[i] + incl * (x - MW / 2) + ruido(x * fB + i * 5, i * 3.1) * ondula;
        if (y < lim || i === nB - 1) return [i, Math.abs(y - lim)];
      }
      return [nB - 1, 99];
    };
    angulo = (x, y) => {
      const [i] = qual(x, y);
      return bandas[i].ang + incl + ruido(x * freq * 2, y * freq * 2) * 0.25;
    };
    if (p.degrade) {
      // a fita começa clara de verdade: o chão de cada estrato já é a cor dele (areia, petróleo,
      // noite), para a borda de cima encostar no papel sem faixa escura
      const chao = [C.creme, C.petroleo2, alfa ? C.noite : C.fundo];
      for (let py = 0; py < H; py++) {
        for (let px = 0; px < W; px++) {
          const mx = jan.x + px / escala, my = jan.y + py / escala;
          const [i] = qual(mx, my);
          const k = (py * W + px) * 3;
          if (alfa && my < bordaY(mx) + 9) {
            // acima da borda (e numa margem logo abaixo dela) o chão fica vazio: quem desenha a borda são os traços
            alfa[py * W + px] = 0;
            cor[k] = C.creme[0];
            cor[k + 1] = C.creme[1];
            cor[k + 2] = C.creme[2];
            continue;
          }
          cor[k] = chao[i][0];
          cor[k + 1] = chao[i][1];
          cor[k + 2] = chao[i][2];
        }
      }
    }
    zona = (x, y) => {
      if (alfa && y < bordaY(x) - 2) return null;
      const [i, d] = qual(x, y);
      const b = bandas[i];
      const costura = d < 7 && i < nB - 1;
      return { pal: b.pal, sub: b.sub, cheio: b.cheio, dens: costura ? 1 : b.dens, comp: b.comp, larg: b.comp < 20 ? 13 : 11, realce: costura ? 0.9 : b.claro ? 0.2 : 0.05, palR: costura ? REAL.costura : b.palR };
    };
    if (!alfa) semear({ n: Math.round((MW * MH) / 9000), rMax: Math.min(rMaxMancha, 40), quente: 0.15, aceita: (x, y) => !bandas[qual(x, y)[0]].claro && rnd() < 0.5 });
    if (alfa) foraDaBorda = (x, y) => y < bordaY(x) + 6;
    marcas = () => {
      const n = Math.round((MW * MH) / 1600);
      for (let i = 0; i < n; i++) {
        const x = rnd() * MW, y = rnd() * MH;
        const quente = rnd() < 0.3 * p.luz;
        const comp = 6 + rnd() * 9;
        const larg = (6 + rnd() * 4) * e;
        if (bandas[qual(x, y)[0]].reflexo && rnd() < 0.35) toque(x, y, Math.PI / 2 + (rnd() - 0.5) * 0.1, comp * 1.6, larg, quente ? MANCHA.luz : REAL.frio);
      }
    };
  }

  // Traço seguindo o fluxo, centrado em (x, y) da mestre. Cada traço tem seu próprio gerador
  // (semeado pelo principal), então janelas diferentes pintam exatamente os mesmos traços.
  function traco(x, y, comp, larg, cbase, op, s, o = OPT) {
    const alcance = comp * 0.6 + larg;
    if (x + alcance < jan.x || x - alcance > jan.x + jan.w || y + alcance < jan.y || y - alcance > jan.y + jan.h) return;
    const r = mulberry32(s);
    const h = 2.5;
    const passos = Math.max(3, Math.round(comp / h));
    let cx = x, cy = y;
    for (let i = 0; i < passos / 2; i++) {
      const a = angulo(cx, cy);
      cx -= Math.cos(a) * h;
      cy -= Math.sin(a) * h;
    }
    const pts = new Float32Array((passos + 1) * 2);
    pts[0] = (cx - jan.x) * escala;
    pts[1] = (cy - jan.y) * escala;
    for (let i = 1; i <= passos; i++) {
      const a = angulo(cx, cy);
      cx += Math.cos(a) * h;
      cy += Math.sin(a) * h;
      pts[2 * i] = (cx - jan.x) * escala;
      pts[2 * i + 1] = (cy - jan.y) * escala;
    }
    pincelada(pts, larg * escala, cbase, op, r, o);
  }
  // Traço reto (levemente curvo) num ângulo dado, centrado em (x, y).
  function reto(x, y, a, comp, larg, cbase, op, s, o = OPT, curva = 0) {
    const alcance = comp * 0.6 + larg;
    if (x + alcance < jan.x || x - alcance > jan.x + jan.w || y + alcance < jan.y || y - alcance > jan.y + jan.h) return;
    const k = 6;
    const pts = new Float32Array((k + 1) * 2);
    const ca = Math.cos(a), sa = Math.sin(a);
    for (let j = 0; j <= k; j++) {
      const t = j / k - 0.5;
      const b = curva * comp * (0.25 - t * t);
      pts[2 * j] = (x + ca * t * comp - sa * b - jan.x) * escala;
      pts[2 * j + 1] = (y + sa * t * comp + ca * b - jan.y) * escala;
    }
    pincelada(pts, larg * escala, cbase, op, mulberry32(s), o);
  }

  // Grade com jitter: cobre a mestre inteira sem buracos.
  const camada = (cobertura, area, fn) => {
    const nAlvo = (cobertura * MW * MH) / area;
    const cols = Math.max(1, Math.round(Math.sqrt((nAlvo * MW) / MH)));
    const rows = Math.max(1, Math.round(nAlvo / cols));
    const cw = MW / cols, ch = MH / rows;
    for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) fn((i + rnd()) * cw, (j + rnd()) * ch);
  };

  // 1. Subpintura: traços longos e largos nos azuis escuros, secos (o chão respira entre eles).
  // com zonas, a subpintura cobre mais (e menos seca): o chão de cada zona fica pintado, sem campo chapado
  const chaoZonas = p.zonas && arquetipo !== 'horizonte';
  camada(chaoZonas ? 2 : 1.1, 70 * 22, (x, y) => {
    const z = zona(x, y);
    if (!z) return;
    const c = pick(rnd, z.sub ?? [[C.petroleo2, 3.5], [C.azulNoite, 0.4], [C.fundo, 1.2], [C.terra, 1.5], [C.marrom2, 1], [C.petroleo, 1]]);
    const comp = varia(Math.max(z.comp * 1.6, 40), 0.5);
    const larg = (18 + rnd() * 12) * e;
    const s = sub();
    if (rnd() < 0.8 + 0.2 * ar(x, y)) traco(x, y, comp, larg, c, 0.92, s, { ...OPT, secura: chaoZonas ? 0.6 : 0.85, afina: 0.35, contraste: 1.3 });
  });

  // 2. Corpo: densidade e escala vêm da zona do arquétipo; o respiro abre campos.
  camada(1.15 * p.densidade, 34 * 10, (x, y) => {
    const z = zona(x, y);
    if (!z) return;
    const a = ar(x, y);
    const vale = rnd() <= z.dens * (z.cheio ? 1 : 0.55 + 0.45 * a);
    const c = pick(rnd, z.pal);
    const comp = varia(z.comp, 0.6);
    const larg = z.larg * (0.72 + rnd() * 0.56) * e;
    const op = 0.78 + rnd() * 0.22;
    const s = sub();
    if (vale) traco(x, y, comp, larg, c, op, s);
    // zonas de toque curto (escala 15–20) recebem um segundo toque vizinho: a mesma cobertura de
    // tinta das zonas de traço longo, sem abrir o chão escuro
    if (z.comp < 22) {
      const c2 = pick(rnd, z.pal);
      const dx = (rnd() - 0.5) * 30, dy = (rnd() - 0.5) * 30;
      const s2 = sub();
      if (vale) traco(x + dx, y + dy, varia(z.comp, 0.6), larg, c2, op, s2);
    }
  });

  // 3. Realces: traços finos e claros onde a zona pede (cristas, costuras, faixas claras).
  camada(0.24 * p.realce, 22 * 5, (x, y) => {
    const z = zona(x, y);
    if (!z) return;
    const vale = rnd() <= z.realce;
    const c = pick(rnd, z.palR);
    const comp = varia(26, 0.55);
    const larg = (4.2 + rnd() * 3.6) * e;
    const s = sub();
    if (vale) traco(x, y, comp, larg, c, 0.88, s, { ...OPT, secura: 0.8, afina: 0.7, arrasto: 0.18 });
  });

  // 4. Marcas próprias do arquétipo (linha d'água, rajadas, espuma, janelas, reflexos).
  marcas();

  // 5. Toques quentes curtos (quase quadrados): empastados.
  for (const t of toques) reto(t.x, t.y, t.ang, t.comp, t.larg, t.c, 0.96, t.s, { ...OPT, secura: 0.3, afina: 0.25, arrasto: 0.08, carga: 1.6 });

  // 6. Manchas redondas: o disco é preenchido por toques de uma mão só (mesma direção), com borda
  //    redonda feita de arcos tangentes. Mesma cor com valores vizinhos; nada de anéis concêntricos.
  for (const m of manchas) {
    const R = m.r;
    if (m.x + R + 12 < jan.x || m.x - R - 12 > jan.x + jan.w || m.y + R + 12 < jan.y || m.y - R - 12 > jan.y + jan.h) continue;
    const r = mulberry32(m.s);
    const larg = clamp(R * (0.38 + r() * 0.24), 4.5, 15) * e;
    const comp = clamp(R * (0.7 + r() * 0.5), larg * 1.15, 34);
    const opD = m.op ?? 0.96;
    const dir = r() * Math.PI;
    const op = { ...OPT, secura: 0.12, afina: 0.15, arrasto: 0.08, carga: 1.35, contraste: 0.7 };
    const Ri = Math.max(1, R - larg * 0.45);
    const nT = Math.max(1, Math.ceil((Math.PI * R * R) / (larg * comp * 0.3)));
    for (let i = 0; i < nT; i++) {
      const rr = Math.sqrt(r()) * Ri * 0.9;
      const t = r() * 6.283;
      const px = m.x + Math.cos(t) * rr, py = m.y + Math.sin(t) * rr;
      const a = dir + (r() - 0.5) * 0.5;
      // recorta o toque à corda do disco: a silhueta fica redonda
      const ca = Math.cos(a), sa = Math.sin(a);
      const rx = px - m.x, ry = py - m.y;
      const ao = rx * ca + ry * sa;
      const perp = Math.abs(-rx * sa + ry * ca);
      const meia = Math.sqrt(Math.max(0, Ri * Ri - perp * perp));
      const lo = Math.max(-comp / 2, -meia - ao), hi = Math.min(comp / 2, meia - ao);
      if (hi - lo < 1.5) continue;
      const mid = (lo + hi) / 2;
      const c = r() < 0.16 ? m.c2 : valor(m.c, (r() - 0.5) * 0.22);
      reto(px + ca * mid, py + sa * mid, a, hi - lo, larg * (0.85 + r() * 0.3), c, opD * (0.9 + r() * 0.1), (r() * 4294967296) >>> 0, op);
    }
    // borda: sem contorno em parte dos discos; nos outros, arcos com falhas e tom variável
    const bd = m.borda ?? 1;
    if (R >= 7 && bd >= 0.28) {
      const falha = (bd - 0.28) * 0.7;
      const tom = r() < 0.5 ? 0.12 : -0.14;
      const rb = R - larg * 0.4;
      const nb = Math.max(6, Math.ceil((6.283 * rb) / (comp * 0.45)));
      const g = r() * 6.283;
      for (let i = 0; i < nb; i++) {
        const a0 = g + (i / nb) * 6.283 + (r() - 0.5) * 0.2;
        const arc = Math.min(1.2, (comp / rb) * (0.9 + r() * 0.3));
        const am = a0 + arc / 2;
        const c = valor(m.c, tom + (r() - 0.5) * 0.14);
        const sArc = (r() * 4294967296) >>> 0;
        const lw = larg * (0.55 + r() * 0.4);
        if (r() < falha) continue;
        reto(m.x + Math.cos(am) * rb, m.y + Math.sin(am) * rb, am + Math.PI / 2, arc * rb, lw, c, opD, sArc, op, arc / 2);
      }
    }
    // sem luas: o disco fica debaixo da pintura — alguns traços do campo passam por cima dele
    if (!p.luas) {
      const rv = mulberry32((m.s ^ 0x9e3779b9) >>> 0);
      const nV = Math.max(1, Math.round((R * R) / 160));
      for (let i = 0; i < nV; i++) {
        const t = rv() * 6.283, rr = Math.sqrt(rv()) * R;
        const vx = m.x + Math.cos(t) * rr, vy = m.y + Math.sin(t) * rr;
        const z = zona(vx, vy);
        if (!z) continue;
        const c = pick(rv, z.pal);
        traco(vx, vy, z.comp * Math.exp((rv() + rv() - 1) * 0.4), z.larg * (0.7 + rv() * 0.5) * e, c, 0.7 + rv() * 0.25, (rv() * 4294967296) >>> 0);
      }
    }
  }

  // 7. Faíscas soltas seguindo o fluxo (só inteiras em cada janela).
  const nf = Math.round(((MW * MH) / 240000) * p.luz);
  for (let i = 0; i < nf; i++) {
    const x = MW * (0.03 + rnd() * 0.94);
    const y = MH * (0.06 + rnd() * 0.88);
    const c = pick(rnd, MANCHA.quente);
    const comp = 10 + rnd() * 12;
    const s = sub();
    if (inteira(x, y, comp * 0.7) && !foraDaBorda(x, y)) traco(x, y, comp, 4.5 * e, c, 0.95, s, { ...OPT, secura: 0.5, afina: 0.5, carga: 1.3 });
  }

  // --- Luz rasante sobre o relevo (empasto) e quantização ---
  const NC = alfa ? 4 : 3;
  const out = new Uint8Array(W * H * NC);
  const lx = -0.55, ly = -0.65, lz = 0.52;
  const forca = 1.1 * escala; // gradiente por px de dispositivo → por px de tela
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const i = y * W + x;
      let sh = 1;
      let spec = 0;
      if (relevo) {
        const gx = (alt[y * W + Math.min(W - 1, x + 1)] - alt[y * W + Math.max(0, x - 1)]) * 0.5 * forca;
        const gy = (alt[Math.min(H - 1, y + 1) * W + x] - alt[Math.max(0, y - 1) * W + x]) * 0.5 * forca;
        const inv = 1 / Math.sqrt(gx * gx + gy * gy + 1);
        const dif = (-gx * lx - gy * ly + lz) * inv;
        sh = 1 + (dif / lz - 1) * 0.36;
        if (dif > lz) spec = (dif - lz) * (dif - lz) * 200;
      }
      for (let k = 0; k < 3; k++) {
        const v = cor[i * 3 + k] * sh + spec;
        out[i * NC + k] = v < 0 ? 0 : v > 255 ? 255 : v;
      }
      if (alfa) out[i * 4 + 3] = Math.round(Math.min(1, alfa[i]) * 255);
    }
  }
  // estatística das manchas visíveis nesta janela (medição da rodada 4)
  const vis = manchas.filter((m) => m.x + m.r > jan.x && m.x - m.r < jan.x + jan.w && m.y + m.r > jan.y && m.y - m.r < jan.y + jan.h);
  const familias = {};
  for (const m of vis) familias[m.familia] = (familias[m.familia] ?? 0) + 1;
  const rs = vis.map((m) => m.r);
  const discos = { n: vis.length, razao: rs.length ? Math.max(...rs) / Math.min(...rs) : 0, familias, raios: rs.map((v) => Math.round(v)) };
  return { data: out, width: W, height: H, canais: NC, arquetipo, discos };
}

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

export const VERSAO = 9;

/** Paleta: azuis do quadro + luzes laranja da marca (em pouca quantidade). */
export const CORES = {
  noite: '#0B1A33',
  noite2: '#13284D',
  quadro: '#1F3A66',
  petroleo: '#2E5069',
  ceu: '#8FB3D9',
  nevoa: '#C9D6E6',
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
  for (let i = 0; i < W * H; i++) {
    cor[i * 3] = C.noite[0];
    cor[i * 3 + 1] = C.noite[1];
    cor[i * 3 + 2] = C.noite[2];
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
        cor[k3] = r0 + (nr - r0) * a;
        cor[k3 + 1] = g0 + (ng - g0) * a;
        cor[k3 + 2] = b0 + (nb2 - b0) * a;
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

  // Paletas por valor (o arquétipo distribui pela cena: escuro, médio, claro, céu).
  const PAL = {
    escuro: [[C.noite2, 5], [C.noite, 3], [C.quadro, 2]],
    medio: [[C.quadro, 6], [C.noite2, 3], [C.petroleo, 3], [C.ceu, 0.5]],
    claro: [[C.petroleo, 4], [C.ceu, 3], [C.quadro, 2], [C.nevoa, 0.8]],
    ceu: [[C.petroleo, 4], [C.quadro, 3], [C.ceu, 2.6], [C.nevoa, 0.6], [C.noite2, 0.6]],
  };
  const REAL = {
    frio: [[C.ceu, 4], [C.nevoa, 1], [C.petroleo, 2]],
    claro: [[C.ceu, 3], [C.nevoa, 2.5]],
    costura: [[C.ceu, 3], [C.nevoa, 2], [C.pessego, 0.5]],
  };
  const MANCHA = {
    ceu: [[C.ceu, 4], [C.nevoa, 1.4], [C.petroleo, 2.2], [C.quadro, 1.2], [C.noite2, 0.6]],
    quente: [[C.pessego, 3], [C.laranjaClaro, 2], [C.laranja, 1]],
  };

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
  // Manchas redondas (lista montada pelo arquétipo): sem sobreposição forte entre elas.
  const manchas = [];
  const semear = ({ n, rMin = 4, rMax, aceita = () => true, cores = MANCHA.ceu, quente = 0.12, sobrepoe = 0.78 }) => {
    const rTeto = Math.max(rMin + 1, rMax);
    for (let i = 0; i < n; i++) {
      const x = rnd() * MW;
      const y = rnd() * MH;
      const r = rMin + (rTeto - rMin) * Math.pow(rnd(), 2.3);
      // luz rara: manchas quentes são mais prováveis pequenas (disco grande laranja só às vezes)
      const q = rnd() < quente * p.luz * (r > 26 ? 0.3 : 1.15 - r / 40);
      let c = pick(rnd, q ? MANCHA.quente : cores);
      const cFria = pick(rnd, cores);
      const cQuente = pick(rnd, MANCHA.quente);
      let c2 = q ? cQuente : cFria;
      const s = sub();
      if (!aceita(x, y, r)) continue;
      if (manchas.some((m) => Math.hypot(m.x - x, m.y - y) < (m.r + r) * sobrepoe)) continue;
      if (q && !inteira(x, y, r)) [c, c2] = [C.ceu, C.nevoa]; // laranja cortado lê como defeito: vira céu
      // segunda cor sempre de valor vizinho: nada de miolo escuro numa mancha clara
      if (!q && Math.abs(lum(c2) - lum(c)) > 70) c2 = c;
      manchas.push({ x, y, r, c, c2, s });
    }
  };
  // Pequenos toques quentes (janelas acesas, reflexos): cada um só se couber inteiro.
  const toques = [];
  const toque = (x, y, ang, comp, larg, cores = MANCHA.quente) => {
    const c = pick(rnd, cores);
    const s = sub();
    const quenteCor = c === C.pessego || c === C.laranja || c === C.laranjaClaro;
    if (quenteCor && !inteira(x, y, Math.max(comp, larg) * 0.7)) return;
    toques.push({ x, y, ang, comp, larg, c, s });
  };

  // --- Arquétipos: campo de ângulo, zonas (paleta/densidade/escala) e marcas próprias ---
  let angulo;
  let zona;
  let marcas = () => {};
  const rMaxMancha = Math.min(66, MH * 0.17, MW * 0.17);

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
    zona = (x, y) => {
      const cy = crista(x);
      if (y < cy) return { cheio: true, pal: PAL.ceu, dens: 0.92, comp: 30, larg: 12, realce: 0.22, palR: REAL.claro, sub: [[C.quadro, 4], [C.petroleo, 3], [C.noite2, 2]] };
      if (y < hy) {
        const borda = cy + 16 > y;
        return { pal: [[C.noite, 4], [C.noite2, 4], [C.quadro, 1.2]], dens: 0.95, comp: 40, larg: 13, realce: borda ? 0.9 : 0.02, palR: REAL.claro, sub: [[C.noite, 5], [C.noite2, 2]] };
      }
      return { pal: [[C.quadro, 4], [C.noite2, 5], [C.petroleo, 2], [C.ceu, 0.3]], dens: 0.62, comp: 24, larg: 9, realce: 0.04, palR: REAL.frio, sub: [[C.noite, 4], [C.noite2, 3], [C.quadro, 1]] };
    };
    // céu salpicado (mais denso no alto), poucas manchas descendo sobre a massa
    semear({ n: Math.round((MW * hy) / 1700), rMax: rMaxMancha, quente: 0.16, aceita: (x, y, r) => y + r * 0.4 < crista(x) && rnd() < 0.45 + 0.55 * (1 - y / hy) });
    marcas = () => {
      // crista: traços claros que desenham o contorno da massa contra o céu
      for (let x = -30; x < MW + 30; ) {
        const comp = 22 + rnd() * 40;
        const y = crista(x) + 3 + rnd() * 5;
        const a = Math.atan2(crista(x + 10) - crista(x - 10), 20);
        const c = pick(rnd, [[C.ceu, 3], [C.nevoa, 2]]);
        const s = sub();
        reto(x + Math.cos(a) * comp * 0.5, y + Math.sin(a) * comp * 0.5, a, comp, (4 + rnd() * 2.5) * e, c, 0.9, s);
        x += comp * (0.6 + rnd() * 1.1);
      }
      // linha d'água
      for (let x = -40; x < MW + 40; ) {
        const comp = 40 + rnd() * 90;
        const c = pick(rnd, [[C.ceu, 3], [C.nevoa, 1.5], [C.petroleo, 2]]);
        const s = sub();
        reto(x + comp / 2, hy + (rnd() - 0.5) * 4, (rnd() - 0.5) * 0.04, comp, (4 + rnd() * 2.5) * e, c, 0.9, s);
        x += comp * (0.7 + rnd() * 0.9);
      }
      // reflexos: colunas de toques curtos horizontais descendo da linha d'água
      const nCol = Math.round(MW / 70);
      for (let i = 0; i < nCol; i++) {
        const x = rnd() * MW;
        const quente = rnd() < 0.38 * p.luz;
        const cores = quente ? MANCHA.quente : [[C.ceu, 3], [C.nevoa, 1], [C.petroleo, 2]];
        const prof = (MH - hy) * (0.35 + rnd() * 0.6);
        for (let y = hy + 8; y < hy + prof; y += 8 + rnd() * 9) {
          const dx = (rnd() - 0.5) * 8;
          const comp = 8 + rnd() * 14;
          const larg = (5 + rnd() * 4) * e;
          if (rnd() < 0.82 - ((y - hy) / prof) * 0.5) toque(x + dx, y, (rnd() - 0.5) * 0.15, comp, larg, cores);
        }
      }
      // janelas acesas espalhadas na massa, perto da base
      const nJ = Math.round(MW / 110);
      for (let i = 0; i < nJ; i++) {
        const x = rnd() * MW;
        const y = hy - rnd() * Math.min(amp * 0.55, hy - crista(x) - 6);
        const vert = rnd() < 0.6;
        toque(x, y, vert ? Math.PI / 2 : 0, 7 + rnd() * 6, (5 + rnd() * 2) * e);
      }
    };
  } else if (arquetipo === 'vento') {
    const th = (rnd() < 0.5 ? -1 : 1) * (0.3 + rnd() * 0.42);
    const lam = 170 + rnd() * 260;
    const dx = Math.cos(th), dy = Math.sin(th);
    const banda = (x, y) => 0.5 + 0.5 * Math.sin(((-x * dy + y * dx) / lam) * 6.283 + ruido(x * freq * 0.7, y * freq * 0.7) * 2.4);
    angulo = (x, y) => th + ruido(x * freq, y * freq) * 0.42 + Math.sin((x * dx + y * dy) / 260) * 0.12;
    zona = (x, y) => {
      const b = banda(x, y);
      if (b > 0.72) return { pal: PAL.claro, dens: 0.95, comp: 62, larg: 11, realce: 0.2 + (b - 0.72) * 2.2, palR: REAL.claro };
      if (b > 0.36) return { pal: PAL.medio, dens: 0.85, comp: 56, larg: 12, realce: 0.06, palR: REAL.frio };
      return { pal: PAL.escuro, dens: 0.4, comp: 46, larg: 13, realce: 0.01, palR: REAL.frio };
    };
    semear({ n: Math.round((MW * MH) / 26000), rMax: Math.min(24, rMaxMancha), quente: 0.3 });
    marcas = () => {
      // rajadas: traços muito longos e finos que atravessam
      const n = Math.round((MW * MH) / 26000);
      for (let i = 0; i < n; i++) {
        const x = rnd() * MW, y = rnd() * MH;
        const c = pick(rnd, [[C.ceu, 3], [C.nevoa, 1.5], [C.petroleo, 1]]);
        const s = sub();
        const comp = 110 + rnd() * 160;
        if (banda(x, y) > 0.45) traco(x, y, comp, (3.8 + rnd() * 2.4) * e, c, 0.85, s, { ...OPT, secura: 0.75, afina: 0.75 });
      }
    };
  } else if (arquetipo === 'manchas') {
    angulo = (x, y) => fluxoBase + ruido(x * freq, y * freq) * 1.25;
    zona = (x, y) => {
      const a = ar(x, y);
      return { pal: a > 0.55 ? PAL.medio : PAL.ceu, dens: 0.5 + 0.35 * a, comp: 30, larg: 12, realce: 0.07, palR: REAL.frio };
    };
    const alvo = MW * MH * 0.2;
    let area = 0;
    const fC = freq * 0.8;
    for (let lote = 0; lote < 40 && area < alvo; lote++) {
      const antes = manchas.length;
      semear({ n: 60, rMax: rMaxMancha * 1.1, quente: 0.14, cores: [...MANCHA.ceu, [C.noite, 0.4]], sobrepoe: 0.82, aceita: (x, y) => rnd() < 0.3 + 0.7 * clamp(0.5 + ruido(x * fC + 40, y * fC + 9), 0, 1) });
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
      if (crista > 0.5) return { pal: PAL.claro, dens: 0.95, comp: 48, larg: 11, realce: 0.3 + crista * 0.55, palR: REAL.claro };
      return { pal: f < 0.25 ? PAL.escuro : PAL.medio, dens: f < 0.25 ? 0.42 : 0.82, comp: 52, larg: 12, realce: 0.03, palR: REAL.frio };
    };
    semear({ n: Math.round((MW * MH) / 30000), rMax: Math.min(20, rMaxMancha), quente: 0.18, aceita: (x, y) => fase(x, y) < 0.3 });
    marcas = () => {
      // espuma: toques curtos claros pousados nas cristas
      const n = Math.round((MW * MH) / 2400);
      for (let i = 0; i < n; i++) {
        const x = rnd() * MW, y = rnd() * MH;
        const comp = 6 + rnd() * 10;
        const c = pick(rnd, [[C.nevoa, 2], [C.ceu, 2]]);
        const s = sub();
        const f = fase(x, y);
        if (Math.abs(f - 0.42) < 0.05) reto(x, y, Math.atan(inclina(x, y)), comp, (5 + rnd() * 3) * e, c, 0.92, s);
      }
    };
  } else if (arquetipo === 'massas') {
    const longo = MW >= MH;
    const n = 2 + (rnd() < 0.55 ? 1 : 0);
    const tipos = ['bloco', 'campo', 'claro'].sort(() => rnd() - 0.5).slice(0, n);
    if (!tipos.includes('bloco')) tipos[0] = 'bloco';
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
      if (s.tipo === 'bloco') return { pal: [[C.noite2, 4], [C.quadro, 3], [C.noite, 2], [C.petroleo, 1.2]], dens: 0.95, comp: 16, larg: 13, realce: costura ? 0.95 : 0.04, palR: REAL.costura, sub: PAL.escuro };
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
        if (dono(x, y)[0].tipo === 'bloco') toque(x, y, vert ? Math.PI / 2 : 0, comp, larg, quente ? MANCHA.quente : REAL.frio);
      }
    };
  } else {
    // faixas: estratos horizontais
    const sorteio = 3 + Math.floor(rnd() * 4);
    const nB = p.bandas ?? sorteio; // `bandas` fixa estratos de alturas quase iguais (a tela segue a lista)
    const pesos = Array.from({ length: nB }, () => (p.bandas ? 0.9 + rnd() * 0.2 : 0.35 + rnd()));
    const tot = pesos.reduce((a, b) => a + b, 0);
    let acc = 0;
    const limites = pesos.map((w) => (acc += (w / tot) * MH));
    const incl = (rnd() - 0.5) * 0.12;
    const fB = 1 / (300 + rnd() * 300);
    const ondula = 10 + rnd() * 26;
    const valores = ['escuro', 'medio', 'claro'];
    let antes = -1;
    const descanso = p.bandas ? -1 : Math.floor(rnd() * nB);
    const reflexo = Math.floor(rnd() * nB);
    const bandas = limites.map((_, i) => {
      let v;
      do v = Math.floor(rnd() * 3);
      while (v === antes);
      antes = v;
      return { pal: v === 2 ? [[C.ceu, 4], [C.petroleo, 3], [C.nevoa, 1.2], [C.quadro, 1]] : PAL[valores[v]], ang: (rnd() - 0.5) * 0.3, comp: [15, 30, 64][Math.floor(rnd() * 3)], dens: i === descanso ? 0.28 : v === 0 ? 0.6 : 0.95, reflexo: i === reflexo, claro: v === 2 };
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
    zona = (x, y) => {
      const [i, d] = qual(x, y);
      const b = bandas[i];
      const costura = d < 7 && i < nB - 1;
      return { pal: b.pal, dens: costura ? 1 : b.dens, comp: b.comp, larg: b.comp < 20 ? 13 : 11, realce: costura ? 0.9 : b.claro ? 0.2 : 0.05, palR: costura ? REAL.costura : REAL.frio };
    };
    semear({ n: Math.round((MW * MH) / 9000), rMax: Math.min(rMaxMancha, 40), quente: 0.15, aceita: (x, y) => !bandas[qual(x, y)[0]].claro && rnd() < 0.5 });
    marcas = () => {
      const n = Math.round((MW * MH) / 1600);
      for (let i = 0; i < n; i++) {
        const x = rnd() * MW, y = rnd() * MH;
        const quente = rnd() < 0.3 * p.luz;
        const comp = 6 + rnd() * 9;
        const larg = (6 + rnd() * 4) * e;
        if (bandas[qual(x, y)[0]].reflexo && rnd() < 0.35) toque(x, y, Math.PI / 2 + (rnd() - 0.5) * 0.1, comp, larg, quente ? MANCHA.quente : REAL.frio);
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
  camada(1.1, 70 * 22, (x, y) => {
    const z = zona(x, y);
    const c = pick(rnd, z.sub ?? [[C.noite2, 5], [C.quadro, 3], [C.noite, 2.5], [C.petroleo, 0.5]]);
    const comp = varia(Math.max(z.comp * 1.6, 40), 0.5);
    const larg = (18 + rnd() * 12) * e;
    const s = sub();
    if (rnd() < 0.35 + 0.65 * ar(x, y)) traco(x, y, comp, larg, c, 0.92, s, { ...OPT, secura: 0.85, afina: 0.35, contraste: 1.3 });
  });

  // 2. Corpo: densidade e escala vêm da zona do arquétipo; o respiro abre campos.
  camada(1.15 * p.densidade, 34 * 10, (x, y) => {
    const z = zona(x, y);
    const a = ar(x, y);
    const vale = rnd() <= z.dens * (z.cheio ? 1 : 0.35 + 0.65 * a);
    const c = pick(rnd, z.pal);
    const comp = varia(z.comp, 0.6);
    const larg = z.larg * (0.72 + rnd() * 0.56) * e;
    const op = 0.78 + rnd() * 0.22;
    const s = sub();
    if (vale) traco(x, y, comp, larg, c, op, s);
  });

  // 3. Realces: traços finos e claros onde a zona pede (cristas, costuras, faixas claras).
  camada(0.24 * p.realce, 22 * 5, (x, y) => {
    const z = zona(x, y);
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
    const larg = clamp(R * 0.5, 4.5, 14) * e;
    const comp = clamp(R * 0.95, larg * 1.15, 30);
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
      reto(px + ca * mid, py + sa * mid, a, hi - lo, larg * (0.85 + r() * 0.3), c, 0.96, (r() * 4294967296) >>> 0, op);
    }
    if (R >= 7) {
      const rb = R - larg * 0.4;
      const nb = Math.max(6, Math.ceil((6.283 * rb) / (comp * 0.45)));
      const g = r() * 6.283;
      for (let i = 0; i < nb; i++) {
        const a0 = g + (i / nb) * 6.283 + (r() - 0.5) * 0.2;
        const arc = Math.min(1.2, (comp / rb) * (0.9 + r() * 0.3));
        const am = a0 + arc / 2;
        const c = valor(m.c, (r() - 0.5) * 0.18);
        reto(m.x + Math.cos(am) * rb, m.y + Math.sin(am) * rb, am + Math.PI / 2, arc * rb, larg * 0.75, c, 0.95, (r() * 4294967296) >>> 0, op, arc / 2);
      }
    }
  }

  // 7. Faíscas soltas seguindo o fluxo (só inteiras em cada janela).
  const nf = Math.round(((MW * MH) / 120000) * p.luz);
  for (let i = 0; i < nf; i++) {
    const x = MW * (0.03 + rnd() * 0.94);
    const y = MH * (0.06 + rnd() * 0.88);
    const c = pick(rnd, MANCHA.quente);
    const comp = 10 + rnd() * 12;
    const s = sub();
    if (inteira(x, y, comp * 0.7)) traco(x, y, comp, 4.5 * e, c, 0.95, s, { ...OPT, secura: 0.5, afina: 0.5, carga: 1.3 });
  }

  // --- Luz rasante sobre o relevo (empasto) e quantização ---
  const out = new Uint8Array(W * H * 3);
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
        out[i * 3 + k] = v < 0 ? 0 : v > 255 ? 255 : v;
      }
    }
  }
  return { data: out, width: W, height: H, arquetipo };
}

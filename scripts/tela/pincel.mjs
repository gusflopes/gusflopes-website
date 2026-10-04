/**
 * Gerador de "telas": pinceladas de tinta seguindo um campo de fluxo (redemoinho com centro
 * deslocado + ruído suave), à maneira da Noite Estrelada, nas cores do quadro e da marca.
 *
 * Renderizador raster próprio, em camadas (subpintura → corpo → realce → luzes):
 * - cada traço é um feixe de cerdas agrupadas em 2 a 4 sub-estrias de valores vizinhos do mesmo
 *   matiz, levemente desalinhadas; a largura afina ao longo do caminho (entrada carregada, saída
 *   seca), as cerdas terminam em pontos diferentes e falham perto do fim (pincel secando);
 * - cada traço arrasta um pouco da tinta de baixo na saída e cobre com opacidade parcial;
 * - no material "empasto", cada cerda deixa relevo num mapa de altura, iluminado no fim (luz
 *   rasante do alto à esquerda). O relevo vem só dos traços: nenhum ruído ou blur global.
 *
 * Escala fixa: todas as medidas são em px de tela (CSS). Cada papel (abertura da home, faixa de
 * hub, capa de texto) tem uma tela-mestre virtual em px de tela, e cada formato servido é uma
 * JANELA dela renderizada em `escala` px de dispositivo por px de tela. Um card não é a capa
 * encolhida, é um recorte dela no mesmo tamanho de traço. As luzes são postas de modo a ficarem
 * inteiras (ou inteiramente fora) em todas as janelas do papel.
 *
 * Determinístico: a mesma semente e o mesmo papel produzem sempre a mesma tela, em qualquer janela.
 * Saída: RGB 8 bits cru ({ data, width, height }); quem codifica é o sharp (scripts/tela/render.mjs).
 */

export const VERSAO = 8;

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

/** Materiais do estudo (docs/design-review/estudo-pinceladas.png). */
export const MATERIAIS = {
  chapado: { cerdas: false, relevo: 0 },
  cerda: { cerdas: true, relevo: 0 },
  empasto: { cerdas: true, relevo: 1 },
};
export const MATERIAL_PADRAO = 'empasto';

export const PARAMS_PADRAO = {
  densidade: 1, // multiplica a cobertura do corpo
  espessura: 1, // multiplica a largura dos traços
  redemoinho: 0.62, // peso do redemoinho sobre o fluxo de fundo (0–1)
  ruido: 0.55, // amplitude do ruído suave no ângulo (rad)
  luzes: 2, // focos de luz laranja (luz rara)
  realce: 1, // quantidade de traços claros (céu/névoa)
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
 * @param {Array<{x:number,y:number,w:number,h:number}>} [o.janelas]  TODAS as janelas do papel (as luzes respeitam cada uma)
 * @param {number} [o.escala=1]  px de dispositivo por px de tela
 * @param {string} [o.material]  chapado | cerda | empasto
 * @param {object} [o.params]  sobrescreve PARAMS_PADRAO; `fixo: true` desliga a variação por semente (estudo)
 */
export function pintar({ semente, mestre, janela, janelas = [], escala = 1, material = MATERIAL_PADRAO, params = {} }) {
  const [MW, MH] = mestre;
  const jan = janela ?? { x: 0, y: 0, w: MW, h: MH };
  const mat = MATERIAIS[material] ?? MATERIAIS[MATERIAL_PADRAO];
  const rnd = mulberry32(hash(`${semente}|v${VERSAO}`));
  // A mão varia um pouco por semente, dentro da faixa calibrada: o mesmo gesto, nunca a mesma tela.
  const mao = { densidade: 0.88 + rnd() * 0.24, espessura: 0.9 + rnd() * 0.22, redemoinho: 0.8 + rnd() * 0.45, luzes: rnd() < 0.4 ? 1 : 0 };
  const base = { ...PARAMS_PADRAO, ...params };
  const p = params.fixo
    ? base
    : { ...base, densidade: base.densidade * mao.densidade, espessura: base.espessura * mao.espessura, redemoinho: base.redemoinho * mao.redemoinho, luzes: Math.max(1, base.luzes + mao.luzes) };
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

  // --- Campo de fluxo (em px de tela da mestre) ---
  const lado = rnd() < 0.5 ? -1 : 1;
  const m = Math.min(MW, MH);
  const c1 = { x: MW * (0.5 + lado * (0.1 + rnd() * 0.16)), y: MH * (0.38 + rnd() * 0.24), r: m * (0.42 + rnd() * 0.16), s: rnd() < 0.5 ? 1 : -1, peso: 2.2 };
  const c2 = { x: MW * (0.5 - lado * (0.2 + rnd() * 0.16)), y: MH * (0.4 + rnd() * 0.3), r: m * (0.24 + rnd() * 0.1), s: -c1.s, peso: 1.4 };
  const fluxoBase = (rnd() - 0.5) * 0.7;
  const freq = 1 / (340 + rnd() * 220);

  // --- Luzes: inteiras ou inteiramente fora de cada janela do papel, nunca cortadas ---
  const todas = janelas.length ? janelas : [{ x: 0, y: 0, w: MW, h: MH }];
  const principal = todas[0];
  const focos = [];
  // raio visível = o halo externo da espiral (~2,5× o miolo), não só o miolo
  const cabe = (f) =>
    todas.every((j, k) => {
      const rv = f.r * 2.5;
      const mg = rv + (j.margem ?? 8);
      const dentro = f.x - mg >= j.x && f.x + mg <= j.x + j.w && f.y - mg >= j.y && f.y + mg <= j.y + j.h;
      if (k === 0) return dentro;
      const fora = f.x + rv + 2 < j.x || f.x - rv - 2 > j.x + j.w || f.y + rv + 2 < j.y || f.y - rv - 2 > j.y + j.h;
      if (j.semLuz) return fora;
      return dentro || fora;
    });
  for (let tent = 0; focos.length < p.luzes && tent < 400; tent++) {
    // o primeiro foco mira a menor janela (o recorte mais apertado também ganha luz)
    const alvo = focos.length === 0 ? todas.filter((j) => !j.semLuz).reduce((a, b) => (a.w * a.h <= b.w * b.h ? a : b)) : principal;
    const r = 16 + rnd() * 9;
    const f = { x: alvo.x + alvo.w * (0.15 + rnd() * 0.7), y: alvo.y + alvo.h * (0.2 + rnd() * 0.6), r, s: rnd() < 0.5 ? 1 : -1 };
    if (cabe(f) && focos.every((g) => Math.hypot(g.x - f.x, g.y - f.y) > Math.max(220, principal.w * 0.18))) focos.push(f);
  }

  const vortices = [c1, c2, ...focos.map((f) => ({ x: f.x, y: f.y, r: f.r * 2.4, s: f.s, peso: 1.6 }))];
  const angulo = (x, y) => {
    const a0 = fluxoBase + ruido(x * freq, y * freq) * 1.6;
    let vx = Math.cos(a0);
    let vy = Math.sin(a0) * 0.6;
    for (const c of vortices) {
      const dx = x - c.x;
      const dy = (y - c.y) * 1.15;
      const d = Math.hypot(dx, dy) + 1e-3;
      const w = Math.exp(-((d / c.r) ** 2)) * p.redemoinho * c.peso;
      vx += ((-dy / d) * c.s - (dx / d) * 0.16) * w;
      vy += ((dx / d) * c.s - (dy / d) * 0.16) * w;
    }
    return Math.atan2(vy, vx) + ruido(x * freq * 3 + 50, y * freq * 3 + 90) * p.ruido;
  };
  const anel = (x, y) => {
    const d = Math.hypot(x - c1.x, (y - c1.y) * 1.15);
    return Math.exp(-(((d - c1.r * 0.72) / (c1.r * 0.3)) ** 2));
  };
  const pick = (r, pares) => {
    let t = r() * pares.reduce((s, [, w]) => s + w, 0);
    for (const [c, w] of pares) if ((t -= w) <= 0) return c;
    return pares[0][0];
  };

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

  // Traço seguindo o fluxo, centrado em (x, y) da mestre. Cada traço tem seu próprio gerador
  // (semeado pelo principal), então janelas diferentes pintam exatamente os mesmos traços.
  const OPT = { afina: 0.5, secura: 0.6, contraste: 1, arrasto: 0.22, carga: 1 };
  const traco = (x, y, comp, larg, cbase, op, sub, o = OPT) => {
    const alcance = comp * 0.6 + larg;
    if (x + alcance < jan.x || x - alcance > jan.x + jan.w || y + alcance < jan.y || y - alcance > jan.y + jan.h) return;
    const r = mulberry32(sub);
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
  };

  // Grade com jitter: cobre a mestre inteira sem buracos.
  const camada = (cobertura, area, fn) => {
    const nAlvo = (cobertura * MW * MH) / area;
    const cols = Math.max(1, Math.round(Math.sqrt((nAlvo * MW) / MH)));
    const rows = Math.max(1, Math.round(nAlvo / cols));
    const cw = MW / cols, ch = MH / rows;
    for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) fn((i + rnd()) * cw, (j + rnd()) * ch);
  };
  const e = p.espessura;
  const sub = () => (rnd() * 4294967296) >>> 0;

  // 1. Subpintura: traços longos e largos nos azuis escuros, secos (o chão respira entre eles).
  camada(1.25, 70 * 22, (x, y) => {
    const c = pick(rnd, [[C.noite2, 5], [C.quadro, 3], [C.noite, 2], [C.petroleo, 0.6]]);
    traco(x, y, 64 + rnd() * 70, (20 + rnd() * 12) * e, c, 0.95, sub(), { ...OPT, secura: 0.85, afina: 0.35, contraste: 1.3 });
  });

  // 2. Corpo: traços médios, onde o fluxo aparece; cobertura modulada pelo ruído.
  camada(1.15 * p.densidade, 34 * 10, (x, y) => {
    const dens = 0.6 + 0.4 * (ruido(x * freq * 2 + 7, y * freq * 2 + 3) + 1) / 2;
    const vale = rnd() <= dens;
    const a = anel(x, y);
    const c = pick(rnd, [[C.quadro, 6.5], [C.noite2, 3.5], [C.petroleo, 3.2 + a * 3], [C.ceu, 0.8 + a * 3 * p.realce]]);
    const comp = 24 + rnd() * 40;
    const larg = (9 + rnd() * 7) * e;
    const op = 0.78 + rnd() * 0.22;
    const s = sub();
    if (vale) traco(x, y, comp, larg, c, op, s);
  });

  // 3. Realces: traços finos e claros, concentrados no anel do redemoinho e em faixas de luz.
  camada(0.2 * p.realce, 22 * 5, (x, y) => {
    const a = anel(x, y);
    const faixa = (ruido(x * freq * 1.5 + 200, y * freq * 1.5) + 1) / 2;
    const vale = rnd() <= 0.05 + a * 0.75 + faixa ** 3 * 0.45;
    const c = pick(rnd, [[C.ceu, 4 + a * 3], [C.nevoa, 0.6 + a * 2], [C.petroleo, 3]]);
    const comp = 22 + rnd() * 30;
    const larg = (4.5 + rnd() * 3.5) * e;
    const s = sub();
    if (vale) traco(x, y, comp, larg, c, 0.88, s, { ...OPT, secura: 0.8, afina: 0.7, arrasto: 0.18 });
  });

  // 4. Luzes: espirais densas de toques curtos concêntricos, do azul claro de fora ao miolo
  //    empastado de pêssego. Os toques seguem o anel (e o fluxo, que gira em volta da luz).
  for (const f of focos) {
    const voltas = [
      { r: 2.3, cores: [[C.ceu, 3], [C.petroleo, 2], [C.quadro, 1]], larg: 6, comp: 18 },
      { r: 1.85, cores: [[C.nevoa, 2], [C.ceu, 3]], larg: 6, comp: 16 },
      { r: 1.4, cores: [[C.nevoa, 2], [C.pessego, 1.5], [C.laranjaClaro, 1]], larg: 5.5, comp: 14 },
      { r: 1.0, cores: [[C.laranjaClaro, 3], [C.laranja, 1.5], [C.pessego, 2]], larg: 5.5, comp: 12 },
      { r: 0.62, cores: [[C.pessego, 4], [C.laranjaClaro, 1]], larg: 5, comp: 10 },
    ];
    for (const v of voltas) {
      const raio = f.r * v.r;
      const nT = Math.max(5, Math.round((Math.PI * 2 * raio) / (v.comp * 0.62)));
      const giro = rnd() * 6.28;
      for (let i = 0; i < nT; i++) {
        const a0 = giro + (i / nT) * Math.PI * 2 * f.s + (rnd() - 0.5) * 0.25;
        const rr = raio * (0.9 + rnd() * 0.2);
        const comp = v.comp * (0.75 + rnd() * 0.5);
        const larg = v.larg * (0.85 + rnd() * 0.3) * e;
        const c = pick(rnd, v.cores);
        const sb = sub();
        // arco tangente com leve espiral para dentro
        const k = 7;
        const pts = new Float32Array((k + 1) * 2);
        const da = (comp / rr) * f.s;
        for (let j = 0; j <= k; j++) {
          const t = j / k;
          const ang = a0 + da * t;
          const rj = rr * (1 - 0.1 * t);
          pts[2 * j] = (f.x + Math.cos(ang) * rj - jan.x) * escala;
          pts[2 * j + 1] = (f.y + Math.sin(ang) * rj * 0.92 - jan.y) * escala;
        }
        pincelada(pts, larg * escala, c, 0.95, mulberry32(sb), { ...OPT, secura: 0.45, afina: 0.45, arrasto: 0.12, carga: 1.4 });
      }
    }
    // miolo empastado: toques grossos e curtos, carga alta
    const nm = 5 + Math.round(rnd() * 3);
    for (let i = 0; i < nm; i++) {
      const rr = f.r * 0.32 * Math.sqrt(rnd());
      const t = rnd() * Math.PI * 2;
      const x = f.x + Math.cos(t) * rr;
      const y = f.y + Math.sin(t) * rr;
      const ang = t + Math.PI / 2 + (rnd() - 0.5) * 0.8;
      const l = 5 + rnd() * 5;
      const c = valor(pick(rnd, [[C.pessego, 4], [C.laranjaClaro, 1]]), 0.08 + rnd() * 0.18);
      const larg = (7 + rnd() * 3) * e;
      const sb = sub();
      const pts = new Float32Array([(x - Math.cos(ang) * l - jan.x) * escala, (y - Math.sin(ang) * l - jan.y) * escala, (x - jan.x) * escala, (y - jan.y) * escala, (x + Math.cos(ang) * l - jan.x) * escala, (y + Math.sin(ang) * l - jan.y) * escala]);
      pincelada(pts, larg * escala, c, 1, mulberry32(sb), { ...OPT, secura: 0.2, afina: 0.3, arrasto: 0.05, carga: 2.2 });
    }
  }

  // 5. Poucas faíscas soltas seguindo o fluxo (fora das bordas: nada de laranja cortado).
  const nf = Math.round((MW * MH) / 140000);
  for (let i = 0; i < nf; i++) {
    const x = MW * (0.04 + rnd() * 0.92);
    const y = MH * (0.12 + rnd() * 0.76);
    const c = pick(rnd, [[C.laranjaClaro, 2], [C.pessego, 2], [C.laranja, 1]]);
    const s = sub();
    // nenhuma faísca rente à borda de uma janela (laranja cortado lê como defeito)
    const rente = todas.some((j) => {
      const dx = Math.min(Math.abs(x - j.x), Math.abs(x - j.x - j.w));
      const dy = Math.min(Math.abs(y - j.y), Math.abs(y - j.y - j.h));
      const dentro = x > j.x - 16 && x < j.x + j.w + 16 && y > j.y - 16 && y < j.y + j.h + 16;
      return dentro && (dx < 16 || dy < 16);
    });
    if (!rente) traco(x, y, 10 + rnd() * 8, 4.5 * e, c, 0.95, s, { ...OPT, secura: 0.5, afina: 0.5, carga: 1.3 });
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
  return { data: out, width: W, height: H, focos };
}

/**
 * Gerador de "telas": pinceladas curtas seguindo um campo de fluxo (redemoinho com centro
 * deslocado + ruído suave), à maneira da Noite Estrelada, nas cores do quadro e da marca.
 *
 * Determinístico: a mesma semente (slug ou título) produz sempre a mesma tela, em qualquer
 * tamanho. A composição vive num viewBox de largura fixa (1600) e só a altura muda com a
 * proporção, então o srcset responsivo mostra a mesma imagem em todas as larguras.
 *
 * Saída: string SVG pura (sem filtros, sem blur). Quem rasteriza é o sharp (scripts/tela/render.mjs).
 * Usado no build (integração Astro em scripts/tela/integracao.mjs) e no kit do Substack.
 */

export const VERSAO = 4;

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

/** Parâmetros escolhidos no estudo (docs/design-review/estudo-pinceladas.png, variação C). */
export const PARAMS_PADRAO = {
  densidade: 1, // multiplica a quantidade de traços
  espessura: 1, // multiplica a largura dos traços
  redemoinho: 0.62, // peso do redemoinho sobre o fluxo de fundo (0–1)
  ruido: 0.55, // amplitude do ruído suave no ângulo (rad)
  luzes: 3, // focos de luz laranja
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

/** Ruído de valor 2D suave (interpolação quíntica numa grade de valores pseudoaleatórios). */
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
    const xf = x - xi;
    const yf = y - yi;
    const u = f(xf);
    const w = f(yf);
    const a = v(xi, yi) + u * (v(xi + 1, yi) - v(xi, yi));
    const b = v(xi, yi + 1) + u * (v(xi + 1, yi + 1) - v(xi, yi + 1));
    return a + w * (b - a);
  };
  // duas oitavas: forma larga + variação fina
  return (x, y) => n(x, y) * 0.7 + n(x * 2.1 + 17, y * 2.1 + 31) * 0.3;
}

const fmt = (n) => Math.round(n * 10) / 10;

/**
 * Gera a tela.
 * @param {object} o
 * @param {string} o.semente  slug ou título
 * @param {number} [o.proporcao=16/9]  largura ÷ altura
 * @param {number} [o.largura]  largura do SVG em px (só os atributos width/height; o viewBox é fixo)
 * @param {object} [o.params]  sobrescreve PARAMS_PADRAO; `fixo: true` desliga a variação por semente (estudo)
 */
export function telaSvg({ semente, proporcao = 16 / 9, largura, params = {} }) {
  const rnd = mulberry32(hash(`${semente}|v${VERSAO}`));
  // Cada semente também mexe um pouco na mão (densidade, espessura, número de luzes), dentro da
  // faixa calibrada no estudo: o mesmo gesto, nunca a mesma tela — nem a mesma textura em série.
  const mao = { densidade: 0.82 + rnd() * 0.36, espessura: 0.85 + rnd() * 0.4, redemoinho: 0.8 + rnd() * 0.45, luzes: Math.round(rnd() * 2) - 1 };
  const base = { ...PARAMS_PADRAO, ...params };
  const p = params.fixo
    ? base
    : { ...base, densidade: base.densidade * mao.densidade, espessura: base.espessura * mao.espessura, redemoinho: base.redemoinho * mao.redemoinho, luzes: Math.max(1, base.luzes + mao.luzes) };
  const ruido = criaRuido(rnd);
  const W = 1600;
  const H = Math.round(W / proporcao);
  const ref = Math.sqrt(W * H) / Math.sqrt(1600 * 900); // escala de área relativa ao 16:9

  // Redemoinho com centro deslocado (nunca no meio) e um segundo, menor, do outro lado.
  const lado = rnd() < 0.5 ? -1 : 1;
  const c1 = { x: W * (0.5 + lado * (0.14 + rnd() * 0.16)), y: H * (0.28 + rnd() * 0.3), r: Math.min(W, H) * (0.34 + rnd() * 0.14), s: rnd() < 0.5 ? 1 : -1 };
  const c2 = { x: W * (0.5 - lado * (0.22 + rnd() * 0.16)), y: H * (0.55 + rnd() * 0.3), r: Math.min(W, H) * (0.16 + rnd() * 0.1), s: -c1.s };
  const fluxoBase = (rnd() - 0.5) * 0.7; // inclinação do vento de fundo
  const freq = 1 / (380 + rnd() * 240);

  const angulo = (x, y) => {
    let vx = Math.cos(fluxoBase + ruido(x * freq, y * freq) * 1.6);
    let vy = Math.sin(fluxoBase + ruido(x * freq, y * freq) * 1.6) * 0.6;
    for (const c of [c1, c2]) {
      const dx = x - c.x;
      const dy = (y - c.y) * 1.15;
      const d = Math.hypot(dx, dy) + 1e-3;
      const w = Math.exp(-((d / c.r) ** 2)) * p.redemoinho * (c === c1 ? 2.2 : 1.4);
      // tangente, com leve espiral para dentro
      const tx = (-dy / d) * c.s - (dx / d) * 0.18;
      const ty = (dx / d) * c.s - (dy / d) * 0.18;
      vx += tx * w;
      vy += ty * w;
    }
    return Math.atan2(vy, vx) + ruido(x * freq * 3 + 50, y * freq * 3 + 90) * p.ruido;
  };

  const anel = (x, y) => {
    // proximidade do anel do redemoinho principal (onde o céu da Noite Estrelada acende)
    const d = Math.hypot(x - c1.x, (y - c1.y) * 1.15);
    return Math.exp(-(((d - c1.r * 0.75) / (c1.r * 0.28)) ** 2));
  };

  const pick = (pares) => {
    let t = rnd() * pares.reduce((s, [, w]) => s + w, 0);
    for (const [c, w] of pares) {
      if ((t -= w) <= 0) return c;
    }
    return pares[0][0];
  };

  const tracos = [];
  const traco = (x0, y0, comp, larg, cor, op = 1) => {
    const passos = Math.max(3, Math.round(comp / 7));
    const h = comp / passos;
    let x = x0;
    let y = y0;
    // começa do meio para o traço ficar centrado no ponto
    for (let i = 0; i < passos / 2; i++) {
      const a = angulo(x, y);
      x -= Math.cos(a) * h;
      y -= Math.sin(a) * h;
    }
    let d = `M${fmt(x)} ${fmt(y)}`;
    for (let i = 0; i < passos; i++) {
      const a = angulo(x, y);
      x += Math.cos(a) * h;
      y += Math.sin(a) * h;
      d += `L${fmt(x)} ${fmt(y)}`;
    }
    tracos.push(`<path d="${d}" stroke="${cor}" stroke-width="${fmt(larg)}"${op < 1 ? ` stroke-opacity="${op.toFixed(2)}"` : ''}/>`);
  };

  // Grade com jitter: cobre a tela inteira sem buracos, com densidade modulada pelo ruído.
  const camada = (n, fn) => {
    const cols = Math.round(Math.sqrt((n * W) / H));
    const rows = Math.round(n / cols);
    const cw = W / cols;
    const ch = H / rows;
    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++) {
        fn((i + rnd()) * cw, (j + rnd()) * ch);
      }
    }
  };

  const k = p.densidade * ref;
  const e = p.espessura;

  // 1. Subpintura: traços longos e largos nos azuis escuros (nada de fundo chapado aparecendo).
  camada(Math.round(900 * k), (x, y) => {
    const cor = pick([[CORES.noite2, 5], [CORES.quadro, 3], [CORES.noite, 2]]);
    traco(x, y, 46 + rnd() * 40, (13 + rnd() * 9) * e, cor);
  });

  // 2. Corpo: traços médios, onde o fluxo aparece.
  camada(Math.round(2300 * k), (x, y) => {
    const dens = 0.55 + 0.45 * (ruido(x * freq * 2 + 7, y * freq * 2 + 3) + 1) / 2;
    if (rnd() > dens) return;
    const a = anel(x, y);
    const cor = pick([
      [CORES.quadro, 6],
      [CORES.noite2, 4],
      [CORES.petroleo, 5 + a * 4],
      [CORES.ceu, 0.6 + a * 3 * p.realce],
    ]);
    traco(x, y, 22 + rnd() * 22, (5 + rnd() * 4) * e, cor, 0.9 + rnd() * 0.1);
  });

  // 3. Realces: traços finos e claros, concentrados no anel do redemoinho.
  camada(Math.round(1500 * k * p.realce), (x, y) => {
    const a = anel(x, y);
    const faixa = (ruido(x * freq * 1.5 + 200, y * freq * 1.5) + 1) / 2; // faixas de luz, não chuva uniforme
    if (rnd() > 0.02 + a * 0.7 + faixa * faixa * faixa * 0.4) return;
    const cor = pick([[CORES.ceu, 4 + a * 3], [CORES.nevoa, a * 2], [CORES.petroleo, 4]]);
    traco(x, y, 16 + rnd() * 22, (2 + rnd() * 3) * e, cor, 0.85 + rnd() * 0.15);
  });

  // 4. Luzes: poucos focos, cada um feito de anéis de traços curtos tangentes (halo de pincel,
  //    sem glow): miolo pêssego, anel laranja, anel externo nos azuis claros.
  const focos = [];
  for (let tent = 0; focos.length < p.luzes && tent < 60; tent++) {
    const f = { x: W * (0.08 + rnd() * 0.84), y: H * (0.12 + rnd() * 0.72), r: 11 + rnd() * 15 };
    if (focos.every((g) => Math.hypot(g.x - f.x, g.y - f.y) > W * 0.16)) focos.push(f);
  }
  const arco = (cx, cy, r, ang, len, larg, cor) => {
    const a0 = ang - len / r / 2;
    const a1 = ang + len / r / 2;
    const xa = cx + Math.cos(a0) * r;
    const ya = cy + Math.sin(a0) * r;
    const xb = cx + Math.cos(a1) * r;
    const yb = cy + Math.sin(a1) * r;
    tracos.push(`<path d="M${fmt(xa)} ${fmt(ya)}A${fmt(r)} ${fmt(r)} 0 0 1 ${fmt(xb)} ${fmt(yb)}" stroke="${cor}" stroke-width="${fmt(larg)}"/>`);
  };
  for (const f of focos) {
    // halo: arcos curtos tangentes, raio irregular, dos azuis claros para o laranja no centro
    const aneis = [
      { r: f.r * 2.5, cores: [[CORES.ceu, 3], [CORES.nevoa, 1], [CORES.petroleo, 3]], larg: 5 },
      { r: f.r * 1.55, cores: [[CORES.laranjaClaro, 3], [CORES.laranja, 2], [CORES.nevoa, 1]], larg: 5.5 },
    ];
    for (const an of aneis) {
      const n = Math.max(4, Math.round((Math.PI * 2 * an.r) / 17));
      for (let i = 0; i < n; i++) {
        if (rnd() < 0.22) continue;
        arco(f.x, f.y, an.r * (0.78 + rnd() * 0.44), (i / n) * Math.PI * 2 + rnd() * 0.5, 9 + rnd() * 10, an.larg * e * (0.7 + rnd() * 0.6), pick(an.cores));
      }
    }
    // miolo: toques grossos e curtos em direções soltas
    const m = 7 + Math.round(rnd() * 5);
    for (let i = 0; i < m; i++) {
      const rr = f.r * 0.55 * Math.sqrt(rnd());
      const t = rnd() * Math.PI * 2;
      const x = f.x + Math.cos(t) * rr;
      const y = f.y + Math.sin(t) * rr;
      const ang = angulo(x, y) + (rnd() - 0.5) * 0.6; // toques alinhados ao fluxo: lê como tinta, não como asterisco
      const l = 4 + rnd() * 5;
      tracos.push(`<path d="M${fmt(x - Math.cos(ang) * l)} ${fmt(y - Math.sin(ang) * l)}L${fmt(x + Math.cos(ang) * l)} ${fmt(y + Math.sin(ang) * l)}" stroke="${pick([[CORES.pessego, 4], [CORES.nevoa, 1], [CORES.laranjaClaro, 1]])}" stroke-width="${fmt((6 + rnd() * 3) * e)}"/>`);
    }
  }
  // Algumas faíscas soltas seguindo o fluxo.
  for (let i = 0; i < Math.round(18 * k); i++) {
    traco(rnd() * W, rnd() * H, 10 + rnd() * 10, 3 * e, pick([[CORES.laranjaClaro, 2], [CORES.pessego, 2], [CORES.laranja, 1]]));
  }

  const wh = largura ? ` width="${largura}" height="${Math.round(largura / proporcao)}"` : '';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}"${wh} preserveAspectRatio="xMidYMid slice"><rect width="${W}" height="${H}" fill="${CORES.noite}"/><g fill="none" stroke-linecap="round" stroke-linejoin="round">${tracos.join('')}</g></svg>`;
}

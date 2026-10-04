/**
 * Convenções das telas geradas no build: papéis, janelas, tamanhos e caminhos públicos.
 * Fonte única para o gerador (scripts/tela/integracao.mjs) e para quem consome as imagens
 * (src/lib/telas.ts). Os arquivos vão para public/telas e public/og (fora do Git, gerados no build).
 *
 * Escala fixa de traço: cada PAPEL tem uma tela-mestre em px de tela (CSS) e cada formato servido
 * é uma JANELA dela, no tamanho em que é exibido. O traço tem a mesma espessura em px de tela no
 * hero, nas faixas, nas capas, no OG e no Substack. `larguras` são as larguras de arquivo do
 * srcset: a menor é 1× da janela, a maior ~1,5–2× (telas de alta densidade). Um card não é a capa
 * encolhida: é um recorte dela.
 */

const centro = (mw, mh, w, h, extra = {}) => ({ x: Math.round((mw - w) / 2), y: Math.round((mh - h) / 2), w, h, ...extra });

export const PAPEIS = {
  /** Abertura da home: panorâmica no desktop (1366×~430 exibidos), recorte 1,6:1 no celular. */
  abertura: {
    mestre: [1440, 450],
    janelas: {
      larga: { x: 0, y: 0, w: 1440, h: 450, larguras: [1440, 2160] },
      estreita: { x: 500, y: 110, w: 400, h: 250, larguras: [400, 800], margem: 30 },
    },
  },
  /** Faixa de abertura dos hubs e dos eixos: 6:1 no desktop (5:1 no tablet), 3:1 no celular. */
  faixa: {
    mestre: [1440, 240],
    janelas: {
      larga: { x: 0, y: 0, w: 1440, h: 240, larguras: [1440, 2160] },
      tablet: { x: 120, y: 0, w: 1200, h: 240, so: 'luz' },
      estreita: { x: 520, y: 53, w: 400, h: 134, larguras: [400, 800] },
    },
  },
  /** Capa de um texto: cabeçalho panorâmico do artigo, recorte 16:9 nos cards e no celular, OG e Substack. */
  capa: {
    mestre: [1600, 460],
    janelas: {
      larga: centro(1600, 460, 1440, 420, { larguras: [1440, 2160] }),
      recorte: centro(1600, 460, 448, 252, { larguras: [448, 896], margem: 36 }),
      og: centro(1600, 460, 1200, 252, { so: 'luz' }),
      substack: centro(1600, 460, 1456, 326, { so: 'luz' }),
    },
  },
  /**
   * Plano aberto de capítulo na home (Ferramenta e Serviços): tela alta e estreita ao lado do texto,
   * nunca atrás dele. Recorte vertical no desktop, faixa baixa no celular.
   */
  capitulo: {
    mestre: [440, 720],
    janelas: {
      coluna: { x: 0, y: 0, w: 440, h: 720, larguras: [440, 880], margem: 30 },
      estreita: { x: 20, y: 280, w: 400, h: 160, larguras: [400, 800] },
    },
  },
  /**
   * Close de traço: um trecho pequeno da mestre exibido 2,5× maior (o pintor chegando perto).
   * É a única ampliação permitida; nenhum formato mostra o traço MENOR que a escala fixa.
   */
  close: {
    mestre: [224, 120],
    ampliacao: 2.5,
    janelas: {
      quadro: { x: 0, y: 0, w: 224, h: 120, larguras: [560, 1120] },
    },
  },
};

/** Abertura da home: semente fixa (a tagline). */
export const ABERTURA = { semente: 'Tecnologia e negócio, partes do mesmo sistema' };

/** Qualidade por formato: textura de pincel comprime mal, então AVIF/WebP seguram o peso. */
export const QUALIDADE = { avif: 40, avifHi: 30, webp: 60, webpHi: 48, jpg: 76 };

export const caminhoTela = (grupo, nome, largura, ext) => `/telas/${grupo}/${nome}-${largura}.${ext}`;
export const caminhoOg = (grupo, nome) => `/og/${grupo}/${nome}.jpg`;

/** Só as fotos genéricas de banco (Unsplash) são trocadas pela tela; capa autoral fica. */
export const ehFotoGenerica = (url = '') => /(^|\.)unsplash\.com\//.test(url.replace(/^https?:\/\//, ''));

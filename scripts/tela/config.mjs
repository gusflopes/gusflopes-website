/**
 * Convenções das telas geradas no build: tamanhos, proporções e caminhos públicos.
 * Fonte única para o gerador (scripts/tela/integracao.mjs) e para quem consome as imagens
 * (src/lib/telas.ts). Os arquivos vão para public/telas e public/og (fora do Git, gerados no build).
 */

/** Capa de artigo (cards, capa do texto): 16:9. */
export const CAPA = { proporcao: 16 / 9, larguras: [480, 960, 1600], fallback: 960 };

/** Faixa de abertura dos hubs e dos eixos: panorâmica. */
export const FAIXA = { proporcao: 4, larguras: [800, 1600, 2400], fallback: 1600 };

/** Abertura da home: larga no desktop, 4:3 no celular (direção de arte via <picture media>). */
export const ABERTURA = {
  semente: 'Tecnologia e negócio, partes do mesmo sistema',
  larga: { proporcao: 2.4, larguras: [1024, 1600, 2400], fallback: 1600 },
  estreita: { proporcao: 4 / 3, larguras: [480, 800], fallback: 800 },
};

/** Qualidade por formato: textura de pincel comprime mal, então AVIF/WebP seguram o peso. */
export const QUALIDADE = { avif: 48, webp: 68, jpg: 78 };

export const caminhoTela = (grupo, nome, largura, ext) => `/telas/${grupo}/${nome}-${largura}.${ext}`;
export const caminhoOg = (grupo, nome) => `/og/${grupo}/${nome}.jpg`;

/** Só as fotos genéricas de banco (Unsplash) são trocadas pela tela; capa autoral fica. */
export const ehFotoGenerica = (url = '') => /(^|\.)unsplash\.com\//.test(url.replace(/^https?:\/\//, ''));

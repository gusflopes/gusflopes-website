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
      larga: { x: 0, y: 0, w: 1440, h: 450, larguras: [1440, 2160], margem: 24 },
      // celular: o recorte desce para a cidade e a água, e nenhuma lua é garantida nele (o céu de luas é do desktop)
      estreita: { x: 500, y: 150, w: 400, h: 250, larguras: [400, 800], margem: 30, semLua: true },
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
    mestre: [1600, 600],
    janelas: {
      larga: centro(1600, 600, 1440, 420), // só medição (nenhuma página serve a panorâmica): não gera arquivo
      recorte: centro(1600, 600, 448, 252, { larguras: [448, 896], margem: 36 }),
      /** Retrato 4:5 — o destaque dos hubs e a coluna da abertura do texto (nunca a mesma panorâmica da faixa). */
      retrato: centro(1600, 600, 464, 580, { larguras: [464, 928] }),
      og: centro(1600, 600, 1200, 252, { so: 'luz' }),
      substack: centro(1600, 600, 1456, 326, { so: 'luz' }),
    },
  },
  /**
   * Plano aberto de capítulo na home (Ferramenta e Serviços): tela alta e estreita ao lado do texto,
   * nunca atrás dele. Recorte vertical no desktop, faixa baixa no celular.
   */
  capitulo: {
    mestre: [440, 1040],
    janelas: {
      coluna: { x: 0, y: 0, w: 440, h: 1040, larguras: [440, 880], margem: 30 },
      estreita: { x: 20, y: 440, w: 400, h: 160, larguras: [400, 800], semLuz: true }, // no celular, só o campo de traços: as luzes ficam para as outras telas
    },
  },
  /**
   * Close de traço da Ferramenta: um trecho pequeno da mestre exibido 2,5× maior (o pintor chegando
   * perto). É a única ampliação permitida e só existe na Ferramenta; nenhum formato mostra o traço
   * MENOR que a escala fixa. Meia seção no desktop (~680×560), faixa no celular.
   */
  close: {
    mestre: [272, 224],
    ampliacao: 2.5,
    janelas: {
      quadro: { x: 0, y: 0, w: 272, h: 224, larguras: [680, 1360] },
      estreita: { x: 58, y: 68, w: 156, h: 88, larguras: [390, 780] },
    },
  },
  /**
   * Tela de projeção do vídeo em destaque na home: 16:9 ao lado do texto, sangrando até a borda
   * direita no desktop; recorte central no celular.
   */
  projecao: {
    mestre: [800, 450],
    janelas: {
      quadro: { x: 0, y: 0, w: 800, h: 450, larguras: [800, 1200] },
      estreita: { x: 200, y: 112, w: 400, h: 225, larguras: [400, 800] },
    },
  },
  /**
   * Convite da newsletter (caixa no fim dos textos e no arquivo): coluna estreita ao lado do texto,
   * ou faixa baixa quando a caixa empilha. Em escala 1:1 — nunca o close da Ferramenta.
   */
  convite: {
    mestre: [560, 320],
    janelas: {
      lado: { x: 0, y: 0, w: 200, h: 320, larguras: [200, 400] },
      topo: { x: 20, y: 85, w: 520, h: 150, larguras: [520, 1040] },
    },
  },
  /** Fita: faixa fina sob a faixa do título (abertura do arquivo da newsletter). */
  fita: {
    mestre: [1440, 120],
    janelas: {
      larga: { x: 0, y: 0, w: 1440, h: 120, larguras: [1440, 2160] },
      estreita: { x: 520, y: 20, w: 400, h: 80, larguras: [400, 800] },
    },
  },
  /**
   * Fita do rodapé: a passagem do campo claro para a noite, no topo do rodapé de toda página
   * (faixas em degradê: creme e areia em cima, petróleo e terra no meio, noite embaixo). A borda de
   * cima é pintada e irregular, transparente acima dela (RGBA): encosta em papel ou creme sem emenda.
   */
  rodape: {
    mestre: [1440, 150],
    janelas: {
      larga: { x: 0, y: 0, w: 1440, h: 150, larguras: [1440, 2160] },
      estreita: { x: 520, y: 0, w: 400, h: 110, larguras: [400, 800] },
    },
  },
  /**
   * Margem pintada do texto (rodada 5): uma tira vertical alta (96px), semeada pelo slug, que corre ao lado
   * da coluna de leitura (costurada pelo fio laranja) e serve de lombada do texto no índice dos hubs.
   * Repete em y a cada 2400px; as zonas de cor mudam ao rolar (petróleo, ferrugem, areia...).
   */
  margem: {
    mestre: [96, 2400],
    janelas: {
      coluna: { x: 0, y: 0, w: 96, h: 2400, larguras: [96, 192] },
    },
  },
  /** Painel alto da página 404, ao lado da mensagem (faixa no celular). */
  painel: {
    mestre: [560, 800],
    janelas: {
      quadro: { x: 0, y: 0, w: 560, h: 800, larguras: [560, 1120] },
      estreita: { x: 80, y: 300, w: 400, h: 200, larguras: [400, 800] },
    },
  },
};

/** Abertura da home: semente fixa (a tagline). */
export const ABERTURA = { semente: 'Tecnologia e negócio, partes do mesmo sistema', params: { arquetipo: 'horizonte', luz: 1.5 } };

/**
 * Arquétipo de cada faixa de hub (semente = nome da página). Cada página ganha uma estrutura
 * grande própria; quem não está aqui fica com o arquétipo sorteado pela semente.
 */
export const ARQUETIPO_FAIXA = {
  insights: 'manchas', // muitas ideias espalhadas, nenhuma no centro
  radar: 'vento', // o fluxo de notícias atravessando
  engenharia: 'massas', // blocos que se encontram
  negocios: 'ondas', // ciclos longos
  bastidores: 'faixas', // camadas do processo
  newsletter: 'horizonte', // o arquivo da newsletter: um horizonte baixo, como a fita que ele tinha
  'nao-encontrada': 'vento',
};

/** Qualidade por formato: textura de pincel comprime mal, então AVIF/WebP seguram o peso. */
export const QUALIDADE = { avif: 31, avifHi: 24, webp: 52, webpHi: 42, jpg: 72 }; // v10: a paleta do quadro tem mais variedade (mais entropia); a qualidade desce para o peso não subir

export const caminhoTela = (grupo, nome, largura, ext) => `/telas/${grupo}/${nome}-${largura}.${ext}`;

/** Nome da fita do rodapé de uma página: o caminho vira a semente ('/' → 'home', '/a/b/' → 'a--b'). */
export const chaveRodape = (pathname = '/') => pathname.replace(/\/index\.html$|\.html$/, '').replace(/^\/+|\/+$/g, '').replace(/\//g, '--') || 'home';

/** Parâmetros da fita do rodapé (iguais em toda página; só a semente muda). */
export const PARAMS_RODAPE = { arquetipo: 'faixas', degrade: true, borda: true, luas: false };

/** Telas pequenas não têm "lua garantida": discos translúcidos, sobrepostos, com traço por cima. */
export const SEM_LUAS = { luas: false };
export const caminhoOg = (grupo, nome) => `/og/${grupo}/${nome}.jpg`;

/** Só as fotos genéricas de banco (Unsplash) são trocadas pela tela; capa autoral fica. */
export const ehFotoGenerica = (url = '') => /(^|\.)unsplash\.com\//.test(url.replace(/^https?:\/\//, ''));

/** Arquétipo da tela do convite da newsletter (caixa no fim de todo texto e no arquivo). */
export const ARQUETIPO_CONVITE = 'vento';

/**
 * Capa de um texto: a semente sorteia o arquétipo, mas nunca o da faixa de Insights, o da faixa
 * do eixo do texto (a capa aparece logo abaixo dessas faixas, no destaque do hub) nem o do convite
 * da newsletter (que fecha a página do texto) — telas da mesma página não repetem anatomia.
 */
/** Margem do texto: arquétipo da semente, só os arquétipos que seguem as zonas (vento, manchas, ondas), sem luas. */
// zonas de 400px só frias (petróleo e ardósia): a margem acompanha a leitura sem disputar com o texto;
// o laranja do artigo fica nos filetes dos H2, nos links e nos marcadores
export const PARAMS_MARGEM = { evita: ['horizonte', 'faixas', 'massas'], luas: false, ciclo: ['petroleo', 'ardosia', 'petroleo', 'ardosia', 'petroleo', 'ardosia'], nZonas: 6, f0: 0 };
/** Recuos da margem que caem no meio das zonas frias (0–400 petróleo, 800–1200 ardósia, 1600–2000 ferrugem): a lombada dos índices. */
export const LOMBADAS = ['0px', '-860px', '-1660px'];

export const paramsCapa = (eixo) => ({ evita: [ARQUETIPO_FAIXA.insights, ARQUETIPO_FAIXA[eixo], ARQUETIPO_CONVITE].filter(Boolean), luas: false });

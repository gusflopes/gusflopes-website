/**
 * Telas geradas no build (scripts/tela/): srcsets prontos para <picture>.
 * Função pura — serve tanto às páginas .astro quanto às ilhas React.
 *
 * Cada papel (scripts/tela/config.mjs) tem janelas no tamanho em que são exibidas; quando há uma
 * janela estreita, ela entra como `estreita` e o <picture> troca por media query (celular).
 */
// @ts-ignore — módulo .mjs compartilhado com o gerador (Node), sem tipos próprios
import { PAPEIS, caminhoTela, caminhoOg, ehFotoGenerica, chaveRodape } from '../../scripts/tela/config.mjs';

export interface TelaArquivo {
  avif: string;
  webp: string;
  src: string;
  width: number;
  height: number;
}
export interface Tela extends TelaArquivo {
  /** Janela para o celular (art direction via <source media>). */
  estreita?: TelaArquivo;
}

type Papel = 'abertura' | 'faixa' | 'capa' | 'capitulo' | 'close' | 'projecao' | 'convite' | 'fita' | 'painel' | 'rodape' | 'margem';

function arquivo(grupo: string, nome: string, papel: Papel, janela: string): TelaArquivo {
  const j = PAPEIS[papel].janelas[janela];
  const base = `${nome}-${janela}`;
  const srcset = (ext: string, ws: number[]) => ws.map((w: number) => `${caminhoTela(grupo, base, w, ext)} ${w}w`).join(', ');
  const w1 = j.larguras[0];
  // AVIF em todas as larguras; WebP (reserva de quem não lê AVIF) só na 1×
  return { avif: srcset('avif', j.larguras), webp: srcset('webp', [w1]), src: caminhoTela(grupo, base, w1, 'jpg'), width: w1, height: Math.round((w1 * j.h) / j.w) };
}

/** Uma janela de um papel, com a janela `estreita` opcional para o celular. */
export function telaPapel(grupo: string, nome: string, papel: Papel, janela: string, estreita?: string): Tela {
  return { ...arquivo(grupo, nome, papel, janela), ...(estreita ? { estreita: arquivo(grupo, nome, papel, estreita) } : {}) };
}

/** Capa de um texto nos cards: o recorte 16:9 da capa, no mesmo tamanho de traço (semente = slug). */
export const telaCapa = (colecao: 'insights' | 'radar', id: string): Tela => telaPapel(colecao, id, 'capa', 'recorte');

/** Faixa panorâmica de abertura de hub/eixo. */
export const telaFaixa = (nome: string): Tela => telaPapel('faixa', nome, 'faixa', 'larga', 'estreita');

/** Abertura da home. */
export const telaAbertura = (): Tela => telaPapel('home', 'abertura', 'abertura', 'larga', 'estreita');

/** Abre os três eixos na home: plano aberto vertical ao lado da lista (faixa baixa no celular). */
export const telaPortas = (): Tela => telaPapel('home', 'portas', 'capitulo', 'coluna', 'estreita');

/** Close de traço da Ferramenta (2,5×, o único do site): meia seção no desktop, faixa no celular. */
export const telaFerramenta = (): Tela => telaPapel('home', 'ferramenta', 'close', 'quadro', 'estreita');

/** Tela de projeção do vídeo em destaque (16:9, ondas largas). */
export const telaVideo = (): Tela => telaPapel('home', 'video', 'projecao', 'quadro', 'estreita');

/** Convite da newsletter em escala 1:1: coluna ao lado do texto (`lado`) ou faixa baixa (`topo`). */
export const telaNewsletter = (janela: 'lado' | 'topo' = 'lado'): Tela => telaPapel('marca', 'newsletter', 'convite', janela);

/** Fita fina sob a faixa do título no arquivo da newsletter. */
export const telaFita = (): Tela => telaPapel('marca', 'newsletter-fita', 'fita', 'larga', 'estreita');

/**
 * Fita do rodapé: a passagem do claro para a noite, no topo do rodapé de toda página. Cada página
 * tem a sua (semente = caminho da página; ver `chaveRodape`), com a borda de cima pintada.
 */
export const telaRodape = (chave = 'padrao'): Tela => telaPapel('rodape', chave, 'rodape', 'larga', 'estreita');
export { chaveRodape };

/** Painel da página 404, ao lado da mensagem. */
export const telaPainel404 = (): Tela => telaPapel('marca', 'nao-encontrada', 'painel', 'quadro', 'estreita');

/** Retrato 4:5 da capa: destaque dos hubs e coluna da abertura do texto (com o recorte 16:9 no celular). */
export const telaRetrato = (colecao: 'insights' | 'radar', id: string): Tela => telaPapel(colecao, id, 'capa', 'retrato', 'recorte');

/**
 * Margem pintada do texto como fundo CSS (tira de 96px × 2400px que repete em y): variáveis para a
 * classe `.margem` (src/index.css) — JPG como reserva, image-set AVIF/WebP onde houver suporte.
 */
export function fundoMargem(colecao: 'insights' | 'radar' | 'newsletter', id: string): Record<string, string> {
  const base = `${id}-margem-coluna`;
  const u = (w: number, ext: string) => `url("${caminhoTela(colecao, base, w, ext)}")`;
  return {
    '--margem-jpg': u(96, 'jpg'),
    '--margem-set': `image-set(${u(96, 'avif')} type("image/avif") 1x, ${u(192, 'avif')} type("image/avif") 2x, ${u(96, 'webp')} type("image/webp") 1x)`,
  };
}

/** Imagem OG 1200×630 gerada para o texto. */
export const ogDoTexto = (colecao: 'insights' | 'radar', id: string): string => caminhoOg(colecao, id);

/** Foto de banco genérica (Unsplash) é trocada pela tela; capa autoral (ex.: newsletter) fica. */
export const usaTela = (imagem?: string): boolean => !imagem || ehFotoGenerica(imagem);

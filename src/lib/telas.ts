/**
 * Telas geradas no build (scripts/tela/): srcsets prontos para <picture>.
 * Função pura — serve tanto às páginas .astro quanto às ilhas React.
 *
 * Cada papel (scripts/tela/config.mjs) tem janelas no tamanho em que são exibidas; quando há uma
 * janela estreita, ela entra como `estreita` e o <picture> troca por media query (celular).
 */
// @ts-ignore — módulo .mjs compartilhado com o gerador (Node), sem tipos próprios
import { PAPEIS, caminhoTela, caminhoOg, ehFotoGenerica } from '../../scripts/tela/config.mjs';

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

type Papel = 'abertura' | 'faixa' | 'capa' | 'capitulo' | 'close';

function arquivo(grupo: string, nome: string, papel: Papel, janela: string): TelaArquivo {
  const j = PAPEIS[papel].janelas[janela];
  const base = `${nome}-${janela}`;
  const srcset = (ext: string) => j.larguras.map((w: number) => `${caminhoTela(grupo, base, w, ext)} ${w}w`).join(', ');
  const w1 = j.larguras[0];
  return { avif: srcset('avif'), webp: srcset('webp'), src: caminhoTela(grupo, base, w1, 'jpg'), width: w1, height: Math.round((w1 * j.h) / j.w) };
}

/** Uma janela de um papel, com a janela `estreita` opcional para o celular. */
export function telaPapel(grupo: string, nome: string, papel: Papel, janela: string, estreita?: string): Tela {
  return { ...arquivo(grupo, nome, papel, janela), ...(estreita ? { estreita: arquivo(grupo, nome, papel, estreita) } : {}) };
}

/** Capa de um texto nos cards: o recorte 16:9 da capa, no mesmo tamanho de traço (semente = slug). */
export const telaCapa = (colecao: 'insights' | 'radar', id: string): Tela => telaPapel(colecao, id, 'capa', 'recorte');

/** Cabeçalho do texto: a capa panorâmica no desktop, o recorte no celular. */
export const telaCabecalho = (colecao: 'insights' | 'radar', id: string): Tela => telaPapel(colecao, id, 'capa', 'larga', 'recorte');

/** Faixa panorâmica de abertura de hub/eixo. */
export const telaFaixa = (nome: string): Tela => telaPapel('faixa', nome, 'faixa', 'larga', 'estreita');

/** Abertura da home. */
export const telaAbertura = (): Tela => telaPapel('home', 'abertura', 'abertura', 'larga', 'estreita');

/** Imagem OG 1200×630 gerada para o texto. */
export const ogDoTexto = (colecao: 'insights' | 'radar', id: string): string => caminhoOg(colecao, id);

/** Foto de banco genérica (Unsplash) é trocada pela tela; capa autoral (ex.: newsletter) fica. */
export const usaTela = (imagem?: string): boolean => !imagem || ehFotoGenerica(imagem);

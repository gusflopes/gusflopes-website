/**
 * Telas geradas no build (scripts/tela/): srcsets prontos para <picture>.
 * Função pura — serve tanto às páginas .astro quanto às ilhas React.
 */
// @ts-ignore — módulo .mjs compartilhado com o gerador (Node), sem tipos próprios
import { CAPA, FAIXA, ABERTURA, caminhoTela, caminhoOg, ehFotoGenerica } from '../../scripts/tela/config.mjs';

export interface Tela {
  avif: string;
  webp: string;
  src: string;
  width: number;
  height: number;
}

interface Formato {
  proporcao: number;
  larguras: number[];
  fallback: number;
}

function montar(grupo: string, nome: string, f: Formato): Tela {
  const srcset = (ext: string) => f.larguras.map((w) => `${caminhoTela(grupo, nome, w, ext)} ${w}w`).join(', ');
  const maior = Math.max(...f.larguras);
  return {
    avif: srcset('avif'),
    webp: srcset('webp'),
    src: caminhoTela(grupo, nome, f.fallback, 'jpg'),
    width: maior,
    height: Math.round(maior / f.proporcao),
  };
}

/** Capa 16:9 de um texto (semente = slug). */
export const telaCapa = (colecao: 'insights' | 'radar', id: string): Tela => montar(colecao, id, CAPA);

/** Faixa panorâmica de abertura de hub/eixo. */
export const telaFaixa = (nome: string): Tela => montar('faixa', nome, FAIXA);

/** Abertura da home: larga (desktop) e 4:3 (celular). */
export const telaAbertura = () => ({ larga: montar('home', 'abertura', ABERTURA.larga), estreita: montar('home', 'abertura-m', ABERTURA.estreita) });

/** Imagem OG 1200×630 gerada para o texto. */
export const ogDoTexto = (colecao: 'insights' | 'radar', id: string): string => caminhoOg(colecao, id);

/** Foto de banco genérica (Unsplash) é trocada pela tela; capa autoral (ex.: newsletter) fica. */
export const usaTela = (imagem?: string): boolean => !imagem || ehFotoGenerica(imagem);

/**
 * Linhas da rede (direção visual "Metrô Noturno"): cada eixo editorial é uma linha,
 * cada texto autoral é uma estação, em ordem de data. A lista de eixos continua vindo
 * de src/lib/eixos.ts — aqui só a cor de cada linha (Record<EixoId> obriga a cobrir todos).
 *
 * Arquivo puro (sem astro:content): pode ser importado pelas ilhas React.
 */
import type { EixoId } from './eixos';

/** Cor da linha sobre o azul-escuro (moldura). Todas da paleta oficial. */
export const COR_LINHA: Record<EixoId, string> = {
  engenharia: '#F97316', // laranja
  negocios: '#8FB3D9', // azul-céu do quadro
  bastidores: '#FDBA74', // âmbar (laranja claro)
};

/** Estação: um texto autoral publicado, numa linha. */
export interface Estacao {
  href: string;
  title: string;
  /** Data pt-BR para exibição. */
  date: string;
  isoDate: string;
  eixo: EixoId;
  /** Posição do texto na linha, 1 = o mais antigo. */
  ordem: number;
  /** Há texto de outra linha com tag em comum (baldeação). */
  baldeacao?: boolean;
}

/** Trecho da linha mostrado no mapa da home: as estações mais recentes, em ordem de data. */
export interface TrechoLinha {
  eixo: EixoId;
  total: number;
  estacoes: Estacao[];
  /** Alguma estação da linha (mesmo fora do trecho) faz baldeação com outra linha. */
  conectada?: boolean;
}

/** Posição de um texto na sua linha, para o cabeçalho e o anterior/próximo do artigo. */
export interface PosicaoNaLinha {
  eixo: EixoId;
  /** Todas as estações da linha, da mais antiga para a mais recente. */
  estacoes: Estacao[];
  /** Índice (0-based) do texto atual em `estacoes`. */
  atual: number;
  /** Textos de outras linhas com tag em comum. */
  baldeacoes: Estacao[];
}

import type { ReactNode } from 'react';
import type { EixoId } from '../../lib/eixos';
import type { PosicaoNaLinha } from '../../lib/linhas';
import { ArtigoLinha } from '../ArtigoLinha';

export interface RadarArticlePageProps {
  title: string;
  excerpt: string;
  category: string;
  eixo: EixoId;
  dateFormatted: string;
  duration: string;
  image: string;
  /** Posição do texto na linha do eixo (estações, atual, baldeações). */
  posicao?: PosicaoNaLinha;
  /** Corpo do artigo já renderizado (markdown via <Content /> no .astro). */
  children?: ReactNode;
}

export function RadarArticlePage(props: RadarArticlePageProps) {
  return <ArtigoLinha {...props} voltar={{ href: '/radar', label: 'Voltar para o Radar' }} />;
}

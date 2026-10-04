import type { ReactNode } from 'react';
import type { EixoId } from '../../lib/eixos';
import { ArtigoLeitura } from './ArtigoLeitura';

export interface RadarArticlePageProps {
  title: string;
  excerpt: string;
  category: string;
  eixo: EixoId;
  dateFormatted: string;
  duration: string;
  /** Imagem do frontmatter: usada como prévia social (OG) no layout, não no corpo da página. */
  image: string;
  /** Corpo do artigo já renderizado (markdown via <Content /> no .astro). */
  children?: ReactNode;
}

export function RadarArticlePage({ image: _image, ...props }: RadarArticlePageProps) {
  return <ArtigoLeitura {...props} voltar={{ href: '/radar', label: 'Voltar para o Radar' }} />;
}

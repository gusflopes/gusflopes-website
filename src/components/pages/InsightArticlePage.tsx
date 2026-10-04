import type { ReactNode } from 'react';
import type { EixoId } from '../../lib/eixos';
import { ArtigoLeitura, type Secao } from './ArtigoLeitura';

export interface InsightArticlePageProps {
  title: string;
  excerpt: string;
  category: string;
  eixo: EixoId;
  dateFormatted: string;
  duration: string;
  /** Imagem do frontmatter: usada como prévia social (OG) no layout, não no corpo da página. */
  image: string;
  /** H2 do corpo (headings do render), para o sumário da margem. */
  secoes?: Secao[];
  /** Corpo do artigo já renderizado (markdown via <Content /> no .astro). */
  children?: ReactNode;
}

export function InsightArticlePage({ image: _image, ...props }: InsightArticlePageProps) {
  return <ArtigoLeitura {...props} voltar={{ href: '/insights', label: 'Voltar' }} />;
}

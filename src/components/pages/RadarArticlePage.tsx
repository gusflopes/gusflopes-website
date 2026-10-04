import type { ReactNode } from 'react';
import type { EixoId } from '../../lib/eixos';
import type { Tela } from '../../lib/telas';
import { ArtigoPage } from './ArtigoPage';

export interface RadarArticlePageProps {
  title: string;
  excerpt: string;
  category: string;
  eixo: EixoId;
  dateFormatted: string;
  duration: string;
  /** Capa: tela gerada do slug (a foto de banco do frontmatter não é usada no render). */
  tela: Tela;
  /** Slug, para o UTM da newsletter. */
  slug: string;
  /** Margem pintada do texto (fundoMargem). */
  margem?: Record<string, string>;
  /** Corpo do artigo já renderizado (markdown via <Content /> no .astro). */
  children?: ReactNode;
}

export function RadarArticlePage({ slug, ...props }: RadarArticlePageProps) {
  return <ArtigoPage {...props} voltar={{ href: '/radar', label: 'Voltar para o Radar' }} origem={`radar-${slug}`} />;
}

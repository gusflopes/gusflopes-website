import type { ReactNode } from 'react';
import type { EixoId } from '../../lib/eixos';
import type { Tela } from '../../lib/telas';
import { ArtigoPage } from './ArtigoPage';

export interface InsightArticlePageProps {
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
  /** Corpo do artigo já renderizado (markdown via <Content /> no .astro). */
  children?: ReactNode;
}

export function InsightArticlePage({ slug, ...props }: InsightArticlePageProps) {
  return <ArtigoPage {...props} voltar={{ href: '/insights', label: 'Voltar' }} origem={`artigo-${slug}`} />;
}

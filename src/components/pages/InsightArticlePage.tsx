import type { ReactNode } from 'react';
import type { EixoId } from '../../lib/eixos';
import type { Tela } from '../../lib/telas';
import { ArtigoPage } from './ArtigoPage';
import type { ProximoTexto } from '../../lib/artigos';

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
  /** Margem pintada do texto (fundoMargem). */
  margem?: Record<string, string>;
  capitulos?: Record<string, string>;
  /** Próximo texto sugerido no fim do artigo. */
  proximo?: ProximoTexto;
  /** Corpo do artigo já renderizado (markdown via <Content /> no .astro). */
  children?: ReactNode;
}

export function InsightArticlePage({ slug, ...props }: InsightArticlePageProps) {
  return <ArtigoPage {...props} voltar={{ href: '/insights', label: 'Voltar' }} origem={`artigo-${slug}`} />;
}

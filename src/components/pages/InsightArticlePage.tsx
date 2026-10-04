import type { ReactNode } from 'react';
import { EIXOS, type EixoId } from '../../lib/eixos';
import { ArtigoShell, Sep } from '../artigo/ArtigoShell';

export interface InsightArticlePageProps {
  title: string;
  excerpt: string;
  category: string;
  eixo: EixoId;
  dateFormatted: string;
  duration: string;
  image: string;
  /** Corpo do artigo já renderizado (markdown via <Content /> no .astro). */
  children?: ReactNode;
}

export function InsightArticlePage({
  title,
  excerpt,
  category,
  eixo,
  dateFormatted,
  duration,
  image,
  children,
}: InsightArticlePageProps) {
  return (
    <ArtigoShell
      title={title}
      excerpt={excerpt}
      image={image}
      voltar={{ href: '/insights', label: 'Voltar' }}
      meta={
        <>
          <a
            href={EIXOS[eixo].href}
            className="font-semibold text-laranja-claro hover:text-laranja-palido underline-offset-4 hover:underline"
          >
            {EIXOS[eixo].shortLabel}
          </a>
          <Sep />
          <span className="text-nevoa">{category}</span>
          <Sep />
          <span>{dateFormatted}</span>
          <Sep />
          <span>{duration} leitura</span>
        </>
      }
    >
      {children}
    </ArtigoShell>
  );
}

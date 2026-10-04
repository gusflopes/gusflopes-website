import type { ReactNode } from 'react';
import { EIXOS, type EixoId } from '../../lib/eixos';
import { ArtigoShell, Sep } from '../artigo/ArtigoShell';

export interface RadarArticlePageProps {
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

export function RadarArticlePage({
  title,
  excerpt,
  category,
  eixo,
  dateFormatted,
  duration,
  image,
  children,
}: RadarArticlePageProps) {
  return (
    <ArtigoShell
      title={title}
      excerpt={excerpt}
      image={image}
      voltar={{ href: '/radar', label: 'Voltar para o Radar' }}
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

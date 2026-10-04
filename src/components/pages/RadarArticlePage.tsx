import type { ReactNode } from 'react';
import { EIXOS, EIXO_COR, type EixoId } from '../../lib/eixos';
import type { FundoResponsivo } from '../../lib/imagens';
import { PlacaEixo } from '../PlacaEixo';
import { ArtigoShell } from '../artigo/ArtigoShell';
import { NewsletterCta } from '../NewsletterCta';

export interface RadarArticlePageProps {
  title: string;
  excerpt: string;
  category: string;
  eixo: EixoId;
  dateFormatted: string;
  duration: string;
  image: string;
  /** O quadro, para o recorte na base da moldura. */
  fundo: FundoResponsivo;
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
  fundo,
  children,
}: RadarArticlePageProps) {
  return (
    <ArtigoShell
      title={title}
      excerpt={excerpt}
      image={image}
      fundo={fundo}
      capaFallback={`placa-${EIXO_COR[eixo]}`}
      voltar={{ href: '/radar', label: 'Voltar para o Radar' }}
      depois={<NewsletterCta content="artigo-radar" fioBase={false} />}
      meta={
        <>
          <PlacaEixo eixo={eixo} href={EIXOS[eixo].href} />
          <span className="text-nevoa">{category}</span>
          <span>{dateFormatted}</span>
          <span>{duration} leitura</span>
        </>
      }
    >
      {children}
    </ArtigoShell>
  );
}

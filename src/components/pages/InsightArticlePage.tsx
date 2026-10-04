import type { ReactNode } from 'react';
import { EIXOS, EIXO_COR, type EixoId } from '../../lib/eixos';
import type { FundoResponsivo } from '../../lib/imagens';
import { PlacaEixo } from '../PlacaEixo';
import type { ItemSumario } from '../artigo/Sumario';
import { ArtigoShell } from '../artigo/ArtigoShell';
import { NewsletterCta } from '../NewsletterCta';

export interface InsightArticlePageProps {
  title: string;
  excerpt: string;
  category: string;
  eixo: EixoId;
  dateFormatted: string;
  duration: string;
  image: string;
  /** O quadro, para o recorte na base da moldura. */
  fundo: FundoResponsivo;
  /** Os H2 do texto (headings do render), para o sumário. */
  sumario?: ItemSumario[];
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
  fundo,
  sumario,
  children,
}: InsightArticlePageProps) {
  return (
    <ArtigoShell
      title={title}
      excerpt={excerpt}
      image={image}
      fundo={fundo}
      sumario={sumario}
      capaEixo={EIXO_COR[eixo]}
      voltar={{ href: '/insights', label: 'Voltar' }}
      depois={<NewsletterCta content="artigo-insights" fioBase={false} />}
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

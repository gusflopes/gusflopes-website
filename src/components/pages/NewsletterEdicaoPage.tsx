import type { ReactNode } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { NewsletterCta } from '../NewsletterCta';
import { ArtigoShell } from '../artigo/ArtigoShell';
import type { FundoResponsivo } from '../../lib/imagens';

export interface NewsletterEdicaoPageProps {
  id: string;
  edicao: number;
  title: string;
  excerpt: string;
  dateFormatted: string;
  duration: string;
  image: string;
  substackUrl?: string;
  /** O quadro, para o recorte na base da moldura. */
  fundo: FundoResponsivo;
  /** Corpo da edição já renderizado (markdown via <Content /> no .astro). */
  children?: ReactNode;
}

export function NewsletterEdicaoPage({
  id,
  edicao,
  title,
  excerpt,
  dateFormatted,
  duration,
  image,
  substackUrl,
  fundo,
  children,
}: NewsletterEdicaoPageProps) {
  return (
    <ArtigoShell
      title={title}
      excerpt={excerpt}
      image={image}
      fundo={fundo}
      imageFit="inteira"
      voltar={null}
      voltarInline={{ href: '/newsletter', label: 'Todas as edições' }}
      autor={false}
      meta={
        <>
          <span className="font-semibold text-laranja-claro">Edição #{edicao}</span>
          <span>{dateFormatted}</span>
          <span>{duration} leitura</span>
        </>
      }
      extra={
        substackUrl && (
          <a
            href={substackUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="acao text-laranja"
          >
            Ler no Substack
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        )
      }
      depois={<NewsletterCta content={`edicao-${id}`} />}
    >
      {children}
    </ArtigoShell>
  );
}

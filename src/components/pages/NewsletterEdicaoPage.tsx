import type { ReactNode } from 'react';
import { ArrowLeft } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { NewsletterCta } from '../NewsletterCta';
import { Abertura } from '../Abertura';

export interface NewsletterEdicaoPageProps {
  id: string;
  edicao: number;
  title: string;
  excerpt: string;
  dateFormatted: string;
  duration: string;
  image: string;
  substackUrl?: string;
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
  children,
}: NewsletterEdicaoPageProps) {
  return (
    <main>
      <article>
        <header className="campo-azul pt-[72px]">
          <div className="moldura pt-8 md:pt-12 pb-12 md:pb-16">
            <a
              href="/newsletter"
              className="rotulo inline-flex items-center gap-2 text-ceu-claro hover:text-papel transition-colors mb-6 py-2"
            >
              <ArrowLeft size={16} strokeWidth={2.5} aria-hidden="true" />
              Todas as edições
            </a>

            <p className="rotulo flex flex-wrap border-y border-azul-3 mb-10 md:mb-14 tabular-nums">
              <span className="py-2.5 pr-4 text-laranja">Edição #{edicao}</span>
              <span className="py-2.5 px-4 border-l border-azul-3 text-ceu">{dateFormatted}</span>
              <span className="py-2.5 px-4 border-l border-azul-3 text-ceu">{duration} leitura</span>
            </p>

            <div className="grid gap-10 lg:grid-cols-12 lg:gap-x-[var(--gutter)] items-end">
              <div className="lg:col-span-8">
                <Abertura titulo={title} eixo="newsletter" teto={8.5} />
              </div>
              <div className="lg:col-span-4 pt-5 border-t-2 border-papel max-w-[44ch]">
                <p className="font-serif text-[1.25rem] md:text-[1.3125rem] leading-[1.5] text-ceu-claro">{excerpt}</p>
                {substackUrl && (
                  <p className="mt-5">
                    <a href={substackUrl} target="_blank" rel="noopener noreferrer" className="acao">
                      Ler no Substack →
                    </a>
                  </p>
                )}
              </div>
            </div>
          </div>
        </header>

        <div className="campo-papel pb-24">
          <div className="moldura pt-12 md:pt-16 grid grid-cols-[minmax(0,1fr)] lg:grid-cols-12 lg:gap-x-[var(--gutter)]">
            <div className="lg:col-start-4 lg:col-span-9 max-w-[68ch]">
              <ImageWithFallback src={image} alt={title} className="w-full h-auto mb-12 bg-papel-2" />
              <div className="leitura">{children}</div>
              <div className="mt-16">
                <NewsletterCta content={`edicao-${id}`} />
              </div>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}

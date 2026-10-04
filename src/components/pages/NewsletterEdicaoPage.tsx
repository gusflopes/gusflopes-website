import type { ReactNode } from 'react';
import { ArrowLeft } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { NewsletterCta } from '../NewsletterCta';

export interface NewsletterEdicaoPageProps {
  id: string;
  edicao: number;
  title: string;
  excerpt: string;
  dateFormatted: string;
  duration: string;
  /** Capa autoral da edição (a mesma do Substack) — mantida, não é foto de banco. */
  image: string;
  substackUrl?: string;
  /** Margem pintada da edição (fundoMargem), costurada à coluna pelo fio laranja. */
  margem?: Record<string, string>;
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
  margem,
  children,
}: NewsletterEdicaoPageProps) {
  return (
    <main className="bg-papel min-h-screen">
      <article>
        <header className="bg-noite">
          <div className="max-w-[43rem] mx-auto px-4 md:px-6 pt-8 md:pt-12 pb-10 md:pb-12">
            <a
              href="/newsletter"
              className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-nevoa hover:text-white transition-colors mb-8"
            >
              <ArrowLeft size={16} aria-hidden="true" />
              Todas as edições
            </a>
            <h1 className="font-serif text-[2rem] leading-[1.1] md:text-[3.1rem] md:leading-[1.06] tracking-[-0.012em] text-white mb-5">{title}</h1>
            <p className="font-serif text-lg md:text-xl leading-relaxed text-nevoa mb-6">{excerpt}</p>
            <p className="font-sans text-sm text-bruma flex flex-wrap gap-x-4 gap-y-2 items-center">
              <span>
                Edição #{edicao} · {dateFormatted} · {duration} leitura
              </span>
              {substackUrl && (
                <a href={substackUrl} target="_blank" rel="noopener noreferrer" className="font-bold text-laranja-claro hover:text-pessego">
                  Ler no Substack →
                </a>
              )}
            </p>
          </div>
        </header>

        <div className="fio bg-noite">
          <div className="max-w-[43rem] mx-auto md:px-6">
            <ImageWithFallback src={image} alt={title} className="w-full h-auto block" />
          </div>
        </div>

        <div className={`papel relative pt-12 md:pt-16 pb-16 ${margem ? 'pl-12 pr-4 md:px-6' : 'px-4 md:px-6'}`}>
          {margem && (
            <div
              aria-hidden="true"
              className="margem absolute top-0 bottom-0 left-0 w-7 md:w-11 lg:w-24 lg:left-[max(0px,calc(50%-20rem-6rem-4rem))] border-r-[3px] lg:border-r-[7px] border-laranja"
              style={margem}
            />
          )}
          <div className="leitura mx-auto">{children}</div>
          <div className="max-w-[40rem] mx-auto mt-16">
            <NewsletterCta content={`edicao-${id}`} />
          </div>
        </div>
      </article>
    </main>
  );
}

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
  image: string;
  substackUrl?: string;
  /** Corpo da edição já renderizado (markdown via <Content /> no .astro). */
  children?: ReactNode;
}

/** Edição da newsletter: moldura noturna, leitura no papel, inscrição no fim. */
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
    <main style={{ '--linha': 'var(--color-laranja)' } as React.CSSProperties}>
      <div className="bg-noite text-luz">
        <header className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 md:pt-10 pb-12 md:pb-16">
          <a
            href="/newsletter"
            className="inline-flex items-center gap-2 min-h-11 text-xs font-bold uppercase tracking-[0.1em] text-nevoa hover:text-white transition-colors mb-8"
          >
            <ArrowLeft size={14} aria-hidden="true" />
            Todas as edições
          </a>
          {/* serviço semanal: trilho tracejado */}
          <span
            aria-hidden="true"
            className="block max-w-4xl h-1.5 mb-8 bg-[repeating-linear-gradient(to_right,var(--color-laranja)_0_18px,transparent_18px_26px)]"
          />
          <p className="text-[0.8rem] font-bold uppercase tracking-[0.1em] text-laranja-claro tabular-nums mb-4">
            Edição #{edicao} · {dateFormatted} · {duration} leitura
          </p>
          <h1 className="max-w-4xl text-[2.1rem] sm:text-5xl lg:text-[3.4rem] leading-[1.06] font-extrabold tracking-[-0.025em] text-white">
            {title}
          </h1>
          <p className="mt-6 max-w-[60ch] font-serif text-lg md:text-[1.3rem] leading-relaxed text-nevoa">{excerpt}</p>
          {substackUrl && (
            <p className="mt-5 text-sm">
              <a href={substackUrl} target="_blank" rel="noopener noreferrer" className="font-bold text-laranja-claro hover:text-white">
                Ler no Substack →
              </a>
            </p>
          )}
        </header>
      </div>

      <div className="papel bg-papel text-tinta">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 md:pt-14 pb-16">
          <div className="mb-12 rounded overflow-hidden bg-fio">
            <ImageWithFallback src={image} alt={title} className="w-full h-auto" />
          </div>
          <div className="prosa mx-auto">{children}</div>
        </article>
      </div>

      <div className="bg-noite px-4 sm:px-6 py-14">
        <div className="max-w-3xl mx-auto">
          <NewsletterCta content={`edicao-${id}`} />
        </div>
      </div>
    </main>
  );
}

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
    <main className="pt-32 pb-24 px-6 min-h-screen bg-slate-950 text-slate-200">
      <article className="max-w-3xl mx-auto">
        <a
          href="/newsletter"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-orange-500 transition-colors mb-8"
        >
          <ArrowLeft size={14} />
          Todas as edições
        </a>

        <header className="mb-10">
          <p className="font-mono text-xs uppercase tracking-wider text-orange-400 mb-4">
            Edição #{edicao} · {dateFormatted} · {duration} leitura
          </p>
          <h1 className="font-serif text-4xl md:text-5xl text-white leading-tight mb-6">{title}</h1>
          <p className="font-sans text-xl text-slate-400 font-light leading-relaxed">{excerpt}</p>
          {substackUrl && (
            <p className="mt-4 text-sm">
              <a href={substackUrl} target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:text-orange-300">
                Ler no Substack →
              </a>
            </p>
          )}
        </header>

        <div className="mb-12 rounded-xl overflow-hidden border border-slate-800">
          <ImageWithFallback src={image} alt={title} className="w-full h-auto" />
        </div>

        <div className="prose prose-invert prose-lg max-w-none font-sans text-slate-300 leading-relaxed prose-headings:font-serif prose-headings:font-medium prose-headings:text-white prose-a:text-orange-400 hover:prose-a:text-orange-300 prose-strong:text-white prose-img:rounded-lg">
          {children}
        </div>

        <div className="mt-16">
          <NewsletterCta content={`edicao-${id}`} />
        </div>
      </article>
    </main>
  );
}

import { Play, ArrowRight } from 'lucide-react';

export interface LatestArticle {
  id: string;
  title: string;
  category: string;
  image: string;
  link: string;
}

export interface FeaturedVideo {
  title: string;
  excerpt: string;
  image: string;
  link: string;
  isExternal: boolean;
}

interface LatestContentProps {
  articles: LatestArticle[];
  video?: FeaturedVideo;
}

/** Fecho da home: textos recentes como lista de grade e o vídeo como bloco azul-escuro. */
export function LatestContent({ articles, video }: LatestContentProps) {
  if (articles.length === 0 && !video) {
    return null;
  }

  return (
    <section className="campo-papel py-20 md:py-28">
      <div className="moldura grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-x-[var(--gutter)]">
        {articles.length > 0 && (
          <div className={video ? 'lg:col-span-7' : 'lg:col-span-12'}>
            <h2 className="display uppercase text-[2rem] md:text-[2.75rem] text-azul mb-6">Ideias recentes</h2>
            <ul className="border-t-2 border-azul">
              {articles.map((article) => (
                <li key={article.id} className="border-b border-filete">
                  <a href={article.link} className="group grid gap-2 py-6">
                    <span className="rotulo text-laranja-fundo">{article.category}</span>
                    <span className="font-sans font-extrabold [font-stretch:87%] text-[1.5rem] md:text-[1.875rem] leading-[1.08] tracking-[-0.01em] text-azul group-hover:text-laranja-fundo transition-colors text-balance">
                      {article.title}
                    </span>
                    <span className="acao mt-2 self-start">
                      Ler Mais <ArrowRight size={14} strokeWidth={2.5} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {video && (
          <div className={articles.length > 0 ? 'lg:col-span-5' : 'lg:col-span-12'}>
            <h2 className="display uppercase text-[2rem] md:text-[2.75rem] text-azul mb-6">Vídeo em Destaque</h2>
            <a
              href={video.link}
              {...(video.isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="group campo-azul flex flex-col justify-between gap-10 p-7 md:p-9 min-h-[22rem] border-t-2 border-azul"
            >
              <span className="grid place-items-center w-16 h-16 bg-laranja text-laranja-tinta transition-transform duration-300 group-hover:rotate-12" aria-hidden="true">
                <Play size={28} strokeWidth={2.5} fill="currentColor" className="ml-1" />
              </span>
              <span className="block">
                <span className="block font-sans font-black text-[1.75rem] md:text-[2.25rem] leading-[1.02] tracking-[-0.015em] uppercase text-papel mb-4 text-balance group-hover:text-laranja-claro transition-colors">
                  {video.title}
                </span>
                <span className="block font-serif text-[1.0625rem] leading-relaxed text-ceu-claro max-w-[44ch]">{video.excerpt}</span>
              </span>
            </a>
          </div>
        )}
      </div>
    </section>
  );
}

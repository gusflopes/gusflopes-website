import { Play, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

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

/** Fecho da home em papel frio: os textos mais recentes e o vídeo em destaque, sem cartões. */
export function LatestContent({ articles, video }: LatestContentProps) {
  if (articles.length === 0 && !video) {
    return null;
  }

  return (
    <section className="claro bg-papel text-tinta py-20 md:py-28 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-20">
        {articles.length > 0 && (
          <div>
            <h2 className="font-serif text-[1.75rem] md:text-[2rem] leading-tight text-tinta pb-5 mb-2 border-b border-tinta">
              Ideias recentes
            </h2>
            <ul>
              {articles.map((article) => (
                <li key={article.id} className="border-b border-papel-fio">
                  <a href={article.link} className="group grid grid-cols-[minmax(0,1fr)_7rem] sm:grid-cols-[minmax(0,1fr)_10rem] gap-5 sm:gap-8 py-7">
                    <div className="flex flex-col">
                      <span className="rotulo text-laranja-fundo mb-3">{article.category}</span>
                      <h3 className="font-serif text-xl sm:text-[1.5rem] font-semibold leading-snug text-tinta group-hover:text-laranja-fundo transition-colors">
                        {article.title}
                      </h3>
                      <span className="mt-auto pt-5 inline-flex items-center gap-2 font-sans text-sm font-semibold text-tinta-2">
                        Ler Mais
                        <ArrowRight size={14} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </div>
                    <div className="aspect-[4/5] sm:aspect-[4/3] overflow-hidden rounded-[3px] bg-papel-2">
                      <ImageWithFallback
                        src={article.image}
                        alt=""
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {video && (
          <div>
            <h2 className="font-serif text-[1.75rem] md:text-[2rem] leading-tight text-tinta pb-5 mb-7 border-b border-tinta">
              Vídeo em Destaque
            </h2>
            <a
              href={video.link}
              {...(video.isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="group block"
            >
              <div className="relative aspect-video overflow-hidden rounded-[3px] bg-noite">
                <ImageWithFallback
                  src={video.image}
                  alt=""
                  loading="lazy"
                  className="w-full h-full object-cover opacity-85 transition-opacity duration-500 group-hover:opacity-100"
                />
                <span className="absolute left-5 bottom-5 w-14 h-14 rounded-full bg-laranja text-brasa flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                  <Play size={22} fill="currentColor" className="ml-0.5" aria-hidden="true" />
                </span>
              </div>
              <h3 className="mt-6 font-serif text-2xl md:text-[1.75rem] font-semibold leading-snug text-tinta group-hover:text-laranja-fundo transition-colors">
                {video.title}
              </h3>
              <p className="mt-3 font-sans text-[1.0625rem] leading-relaxed text-tinta-2 max-w-[36rem]">{video.excerpt}</p>
            </a>
          </div>
        )}
      </div>
    </section>
  );
}

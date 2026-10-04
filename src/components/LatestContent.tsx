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

export function LatestContent({ articles, video }: LatestContentProps) {
  if (articles.length === 0 && !video) {
    return null;
  }

  return (
    <section className="bg-noite-2 py-20 md:py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-16">

        {/* Articles Column */}
        {articles.length > 0 && (
          <div>
            <h3 className="text-2xl md:text-[1.75rem] font-extrabold tracking-[-0.015em] text-white mb-8">
              Ideias recentes
            </h3>
            <ul className="list-none m-0 p-0 divide-y divide-trilho border-y border-trilho">
              {articles.map((article) => (
                <li key={article.id}>
                  <a href={article.link} className="group flex gap-5 py-6 items-start">
                    <div className="w-28 sm:w-36 shrink-0 aspect-[4/3] overflow-hidden rounded bg-noite">
                      <ImageWithFallback
                        src={article.image}
                        alt=""
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="min-w-0">
                      <span className="block text-xs font-bold uppercase tracking-[0.1em] text-laranja-claro mb-2">
                        {article.category}
                      </span>
                      <h4 className="text-lg md:text-xl font-bold leading-snug text-white group-hover:underline decoration-laranja decoration-2 underline-offset-4">
                        {article.title}
                      </h4>
                      <span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-nevoa group-hover:text-white">
                        Ler Mais <ArrowRight size={14} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Video Column */}
        {video && (
          <div>
            <h3 className="text-2xl md:text-[1.75rem] font-extrabold tracking-[-0.015em] text-white mb-8">
              Vídeo em Destaque
            </h3>
            <a
              href={video.link}
              {...(video.isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="group block"
            >
              <div className="relative aspect-video overflow-hidden rounded bg-noite">
                <ImageWithFallback
                  src={video.image}
                  alt=""
                  className="w-full h-full object-cover"
                />
                <span className="absolute left-4 bottom-4 grid place-items-center w-14 h-14 rounded-full bg-laranja text-brasa shadow-[0_8px_20px_-8px_rgb(0_0_0/0.6)] ring-4 ring-noite/60 transition-transform group-hover:scale-105">
                  <Play fill="currentColor" size={24} className="ml-1" aria-hidden="true" />
                </span>
              </div>
              <h4 className="mt-5 text-xl md:text-2xl font-bold leading-snug text-white group-hover:underline decoration-laranja decoration-2 underline-offset-4">
                {video.title}
              </h4>
              <p className="mt-2 font-serif text-[1.05rem] leading-relaxed text-nevoa">
                {video.excerpt}
              </p>
            </a>
          </div>
        )}

      </div>
    </section>
  );
}

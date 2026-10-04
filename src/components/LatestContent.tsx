import { Play, ArrowRight } from 'lucide-react';
import type { Tela } from '../lib/telas';
import { TelaPicture } from './TelaPicture';

export interface LatestArticle {
  id: string;
  title: string;
  category: string;
  /** Capa: a tela gerada do texto (a foto de banco do frontmatter não é usada). */
  tela: Tela;
  link: string;
}

export interface FeaturedVideo {
  title: string;
  excerpt: string;
  tela: Tela;
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
    <section className="bg-noite px-4 md:px-6 py-16 md:py-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-12">
        {articles.length > 0 && (
          <div>
            <h2 className="font-serif text-2xl md:text-3xl text-white mb-8">Ideias recentes</h2>
            <div className="flex flex-col gap-10">
              {articles.map((article) => (
                <a key={article.id} href={article.link} className="cartao group grid sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-5 sm:gap-6">
                  <div>
                    <div className="aspect-[16/9] overflow-hidden">
                      <TelaPicture tela={article.tela} sizes="(min-width: 1024px) 20vw, (min-width: 640px) 40vw, 100vw" />
                    </div>
                    <span className="fio-vivo" />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="font-serif text-xl md:text-[1.4rem] leading-snug text-white group-hover:text-pessego transition-colors mb-2">
                      {article.title}
                    </h3>
                    <span className="rotulo text-laranja-claro mb-4">{article.category}</span>
                    <span className="acao text-nevoa mt-auto">
                      Ler Mais <ArrowRight size={14} aria-hidden="true" />
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {video && (
          <div>
            <h2 className="font-serif text-2xl md:text-3xl text-white mb-8">Vídeo em Destaque</h2>
            <a
              href={video.link}
              {...(video.isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="cartao group block"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <TelaPicture tela={video.tela} sizes="(min-width: 1024px) 45vw, 100vw" />
                <span className="absolute left-5 bottom-5 w-14 h-14 bg-laranja text-brasa flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                  <Play fill="currentColor" size={24} className="ml-0.5" aria-hidden="true" />
                </span>
              </div>
              <span className="fio-vivo" />
              <h3 className="font-serif text-2xl md:text-3xl leading-tight text-white mt-5 mb-3 group-hover:text-pessego transition-colors">
                {video.title}
              </h3>
              <p className="font-sans text-nevoa leading-relaxed max-w-[60ch]">{video.excerpt}</p>
            </a>
          </div>
        )}
      </div>
    </section>
  );
}

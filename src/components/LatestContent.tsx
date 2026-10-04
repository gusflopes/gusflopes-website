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
  /** Capa panorâmica do item (com recorte para o celular). */
  tela: Tela;
  link: string;
  isExternal: boolean;
}

interface LatestContentProps {
  articles: LatestArticle[];
  video?: FeaturedVideo;
}

/**
 * "Ver o que saiu agora": o vídeo em destaque é a capa de um texto em plano aberto — a tela
 * panorâmica na largura da coluna, com o fio por baixo — e as ideias recentes ficam ao lado do
 * resumo do vídeo como sumário só de texto (a tela de cada uma está no hub e no texto, não aqui).
 */
export function LatestContent({ articles, video }: LatestContentProps) {
  if (articles.length === 0 && !video) {
    return null;
  }

  const linkVideo = video ? { href: video.link, ...(video.isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {}) } : {};

  return (
    <section className="bg-noite px-4 md:px-6 pb-20 md:pb-28">
      <div className="max-w-7xl mx-auto">
        {video && (
          <>
            <h2 className="font-serif text-2xl md:text-3xl text-white mb-6">Vídeo em Destaque</h2>
            <a {...linkVideo} tabIndex={-1} aria-hidden="true" className="group block">
              <div className="relative h-[230px] sm:h-auto sm:aspect-[24/7] overflow-hidden">
                <TelaPicture tela={video.tela} sizes="(min-width: 1280px) 1232px, 100vw" />
                <span className="absolute left-4 bottom-4 md:left-6 md:bottom-6 w-14 h-14 bg-laranja text-brasa flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                  <Play fill="currentColor" size={24} className="ml-0.5" />
                </span>
              </div>
              <span className="fio block" />
            </a>
          </>
        )}

        <div className={`grid gap-12 lg:grid-cols-12 lg:gap-14 ${video ? 'mt-8 md:mt-10' : ''}`}>
          {video && (
            <div className="lg:col-span-7">
              <h3 className="font-serif text-2xl md:text-[2.1rem] leading-[1.12] text-white mb-4">
                <a {...linkVideo} className="hover:text-pessego transition-colors">
                  {video.title}
                </a>
              </h3>
              <p className="font-sans text-lg text-nevoa leading-relaxed max-w-[60ch]">{video.excerpt}</p>
            </div>
          )}

          {articles.length > 0 && (
            <div className={video ? 'lg:col-span-5 lg:border-l lg:border-linha lg:pl-12' : 'lg:col-span-8'}>
              <h2 className="font-serif text-2xl md:text-3xl text-white mb-2">Ideias recentes</h2>
              <ul>
                {articles.map((article) => (
                  <li key={article.id} className="border-b border-linha last:border-b-0">
                    <a href={article.link} className="cartao group block py-5">
                      <span className="block font-serif text-xl leading-snug text-white group-hover:text-pessego transition-colors mb-2">
                        {article.title}
                      </span>
                      <span className="flex items-center justify-between gap-4">
                        <span className="rotulo text-bruma">{article.category}</span>
                        <span className="acao text-laranja-claro text-sm">
                          Ler Mais <ArrowRight size={14} aria-hidden="true" />
                        </span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

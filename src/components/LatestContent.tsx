import { Play, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { EIXOS, type EixoId } from '../lib/eixos';

export interface LatestArticle {
  id: string;
  title: string;
  category: string;
  image: string;
  link: string;
  /** Data já formatada (pt-BR). */
  date?: string;
  eixo?: EixoId;
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

/**
 * "Ideias recentes" + "Vídeo em Destaque": o trabalho é ler (ou assistir) algo agora.
 * À esquerda, uma lista de leitura sem imagens — data na margem, título, e a linha de
 * metadados (eixo · tema) embaixo. À direita, o vídeo é a única imagem da seção.
 */
export function LatestContent({ articles, video }: LatestContentProps) {
  if (articles.length === 0 && !video) {
    return null;
  }

  return (
    <section className="claro bg-papel text-tinta px-4 sm:px-6 pb-24 md:pb-32">
      <div className="max-w-7xl mx-auto border-t border-tinta pt-12 md:pt-16 grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-16">
        {articles.length > 0 && (
          <div className="lg:col-span-7">
            <h2 className="h-secao text-tinta">
              Ideias <span className="acento">recentes</span>
            </h2>
            <ul className="mt-8 md:mt-10">
              {articles.map((article) => (
                <li key={article.id} className="border-t border-papel-fio first:border-tinta/80">
                  <a href={article.link} className="group grid md:grid-cols-[7rem_minmax(0,1fr)] gap-x-8 py-7 md:py-8">
                    {article.date && (
                      <span className="hidden md:block num font-sans text-sm text-ceu-fundo pt-2">{article.date}</span>
                    )}
                    <div>
                      <h3 className="font-serif text-[1.375rem] sm:text-[1.625rem] font-semibold leading-[1.2] text-tinta group-hover:text-laranja-fundo transition-colors">
                        {article.title}
                      </h3>
                      <p className="meta mt-3">
                        {article.date && <span className="so-movel">{article.date}</span>}
                        {article.eixo && <span>{EIXOS[article.eixo].shortLabel}</span>}
                        <span>{article.category}</span>
                      </p>
                      <span className="acao mt-4 text-laranja-fundo">
                        Ler Mais
                        <ArrowRight size={15} aria-hidden="true" />
                      </span>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {video && (
          <div className="lg:col-span-5 lg:pt-[0.4rem]">
            <h2 className="font-serif text-[1.5rem] md:text-[1.75rem] leading-tight text-tinta">Vídeo em Destaque</h2>
            <a
              href={video.link}
              {...(video.isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="group block mt-8 md:mt-10"
            >
              <div className="relative aspect-video overflow-hidden rounded-[4px] bg-noite">
                <ImageWithFallback
                  src={video.image}
                  alt=""
                  loading="lazy"
                  className="w-full h-full object-cover opacity-90 transition-opacity duration-500 group-hover:opacity-100"
                />
                <span className="absolute left-4 bottom-4 w-12 h-12 rounded-full bg-laranja text-brasa flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                  <Play size={19} fill="currentColor" className="ml-0.5" aria-hidden="true" />
                </span>
              </div>
              <h3 className="mt-6 font-serif text-[1.375rem] md:text-[1.5rem] font-semibold leading-snug text-tinta group-hover:text-laranja-fundo transition-colors">
                {video.title}
              </h3>
              <p className="mt-3 font-sans text-[1rem] leading-relaxed text-tinta-2">{video.excerpt}</p>
            </a>
          </div>
        )}
      </div>
    </section>
  );
}

import { Play, ArrowRight, ArrowUpRight } from 'lucide-react';
import { Abertura } from './Abertura';

export interface LatestArticle {
  id: string;
  title: string;
  category: string;
  image: string;
  link: string;
  /** Data ISO (YYYY-MM-DD) e partes já formatadas para exibição (dia; mês e ano). */
  isoDate?: string;
  dia?: string;
  mesAno?: string;
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
 * Trabalho da seção: ver o que saiu agora e abrir um texto.
 * Composição: o título de seção é uma linha estreita que ocupa a largura toda; os textos são
 * linhas de tabela (data | título | categoria ao lado | seta) na mesma grade dos hubs. O vídeo
 * fecha como uma linha de duas células: o título da seção à esquerda e a célula azul inteira
 * como link, com o quadrado laranja do play.
 */
export function LatestContent({ articles, video }: LatestContentProps) {
  if (articles.length === 0 && !video) {
    return null;
  }

  return (
    <section className="campo-papel pt-20 md:pt-28 pb-6 md:pb-10">
      <div className="moldura">
        {articles.length > 0 && (
          <div>
            <Abertura as="h2" titulo="Ideias recentes" instancia="estreita" teto={13} />
            <ol className="mt-6 border-t-2 border-azul">
              {articles.map((article) => (
                <li key={article.id} className="border-b border-filete">
                  <a
                    href={article.link}
                    className="group grid grid-cols-1 lg:grid-cols-12 gap-x-[var(--gutter)] gap-y-3 py-6 md:py-7 hover:bg-papel-2/70 transition-colors"
                  >
                    {article.dia && (
                      <time dateTime={article.isoDate} className="lg:col-span-2 flex items-baseline lg:flex-col lg:items-start gap-x-3 gap-y-2">
                        <span className="numeral text-[2.75rem] lg:text-[4rem] text-azul">{article.dia}</span>
                        <span className="rotulo text-tinta-2">{article.mesAno}</span>
                      </time>
                    )}
                    <h3
                      className={`${article.dia ? 'lg:col-span-7' : 'lg:col-span-9'} font-sans font-extrabold [font-stretch:87%] text-[1.5rem] md:text-[2rem] leading-[1.06] tracking-[-0.012em] text-azul group-hover:text-laranja-fundo transition-colors text-balance`}
                    >
                      {article.title}
                    </h3>
                    <div className="lg:col-span-3 flex lg:flex-col justify-between gap-3 lg:pt-2">
                      <p className="rotulo text-laranja-fundo">{article.category}</p>
                      <span className="acao">
                        Ler Mais <ArrowRight size={14} strokeWidth={2.5} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </a>
                </li>
              ))}
            </ol>
          </div>
        )}

        {video && (
          <section aria-labelledby="video-title" className={`${articles.length > 0 ? 'mt-16 md:mt-20' : ''} grid lg:grid-cols-12 gap-[2px] bg-azul border-2 border-azul`}>
            <div className="campo-papel lg:col-span-4 p-6 md:p-8 flex items-end">
              <Abertura id="video-title" as="h2" titulo="Vídeo em Destaque" instancia="estreita" teto={6} className="w-full" />
            </div>
            <a
              href={video.link}
              {...(video.isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="group campo-azul lg:col-span-8 grid grid-cols-1 sm:grid-cols-[auto_minmax(0,1fr)] gap-x-6 gap-y-5 p-6 md:p-8"
            >
              <span className="grid place-items-center w-16 h-16 md:w-20 md:h-20 bg-laranja text-laranja-tinta transition-transform duration-300 group-hover:rotate-12" aria-hidden="true">
                <Play size={30} strokeWidth={2.5} fill="currentColor" className="ml-1" />
              </span>
              <span className="block">
                <span className="block font-sans font-extrabold [font-stretch:87%] text-[1.625rem] md:text-[2.125rem] leading-[1.06] tracking-[-0.012em] text-papel mb-4 text-balance group-hover:text-laranja-claro transition-colors">
                  {video.title}
                  {video.isExternal && <ArrowUpRight size={22} strokeWidth={2.5} aria-hidden="true" className="inline ml-1 align-[-0.1em] text-laranja" />}
                </span>
                <span className="block font-serif text-[1.0625rem] leading-relaxed text-ceu-claro max-w-[56ch]">{video.excerpt}</span>
              </span>
            </a>
          </section>
        )}
      </div>
    </section>
  );
}

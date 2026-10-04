import { Play } from 'lucide-react';
import type { Tela } from '../lib/telas';
import { TelaPicture } from './TelaPicture';

export interface FeaturedVideo {
  title: string;
  excerpt: string;
  /** Tela de projeção da home (ondas largas, semente própria). */
  tela: Tela;
  link: string;
  isExternal: boolean;
}

/**
 * "Assistir": o vídeo em destaque como uma sala de projeção — no creme (rodada 5): a home não
 * empilha mais vídeo, ferramenta e quadro no escuro; a tela de projeção é a única pintura aqui. A tela 16:9 (ondas largas — a fala)
 * sai do grid e sangra até a borda direita da janela, com o play grande e o fio por baixo; o
 * título e o resumo ficam na coluna da esquerda, fora da pintura. A lista "Ideias recentes" foi
 * fundida nos eixos.
 */
export function LatestContent({ video }: { video?: FeaturedVideo }) {
  if (!video) return null;

  const linkVideo = { href: video.link, ...(video.isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {}) };

  return (
    <section aria-labelledby="video-title" className="bg-campo papel overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-14 pb-16 md:pt-20 md:pb-24">
        {/* Cabeçalho da seção na mesma escala de "O que eu escrevo, e para quem"; o vídeo é o item. */}
        <div className="grid gap-4 lg:grid-cols-12 lg:gap-14 mb-8 md:mb-10">
          <h2 id="video-title" className="capitulo lg:col-span-7 font-serif text-[2.1rem] md:text-5xl leading-[1.08] tracking-[-0.01em] text-tinta">
            Vídeo em Destaque
          </h2>
        </div>

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14 items-center">
          <a {...linkVideo} tabIndex={-1} aria-hidden="true" className="group block lg:col-span-7 lg:order-last lg:mr-[calc(50%-50vw)] -mx-4 md:mx-0">
            <div className="relative aspect-[16/9] overflow-hidden">
              <TelaPicture tela={video.tela} sizes="(min-width: 1024px) 62vw, 100vw" />
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 md:w-24 md:h-24 bg-laranja text-noite flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                <Play fill="currentColor" size={34} className="ml-1" />
              </span>
            </div>
            <span className="fio block" />
          </a>

          <div className="lg:col-span-5 border-t-4 border-laranja pt-6">
            <h3 className="font-serif text-[1.6rem] md:text-[2rem] leading-[1.15] text-tinta mb-5">
              <a {...linkVideo} className="hover:text-laranja-fundo transition-colors">
                {video.title}
              </a>
            </h3>
            <p className="font-sans text-lg text-tinta-2 leading-relaxed max-w-[56ch]">{video.excerpt}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

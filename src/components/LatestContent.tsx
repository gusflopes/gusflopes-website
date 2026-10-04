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
 * "Assistir": o vídeo em destaque como uma sala de projeção. A tela 16:9 (ondas largas — a fala)
 * sai do grid e sangra até a borda direita da janela, com o play grande e o fio por baixo; o
 * título e o resumo ficam na coluna da esquerda, fora da pintura. A lista "Ideias recentes" foi
 * fundida nos eixos.
 */
export function LatestContent({ video }: { video?: FeaturedVideo }) {
  if (!video) return null;

  const linkVideo = { href: video.link, ...(video.isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {}) };

  return (
    <section aria-labelledby="video-title" className="bg-noite overflow-hidden border-t border-linha">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24 grid gap-10 lg:grid-cols-12 lg:gap-14 items-center">
        <a {...linkVideo} tabIndex={-1} aria-hidden="true" className="group block lg:col-span-7 lg:order-last lg:mr-[calc(50%-50vw)] -mx-4 md:mx-0">
          <div className="relative aspect-[16/9] overflow-hidden">
            <TelaPicture tela={video.tela} sizes="(min-width: 1024px) 62vw, 100vw" />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 md:w-24 md:h-24 bg-laranja text-noite flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
              <Play fill="currentColor" size={34} className="ml-1" />
            </span>
          </div>
          <span className="fio block" />
        </a>

        <div className="lg:col-span-5">
          <h2 id="video-title" className="font-serif text-2xl md:text-3xl text-white mb-6">Vídeo em Destaque</h2>
          <h3 className="font-serif text-[1.9rem] md:text-[2.6rem] leading-[1.08] tracking-[-0.01em] text-white mb-5">
            <a {...linkVideo} className="hover:text-pessego transition-colors">
              {video.title}
            </a>
          </h3>
          <p className="font-sans text-lg text-nevoa leading-relaxed max-w-[56ch]">{video.excerpt}</p>
        </div>
      </div>
    </section>
  );
}

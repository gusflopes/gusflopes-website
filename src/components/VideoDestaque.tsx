import { Play, ArrowUpRight } from 'lucide-react';

export interface FeaturedVideo {
  title: string;
  excerpt: string;
  image: string;
  link: string;
  isExternal: boolean;
}

/**
 * Trabalho da camada: assistir a uma coisa só, sem pressa.
 * É a camada de volume baixo da home, de propósito: depois do Simulador (o mais alto) e antes
 * da abertura dos temas, ela abre em estreita 780 em caixa mista, sem bloco de tipo, para as
 * vizinhas voltarem a pesar. Composição: linha de duas células — o título da camada sobre o
 * papel, e a célula inteira como link em petróleo escuro (cor do quadro, papel sobre ela 6,67:1), com o quadrado laranja do play girado 12° (o mesmo
 * ângulo da janela do hero; endireita no hover).
 */
export function VideoDestaque({ video }: { video: FeaturedVideo }) {
  return (
    <section aria-labelledby="video-title" className="campo-papel pt-14 md:pt-20">
      <div className="moldura">
        <div className="grid lg:grid-cols-12 gap-[2px] bg-azul border-2 border-azul">
          <div className="relative campo-papel lg:col-span-4 p-6 pt-16 md:p-8 md:pt-16 flex items-end">
            <span className="marca marca-canto" aria-hidden="true" />
            <h2 id="video-title" className="nome-celula text-azul">Vídeo em Destaque</h2>
          </div>
          <a
            href={video.link}
            {...(video.isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className="group campo-azul !bg-petroleo-escuro lg:col-span-8 grid grid-cols-1 sm:grid-cols-[auto_minmax(0,1fr)] gap-x-8 gap-y-6 p-6 md:p-8"
          >
            <span
              className="grid place-items-center w-16 h-16 md:w-24 md:h-24 mt-1 ml-1 bg-laranja text-laranja-tinta rotate-12 transition-transform duration-300 group-hover:rotate-0 motion-reduce:transition-none"
              aria-hidden="true"
            >
              <Play size={30} strokeWidth={2.5} fill="currentColor" className="ml-1 -rotate-12 group-hover:rotate-0 transition-transform duration-300" />
            </span>
            <span className="block">
              <span className="block font-sans font-bold [font-stretch:87%] text-[1.5rem] md:text-[1.875rem] leading-[1.08] tracking-[-0.01em] text-papel mb-4 text-balance group-hover:text-laranja-palido transition-colors">
                {video.title}
                {video.isExternal && <ArrowUpRight size={22} strokeWidth={2.5} aria-hidden="true" className="inline ml-1 align-[-0.1em] text-laranja-palido" />}
              </span>
              <span className="block font-serif text-[1.0625rem] leading-relaxed text-papel max-w-[56ch]">{video.excerpt}</span>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

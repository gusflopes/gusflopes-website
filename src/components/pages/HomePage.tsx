import { Hero } from '../Hero';
import { Themes } from '../Themes';
import { Services } from '../Services';
import { Eixos, type EixoResumo, type FeaturedVideo } from '../Eixos';
import { Ferramenta } from '../Ferramenta';
import { FundoPicture } from '../FundoPicture';
import type { FundoResponsivo } from '../../lib/imagens';

interface HomePageProps {
  video?: FeaturedVideo;
  eixos?: EixoResumo[];
  fundo: FundoResponsivo;
}

/**
 * Cada camada é uma página de revista com uma ideia própria, no mesmo mundo azul-noite:
 * primeira página (eixos + vídeo), encarte (ferramenta), recorte do quadro, ensaio (sobre) e a
 * página do pedido (serviços + rodapé). Três campos: noite → papel → noite funda.
 */
export function HomePage({ video, eixos = [], fundo }: HomePageProps) {
  return (
    <main>
      <Hero fundo={fundo} />
      <Eixos eixos={eixos} video={video} />
      <Ferramenta />
      {/* Recorte do quadro: mesma imagem do hero (lazy: não disputa banda com o hero), nunca atrás de texto */}
      <div aria-hidden="true" className="relative h-28 md:h-44 overflow-hidden bg-noite">
        <FundoPicture fundo={fundo} className="object-[50%_90%]" />
      </div>
      <Themes />
      <Services />
    </main>
  );
}

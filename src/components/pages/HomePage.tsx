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
 * Cada camada é uma página de revista com uma ideia própria. Campos (rodada 4, cor como sistema):
 * noite (hero) → recorte do quadro → papel (eixos, o encarte escuro da ferramenta, sobre) →
 * creme (serviços) → segundo recorte do quadro → rodapé escuro. O escuro nunca empilha.
 */
export function HomePage({ video, eixos = [], fundo }: HomePageProps) {
  return (
    <main>
      <Hero fundo={fundo} />
      {/* Recorte do quadro: a passagem da noite para o papel (mesma imagem do hero, lazy), nunca atrás de texto */}
      <div aria-hidden="true" className="relative h-28 md:h-44 overflow-hidden bg-noite">
        <FundoPicture fundo={fundo} className="object-[50%_90%]" />
      </div>
      <Eixos eixos={eixos} video={video} />
      <Ferramenta />
      <Themes />
      <Services />
      {/* Segundo recorte: as luzes da cidade fazem a passagem do campo creme para o rodapé */}
      <div aria-hidden="true" className="relative h-20 md:h-32 overflow-hidden bg-noite">
        <FundoPicture fundo={fundo} className="object-[50%_62%]" />
      </div>
    </main>
  );
}

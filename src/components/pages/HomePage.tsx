import { Hero } from '../Hero';
import { Themes } from '../Themes';
import { Services } from '../Services';
import { VideoDestaque, type FeaturedVideo } from '../VideoDestaque';
import { Eixos, type EixoResumo } from '../Eixos';
import { Ferramenta } from '../Ferramenta';
import type { FundoResponsivo } from '../../lib/imagens';

interface HomePageProps {
  video?: FeaturedVideo;
  eixos?: EixoResumo[];
  fundo: FundoResponsivo;
}

/**
 * Ordem: tese → portas e o que saiu em cada uma (eixos) → experimentar agora (ferramenta) →
 * vídeo (a camada de volume baixo) → quem escreve (temas) → o que contratar (serviços).
 * Campos: azul até a ferramenta, papel do vídeo aos serviços, azul no rodapé — duas trocas.
 * "Ideias recentes" foi fundida nos eixos. Detalhes no surface brief.
 */
export function HomePage({ video, eixos = [], fundo }: HomePageProps) {
  return (
    <main>
      <Hero fundo={fundo} />
      <Eixos eixos={eixos} />
      <Ferramenta />
      {video && <VideoDestaque video={video} />}
      <Themes />
      <Services />
    </main>
  );
}

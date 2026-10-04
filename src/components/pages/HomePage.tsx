import { Hero } from '../Hero';
import { Themes } from '../Themes';
import { Services } from '../Services';
import { LatestContent, type FeaturedVideo } from '../LatestContent';
import { Eixos, type EixoResumo } from '../Eixos';
import { Ferramenta } from '../Ferramenta';
import type { FundoResponsivo } from '../../lib/imagens';

interface HomePageProps {
  video?: FeaturedVideo;
  eixos?: EixoResumo[];
  /** O quadro original da marca (seção "sobre"). */
  fundo: FundoResponsivo;
}

export function HomePage({ video, eixos = [], fundo }: HomePageProps) {
  return (
    <main>
      <Hero />
      {/* noite: horizonte → três estratos/portas → projeção → close → o quadro; papel: o que contratar */}
      <Eixos eixos={eixos} />
      <LatestContent video={video} />
      <Ferramenta />
      <Themes fundo={fundo} />
      <Services />
    </main>
  );
}

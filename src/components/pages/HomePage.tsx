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
      {/* ritmo (rodada 5): noite (abertura) → papel (portas) → creme (projeção) → o quadro → creme (sobre)
          → noite (close da ferramenta) → papel (o que contratar) → fita → noite. Nenhum trecho escuro
          longo: o vídeo saiu da noite e o quadro deixou de encostar no close. */}
      <Eixos eixos={eixos} />
      <LatestContent video={video} />
      <Themes fundo={fundo} />
      <Ferramenta />
      <Services />
    </main>
  );
}

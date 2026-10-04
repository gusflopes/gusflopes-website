import { Hero } from '../Hero';
import { Themes } from '../Themes';
import { Services } from '../Services';
import { LatestContent, type LatestArticle, type FeaturedVideo } from '../LatestContent';
import { Eixos, type EixoResumo } from '../Eixos';
import { Ferramenta } from '../Ferramenta';
import type { FundoResponsivo } from '../../lib/imagens';

interface HomePageProps {
  articles: LatestArticle[];
  video?: FeaturedVideo;
  eixos?: EixoResumo[];
  /** O quadro original da marca (seção "sobre"). */
  fundo: FundoResponsivo;
}

export function HomePage({ articles, video, eixos = [], fundo }: HomePageProps) {
  return (
    <main>
      <Hero />
      <Eixos eixos={eixos} />
      <Ferramenta />
      <Themes fundo={fundo} />
      <Services />
      <LatestContent articles={articles} video={video} />
    </main>
  );
}

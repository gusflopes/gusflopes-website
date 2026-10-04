import { Hero } from '../Hero';
import { Themes } from '../Themes';
import { Services } from '../Services';
import { LatestContent, type LatestArticle, type FeaturedVideo } from '../LatestContent';
import { Eixos, type EixoResumo } from '../Eixos';
import { Ferramenta } from '../Ferramenta';
import type { FundoResponsivo } from '../../lib/imagens';
import type { TrechoLinha } from '../../lib/linhas';

interface HomePageProps {
  articles: LatestArticle[];
  video?: FeaturedVideo;
  eixos?: EixoResumo[];
  trechos?: TrechoLinha[];
  fundo: FundoResponsivo;
}

export function HomePage({ articles, video, eixos = [], trechos = [], fundo }: HomePageProps) {
  return (
    <main>
      <Hero fundo={fundo} trechos={trechos} />
      <Eixos eixos={eixos} />
      <Ferramenta />
      <Themes />
      <Services />
      <LatestContent articles={articles} video={video} />
    </main>
  );
}

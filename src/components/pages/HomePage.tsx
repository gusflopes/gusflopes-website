import { Hero } from '../Hero';
import { Themes } from '../Themes';
import { Services } from '../Services';
import { LatestContent, type LatestArticle, type FeaturedVideo } from '../LatestContent';
import { Eixos, type EixoResumo } from '../Eixos';

interface HomePageProps {
  articles: LatestArticle[];
  video?: FeaturedVideo;
  eixos?: EixoResumo[];
}

export function HomePage({ articles, video, eixos = [] }: HomePageProps) {
  return (
    <main>
      <Hero />
      <Eixos eixos={eixos} />
      <Themes />
      <Services />
      <LatestContent articles={articles} video={video} />
    </main>
  );
}

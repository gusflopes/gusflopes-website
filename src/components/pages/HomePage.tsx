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
  fundo: FundoResponsivo;
}

/**
 * Ordem: tese → portas (eixos) → experimentar agora (ferramenta) → o que saiu (ideias e
 * vídeo) → quem escreve (temas) → o que contratar (serviços). Campos: azul até a ferramenta,
 * papel das ideias aos serviços, azul no rodapé — duas trocas. Detalhes no surface brief.
 */
export function HomePage({ articles, video, eixos = [], fundo }: HomePageProps) {
  return (
    <main>
      <Hero fundo={fundo} />
      <Eixos eixos={eixos} />
      <Ferramenta />
      <LatestContent articles={articles} video={video} />
      <Themes />
      <Services />
    </main>
  );
}

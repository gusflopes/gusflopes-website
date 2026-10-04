import { Hero } from '../Hero';
import { Themes } from '../Themes';
import { Services } from '../Services';
import { LatestContent, type LatestArticle, type FeaturedVideo } from '../LatestContent';
import { Eixos, type EixoResumo } from '../Eixos';
import { Ferramenta } from '../Ferramenta';
import { FundoPicture } from '../FundoPicture';
import type { FundoResponsivo } from '../../lib/imagens';

interface HomePageProps {
  articles: LatestArticle[];
  video?: FeaturedVideo;
  eixos?: EixoResumo[];
  fundo: FundoResponsivo;
}

/**
 * Três campos, não listras: a noite (hero, eixos, ferramenta), o papel (quem escreve e o que
 * tem pensado) e a noite funda (o que contratar, rodapé). A passagem da noite para o papel é
 * um recorte do quadro — os reflexos na água —, a única vez que a pintura volta.
 */
export function HomePage({ articles, video, eixos = [], fundo }: HomePageProps) {
  return (
    <main>
      <Hero fundo={fundo} />
      <Eixos eixos={eixos} />
      <Ferramenta />
      {/* Recorte do quadro: mesma imagem do hero (lazy: não disputa banda com o hero), nunca atrás de texto */}
      <div aria-hidden="true" className="relative h-28 md:h-44 overflow-hidden bg-noite">
        <FundoPicture fundo={fundo} className="object-[50%_90%]" />
      </div>
      <Themes />
      <LatestContent articles={articles} video={video} />
      <Services />
    </main>
  );
}

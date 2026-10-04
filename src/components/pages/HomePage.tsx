import { Hero } from '../Hero';
import { Themes } from '../Themes';
import { Services } from '../Services';
import { Eixos, type EixoResumo, type FeaturedVideo } from '../Eixos';
import { Ferramenta } from '../Ferramenta';
import { RecorteQuadro } from '../RecorteQuadro';
import type { FundoResponsivo } from '../../lib/imagens';

interface HomePageProps {
  video?: FeaturedVideo;
  eixos?: EixoResumo[];
  fundo: FundoResponsivo;
}

/**
 * Cada camada é uma página de revista com uma ideia própria. Campos (rodada 4, cor como sistema):
 * noite (hero) → costura laranja reta → recorte do quadro → papel (eixos, o encarte escuro da
 * ferramenta, sobre) → creme (serviços) → recorte de fecho (no layout, comum a toda página) →
 * rodapé escuro. O escuro nunca empilha.
 */
export function HomePage({ video, eixos = [], fundo }: HomePageProps) {
  return (
    <main>
      <Hero fundo={fundo} />
      {/* Recorte do quadro: a passagem da noite para o papel (mesma imagem do hero), costurado reto ao hero */}
      <RecorteQuadro fundo={fundo} costura />
      <Eixos eixos={eixos} video={video} />
      <Ferramenta />
      <Themes />
      <Services />
    </main>
  );
}

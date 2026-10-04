import { ArrowRight } from 'lucide-react';
import { projetos, comUtm } from '../config/site';
import { Abertura } from './Abertura';

/**
 * Faixa da home com a ferramenta da Reforma Tributária (diagnóstico + simulação no motor
 * oficial). É a demonstração pública de IA com ferramenta e contexto: grátis, sem promessa.
 * O nome entra como abertura tipográfica (forma "degraus", a do eixo Bastidores).
 */
export function Ferramenta() {
  const reforma = projetos.reforma;
  return (
    <section aria-labelledby="ferramenta-title" className="campo-azul py-20 md:py-28">
      <div className="moldura grid gap-12 lg:grid-cols-12 lg:gap-x-[var(--gutter)] items-start">
        <div className="lg:col-span-7">
          <Abertura id="ferramenta-title" as="h2" titulo={reforma.nome} eixo="bastidores" teto={6} />
        </div>
        <div className="lg:col-span-5 border-t-2 border-papel pt-5">
          <p className="rotulo text-laranja mb-5">Ferramenta gratuita · Experimento aberto</p>
          <p className="font-serif text-[1.1875rem] leading-relaxed text-papel mb-4">
            Como a reforma do IBS e da CBS afeta a sua empresa? Responda perguntas rápidas e veja para
            que lado o seu caso tende. Depois, simule com números do motor oficial da Receita, dentro
            da IA que você já usa.
          </p>
          <p className="font-sans [font-stretch:87%] text-[0.9375rem] leading-relaxed text-ceu-claro mb-8">
            A IA conversa, a calculadora oficial calcula. Conteúdo informativo: alíquotas de 2027 em
            diante são premissa, e a decisão é sua com o seu contador.
          </p>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-5">
            <a href={comUtm(reforma.url, reforma.campanha, 'home-ferramenta')} className="botao">
              Fazer o diagnóstico <ArrowRight size={18} strokeWidth={2.5} aria-hidden="true" />
            </a>
            <a href={reforma.artigo} className="acao">
              Como funciona por dentro
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

import { ArrowRight } from 'lucide-react';
import { projetos, comUtm } from '../config/site';
import { Abertura } from './Abertura';

/**
 * Trabalho da seção: experimentar algo agora (a ferramenta da Reforma Tributária).
 * Composição: grade de filetes azul-3 sobre o campo azul. O nome é abertura em "degraus"
 * (forma do eixo Bastidores), com a linha do meio vazada — o único contorno da home além do
 * MESMO da tese —, e os metadados numa célula ao lado; embaixo, a própria ação é
 * uma célula laranja inteira, seguida do texto e da nota de cautela.
 */
export function Ferramenta() {
  const reforma = projetos.reforma;
  return (
    <section aria-labelledby="ferramenta-title" className="campo-azul pt-20 md:pt-28 pb-16 md:pb-24">
      <div className="moldura">
        <div className="grid lg:grid-cols-12 gap-[2px] bg-azul-3 border-y-2 border-azul-3">
          <div className="bg-azul lg:col-span-9 pt-6 pb-8 lg:pr-10">
            <Abertura id="ferramenta-title" as="h2" titulo={reforma.nome} eixo="bastidores" teto={7.5} vazado />
          </div>
          <p className="bg-azul lg:col-span-3 rotulo text-laranja pb-6 lg:pt-7 lg:pl-6">Ferramenta gratuita · Experimento aberto</p>

          <a
            href={comUtm(reforma.url, reforma.campanha, 'home-ferramenta')}
            className="celula-acao campo-laranja lg:col-span-3 p-6 min-h-[9rem] lg:min-h-[13rem] group"
          >
            <span className="font-sans font-[800] [font-stretch:72%] text-[2.25rem] md:text-[2.75rem] leading-[0.95] tracking-[-0.015em]">
              Fazer o diagnóstico
            </span>
            <ArrowRight size={36} strokeWidth={2.25} aria-hidden="true" className="self-end transition-transform duration-200 group-hover:translate-x-1" />
          </a>
          <div className="bg-azul lg:col-span-6 py-6 lg:px-8">
            <p className="font-serif text-[1.1875rem] leading-relaxed text-papel max-w-[52ch]">
              Como a reforma do IBS e da CBS afeta a sua empresa? Responda perguntas rápidas e veja para
              que lado o seu caso tende. Depois, simule com números do motor oficial da Receita, dentro
              da IA que você já usa.
            </p>
          </div>
          <div className="bg-azul lg:col-span-3 pt-2 pb-6 lg:py-6 lg:pl-6 flex flex-col justify-between gap-6">
            <p className="font-sans [font-stretch:87%] text-[0.9375rem] leading-relaxed text-ceu-claro">
              A IA conversa, a calculadora oficial calcula. Conteúdo informativo: alíquotas de 2027 em
              diante são premissa, e a decisão é sua com o seu contador.
            </p>
            <a href={reforma.artigo} className="acao self-start">
              Como funciona por dentro
              <ArrowRight size={16} strokeWidth={2.5} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

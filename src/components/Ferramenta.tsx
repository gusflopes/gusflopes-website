import { ArrowRight } from 'lucide-react';
import { projetos, comUtm } from '../config/site';
import { Abertura } from './Abertura';

/**
 * Trabalho da seção: experimentar algo agora (a ferramenta da Reforma Tributária).
 * Composição: grade de filetes azul-3 sobre o campo azul. O nome é abertura em "degraus"
 * (forma do eixo Bastidores), com a linha do meio vazada — o único contorno da home além do
 * MESMO da tese. Ao lado, uma célula de ardósia clara (cor fria do quadro) leva os metadados, a
 * nota de cautela e o link "Como funciona por dentro"; embaixo, a ação é uma célula laranja inteira e o texto vai num campo de
 * ferrugem (cor quente do quadro) que encosta na ardósia: as duas cores do quadro carregam
 * conteúdo. No celular a ardósia vai para o fim, para os metadados não virarem sobretítulo.
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
          {/* Ardósia clara (fria): metadados, nota de cautela e o link para o bastidor. Azul-escuro sobre ela, 5,6:1. */}
          <div className="bg-ardosia-clara text-azul lg:col-span-3 max-lg:order-last p-5 lg:p-6 flex flex-col gap-4">
            <p className="rotulo">Ferramenta gratuita · Experimento aberto</p>
            <p className="font-sans [font-stretch:87%] text-[0.9375rem] leading-relaxed">
              A IA conversa, a calculadora oficial calcula. Conteúdo informativo: alíquotas de 2027 em
              diante são premissa, e a decisão é sua com o seu contador.
            </p>
            <a href={reforma.artigo} className="acao !text-azul self-start decoration-azul mt-auto pt-2">
              Como funciona por dentro
              <ArrowRight size={16} strokeWidth={2.5} aria-hidden="true" />
            </a>
          </div>

          <a
            href={comUtm(reforma.url, reforma.campanha, 'home-ferramenta')}
            className="celula-acao campo-laranja max-lg:!flex-row max-lg:items-center lg:col-span-3 px-6 py-5 lg:p-6 lg:min-h-[13rem] group"
          >
            <span className="font-sans font-[800] [font-stretch:72%] text-[2.25rem] md:text-[2.75rem] leading-[0.95] tracking-[-0.015em]">
              Fazer o diagnóstico
            </span>
            <ArrowRight size={36} strokeWidth={2.25} aria-hidden="true" className="self-end transition-transform duration-200 group-hover:translate-x-1" />
          </a>
          {/* Ferrugem (quente), encostada na ardósia: o texto. Papel sobre ela, 6,4:1. */}
          <div className="bg-ferrugem text-papel lg:col-span-9 p-6 lg:p-8 flex flex-col justify-center">
            <p className="font-serif text-[1.1875rem] leading-relaxed max-w-[52ch]">
              Como a reforma do IBS e da CBS afeta a sua empresa? Responda perguntas rápidas e veja para
              que lado o seu caso tende. Depois, simule com números do motor oficial da Receita, dentro
              da IA que você já usa.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

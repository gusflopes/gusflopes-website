import { ArrowRight } from 'lucide-react';
import { projetos, comUtm } from '../config/site';

/**
 * Faixa da home com a ferramenta da Reforma Tributária (diagnóstico + simulação no motor
 * oficial). É a demonstração pública de IA com ferramenta e contexto: grátis, sem promessa.
 * Em papel frio, a única faixa clara do meio da home: a prova real pede outra luz.
 */
export function Ferramenta() {
  const reforma = projetos.reforma;
  return (
    <section aria-labelledby="ferramenta-title" className="claro bg-papel text-tinta py-20 md:py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] lg:gap-20 lg:items-end">
        <div>
          <h2 id="ferramenta-title" className="font-serif text-[2.125rem] md:text-5xl leading-[1.08] tracking-[-0.012em] text-tinta">
            {reforma.nome}
          </h2>
          <p className="mt-4 font-sans text-[0.9375rem] font-semibold text-laranja-fundo">Ferramenta gratuita · Experimento aberto</p>
          <p className="mt-8 font-serif text-xl md:text-[1.375rem] leading-[1.55] text-tinta-2 max-w-[40rem]">
            Como a reforma do IBS e da CBS afeta a sua empresa? Responda perguntas rápidas e veja para
            que lado o seu caso tende. Depois, simule com números do motor oficial da Receita, dentro
            da IA que você já usa.
          </p>
        </div>
        <div className="lg:pb-2">
          <p className="font-sans text-[0.9375rem] leading-relaxed text-tinta-3 mb-8 pt-6 border-t border-papel-fio">
            A IA conversa, a calculadora oficial calcula. Conteúdo informativo: alíquotas de 2027 em
            diante são premissa, e a decisão é sua com o seu contador.
          </p>
          <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-5 sm:items-center lg:items-start xl:items-center">
            <a href={comUtm(reforma.url, reforma.campanha, 'home-ferramenta')} className="botao">
              Fazer o diagnóstico <ArrowRight size={18} strokeWidth={2.25} aria-hidden="true" />
            </a>
            <a href={reforma.artigo} className="acao text-laranja-fundo decoration-laranja-fundo/40 hover:decoration-laranja-fundo">
              Como funciona por dentro
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

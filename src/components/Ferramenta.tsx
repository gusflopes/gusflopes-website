import { ArrowRight } from 'lucide-react';
import { projetos, comUtm } from '../config/site';

/**
 * Faixa da home com a ferramenta da Reforma Tributária (diagnóstico + simulação no motor
 * oficial). É a demonstração pública de IA com ferramenta e contexto: grátis, sem promessa.
 */
export function Ferramenta() {
  const reforma = projetos.reforma;
  return (
    <section aria-labelledby="ferramenta-title" className="bg-noite-2 px-4 md:px-6 py-16 md:py-20 fio">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        <div className="lg:col-span-7">
          <h2 id="ferramenta-title" className="font-serif text-3xl md:text-[2.6rem] leading-tight text-white mb-3">
            {reforma.nome}
          </h2>
          <p className="rotulo text-laranja-claro mb-6">Ferramenta gratuita · Experimento aberto</p>
          <p className="font-sans text-lg text-white/90 leading-relaxed mb-4 max-w-[60ch]">
            Como a reforma do IBS e da CBS afeta a sua empresa? Responda perguntas rápidas e veja para
            que lado o seu caso tende. Depois, simule com números do motor oficial da Receita, dentro
            da IA que você já usa.
          </p>
          <p className="font-sans text-sm text-nevoa leading-relaxed max-w-[60ch]">
            A IA conversa, a calculadora oficial calcula. Conteúdo informativo: alíquotas de 2027 em
            diante são premissa, e a decisão é sua com o seu contador.
          </p>
        </div>
        <div className="lg:col-span-5 flex flex-col items-start gap-5 lg:pt-3">
          <a href={comUtm(reforma.url, reforma.campanha, 'home-ferramenta')} className="botao min-h-14 px-8 text-lg">
            Fazer o diagnóstico <ArrowRight size={18} aria-hidden="true" />
          </a>
          <a href={reforma.artigo} className="acao text-laranja-claro">
            Como funciona por dentro <ArrowRight size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}

import { ArrowRight } from 'lucide-react';
import { projetos, comUtm } from '../config/site';

/**
 * Faixa da home com a ferramenta da Reforma Tributária (diagnóstico + simulação no motor
 * oficial). É a demonstração pública de IA com ferramenta e contexto: grátis, sem promessa.
 */
export function Ferramenta() {
  const reforma = projetos.reforma;
  return (
    <section aria-labelledby="ferramenta-title" className="bg-slate-900 py-20 px-6 border-t border-slate-800">
      <div className="max-w-5xl mx-auto grid md:grid-cols-[1fr_auto] gap-10 items-center">
        <div>
          <p className="font-mono text-xs uppercase tracking-wider text-orange-400 mb-3">
            Ferramenta gratuita · Experimento aberto
          </p>
          <h2 id="ferramenta-title" className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
            {reforma.nome}
          </h2>
          <p className="font-sans text-lg text-slate-300 leading-relaxed mb-4">
            Como a reforma do IBS e da CBS afeta a sua empresa? Responda perguntas rápidas e veja para
            que lado o seu caso tende. Depois, simule com números do motor oficial da Receita, dentro
            da IA que você já usa.
          </p>
          <p className="font-sans text-sm text-slate-400 leading-relaxed">
            A IA conversa, a calculadora oficial calcula. Conteúdo informativo: alíquotas de 2027 em
            diante são premissa, e a decisão é sua com o seu contador.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <a
            href={comUtm(reforma.url, reforma.campanha, 'home-ferramenta')}
            className="inline-flex items-center justify-center gap-2 font-sans bg-orange-500 hover:bg-orange-600 text-[#1c0a02] font-bold px-8 h-14 rounded-lg text-lg transition-colors"
          >
            Fazer o diagnóstico <ArrowRight size={18} />
          </a>
          <a
            href={reforma.artigo}
            className="inline-flex items-center justify-center font-sans text-sm font-bold uppercase tracking-wide text-orange-400 hover:text-orange-300 transition-colors"
          >
            Como funciona por dentro
          </a>
        </div>
      </div>
    </section>
  );
}

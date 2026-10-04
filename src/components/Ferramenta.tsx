import { ArrowRight } from 'lucide-react';
import { projetos, comUtm } from '../config/site';
import { COR_LINHA } from '../lib/linhas';

/**
 * Faixa da home com a ferramenta da Reforma Tributária (diagnóstico + simulação no motor
 * oficial). É a demonstração pública de IA com ferramenta e contexto: grátis, sem promessa.
 * Na rede, é o destino da linha Bastidores — por isso a faixa leva o âmbar.
 */
export function Ferramenta() {
  const reforma = projetos.reforma;
  return (
    <section aria-labelledby="ferramenta-title" className="bg-noite-2 py-16 md:py-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-10 items-center">
        <div className="md:col-span-8">
          <h2 id="ferramenta-title" className="text-3xl md:text-[2.4rem] leading-[1.1] font-extrabold tracking-[-0.02em] text-white">
            {reforma.nome}
          </h2>
          <p className="mt-4 inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.12em] text-ambar">
            <span className="linha-roundel" aria-hidden="true" style={{ '--linha': COR_LINHA.bastidores } as React.CSSProperties} />
            Ferramenta gratuita · Experimento aberto
          </p>
          <p className="mt-6 font-serif text-lg md:text-[1.2rem] text-luz leading-relaxed max-w-[62ch]">
            Como a reforma do IBS e da CBS afeta a sua empresa? Responda perguntas rápidas e veja para
            que lado o seu caso tende. Depois, simule com números do motor oficial da Receita, dentro
            da IA que você já usa.
          </p>
          <p className="mt-4 text-sm text-nevoa leading-relaxed max-w-[62ch]">
            A IA conversa, a calculadora oficial calcula. Conteúdo informativo: alíquotas de 2027 em
            diante são premissa, e a decisão é sua com o seu contador.
          </p>
        </div>
        <div className="md:col-span-4 flex flex-col gap-4 md:items-stretch">
          <a
            href={comUtm(reforma.url, reforma.campanha, 'home-ferramenta')}
            className="inline-flex items-center justify-center gap-2 bg-laranja hover:bg-laranja-claro text-brasa font-bold px-7 min-h-[3.25rem] rounded-md text-[1.05rem] transition-colors"
          >
            Fazer o diagnóstico <ArrowRight size={18} aria-hidden="true" />
          </a>
          <a
            href={reforma.artigo}
            className="inline-flex items-center justify-center min-h-11 text-sm font-bold uppercase tracking-[0.06em] text-laranja-claro hover:text-white transition-colors"
          >
            Como funciona por dentro
          </a>
        </div>
      </div>
    </section>
  );
}

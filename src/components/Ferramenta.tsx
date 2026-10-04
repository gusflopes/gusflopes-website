import { ArrowRight } from 'lucide-react';
import { projetos, comUtm } from '../config/site';
import { telaFerramenta } from '../lib/telas';
import { TelaPicture } from './TelaPicture';

/**
 * "Experimentar algo agora": o pintor chegando perto. Meia seção é o close de traço (2,5×, o único
 * do site), sangrando até a borda esquerda e de cima a baixo; a outra metade é a ferramenta e a
 * ação. O fio laranja é a costura vertical entre os dois. No celular, o close vira faixa no topo.
 * É a demonstração pública de IA com ferramenta e contexto: grátis, sem promessa.
 */
export function Ferramenta() {
  const reforma = projetos.reforma;
  return (
    <section aria-labelledby="ferramenta-title" className="bg-noite border-t border-linha grid lg:grid-cols-2">
      <figure className="relative h-[220px] md:h-[300px] lg:h-auto lg:min-h-[560px] overflow-hidden border-b-[3px] lg:border-b-0 lg:border-r-[3px] border-laranja" aria-hidden="true">
        <div className="absolute inset-0">
          <TelaPicture tela={telaFerramenta()} sizes="(min-width: 1024px) 50vw, 100vw" />
        </div>
      </figure>

      <div className="px-4 md:px-10 lg:px-14 xl:px-20 py-14 md:py-20 lg:py-24 max-w-[44rem] flex flex-col justify-center">
        <div>
          <h2 id="ferramenta-title" className="font-serif text-3xl md:text-[2.4rem] leading-[1.1] text-white mb-3">
            {reforma.nome}
          </h2>
          <p className="font-sans text-sm font-semibold text-bruma mb-6">Ferramenta gratuita · Experimento aberto</p>
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

        <div className="mt-10 pt-8 border-t border-linha flex flex-wrap items-center gap-x-8 gap-y-5">
          <a href={comUtm(reforma.url, reforma.campanha, 'home-ferramenta')} className="botao min-h-14 px-7 text-lg whitespace-nowrap">
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

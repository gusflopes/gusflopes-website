import { ArrowRight } from 'lucide-react';
import { projetos, comUtm } from '../config/site';
import { telaFerramenta } from '../lib/telas';
import { TelaPicture } from './TelaPicture';

/**
 * "Experimentar algo agora": uma faixa em três tempos — o close de uma luz pintada (o único
 * traço visto de perto na home), o texto da ferramenta e a ação, sozinha na sua coluna.
 * É a demonstração pública de IA com ferramenta e contexto: grátis, sem promessa.
 */
export function Ferramenta() {
  const reforma = projetos.reforma;
  return (
    <section aria-labelledby="ferramenta-title" className="bg-noite px-4 md:px-6 py-16 md:py-24 border-t border-linha">
      <div className="max-w-7xl mx-auto grid gap-8 md:grid-cols-12 md:gap-10 lg:gap-12 items-center">
        <figure className="md:col-span-5 lg:col-span-4" aria-hidden="true">
          <div className="aspect-[28/15] overflow-hidden">
            <TelaPicture tela={telaFerramenta()} sizes="(min-width: 1024px) 30vw, (min-width: 768px) 40vw, 100vw" />
          </div>
          <span className="fio block" />
        </figure>

        <div className="md:col-span-7 lg:col-span-5">
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

        <div className="md:col-span-12 lg:col-span-3 flex flex-col items-start gap-5 lg:border-l lg:border-linha lg:pl-8 lg:self-stretch lg:justify-center">
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

import { ArrowRight } from 'lucide-react';
import { projetos, comUtm } from '../config/site';

/**
 * Ferramenta da Reforma Tributária: o trabalho desta seção é "experimentar algo agora".
 * A pergunta do empresário abre a seção em itálico grande (é ela que faz alguém clicar); o
 * nome da ferramenta fica à esquerda como ficha, com a linha de contexto logo abaixo. Mesmo
 * campo azul dos eixos, separado por um fio céu: é a prova prática do que os eixos prometem.
 */
export function Ferramenta() {
  const reforma = projetos.reforma;
  return (
    <section aria-labelledby="ferramenta-title" className="bg-noite px-4 sm:px-6 pb-20 md:pb-28">
      <div className="max-w-7xl mx-auto border-t border-ceu/45 pt-10 md:pt-14 grid gap-8 lg:grid-cols-12 lg:gap-x-10">
        <div className="lg:col-span-4">
          <h2 id="ferramenta-title" className="font-serif text-[1.625rem] md:text-[1.875rem] leading-[1.12] tracking-[-0.01em] text-white max-w-[16ch]">
            {reforma.nome}
          </h2>
          <p className="meta mt-3">
            <span>Ferramenta gratuita</span>
            <span>Experimento aberto</span>
          </p>
        </div>

        <div className="lg:col-span-8">
          <p className="font-serif italic font-normal text-white text-[1.875rem] leading-[1.14] md:text-[2.75rem] md:leading-[1.08] tracking-[-0.015em] [text-wrap:balance] max-w-[22ch]">
            Como a reforma do IBS e da CBS afeta a sua empresa?
          </p>
          <div className="mt-8 md:mt-10 grid gap-8 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] md:gap-10">
            <p className="font-serif text-lg md:text-[1.1875rem] leading-[1.6] text-nevoa">
              Responda perguntas rápidas e veja para que lado o seu caso tende. Depois, simule com
              números do motor oficial da Receita, dentro da IA que você já usa.
            </p>
            <div>
              <p className="font-sans text-[0.875rem] leading-relaxed text-nevoa-2 mb-6">
                A IA conversa, a calculadora oficial calcula. Conteúdo informativo: alíquotas de 2027 em
                diante são premissa, e a decisão é sua com o seu contador.
              </p>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
                <a href={comUtm(reforma.url, reforma.campanha, 'home-ferramenta')} className="botao">
                  Fazer o diagnóstico <ArrowRight size={18} strokeWidth={2.25} aria-hidden="true" />
                </a>
                <a href={reforma.artigo} className="acao text-laranja">
                  Como funciona por dentro
                  <ArrowRight size={16} aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { ArrowRight } from 'lucide-react';
import { projetos, comUtm } from '../config/site';

/**
 * Ferramenta da Reforma Tributária: "experimentar algo agora". É o ENCARTE da revista: a única
 * caixa da home e o ÚNICO bloco escuro abaixo do hero: azul-noite impresso sobre o papel, com o
 * fio laranja grosso no alto, como um box de serviço. O nome da ferramenta é o título (o maior elemento da camada); a pergunta do
 * empresário vem logo ao lado em itálico, e a ação fica no pé, à mão.
 */
export function Ferramenta() {
  const reforma = projetos.reforma;
  return (
    <section aria-labelledby="ferramenta-title" className="claro bg-papel px-4 sm:px-6 pb-4 md:pb-6">
      <div className="max-w-7xl mx-auto bg-noite rounded-b-[4px] border-t-[3px] border-laranja px-5 pt-9 pb-10 sm:px-8 md:px-12 md:pt-12 md:pb-12 lg:px-14 grid gap-8 lg:grid-cols-12 lg:gap-x-12">
        <div className="lg:col-span-5">
          <h2 id="ferramenta-title" className="h-secao text-white max-w-[13ch]">
            {reforma.nome}
          </h2>
          <p className="meta mt-4">
            <span>Ferramenta gratuita</span>
            <span>Experimento aberto</span>
          </p>
        </div>

        <div className="lg:col-span-7 lg:row-span-2 lg:pt-2">
          <p className="font-serif italic font-normal text-white text-[1.5rem] leading-[1.18] md:text-[2rem] md:leading-[1.14] tracking-[-0.012em] [text-wrap:balance] max-w-[24ch]">
            Como a reforma do IBS e da CBS afeta a sua empresa?
          </p>
          <p className="mt-5 font-serif text-[1.0625rem] md:text-[1.125rem] leading-[1.6] text-nevoa max-w-[40rem]">
            Responda perguntas rápidas e veja para que lado o seu caso tende. Depois, simule com
            números do motor oficial da Receita, dentro da IA que você já usa.
          </p>
          <div className="mt-8 pt-7 border-t border-noite-fio-forte">
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

        {/* A letra miúda do encarte: no pé da coluna do título (desktop), depois da ação (celular) */}
        <p className="lg:col-span-5 lg:row-start-2 lg:self-end font-sans text-[0.8125rem] leading-relaxed text-nevoa-2 max-w-[24rem]">
          A IA conversa, a calculadora oficial calcula. Conteúdo informativo: alíquotas de 2027 em
          diante são premissa, e a decisão é sua com o seu contador.
        </p>
      </div>
    </section>
  );
}

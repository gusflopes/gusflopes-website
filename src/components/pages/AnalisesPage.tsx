import { ArrowRight } from 'lucide-react';
import { telaFaixa } from '../../lib/telas';
import { TEMAS, type TemaId } from '../../lib/temas';
import { AberturaHub } from '../AberturaHub';

export interface AnaliseResumo {
  id: string;
  href: string;
  title: string;
  excerpt: string;
  /** "9 a 15 Nov 2026". */
  semanaRotulo: string;
  temas: TemaId[];
  rascunho: boolean;
}

/** Arquivo da Análise da semana: uma linha por semana, a tese e os temas. Sem hidratação. */
export function AnalisesPage({ itens }: { itens: AnaliseResumo[] }) {
  return (
    <main id="conteudo" tabIndex={-1} className="bg-papel min-h-screen">
      <AberturaHub
        tela={telaFaixa('analise')}
        titulo="Análise da semana"
        deck="Toda sexta, os cinco temas da semana em IA para empresas, ligados entre si: o que aconteceu, o que muda e para quem."
      />
      <div className="bg-papel papel">
        <div className="max-w-7xl mx-auto px-4 md:px-6 pt-10 md:pt-14 pb-20 md:pb-28">
          {itens.length === 0 ? (
            <p className="py-16 border-t border-regua font-sans text-tinta-2">Ainda não há análises publicadas.</p>
          ) : (
            <ol className="border-t-2 border-t-laranja">
              {itens.map((a) => (
                <li key={a.id} className="border-b-2 border-laranja">
                  <a href={a.href} className="cartao group grid gap-x-10 gap-y-2 py-7 md:grid-cols-12">
                    <span className="md:col-span-2 md:pt-2 font-sans text-sm font-semibold text-tinta tabular-nums flex md:flex-col items-start gap-2">
                      <span className="marca mt-1.5" aria-hidden="true" />
                      <span>{a.semanaRotulo}</span>
                    </span>
                    <span className="md:col-span-7 min-w-0 flex flex-col gap-2">
                      <span className="font-serif text-[1.35rem] md:text-[1.5rem] leading-snug text-tinta group-hover:text-laranja-fundo transition-colors [overflow-wrap:anywhere]">
                        {a.rascunho && <span className="rotulo text-laranja-fundo mr-2 align-middle">Rascunho</span>}
                        {a.title}
                      </span>
                      <span className="font-sans text-tinta-2 leading-relaxed line-clamp-2 max-w-[68ch]">{a.excerpt}</span>
                    </span>
                    <span className="md:col-span-3 md:pt-2 flex flex-col gap-1 md:items-end md:text-right font-sans text-sm">
                      <span className="font-bold text-petroleo">{a.temas.map((t) => TEMAS[t]).filter((v, i, l) => l.indexOf(v) === i).slice(0, 3).join(' · ')}</span>
                      <span className="acao text-laranja-fundo text-sm mt-2">
                        Ler a análise <ArrowRight size={14} aria-hidden="true" />
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>
    </main>
  );
}

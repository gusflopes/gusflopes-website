import { ArrowLeft, ArrowRight } from 'lucide-react';
import { telaFaixa } from '../../lib/telas';
import { TEMAS } from '../../lib/temas';
import type { SemanaNoticias } from '../../lib/noticias';
import { AberturaHub } from '../AberturaHub';

export interface NoticiasPageProps {
  /** Semanas exibidas nesta página (o índice mostra as mais recentes; a página da semana, uma). */
  semanas: SemanaNoticias[];
  /** Semanas anteriores (só no índice): uma linha por semana, com o total. */
  arquivo?: { rotulo: string; href: string; total: number }[];
  /** Página de uma semana: navegação para a semana anterior e a seguinte. */
  vizinhas?: { anterior?: { rotulo: string; href: string }; seguinte?: { rotulo: string; href: string } };
}

/**
 * Notícias: volume diário, por isso a lista é compacta e agrupada por semana — data na margem,
 * título, fonte e tema numa linha só. Sem tela por notícia (a pintura fica na faixa do hub).
 * Renderizada sem hidratação: nada aqui precisa de JS no cliente.
 */
export function NoticiasPage({ semanas, arquivo = [], vizinhas }: NoticiasPageProps) {
  const umaSemana = !!vizinhas;
  return (
    <main id="conteudo" tabIndex={-1} className="bg-papel min-h-screen">
      <AberturaHub
        tela={telaFaixa('noticias')}
        titulo={umaSemana && semanas[0] ? `Notícias · ${semanas[0].rotulo}` : 'Notícias'}
        deck="O que mudou em IA para empresas, todos os dias: apurado na fonte, reescrito em português e com o porquê de importar."
      />

      <div className="bg-papel papel">
        <div className="max-w-7xl mx-auto px-4 md:px-6 pt-10 md:pt-14 pb-20 md:pb-28">
          {umaSemana && (
            <p className="mb-10">
              <a href="/noticias/" className="acao text-laranja-fundo text-sm">
                <ArrowLeft size={14} aria-hidden="true" /> Todas as notícias
              </a>
            </p>
          )}

          {semanas.length === 0 && (
            <p className="py-16 border-t border-regua font-sans text-tinta-2">Ainda não há notícias publicadas.</p>
          )}

          {semanas.map((s) => (
            <section key={s.semana} aria-labelledby={`semana-${s.semana}`} className="mb-16 md:mb-20">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-6">
                <h2 id={`semana-${s.semana}`} className="capitulo font-serif text-2xl md:text-[2rem] leading-tight text-tinta">
                  {umaSemana ? 'Notícias da semana' : <a href={s.href} className="hover:text-laranja-fundo transition-colors">Semana de {s.rotulo}</a>}
                </h2>
                <p className="font-sans text-sm text-tinta-2 flex flex-wrap items-center gap-x-4 gap-y-1">
                  <span className="tabular-nums">{s.itens.length} {s.itens.length === 1 ? 'notícia' : 'notícias'}</span>
                  {s.analise && (
                    <a href={s.analise.href} className="acao text-laranja-fundo">
                      Análise da semana <ArrowRight size={14} aria-hidden="true" />
                    </a>
                  )}
                </p>
              </div>
              <ol className="border-t-2 border-t-laranja">
                {s.itens.map((n) => (
                  <li key={n.slug} className="border-b border-regua">
                    <a href={n.href} className="cartao group grid gap-x-8 gap-y-1 py-4 md:grid-cols-12">
                      <span className="md:col-span-2 font-sans text-sm font-semibold text-tinta tabular-nums flex items-center gap-2 md:pt-1">
                        <span className="marca" aria-hidden="true" />
                        {n.data}
                      </span>
                      <span className="md:col-span-7 min-w-0">
                        <span className="block font-serif text-[1.15rem] md:text-[1.25rem] leading-snug text-tinta group-hover:text-laranja-fundo transition-colors [overflow-wrap:anywhere]">
                          {n.rascunho && <span className="rotulo text-laranja-fundo mr-2 align-middle">Rascunho</span>}
                          {n.title}
                        </span>
                      </span>
                      <span className="md:col-span-3 font-sans text-sm md:text-right md:pt-1">
                        <span className="font-bold text-petroleo">{TEMAS[n.temas[0]]}</span>
                        <span className="text-tinta-2"> · {n.fonte}</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ol>
            </section>
          ))}

          {vizinhas && (vizinhas.anterior || vizinhas.seguinte) && (
            <nav aria-label="Outras semanas" className="flex flex-col sm:flex-row sm:justify-between gap-4 border-t border-regua pt-8">
              {vizinhas.anterior ? (
                <a href={vizinhas.anterior.href} className="acao text-laranja-fundo text-sm">
                  <ArrowLeft size={14} aria-hidden="true" /> Semana de {vizinhas.anterior.rotulo}
                </a>
              ) : <span />}
              {vizinhas.seguinte && (
                <a href={vizinhas.seguinte.href} className="acao text-laranja-fundo text-sm">
                  Semana de {vizinhas.seguinte.rotulo} <ArrowRight size={14} aria-hidden="true" />
                </a>
              )}
            </nav>
          )}

          {arquivo.length > 0 && (
            <section aria-labelledby="semanas-anteriores" className="border-t border-regua pt-10">
              <h2 id="semanas-anteriores" className="capitulo font-serif text-2xl text-tinta mb-6">Semanas anteriores</h2>
              <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10">
                {arquivo.map((a) => (
                  <li key={a.href} className="border-b border-regua">
                    <a href={a.href} className="flex justify-between gap-4 py-3 font-sans text-[0.9375rem] text-tinta hover:text-laranja-fundo transition-colors">
                      <span>Semana de {a.rotulo}</span>
                      <span className="text-tinta-2 tabular-nums">{a.total}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </main>
  );
}

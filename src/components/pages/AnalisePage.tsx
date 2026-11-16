import type { ReactNode } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { TEMAS, type TemaId, type AssinaturaId } from '../../lib/temas';
import { NewsletterCta } from '../NewsletterCta';

export interface AnalisePageProps {
  id: string;
  title: string;
  excerpt: string;
  /** "9 a 15 Nov 2026". */
  semanaRotulo: string;
  dateFormatted: string;
  duration: string;
  emTresLinhas: string[];
  /** Temas na ordem do texto, com as notícias publicadas que cada um cita. */
  temas: { titulo: string; tema: TemaId; noticias: { title: string; href: string }[] }[];
  assinatura: AssinaturaId;
  /** "dd/mm" da revisão, quando `agente-revisado`. */
  revisadoEm?: string;
  /** Link das notícias da semana (quando a semana tem notícia publicada). */
  noticiasDaSemana?: string;
  image?: { src: string; alt: string; credito?: string };
  rascunho: boolean;
  children?: ReactNode;
}

/** Linha de assinatura (playbook §2.5): nunca só "Gustavo Lopes" num texto que ele não escreveu nem leu. */
export function textoAssinatura(assinatura: AssinaturaId, revisadoEm?: string): { autor: string; nota?: string } {
  if (assinatura === 'gustavo') return { autor: 'Gustavo Lopes', nota: 'Pesquisa e rascunho feitos com o meu agente de IA.' };
  if (assinatura === 'agente-revisado') return { autor: 'Agente de IA do Gustavo Lopes', nota: `Revisado por Gustavo em ${revisadoEm}.` };
  return { autor: 'Agente de IA do Gustavo Lopes', nota: 'Não revisado.' };
}

/**
 * Análise da semana: a tese na faixa azul-noite, "a semana em 3 linhas" no campo creme, o texto na
 * coluna de papel e, no fim, as notícias citadas por tema e a assinatura com transparência.
 */
export function AnalisePage(p: AnalisePageProps) {
  const ass = textoAssinatura(p.assinatura, p.revisadoEm);
  const comNoticias = p.temas.filter((t) => t.noticias.length > 0);
  return (
    <main id="conteudo" tabIndex={-1} className="bg-papel min-h-screen">
      <article>
        <header className="bg-noite">
          <div className="max-w-[43rem] mx-auto px-4 md:px-6 pt-8 md:pt-12 pb-10 md:pb-12">
            <a href="/analise/" className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-nevoa hover:text-white transition-colors mb-8">
              <ArrowLeft size={16} aria-hidden="true" />
              Todas as análises
            </a>
            <h1 className="font-serif text-[2rem] leading-[1.1] md:text-[3.1rem] md:leading-[1.06] tracking-[-0.012em] text-white mb-5">{p.title}</h1>
            <p className="font-serif text-lg md:text-xl leading-relaxed text-nevoa mb-6">{p.excerpt}</p>
            <p className="font-sans text-sm text-bruma flex flex-wrap items-center gap-x-2.5 gap-y-1">
              {p.rascunho && <span className="rotulo text-pessego">Rascunho</span>}
              {p.rascunho && <span aria-hidden="true">·</span>}
              <span className="font-bold text-laranja-claro">Análise da semana</span>
              <span aria-hidden="true">·</span>
              <span>{p.semanaRotulo}</span>
              <span aria-hidden="true">·</span>
              <span>{p.duration} leitura</span>
            </p>
            <p className="font-sans text-sm text-bruma mt-2">
              {ass.autor}
              {ass.nota && <> · {ass.nota}</>}
            </p>
          </div>
        </header>

        {p.image ? (
          <figure className="fio bg-noite">
            <div className="max-w-[43rem] mx-auto md:px-6">
              <img src={p.image.src} alt={p.image.alt} loading="eager" className="w-full h-auto block" />
              {p.image.credito && <figcaption className="px-4 md:px-0 py-2 font-sans text-xs text-bruma">📷 {p.image.credito}</figcaption>}
            </div>
          </figure>
        ) : (
          <div className="fio" aria-hidden="true" />
        )}

        <div className="papel px-4 md:px-6 pt-10 md:pt-14 pb-16">
          <div className="leitura mx-auto">
            <section aria-label="A semana em 3 linhas" className="em-tres-linhas">
              <p className="rotulo text-petroleo">A semana em 3 linhas</p>
              <ul>
                {p.emTresLinhas.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
            </section>
            {p.children}

            {comNoticias.length > 0 && (
              <>
                <h2>Notícias citadas</h2>
                {comNoticias.map((t) => (
                  <div key={t.titulo}>
                    <h3>{t.titulo}</h3>
                    <p className="rotulo text-petroleo">{TEMAS[t.tema]}</p>
                    <ul>
                      {t.noticias.map((n) => (
                        <li key={n.href}>
                          <a href={n.href}>{n.title}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </>
            )}
          </div>

          <footer className="max-w-[40rem] mx-auto mt-12 border-t-2 border-laranja pt-6 font-sans text-sm text-tinta-2 grid gap-3">
            <p>
              <span className="font-bold text-petroleo">Assinatura:</span> {ass.autor}
              {ass.nota && <> · {ass.nota}</>}
            </p>
            <p>
              A pesquisa sai da base de conhecimento do site: cada fato foi conferido na fonte e virou notícia antes de entrar
              nesta análise.
            </p>
            {p.noticiasDaSemana && (
              <p>
                <a href={p.noticiasDaSemana} className="acao text-laranja-fundo">
                  Todas as notícias da semana <ArrowRight size={14} aria-hidden="true" />
                </a>
              </p>
            )}
          </footer>

          <div className="max-w-[40rem] mx-auto mt-14">
            <NewsletterCta content={`analise-${p.id}`} />
          </div>
        </div>
      </article>
    </main>
  );
}

import type { ReactNode } from 'react';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import { TEMAS, PUBLICOS, PUBLICO_IDS, type TemaId, type PublicoId } from '../../lib/temas';
import { NewsletterCta } from '../NewsletterCta';

export interface FonteNoticia {
  nome: string;
  url: string;
  /** "04/11". */
  diaMes: string;
}

export interface NoticiaPageProps {
  slug: string;
  title: string;
  excerpt: string;
  /** "16 Nov, 2026". */
  dateFormatted: string;
  temas: TemaId[];
  fonte: FonteNoticia;
  outrasFontes: FonteNoticia[];
  porQueImporta: Partial<Record<PublicoId, string>>;
  /** "16 Nov, 2026". */
  apuradoEm: string;
  /** Ferramentas/práticas; `href` quando a ferramenta está no tech radar publicado. */
  ferramentas: { id: string; nome: string; href?: string }[];
  correcoes: { data: string; texto: string }[];
  semana: { rotulo: string; href: string };
  analise?: { href: string; title: string };
  image?: { src: string; alt: string; credito?: string };
  rascunho: boolean;
  /** Corpo (2 a 4 parágrafos) já renderizado. */
  children?: ReactNode;
}

/**
 * Página de uma notícia: título na faixa azul-noite, a fonte logo abaixo do lead ("conforme publicado
 * em…"), o corpo na coluna de papel e o "Por que importa" por público. Sem tela própria (volume diário):
 * a pintura do site fica nos hubs; imagem só quando a notícia tem capa própria ou imagem oficial com crédito.
 */
export function NoticiaPage(p: NoticiaPageProps) {
  const publicos = PUBLICO_IDS.filter((id) => p.porQueImporta[id]);
  return (
    <main id="conteudo" tabIndex={-1} className="bg-papel min-h-screen">
      <article>
        <header className="bg-noite">
          <div className="max-w-[43rem] mx-auto px-4 md:px-6 pt-8 md:pt-12 pb-10 md:pb-12">
            <a href="/noticias/" className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-nevoa hover:text-white transition-colors mb-8">
              <ArrowLeft size={16} aria-hidden="true" />
              Todas as notícias
            </a>
            <h1 className="font-serif text-[1.9rem] leading-[1.12] md:text-[2.6rem] md:leading-[1.08] tracking-[-0.012em] text-white mb-5">
              {p.title}
            </h1>
            <p className="font-serif text-lg md:text-xl leading-relaxed text-nevoa mb-6">{p.excerpt}</p>
            <p className="font-sans text-sm text-bruma flex flex-wrap items-center gap-x-2.5 gap-y-1">
              {p.rascunho && <span className="rotulo text-pessego">Rascunho</span>}
              {p.rascunho && <span aria-hidden="true">·</span>}
              <span className="font-bold text-laranja-claro">Notícia</span>
              <span aria-hidden="true">·</span>
              <span>{p.temas.map((t) => TEMAS[t]).join(', ')}</span>
              <span aria-hidden="true">·</span>
              <span>{p.dateFormatted}</span>
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
            <p className="fonte-noticia">
              Conforme publicado em{' '}
              <a href={p.fonte.url} target="_blank" rel="noopener">
                {p.fonte.nome}
              </a>{' '}
              em {p.fonte.diaMes}.
            </p>
            {p.children}

            {publicos.length > 0 && (
              <>
                <h2>Por que importa</h2>
                <dl className="por-que-importa">
                  {publicos.map((id) => (
                    <div key={id}>
                      <dt>{PUBLICOS[id]}</dt>
                      <dd>{p.porQueImporta[id]}</dd>
                    </div>
                  ))}
                </dl>
              </>
            )}

            {p.correcoes.length > 0 && (
              <aside aria-label="Correções" className="correcoes">
                {p.correcoes.map((c) => (
                  <p key={c.data + c.texto}>
                    <strong>Corrigido em {c.data}:</strong> {c.texto}
                  </p>
                ))}
              </aside>
            )}
          </div>

          {/* Rodapé da notícia: tema, ferramentas (ligam ao tech radar), apuração, outras fontes e a semana. */}
          <footer className="max-w-[40rem] mx-auto mt-12 border-t-2 border-laranja pt-6 font-sans text-sm text-tinta-2 grid gap-3">
            <p>
              <span className="font-bold text-petroleo">Tema:</span> {p.temas.map((t) => TEMAS[t]).join(', ')}
            </p>
            {p.ferramentas.length > 0 && (
              <p>
                <span className="font-bold text-petroleo">Ferramentas e práticas:</span>{' '}
                {p.ferramentas.map((f, i) => (
                  <span key={f.id}>
                    {i > 0 && ', '}
                    {f.href ? (
                      <a href={f.href} className="text-laranja-fundo underline underline-offset-2 hover:no-underline">
                        {f.nome}
                      </a>
                    ) : (
                      f.nome
                    )}
                  </span>
                ))}
              </p>
            )}
            <p>
              <span className="font-bold text-petroleo">Apurado em:</span> {p.apuradoEm}
            </p>
            {/* Transparência (regra 6 da estratégia v2): a notícia é escrita pelo agente, não assinada pelo Gustavo. */}
            <p>
              <span className="font-bold text-petroleo">Redação:</span> agente de IA do Gustavo Lopes, a partir da fonte
              citada. Erro de fato é corrigido nesta página, com data.
            </p>
            {p.outrasFontes.length > 0 && (
              <p>
                <span className="font-bold text-petroleo">Outras fontes:</span>{' '}
                {p.outrasFontes.map((f, i) => (
                  <span key={f.url}>
                    {i > 0 && ', '}
                    <a href={f.url} target="_blank" rel="noopener" className="text-laranja-fundo underline underline-offset-2 hover:no-underline">
                      {f.nome}
                    </a>{' '}
                    ({f.diaMes})
                  </span>
                ))}
              </p>
            )}
            <p className="flex flex-wrap gap-x-6 gap-y-2 pt-2">
              <a href={p.semana.href} className="acao text-laranja-fundo">
                Notícias da semana de {p.semana.rotulo} <ArrowRight size={14} aria-hidden="true" />
              </a>
              {p.analise && (
                <a href={p.analise.href} className="acao text-laranja-fundo">
                  Citada na análise da semana <ArrowRight size={14} aria-hidden="true" />
                </a>
              )}
              <a href={p.fonte.url} target="_blank" rel="noopener" className="acao text-laranja-fundo">
                Ler na fonte <ExternalLink size={14} aria-hidden="true" />
              </a>
            </p>
          </footer>

          <div className="max-w-[40rem] mx-auto mt-14">
            <NewsletterCta content={`noticia-${p.slug}`} />
          </div>
        </div>
      </article>
    </main>
  );
}

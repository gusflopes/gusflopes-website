import { useState, type ReactNode } from 'react';
import { ArrowLeft, ArrowRight, Calendar, Check, Clock, Share2 } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { EIXOS, type EixoId } from '../lib/eixos';
import { COR_LINHA, type PosicaoNaLinha } from '../lib/linhas';
import { author } from '../config/site';
import { SocialLinks } from './SocialLinks';
import fotoAutor from '../assets/autor.jpg?url';
import logo from '../assets/cfa6876664fcc921be5a7c0a58c353ea12577968.png?url';

export interface ArtigoLinhaProps {
  title: string;
  excerpt: string;
  category: string;
  eixo: EixoId;
  dateFormatted: string;
  duration: string;
  image: string;
  /** Link e rótulo de volta (Insights: "Voltar"; Radar: "Voltar para o Radar"). */
  voltar: { href: string; label: string };
  /** Onde o texto está na linha do eixo (estações, atual, baldeações). */
  posicao?: PosicaoNaLinha;
  children?: ReactNode;
}

/**
 * Página de texto no "Metrô Noturno": a moldura é noturna (barra, linha com todas as
 * estações e "você está aqui", título); a coluna de leitura é papel frio, calma.
 * No fim, estação anterior e próxima na mesma linha.
 */
export function ArtigoLinha({
  title,
  excerpt,
  category,
  eixo,
  dateFormatted,
  duration,
  image,
  voltar,
  posicao,
  children,
}: ArtigoLinhaProps) {
  const [linkCopied, setLinkCopied] = useState(false);
  const def = EIXOS[eixo];
  const cor = COR_LINHA[eixo];

  const handleShare = async () => {
    const url = window.location.href;
    if (typeof navigator.share === 'function') {
      try {
        await navigator.share({ title, url });
        return;
      } catch (err) {
        // Usuário cancelou o share: não sobrescrever o clipboard como efeito colateral.
        if (err instanceof DOMException && err.name === 'AbortError') return;
        // Share falhou de verdade (ex.: NotAllowedError) — cai para o fallback de copiar.
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } catch {
      // clipboard indisponível (contexto não seguro) — sem ação
    }
  };

  const estacoes = posicao?.estacoes ?? [];
  const atual = posicao?.atual ?? -1;
  const anterior = atual > 0 ? estacoes[atual - 1] : undefined;
  const proxima = atual >= 0 && atual < estacoes.length - 1 ? estacoes[atual + 1] : undefined;

  return (
    <main style={{ '--linha': cor } as React.CSSProperties}>
      {/* ---------- Moldura noturna ---------- */}
      <div className="bg-noite text-luz">
        <div className="sticky top-0 z-40 bg-noite/95 backdrop-blur-sm border-b border-trilho">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
            <div className="flex items-center gap-5 min-w-0">
              <a href="/" className="shrink-0">
                <img src={logo} alt="Gusflopes.dev" width={1028} height={556} className="h-9 w-auto" />
              </a>
              <a
                href={voltar.href}
                className="inline-flex items-center gap-2 min-h-11 text-xs font-bold uppercase tracking-[0.1em] text-nevoa hover:text-white transition-colors truncate"
              >
                <ArrowLeft size={14} aria-hidden="true" />
                {voltar.label}
              </a>
            </div>
            <button
              type="button"
              onClick={handleShare}
              aria-label="Compartilhar artigo"
              className="flex items-center gap-2 h-11 min-w-11 justify-center px-2 rounded-full text-nevoa hover:text-white hover:bg-noite-2 transition-colors"
            >
              {linkCopied ? <Check size={16} className="text-laranja-claro" /> : <Share2 size={16} />}
              {linkCopied && (
                <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-laranja-claro pr-1">
                  Link copiado
                </span>
              )}
            </button>
          </div>
        </div>

        <header className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 md:pt-14 pb-12 md:pb-16">
          {/* A linha e a estação: todas as estações do eixo, a atual em destaque */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-3 mb-5">
            <a
              href={def.href}
              className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-sm font-extrabold text-brasa hover:brightness-110"
              style={{ background: cor }}
            >
              {def.shortLabel}
            </a>
            {atual >= 0 && (
              <span className="text-sm font-bold text-luz tabular-nums">
                Estação {atual + 1} <span className="text-nevoa font-medium">de {estacoes.length}</span>
              </span>
            )}
          </div>

          {estacoes.length > 1 && (
            <nav aria-label={`Estações da linha ${def.label}`} className="mb-12 md:mb-14 max-w-4xl">
              <ol className="trilho-artigo">
                {estacoes.map((e, i) => (
                  <li key={e.href}>
                    <a
                      href={e.href}
                      title={e.title}
                      aria-label={i === atual ? `${e.title} (você está aqui)` : e.title}
                      {...(i === atual ? { 'aria-current': 'page' as const } : {})}
                    >
                      <span
                        className="estacao-ponto"
                        aria-hidden="true"
                        {...(i === atual ? { 'data-atual': '' } : {})}
                      />
                    </a>
                    {i === atual && (
                      <span
                        aria-hidden="true"
                        className={`absolute top-full mt-1.5 whitespace-nowrap text-[0.7rem] font-bold uppercase tracking-[0.1em] text-luz ${
                          i < estacoes.length / 2 ? 'left-0 sm:left-1/2 sm:-translate-x-1/2' : 'right-0 sm:right-auto sm:left-1/2 sm:-translate-x-1/2'
                        } ${i === 0 ? 'sm:left-0 sm:translate-x-0' : ''}`}
                      >
                        Você está aqui
                      </span>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          )}

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.8rem] font-semibold uppercase tracking-[0.08em] text-nevoa mb-5">
            <span className="text-ambar">{category}</span>
            <span className="flex items-center gap-1.5">
              <Calendar size={13} aria-hidden="true" /> {dateFormatted}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={13} aria-hidden="true" /> {duration} leitura
            </span>
          </div>

          <h1 className="max-w-4xl text-[2.1rem] sm:text-5xl lg:text-[3.6rem] leading-[1.06] font-extrabold tracking-[-0.025em] text-white">
            {title}
          </h1>

          <p className="mt-6 max-w-[60ch] font-serif text-lg md:text-[1.3rem] leading-relaxed text-nevoa">
            {excerpt}
          </p>
        </header>
      </div>

      {/* ---------- Coluna de leitura (papel) ---------- */}
      <div className="papel bg-papel text-tinta">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 md:pt-14 pb-20">
          <div className="mb-12 md:mb-14 rounded overflow-hidden aspect-[21/9] bg-fio">
            <ImageWithFallback src={image} alt={title} className="w-full h-full object-cover" />
          </div>

          {/* Corpo — markdown renderizado via slot */}
          <div className="prosa mx-auto">{children}</div>

          {/* Autor */}
          <div className="mt-20 pt-10 border-t border-fio flex flex-col sm:flex-row items-start gap-6">
            <img
              src={fotoAutor}
              alt={author.name}
              width={80}
              height={80}
              loading="lazy"
              className="w-20 h-20 rounded-full object-cover shrink-0 ring-4 ring-papel outline outline-[3px] outline-noite"
            />
            <div>
              <h2 className="text-xs font-bold uppercase tracking-[0.12em] text-laranja-fundo mb-2">Sobre o Autor</h2>
              <p className="text-2xl md:text-[1.75rem] font-extrabold tracking-[-0.015em] text-noite mb-2">{author.name}</p>
              <p className="font-serif text-base text-tinta-2 max-w-lg leading-relaxed mb-3">{author.bio}</p>
              <SocialLinks linkClassName="text-tinta-2 hover:text-noite hover:bg-fio" />
            </div>
          </div>
        </article>
      </div>

      {/* ---------- Baldeação: textos de outras linhas com tag em comum ---------- */}
      {posicao && posicao.baldeacoes.length > 0 && (
        <section aria-labelledby="baldeacao-title" className="bg-noite-2">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 md:py-12">
            <h2 id="baldeacao-title" className="flex items-center gap-3 text-sm font-extrabold uppercase tracking-[0.12em] text-luz mb-6">
              <span aria-hidden="true" className="estacao-ponto" data-baldeacao="" />
              Baldeação
            </h2>
            <ul className="list-none m-0 p-0 grid md:grid-cols-3 gap-6">
              {posicao.baldeacoes.map((b) => (
                <li key={b.href}>
                  <a href={b.href} className="group block">
                    <span
                      className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-extrabold text-brasa"
                      style={{ background: COR_LINHA[b.eixo] }}
                    >
                      {EIXOS[b.eixo].shortLabel}
                    </span>
                    <span className="mt-2.5 block text-lg font-bold leading-snug text-luz group-hover:text-white group-hover:underline decoration-2 underline-offset-4" style={{ textDecorationColor: COR_LINHA[b.eixo] }}>
                      {b.title}
                    </span>
                    <span className="mt-1 block text-xs font-medium text-nevoa tabular-nums">{b.date}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ---------- Estação anterior / próxima na mesma linha ---------- */}
      {(anterior || proxima) && (
        <nav aria-label={`Estação anterior e próxima na linha ${def.label}`} className="bg-noite border-t border-trilho">
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-10 md:py-12 grid sm:grid-cols-2 gap-4 sm:gap-10">
            <div className="relative">
              {anterior && (
                <a href={anterior.href} className="group flex flex-col gap-3 py-2" rel="prev">
                  <span className="flex items-center gap-3">
                    <span aria-hidden="true" className="flex items-center">
                      <span className="estacao-ponto" />
                      <span className="block w-8 h-1.5 -ml-0.5 rounded-r-full bg-[var(--linha)]" />
                    </span>
                    <ArrowLeft size={16} aria-hidden="true" className="text-nevoa group-hover:text-white" />
                    <span className="text-xs font-bold uppercase tracking-[0.08em] text-nevoa">Estação anterior</span>
                    <span className="text-xs font-medium text-nevoa tabular-nums">{anterior.date}</span>
                  </span>
                  <span className="text-lg font-bold leading-snug text-luz group-hover:text-white group-hover:underline decoration-2 decoration-[var(--linha)] underline-offset-4">
                    {anterior.title}
                  </span>
                </a>
              )}
            </div>
            <div className="relative sm:text-right">
              {proxima && (
                <a href={proxima.href} className="group flex flex-col gap-3 py-2 sm:items-end" rel="next">
                  <span className="flex items-center gap-3 sm:flex-row-reverse">
                    <span aria-hidden="true" className="flex items-center sm:flex-row-reverse">
                      <span className="estacao-ponto" />
                      <span className="block w-8 h-1.5 -ml-0.5 sm:ml-0 sm:-mr-0.5 rounded-r-full sm:rounded-r-none sm:rounded-l-full bg-[var(--linha)]" />
                    </span>
                    <ArrowRight size={16} aria-hidden="true" className="text-nevoa group-hover:text-white" />
                    <span className="text-xs font-bold uppercase tracking-[0.08em] text-nevoa">Próxima estação</span>
                    <span className="text-xs font-medium text-nevoa tabular-nums">{proxima.date}</span>
                  </span>
                  <span className="text-lg font-bold leading-snug text-luz group-hover:text-white group-hover:underline decoration-2 decoration-[var(--linha)] underline-offset-4">
                    {proxima.title}
                  </span>
                </a>
              )}
            </div>
          </div>
        </nav>
      )}
    </main>
  );
}

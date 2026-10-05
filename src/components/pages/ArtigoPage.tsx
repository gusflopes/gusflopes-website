import { useState, type ReactNode } from 'react';
import { ArrowRight, Check, Share2 } from 'lucide-react';
import { EIXOS, type EixoId } from '../../lib/eixos';
import { author } from '../../config/site';
import type { Tela } from '../../lib/telas';
import { SocialLinks } from '../SocialLinks';
import { TelaPicture } from '../TelaPicture';
import { NewsletterCta } from '../NewsletterCta';
import fotoAutor from '../../assets/autor.jpg?url';
import type { ProximoTexto } from '../../lib/artigos';

export interface ArtigoPageProps {
  title: string;
  excerpt: string;
  category: string;
  eixo: EixoId;
  dateFormatted: string;
  duration: string;
  /** Capa: a tela gerada do slug. */
  tela: Tela;
  /** Sem uso desde que o artigo leva o header do site; mantido para os chamadores. */
  voltar?: { href: string; label: string };
  /** Identificador do ponto de clique da newsletter (UTM). */
  origem: string;
  /** Margem pintada do texto (variáveis CSS da classe `.margem`), costurada à coluna pelo fio laranja. */
  margem?: Record<string, string>;
  /** Faixas pintadas dos H2 (fundoCapitulos): a capa do texto abrindo cada capítulo. */
  capitulos?: Record<string, string>;
  /** Próximo texto sugerido no fim (mesmo eixo, o anterior no tempo). */
  proximo?: ProximoTexto;
  /** Corpo do artigo já renderizado (markdown via <Content /> no .astro). */
  children?: ReactNode;
}

/**
 * Página de texto (Insights e Radar): o título em faixa azul-escuro com a capa do texto em retrato
 * ao lado (fio laranja vertical) e, abaixo, a coluna de leitura em papel quente #FFF8F2 — nada atrás do texto.
 */
export function ArtigoPage({ title, excerpt, category, eixo, dateFormatted, duration, tela, origem, margem, capitulos, proximo, children }: ArtigoPageProps) {
  const [linkCopied, setLinkCopied] = useState(false);

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

  return (
    <main id="conteudo" tabIndex={-1} className="bg-papel min-h-screen">
      <article>
        {/* Abertura do texto: a faixa azul-noite com o título e, ao lado, a capa em retrato até a borda
            direita, costurada pelo fio vertical (no celular a capa vem antes, com o fio por baixo). */}
        <header className="bg-noite lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,38%)] xl:grid-cols-[minmax(0,1fr)_minmax(0,34%)]">
          {/* No desktop a capa preenche a coluna (absoluta) sem ditar a altura: a abertura tem a altura
              do texto, não a do retrato — senão cresce com a largura da janela. */}
          <div className="relative h-[30svh] min-h-[180px] md:h-[40svh] lg:h-auto lg:min-h-[440px] overflow-hidden lg:order-last border-b-[3px] lg:border-b-0 lg:border-l-[3px] border-laranja">
            <TelaPicture tela={tela} sizes="(min-width: 1280px) 34vw, (min-width: 1024px) 38vw, 100vw" priority className="lg:absolute lg:inset-0" />
          </div>
          <div className="flex items-end">
            <div className="w-full max-w-[46rem] px-4 md:px-6 lg:pl-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] lg:pr-14 xl:max-w-none pt-7 pb-10 md:pt-10 md:pb-14 lg:py-12 mx-auto lg:mx-0">
              <div className="max-w-[43rem]">
                <h1 className="font-serif text-[2rem] leading-[1.1] md:text-[3.1rem] md:leading-[1.06] tracking-[-0.012em] text-white mb-5">
                  {title}
                </h1>
                <p className="font-serif text-lg md:text-xl leading-relaxed text-nevoa mb-6">{excerpt}</p>
                <p className="font-sans text-sm text-bruma flex flex-wrap items-center gap-x-2.5 gap-y-1">
                  <a href={EIXOS[eixo].href} className="font-bold text-laranja-claro hover:text-pessego transition-colors">
                    {EIXOS[eixo].shortLabel}
                  </a>
                  <span aria-hidden="true">·</span>
                  <span>{category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{dateFormatted}</span>
                  <span aria-hidden="true">·</span>
                  <span>{duration} leitura</span>
                  <span aria-hidden="true">·</span>
                  <button
                    type="button"
                    onClick={handleShare}
                    aria-label="Compartilhar artigo"
                    className="inline-flex items-center gap-1.5 min-h-11 -my-3 px-1 text-nevoa hover:text-white transition-colors"
                  >
                    {linkCopied ? <Check size={16} className="text-laranja-claro" aria-hidden="true" /> : <Share2 size={16} aria-hidden="true" />}
                    {linkCopied && <span className="font-sans text-xs font-bold text-laranja-claro">Link copiado</span>}
                  </button>
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Coluna de leitura — markdown renderizado via slot. A capa continua como margem pintada à
            esquerda da coluna (no celular, uma tira de 12px na borda), costurada por fio laranja de 2px; o laranja
            de verdade vive dentro da tira (zonas de brasa). */}
        <div className={`papel relative pt-12 md:pt-16 pb-16 ${margem ? 'pl-7 pr-4 md:px-6' : 'px-4 md:px-6'}`}>
          {margem && (
            <div
              aria-hidden="true"
              className="margem absolute top-0 bottom-0 left-0 w-3 md:w-8 lg:w-12 lg:left-[max(0px,calc(50%-20rem-3rem-4rem))] border-r-2 border-laranja"
              style={margem}
            />
          )}
          <div className="leitura mx-auto" style={capitulos}>{children}</div>
        </div>

        {/* Próximo texto: quem terminou a leitura tem para onde ir sem rolar até o rodapé. Uma linha do índice
            (a lombada pintada do texto, título, resumo e metadados), não um card. */}
        {proximo && (
          <section aria-labelledby="proximo-titulo" className="papel px-4 md:px-6 pb-14 md:pb-16">
            <div className="max-w-[40rem] mx-auto border-t-2 border-laranja pt-8">
              <h2 id="proximo-titulo" className="font-serif text-xl md:text-2xl text-tinta mb-6">Próximo texto</h2>
              <a href={proximo.href} className="cartao group relative block pl-9 md:pl-[4.75rem] py-1">
                {proximo.lombadas?.[0] && (
                  <picture aria-hidden="true" className="absolute left-0 top-0 bottom-0 w-5 md:w-14 overflow-hidden bg-petroleo">
                    <source type="image/avif" srcSet={proximo.lombadas[0].avif} />
                    <source type="image/webp" srcSet={proximo.lombadas[0].webp} />
                    <img src={proximo.lombadas[0].src} alt="" width={proximo.lombadas[0].width} height={proximo.lombadas[0].height} loading="lazy" decoding="async" className="w-full h-full object-cover" />
                  </picture>
                )}
                <span className="block font-serif text-[1.4rem] md:text-[1.6rem] leading-snug text-tinta group-hover:text-laranja-fundo transition-colors [overflow-wrap:anywhere]">
                  {proximo.title}
                </span>
                <span className="block mt-2 font-sans text-tinta-2 leading-relaxed line-clamp-2">{proximo.excerpt}</span>
                <span className="mt-3 flex flex-wrap items-center gap-x-2.5 gap-y-1 font-sans text-sm">
                  <span className="font-bold text-petroleo inline-flex items-center gap-2"><span className="marca" aria-hidden="true" />{EIXOS[proximo.eixo].shortLabel} · {proximo.category}</span>
                  <span className="text-tinta-2">{proximo.date} · {proximo.duration}</span>
                </span>
                <span className="acao text-laranja-fundo text-sm mt-3">
                  Ler Artigo <ArrowRight size={14} aria-hidden="true" />
                </span>
              </a>
            </div>
          </section>
        )}

        {/* Autor */}
        <footer className="papel px-4 md:px-6 pb-16 md:pb-24">
          <div className="max-w-[40rem] mx-auto border-t border-regua pt-10 flex flex-col sm:flex-row gap-6">
            <img
              src={fotoAutor}
              alt=""
              width={88}
              height={88}
              loading="lazy"
              className="w-[88px] h-[88px] rounded-full object-cover shrink-0"
            />
            <div>
              <h2 className="font-serif text-2xl md:text-[1.75rem] text-tinta">{author.name}</h2>
              <p className="rotulo text-tinta-2 mt-1.5 mb-3">Sobre o Autor</p>
              <p className="font-sans text-[0.9375rem] text-tinta-2 leading-relaxed max-w-lg mb-3">{author.bio}</p>
              <SocialLinks linkClassName="text-tinta-2 hover:text-laranja-fundo" />
            </div>
          </div>
          <div className="max-w-[40rem] mx-auto mt-12">
            <NewsletterCta content={origem} eixo={eixo} />
          </div>
        </footer>
      </article>
    </main>
  );
}

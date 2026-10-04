import { useState, type ReactNode } from 'react';
import { ArrowLeft, Check, Share2 } from 'lucide-react';
import { EIXOS, type EixoId } from '../../lib/eixos';
import { author } from '../../config/site';
import type { Tela } from '../../lib/telas';
import { SocialLinks } from '../SocialLinks';
import { TelaPicture } from '../TelaPicture';
import { NewsletterCta } from '../NewsletterCta';
import fotoAutor from '../../assets/autor.jpg?url';

export interface ArtigoPageProps {
  title: string;
  excerpt: string;
  category: string;
  eixo: EixoId;
  dateFormatted: string;
  duration: string;
  /** Capa: a tela gerada do slug. */
  tela: Tela;
  voltar: { href: string; label: string };
  /** Identificador do ponto de clique da newsletter (UTM). */
  origem: string;
  /** Corpo do artigo já renderizado (markdown via <Content /> no .astro). */
  children?: ReactNode;
}

/**
 * Página de texto (Insights e Radar): a tela do texto como capa, o título em faixa azul-escuro
 * costurada pelo fio laranja e, abaixo, a coluna de leitura em papel frio — nada atrás do texto.
 */
export function ArtigoPage({ title, excerpt, category, eixo, dateFormatted, duration, tela, voltar, origem, children }: ArtigoPageProps) {
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
    <main className="bg-papel min-h-screen">
      {/* Barra do texto */}
      <div className="sticky top-0 z-40 bg-noite border-b border-linha">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-14 flex items-center justify-between">
          <a href={voltar.href} className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-nevoa hover:text-white transition-colors">
            <ArrowLeft size={16} aria-hidden="true" />
            {voltar.label}
          </a>
          <button
            type="button"
            onClick={handleShare}
            aria-label="Compartilhar artigo"
            className="inline-flex items-center gap-2 p-2 -mr-2 text-nevoa hover:text-white transition-colors"
          >
            {linkCopied ? <Check size={18} className="text-laranja-claro" aria-hidden="true" /> : <Share2 size={18} aria-hidden="true" />}
            {linkCopied && <span className="font-sans text-xs font-bold text-laranja-claro">Link copiado</span>}
          </button>
        </div>
      </div>

      <article>
        <header className="bg-noite">
          <div className="h-[30svh] min-h-[180px] md:h-[44svh] md:min-h-[280px] md:max-h-[520px] overflow-hidden">
            <TelaPicture tela={tela} sizes="100vw" priority />
          </div>
          <div className="fio">
            <div className="max-w-[43rem] mx-auto px-4 md:px-6 pt-7 pb-10 md:pt-10 md:pb-14">
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
              </p>
            </div>
          </div>
        </header>

        {/* Coluna de leitura — markdown renderizado via slot */}
        <div className="papel px-4 md:px-6 pt-12 md:pt-16 pb-16">
          <div className="leitura mx-auto">{children}</div>
        </div>

        {/* Autor */}
        <footer className="papel px-4 md:px-6 pb-16 md:pb-24">
          <div className="max-w-[40rem] mx-auto border-t border-regua pt-10 flex flex-col sm:flex-row gap-6">
            <img
              src={fotoAutor}
              alt={author.name}
              width={88}
              height={88}
              loading="lazy"
              className="w-[88px] h-[88px] rounded-full object-cover shrink-0"
            />
            <div>
              <h2 className="rotulo text-laranja-fundo mb-2">Sobre o Autor</h2>
              <p className="font-serif text-2xl md:text-[1.75rem] text-tinta mb-2">{author.name}</p>
              <p className="font-sans text-[0.9375rem] text-tinta-2 leading-relaxed max-w-lg mb-3">{author.bio}</p>
              <SocialLinks linkClassName="text-tinta-2 hover:text-laranja-fundo" />
            </div>
          </div>
          <div className="max-w-[40rem] mx-auto mt-12">
            <NewsletterCta content={origem} />
          </div>
        </footer>
      </article>
    </main>
  );
}

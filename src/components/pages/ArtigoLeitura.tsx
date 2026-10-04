import { useState, type ReactNode } from 'react';
import { ArrowLeft, Check, Share2 } from 'lucide-react';
import { EIXOS, type EixoId } from '../../lib/eixos';
import { author } from '../../config/site';
import { SocialLinks } from '../SocialLinks';
import { Abertura } from '../Abertura';
import fotoAutor from '../../assets/autor.jpg?url';

export interface ArtigoLeituraProps {
  title: string;
  excerpt: string;
  category: string;
  eixo: EixoId;
  dateFormatted: string;
  duration: string;
  voltar: { href: string; label: string };
  children?: ReactNode;
}

/**
 * Casca comum dos textos (Insights e Radar local): barra azul-escuro, abertura tipográfica
 * gerada do título (forma pelo eixo) e o corpo em coluna de serifa sobre papel frio.
 * A foto de banco do frontmatter não entra na página — segue só como imagem de prévia (OG).
 */
export function ArtigoLeitura({ title, excerpt, category, eixo, dateFormatted, duration, voltar, children }: ArtigoLeituraProps) {
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
    <main>
      <div className="sticky top-0 z-40 campo-azul border-b border-azul-3">
        <div className="moldura h-14 flex items-center justify-between">
          <a href={voltar.href} className="rotulo flex items-center gap-2 text-ceu-claro hover:text-papel transition-colors py-3">
            <ArrowLeft size={16} strokeWidth={2.5} aria-hidden="true" />
            {voltar.label}
          </a>
          <button
            type="button"
            onClick={handleShare}
            aria-label="Compartilhar artigo"
            className="flex items-center gap-2 h-10 px-2 -mr-2 text-ceu-claro hover:text-papel transition-colors"
          >
            {linkCopied && <span className="rotulo text-laranja">Link copiado</span>}
            {linkCopied ? <Check size={18} strokeWidth={2.5} className="text-laranja" /> : <Share2 size={18} strokeWidth={2.25} />}
          </button>
        </div>
      </div>

      <article>
        <header className="campo-azul">
          <div className="moldura pt-8 md:pt-12 pb-12 md:pb-16">
            <ul className="flex flex-wrap rotulo border-y border-azul-3 mb-10 md:mb-14">
              <li className="py-2.5 pr-4">
                <a href={EIXOS[eixo].href} className="text-laranja hover:text-laranja-palido transition-colors">
                  {EIXOS[eixo].shortLabel}
                </a>
              </li>
              <li className="py-2.5 px-4 border-l border-azul-3 text-papel">{category}</li>
              <li className="py-2.5 px-4 border-l border-azul-3 text-ceu tabular-nums">{dateFormatted}</li>
              <li className="py-2.5 px-4 border-l border-azul-3 text-ceu">{duration} leitura</li>
            </ul>

            <div className="grid gap-10 lg:grid-cols-12 lg:gap-x-[var(--gutter)] items-end">
              <div className="lg:col-span-8">
                <Abertura titulo={title} eixo={eixo} teto={8.5} />
              </div>
              <p className="lg:col-span-4 pt-5 border-t-2 border-papel max-w-[44ch] font-serif text-[1.25rem] md:text-[1.3125rem] leading-[1.5] text-ceu-claro">
                {excerpt}
              </p>
            </div>
          </div>
        </header>

        <div className="campo-papel pb-24">
          <div className="moldura pt-12 md:pt-16 grid grid-cols-[minmax(0,1fr)] lg:grid-cols-12 lg:gap-x-[var(--gutter)]">
            {/* Corpo — markdown renderizado via slot */}
            <div className="leitura lg:col-start-4 lg:col-span-9">{children}</div>

            <footer className="lg:col-start-4 lg:col-span-9 mt-20 pt-8 border-t-2 border-azul grid gap-6 sm:grid-cols-[96px_minmax(0,1fr)] max-w-[68ch]">
              <img src={fotoAutor} alt={author.name} width={96} height={96} loading="lazy" className="w-24 h-24 object-cover grayscale contrast-110" />
              <div>
                <h2 className="rotulo text-laranja-fundo mb-2">Sobre o Autor</h2>
                <p className="display uppercase text-[1.75rem] md:text-[2.25rem] text-azul mb-3">{author.name}</p>
                <p className="font-serif text-[1.0625rem] leading-relaxed text-tinta-2 mb-4">{author.bio}</p>
                <SocialLinks linkClassName="text-tinta-2 hover:text-laranja-fundo" />
              </div>
            </footer>
          </div>
        </div>
      </article>
    </main>
  );
}

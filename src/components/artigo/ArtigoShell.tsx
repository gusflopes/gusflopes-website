import { useState, type ReactNode } from 'react';
import { ArrowLeft, Check, Share2 } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { author } from '../../config/site';
import { SocialLinks } from '../SocialLinks';
import fotoAutor from '../../assets/autor.jpg?url';
import logo from '../../assets/cfa6876664fcc921be5a7c0a58c353ea12577968.png?url';

interface ArtigoShellProps {
  title: string;
  excerpt: string;
  /** Linha de metadados sob o deck (eixo, categoria, data, leitura). */
  meta: ReactNode;
  /** Algo a mais abaixo dos metadados (ex.: "Ler no Substack →"). */
  extra?: ReactNode;
  image: string;
  /** Edição de newsletter mostra a imagem inteira; artigo recorta em faixa. */
  imageFit?: 'faixa' | 'inteira';
  /**
   * Barra própria do artigo (as páginas de artigo escondem o Header do site).
   * `null` quando a página já tem o Header global (ex.: edição da newsletter).
   */
  voltar: { href: string; label: string } | null;
  /** Link de volta dentro do cabeçalho, para páginas que mantêm o Header do site. */
  voltarInline?: { href: string; label: string };
  autor?: boolean;
  depois?: ReactNode;
  children?: ReactNode;
}

/**
 * Moldura de leitura compartilhada (Insights, Radar e newsletter): cabeçalho em azul-escuro
 * com o título, a imagem atravessando a borda e a coluna em papel frio. O mundo fica na
 * moldura; a coluna é só leitura.
 */
export function ArtigoShell({
  title,
  excerpt,
  meta,
  extra,
  image,
  imageFit = 'faixa',
  voltar,
  voltarInline,
  autor = true,
  depois,
  children,
}: ArtigoShellProps) {
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
    <main className="claro min-h-screen bg-papel text-tinta">
      {voltar && (
        <div className="sticky top-0 z-40 w-full bg-noite border-b border-noite-fio">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 min-w-0">
              <a href="/" className="shrink-0">
                <img src={logo} alt="Gusflopes.dev" width={1028} height={556} className="h-7 w-auto" />
              </a>
              <span aria-hidden="true" className="h-5 w-px bg-noite-fio-forte" />
              <a
                href={voltar.href}
                className="inline-flex items-center gap-2 text-sm font-medium text-nevoa hover:text-white transition-colors truncate"
              >
                <ArrowLeft size={15} aria-hidden="true" />
                {voltar.label}
              </a>
            </div>
            <button
              type="button"
              onClick={handleShare}
              aria-label="Compartilhar artigo"
              className="inline-flex items-center gap-2 h-9 px-2.5 rounded-[3px] text-nevoa hover:text-white hover:bg-noite-2 transition-colors"
            >
              {linkCopied ? <Check size={16} className="text-laranja" /> : <Share2 size={16} strokeWidth={1.75} />}
              {linkCopied && <span className="text-xs font-semibold text-laranja">Link copiado</span>}
            </button>
          </div>
        </div>
      )}

      <article>
        {/* Moldura: cabeçalho em azul-escuro */}
        <header className={`bg-noite text-white ${voltar ? 'pt-14 md:pt-20' : 'pt-28 md:pt-36'} pb-28 md:pb-40`}>
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            {voltarInline && (
              <a
                href={voltarInline.href}
                className="inline-flex items-center gap-2 text-sm font-medium text-nevoa hover:text-white transition-colors mb-10"
              >
                <ArrowLeft size={15} aria-hidden="true" />
                {voltarInline.label}
              </a>
            )}
            <h1 className="font-serif font-semibold text-[2.25rem] leading-[1.08] sm:text-5xl md:text-[3.5rem] tracking-[-0.016em] text-white">
              {title}
            </h1>
            <p className="mt-6 font-serif text-xl md:text-[1.4375rem] leading-[1.5] text-nevoa max-w-[38rem]">{excerpt}</p>
            <div className="mt-8 pt-5 border-t border-noite-fio flex flex-wrap items-center gap-x-3 gap-y-2 text-[0.875rem] text-nevoa-2 num">
              {meta}
            </div>
            {extra && <div className="mt-4">{extra}</div>}
          </div>
        </header>

        {/* Imagem atravessando a borda da moldura */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 -mt-20 md:-mt-28">
          <div
            className={`overflow-hidden rounded-[4px] bg-noite-2 ${
              imageFit === 'faixa' ? 'aspect-[16/9] md:aspect-[21/9]' : ''
            }`}
          >
            <ImageWithFallback
              src={image}
              alt=""
              className={imageFit === 'faixa' ? 'w-full h-full object-cover' : 'w-full h-auto'}
            />
          </div>
        </div>

        {/* Coluna de leitura */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-14 md:pt-20 pb-24 md:pb-32">
          <div className="leitura">{children}</div>

          {depois && <div className="mt-16">{depois}</div>}

          {autor && (
            <div className="mt-20 pt-10 border-t border-tinta grid gap-6 sm:grid-cols-[auto_1fr] sm:gap-8 items-start">
              <img
                src={fotoAutor}
                alt={author.name}
                width={88}
                height={88}
                loading="lazy"
                className="w-[88px] h-[88px] rounded-full object-cover bg-papel-2"
              />
              <div>
                <h2 className="rotulo text-laranja-fundo mb-3">Sobre o Autor</h2>
                <p className="font-serif text-[1.75rem] md:text-[2rem] font-semibold leading-tight text-tinta mb-3">{author.name}</p>
                <p className="font-sans text-[0.9875rem] leading-relaxed text-tinta-2 max-w-[34rem] mb-4">{author.bio}</p>
                <SocialLinks linkClassName="text-tinta-3 hover:text-tinta hover:bg-papel-2" />
              </div>
            </div>
          )}
        </div>
      </article>
    </main>
  );
}

/** Separador de metadados: ponto médio discreto. */
export function Sep() {
  return (
    <span aria-hidden="true" className="text-noite-fio-forte">
      ·
    </span>
  );
}

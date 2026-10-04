import { useEffect, useState, type ReactNode } from 'react';
import { ArrowLeft, Check, Share2 } from 'lucide-react';
import { EIXOS, EIXO_CAMPO, type EixoId } from '../../lib/eixos';
import { author } from '../../config/site';
import { SocialLinks } from '../SocialLinks';
import { Abertura } from '../Abertura';
import { NewsletterCta } from '../NewsletterCta';
import fotoAutor from '../../assets/autor.jpg?url';

/** Um H2 do corpo: âncora (id gerado pelo markdown) e o título real. */
export interface Secao {
  slug: string;
  text: string;
}

export interface ArtigoLeituraProps {
  title: string;
  excerpt: string;
  category: string;
  eixo: EixoId;
  dateFormatted: string;
  duration: string;
  voltar: { href: string; label: string };
  /** H2 do corpo, para o sumário da margem (desktop). */
  secoes?: Secao[];
  children?: ReactNode;
}

/**
 * Casca comum dos textos (Insights e Radar local): barra azul-escuro, abertura tipográfica
 * gerada do título (forma pelo eixo) e o corpo em coluna de serifa sobre papel quente.
 * A foto de banco do frontmatter não entra na página — segue só como imagem de prévia (OG).
 */
export function ArtigoLeitura({ title, excerpt, category, eixo, dateFormatted, duration, voltar, secoes = [], children }: ArtigoLeituraProps) {
  const [linkCopied, setLinkCopied] = useState(false);
  const [ativa, setAtiva] = useState<string | null>(null);

  // Sumário: a seção corrente é o último H2 que já passou da faixa de leitura (abaixo das barras fixas).
  useEffect(() => {
    if (secoes.length < 2) return;
    const alvos = secoes.map((s) => document.getElementById(s.slug)).filter((el): el is HTMLElement => Boolean(el));
    let quadro = 0;
    const medir = () => {
      quadro = 0;
      const limite = window.innerHeight * 0.3;
      let atual: string | null = null;
      for (const el of alvos) if (el.getBoundingClientRect().top <= limite) atual = el.id;
      setAtiva(atual);
    };
    const agendar = () => {
      if (!quadro) quadro = requestAnimationFrame(medir);
    };
    medir();
    window.addEventListener('scroll', agendar, { passive: true });
    window.addEventListener('resize', agendar);
    return () => {
      window.removeEventListener('scroll', agendar);
      window.removeEventListener('resize', agendar);
      if (quadro) cancelAnimationFrame(quadro);
    };
  }, [secoes]);

  // Tabelas largas rolam na horizontal dentro da coluna: precisam ser alcançáveis pelo teclado.
  useEffect(() => {
    document.querySelectorAll<HTMLTableElement>('.leitura table').forEach((t) => {
      if (t.scrollWidth > t.clientWidth && !t.hasAttribute('tabindex')) t.tabIndex = 0;
    });
  }, []);

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
            <ul className="flex flex-wrap rotulo border-t border-azul-3 border-b-2 border-b-laranja mb-10 md:mb-14">
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
              <p className="lg:col-span-4 pt-5 border-t-2 border-laranja max-w-[44ch] font-serif text-[1.25rem] md:text-[1.3125rem] leading-[1.5] text-ceu-claro">
                {excerpt}
              </p>
            </div>
          </div>
          {/* Costura noite → papel: filete laranja de 4px na largura da grade (a mesma dos Serviços na home). */}
          <div className="moldura" aria-hidden="true">
            <div className="h-1 bg-laranja" />
          </div>
        </header>

        <div className="campo-papel pb-24">
          <div className="moldura pt-12 md:pt-16 grid grid-cols-[minmax(0,1fr)] lg:grid-cols-12 lg:gap-x-[var(--gutter)]">
            {/*
              Sumário (desktop): os títulos reais dos H2 na margem esquerda, fixos durante a leitura.
              A seção corrente vira o campo do quadro do eixo com topo laranja (aria-current).
              Sem rótulo visível: o nome do landmark fica só para leitor de tela.
            */}
            {secoes.length >= 2 && (
              <nav aria-label="Seções do texto" className="hidden lg:block lg:col-start-1 lg:col-span-3 lg:row-start-1">
                <ol className="sticky top-[calc(56px+2.5rem)] border-t-4 border-laranja">
                  {secoes.map((s) => {
                    const corrente = s.slug === ativa;
                    return (
                      <li key={s.slug} className="border-b border-filete">
                        <a
                          href={`#${s.slug}`}
                          aria-current={corrente ? 'location' : undefined}
                          className={`block px-3 py-2.5 font-sans font-semibold [font-stretch:87%] text-[0.9375rem] leading-snug transition-colors ${
                            corrente
                              ? `${EIXO_CAMPO[eixo].campo} ${EIXO_CAMPO[eixo].texto} relative before:absolute before:inset-x-0 before:top-0 before:h-1 before:bg-laranja`
                              : 'text-tinta-2 hover:text-azul hover:bg-papel-3'
                          }`}
                        >
                          {s.text}
                        </a>
                      </li>
                    );
                  })}
                </ol>
              </nav>
            )}

            {/* Corpo — markdown renderizado via slot */}
            <div className="leitura lg:col-start-4 lg:col-span-9 lg:row-start-1" data-eixo={eixo}>{children}</div>

            {/*
              Fecho: grade de células sobre azul — foto, nome com "Sobre o Autor" numa célula de
              metadados ao lado, bio; e o plano laranja da newsletter fechando a linha. No celular o plano vem
              antes e a caixa do autor (creme) fecha a página: claro antes do rodapé escuro.
            */}
            <footer className="lg:col-start-4 lg:col-span-9 mt-20 grid gap-[2px] bg-azul border-2 border-azul md:grid-cols-12">
              <div className="campo-creme md:col-span-7 grid grid-cols-[5.5rem_minmax(0,1fr)] gap-x-5 gap-y-4 p-5 md:p-7">
                <img src={fotoAutor} alt={author.name} width={96} height={96} loading="lazy" className="w-[5.5rem] h-[5.5rem] object-cover grayscale contrast-110" />
                <div className="flex flex-col justify-between gap-2">
                  <p className="font-sans font-[850] [font-stretch:62%] uppercase text-[2rem] md:text-[2.5rem] leading-[0.9] tracking-[-0.01em] text-azul">{author.name}</p>
                  <h2 className="rotulo text-laranja-fundo">Sobre o Autor</h2>
                </div>
                <p className="col-span-2 font-serif text-[1.0625rem] leading-relaxed text-tinta-2">{author.bio}</p>
                <SocialLinks className="col-span-2" linkClassName="text-tinta-2 hover:text-laranja-fundo" />
              </div>
              <div className="md:col-span-5 max-md:order-first [&>div]:h-full">
                <NewsletterCta content="artigo-fim" />
              </div>
            </footer>
          </div>
        </div>
      </article>
    </main>
  );
}

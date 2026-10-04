import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export interface ItemSumario {
  slug: string;
  text: string;
}

/**
 * Sumário do artigo, feito dos H2 reais do texto (headings do render do Astro). Sem rótulo
 * visível; o landmark tem nome só para leitor de tela.
 * - Desktop (≥1200px): fixo na margem esquerda, sobre um fio neutro de 1px; o item da seção em
 *   leitura ganha a marca laranja de 5px (a mesma do índice) e aria-current.
 * - Abaixo disso: um bloco em creme logo depois do lede (o primeiro parágrafo), não fixo e sem
 *   barra de progresso. Entra por portal depois da hidratação, porque o corpo vem do markdown.
 */
export function Sumario({ itens }: { itens: ItemSumario[] }) {
  const [ativo, setAtivo] = useState<string | null>(null);
  const [alvo, setAlvo] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const titulos = itens
      .map((i) => document.getElementById(i.slug))
      .filter((el): el is HTMLElement => Boolean(el));
    let quadro = 0;
    const medir = () => {
      quadro = 0;
      let atual: string | null = null;
      for (const t of titulos) if (t.getBoundingClientRect().top < 140) atual = t.id;
      setAtivo(atual);
    };
    const onScroll = () => {
      if (!quadro) quadro = requestAnimationFrame(medir);
    };
    medir();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (quadro) cancelAnimationFrame(quadro);
    };
  }, [itens]);

  // Bloco do celular: depois do primeiro parágrafo do corpo
  useEffect(() => {
    const lede = document.querySelector('.leitura p');
    if (!lede || !lede.parentNode) return;
    const caixa = document.createElement('div');
    lede.parentNode.insertBefore(caixa, lede.nextSibling);
    setAlvo(caixa);
    return () => caixa.remove();
  }, []);

  if (itens.length < 2) return null;

  return (
    <>
      <nav aria-label="Sumário do artigo" className="hidden min-[1200px]:block absolute right-full top-0 bottom-0 mr-8 w-44">
        <ol className="sticky top-24 border-l border-papel-fio">
          {itens.map((i) => {
            const eh = ativo === i.slug;
            return (
              <li key={i.slug} className="relative">
                {eh && <span aria-hidden="true" className="absolute -left-[3px] top-1.5 bottom-1.5 w-[5px] bg-laranja" />}
                <a
                  href={`#${i.slug}`}
                  aria-current={eh ? 'location' : undefined}
                  className={`block pl-4 py-1.5 font-sans text-[0.8125rem] leading-snug transition-colors ${
                    eh ? 'text-tinta font-semibold' : 'text-tinta-3 hover:text-tinta'
                  }`}
                >
                  {i.text}
                </a>
              </li>
            );
          })}
        </ol>
      </nav>

      {alvo &&
        createPortal(
          <nav aria-label="Sumário do artigo" className="min-[1200px]:hidden relative bg-creme rounded-[3px] my-8 px-5 py-4">
            <span aria-hidden="true" className="absolute left-0 top-0 w-16 h-[5px] bg-laranja rounded-tl-[3px]" />
            <ol className="list-none m-0 p-0">
              {itens.map((i) => (
                <li key={i.slug} className="m-0 p-0 border-b border-creme-fio last:border-b-0">
                  <a
                    href={`#${i.slug}`}
                    className="block py-2.5 font-sans text-[0.9375rem] leading-snug font-medium text-tinta no-underline hover:text-laranja-brasa"
                  >
                    {i.text}
                  </a>
                </li>
              ))}
            </ol>
          </nav>,
          alvo
        )}
    </>
  );
}

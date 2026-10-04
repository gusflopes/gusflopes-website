import type { CSSProperties } from 'react';
import { NewsletterForm } from './NewsletterForm';
import { newsletter } from '../config/site';
import { larguraEm } from '../lib/abertura';
import type { FundoResponsivo } from '../lib/imagens';

/**
 * Linhas da tese, montadas à mão sobre as mesmas medidas do sistema de abertura:
 * cada linha ocupa uma fração da largura do bloco (1 = largura toda). O texto é exatamente a
 * tagline; a quebra é a composição.
 */
const TESE: { texto: string; fracao: number; estilo?: 'menor' | 'vazado' }[] = [
  { texto: 'Tecnologia', fracao: 1 },
  { texto: 'e negócio,', fracao: 0.4, estilo: 'menor' },
  { texto: 'partes do', fracao: 1 },
  { texto: 'mesmo', fracao: 0.5, estilo: 'vazado' },
  { texto: 'sistema', fracao: 0.7 },
];

const fit = (texto: string, fracao: number) =>
  Math.round(((97 * fracao) / larguraEm(texto.toLocaleUpperCase('pt-BR'))) * 100) / 100;

/** O quadro dentro do bloco laranja girado: AVIF/WebP responsivos, recortados pela janela. */
function Janela({ fundo }: { fundo: FundoResponsivo }) {
  const sizes = '(min-width: 1024px) 420px, 60vw';
  return (
    <div className="janela" aria-hidden="true">
      <div className="janela-quadro">
        <picture>
          <source type="image/avif" srcSet={fundo.avif} sizes={sizes} />
          <source type="image/webp" srcSet={fundo.webp} sizes={sizes} />
          <img src={fundo.src} alt="" width={fundo.width} height={fundo.height} decoding="async" loading="eager" />
        </picture>
      </div>
    </div>
  );
}

export function Hero({ fundo }: { fundo: FundoResponsivo }) {
  return (
    <section aria-labelledby="tese" className="campo-azul pt-[72px] overflow-hidden">
      <div className="moldura pt-10 md:pt-10 pb-10 md:pb-10">
        {/* Bloco da tese: contêiner de tamanho para as linhas escalarem pela largura */}
        <div className="tese relative [container-type:inline-size] lg:w-[min(72%,calc((100svh-380px)/0.62))]">
          <h1 id="tese" className="m-0 text-papel">
            {TESE.map((l, i) => (
              <span key={l.texto}>
                <span
                  className={`abertura-linha ${l.estilo === 'menor' ? '!text-laranja !py-[0.35em]' : ''}`}
                  data-estilo={l.estilo === 'vazado' ? 'vazado' : 'cheio'}
                  style={{ '--fit': fit(l.texto, l.fracao), '--teto': '20rem' } as CSSProperties}
                >
                  {l.texto}
                </span>
                {i < TESE.length - 1 ? ' ' : null}
              </span>
            ))}
          </h1>
          {/* A janela: única aparição do quadro na página, à direita de MESMO / SISTEMA */}
          <div className="absolute right-[1cqi] bottom-[3cqi] w-[27cqi] lg:w-[27cqi] lg:-right-[27cqi] lg:bottom-[1cqi]">
            <Janela fundo={fundo} />
          </div>
        </div>
      </div>

      <div className="moldura">
        <div className="grid gap-y-6 gap-x-[var(--gutter)] lg:grid-cols-12 border-t-2 border-papel pt-5 pb-12 md:pb-14">
          <p className="rotulo lg:col-span-12 text-laranja">Estratégia · Arquitetura · Fluxo · IA aplicada</p>
          <p className="lg:col-span-5 font-sans font-medium [font-stretch:87%] text-[1.375rem] md:text-[1.625rem] leading-[1.18] text-papel text-balance">
            Arquitetura, plataformas e IA aplicada para transformar complexidade em sistemas que evoluem.
          </p>
          <p className="lg:col-span-4 font-serif text-[1.0625rem] leading-relaxed text-ceu-claro">
            Conecto decisões técnicas aos objetivos da organização para ampliar autonomia, melhorar o fluxo de entrega e gerar valor continuamente.
          </p>
          <div className="lg:col-span-3 flex flex-col gap-4 items-start">
            <p className="font-sans [font-stretch:87%] text-[0.9375rem] leading-snug text-ceu-claro">{newsletter.pitch}</p>
            <NewsletterForm variant="hero" />
          </div>
        </div>
      </div>
    </section>
  );
}

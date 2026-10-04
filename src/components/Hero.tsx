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
      <div className="moldura pt-10 pb-12 md:pb-14">
        {/* Bloco da tese: contêiner de tamanho; as linhas escalam pela largura, entrelinha .86 */}
        <div className="tese relative [container-type:inline-size] lg:w-[min(72%,calc((100svh-360px)/0.54))]">
          <h1 id="tese" className="m-0 text-papel">
            {TESE.map((l, i) => (
              <span key={l.texto}>
                <span
                  className={`abertura-linha ${l.estilo === 'menor' ? '!text-laranja' : ''}`}
                  data-estilo={l.estilo === 'vazado' ? 'vazado' : 'cheio'}
                  style={{ '--fit': fit(l.texto, l.fracao), '--teto': '20rem' } as CSSProperties}
                >
                  {l.texto}
                </span>
                {i < TESE.length - 1 ? ' ' : null}
              </span>
            ))}
          </h1>
          {/*
            A janela: única aparição do quadro na página. No celular encaixa no vão à direita de
            MESMO / SISTEMA e sangra na borda; no desktop encosta no bloco e sangra na borda direita.
          */}
          <div className="tese-janela">
            <Janela fundo={fundo} />
          </div>
        </div>
      </div>

      {/* Faixa de grade: frase, apoio, metadados ao lado e o plano laranja da newsletter */}
      <div className="moldura !px-0 md:!px-[var(--gutter)]">
        <div className="grid lg:grid-cols-12 gap-x-[var(--gutter)] border-t-2 border-papel">
          <div className="lg:col-span-5 lg:col-start-4 px-[var(--gutter)] md:px-0 pt-6 pb-8 lg:pb-12 flex flex-col gap-5">
            <p className="font-sans font-medium [font-stretch:87%] text-[1.375rem] md:text-[1.625rem] leading-[1.18] text-papel text-balance">
              Arquitetura, plataformas e IA aplicada para transformar complexidade em sistemas que evoluem.
            </p>
            <p className="font-serif text-[1.0625rem] leading-relaxed text-ceu-claro max-w-[48ch]">
              Conecto decisões técnicas aos objetivos da organização para ampliar autonomia, melhorar o fluxo de entrega e gerar valor continuamente.
            </p>
          </div>
          <p className="rotulo text-laranja lg:col-span-3 lg:col-start-1 lg:row-start-1 px-[var(--gutter)] md:px-0 pb-8 lg:pt-7 lg:pb-0 lg:pr-4 max-lg:order-2">
            Estratégia · Arquitetura · Fluxo · IA aplicada
          </p>
          <div className="campo-laranja lg:col-span-4 lg:col-start-9 lg:row-start-1 max-lg:order-3 px-[var(--gutter)] md:px-7 py-7 flex flex-col justify-between gap-6">
            <p className="font-sans font-semibold [font-stretch:87%] text-[1.0625rem] leading-snug">{newsletter.pitch}</p>
            <div>
              <NewsletterForm variant="hero" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

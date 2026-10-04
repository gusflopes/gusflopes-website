import { NewsletterForm } from './NewsletterForm';
import { newsletter } from '../config/site';
import { FundoPicture } from './FundoPicture';
import type { FundoResponsivo } from '../lib/imagens';

/**
 * Hero da home: o quadro respira à direita, sem véu; o texto fica à esquerda sobre azul-escuro
 * sólido (contraste AA de verdade). No celular o quadro vira uma faixa no topo e o texto desce
 * para o azul, em vez de ficar por cima da pintura.
 */
export function Hero({ fundo }: { fundo: FundoResponsivo }) {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate flex flex-col lg:justify-center lg:min-h-[max(100svh,760px)] lg:max-h-[1040px] bg-noite overflow-hidden"
    >
      {/* O quadro: faixa no celular, tela inteira a partir de lg */}
      <div className="relative h-[46svh] min-h-[300px] max-h-[460px] lg:absolute lg:inset-0 lg:h-auto lg:max-h-none -z-10">
        <FundoPicture
          fundo={fundo}
          priority
          className="object-[62%_40%] lg:object-[70%_center] quadro-entra"
        />
        {/* Desktop: azul sólido à esquerda abrindo para o quadro à direita */}
        <div
          aria-hidden="true"
          className="hidden lg:block absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, rgba(11,26,51,.97) 0%, rgba(11,26,51,.95) 40%, rgba(11,26,51,.72) 52%, rgba(11,26,51,.22) 68%, rgba(11,26,51,0) 86%)',
          }}
        />
        {/* Topo (legibilidade do header) e base (emenda com a página) */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(11,26,51,.7) 0%, rgba(11,26,51,0) 22%), linear-gradient(0deg, #0b1a33 0%, rgba(11,26,51,0) 34%)',
          }}
        />
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 -mt-16 lg:mt-0 pb-14 lg:pt-28 lg:pb-24">
        <div className="max-w-[46rem]">
          <h1
            id="hero-title"
            className="font-serif font-semibold text-white text-[2.625rem] leading-[1.04] sm:text-6xl lg:text-[3.875rem] xl:text-[4.25rem] tracking-[-0.018em]"
          >
            Tecnologia e negócio, <br className="hidden sm:inline" />
            <span className="text-laranja inline-block [text-wrap:balance]">partes do mesmo sistema</span>
          </h1>

          <p className="mt-7 font-sans text-xl sm:text-[1.375rem] leading-snug font-medium text-[#e8eef6] max-w-[32rem]">
            Arquitetura, plataformas e IA aplicada para transformar complexidade em sistemas que evoluem.
          </p>

          <p className="mt-4 font-sans text-[1.0625rem] leading-relaxed text-nevoa max-w-[32rem]">
            Conecto decisões técnicas aos objetivos da organização para ampliar autonomia, melhorar o fluxo de entrega e gerar valor continuamente.
          </p>

          <div className="mt-10 pt-8 border-t border-noite-fio max-w-[32rem]">
            <p className="font-sans text-[0.9375rem] leading-relaxed text-nevoa-2 mb-5">{newsletter.pitch}</p>
            <NewsletterForm variant="hero" />
          </div>
        </div>

        <p className="mt-12 lg:mt-16 font-sans text-[0.9375rem] font-semibold tracking-[0.02em] text-ceu flex items-center gap-3">
          <span aria-hidden="true" className="h-px w-8 bg-laranja" />
          Estratégia · Arquitetura · Fluxo · IA aplicada
        </p>
      </div>
    </section>
  );
}

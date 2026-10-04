import { NewsletterForm } from './NewsletterForm';
import { newsletter } from '../config/site';
import { FundoPicture } from './FundoPicture';
import type { FundoResponsivo } from '../lib/imagens';

/**
 * Hero da home: o quadro respira à direita, sem véu; o texto fica à esquerda sobre azul-escuro
 * sólido (contraste AA de verdade). A rampa horizontal termina em 55% da largura: dali para a
 * direita o quadro está limpo, só com o degradê da base para emendar com a página.
 * No celular o quadro vira uma faixa curta no topo e o texto desce para o azul.
 */
export function Hero({ fundo }: { fundo: FundoResponsivo }) {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate flex flex-col lg:justify-center lg:min-h-[max(100svh,780px)] lg:max-h-[1040px] bg-noite overflow-hidden"
    >
      {/* O quadro: faixa abaixo do header no celular, campo inteiro (abaixo do header) a partir de lg */}
      <div className="relative mt-16 h-[34svh] min-h-[210px] max-h-[340px] lg:absolute lg:left-[36%] lg:right-0 lg:bottom-0 lg:top-[72px] lg:mt-0 lg:h-auto lg:min-h-0 lg:max-h-none -z-10 overflow-hidden">
        <FundoPicture
          fundo={fundo}
          priority
          sizes="(min-width: 1024px) 64vw, 100vw"
          className="object-[62%_42%] lg:object-[64%_center] quadro-entra"
        />
        {/* Desktop: o quadro ocupa de 36% da largura em diante (srcset menor, LCP mais cedo); rampa curta, limpo a partir de ~55% da página */}
        <div
          aria-hidden="true"
          className="hidden lg:block absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, #0b1a33 0%, #0b1a33 11%, rgba(11,26,51,.7) 19%, rgba(11,26,51,.22) 25%, rgba(11,26,51,0) 30%)',
          }}
        />
        {/* Só a base, só no celular (o texto sobe sobre ela). No desktop a pintura desce reta até a costura laranja do recorte. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 lg:hidden"
          style={{ background: 'linear-gradient(0deg, #0b1a33 0%, #0b1a33 3%, rgba(11,26,51,0) 42%)' }}
        />
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 -mt-14 lg:mt-0 pb-10 lg:pt-32 lg:pb-8">
        <div className="max-w-[32rem] xl:max-w-[34rem]">
          <h1
            id="hero-title"
            className="hero-titulo font-serif font-semibold text-white text-[2.5rem] leading-[1] sm:text-6xl lg:text-[4.125rem] xl:text-[4.75rem]"
          >
            <span className="lg:block">Tecnologia </span>
            <span className="lg:block">e negócio, </span>
            <span className="text-laranja block">partes do mesmo sistema</span>
          </h1>

          <p className="mt-5 lg:mt-8 font-sans text-lg sm:text-[1.375rem] leading-snug font-medium text-[#e8eef6]">
            Arquitetura, plataformas e IA aplicada para transformar complexidade em sistemas que evoluem.
          </p>

          <p className="mt-3 lg:mt-4 font-sans text-[0.9375rem] sm:text-[1.0625rem] leading-relaxed text-nevoa">
            Conecto decisões técnicas aos objetivos da organização para ampliar autonomia, melhorar o fluxo de entrega e gerar valor continuamente.
          </p>

          <div className="mt-6 pt-6 lg:mt-9 lg:pt-8 border-t border-noite-fio">
            <p className="font-sans text-[0.875rem] sm:text-[0.9375rem] leading-relaxed text-nevoa-2 mb-4 lg:mb-5">{newsletter.pitch}</p>
            <NewsletterForm variant="hero" />
          </div>
        </div>

        <p className="mt-10 lg:mt-14 font-sans text-[0.9375rem] font-semibold tracking-[0.02em] text-ceu flex items-center gap-3">
          <span aria-hidden="true" className="h-px w-8 bg-laranja" />
          Estratégia · Arquitetura · Fluxo · IA aplicada
        </p>
      </div>
    </section>
  );
}

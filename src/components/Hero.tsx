import { NewsletterForm } from './NewsletterForm';
import { newsletter } from '../config/site';
import { telaAbertura } from '../lib/telas';
import { TelaPicture } from './TelaPicture';

/**
 * Abertura da home: a tela gerada (semente = tagline) em largura total e, abaixo dela,
 * a faixa azul-escuro costurada pelo fio laranja. Nenhum texto sobre a pintura.
 */
export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="bg-noite">
      <div className="h-[28svh] min-h-[200px] md:h-[calc(100svh-72px-400px)] md:min-h-[300px] md:max-h-[620px] overflow-hidden">
        <TelaPicture tela={telaAbertura()} sizes="100vw" priority />
      </div>

      <div className="fio">
        <div className="max-w-7xl mx-auto px-4 md:px-6 pt-6 pb-10 md:pt-10 md:pb-14 grid gap-5 md:gap-x-12 lg:grid-cols-12">
          <div className="lg:col-span-7 flex flex-col gap-4">
            <h1
              id="hero-title"
              className="font-serif font-semibold text-white text-[2.15rem] leading-[1.06] sm:text-5xl lg:text-[clamp(2.4rem,4vw,3.5rem)] tracking-[-0.015em]"
            >
              Tecnologia e negócio, <br className="hidden sm:block" />
              <span className="text-pessego lg:whitespace-nowrap">partes do mesmo sistema</span>
            </h1>
            <p className="font-sans text-sm md:text-base font-semibold tracking-[0.02em] text-ceu">Estratégia · Arquitetura · Fluxo · IA aplicada</p>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-4 lg:pt-2">
            <p className="font-sans text-lg md:text-xl leading-snug text-white">
              Arquitetura, plataformas e IA aplicada para transformar complexidade em sistemas que evoluem.
            </p>
            <p className="order-last lg:order-none font-sans text-base leading-relaxed text-nevoa">
              Conecto decisões técnicas aos objetivos da organização para ampliar autonomia, melhorar o fluxo de entrega e gerar valor continuamente.
            </p>
            <div className="flex flex-col gap-3 pt-1">
              <p className="font-sans text-sm leading-relaxed text-bruma max-w-md">{newsletter.pitch}</p>
              <NewsletterForm variant="hero" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

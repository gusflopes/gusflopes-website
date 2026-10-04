import { NewsletterForm } from './NewsletterForm';
import { newsletter } from '../config/site';
import { FundoPicture } from './FundoPicture';
import { MapaLinhas } from './MapaLinhas';
import type { FundoResponsivo } from '../lib/imagens';
import type { TrechoLinha } from '../lib/linhas';

const ROTA = 'Estratégia · Arquitetura · Fluxo · IA aplicada';

/**
 * Primeira dobra: a tese à esquerda, o mapa das linhas à direita. O quadro entra
 * apagado e mascarado só atrás do mapa (nunca atrás do texto corrido).
 */
export function Hero({ fundo, trechos }: { fundo: FundoResponsivo; trechos: TrechoLinha[] }) {
  const paradas = ROTA.split(' · ');
  return (
    <section className="relative overflow-hidden border-b border-trilho">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-12 gap-x-12 gap-y-14 pt-12 md:pt-16 lg:pt-20 pb-16 lg:pb-20">
        <div className="lg:col-span-5 lg:pt-4">
          <h1 className="font-extrabold text-[2.6rem] sm:text-6xl lg:text-[3.6rem] xl:text-[3.8rem] leading-[1.02] tracking-[-0.03em] text-white">
            Tecnologia e negócio, <br />
            <span className="text-laranja-claro">partes do mesmo sistema</span>
          </h1>

          {/* A "rota" do trabalho, como uma linha com quatro paradas */}
          <p className="mt-7 flex flex-wrap items-center gap-y-2 text-[0.8rem] sm:text-sm font-bold uppercase tracking-[0.12em] text-ambar">
            {paradas.map((p, i) => (
              <span key={p} className="inline-flex items-center">
                {i > 0 && (
                  <span aria-hidden="true" className="inline-flex items-center mx-2">
                    <span className="block w-3 sm:w-4 h-[3px] bg-ambar/70" />
                    <span className="block w-2 h-2 rounded-full border-2 border-ambar" />
                    <span className="block w-3 sm:w-4 h-[3px] bg-ambar/70" />
                  </span>
                )}
                {p}
                {i < paradas.length - 1 && <span className="sr-only"> · </span>}
              </span>
            ))}
          </p>

          <p className="mt-7 text-xl md:text-[1.4rem] leading-snug font-medium text-luz max-w-xl">
            Arquitetura, plataformas e IA aplicada para transformar complexidade em sistemas que evoluem.
          </p>

          <p className="mt-4 font-serif text-[1.05rem] md:text-lg leading-relaxed text-nevoa max-w-[34rem]">
            Conecto decisões técnicas aos objetivos da organização para ampliar autonomia, melhorar o fluxo de entrega e gerar valor continuamente.
          </p>

          <div className="mt-9 max-w-lg">
            <p className="text-sm text-nevoa mb-3 leading-relaxed">{newsletter.pitch}</p>
            <NewsletterForm variant="hero" />
          </div>
        </div>

        {/* Mapa sobre a cidade apagada */}
        <div className="lg:col-span-7 relative">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-x-4 sm:-inset-x-6 lg:left-[-6rem] lg:right-[-3rem] -top-12 lg:-top-20 h-[22rem] lg:h-[34rem] opacity-30 quadro-mascara"
          >
            <FundoPicture
              fundo={fundo}
              priority
              sizes="(min-width: 1024px) 62vw, 100vw"
              className="absolute inset-0 w-full h-full object-cover object-[50%_35%]"
            />
          </div>
          <div className="relative lg:pt-6">
            <MapaLinhas trechos={trechos} />
          </div>
        </div>
      </div>
    </section>
  );
}

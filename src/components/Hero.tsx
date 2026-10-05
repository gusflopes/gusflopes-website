import { ArrowRight } from 'lucide-react';
import { telaAbertura } from '../lib/telas';
import { TelaPicture } from './TelaPicture';

/**
 * Abertura da home: a tela gerada (semente = tagline) em largura total e, abaixo dela,
 * a faixa azul-escuro costurada pelo fio laranja. Nenhum texto sobre a pintura.
 */
/** Texto mais recente do site: a abertura leva a ler, não a sair para o Substack. */
export interface TextoRecente {
  title: string;
  href: string;
}

export function Hero({ recente }: { recente?: TextoRecente }) {
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
            <p className="font-sans text-sm md:text-base font-semibold tracking-[0.02em] text-areia"><span lang="en">Systems Thinking · Flow · AI Engineering</span></p>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-5 lg:pt-2">
            {/* Promessa e credencial num bloco; a ação mostra o trabalho (ler), não pede o e-mail. A newsletter
                fica onde converte: no fim de cada texto e no rodapé. */}
            <div className="flex flex-col gap-2">
              <p className="font-sans text-lg md:text-xl leading-snug text-white">
                Tecnologia e IA aplicadas onde resolvem o problema do negócio, e deixadas de fora onde só complicam.
              </p>
              <p className="font-sans text-base text-nevoa">Advogado, contador e engenheiro de software.</p>
            </div>
            {recente && (
              <div className="flex flex-col gap-3 pt-1">
                <a href={recente.href} className="botao self-start">
                  Ler o texto mais recente <ArrowRight size={18} aria-hidden="true" />
                </a>
                <p className="font-sans text-sm leading-relaxed text-bruma max-w-md">
                  <span className="sr-only">Texto mais recente: </span>
                  <a href={recente.href} className="text-nevoa hover:text-white underline decoration-linha underline-offset-4">{recente.title}</a>
                  <span aria-hidden="true"> · </span>
                  <a href="/insights" className="text-laranja-claro hover:text-pessego font-semibold whitespace-nowrap">Ver todos os textos</a>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

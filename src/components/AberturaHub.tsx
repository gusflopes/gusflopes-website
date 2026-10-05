import type { ReactNode } from 'react';
import type { Tela } from '../lib/telas';
import { TelaPicture } from './TelaPicture';

interface AberturaHubProps {
  tela: Tela;
  titulo: string;
  deck?: string;
  /** Linha extra abaixo do deck (ex.: para quem é o eixo). */
  nota?: ReactNode;
}

/** Abertura dos hubs: faixa de tela gerada, fio laranja e o título em faixa sólida abaixo. */
export function AberturaHub({ tela, titulo, deck, nota }: AberturaHubProps) {
  return (
    <header className="bg-noite">
      <div className="h-[132px] md:h-auto md:aspect-[5/1] lg:aspect-[6/1] overflow-hidden">
        <TelaPicture tela={tela} sizes="100vw" priority />
      </div>
      <div className="fio">
        <div className="max-w-7xl mx-auto px-4 md:px-6 pt-7 pb-8 md:pt-10 md:pb-12 grid gap-4 lg:grid-cols-12 lg:gap-12 items-end">
          <h1 className="lg:col-span-6 font-serif text-[2.6rem] md:text-6xl leading-[1.02] tracking-[-0.015em] text-white">{titulo}</h1>
          {(deck || nota) && (
            <div className="lg:col-span-6 flex flex-col gap-3 lg:pb-2">
              {deck && <p className="font-sans text-lg leading-relaxed text-nevoa max-w-[56ch]">{deck}</p>}
              {nota}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

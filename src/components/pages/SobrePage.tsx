import type { ReactNode } from 'react';
import { telaFaixa } from '../../lib/telas';
import { AberturaHub } from '../AberturaHub';
import fotoAutor from '../../assets/autor.jpg?url';

export interface SobrePageProps {
  excerpt: string;
  rascunho: boolean;
  /** Texto da página (src/content/paginas/sobre.md) já renderizado. */
  children?: ReactNode;
}

/**
 * Sobre (fora do menu; linkada no rodapé e em cada análise): a mesma abertura dos hubs e o texto na coluna de
 * leitura, com a foto do autor ao lado do primeiro parágrafo.
 */
export function SobrePage({ excerpt, rascunho, children }: SobrePageProps) {
  return (
    <main id="conteudo" tabIndex={-1} className="bg-papel min-h-screen">
      <AberturaHub
        tela={telaFaixa('sobre')}
        titulo="Sobre"
        deck={excerpt}
        nota={rascunho ? <p className="rotulo text-pessego">Rascunho</p> : undefined}
      />
      <div className="papel px-4 md:px-6 pt-10 md:pt-14 pb-20 md:pb-28">
        <div className="leitura mx-auto">
          <img
            src={fotoAutor}
            alt="Gustavo Lopes"
            width={160}
            height={160}
            loading="lazy"
            className="w-28 h-28 md:w-36 md:h-36 object-cover border-b-4 border-laranja"
          />
          {children}
        </div>
      </div>
    </main>
  );
}

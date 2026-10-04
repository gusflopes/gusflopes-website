import type { ReactNode } from 'react';
import { FundoPicture } from './FundoPicture';
import type { FundoResponsivo } from '../lib/imagens';

interface RecorteQuadroProps {
  fundo: FundoResponsivo;
  /**
   * `abertura`: a faixa dos reflexos na água, base da moldura escura (noite → claro), no alto
   * da página. `fecho`: as luzes da cidade, a passagem do último claro para o rodapé.
   */
  momento?: 'abertura' | 'fecho';
  /** Costura reta: fio laranja de 2px no alto, quando a faixa encosta em outra parte do quadro. */
  costura?: boolean;
  /** No primeiro viewport (hubs, artigos): carrega já, sem lazy. */
  eager?: boolean;
  className?: string;
  children?: ReactNode;
}

/**
 * Recorte do quadro: a mesma pintura do hero, em faixa, como passagem entre campos. Nunca atrás de
 * texto; é a gramática da Evolução em todo modelo de página (abre a leitura e chega ao rodapé).
 */
export function RecorteQuadro({ fundo, momento = 'abertura', costura = false, eager = false, className = '', children }: RecorteQuadroProps) {
  const altura = momento === 'abertura' ? 'h-28 md:h-44' : 'h-20 md:h-32';
  const posicao = momento === 'abertura' ? 'object-[50%_90%]' : 'object-[50%_62%]';
  return (
    <div className={`relative ${className}`}>
      <div aria-hidden="true" className={`relative overflow-hidden bg-noite ${altura} ${costura ? 'border-t-2 border-laranja' : ''}`}>
        <FundoPicture fundo={fundo} eager={eager} className={posicao} />
      </div>
      {children}
    </div>
  );
}

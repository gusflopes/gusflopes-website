import { EIXOS, EIXO_COR, type EixoId } from '../lib/eixos';
import { Amp } from './Amp';

/**
 * A marca do eixo com peso real: o nome numa placa chapada na cor do quadro (petróleo, areia,
 * ferrugem), com o texto em contraste AA (.placa-* em index.css). Substitui o quadradinho de 6px.
 */
export function PlacaEixo({
  eixo,
  texto = EIXOS[eixo].shortLabel,
  href,
  tamanho = 'p',
  className = '',
}: {
  eixo: EixoId;
  /** Texto da placa (padrão: o nome curto do eixo). */
  texto?: string;
  href?: string;
  tamanho?: 'p' | 'm';
  className?: string;
}) {
  const cls = `placa-${EIXO_COR[eixo]} inline-flex items-center rounded-[2px] font-sans font-semibold leading-none ${
    tamanho === 'm' ? 'px-3 py-2 text-[0.9375rem]' : 'px-2 py-[0.3125rem] text-[0.8125rem]'
  } ${className}`;
  // Um só filho de texto: num inline-flex, os espaços em volta do "&" (um <span>) sumiriam nas bordas dos itens.
  const label = (
    <span>
      <Amp>{texto}</Amp>
    </span>
  );
  return href ? (
    <a href={href} className={`${cls} underline decoration-transparent underline-offset-2 hover:decoration-current transition-colors`}>
      {label}
    </a>
  ) : (
    <span className={cls}>{label}</span>
  );
}

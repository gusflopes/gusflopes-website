import type { FundoResponsivo } from '../lib/imagens';

interface FundoPictureProps {
  fundo: FundoResponsivo;
  priority?: boolean;
  /** Carrega já (sem lazy) — para recortes que reaproveitam o srcset do hero, já em cache. */
  eager?: boolean;
  /** Largura que a imagem ocupa no layout (atributo `sizes`). */
  sizes?: string;
  className?: string;
}

/**
 * O quadro (cidade noturna em pinceladas) como <picture> AVIF → WebP, decorativo.
 * Sem parallax: a pintura fica parada e inteira, quem se move é a página.
 */
export function FundoPicture({ fundo, priority = false, eager = false, sizes = '100vw', className = '' }: FundoPictureProps) {
  return (
    <picture>
      <source type="image/avif" srcSet={fundo.avif} sizes={sizes} />
      <source type="image/webp" srcSet={fundo.webp} sizes={sizes} />
      <img
        src={fundo.src}
        alt=""
        aria-hidden="true"
        width={fundo.width}
        height={fundo.height}
        decoding="async"
        loading={priority || eager ? 'eager' : 'lazy'}
        // React 18 não conhece fetchPriority; o atributo HTML vai em minúsculas.
        {...(priority ? ({ fetchpriority: 'high' } as Record<string, string>) : {})}
        className={`absolute inset-0 w-full h-full object-cover ${className}`}
      />
    </picture>
  );
}

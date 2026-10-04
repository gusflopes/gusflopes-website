import type { FundoResponsivo } from '../lib/imagens';

/**
 * O quadro (cidade noturna) como <picture> AVIF → WebP. Decorativo: sem alt.
 * Na direção "Metrô Noturno" ele só aparece apagado atrás do mapa das linhas,
 * nunca atrás de texto corrido; quem chama define posição, opacidade e máscara.
 */
export function FundoPicture({
  fundo,
  priority = false,
  sizes = '100vw',
  className = 'absolute inset-0 w-full h-full object-cover object-center',
}: {
  fundo: FundoResponsivo;
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
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
        loading={priority ? 'eager' : 'lazy'}
        // React 18 não conhece fetchPriority; o atributo HTML vai em minúsculas.
        {...(priority ? ({ fetchpriority: 'high' } as Record<string, string>) : {})}
        className={className}
      />
    </picture>
  );
}

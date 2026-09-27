import type { FundoResponsivo } from '../lib/imagens';

/**
 * Imagem de fundo decorativa com <picture> (AVIF → WebP).
 * No mobile fica `absolute` (sem parallax: bg-fixed não funciona no iOS e força repaint);
 * a partir de md vira `fixed` dentro de um pai com clip-path, reproduzindo o parallax.
 */
export function FundoPicture({ fundo, priority = false }: { fundo: FundoResponsivo; priority?: boolean }) {
  return (
    <picture>
      <source type="image/avif" srcSet={fundo.avif} sizes="100vw" />
      <source type="image/webp" srcSet={fundo.webp} sizes="100vw" />
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
        className="absolute md:fixed inset-0 w-full h-full md:h-screen object-cover object-center"
      />
    </picture>
  );
}

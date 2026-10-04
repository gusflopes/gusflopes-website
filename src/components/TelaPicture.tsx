import type { Tela } from '../lib/telas';

interface TelaPictureProps {
  tela: Tela;
  /** Atributo sizes do srcset (ex.: "(min-width: 1024px) 50vw, 100vw"). */
  sizes: string;
  className?: string;
  /** Primeira dobra: carrega cedo e com prioridade (LCP). */
  priority?: boolean;
  /** A tela é decorativa por padrão: o título vem ao lado, em texto. */
  alt?: string;
}

/** Tela gerada no build (AVIF → WebP → JPG). Zero JS: é só <picture>. */
export function TelaPicture({ tela, sizes, className = '', priority = false, alt = '' }: TelaPictureProps) {
  return (
    <picture>
      <source type="image/avif" srcSet={tela.avif} sizes={sizes} />
      <source type="image/webp" srcSet={tela.webp} sizes={sizes} />
      <img
        src={tela.src}
        alt={alt}
        width={tela.width}
        height={tela.height}
        decoding="async"
        loading={priority ? 'eager' : 'lazy'}
        {...(priority ? ({ fetchpriority: 'high' } as Record<string, string>) : {})}
        className={`tela ${className}`}
      />
    </picture>
  );
}

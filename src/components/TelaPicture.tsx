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

/** Tela gerada no build (AVIF → WebP → JPG), com janela estreita no celular quando houver. Zero JS. */
export function TelaPicture({ tela, sizes, className = '', priority = false, alt = '' }: TelaPictureProps) {
  const e = tela.estreita;
  return (
    <picture>
      {e && <source media="(max-width: 767px)" type="image/avif" srcSet={e.avif} sizes="100vw" />}
      {e && <source media="(max-width: 767px)" type="image/webp" srcSet={e.webp} sizes="100vw" />}
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

import { getImage } from 'astro:assets';
import type { ImageMetadata } from 'astro';

/** Fundo responsivo: srcsets AVIF/WebP e fallback, gerados no build (astro:assets + sharp). */
export interface FundoResponsivo {
  avif: string;
  webp: string;
  src: string;
  width: number;
  height: number;
}

const LARGURAS = [640, 960, 1280, 1600, 1920];

export async function fundoResponsivo(
  img: ImageMetadata,
  quality = 60
): Promise<FundoResponsivo> {
  const widths = LARGURAS.filter((w) => w <= img.width);
  const [avif, webp] = await Promise.all(
    (['avif', 'webp'] as const).map((format) =>
      getImage({ src: img, widths, format, quality })
    )
  );
  const fallback = await getImage({ src: img, width: 1280, format: 'webp', quality });
  return {
    avif: avif.srcSet.attribute,
    webp: webp.srcSet.attribute,
    src: fallback.src,
    width: img.width,
    height: img.height,
  };
}

let quadro: Promise<FundoResponsivo> | undefined;

/**
 * O quadro do hero (cidade noturna em pinceladas) em srcsets responsivos, memoizado no build:
 * a home usa no hero e nos recortes; hubs, artigos e o rodapé reaproveitam os mesmos arquivos
 * (em cache para quem chega da home) nos recortes de passagem.
 */
export function fundoQuadro(): Promise<FundoResponsivo> {
  quadro ??= import('../assets/326189a758fea0fe0e2da42349b6da943b29ba51.png').then((m) =>
    fundoResponsivo(m.default)
  );
  return quadro;
}

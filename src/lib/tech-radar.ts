import type { BlipView, TechRadarPageProps } from '../components/pages/TechRadarPage';
import { formatDatePtBR } from './format';
import { getNoticias, hrefEdicaoRadar, hrefNoticia, type EdicaoRadarEntry } from './noticias';

/** Edição do tech radar pronta para a página: evidências só com notícias publicadas. Só roda em build. */
export async function edicaoView(e: EdicaoRadarEntry): Promise<NonNullable<TechRadarPageProps['edicao']>> {
  const noticias = new Map((await getNoticias()).map((n) => [n.id, n]));
  const blips: BlipView[] = e.data.blips.map((b) => ({
    id: b.id,
    nome: b.nome,
    quadrante: b.quadrante,
    movimento: b.movimento,
    visoes: b.visoes,
    evidencias: b.noticias.flatMap((s) => {
      const n = noticias.get(s);
      return n ? [{ title: n.data.title, href: hrefNoticia(s) }] : [];
    }),
  }));
  return { id: e.id, title: e.data.title, excerpt: e.data.excerpt, dateFormatted: formatDatePtBR(e.data.date), rascunho: e.data.rascunho, blips };
}

export const outrasEdicoes = (edicoes: EdicaoRadarEntry[], atual?: string) =>
  edicoes
    .filter((e) => e.id !== atual)
    .map((e) => ({ id: e.id, title: e.data.title, href: hrefEdicaoRadar(e.id), dateFormatted: formatDatePtBR(e.data.date) }));

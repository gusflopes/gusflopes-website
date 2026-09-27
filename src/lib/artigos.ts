import { getCollection } from 'astro:content';
import type { InsightArticle } from '../components/pages/InsightsPage';
import type { EixoId } from './eixos';
import { compareIsoDateDesc, formatDatePtBR } from './format';

interface ArtigoOptions {
  /** Filtra por eixo. */
  eixo?: EixoId;
  /** Inclui os itens autorais do Radar (isExternal: false). Default: false. */
  incluirRadarLocal?: boolean;
}

/**
 * Lista de textos autorais pronta para os cards editoriais (InsightsPage),
 * ordenada do mais recente para o mais antigo. Só roda em build (páginas .astro).
 */
export async function getArtigos({ eixo, incluirRadarLocal = false }: ArtigoOptions = {}) {
  const insights = await getCollection('insights', ({ data }) => !eixo || data.eixo === eixo);
  const radar = incluirRadarLocal
    ? await getCollection(
        'radar',
        ({ data }) => !data.isExternal && (!eixo || data.eixo === eixo)
      )
    : [];

  const itens = [
    ...insights.map((entry) => ({ entry, href: `/insights/article/${entry.id}` })),
    ...radar.map((entry) => ({ entry, href: `/radar/article/${entry.id}` })),
  ].sort((a, b) => compareIsoDateDesc(a.entry.data.date, b.entry.data.date));

  return itens.map(
    ({ entry, href }): InsightArticle => ({
      id: `${entry.collection}-${entry.id}`,
      title: entry.data.title,
      excerpt: entry.data.excerpt,
      category: entry.data.category,
      eixo: entry.data.eixo,
      href,
      date: formatDatePtBR(entry.data.date),
      isoDate: entry.data.date,
      duration: entry.data.duration,
      image: entry.data.image,
    })
  );
}

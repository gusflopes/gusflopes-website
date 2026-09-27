import rss, { type RSSFeedItem } from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { EIXOS, type EixoId } from './eixos';

/** Feed RSS dos textos autorais (Insights + Radar local), opcionalmente de um eixo só. */
export async function buildFeed(context: APIContext, eixo?: EixoId) {
  const noEixo = (e: EixoId) => !eixo || e === eixo;
  const insights = await getCollection('insights', ({ data }) => noEixo(data.eixo));
  const radar = await getCollection('radar', ({ data }) => !data.isExternal && noEixo(data.eixo));

  const items: RSSFeedItem[] = [
    ...insights.map((entry) => ({
      title: entry.data.title,
      description: entry.data.excerpt,
      pubDate: new Date(`${entry.data.date}T12:00:00.000Z`),
      link: `/insights/article/${entry.id}`,
      categories: [EIXOS[entry.data.eixo].label, entry.data.category, ...entry.data.tags],
    })),
    ...radar.map((entry) => ({
      title: entry.data.title,
      description: entry.data.excerpt,
      pubDate: new Date(`${entry.data.date}T12:00:00.000Z`),
      link: `/radar/article/${entry.id}`,
      categories: [EIXOS[entry.data.eixo].label, entry.data.category, ...entry.data.tags],
    })),
  ].sort((a, b) => (b.pubDate as Date).getTime() - (a.pubDate as Date).getTime());

  const def = eixo ? EIXOS[eixo] : undefined;
  return rss({
    title: def ? `gusflopes.dev — ${def.label}` : 'gusflopes.dev — Engenharia e negócio',
    description: def
      ? def.descricao
      : 'Engenharia e negócio, partes do mesmo sistema: IA aplicada, engenharia de software e bastidores de projetos reais, por Gustavo Lopes.',
    site: context.site ?? 'https://gusflopes.dev',
    items,
    customData: '<language>pt-BR</language>',
  });
}

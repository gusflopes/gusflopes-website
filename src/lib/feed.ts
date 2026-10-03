import rss, { type RSSFeedItem } from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { publicado } from './publicado';
import type { APIContext } from 'astro';
import { EIXOS, type EixoId } from './eixos';

/** Feed RSS dos textos autorais (Insights + Radar local + edições da newsletter no feed geral), opcionalmente de um eixo só. */
export async function buildFeed(context: APIContext, eixo?: EixoId) {
  const noEixo = (e: EixoId) => !eixo || e === eixo;
  const insights = await getCollection('insights', (e) => publicado(e) && noEixo(e.data.eixo));
  const radar = await getCollection('radar', (e) => publicado(e) && !e.data.isExternal && noEixo(e.data.eixo));
  // Newsletter não tem eixo: só entra no feed geral.
  const edicoes = eixo ? [] : await getCollection('newsletter', publicado);

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
    ...edicoes.map((entry) => ({
      title: `Radar de IA #${entry.data.edicao}: ${entry.data.title}`,
      description: entry.data.excerpt,
      pubDate: new Date(`${entry.data.date}T12:00:00.000Z`),
      link: `/newsletter/${entry.id}`,
      categories: ['Newsletter'],
    })),
  ].sort((a, b) => (b.pubDate as Date).getTime() - (a.pubDate as Date).getTime());

  const def = eixo ? EIXOS[eixo] : undefined;
  return rss({
    title: def ? `gusflopes.dev — ${def.label}` : 'gusflopes.dev — Tecnologia e negócio',
    description: def
      ? def.descricao
      : 'Tecnologia e negócio, partes do mesmo sistema: IA aplicada, engenharia de software e bastidores de projetos reais, por Gustavo Lopes.',
    site: context.site ?? 'https://gusflopes.dev',
    items,
    customData: '<language>pt-BR</language>',
  });
}

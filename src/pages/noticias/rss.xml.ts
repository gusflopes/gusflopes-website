import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getNoticias, hrefNoticia } from '../../lib/noticias';
import { TEMAS } from '../../lib/temas';

/** Feed só das notícias (volume diário): fica fora do feed geral para não afogar os textos autorais. */
export async function GET(context: APIContext) {
  const noticias = (await getNoticias()).slice(0, 100);
  return rss({
    title: 'gusflopes.dev — Notícias',
    description: 'Notícias de IA para empresas, apuradas na fonte e reescritas em português, por Gustavo Lopes e o seu agente de IA.',
    site: context.site ?? 'https://gusflopes.dev',
    items: noticias.map((n) => ({
      title: n.data.title,
      description: n.data.excerpt,
      pubDate: new Date(`${n.data.date}T12:00:00.000Z`),
      link: hrefNoticia(n.id),
      categories: n.data.temas.map((t) => TEMAS[t]),
    })),
    customData: '<language>pt-BR</language>',
  });
}

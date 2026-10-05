import { getCollection } from 'astro:content';
import { publicado } from './publicado';
import type { InsightArticle } from '../components/pages/InsightsPage';
import type { EixoId } from './eixos';
import { compareIsoDateDesc, formatDatePtBR } from './format';
import { telaCapa, telaRetrato, fundoMargem, lombadaImg } from './telas';

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
  const insights = await getCollection('insights', (e) => publicado(e) && (!eixo || e.data.eixo === eixo));
  const radar = incluirRadarLocal
    ? await getCollection(
        'radar',
        (e) => publicado(e) && !e.data.isExternal && (!eixo || e.data.eixo === eixo)
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
      // Capa = tela gerada do slug; a foto de banco do frontmatter fica só como dado.
      tela: telaCapa(entry.collection, entry.id),
      retrato: telaRetrato(entry.collection, entry.id),
      margem: fundoMargem(entry.collection, entry.id),
      lombadas: [0, 1, 2].map((k) => lombadaImg(entry.collection, entry.id, k)),
    })
  );
}

/** O que o fim do artigo precisa para apontar o próximo texto. */
export type ProximoTexto = Pick<InsightArticle, 'title' | 'excerpt' | 'href' | 'eixo' | 'category' | 'date' | 'duration' | 'lombadas'>;

/**
 * Próximo texto para o fim de um artigo: o anterior no tempo dentro do mesmo eixo (quem terminou um texto
 * lê o que veio antes dele); no mais antigo do eixo, volta ao mais recente; eixo com um texto só cai no
 * mais recente do site. Só roda em build.
 */
export async function proximoTexto(colecao: 'insights' | 'radar', id: string, eixo: EixoId): Promise<ProximoTexto | undefined> {
  const chave = `${colecao}-${id}`;
  const escolher = (lista: InsightArticle[]) => {
    const outros = lista.filter((a) => a.id !== chave);
    if (outros.length === 0) return undefined;
    const i = lista.findIndex((a) => a.id === chave);
    return (i >= 0 && lista[i + 1]) || outros[0];
  };
  const p = escolher(await getArtigos({ eixo, incluirRadarLocal: true })) ?? escolher(await getArtigos({ incluirRadarLocal: true }));
  if (!p) return undefined;
  const { title, excerpt, href, category, date, duration, lombadas } = p;
  return { title, excerpt, href, eixo: p.eixo, category, date, duration, lombadas };
}

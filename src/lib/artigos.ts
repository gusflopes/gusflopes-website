import { getCollection } from 'astro:content';
import { publicado } from './publicado';
import type { InsightArticle } from '../components/pages/InsightsPage';
import { EIXO_IDS, type EixoId } from './eixos';
import type { Estacao, PosicaoNaLinha, TrechoLinha } from './linhas';
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
      image: entry.data.image,
    })
  );
}

/** Estação com as tags, para calcular baldeações (só no build). */
type EstacaoComTags = Estacao & { tags: string[] };

/**
 * A rede inteira: todos os textos autorais publicados (Insights + Radar local), cada um
 * na linha do seu eixo, numerados por data dentro da linha. Baldeação = outra linha tem
 * texto com ao menos uma tag em comum — só dado real, nada inferido.
 */
let redeCache: Promise<EstacaoComTags[]> | undefined;
function getRede(): Promise<EstacaoComTags[]> {
  return (redeCache ??= montarRede());
}

async function montarRede(): Promise<EstacaoComTags[]> {
  const insights = await getCollection('insights', publicado);
  const radar = await getCollection('radar', (e) => publicado(e) && !e.data.isExternal);
  const itens = [
    ...insights.map((entry) => ({ entry, href: `/insights/article/${entry.id}` })),
    ...radar.map((entry) => ({ entry, href: `/radar/article/${entry.id}` })),
  ].sort((a, b) => a.entry.data.date.localeCompare(b.entry.data.date) || a.href.localeCompare(b.href));

  const contagem = new Map<EixoId, number>();
  const rede = itens.map(({ entry, href }): EstacaoComTags => {
    const ordem = (contagem.get(entry.data.eixo) ?? 0) + 1;
    contagem.set(entry.data.eixo, ordem);
    return {
      href,
      title: entry.data.title,
      date: formatDatePtBR(entry.data.date),
      isoDate: entry.data.date,
      eixo: entry.data.eixo,
      ordem,
      tags: entry.data.tags ?? [],
    };
  });
  for (const e of rede) {
    e.baldeacao = rede.some((o) => o.eixo !== e.eixo && o.tags.some((t) => e.tags.includes(t)));
  }
  return rede;
}

const semTags = ({ tags: _t, ...e }: EstacaoComTags): Estacao => e;

/** Trechos do mapa da home: as `n` estações mais recentes de cada linha com conteúdo. */
export async function getTrechos(n = 4): Promise<TrechoLinha[]> {
  const rede = await getRede();
  return EIXO_IDS.flatMap((eixo) => {
    const linha = rede.filter((e) => e.eixo === eixo);
    return linha.length
      ? [{ eixo, total: linha.length, estacoes: linha.slice(-n).map(semTags), conectada: linha.some((e) => e.baldeacao) }]
      : [];
  });
}

/** Onde um texto está na sua linha: estações, índice atual e baldeações (até 3). */
export async function getPosicao(href: string): Promise<PosicaoNaLinha | undefined> {
  const rede = await getRede();
  const atual = rede.find((e) => e.href === href);
  if (!atual) return undefined;
  const estacoes = rede.filter((e) => e.eixo === atual.eixo);
  const baldeacoes = rede
    .filter((o) => o.eixo !== atual.eixo)
    .map((o) => ({ o, comum: o.tags.filter((t) => atual.tags.includes(t)).length }))
    .filter(({ comum }) => comum > 0)
    .sort((a, b) => b.comum - a.comum || b.o.isoDate.localeCompare(a.o.isoDate))
    .slice(0, 3)
    .map(({ o }) => semTags(o));
  return {
    eixo: atual.eixo,
    estacoes: estacoes.map(semTags),
    atual: estacoes.indexOf(atual),
    baldeacoes,
  };
}

/**
 * Leitura das coleções da estratégia v2 (Notícias, Análise da semana, Radar) já filtradas por
 * `publicado` e prontas para as páginas. Só roda em build (páginas .astro).
 */
import { getCollection, type CollectionEntry } from 'astro:content';
import { publicado, hoje } from './publicado';
import { politicaNoticias } from '../config/site';
import { compareIsoDateDesc, formatDatePtBR } from './format';
import { semanaIso, rotuloSemana, slugSemana } from './semana';
import { PUBLICO_IDS, type PublicoId, type TemaId } from './temas';

export type NoticiaEntry = CollectionEntry<'noticias'>;
export type AnaliseEntry = CollectionEntry<'analises'>;
export type EdicaoRadarEntry = CollectionEntry<'radar'>;

export const hrefNoticia = (slug: string) => `/noticias/${slug}/`;
export const hrefSemanaNoticias = (semana: string) => `/noticias/semana/${slugSemana(semana)}/`;
export const hrefAnalise = (semana: string) => `/analise/${slugSemana(semana)}/`;
export const hrefEdicaoRadar = (id: string) => `/radar/${id}/`;
/** Blip no radar mais recente (âncora = id do blip). */
export const hrefBlip = (id: string) => `/radar/#${id}`;

/** Linha de notícia no índice (compacta: data, título, fonte e tema). */
export interface NoticiaResumo {
  slug: string;
  href: string;
  title: string;
  excerpt: string;
  /** "16 Nov, 2026". */
  data: string;
  temas: TemaId[];
  /** Públicos com "por que importa" preenchido (o filtro por público). */
  publicos: PublicoId[];
  fonte: string;
  rascunho: boolean;
}

export interface SemanaNoticias {
  semana: string;
  rotulo: string;
  href: string;
  /** Análise publicada daquela semana, se houver. */
  analise?: { href: string; title: string };
  itens: NoticiaResumo[];
}

const porDataDesc = <T extends { data: { date: string; title: string } }>(a: T, b: T) =>
  compareIsoDateDesc(a.data.date, b.data.date) || a.data.title.localeCompare(b.data.title, 'pt-BR');

/**
 * Notícia e análise só entram a partir do início da v2 (A6: sem retroativo). No `pnpm dev` aparecem todas,
 * como o resto dos rascunhos.
 */
const desdeOInicio = (e: { data: { date: string } }) => import.meta.env.DEV || e.data.date >= politicaNoticias.inicio;

export async function getNoticias(): Promise<NoticiaEntry[]> {
  return (await getCollection('noticias', (e) => publicado(e) && desdeOInicio(e))).sort(porDataDesc);
}

export async function getAnalises(): Promise<AnaliseEntry[]> {
  return (await getCollection('analises', (e) => publicado(e) && desdeOInicio(e))).sort(porDataDesc);
}

/** A1: notícia individual fora do índice dos buscadores até `politicaNoticias.noindexAte` (data do build). */
export const noticiaSemIndice = () => hoje < politicaNoticias.noindexAte;

export async function getEdicoesRadar(): Promise<EdicaoRadarEntry[]> {
  return (await getCollection('radar', publicado)).sort(porDataDesc);
}

export const resumoNoticia = (e: NoticiaEntry): NoticiaResumo => ({
  slug: e.id,
  href: hrefNoticia(e.id),
  title: e.data.title,
  excerpt: e.data.excerpt,
  data: formatDatePtBR(e.data.date),
  temas: e.data.temas,
  publicos: PUBLICO_IDS.filter((p) => !!e.data.porQueImporta[p]),
  fonte: e.data.fonte.nome,
  rascunho: e.data.rascunho,
});

/** Notícias agrupadas por semana ISO (mais recente primeiro), com a análise da semana quando existir. */
export async function noticiasPorSemana(noticias?: NoticiaEntry[]): Promise<SemanaNoticias[]> {
  const lista = noticias ?? (await getNoticias());
  const analises = new Map((await getAnalises()).map((a) => [a.data.semana, a]));
  const grupos = new Map<string, NoticiaEntry[]>();
  for (const n of lista) {
    const s = semanaIso(n.data.date);
    grupos.set(s, [...(grupos.get(s) ?? []), n]);
  }
  return [...grupos.entries()]
    .sort(([a], [b]) => b.localeCompare(a))
    .map(([semana, itens]) => {
      const a = analises.get(semana);
      return {
        semana,
        rotulo: rotuloSemana(semana),
        href: hrefSemanaNoticias(semana),
        ...(a ? { analise: { href: hrefAnalise(semana), title: a.data.title } } : {}),
        itens: itens.sort(porDataDesc).map(resumoNoticia),
      };
    });
}

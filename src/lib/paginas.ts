/**
 * Páginas institucionais em markdown (coleção `paginas`). Só roda em build (páginas .astro).
 */
import { getCollection, type CollectionEntry } from 'astro:content';
import { publicado } from './publicado';

export type PaginaEntry = CollectionEntry<'paginas'>;

/** A página publicada com este id (rascunho fica fora do build de produção). */
export async function getPagina(id: string): Promise<PaginaEntry | undefined> {
  return (await getCollection('paginas', (e) => e.id === id && publicado(e)))[0];
}

/**
 * Link do "Sobre": a página /sobre/ quando publicada; enquanto ela estiver em rascunho, a seção "sobre" da home
 * (o destino de antes), para o rodapé e as análises nunca apontarem para uma página que não existe.
 */
export async function hrefSobre(): Promise<string> {
  return (await getPagina('sobre')) ? '/sobre/' : '/#about';
}

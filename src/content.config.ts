import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { EIXO_IDS } from './lib/eixos';

/** Data ISO no frontmatter; a formatação pt-BR acontece no código de renderização. */
const isoDate = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, 'date deve estar no formato ISO YYYY-MM-DD');

/**
 * Tema do texto (o "sobre o quê"). Agrupamento sugerido por eixo:
 * - engenharia: Arquitetura, .NET, DevOps, IA, Agentes, Carreira
 * - negocios:   Estratégia, Vendas & GTM, Operações
 * - bastidores: Casos, Família
 * A lista de filtros das páginas é derivada do conteúdo publicado, não desta enum.
 */
const category = z.enum([
  'Arquitetura',
  '.NET',
  'DevOps',
  'Carreira',
  'IA',
  'Agentes',
  'Estratégia',
  'Vendas & GTM',
  'Operações',
  'Casos',
  'Família',
]);

/** Eixo editorial (o "para quem"). Definições em src/lib/eixos.ts. */
const eixo = z.enum(EIXO_IDS);

/** Tags livres em kebab-case minúsculo (ex.: "claude-code", "mcp", "simples-nacional"). */
const tags = z
  .array(z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, 'tag deve ser kebab-case minúsculo'))
  .default([]);

const radar = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/radar' }),
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    date: isoDate,
    duration: z.string(),
    category,
    eixo,
    tags,
    type: z.enum(['article', 'video']),
    isExternal: z.boolean(),
    link: z.string(),
    source: z.string(),
    image: z.string().url(),
  }),
});

const insights = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/insights' }),
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    date: isoDate,
    duration: z.string(),
    category,
    eixo,
    tags,
    image: z.string().url(),
  }),
});

export const collections = { radar, insights };

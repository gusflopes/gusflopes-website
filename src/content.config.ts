import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { EIXO_IDS } from './lib/eixos';
import { TEMA_IDS, ANEL_IDS, QUADRANTE_IDS, ASSINATURA_IDS, MOVIMENTO_IDS } from './lib/temas';

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

/**
 * Edições da newsletter, espelhadas do repositório de marketing
 * (marketing-brands/gusflopes/content/newsletter/<data>-<slug>/edicao.md).
 * O e-mail sai pelo Substack; o site guarda o arquivo.
 */
const newsletter = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/newsletter' }),
  schema: z.object({
    /** Assunto do e-mail. */
    title: z.string(),
    /** Pré-cabeçalho (subtítulo no Substack). */
    excerpt: z.string(),
    edicao: z.number().int().positive(),
    date: isoDate,
    duration: z.string(),
    image: z.string().url(),
    /** Link da edição no Substack, preenchido depois do envio. */
    substackUrl: z.string().url().optional(),
  }),
});

// ---------------------------------------------------------------------------------------------
// Estratégia v2 (16/11/2026): Notícias, Análise da semana e Tech radar. Quem escreve é o agente de
// marketing, a partir da base de conhecimento (mkt-branding-gusflopes: content/base). Contrato em
// NEXT_STEPS.md ("Contrato com o agente de marketing").
// ---------------------------------------------------------------------------------------------

/** Slug em kebab-case (o mesmo do item na base de conhecimento). */
const slug = z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, 'slug deve ser kebab-case minúsculo');

/** Rascunho: aparece no `pnpm dev` com a marca "Rascunho", nunca no build de produção (src/lib/publicado.ts). */
const rascunho = z.boolean().default(false);

/** Imagem opcional: só capa própria ou imagem oficial de imprensa, com crédito. Nunca imagem da fonte sem licença. */
const imagemOpcional = z
  .object({
    src: z.string().url(),
    alt: z.string(),
    /** Ex.: "Divulgação Salesforce". Aparece como "📷 <crédito>". */
    credito: z.string().optional(),
  })
  .optional();

const fonte = z.object({
  /** Nome de quem publicou (ex.: "Salesforce", "AWS", "Exame"). */
  nome: z.string(),
  url: z.string().url(),
  /** Data em que a fonte publicou (vira o "em dd/mm"). */
  data: isoDate,
  /** primaria = quem anunciou; imprensa = veículo; agregador = só pista, nunca a fonte principal. */
  tipo: z.enum(['primaria', 'imprensa', 'agregador']).default('primaria'),
});

/**
 * Notícias: volume diário (~25–40 por semana), reescritas com as palavras da casa e com a fonte
 * ("conforme publicado em…"). Arquivo em src/content/noticias/<AAAA>/<MM>/<slug>.md (ano e mês da
 * publicação no site); rota /noticias/<slug>/ — o slug é único porque vem da base.
 */
const noticias = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/noticias',
    generateId: ({ entry }) => entry.replace(/\.md$/, '').split('/').pop()!,
  }),
  schema: z
    .object({
      /** Até ~70 caracteres: sujeito + verbo + o que muda. */
      title: z.string().max(100),
      /** Lead: uma frase, até ~40 palavras (quem, o quê, quando, para quem importa). */
      excerpt: z.string().max(320),
      /** Data de publicação no site. */
      date: isoDate,
      /** 1 a 3 temas da taxonomia; o primeiro é o principal. */
      temas: z.array(z.enum(TEMA_IDS)).min(1).max(3),
      /** Ferramentas e práticas (ids da taxonomia): ligam a notícia ao tech radar. */
      ferramentas: z.array(slug).default([]),
      /** "Por que importa": uma linha por público com relevância ≥ 2. Pelo menos um. */
      porQueImporta: z
        .object({ A: z.string().optional(), B: z.string().optional(), C: z.string().optional(), D: z.string().optional() })
        .refine((o) => Object.values(o).some(Boolean), 'porQueImporta precisa de ao menos um público'),
      /** Fonte principal: a primária sempre que existir. */
      fonte,
      outrasFontes: z.array(fonte).default([]),
      /** Data em que o agente conferiu o fato na fonte. */
      apuradoEm: isoDate,
      /** Slug do item na base de conhecimento (vínculo de volta: vinculos.noticias). */
      base: slug,
      /** Correções visíveis na página ("corrigido em dd/mm"). */
      correcoes: z.array(z.object({ data: isoDate, texto: z.string() })).default([]),
      image: imagemOpcional,
      rascunho,
    }),
});

/**
 * Análise da semana: tese + ~5 temas interligados, site + newsletter, na sexta.
 * Arquivo em src/content/analises/<aaaa>-w<ss>.md; rota /analise/<aaaa>-w<ss>/.
 */
const analises = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/analises' }),
  schema: z
    .object({
      /** A tese da semana. */
      title: z.string(),
      /** Subtítulo. */
      excerpt: z.string(),
      /** Semana ISO coberta, ex.: "2026-W46". */
      semana: z.string().regex(/^\d{4}-W\d{2}$/, 'semana deve ser AAAA-Wss (ISO)'),
      /** Data de publicação no site (a sexta). */
      date: isoDate,
      duration: z.string(),
      /** "A semana em 3 linhas". */
      emTresLinhas: z.array(z.string()).min(1).max(3),
      /** Os temas da análise, na ordem do texto, com as notícias (slugs) que cada um cita. */
      temas: z
        .array(z.object({ titulo: z.string(), tema: z.enum(TEMA_IDS), noticias: z.array(slug).default([]) }))
        .min(1)
        .max(6),
      /** Assinatura (playbook §2.5). `agente-revisado` exige `revisadoEm`. */
      assinatura: z.enum(ASSINATURA_IDS),
      revisadoEm: isoDate.optional(),
      /** Itens da base usados (slugs). */
      base: z.array(slug).default([]),
      /** Número da edição da newsletter que levou este texto, quando houver. */
      newsletter: z.number().int().positive().optional(),
      image: imagemOpcional,
      rascunho,
    })
    .refine((a) => a.assinatura !== 'agente-revisado' || !!a.revisadoEm, {
      message: 'assinatura agente-revisado exige revisadoEm',
      path: ['revisadoEm'],
    }),
});

const posicao = z.object({ anel: z.enum(ANEL_IDS), texto: z.string() });

/**
 * Tech radar: uma edição por arquivo (src/content/tech-radar/<aaaa>-<mm>.md; corpo = apresentação),
 * com os blips (ferramentas e práticas) e o anel em cada uma das 3 visões. Rota /tech-radar/ (edição
 * mais recente) e /tech-radar/<aaaa>-<mm>/.
 */
const techRadar = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/tech-radar' }),
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    date: isoDate,
    blips: z
      .array(
        z.object({
          /** Id da ferramenta/prática na taxonomia (ex.: "mcp", "claude-code"). */
          id: slug,
          nome: z.string(),
          quadrante: z.enum(QUADRANTE_IDS),
          movimento: z.enum(MOVIMENTO_IDS).default('novo'),
          /** Anel e justificativa em cada visão; a ferramenta pode ficar fora de uma visão. */
          visoes: z
            .object({ tecnologia: posicao.optional(), 'ti-enxuta': posicao.optional(), 'sem-ti': posicao.optional() })
            .refine((o) => Object.values(o).some(Boolean), 'o blip precisa estar em ao menos uma visão'),
          /** Evidência: notícias do site (slugs) e itens da base (slugs). */
          noticias: z.array(slug).default([]),
          base: z.array(slug).default([]),
        })
      )
      .default([]),
    rascunho,
  }),
});

export const collections = { radar, insights, newsletter, noticias, analises, techRadar };

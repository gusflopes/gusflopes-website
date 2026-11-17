/**
 * Eixos editoriais do gusflopes.dev — fonte única para schema, rotas, filtros e labels.
 *
 * Desde 16/11/2026 (recalibração v2) os eixos saíram do menu: o filtro de Notícias e Artigos é por público
 * (src/lib/temas.ts: PUBLICOS) e Bastidores virou tag em Artigos. O campo `eixo` continua no frontmatter dos
 * artigos e as páginas /engenharia, /negocios e /bastidores continuam no ar como páginas de filtro (links antigos).
 *
 * O eixo responde "para quem é este texto"; a categoria (tema) responde "sobre o quê".
 * Radar (curadoria) e Insights (autoral) continuam sendo formatos, ortogonais ao eixo.
 * Ver docs/revisao-site-2026-09.md (seção "Arquitetura editorial").
 */

import type { PublicoId } from './temas';

export const EIXO_IDS = ['engenharia', 'negocios', 'bastidores'] as const;

export type EixoId = (typeof EIXO_IDS)[number];

export interface Eixo {
  id: EixoId;
  /** Rótulo completo (títulos de página, nav desktop). */
  label: string;
  /** Rótulo curto (badges, pills). */
  shortLabel: string;
  href: string;
  /** Uma linha: para quem é o eixo. */
  publico: string;
  /** Deck da página do eixo. */
  descricao: string;
}

export const EIXOS: Record<EixoId, Eixo> = {
  engenharia: {
    id: 'engenharia',
    label: 'Engenharia & IA',
    shortLabel: 'Engenharia & IA',
    href: '/engenharia',
    publico: 'Para quem constrói: engenheiros, tech leads e arquitetos.',
    descricao:
      'Agentes de IA, coding agents, modelos e arquitetura de software — testados na prática, com código e com critério.',
  },
  negocios: {
    id: 'negocios',
    label: 'Negócios',
    shortLabel: 'Negócios',
    href: '/negocios',
    publico: 'Para quem decide: empresários, gestores e escritórios.',
    descricao:
      'IA aplicada à economia real: vendas, operação, go-to-market e decisões com números — sem hype e sem juridiquês.',
  },
  bastidores: {
    id: 'bastidores',
    label: 'Bastidores',
    shortLabel: 'Bastidores',
    href: '/bastidores',
    publico: 'Para quem quer ver funcionando: projetos reais, do problema ao deploy.',
    descricao:
      'Relatos de projetos reais construídos com IA — o que funcionou, o que quebrou e quanto custou. Inclui a série em família: ensinando meu filho a programar com IA.',
  },
};

/**
 * Público padrão de um artigo pelo eixo, quando o frontmatter não traz `publicos`. Mapeamento provisório
 * (16/11/2026), a revisar pelo Gustavo: Engenharia & IA fala com liderança de tecnologia e quem executa;
 * Negócios, com a empresa com TI enxuta e a sem TI; Bastidores são relatos de construção (técnicos).
 */
export const PUBLICOS_DO_EIXO: Record<EixoId, PublicoId[]> = {
  engenharia: ['A', 'B'],
  negocios: ['C', 'D'],
  bastidores: ['A', 'B'],
};

export const EIXO_LIST: Eixo[] = EIXO_IDS.map((id) => EIXOS[id]);

export function isEixoId(value: string): value is EixoId {
  return (EIXO_IDS as readonly string[]).includes(value);
}

/**
 * Eixos editoriais do gusflopes.dev — fonte única para schema, rotas, filtros e labels.
 *
 * O eixo responde "para quem é este texto"; a categoria (tema) responde "sobre o quê".
 * Radar (curadoria) e Insights (autoral) continuam sendo formatos, ortogonais ao eixo.
 * Ver docs/revisao-site-2026-09.md (seção "Arquitetura editorial").
 */

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

export const EIXO_LIST: Eixo[] = EIXO_IDS.map((id) => EIXOS[id]);

export function isEixoId(value: string): value is EixoId {
  return (EIXO_IDS as readonly string[]).includes(value);
}

/**
 * Campo do quadro de cada eixo (rodada 5): a cor de apoio que marca o eixo nos hubs (célula de
 * data, frase de apoio) e na leitura (marcadores de seção). Frio para quem constrói, quente para
 * quem decide, ardósia para os bastidores. Classes completas para o Tailwind encontrar.
 * Contraste do texto sobre o campo: papel em petróleo escuro 7:1, papel em ferrugem 6,4:1,
 * azul-escuro em ardósia clara 5,6:1.
 */
export const EIXO_CAMPO: Record<EixoId, { campo: string; texto: string }> = {
  engenharia: { campo: 'bg-petroleo-escuro', texto: 'text-papel' },
  negocios: { campo: 'bg-ferrugem', texto: 'text-papel' },
  bastidores: { campo: 'bg-ardosia-clara', texto: 'text-azul' },
};

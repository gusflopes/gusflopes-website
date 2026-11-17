/**
 * Vocabulário da estratégia v2 (16/11/2026) usado por Notícias, Análise da semana, Radar e Artigos.
 *
 * Os ids de TEMAS e as ferramentas/práticas vêm da taxonomia da base de conhecimento do marketing
 * (mkt-branding-gusflopes: content/base/taxonomia.yaml). O site guarda só os temas (para validar o
 * frontmatter e dar rótulo); se a taxonomia ganhar um tema, ele entra aqui no mesmo dia.
 * Não renomeie um id em uso: o mesmo id está nos itens da base e nas URLs de filtro.
 */

export const TEMA_IDS = [
  // "agentes" foi dividido em dois em 16/11/2026 (decisão A7 do Gustavo; revisão da matriz em 20/12):
  // agente fazendo trabalho de negócio × agente no ciclo de desenvolvimento. Nenhum conteúdo publicado usava o id antigo.
  'agentes-negocio',
  'agentes-engenharia',
  'contexto-e-metodo',
  'engenharia-de-software',
  'modelos',
  'plataformas',
  'custo-e-precificacao',
  'governanca-e-seguranca',
  'regulacao',
  'fiscal-br',
  'adocao-e-mercado',
  'areas-de-negocio',
] as const;

export type TemaId = (typeof TEMA_IDS)[number];

/** Rótulo curto de cada tema (metadado e filtro). */
export const TEMAS: Record<TemaId, string> = {
  'agentes-negocio': 'Agentes no negócio',
  'agentes-engenharia': 'Agentes na engenharia',
  'contexto-e-metodo': 'Contexto e método',
  'engenharia-de-software': 'Engenharia de software',
  modelos: 'Modelos',
  plataformas: 'Plataformas e suítes',
  'custo-e-precificacao': 'Custo e preço',
  'governanca-e-seguranca': 'Governança e segurança',
  regulacao: 'Regulação',
  'fiscal-br': 'Fiscal e tributário',
  'adocao-e-mercado': 'Adoção e mercado',
  'areas-de-negocio': 'Áreas de negócio',
};

/** Públicos da estratégia v2, em ordem de prioridade. */
export const PUBLICO_IDS = ['A', 'B', 'C', 'D'] as const;
export type PublicoId = (typeof PUBLICO_IDS)[number];

/** Rótulo do público no "Por que importa" das notícias e nos filtros de Notícias e Artigos. */
export const PUBLICOS: Record<PublicoId, string> = {
  A: 'Liderança',
  B: 'Quem executa',
  C: 'Empresa com TI enxuta',
  D: 'Empresa sem TI',
};

/** Público na URL dos filtros (`?publico=quem-executa`). Não renomeie: links de fora usam estes valores. */
export const PUBLICO_SLUGS: Record<PublicoId, string> = {
  A: 'lideranca',
  B: 'quem-executa',
  C: 'ti-enxuta',
  D: 'sem-ti',
};

export const publicoDoSlug = (slug: string | null): PublicoId | undefined =>
  PUBLICO_IDS.find((id) => PUBLICO_SLUGS[id] === slug);

/** Visões do radar: Tecnologia (A + B), Empresa com TI enxuta (C), Empresa sem TI (D). */
export const VISAO_IDS = ['tecnologia', 'ti-enxuta', 'sem-ti'] as const;
export type VisaoId = (typeof VISAO_IDS)[number];

export const VISOES: Record<VisaoId, { label: string; publico: string }> = {
  tecnologia: { label: 'Tecnologia', publico: 'Liderança de tecnologia e quem executa' },
  'ti-enxuta': { label: 'Empresa com TI enxuta', publico: 'Tem CTO ou responsável de TI e uma equipe pequena' },
  'sem-ti': { label: 'Empresa sem TI', publico: 'Contrata prestadores para a tecnologia' },
};

export const ANEL_IDS = ['adotar', 'experimentar', 'avaliar', 'evitar'] as const;
export type AnelId = (typeof ANEL_IDS)[number];

export const ANEIS: Record<AnelId, string> = {
  adotar: 'Adotar',
  experimentar: 'Experimentar',
  avaliar: 'Avaliar',
  evitar: 'Evitar',
};

/** Critério de cada anel por visão (playbook da estratégia v2, §7.1). */
export const CRITERIO_ANEL: Record<VisaoId, Record<AnelId, string>> = {
  tecnologia: {
    adotar: 'Disponível em GA, com casos de produção de fontes independentes e custo e limites conhecidos.',
    experimentar: 'GA ou beta sólido, com casos aparecendo: vale um piloto com teto de custo e prazo.',
    avaliar: 'Preview ou promessa forte com pouca evidência: acompanhar.',
    evitar: 'Lock-in sem saída, custo imprevisível, falha documentada ou risco regulatório maior que o ganho.',
  },
  'ti-enxuta': {
    adotar: 'Já vem na ferramenta que a empresa tem ou custa pouco, configura sem time grande e o risco de dados é conhecido.',
    experimentar: 'Piloto de 30 dias com uma área e um dono definido.',
    avaliar: 'Ler e esperar o fornecedor estabilizar.',
    evitar: 'Exige equipe que a empresa não tem, ou dados sensíveis sem controle.',
  },
  'sem-ti': {
    adotar: 'Usa direto, sem integração, com preço claro em reais e suporte no Brasil.',
    experimentar: 'Pedir ao prestador um teste com escopo fechado.',
    avaliar: 'Só saber que existe.',
    evitar: 'Promessa de "substitui o profissional", ou ferramenta sem dono nem suporte.',
  },
};

export const QUADRANTE_IDS = ['tecnica', 'ferramenta', 'plataforma', 'modelo'] as const;
export type QuadranteId = (typeof QUADRANTE_IDS)[number];

/** Quadrantes do radar (rótulo no plural, como no Technology Radar da Thoughtworks). */
export const QUADRANTES: Record<QuadranteId, string> = {
  tecnica: 'Técnicas',
  ferramenta: 'Ferramentas',
  plataforma: 'Plataformas',
  modelo: 'Modelos',
};

/** Tipo de edição do radar: trimestral (cheia) ou ajuste mensal. */
export const EDICAO_RADAR_IDS = ['trimestral', 'ajuste'] as const;
export type EdicaoRadarId = (typeof EDICAO_RADAR_IDS)[number];
export const EDICOES_RADAR: Record<EdicaoRadarId, string> = {
  trimestral: 'Edição trimestral',
  ajuste: 'Ajuste mensal',
};

export const MOVIMENTO_IDS = ['novo', 'subiu', 'desceu', 'igual'] as const;
export type MovimentoId = (typeof MOVIMENTO_IDS)[number];

export const MOVIMENTOS: Record<MovimentoId, string> = {
  novo: 'Novo',
  subiu: 'Subiu',
  desceu: 'Desceu',
  igual: 'Sem mudança',
};

/**
 * Assinatura de notícias e análises (playbook §2.5): nunca "Gustavo Lopes" num texto que ele não escreveu nem leu.
 * Texto aprovado pelo Gustavo em 16/11/2026 (A8): "Agente de IA do Gustavo Lopes · Não revisado" ou
 * "· Revisado por Gustavo em dd/mm".
 */
export const ASSINATURA_IDS = ['gustavo', 'agente-revisado', 'agente'] as const;
export type AssinaturaId = (typeof ASSINATURA_IDS)[number];

export const AUTOR_AGENTE = 'Agente de IA do Gustavo Lopes';

/** Linha de assinatura; `revisadoEm` em "dd/mm". */
export function textoAssinatura(assinatura: AssinaturaId, revisadoEm?: string): { autor: string; nota?: string } {
  if (assinatura === 'gustavo') return { autor: 'Gustavo Lopes', nota: 'Pesquisa e rascunho feitos com o meu agente de IA.' };
  if (assinatura === 'agente-revisado') return { autor: AUTOR_AGENTE, nota: `Revisado por Gustavo em ${revisadoEm}` };
  return { autor: AUTOR_AGENTE, nota: 'Não revisado' };
}

/** Quem assina o texto para os metadados (JSON-LD e article:author): o Gustavo só quando a assinatura é dele. */
export const autoriaDe = (assinatura: AssinaturaId): 'gustavo' | 'site' => (assinatura === 'gustavo' ? 'gustavo' : 'site');

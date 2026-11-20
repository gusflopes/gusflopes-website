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

/**
 * Perfis de empresa do Radar (19/11/2026, decisão do Gustavo): o radar tem duas etapas, o diagnóstico do perfil e o
 * radar lido para o perfil. O eixo é o papel do software em como a empresa gera valor, não o tamanho nem o setor:
 * em DDD, se a tecnologia é o domínio central ou um subdomínio de suporte/genérico; no Wardley Map, se a empresa
 * constrói o componente que atende o cliente (gênese, sob medida) ou compra produto e commodity; em DevOps, quem
 * constrói e quem opera. Perfil não é estágio de maturidade: ficar em `suporte` ou `contratada` pode ser a escolha
 * econômica certa, e mesmo assim agentes de IA em processos de negócio dão resultado ali.
 * Substituiu as visões de 16/11 (tecnologia / ti-enxuta / sem-ti), que misturavam papel de pessoa com tipo de empresa.
 * O campo no frontmatter continua `visoes`; o hash da página é `#perfil=<id>` (aceita `#visao=` antigo).
 */
export const VISAO_IDS = ['nativa', 'diferencial', 'suporte', 'contratada'] as const;
export type VisaoId = (typeof VISAO_IDS)[number];

export interface Perfil {
  /** Rótulo da aba. */
  label: string;
  /** Uma linha: o que o software é para a empresa. */
  tese: string;
  /** Exemplos de empresa. */
  exemplos: string;
  /** Leitura em DDD. */
  ddd: string;
  /** Leitura no Wardley Map. */
  wardley: string;
  /** Quem constrói e quem opera (DevOps, Team Topologies). */
  operacao: string;
  /** O que muda com IA neste perfil. */
  ia: string;
}

export const VISOES: Record<VisaoId, Perfil> = {
  nativa: {
    label: 'Nativa digital',
    tese: 'O software é o produto: se ele para, a receita para.',
    exemplos: 'SaaS, fintech, marketplace, empresa de software.',
    ddd: 'A tecnologia é o próprio domínio central.',
    wardley: 'Constrói o que diferencia (gênese e sob medida) e compra commodity: nuvem, pagamento, autenticação.',
    operacao: 'Times de produto constroem e operam o que escrevem; deploy contínuo, medido pelas métricas DORA.',
    ia: 'IA entra no produto e no ciclo de desenvolvimento: agentes de engenharia, avaliação, custo por uso.',
  },
  diferencial: {
    label: 'Digital como diferencial',
    tese: 'O negócio é físico ou financeiro, mas a empresa escolheu competir com software próprio.',
    exemplos: 'Banco, seguradora, varejo com app e preço próprios, indústria com plataforma para o cliente.',
    ddd: 'O domínio central é o negócio; o software próprio está onde a empresa se diferencia.',
    wardley: 'Dois ritmos: o núcleo (core, ERP) é produto comprado e muda devagar; os produtos digitais em volta são sob medida.',
    operacao: 'Times de produto no digital, TI e fornecedores no núcleo; integração, segurança e auditoria são o trabalho difícil.',
    ia: 'IA tem de passar pelo legado e pela governança: acesso por papel, dado sensível fora do modelo, trilha de auditoria.',
  },
  suporte: {
    label: 'TI de suporte',
    tese: 'A empresa tem TI, mas para manter a operação, não para competir com software.',
    exemplos: 'Indústria, distribuidora, rede de serviços, escritório, hospital de porte médio.',
    ddd: 'A tecnologia é subdomínio de suporte ou genérico: necessária, mas não é onde a empresa ganha.',
    wardley: 'Quase tudo é produto ou commodity: ERP, CRM, suíte de escritório; construir sob medida raramente compensa.',
    operacao: 'TI interna pequena, por projeto e chamado: configura, integra e mantém; mede custo e disponibilidade.',
    ia: 'Desenvolvimento tradicional pode não compensar, mas agentes sobre as ferramentas que já existem automatizam processos de negócio sem time de software.',
  },
  contratada: {
    label: 'Tecnologia contratada',
    tese: 'Não há time de tecnologia: tudo vem de fornecedor.',
    exemplos: 'Comércio, clínica, construtora, escritório pequeno, prestador de serviço.',
    ddd: 'Toda tecnologia é subdomínio genérico: problema resolvido, comprado pronto.',
    wardley: 'Só commodity e produto: sistema de gestão na nuvem, contador, agência, prestador.',
    operacao: 'Fornecedores constroem e operam; a decisão de tecnologia é uma decisão de compra e de contrato.',
    ia: 'Assistentes e agentes prontos já resolvem tarefas do dia a dia; a pergunta é o que exigir do fornecedor e que dado expor.',
  },
};

export const ANEL_IDS = ['adotar', 'experimentar', 'avaliar', 'evitar'] as const;
export type AnelId = (typeof ANEL_IDS)[number];

export const ANEIS: Record<AnelId, string> = {
  adotar: 'Adotar',
  experimentar: 'Experimentar',
  avaliar: 'Avaliar',
  evitar: 'Evitar',
};

/** Critério de cada anel por perfil: o mesmo anel quer dizer coisa diferente para quem constrói, configura ou compra. */
export const CRITERIO_ANEL: Record<VisaoId, Record<AnelId, string>> = {
  nativa: {
    adotar: 'Disponível em GA, com casos de produção de fontes independentes e custo e limites conhecidos: entra na stack.',
    experimentar: 'GA ou beta sólido, com casos aparecendo: vale um piloto com teto de custo e prazo.',
    avaliar: 'Preview ou promessa forte com pouca evidência: acompanhar.',
    evitar: 'Lock-in sem saída, custo imprevisível, falha documentada ou risco regulatório maior que o ganho.',
  },
  diferencial: {
    adotar: 'Em GA, passa pelo crivo de segurança e auditoria e conversa com o legado: entra nos produtos digitais.',
    experimentar: 'Piloto num produto digital, longe do sistema central, com dono, teto de custo e critério de aceite.',
    avaliar: 'Acompanhar até aparecer caso parecido em empresa com legado ou regulada.',
    evitar: 'Exige mexer no sistema central sem ganho claro, ou expõe dado sensível sem controle.',
  },
  suporte: {
    adotar: 'Já vem na ferramenta que a empresa tem ou custa pouco, configura sem time de desenvolvimento e o risco de dados é conhecido.',
    experimentar: 'Piloto de 30 dias com uma área, um processo e um dono.',
    avaliar: 'Ler e esperar o fornecedor estabilizar.',
    evitar: 'Exige time de desenvolvimento que a empresa não tem, ou dados sensíveis sem controle.',
  },
  contratada: {
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

/**
 * Configuração central do site gusflopes.dev.
 * Fonte única de verdade para nome, contato, redes sociais e newsletter.
 * Importada pelos componentes React (Header, Footer, Hero, NewsletterForm, Services).
 */

export const site = {
  name: "Gustavo Lopes",
  shortName: "gusflopes.dev",
  url: "https://gusflopes.dev",
  email: "gustavo@gusflopes.dev",
  description:
    "Engenharia e negócio, partes do mesmo sistema: arquitetura, plataformas e IA aplicada por Gustavo Lopes.",
} as const;

export const author = {
  name: "Gustavo Lopes",
  role: "Tech Lead & Arquiteto de Software",
  bio: "Tech Lead e Arquiteto de Software. Conecto estratégia, arquitetura e fluxo de entrega para transformar complexidade de negócio em sistemas que evoluem.",
} as const;

export const socials = {
  // Perfil verificado.
  github: "https://github.com/gusflopes",
  // TODO(gusflopes): confirmar o handle real do LinkedIn — "gusflopes" é uma
  // suposição baseada nos demais perfis; ajustar aqui se for diferente.
  linkedin: "https://www.linkedin.com/in/gusflopes",
} as const;

export const newsletter = {
  name: "Newsletter",
  pitch:
    "Análises sobre engenharia de software, estratégia e o impacto real da IA.",
  ctaLabel: "Assinar Newsletter",
  // TODO(gusflopes): criar a conta no Buttondown (https://buttondown.com) com o
  // username "gusflopes" — ou trocar esta action pelo endpoint do provedor
  // escolhido (o formulário faz POST padrão com o campo "email").
  action: "https://buttondown.com/api/emails/embed-subscribe/gusflopes",
} as const;

/**
 * Projetos próprios que o site promove (cross-promo). A Reforma Tributária tem
 * landing própria; aqui ela aparece só como case técnico/de negócio (eixo Bastidores).
 */
export const projetos = {
  reforma: {
    nome: "Simulador Reforma Tributária",
    url: "https://reforma-tributaria.gusflopes.dev",
    mcpUrl: "https://mcp.gusflopes.dev/rt2026",
    // Campanha ativa na landing — trocar quando a campanha mudar (ex.: após 30/11/2026).
    campanha: "simples-30-09",
  },
} as const;

/**
 * Anexa UTM padronizada a um link de saída do site.
 * A landing da reforma lê utm_source/medium/campaign/content e grava junto do lead.
 * `content` identifica o ponto de clique (ex.: "home-eixos", "footer", "bastidores-hub").
 */
export function comUtm(url: string, campaign: string, content: string): string {
  const u = new URL(url);
  u.searchParams.set("utm_source", "gusflopes.dev");
  u.searchParams.set("utm_medium", "site");
  u.searchParams.set("utm_campaign", campaign);
  u.searchParams.set("utm_content", content);
  return u.toString();
}

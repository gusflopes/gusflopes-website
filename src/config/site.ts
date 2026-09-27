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
  role: "Especialista em Tecnologia e Negócios",
  bio: "Especialista em Tecnologia e Negócios. Advogado, contador e engenheiro de software: aplico Direito e Contabilidade para resolver problemas de negócio com tecnologia e IA.",
} as const;

export const socials = {
  // Perfis confirmados pelo Gustavo (26/09/2026).
  linkedin: "https://www.linkedin.com/in/gusflopes/",
  instagram: "https://www.instagram.com/gusflopes/",
  youtube: "https://www.youtube.com/@gusflopes",
  x: "https://x.com/gusflopes",
  github: "https://github.com/gusflopes",
} as const;

export const newsletter = {
  name: "Newsletter",
  pitch:
    "Análises sobre engenharia de software, estratégia e o impacto real da IA.",
  ctaLabel: "Assinar Newsletter",
  // Inscrição feita na landing da reforma tributária (primeira newsletter de gusflopes.dev).
  url: "https://reforma-tributaria.gusflopes.dev/?utm_source=gusflopes.dev&utm_medium=site&utm_campaign=newsletter",
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

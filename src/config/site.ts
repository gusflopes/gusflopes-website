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
  // Handle confirmado no perfil público do Bluesky (02/10/2026).
  bluesky: "https://bsky.app/profile/gusflopes.dev",
  github: "https://github.com/gusflopes",
} as const;

export const newsletter = {
  name: "Newsletter",
  pitch:
    "Análises sobre engenharia de software, estratégia e o impacto real da IA.",
  ctaLabel: "Assinar Newsletter",
  // TODO(Gustavo): URL da publicação no Substack, sem barra final (ex.: "https://gusflopes.substack.com").
  // Vazia, o botão leva para /newsletter (arquivo das edições) e a inscrição aparece como "em breve".
  // Preenchida, o botão vai para <substack>/subscribe, /newsletter mostra o formulário embutido
  // e o ícone do Substack entra nas redes.
  substack: "",
} as const;

/** Link de inscrição com UTM do ponto de clique; sem Substack configurado, cai no arquivo do site. */
export function linkInscricao(content: string): string {
  if (!newsletter.substack) return "/newsletter";
  return comUtm(`${newsletter.substack}/subscribe`, "newsletter", content);
}

/**
 * Projetos próprios que o site promove (cross-promo). A Reforma Tributária tem
 * landing própria; aqui ela aparece só como case técnico/de negócio (eixo Bastidores).
 */
export const projetos = {
  reforma: {
    nome: "Simulador Reforma Tributária",
    // A ferramenta (diagnóstico + simulação no motor oficial), não a campanha do Simples da landing.
    url: "https://reforma-tributaria.gusflopes.dev/simulador",
    mcpUrl: "https://mcp.gusflopes.dev/rt2026",
    // Artigo do site que explica o servidor MCP por dentro.
    artigo: "/insights/article/servidor-mcp-calculadora-oficial-receita-rt2026",
    campanha: "simulador",
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

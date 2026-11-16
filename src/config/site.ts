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
    "Tecnologia e negócio, partes do mesmo sistema: arquitetura, plataformas e IA aplicada por Gustavo Lopes.",
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
    "Toda semana: o que mudou em IA, por que importa para quem trabalha ou empreende, e uma coisa prática para testar. Sem hype.",
  ctaLabel: "Assinar Newsletter",
  // Publicação no Substack (02/10/2026), sem barra final: entra nas redes e recebe a lista confirmada.
  // A inscrição em si acontece no site (InscricaoForm → /api/subscribe, lista própria no D1).
  substack: "https://gusflopes.substack.com",
} as const;

/**
 * Projetos próprios que o site promove (cross-promo). A Reforma Tributária tem
 * landing própria; aqui ela aparece só como case técnico/de negócio (eixo Bastidores).
 */
export const projetos = {
  reforma: {
    nome: "Simulador da Reforma Tributária",
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

/**
 * Política de publicação das Notícias e da Análise da semana (estratégia v2, decisões do Gustavo em 16/11/2026).
 * As datas são ISO (AAAA-MM-DD) e comparadas com a data do build no fuso do autor (src/lib/publicado.ts).
 */
export const politicaNoticias = {
  /**
   * A6 — o site começa limpo: notícia ou análise com `date` anterior a esta data nunca entra no build de
   * produção, mesmo sem `rascunho` (sem notícias retroativas dos itens que já estavam na base).
   */
  inicio: "2026-11-23",
  /**
   * A1 — enquanto a data do build for anterior a esta, toda notícia individual (/noticias/<slug>/) sai com
   * `noindex, follow` e fora do sitemap. A página da semana (/noticias/semana/…), o índice /noticias/ e a
   * análise continuam indexados. 2027-01-18 = 8 semanas depois de 23/11. Para estender, mude a data; ao passar
   * dela, o próximo deploy indexa todas as notícias publicadas (decidir antes a regra de depois, ex.: só corpo
   * com 150 palavras ou mais).
   */
  noindexAte: "2027-01-18",
} as const;

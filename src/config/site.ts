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
  // Inscrição feita na landing da reforma tributária (primeira newsletter de gusflopes.dev).
  url: "https://reforma-tributaria.gusflopes.dev/?utm_source=gusflopes.dev&utm_medium=site&utm_campaign=newsletter",
} as const;

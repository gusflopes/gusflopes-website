---
title: "Shopify entrega 11 vezes mais no mobile e põe agente na revisão de segurança"
excerpt: "A Shopify Engineering contou em 18/11/2026 que o time mobile, com código por agentes, entrega 11 vezes mais que um ano antes e passou a revisar segurança com agentes guiados por skills."
date: "2026-11-19"
temas: ["agentes-engenharia", "contexto-e-metodo", "governanca-e-seguranca"]
ferramentas: ["agent-skills", "shopify"]
porQueImporta:
  B: "Quando o volume de código multiplica, a revisão linha a linha deixa de escalar; o modelo da Shopify é pôr o conhecimento de segurança em skills versionadas e comparar cada mudança com o último mapa de ataque aceito."
  A: "O ganho de volume vem acompanhado de um custo novo de revisão; a pergunta ao time é quem revisa segurança do código que o agente escreve, e com que critério."
fonte:
  nome: "Shopify Engineering"
  url: "https://shopify.engineering/secure-agentic-apps"
  data: "2026-11-18"
  tipo: primaria
outrasFontes:
  - nome: "InfoQ"
    url: "https://www.infoq.com/news/2026/11/shopify-remote-ai-dev/"
    data: "2026-11-18"
    tipo: imprensa
apuradoEm: "2026-11-19"
base: "shopify-mobile-11x-e-revisao-de-seguranca-por-agente"
correcoes: []
assinatura: agente
rascunho: false
---

A Shopify Engineering publicou em 18/11/2026 que o time mobile, com código escrito por agentes, entrega 11 vezes mais que um ano antes; o app foi reescrito em 12 semanas.

Para não deixar a segurança para trás, a empresa passou a revisar com agentes: cada app tem um mapa das superfícies de ataque, as skills foram montadas a partir do OWASP MASVS/MASTG e de incidentes passados, e o agente compara todo dia o estado atual com o último mapa aceito.

É a resposta prática ao gargalo de revisão que vem aparecendo em outros estudos: em vez de mais gente lendo diff, revisão pequena e escopada, com o critério escrito. O número de produtividade é da própria empresa, sem método independente.

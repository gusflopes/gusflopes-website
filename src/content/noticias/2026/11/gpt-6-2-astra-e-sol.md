---
title: "GPT-6.2 Astra e Sol chegam ao Copilot ligados por padrão"
excerpt: "A OpenAI lançou em 17/11/2026 o GPT-6.2 Astra e o GPT-6.2 Sol; no mesmo dia os dois entraram no GitHub Copilot (Pro+, Max, Business e Enterprise), habilitados automaticamente salvo se o admin tiver desligado o padrão."
date: "2026-11-19"
temas: ["modelos", "engenharia-de-software"]
ferramentas: ["gpt", "openai-api", "github-copilot", "aws-bedrock"]
porQueImporta:
  B: "No Copilot, quem decide se o time usa o modelo novo é a política de modelos do admin, não o dev; na API, chamada de ferramenta com esses modelos só funciona pela Responses API, o que pede migração de quem ainda usa Chat Completions."
fonte:
  nome: "OpenAI (changelog da API)"
  url: "https://developers.openai.com/changelog"
  data: "2026-11-17"
  tipo: primaria
outrasFontes:
  - nome: "Codex (changelog)"
    url: "https://learn.chatgpt.com/docs/changelog"
    data: "2026-11-20"
    tipo: primaria
  - nome: "GitHub Changelog"
    url: "https://github.blog/changelog/2026-11-17-openais-gpt-6-2-astra-and-gpt-6-2-sol-now-available"
    data: "2026-11-17"
    tipo: primaria
apuradoEm: "2026-11-20"
base: "gpt-6-2-astra-e-sol"
correcoes: []
assinatura: agente
rascunho: false
---

A OpenAI lançou em 17/11/2026 dois modelos: o GPT-6.2 Astra, para raciocínio e código mais exigentes, e o GPT-6.2 Sol, para código e agentes do dia a dia. Na API, a chamada de ferramentas com eles exige a Responses API. No mesmo dia, o GitHub os liberou no Copilot para os planos Pro+, Max, Business e Enterprise, com habilitação automática, salvo se o administrador tiver desligado o padrão global.

Para quem executa, o ponto prático não é o benchmark: é a migração para a Responses API e a política de modelos do Copilot, que define o que o time passa a usar sem pedir.

O post de lançamento no site da OpenAI não abriu na apuração; preço e disponibilidade no ChatGPT ficam para quando a fonte puder ser conferida.

Atualização em 20/11: o Codex CLI 0.171.0, de 20/11/2026, pôs o GPT-6.2 Sol como seleção padrão do catálogo de modelos, ao lado do Astra. Quem usa o Codex sem fixar o modelo passa a rodar no Sol sem ter escolhido, com o custo e o comportamento que vêm junto.

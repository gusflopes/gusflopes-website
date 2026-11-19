---
title: "API da OpenAI cobra até 40% menos por tarefa que pode esperar 8 h"
excerpt: "Em beta pública desde 17/11/2026, a Responses API aceita janelas de conclusão em segundo plano de 2 h e 8 h, com token 30% e 40% mais barato que o Standard, para quatro modelos GPT."
date: "2026-11-19"
temas: ["custo-e-precificacao", "modelos"]
ferramentas: ["openai-api", "gpt", "cobranca-por-uso"]
porQueImporta:
  B: "Tarefa que não precisa de resposta na hora (classificação, extração, relatório noturno) pode ir para a janela de 8 h e sair 40% mais barata sem trocar de modelo; a decisão é separar o que é fila do que é interativo."
fonte:
  nome: "OpenAI (changelog da API)"
  url: "https://developers.openai.com/changelog"
  data: "2026-11-17"
  tipo: primaria
outrasFontes: []
apuradoEm: "2026-11-18"
base: "openai-api-janela-de-2h-e-8h-ate-40pct-mais-barata"
correcoes: []
assinatura: agente
rascunho: false
---

A OpenAI abriu em 17/11/2026, em beta pública na Responses API, a opção de pedir a resposta numa janela de duas ou de oito horas. Na de 2 h o token sai 30% mais barato que o Standard; na de 8 h, 40%. Valem para gpt-6.2-astra, gpt-6.2-sol, gpt-6.1-terra e gpt-6-luna.

É uma alavanca de custo que não exige trocar de modelo nem mexer em prompt: basta separar o trabalho que pode esperar. Em agente que roda em lote, essa separação pesa mais na conta do que a escolha entre modelos parecidos.

Por ora é beta, só na Responses API, e o changelog não diz se haverá garantia de prazo nem como fica o limite de uso.

---
title: "Foundry roda modelo aberto em GPU dedicada, cobrado por hora"
excerpt: "A Microsoft tornou disponível em 20/11/2026 o Managed Compute no Foundry: mais de 150 modelos abertos da coleção Hugging Face rodam em GPU dedicada, com cobrança por hora de acelerador."
date: "2026-11-23"
temas: ["plataformas", "modelos"]
ferramentas: ["microsoft-foundry", "modelos-abertos"]
porQueImporta:
  B: "Rodar modelo aberto deixa de exigir montar cluster de inferência próprio; a decisão vira custo fixo de GPU por hora contra preço por token de um modelo fechado, e só fecha com volume constante."
  A: "Sem preço por hora publicado e sem Data Zone no Brasil, quem precisa de residência de dados aqui ainda não tem resposta; o custo só aparece no assistente de implantação."
fonte:
  nome: "Microsoft Foundry Blog"
  url: "https://devblogs.microsoft.com/foundry/managed-compute-ga/"
  data: "2026-11-20"
  tipo: primaria
outrasFontes: []
apuradoEm: "2026-11-23"
base: "foundry-managed-compute-ga-modelo-aberto-por-hora-de-gpu"
correcoes: []
assinatura: agente
rascunho: false
---

A Microsoft tornou disponível para todos em 20/11/2026, no Ignite, o Managed Compute no Foundry, em prévia desde o Build de junho. A coleção Hugging Face do Foundry oferece mais de 150 modelos abertos, que rodam em GPUs dedicadas.

A cobrança é por hora de acelerador, e o assistente mostra o custo por hora antes da implantação. Dá para implantar de forma global ou numa Data Zone dos EUA ou da União Europeia. Adaptadores LoRA e o uso de pesos próprios continuam em prévia.

Na prática, o Foundry entrega a GPU, o modelo verificado e o runtime, e o time fica com a escolha entre pagar a máquina ou pagar o token. O post não publica preço por hora e não menciona região no Brasil.

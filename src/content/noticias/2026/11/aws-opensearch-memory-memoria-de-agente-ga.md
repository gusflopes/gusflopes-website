---
title: "AWS lança OpenSearch Memory, memória gerenciada para agentes"
excerpt: "A AWS tornou disponível em 18/11/2026 o Amazon OpenSearch Memory, serviço que guarda o histórico dos agentes e o recupera entre sessões, com permissão por IAM e expiração; ainda sem região em São Paulo."
date: "2026-11-19"
temas: ["agentes-engenharia", "contexto-e-metodo", "governanca-e-seguranca"]
ferramentas: ["amazon-opensearch", "contexto-para-agentes"]
porQueImporta:
  A: "Memória de agente passa a ser dado guardado com dono e prazo: antes de ligar, a empresa precisa decidir o que o agente pode lembrar, de quem e por quanto tempo, e onde esse dado fica."
  B: "Tira do time a montagem de banco vetorial e de política de retenção para memória de agente; sem região no Brasil, quem guarda dado pessoal precisa olhar a transferência internacional."
fonte:
  nome: "AWS What's New"
  url: "https://aws.amazon.com/about-aws/whats-new/2026/11/amazon-opensearch-memory-generally-available/"
  data: "2026-11-18"
  tipo: primaria
outrasFontes: []
apuradoEm: "2026-11-19"
base: "aws-opensearch-memory-memoria-de-agente-ga"
correcoes: []
assinatura: agente
rascunho: false
---

A AWS anunciou em 18/11/2026 a disponibilidade geral do Amazon OpenSearch Memory, serviço serverless que registra as interações de agentes como eventos pesquisáveis, deriva memórias a partir delas e as recupera entre sessões.

O acesso é limitado por ator e por sessão via IAM, e a expiração é configurável. O serviço está em cinco regiões, nenhuma delas em São Paulo.

Memória entre sessões era uma das peças que cada time montava por conta própria. Como serviço gerenciado, a decisão deixa de ser técnica e passa a ser de política: retenção, escopo e localização do dado.

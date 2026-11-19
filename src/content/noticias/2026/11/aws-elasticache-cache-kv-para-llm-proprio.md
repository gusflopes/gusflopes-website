---
title: "ElastiCache ganha cache KV gerenciado para quem hospeda o próprio LLM"
excerpt: "A AWS lançou em 18/11/2026 um cache KV distribuído e gerenciado no ElastiCache for Valkey para quem hospeda o próprio LLM, compatível com vLLM, SGLang e TensorRT-LLM."
date: "2026-11-19"
temas: ["custo-e-precificacao", "plataformas"]
ferramentas: ["amazon-elasticache", "modelos-abertos"]
porQueImporta:
  B: "Agente reenvia o mesmo contexto a cada passo, e quem hospeda modelo paga GPU por esse trabalho repetido; cache compartilhado é alavanca de custo que não depende de trocar de modelo."
fonte:
  nome: "AWS What's New"
  url: "https://aws.amazon.com/about-aws/whats-new/2026/11/announcing-distributed-kv-caching-for-self-hosted-llms-with-amazon-elasticache/"
  data: "2026-11-18"
  tipo: primaria
outrasFontes: []
apuradoEm: "2026-11-19"
base: "aws-elasticache-cache-kv-para-llm-proprio"
correcoes: []
assinatura: agente
rascunho: false
---

A AWS lançou em 18/11/2026 um cache KV distribuído e gerenciado no Amazon ElastiCache for Valkey, voltado a quem hospeda o próprio LLM. A integração com vLLM, SGLang e TensorRT-LLM é feita via LMCache.

Segundo a AWS, o cache reduz o custo de inferência em até 40% e o tempo até o primeiro token em até 80%. São números do fornecedor, no formato "até", sem método publicado no anúncio.

Para quem roda modelo próprio com agentes, que repetem o mesmo contexto a cada passo, a economia vem de não recalcular o que já foi calculado.

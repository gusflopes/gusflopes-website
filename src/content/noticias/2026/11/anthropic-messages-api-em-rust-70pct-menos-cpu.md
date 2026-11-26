---
title: "Anthropic migra a Messages API para Rust com código escrito pelo Claude"
excerpt: "A Anthropic contou em 25/11/2026 que migrou a Messages API de Python para Rust entre abril e setembro de 2026: o Claude escreveu a primeira versão do caminho principal em cerca de uma semana, e a verificação contra o tráfego real levou meses."
date: "2026-11-26"
temas: ["agentes-engenharia", "engenharia-de-software"]
ferramentas: ["claude-api", "humano-no-circuito"]
porQueImporta:
  B: "O método vale mais que o número: os testes de integração existentes passavam enquanto só um quarto das entradas reais batia, e o que destravou a migração foi comparar com o tráfego de produção em sombra. É o roteiro para reescrever sistema legado com agente."
  A: "\"Passou nos testes\" não é critério para aprovar migração feita com agente. A pergunta ao time é contra o que o código novo foi comparado, e por quanto tempo."
fonte:
  nome: "Anthropic"
  url: "https://www.anthropic.com/research/migrating-api-to-rust"
  data: "2026-11-25"
  tipo: primaria
outrasFontes: []
apuradoEm: "2026-11-26"
base: "anthropic-messages-api-em-rust-70pct-menos-cpu"
correcoes: []
assinatura: agente
rascunho: false
---

A Anthropic publicou em 25/11/2026 como migrou a Messages API, a API principal do Claude, de Python para Rust. O Claude escreveu a primeira versão do caminho principal das requisições em cerca de uma semana; o tráfego público passou para o Rust em setembro, sem tirar o serviço do ar.

Segundo a empresa, a versão nova usa cerca de 70% menos CPU por requisição. No começo, só cerca de 24% das entradas de produção davam a mesma resposta nas duas versões; a paridade chegou a 99,6% antes da troca.

A leitura é que gerar o código ficou barato e verificar virou o trabalho: os meses entre a primeira versão e a troca foram de comparação com produção, não de escrita. O limite é a fonte: são dados da própria Anthropic sobre o próprio sistema, sem verificação externa.

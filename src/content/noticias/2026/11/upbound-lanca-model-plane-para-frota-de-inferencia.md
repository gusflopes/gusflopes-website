---
title: "Upbound mostra o Model Plane, que move inferência entre nuvens"
excerpt: "Na abertura da KubeCon NA, em 10/11/2026, a Upbound apresentou o Model Plane, plano de controle sobre o Crossplane que distribui um modelo por clusters de várias nuvens e move as réplicas quando a capacidade de GPU acaba; licença, preço e status não foram ditos."
date: "2026-11-19"
temas: ["plataformas", "custo-e-precificacao"]
ferramentas: ["kubernetes"]
porQueImporta:
  A: "GPU virou recurso que se compra onde houver; ferramenta que move inferência entre nuvens dá poder de negociação de capacidade, desde que o modelo não esteja preso a um fornecedor."
  B: "O desenho é declarar o modelo pelo que ele precisa, sem nomear cluster, e deixar o plano de controle escolher onde roda. Sem licença nem status anunciados, ainda é demo para acompanhar."
fonte:
  nome: "CNCF (abertura da KubeCon NA)"
  url: "https://youtu.be/tF4GE8qn92I?t=2325"
  data: "2026-11-10"
  tipo: primaria
outrasFontes: []
apuradoEm: "2026-11-19"
base: "upbound-lanca-model-plane-para-frota-de-inferencia"
correcoes: []
assinatura: agente
rascunho: false
---

Na abertura da KubeCon NA, em 10/11/2026, Bassam Tabbara, da Upbound, apresentou o Model Plane, um plano de controle construído sobre o Crossplane para operar inferência numa frota de clusters espalhados por nuvens, neoclouds e data centers.

A demo pôs o mesmo modelo em GPUs NVIDIA Blackwell na AWS e em GPUs AMD na Vultr, atrás de um único endpoint compatível com as APIs da OpenAI e da Anthropic. Quando a reserva de capacidade na AWS acabou, o Model Plane recriou as réplicas na CoreWeave, sem que o modelo apontasse cluster algum.

Licença, preço e disponibilidade não foram ditos no palco. O que fica é o sinal: a portabilidade de inferência entre nuvens está virando ferramenta, não projeto.

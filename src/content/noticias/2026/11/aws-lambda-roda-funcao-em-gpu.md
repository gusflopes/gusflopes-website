---
title: "Lambda passa a rodar função de evento em GPU"
excerpt: "A AWS passou a permitir, em 18/11/2026, que funções de evento do Lambda rodem em instâncias GPU via Lambda Managed Instances, sem gerenciar driver, CUDA ou cluster."
date: "2026-11-19"
temas: ["plataformas", "custo-e-precificacao"]
ferramentas: ["aws-lambda"]
porQueImporta:
  B: "Inferência pequena disparada por evento (OCR, classificação, transcrição) deixa de exigir uma plataforma de GPU montada pelo time; a conta a fazer é preço de EC2 contra GPU parada."
fonte:
  nome: "AWS (blog)"
  url: "https://aws.amazon.com/blogs/aws/aws-lambda-now-supports-gpu-instances-for-event-functions-on-lambda-managed-instances/"
  data: "2026-11-18"
  tipo: primaria
outrasFontes:
  - nome: "AWS What's New"
    url: "https://aws.amazon.com/about-aws/whats-new/2026/11/aws-lambda-gpu-managed-instances/"
    data: "2026-11-18"
    tipo: primaria
apuradoEm: "2026-11-19"
base: "aws-lambda-roda-funcao-em-gpu"
correcoes: []
assinatura: agente
rascunho: false
---

A AWS passou a permitir, em 18/11/2026, que funções de evento do Lambda rodem em instâncias GPU da série G do EC2, via Lambda Managed Instances, a partir de imagem de contêiner.

O time não gerencia driver, CUDA, AMI nem cluster; o preço é o do EC2, e várias funções podem dividir a mesma GPU.

O argumento é custo de GPU ociosa: inferência que roda só quando chega um arquivo ou uma mensagem não precisa de máquina ligada o tempo todo. O anúncio sai a duas semanas do re:Invent.

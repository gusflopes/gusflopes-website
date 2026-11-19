---
title: "AWS leva ao Kubernetes correções de escala dos seus maiores clusters"
excerpt: "Na KubeCon NA, em 11/11/2026, a AWS mostrou correções que levou ao Kubernetes upstream a partir dos seus maiores clusters, do API server ao containerd; os ganhos valem para qualquer cluster que atualizar, não só para o EKS."
date: "2026-11-19"
temas: ["plataformas"]
ferramentas: ["kubernetes"]
porQueImporta:
  B: "Os ganhos chegam por atualização (Kubernetes 1.37, containerd 2.2, a versão recente do Karpenter), em qualquer nuvem: vale pôr no plano de upgrade de quem roda cluster grande ou imagem pesada de IA, sabendo que os números são de teste da própria AWS."
fonte:
  nome: "CNCF (keynote da AWS, KubeCon NA)"
  url: "https://youtu.be/JWFiItaOeqo"
  data: "2026-11-11"
  tipo: primaria
outrasFontes:
  - nome: "Cloud Native Now"
    url: "https://cloudnativenow.com/features/kubernetes-is-strengthening-its-position-as-the-ai-platform-of-choice/"
    data: "2026-11-12"
    tipo: imprensa
apuradoEm: "2026-11-19"
base: "aws-leva-correcoes-de-escala-do-kubernetes-ao-upstream"
correcoes: []
assinatura: agente
rascunho: false
---

A AWS foi à keynote da KubeCon NA, em 11/11/2026, sem produto de agente. Mike Stefaniak usou o tempo para listar correções que a empresa levou ao Kubernetes upstream depois de encontrar gargalos nos seus maiores clusters.

A principal foi no API server: um snapshot preguiçoso no watch cache derrubou a espera de escrita de mais de meio segundo para 2 ms num teste de 1 milhão de pods, junto com melhorias no escalonador, tudo no Kubernetes 1.37. No nó, um desempacotamento paralelo de camadas, já no containerd 2.2, levou uma imagem de 10 GB de 2 minutos para menos de 45 segundos nos testes da AWS.

Os números são de teste da própria AWS, sem metodologia publicada. O ponto que importa é o caminho: em vez de manter a correção só no EKS, ela foi para o código que todo mundo usa. A resposta da AWS para runtime de agente deve vir no re:Invent, a partir de 30/11.

---
title: "AKS passa a gerenciar o DRA de GPU e o DRANET"
excerpt: "A Microsoft anunciou em 10/11/2026, na KubeCon NA, DRA gerenciado para node pools de GPU no AKS e suporte gerenciado ao DRANET em nós com RDMA; o post não diz se cada recurso está em GA ou em preview."
date: "2026-11-19"
temas: ["plataformas"]
ferramentas: ["azure-kubernetes-service", "kubernetes"]
porQueImporta:
  B: "Quem roda inferência ou treino no AKS pode pedir GPU pelo que o workload precisa, em vez de contar dispositivos e manter driver na mão; antes de mudar a produção, confira se o recurso está em GA ou em preview na sua região."
fonte:
  nome: "Microsoft Open Source Blog"
  url: "https://opensource.microsoft.com/blog/2026/11/10/whats-new-with-microsoft-in-open-source-and-kubernetes-at-kubecon-north-america-2026/"
  data: "2026-11-10"
  tipo: primaria
outrasFontes:
  - nome: "Cloud Native Now"
    url: "https://cloudnativenow.com/uncategorized/microsoft-adds-managed-dra-fleet-placement-controls-and-upgrade-health-gates-to-aks/"
    data: "2026-11-10"
    tipo: imprensa
apuradoEm: "2026-11-19"
base: "aks-ganha-dra-gerenciado-para-gpu"
correcoes: []
assinatura: agente
rascunho: false
---

A Microsoft anunciou em 10/11/2026, na KubeCon NA, que o AKS passa a oferecer DRA gerenciado para node pools de GPU. Com o DRA (Dynamic Resource Allocation), o workload descreve o hardware de que precisa e o Kubernetes escolhe um que atenda, em vez de o time pedir uma contagem fixa de dispositivos.

No mesmo anúncio, o AKS ganhou suporte gerenciado ao DRANET, o driver de rede do DRA, em node pools com RDMA, voltado a treino distribuído e HPC. A Microsoft também informou que o AI Runway, projeto para implantar inferência de vários provedores no Kubernetes, foi aceito como Sandbox na CNCF.

O post não diz se cada recurso está em disponibilidade geral ou em preview, nem fala de preço. Na prática, é menos configuração manual de GPU para quem já está no Azure, e um sinal de que o DRA virou o caminho padrão para hardware de IA no Kubernetes.

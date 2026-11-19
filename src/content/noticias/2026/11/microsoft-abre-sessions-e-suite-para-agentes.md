---
title: "Microsoft abre Sessions e Suite para auditar e empacotar agentes"
excerpt: "A Microsoft abriu em 10/11/2026, na KubeCon NA, o Sessions, que grava cada execução de agente num diário reexecutável sem chamar o modelo de novo, e o Suite, formato aberto para empacotar um agente; ela mesma chama os dois de muito iniciais."
date: "2026-11-19"
temas: ["agentes-engenharia", "governanca-e-seguranca"]
ferramentas: ["kubernetes", "agent-substrate", "humano-no-circuito"]
porQueImporta:
  B: "Registro do agente deixa de ser log solto e vira peça da plataforma: dá para reexecutar, ramificar e auditar uma execução sem pagar o modelo de novo. É projeto bem no começo; serve para testar e influenciar, não para produção."
  A: "Responde à pergunta do auditor (o que o agente fez, e por quê) com reprodução exata, não com relato; e libera o compute enquanto o agente espera aprovação humana."
fonte:
  nome: "Microsoft Open Source Blog"
  url: "https://opensource.microsoft.com/blog/2026/11/10/whats-new-with-microsoft-in-open-source-and-kubernetes-at-kubecon-north-america-2026/"
  data: "2026-11-10"
  tipo: primaria
outrasFontes:
  - nome: "CNCF (keynote de Jorge Palma, KubeCon NA)"
    url: "https://youtu.be/jLJGfYAe09o?t=120"
    data: "2026-11-12"
    tipo: primaria
apuradoEm: "2026-11-19"
base: "microsoft-abre-sessions-e-suite-para-agentes"
correcoes: []
assinatura: agente
rascunho: false
---

A Microsoft publicou em 10/11/2026, na KubeCon NA, dois projetos abertos que chama de agent-primitives. O Sessions dá a cada execução de agente um ciclo de vida durável: ela pode ser suspensa, retomada, reexecutada ou ramificada. O Suite é um formato neutro para empacotar um agente, com instruções, ferramentas e avaliações num arquivo JSON.

Na keynote de 12/11, Jorge Palma mostrou o detalhe que importa: cada resposta do modelo vai para um diário só de inclusão, encadeado por hash, e o replay sai com "exactly the same bytes, no model calls whatsoever". Na demo, enquanto o agente esperava um SRE aprovar a correção, o compute foi liberado.

Palma chamou os dois projetos de "very early". O post não informa status nem preço; os repositórios estão em github.com/agent-primitives. A Microsoft também contribui com o Agent Substrate, em snapshot plugável, identidade no Kubernetes e microVM.

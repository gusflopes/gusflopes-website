---
title: "Google leva Agent Substrate e gVisor à CNCF para rodar agente isolado"
excerpt: "O Google anunciou em 05/11/2026 a doação à CNCF do Agent Substrate, runtime para agentes de longa duração no Kubernetes que retoma a sessão em menos de 500 ms, e do gVisor; segundo o Google, o agente passa 90% a 95% da sessão esperando."
date: "2026-11-19"
temas: ["agentes-engenharia", "custo-e-precificacao"]
ferramentas: ["agent-substrate", "kubernetes", "google-cloud-vertex"]
porQueImporta:
  B: "Há um desenho de referência aberto para agente que fica horas no ar: sessão separada do compute, worker pré-aquecido e gVisor isolando o código que o agente gera. É Sandbox na CNCF, então as APIs ainda vão mudar."
  A: "Se o agente passa a maior parte do tempo esperando, pagar máquina parada é a maior linha da conta; suspender e retomar muda o custo de manter agentes vivos, e chega como projeto aberto, sem licença."
fonte:
  nome: "Google Open Source Blog"
  url: "https://opensource.googleblog.com/2026/11/sandboxing-untrusted-ai-agents-at-scale.html"
  data: "2026-11-05"
  tipo: primaria
outrasFontes: []
apuradoEm: "2026-11-19"
base: "google-doa-agent-substrate-e-gvisor-cncf"
correcoes: []
assinatura: agente
rascunho: false
---

O Google anunciou em 05/11/2026, para a KubeCon NA, a doação à CNCF do Agent Substrate e do gVisor, junto do OpenRL. O Agent Substrate, já na versão 1.0, é uma camada sobre o Kubernetes para agentes em sandbox: separa o estado da sessão do agente de um conjunto de máquinas pré-aquecidas e suspende o que está ocioso.

O argumento é de custo. Segundo o Google, numa sessão interativa típica o agente passa de 90% a 95% do tempo esperando inferência, APIs ou revisão humana. Com o Agent Substrate, a sessão volta em menos de 500 ms, e o checkpoint do gVisor pode ser restaurado em outro nó no mesmo tempo.

O projeto entra na CNCF como Sandbox, o estágio inicial da fundação, e o post não diz se há oferta gerenciada no GKE. Os percentuais são do próprio Google, sem metodologia.

Agente ocioso deixa de ser máquina ligada; vira estado guardado.

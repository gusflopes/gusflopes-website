---
title: "OpenShift 5 chega com agente que diagnostica o cluster"
excerpt: "A Red Hat colocou em disponibilidade geral o OpenShift 5 em 09/11/2026: o Lightspeed deixa de ser assistente de conversa e passa a agir como agente de diagnóstico, com avaliação de risco de atualização, e a plataforma ganha suporte a servidor MCP."
date: "2026-11-19"
temas: ["agentes-engenharia", "plataformas"]
ferramentas: ["red-hat-openshift", "mcp", "kubernetes"]
porQueImporta:
  B: "Quem já assina OpenShift ganha um agente operando o cluster sem comprar produto novo; a decisão do time de plataforma passa a ser quanto deixar ele corrigir sozinho e por qual porta (MCP) outros agentes entram."
  A: "A atualização é no lugar, a partir do OpenShift 4, e vem com a assinatura atual: o custo é de adoção e de governança do agente, não de licença nova."
fonte:
  nome: "Red Hat (comunicado à imprensa)"
  url: "https://www.redhat.com/en/about/press-releases/red-hat-openshift-5-transforms-hybrid-cloud-operations-real-time-intelligence-and-zero-trust-security"
  data: "2026-11-09"
  tipo: primaria
outrasFontes:
  - nome: "Network World"
    url: "https://www.networkworld.com/article/4247825/red-hat-joins-race-to-be-air-traffic-controller-for-ai-agents.html"
    data: "2026-11-10"
    tipo: imprensa
apuradoEm: "2026-11-19"
base: "red-hat-lanca-openshift-5-com-agente-de-operacao"
correcoes: []
assinatura: agente
rascunho: false
---

A Red Hat anunciou em 09/11/2026, na KubeCon NA, a disponibilidade geral do OpenShift 5 para quem já tem assinatura, com atualização no lugar a partir do OpenShift 4.

A mudança principal está no OpenShift Lightspeed: ele deixa de ser um assistente de conversa e passa a agir como agente de diagnóstico, com análise de log, correção supervisionada e avaliação de risco antes de atualizar o cluster. A versão também traz suporte a servidor MCP, o protocolo pelo qual agentes acessam ferramentas e dados.

O comunicado não diz quanto o agente pode fazer sem aprovação, nem traz preço além da assinatura. É a plataforma de Kubernetes mais vendida em data center próprio tratando agente como parte da operação, não como acessório.

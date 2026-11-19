---
title: "Solo.io refaz o kagent sobre o Agent Substrate, já com clientes"
excerpt: "Na KubeCon NA, em 10/11/2026, a Solo.io anunciou o kagent 1.0 refeito sobre o Agent Substrate e disse que Swissquote e OutSystems já rodam o runtime em produção com o agentgateway; a imprensa relata edições enterprise em GA, sem preço."
date: "2026-11-19"
temas: ["agentes-engenharia", "plataformas"]
ferramentas: ["agent-substrate", "kagent", "kubernetes"]
porQueImporta:
  B: "Quem quer testar o Agent Substrate tem um caminho pronto: o kagent 1.0 já roda sobre ele, com o agentgateway aplicando identidade e política no tráfego do agente."
  A: "Uma semana depois da doação à CNCF, o runtime aberto de agentes já tem cliente em produção e suporte comercial; dá para comprar suporte sem ficar preso a uma nuvem, mas o preço não é público."
fonte:
  nome: "CNCF (keynote da Solo.io, KubeCon NA)"
  url: "https://youtu.be/euMtYE3ALoA?t=368"
  data: "2026-11-10"
  tipo: primaria
outrasFontes:
  - nome: "Cloud Native Now"
    url: "https://cloudnativenow.com/uncategorized/solo-io-makes-enterprise-agent-substrate-and-kagent-generally-available/"
    data: "2026-11-10"
    tipo: imprensa
apuradoEm: "2026-11-19"
base: "solo-io-agent-substrate-e-kagent-enterprise-ga"
correcoes: []
assinatura: agente
rascunho: false
---

Na keynote da Solo.io na KubeCon NA, em 10/11/2026, Idit Levine e Keith Babo anunciaram o kagent 1.0, projeto aberto de agentes no Kubernetes, agora refeito sobre o Agent Substrate, o runtime que a Solo.io mantém com o Google. No palco, disseram que Swissquote e OutSystems já rodam o Agent Substrate em produção, com o agentgateway como ponto de controle do tráfego dos agentes.

Segundo o Cloud Native Now, a empresa também colocou em disponibilidade geral as edições enterprise do Agent Substrate e do kagent. Preço não foi divulgado.

Na mesma fala, Levine criticou o "sim" do usuário como controle de segurança: a maioria aprova sem ler. A resposta da Solo.io é pôr a regra no gateway, fora do agente e fora da pessoa.

---
title: "Anthropic liga o Claude Managed Agents ao Agent Substrate"
excerpt: "Na KubeCon NA, em 10/11/2026, a Anthropic anunciou uma ponte para rodar cargas do Claude Managed Agents sobre o Agent Substrate, runtime aberto de agentes no Kubernetes; até 19/11 não há documentação, preço nem status publicados."
date: "2026-11-19"
temas: ["agentes-engenharia", "plataformas"]
ferramentas: ["agent-substrate", "claude", "kubernetes"]
porQueImporta:
  A: "A escolha deixa de ser só entre agente SaaS e agente construído em casa: abre a possibilidade de usar o agente pronto mantendo rede, dado e identidade na própria plataforma. Sem status nem preço, ainda não é decisão de compra, é pergunta para o fornecedor."
  B: "Quem já roda Kubernetes pode vir a hospedar agentes do Claude no mesmo runtime aberto que a CNCF acaba de receber; vale acompanhar a documentação antes de desenhar qualquer coisa em cima da ponte."
fonte:
  nome: "CNCF (keynote Agent Substrate, KubeCon NA)"
  url: "https://youtu.be/CC872qQ-eNQ?t=241"
  data: "2026-11-10"
  tipo: primaria
outrasFontes: []
apuradoEm: "2026-11-19"
base: "anthropic-leva-claude-managed-agents-ao-agent-substrate"
correcoes: []
assinatura: agente
rascunho: false
---

Na keynote do Agent Substrate na KubeCon NA, em 10/11/2026, Luiz Scheidegger, da Anthropic, anunciou a "Agent Substrate bridge" para o Claude Managed Agents: uma ponte que permite rodar cargas do serviço de agentes gerenciados da Anthropic sobre o Agent Substrate, o runtime de agentes no Kubernetes que o Google e parceiros levaram à CNCF.

A demonstração foi feita ao vivo com a plateia. Segundo os apresentadores, rodava num único cluster GKE de cerca de 24 nós, com uns 65 agentes por nó, e tinha sido testada com até 15 mil inscrições.

O anúncio ficou no palco. Até 19/11 não há post, documentação, preço nem indicação de que a ponte esteja em preview ou em disponibilidade geral; a página do Managed Agents, de abril, não menciona o Agent Substrate.

É um agente de laboratório de modelo admitindo rodar fora da casa dele. Falta saber em que termos.

---
title: "GitHub abre protocolo para a sessão do agente seguir entre telas"
excerpt: "O GitHub publicou em 17/11/2026 o Agent Host Protocol, padrão aberto que mantém a sessão do agente acessível entre VS Code, app do Copilot, celular e nuvem, com bibliotecas em seis linguagens."
date: "2026-11-19"
temas: ["agentes-engenharia"]
ferramentas: ["agent-host-protocol", "github-copilot"]
porQueImporta:
  B: "Para quem monta plataforma interna de agentes, o protocolo separa onde o agente trabalha de onde a pessoa acompanha; vale olhar a especificação antes de inventar o próprio formato de sessão."
fonte:
  nome: "GitHub Blog"
  url: "https://github.blog/engineering/engineering-principles/building-the-agent-host-protocol-for-sessions-that-continue-across-devices/"
  data: "2026-11-17"
  tipo: primaria
outrasFontes: []
apuradoEm: "2026-11-18"
base: "agent-host-protocol-sessao-de-agente-em-qualquer-tela"
correcoes: []
assinatura: agente
rascunho: false
---

O GitHub publicou em 17/11/2026 o Agent Host Protocol, um padrão aberto criado no VS Code e adotado no GitHub. Ele mantém a sessão do agente acessível de qualquer lugar: a sessão pode rodar no app do Copilot, numa sandbox na nuvem ou no VS Code e ser acompanhada também pelo celular. A especificação está no repositório microsoft/agent-host-protocol, com bibliotecas em Rust, TypeScript, Kotlin, Swift, .NET e Go.

É uma peça de infraestrutura, não um produto: interessa a quem constrói ferramenta de agente, não a quem só usa o Copilot.

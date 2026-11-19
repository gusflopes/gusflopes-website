---
title: "Entra e Defender passam a enxergar Claude Code e Copilot CLI locais"
excerpt: "A Microsoft anunciou no Ignite, em 17/11/2026, controles para agentes de código na máquina do desenvolvedor: identidade no Entra para Claude Code e GitHub Copilot CLI, em prévia, e proteção de runtime do Defender no Windows, já disponível."
date: "2026-11-19"
temas: ["governanca-e-seguranca", "engenharia-de-software", "agentes-engenharia"]
ferramentas: ["identidade-de-agentes", "claude-code", "github-copilot", "mcp", "microsoft-entra"]
porQueImporta:
  A: "O agente de código no notebook do dev deixa de ser ponto cego e entra no mesmo painel de identidade e conformidade do resto da empresa; falta a política de quais agentes são aprovados e quem responde por eles."
  B: "O time vai precisar declarar quais agentes usa para não ter a máquina marcada como fora de conformidade e barrada do dado da empresa; a proteção do Defender exige o plano P2."
fonte:
  nome: "Microsoft Ignite Book of News"
  url: "https://news.microsoft.com/events/ignite/2026/book-of-news/"
  data: "2026-11-17"
  tipo: primaria
outrasFontes: []
apuradoEm: "2026-11-19"
base: "entra-e-defender-passam-a-ver-claude-code-local"
correcoes: []
assinatura: agente
rascunho: false
---

A Microsoft anunciou no Ignite, em 17/11/2026, que o Microsoft Entra vai dar identidade de agente (Agent ID) aos agentes locais que encontrar nas máquinas, começando pelo GitHub Copilot CLI e pelo Claude Code. O recurso está em prévia.

A proteção de runtime do Defender no Windows ficou disponível para Claude Code, GitHub Copilot CLI, Claude Desktop e as extensões do Copilot e do Claude Code no VS Code, para clientes do Defender for Endpoint P2. Em prévia, o Intune descobre agentes nas máquinas gerenciadas e marca como fora de conformidade a que tiver agente não aprovado; o acesso condicional do Entra pode então barrar essa máquina.

O agente de código passa a ser tratado como software de risco, com identidade e bloqueio. Quem usa Claude Code em máquina corporativa com Windows deve esperar a pergunta da segurança: qual agente, com quais servidores MCP e aprovado por quem.

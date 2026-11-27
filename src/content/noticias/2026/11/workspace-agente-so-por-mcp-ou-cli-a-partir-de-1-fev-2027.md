---
title: "Google: agente só acessa o Workspace por MCP ou CLI a partir de 1º/02"
excerpt: "O Google pôs em GA em 24/11/2026 os servidores MCP e a CLI do Workspace e avisou que, a partir de 1º/02/2027, agentes de IA não poderão mais chamar as APIs REST direto para ler Gmail, Drive ou Calendar."
date: "2026-11-27"
temas: ["plataformas", "governanca-e-seguranca", "custo-e-precificacao"]
ferramentas: ["google-workspace", "mcp", "identidade-de-agentes", "humano-no-circuito"]
porQueImporta:
  B: "Toda integração própria em que um agente lê Gmail, Drive ou Calendar pela API REST tem prazo: 1º/02/2027. O trabalho agora é levantar essas integrações, marcar o cliente OAuth como agente e migrar para o MCP ou a CLI antes da trava."
  A: "É o primeiro grande SaaS a tratar agente como usuário com identidade, aprovação humana e log de auditoria próprios. Vale perguntar aos outros fornecedores quando vão oferecer o mesmo controle, e a quem cabe a conta do uso acima da cota."
fonte:
  nome: "Google Workspace Updates"
  url: "https://workspaceupdates.googleblog.com/2026/11/mcp-servers-cli-standardized-usage-tiers-now-available.html"
  data: "2026-11-24"
  tipo: primaria
outrasFontes:
  - nome: "Google for Developers (Workspace tools safety)"
    url: "https://developers.google.com/workspace/tools-safety"
    data: "2026-11-24"
    tipo: primaria
apuradoEm: "2026-11-27"
base: "workspace-agente-so-por-mcp-ou-cli-a-partir-de-1-fev-2027"
correcoes: []
assinatura: agente
rascunho: false
---

O Google colocou em disponibilidade geral, em 24/11/2026, os servidores MCP do Workspace (Gmail, Drive, Docs, Sheets, Slides, Calendar, Chat e Tasks) e a CLI do Workspace, pensada para agentes que rodam em terminal ou em sandbox.

No mesmo anúncio, a empresa mudou a regra de acesso: a partir de 1º/02/2027, agentes de IA terão de usar os servidores MCP ou a CLI para ler dados do Workspace, e não mais as APIs REST diretamente. A partir de 1º/04/2027, o uso acima da cota diária gratuita de Gmail, Calendar e Drive passa a ser cobrado no novo tier Scaled; o Google não publicou o preço.

A leitura é que o agente vira um tipo de usuário com regras próprias. O cliente OAuth é marcado como agente, o admin decide quais ferramentas externas entram, pode exigir que a pessoa confirme ações sensíveis e vê o que o agente fez no log de auditoria. Para quem integrou agente por conta própria, o recado é de prazo e de custo.

O que ainda não se sabe: quanto custa o tier Scaled e como fica a integração feita por fornecedor terceiro, que também terá de migrar.

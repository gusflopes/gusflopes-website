---
title: "VS Code 1.147: admin decide se Claude e Codex rodam no editor"
excerpt: "O VS Code 1.147, de 18/11/2026, traz uma política para o administrador liberar ou bloquear as sessões de Claude e Codex no editor, e avisa que elas rodam fora dos controles gerenciados do Copilot."
date: "2026-11-23"
temas: ["agentes-engenharia", "governanca-e-seguranca"]
ferramentas: ["github-copilot", "claude-code", "codex", "agent-skills", "politica-de-ia"]
porQueImporta:
  B: "Liberar Claude ou Codex no VS Code é abrir um segundo perímetro: as regras de sandbox, MCP e permissões que o time escreveu para o Copilot não valem nessas sessões e precisam de controle próprio."
  A: "A política de IA do time passa a ter uma linha a mais: quais agentes de terceiros entram no editor da empresa, decidida por configuração gerenciada, não por preferência de cada dev."
fonte:
  nome: "Visual Studio Code (notas da versão 1.147)"
  url: "https://code.visualstudio.com/updates/v1_147"
  data: "2026-11-18"
  tipo: primaria
outrasFontes: []
apuradoEm: "2026-11-23"
base: "vscode-1-147-admin-libera-claude-e-codex-por-politica"
correcoes: []
assinatura: agente
rascunho: false
---

O VS Code 1.147, lançado em 18/11/2026, traz a política `vscode.allowedHarnesses`, com a qual o administrador libera as sessões de Claude, de Codex ou das duas dentro do editor. A lista libera o que nomeia e bloqueia o resto, então uma lista vazia bloqueia as duas; ela só vale em configuração gerenciada por arquivo ou MDM.

As próprias notas da versão avisam que as sessões de Claude e Codex rodam sem os controles gerenciados do Copilot: permissões, sandbox, MCP e plugins. Na mesma versão, as skills entregues por servidores MCP passam a vir ligadas por padrão, com um pedido de aprovação na primeira conexão.

Na prática, o editor virou porta de entrada de vários agentes, e cada um traz o próprio perímetro. Liberar um harness de terceiro é decidir quem controla o que ele acessa, e essa decisão não está coberta pela política que o time já tem para o Copilot.

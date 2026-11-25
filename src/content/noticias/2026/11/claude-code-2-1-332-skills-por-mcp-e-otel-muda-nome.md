---
title: "Claude Code muda o nome na telemetria e o prefixo do token do runner"
excerpt: "A versão 2.1.332 do Claude Code, de 25/11/2026, passa a carregar skills de servidores MCP (beta), troca o service.name do OpenTelemetry das sessões do Code tab do desktop e aceita um novo prefixo no token OAuth do runner self-hosted."
date: "2026-11-25"
temas: ["agentes-engenharia", "governanca-e-seguranca"]
ferramentas: ["claude-code", "mcp", "agent-skills"]
porQueImporta:
  B: "Quem filtra telemetria por service.name igual a claude-code ou esconde o token do runner pelo prefixo oat01- deixa de ver parte do uso depois da atualização. Antes de subir a versão, vale revisar painéis, alertas e scrubbers de log, ou fixar OTEL_SERVICE_NAME com o nome antigo."
  A: "É uma mudança de fornecedor que quebra controle sem quebrar o produto: a pergunta ao time de plataforma é quem acompanha as notas de versão do agente de código e quem confere se o mascaramento de segredo continua valendo."
fonte:
  nome: "Claude Code (changelog)"
  url: "https://code.claude.com/docs/en/changelog"
  data: "2026-11-25"
  tipo: primaria
outrasFontes: []
apuradoEm: "2026-11-25"
base: "claude-code-2-1-332-skills-por-mcp-e-otel-muda-nome"
correcoes: []
assinatura: agente
rascunho: false
---

A versão 2.1.332 do Claude Code, publicada em 25/11/2026, passa a carregar skills de servidores MCP, em beta. Elas aparecem no menu `/` com o nome `server:skill`; as outras skills mantêm o nome.

Duas mudanças da mesma versão mexem em controle, não em recurso. O `service.name` padrão do OpenTelemetry nas sessões do Code tab do Claude Desktop passa a ser `claude-code-desktop`, e o próprio changelog manda atualizar filtros que usam `claude-code` ou fixar `OTEL_SERVICE_NAME`. No runner self-hosted, o `CLAUDE_CODE_OAUTH_TOKEN` pode ter o prefixo terminando em `oat02-`, além de `oat01-`; a recomendação é ajustar regras de proxy e scrubbers de log e mascarar o valor inteiro.

A leitura é que o risco desta versão está no que deixa de aparecer: painel de uso com buraco e token que escapa do mascaramento num log. Nenhum dos dois dá erro; só se nota quando alguém procura. Skills vindas de servidor MCP também ampliam o que entra na sessão a partir de um terceiro, e a versão é beta.

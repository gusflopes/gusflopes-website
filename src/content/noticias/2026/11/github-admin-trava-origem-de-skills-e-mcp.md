---
title: "GitHub deixa o admin decidir de onde vêm skills e MCPs do Copilot"
excerpt: "Desde 16/11, o admin do GitHub Enterprise Cloud pode barrar skills, agentes, hooks e servidores MCP trazidos por usuário ou projeto e aceitar só plugins e configuração gerenciada."
date: "2026-11-19"
temas: ["governanca-e-seguranca", "agentes-engenharia", "contexto-e-metodo"]
ferramentas: ["github-copilot", "agent-skills", "mcp"]
porQueImporta:
  B: "Quem lidera engenharia ganha uma trava para o contexto do agente, mas passa a precisar de alguém que cure, versione e distribua o plugin interno; sem isso, ligar a regra só tira ferramenta do time."
  A: "Skill e servidor MCP entram na mesma conversa de cadeia de suprimentos que dependência de código: vale perguntar quem aprova o que o agente do time pode carregar."
fonte:
  nome: "GitHub Changelog"
  url: "https://github.blog/changelog/2026-11-16-control-where-github-copilot-customizations-come-from/"
  data: "2026-11-16"
  tipo: primaria
outrasFontes: []
apuradoEm: "2026-11-17"
base: "github-admin-trava-origem-de-skills-e-mcp"
correcoes: []
assinatura: agente
rascunho: false
---

O GitHub criou em 16/11 a configuração gerenciada `strictPluginOnlyCustomization`. Com ela, o admin bloqueia as customizações do Copilot que vêm do usuário ou do projeto e deixa passar só plugins e configuração gerenciada. A trava vale para cinco categorias, juntas ou uma a uma: skills, agentes customizados, hooks, servidores MCP e extensões executáveis. Junto com `strictKnownMarketplaces`, o admin também limita de quais marketplaces os plugins podem vir.

A leitura é que o contexto do agente virou cadeia de suprimentos. Até aqui, cada pessoa podia trazer a sua skill ou o seu servidor MCP para dentro do repositório; agora a empresa pode tratar isso como trata uma dependência: fonte conhecida, versão controlada, alguém responsável.

O limite é de alcance: vale para o GitHub Enterprise Cloud, para quem tem licença Copilot Business ou Enterprise emitida pela empresa. O changelog não diz se o recurso está em preview ou em disponibilidade geral, e "só plugin" não quer dizer "só plugin da empresa": sem restringir o marketplace, plugin de terceiro continua entrando.

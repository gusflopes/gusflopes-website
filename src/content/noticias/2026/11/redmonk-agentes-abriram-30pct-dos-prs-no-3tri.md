---
title: "RedMonk: agentes abriram 30,5% dos PRs públicos no 3º trimestre"
excerpt: "O primeiro Agent Activity Index da RedMonk, publicado em 18/11/2026, contou 13,9 milhões de pull requests abertos por agentes de código no GitHub no 3º trimestre, de 45,4 milhões na amostra; a própria RedMonk trata o número como piso."
date: "2026-11-23"
temas: ["agentes-engenharia", "adocao-e-mercado"]
ferramentas: ["claude-code", "github-copilot"]
porQueImporta:
  A: "Há agora uma régua externa para comparar com o próprio time: se perto de um terço dos PRs pode vir de agente, a pergunta da liderança passa a ser onde está a revisão e como medir merge e retrabalho desse volume, não se o time já usa agente."
  B: "Como a contagem só pega agente que deixa rastro no PR, o time que quer medir o próprio uso precisa marcar o que vem de agente (autor, rodapé, prefixo de branch); sem isso, nem a empresa sabe quanto do código é de agente."
fonte:
  nome: "RedMonk (Stephen O'Grady)"
  url: "https://redmonk.com/sogrady/2026/11/18/agent-activity-index-q326/"
  data: "2026-11-18"
  tipo: primaria
outrasFontes: []
apuradoEm: "2026-11-23"
base: "redmonk-agentes-abriram-30pct-dos-prs-no-3tri"
correcoes: []
assinatura: agente
rascunho: false
---

A RedMonk, consultoria de análise de mercado para desenvolvedores, publicou em 18/11/2026 o primeiro Agent Activity Index. Numa amostra de 30 linguagens no GitHub, agentes de código abriram 13,9 milhões dos 45,4 milhões de pull requests do 3º trimestre de 2026, ou 30,5%.

O agente foi identificado pelo rastro que a ferramenta deixa no PR: o app autor, um rodapé no texto ou o prefixo da branch. Por isso a RedMonk chama o número de piso: só cobre repositórios públicos, e ferramenta que não deixa marca fica de fora. Entre as que deixam, o Claude Code aparece muito à frente das demais.

Os limites vêm do próprio autor. Não dá para separar com segurança o PR preparado por agente e enviado como humano, e a comparação de taxa de merge entre ferramentas sofre viés de seleção, porque o agente tende a receber tarefas mais fáceis. O índice mede volume, não qualidade do que entrou.

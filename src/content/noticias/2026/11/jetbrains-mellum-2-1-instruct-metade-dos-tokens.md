---
title: "JetBrains lança o Mellum2.1 Instruct, modelo aberto para subagentes"
excerpt: "A JetBrains lançou em 25/11/2026 o Mellum2.1 Instruct, modelo aberto feito para subagentes e ciclos de ferramenta; segundo a empresa, gera cerca de metade dos tokens da versão Thinking com resultado quase igual no SWE-bench Verified."
date: "2026-11-26"
temas: ["modelos", "custo-e-precificacao"]
ferramentas: ["jetbrains-mellum", "modelos-abertos"]
porQueImporta:
  B: "Modelo pequeno, aberto e local como trabalhador rápido ao lado de um modelo mais forte é uma alavanca direta de custo de token. Vale medir no próprio repositório antes de trocar, porque o benchmark é da JetBrains."
fonte:
  nome: "JetBrains AI Blog"
  url: "https://blog.jetbrains.com/ai/2026/11/mellum2-1-instruct-is-out-bringing-faster-answers-for-coding-agents/"
  data: "2026-11-25"
  tipo: primaria
outrasFontes: []
apuradoEm: "2026-11-26"
base: "jetbrains-mellum-2-1-instruct-metade-dos-tokens"
correcoes: []
assinatura: agente
rascunho: false
---

A JetBrains lançou em 25/11/2026 o Mellum2.1 Instruct, irmão do Mellum2.1 Thinking, de outubro: um modelo de 12B parâmetros em mistura de especialistas, com 2,5B ativos, feito para subagentes, ciclos de ferramenta e chat.

Segundo a empresa, em tarefas de código com agente ele gera cerca de metade dos tokens da versão Thinking e fica quase no mesmo nível no SWE-bench Verified. Os dois modelos estão no Hugging Face sob licença Apache 2.0, também em versão para rodar na própria máquina.

A leitura é que o time não precisa escolher um modelo só: o forte decide, o pequeno executa as tarefas repetitivas, e a conta de tokens cai. Em problemas difíceis de algoritmo e matemática, a própria JetBrains indica a versão Thinking.

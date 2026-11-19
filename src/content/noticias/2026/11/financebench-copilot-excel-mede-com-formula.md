---
title: "Microsoft avalia o Copilot no Excel conferindo se o número veio de fórmula"
excerpt: "A Microsoft detalhou em 16/11 o FinanceBench, avaliação interna de finanças em que a nota sai de checagem em código, e mostrou que atualizar uma skill rendeu tanto quanto trocar de modelo."
date: "2026-11-19"
temas: ["contexto-e-metodo", "areas-de-negocio", "agentes-engenharia"]
ferramentas: ["evals", "camada-deterministica", "agent-skills", "microsoft-copilot"]
porQueImporta:
  B: "É um método copiável para avaliar agente que mexe com número: checagem determinística no que dá para checar (valor certo, fórmula em vez de número digitado) e avaliador por IA só para o resto."
  A: "Antes de comparar modelos, vale perguntar ao time como o agente é avaliado; aqui, melhorar a instrução do agente mexeu na nota tanto quanto a troca de modelo."
fonte:
  nome: "Microsoft Copilot Blog"
  url: "https://techcommunity.microsoft.com/t5/microsoft-copilot-blog/financebench-the-loop-that-continually-improves-copilot-in-excel/ba-p/4573279"
  data: "2026-11-16"
  tipo: primaria
outrasFontes: []
apuradoEm: "2026-11-17"
base: "financebench-copilot-excel-mede-com-formula"
correcoes: []
assinatura: agente
rascunho: false
---

A Microsoft publicou em 16/11 como avalia o Copilot no Excel em tarefas de finanças. O FinanceBench reúne casos escolhidos entre mais de 1.000 avaliações de finanças e separa dois tipos de checagem: a determinística, feita em código, confere se a célula tem o valor esperado e se o número sai de fórmula em vez de ter sido digitado; um avaliador por IA cuida do que não dá para checar assim, como legibilidade e formatação.

O dado mais útil não é a nota do produto, e sim de onde veio o ganho. Em 114 casos, só a atualização da skill de três demonstrativos subiu a taxa de acerto em 12 pontos com o GPT 5.6 e em 7 pontos com o Opus 5.5. Instrução e método pesam tanto quanto o modelo escolhido.

O limite: o benchmark é do próprio fornecedor e não é público, então os números não servem para comparar ferramentas. O que vale levar é o desenho da avaliação: "a IA conversa, o software calcula" vira também a forma de dar nota ao agente.

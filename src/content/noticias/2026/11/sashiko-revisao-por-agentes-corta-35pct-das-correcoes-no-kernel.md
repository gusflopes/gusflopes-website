---
title: "Revisão por agentes no kernel Linux corta 35% das correções pós-merge"
excerpt: "O Google publicou em 18/11/2026 os números do Sashiko, revisor de código por agentes usado no kernel Linux: a fatia de commits que precisaram de correção em 60 dias caiu de 3,4% para 2,2% no Linux 7.2."
date: "2026-11-23"
temas: ["agentes-engenharia", "engenharia-de-software"]
ferramentas: ["sashiko", "evals"]
porQueImporta:
  B: "A métrica que o kernel usou cabe em qualquer repositório: quantos commits precisaram de correção em 30 ou 60 dias. É um jeito de saber se a revisão por agente está pegando defeito ou só gerando comentário, e de tratar alerta crítico ignorado como sinal de risco."
  A: "Para justificar revisor por agente, a régua deixa de ser \"PRs revisados\" e passa a ser correção depois do merge; antes de comprar, vale pedir ao fornecedor esse número no código da própria empresa."
fonte:
  nome: "Google Cloud Blog"
  url: "https://cloud.google.com/blog/products/application-development/lessons-from-building-sashiko-an-agentic-code-review-system"
  data: "2026-11-18"
  tipo: primaria
outrasFontes:
  - nome: "Phoronix"
    url: "https://www.phoronix.com/news/Sashiko-Linux-AI-Metrics"
    data: "2026-11-18"
    tipo: imprensa
apuradoEm: "2026-11-23"
base: "sashiko-revisao-por-agentes-corta-35pct-das-correcoes-no-kernel"
correcoes: []
assinatura: agente
rascunho: false
---

O Google publicou em 18/11/2026 o balanço do Sashiko, sistema de revisão de código por agentes, baseado no Gemini, que revisa patches do kernel Linux e foi doado à Linux Foundation neste ano. Desde março, foram 241 mil revisões.

Nas 18 versões do Linux 6.2 ao 6.19, em média 3,4% dos commits mesclados precisaram de correção em até 60 dias; no Linux 7.2, foram 2,2%, queda de 35%. E o patch mesclado apesar de um alerta crítico do Sashiko precisou de correção 7,6% das vezes, contra 0,9% quando a revisão saiu limpa.

O desconto vem dos próprios autores: é cedo para conclusões fortes, a queda não pode ser creditada só ao Sashiko e a comparação entre alerta e revisão limpa é observação, não experimento. O post também não traz taxa de falso positivo nem custo da operação.

Mesmo assim, é a primeira medida pública de revisão por agente em escala que olha o defeito que passou, e não o volume de comentários.

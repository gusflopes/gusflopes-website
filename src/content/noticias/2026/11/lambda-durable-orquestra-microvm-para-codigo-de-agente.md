---
title: "AWS põe em preview Lambda MicroVMs orquestradas por durable functions"
excerpt: "A AWS lançou em 25/11/2026, em developer preview, uma extensão das Lambda durable functions que orquestra Lambda MicroVMs, pensada para rodar código não confiável ou gerado por IA em sandbox, scanners e jobs de CI/CD."
date: "2026-11-26"
temas: ["agentes-engenharia", "plataformas"]
ferramentas: ["aws-lambda"]
porQueImporta:
  B: "Para quem roda código gerado por agente, o sandbox com estado e retentativa vira peça pronta do serverless. Dá para testar o desenho agora, mas a própria AWS diz para não usar em produção, e a página não informa preço."
fonte:
  nome: "AWS (What's New)"
  url: "https://aws.amazon.com/about-aws/whats-new/2026/11/lambda-durable-microvm/"
  data: "2026-11-25"
  tipo: primaria
outrasFontes: []
apuradoEm: "2026-11-26"
base: "lambda-durable-orquestra-microvm-para-codigo-de-agente"
correcoes: []
assinatura: agente
rascunho: false
---

A AWS lançou em 25/11/2026, em developer preview, uma extensão das Lambda durable functions para orquestrar Lambda MicroVMs. A função durável guarda o progresso, refaz tarefas que falharam e renova os tokens das MicroVMs quando precisa.

O preview vale para o SDK de Durable Execution em TypeScript e Python, e a AWS avisa que o recurso pode mudar e não deve ser usado em produção.

A leitura é que rodar código de agente em sandbox está virando primitiva de nuvem, a poucos dias do re:Invent. O que falta saber é o preço e quando sai do preview.

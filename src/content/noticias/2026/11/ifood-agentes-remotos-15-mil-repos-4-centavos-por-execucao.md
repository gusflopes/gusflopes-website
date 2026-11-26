---
title: "iFood roda agente de código em 15 mil repositórios a US$ 0,04 por tarefa"
excerpt: "Case publicado pela OpenAI em 24/11/2026 descreve a plataforma de agentes remotos do iFood: a tarefa chega por API, o agente trabalha num sandbox isolado e devolve um merge request, a um custo médio de US$ 0,04 por execução."
date: "2026-11-26"
temas: ["agentes-engenharia", "governanca-e-seguranca"]
ferramentas: ["gpt", "openai-api", "camada-deterministica"]
porQueImporta:
  B: "O desenho é copiável: o agente entra como serviço interno, com entrada por API, ambiente isolado e saída que passa pela revisão de sempre, o merge request. O que o case não mostra é quanto do que o agente propõe é aceito sem retrabalho."
  A: "Custo por execução é um número que dá para pedir ao time: antes de discutir licença por pessoa, vale perguntar quanto custa cada tarefa entregue pelo agente e quem revisa. O número é da própria empresa, divulgado pelo fornecedor."
fonte:
  nome: "OpenAI (case do iFood)"
  url: "https://openai.com/business/customer-stories/ifood"
  data: "2026-11-24"
  tipo: primaria
outrasFontes: []
apuradoEm: "2026-11-26"
base: "ifood-agentes-remotos-15-mil-repos-4-centavos-por-execucao"
correcoes: []
assinatura: agente
rascunho: false
---

A OpenAI publicou em 24/11/2026 um case sobre a Remote Agents Platform do iFood. A tarefa chega por uma API REST, o agente roda num sandbox isolado e o resultado volta como merge request no repositório.

Segundo o case, a plataforma atua nos mais de 15 mil repositórios do iFood, com custo médio de US$ 0,04 por execução.

A leitura é que o agente de código deixa de ser ferramenta individual do desenvolvedor e passa a ser um serviço da empresa, com a revisão humana no mesmo lugar onde já estava. O limite é a fonte: é case de fornecedor, com números da própria empresa, e sem dado sobre a qualidade do que foi entregue.

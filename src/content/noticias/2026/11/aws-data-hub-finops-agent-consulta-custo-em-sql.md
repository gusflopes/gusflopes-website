---
title: "AWS Data Hub deixa o agente de FinOps consultar o custo em SQL"
excerpt: "A AWS lançou em 20/11/2026, em prévia, o Data Hub no Billing and Cost Management: 13 meses de custo e uso por hora e por recurso, que o AWS FinOps Agent consulta em SQL sem pipeline próprio."
date: "2026-11-21"
temas: ["custo-e-precificacao", "agentes-negocio", "plataformas"]
ferramentas: ["aws-finops-agent"]
porQueImporta:
  B: "Quem opera a conta pode explicar a variação de custo até o recurso e a tag do time sem montar o pipeline do CUR; é FinOps comprado em vez de construído, e vale testar enquanto a prévia não cobra."
fonte:
  nome: "AWS (What's New)"
  url: "https://aws.amazon.com/about-aws/whats-new/2026/11/data-hub-billing-cost-management-preview/"
  data: "2026-11-20"
  tipo: primaria
outrasFontes: []
apuradoEm: "2026-11-21"
base: "aws-data-hub-finops-agent-consulta-custo-em-sql"
correcoes: []
assinatura: agente
rascunho: false
---

A AWS lançou em 20/11/2026, em prévia, o Data Hub no Billing and Cost Management: uma camada gerida com 13 meses de custo e uso por hora e por recurso, no esquema do CUR 2.0, com identificadores de recurso e tags de alocação.

O AWS FinOps Agent consulta esses dados em SQL, sem exportação. A prévia roda em us-east-1, cobre os dados de todas as regiões e, configurada na conta de gestão, as contas da organização. A AWS diz que não cobra pelo Data Hub durante a prévia.

O trabalho que hoje é de um time de dados (exportar o CUR, montar tabela, escrever consulta) vira serviço. O preço depois da prévia ainda não foi publicado.

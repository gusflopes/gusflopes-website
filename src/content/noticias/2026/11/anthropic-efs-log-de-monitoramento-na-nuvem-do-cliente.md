---
title: "Anthropic libera log de monitoramento na nuvem do cliente, diz imprensa"
excerpt: "Segundo a Bloomberg de 23/11/2026, a Anthropic começou a liberar o Enterprise Frontier Safeguards, em que o registro usado para detectar mau uso fica na nuvem do próprio cliente; a página oficial do recurso diz que ele não tem cobrança da Anthropic."
date: "2026-11-24"
temas: ["governanca-e-seguranca", "plataformas"]
ferramentas: ["claude"]
porQueImporta:
  A: "Onde fica o registro do que os funcionários mandam ao modelo é critério de compra do jurídico e do compliance: se a liberação se confirmar, o log passa a ficar numa conta que a empresa controla, e vale pedir o acesso por escrito."
fonte:
  nome: "Anthropic"
  url: "https://www.anthropic.com/news/enterprise-frontier-safeguards"
  data: "2026-09-01"
  tipo: primaria
outrasFontes:
  - nome: "Bloomberg"
    url: "https://www.bloomberg.com/news/articles/2026-11-23/anthropic-rolls-out-zero-data-retention-policy-for-advanced-ai"
    data: "2026-11-23"
    tipo: imprensa
apuradoEm: "2026-11-24"
base: "anthropic-efs-log-de-monitoramento-na-nuvem-do-cliente"
correcoes: []
assinatura: agente
rascunho: true
---

A Bloomberg noticiou em 23/11/2026 que a Anthropic começou a liberar o Enterprise Frontier Safeguards (EFS), recurso anunciado em 01/09. Pela página oficial, o EFS combina retenção zero de dados com a detecção de mau uso, e o registro usado no monitoramento pode ficar na nuvem do próprio cliente (S3, Azure Blob ou Google Cloud Storage), não na da Anthropic.

A página diz que a Anthropic não cobra pelo EFS; o armazenamento é cobrado pelo provedor de nuvem do cliente. O acesso é por pedido, num formulário, e a liberação é em fases.

O limite é grande: a página oficial segue datada de setembro, sem nota sobre a liberação, e as matérias de imprensa divergem sobre o prazo de retenção e sobre quais modelos entram. Até a Anthropic confirmar, é anúncio de imprensa sobre um recurso que a empresa já tinha prometido.

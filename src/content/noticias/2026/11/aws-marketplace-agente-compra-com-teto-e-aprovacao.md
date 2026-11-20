---
title: "AWS deixa agente comprar no Marketplace com teto de gasto e aprovação"
excerpt: "A AWS anunciou em 19/11/2026 que agentes de IA podem comprar produtos selecionados do AWS Marketplace por requisição, com a cobrança na fatura da AWS; no mesmo dia, o Marketplace ganhou aprovação de compra por e-mail, Coupa e SAP Ariba."
date: "2026-11-20"
temas: ["agentes-negocio", "governanca-e-seguranca", "custo-e-precificacao"]
ferramentas: ["aws-marketplace", "aws-bedrock", "humano-no-circuito", "cobranca-por-uso"]
porQueImporta:
  A: "O agente que compra sozinho chega com os controles que o financeiro já usa: teto, vendedor aprovado e aprovação no Coupa ou no Ariba. A decisão passa a ser quem define o teto e quem aprova a exceção."
  B: "A compra vira uma chamada paga dentro do fluxo do agente, registrada no CloudTrail e no Cost Explorer; trate o teto e a lista de vendedores como configuração versionada, como uma permissão de IAM."
fonte:
  nome: "AWS (What's New)"
  url: "https://aws.amazon.com/about-aws/whats-new/2026/11/marketplace-agentic-payments-agentcore/"
  data: "2026-11-19"
  tipo: primaria
outrasFontes:
  - nome: "AWS (What's New)"
    url: "https://aws.amazon.com/about-aws/whats-new/2026/11/marketplace-buyer-approvals/"
    data: "2026-11-19"
    tipo: primaria
apuradoEm: "2026-11-20"
base: "aws-marketplace-agente-compra-com-teto-e-aprovacao"
correcoes: []
assinatura: agente
rascunho: false
---
A AWS anunciou em 19/11/2026 que agentes de IA podem achar e comprar produtos selecionados do AWS Marketplace pagando por requisição, em dólar, pelo protocolo x402, via AgentCore payments. A cobrança cai na fatura da AWS, sem cadastro em cada vendedor nem chave de API à parte.

Antes de o agente comprar, o cliente define limite de gasto, vendedores aprovados e regras, e as políticas do Private Marketplace continuam valendo. No mesmo dia, o Marketplace ganhou políticas de aprovação de compra, com aprovadores por e-mail ou pelo sistema de compras no Coupa e no SAP Ariba.

A página não diz se o pagamento por agente está em disponibilidade geral ou em prévia, e ele só vale nas regiões em que o AgentCore payments existe. O que muda é o desenho: a compra feita por agente passa pelo mesmo trilho de compras e auditoria da empresa, e não por um cartão solto.

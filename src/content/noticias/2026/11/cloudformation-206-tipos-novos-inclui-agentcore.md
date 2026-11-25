---
title: "CloudFormation ganha 206 tipos novos, entre eles a política do AgentCore"
excerpt: "A AWS anunciou em 24/11/2026 suporte a 206 novos tipos de recurso no CloudFormation, em 88 serviços, incluindo o PolicyEngine do Amazon Bedrock AgentCore."
date: "2026-11-25"
temas: ["plataformas", "governanca-e-seguranca"]
ferramentas: ["aws-cloudformation", "aws-bedrock"]
porQueImporta:
  B: "Quem já descreve a infraestrutura em CloudFormation pode pôr a política dos agentes do AgentCore no mesmo template, com revisão em pull request e histórico no git, em vez de configurar à mão no console."
fonte:
  nome: "AWS (What's New)"
  url: "https://aws.amazon.com/about-aws/whats-new/2026/11/cloudformation-coverage-expansion/"
  data: "2026-11-24"
  tipo: primaria
outrasFontes: []
apuradoEm: "2026-11-25"
base: "cloudformation-206-tipos-novos-inclui-agentcore"
correcoes: []
assinatura: agente
rascunho: false
---

A AWS anunciou em 24/11/2026 que o CloudFormation passou a suportar 206 novos tipos de recurso, em 88 serviços. Entre eles está o PolicyEngine do Amazon Bedrock AgentCore, o serviço da AWS para rodar agentes. O Cloud Control API acompanha os mesmos tipos e passa a ler 224 tipos de recurso em 99 serviços.

A leitura é que a governança de agente começa a entrar no mesmo fluxo da infraestrutura: a regra do que o agente pode fazer vira arquivo versionado e revisado, e não só uma tela no console. Vale para quem já usa infraestrutura como código na AWS; o anúncio não diz quais propriedades da política estão cobertas, e isso se confere na documentação de cada tipo.

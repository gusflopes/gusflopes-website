---
title: "Lambda passa a aceitar runtime mantido pelo time de plataforma"
excerpt: "A AWS lançou em 18/11/2026 runtimes geridos pelo cliente no Lambda: o time de plataforma publica um runtime próprio, com o que toda função precisa ter, e as funções recebem as atualizações sem reimplantar."
date: "2026-11-19"
temas: ["plataformas", "engenharia-de-software"]
ferramentas: ["aws-lambda", "kubernetes"]
porQueImporta:
  B: "SDK aprovado, certificado e agente de segurança deixam de ser responsabilidade de cada time: o runtime central é atualizado uma vez e chega a todas as funções."
fonte:
  nome: "AWS What's New"
  url: "https://aws.amazon.com/about-aws/whats-new/2026/11/aws-lambda-customer-managed-runtimes/"
  data: "2026-11-18"
  tipo: primaria
outrasFontes:
  - nome: "AWS What's New (EKS Hybrid Nodes)"
    url: "https://aws.amazon.com/about-aws/whats-new/2026/11/amazon-eks-hybrid-nodes-pricing-change/"
    data: "2026-11-18"
    tipo: primaria
apuradoEm: "2026-11-19"
base: "aws-lambda-runtime-gerido-pelo-time-de-plataforma"
correcoes: []
assinatura: agente
rascunho: false
---

A AWS lançou em 18/11/2026 runtimes geridos pelo cliente no Lambda. O time de plataforma publica um runtime próprio, como imagem OCI no ECR, com SDKs, certificados e agentes de segurança aprovados, e as funções recebem as atualizações sem reimplantar.

No mesmo dia, o EKS Hybrid Nodes passou a cobrar no máximo 32 vCPUs por nó, o que barateia rodar nós grandes fora da AWS.

As duas mudanças vão na direção da plataforma interna como produto: o que é padrão sai da mão de cada time e vai para uma camada central.

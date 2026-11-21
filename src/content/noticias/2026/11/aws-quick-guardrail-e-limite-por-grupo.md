---
title: "Amazon Quick ganha guardrails e limite de uso por grupo"
excerpt: "A AWS lançou em 20/11/2026, em prévia, guardrails corporativos no Amazon Quick e perfis que definem, por grupo do provedor de identidade, quem pode criar agente e quantas horas de agente cada pessoa tem."
date: "2026-11-21"
temas: ["governanca-e-seguranca", "agentes-negocio", "plataformas"]
ferramentas: ["amazon-quick", "politica-de-ia"]
porQueImporta:
  C: "Para TI enxuta, a política de IA por área vira configuração no grupo do diretório: o financeiro usa o assistente sem criar agente, e cada pessoa tem um teto de uso; o preço não foi informado."
fonte:
  nome: "AWS (What's New)"
  url: "https://aws.amazon.com/about-aws/whats-new/2026/11/aws-quick-enterprise-guardrails-preview/"
  data: "2026-11-20"
  tipo: primaria
outrasFontes:
  - nome: "AWS (What's New)"
    url: "https://aws.amazon.com/about-aws/whats-new/2026/11/aws-quick-group-assignments-custom-permissions-limit-profiles/"
    data: "2026-11-20"
    tipo: primaria
apuradoEm: "2026-11-21"
base: "aws-quick-guardrail-e-limite-por-grupo"
correcoes: []
assinatura: agente
rascunho: false
---

A AWS lançou em 20/11/2026, em prévia para clientes selecionados dos planos Professional e Enterprise, guardrails corporativos no Amazon Quick: filtro de conteúdo, tópicos e palavras bloqueados, detecção de ataque de prompt e controle de dados pessoais. A política vale por usuário, por grupo do provedor de identidade ou como padrão da conta, e pode rodar primeiro só registrando, sem bloquear.

No mesmo dia, o Quick passou a aceitar perfis por grupo do provedor de identidade: um perfil de permissão pode impedir os membros de criar agentes, e um perfil de limite define a capacidade de índice e as horas de agente de cada membro.

É governança de IA aplicada onde a empresa já organiza as pessoas, no diretório. A AWS não informou preço.

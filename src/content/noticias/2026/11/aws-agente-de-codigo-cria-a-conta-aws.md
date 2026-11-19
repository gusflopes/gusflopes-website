---
title: "AWS deixa o agente de código abrir a conta e receber credenciais"
excerpt: "Desde 17/11/2026, agentes de código como Claude Code, Codex e Cursor podem abrir o cadastro da AWS no navegador; a pessoa conclui e o agente recebe credenciais de curta duração que se renovam sozinhas."
date: "2026-11-19"
temas: ["agentes-engenharia", "governanca-e-seguranca"]
ferramentas: ["claude-code", "codex", "cursor", "identidade-de-agentes"]
porQueImporta:
  B: "O primeiro deploy sai de dentro do agente, sem console; para quem governa a nuvem da empresa, conta AWS aberta por agente fora da organização vira um caso novo de nuvem paralela a vigiar."
fonte:
  nome: "AWS (What's New)"
  url: "https://aws.amazon.com/about-aws/whats-new/2026/11/agentic-account-creation/"
  data: "2026-11-17"
  tipo: primaria
outrasFontes: []
apuradoEm: "2026-11-18"
base: "aws-agente-de-codigo-cria-a-conta-aws"
correcoes: []
assinatura: agente
rascunho: false
---

A AWS lançou em 17/11/2026 um cadastro de conta pensado para agentes de código: o agente abre a página de cadastro no navegador, a pessoa conclui, e as credenciais voltam para o agente. São credenciais de curta duração que se renovam sozinhas, e o primeiro projeto já vem com região padrão e um gerenciador de papéis IAM.

A nuvem passa a disputar o desenvolvedor dentro do agente, não no console. Para quem está começando, é menos atrito até o primeiro deploy.

O anúncio não fala de teto de gasto nem de vínculo com uma organização AWS existente, que é o que interessa a quem cuida de várias contas.

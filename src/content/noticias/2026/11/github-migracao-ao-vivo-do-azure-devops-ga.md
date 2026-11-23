---
title: "GitHub migra repositório do Azure DevOps sem parar o time"
excerpt: "O GitHub tornou disponível em 19/11/2026 a migração ao vivo do Azure DevOps Services para o GitHub Enterprise Cloud: o repositório vai com PRs e regras, e Boards e Pipelines ficam no Azure DevOps."
date: "2026-11-23"
temas: ["engenharia-de-software", "plataformas"]
ferramentas: ["azure-devops"]
porQueImporta:
  B: "Para o time que vive no Azure DevOps, levar o código para o GitHub deixa de exigir congelar o repositório: dá para migrar com PRs e políticas de branch e manter Boards e Pipelines onde estão."
  A: "A migração vira projeto de baixo risco operacional, o que muda a conta de quem adiava sair do Azure DevOps; o changelog não traz limites nem preço, que precisam ser confirmados antes do plano."
fonte:
  nome: "GitHub Changelog"
  url: "https://github.blog/changelog/2026-11-19-enterprise-live-migrations-from-azure-devops-generally-available"
  data: "2026-11-19"
  tipo: primaria
outrasFontes: []
apuradoEm: "2026-11-23"
base: "github-migracao-ao-vivo-do-azure-devops-ga"
correcoes: []
assinatura: agente
rascunho: false
---

O GitHub tornou disponível para todos em 19/11/2026 as Enterprise Live Migrations, que levam repositórios do Azure DevOps Services para o GitHub Enterprise Cloud, inclusive com residência de dados. Vão o histórico Git, branches, tags e pull requests com comentários, e as políticas de branch viram rulesets do GitHub.

A diferença para uma migração comum é que a sincronização continua durante o processo: o time segue trabalhando no Azure DevOps até um corte final curto, agendado pelo cliente. Work items e definições de pipeline ficam no Azure DevOps, e a ferramenta religa Azure Boards e Azure Pipelines ao novo repositório.

Não é notícia de IA, mas é o caminho que a Microsoft abre para quem quer o código onde estão os agentes de código mais novos sem trocar o resto da esteira. O changelog não informa limites de tamanho nem preço.

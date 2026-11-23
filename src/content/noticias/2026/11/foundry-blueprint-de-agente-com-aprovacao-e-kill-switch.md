---
title: "Foundry: blueprint de agente com aprovação do admin e kill switch"
excerpt: "A Microsoft apresentou em 19/11/2026 os blueprints de agente no Foundry: o dev define o que o agente pode fazer, o admin aprova, cada funcionário cria a sua instância e um kill switch desliga a família inteira."
date: "2026-11-23"
temas: ["agentes-engenharia", "governanca-e-seguranca"]
ferramentas: ["microsoft-foundry", "agent-365", "identidade-de-agentes", "humano-no-circuito"]
porQueImporta:
  B: "Quem constrói agente para uso interno passa a entregar um modelo com APIs e ferramentas MCP fechadas, não uma instância por pessoa; o acesso aos dados de cada área fica com quem usa, não no blueprint."
  A: "O kill switch por classe de agente é o controle que permite desligar uma família inteira de agentes numa ação, sem caçar instância por instância; vale exigir isso antes de liberar agente para todos."
fonte:
  nome: "Microsoft Foundry Blog"
  url: "https://devblogs.microsoft.com/foundry/build-trusted-autonomous-agents-for-your-team-with-microsoft-foundry/"
  data: "2026-11-19"
  tipo: primaria
outrasFontes: []
apuradoEm: "2026-11-23"
base: "foundry-blueprint-de-agente-com-aprovacao-e-kill-switch"
correcoes: []
assinatura: agente
rascunho: false
---

A Microsoft apresentou em 19/11/2026, no Ignite, os blueprints de agente no Foundry. Quem constrói define num modelo reutilizável o que o agente pode fazer, como as APIs que chama e as ferramentas MCP que acessa; depois que o administrador aprova, cada pessoa autorizada cria a própria instância, com identidade e conta de usuário de agente.

O post diz que um único kill switch desliga uma classe inteira de agentes numa ação, e que a frota é gerida pelo Agent 365. Segundo a Microsoft, os próprios funcionários já criaram mais de 30 blueprints no Foundry.

O desenho separa três papéis: quem constrói, quem aprova e quem usa. É o modelo de agente como serviço interno, com um ponto de desligamento por família. O post não diz se o recurso está em disponibilidade geral ou em prévia, nem quanto custa.

---
title: "Claude Code abre no modo auto em Bedrock, Google Cloud e Foundry"
excerpt: "A versão 2.1.328 do Claude Code, de 19/11/2026, liberou o modo auto para Opus 4.6 e Sonnet 4.6 no Amazon Bedrock, no Agent Platform do Google Cloud e no Microsoft Foundry; sessões interativas sem modo de permissão definido passam a começar nele."
date: "2026-11-20"
temas: ["agentes-engenharia", "governanca-e-seguranca"]
ferramentas: ["claude-code", "aws-bedrock", "google-cloud-vertex", "microsoft-foundry", "humano-no-circuito"]
porQueImporta:
  B: "Quem usa o Claude Code pela nuvem contratada passa a ter, por padrão, o agente rodando sem pedir aprovação a cada passo. Se o time quer outro comportamento, o modo tem de estar fixado nos managed settings, e o hook com bloqueio na falha fecha a porta quando a checagem cai."
  A: "O padrão de autonomia do agente de código mudou por decisão do fornecedor, não da empresa; vale perguntar ao time de plataforma qual modo está fixado e quem aprovou."
fonte:
  nome: "GitHub (anthropics/claude-code, notas de versão)"
  url: "https://github.com/anthropics/claude-code/releases"
  data: "2026-11-19"
  tipo: primaria
outrasFontes: []
apuradoEm: "2026-11-20"
base: "claude-code-modo-auto-padrao-em-bedrock-vertex-e-foundry"
correcoes: []
assinatura: agente
rascunho: false
---
A versão 2.1.328 do Claude Code, publicada em 19/11/2026, liberou o modo auto para o Claude Opus 4.6 e o Sonnet 4.6 no Amazon Bedrock, no Agent Platform do Google Cloud, no Microsoft Foundry e no gateway do Claude apps. Sessões interativas sem modo de permissão definido passam a começar nele.

A mesma versão trouxe a opção `"onFailure": "block"` para hooks do tipo `mcp_tool`: se a chamada do hook falha, a ação é bloqueada, como já acontecia com hooks de comando e HTTP. Apps que embutem o Claude Code também podem ligar a opção `allowManagedModsOnly`, e os managed settings do administrador continuam prevalecendo.

O ponto é o padrão: quem não fixou o modo de permissão passa a rodar com menos aprovações sem ter decidido isso. As notas de versão não detalham o que o modo auto ainda pede para confirmar.

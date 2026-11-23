---
title: "LG U+ chega a 20 mil agentes e bloqueia o que não tem dono"
excerpt: "Na sessão de governança do Agent 365 no Ignite, em 19/11/2026, a operadora sul-coreana LG U+ disse que seus funcionários criaram mais de 20 mil agentes só no tenant Microsoft e que agente sem registro, identidade e dono não roda."
date: "2026-11-23"
temas: ["governanca-e-seguranca", "agentes-negocio"]
ferramentas: ["agent-365", "microsoft-entra", "politica-de-ia"]
porQueImporta:
  A: "A regra de entrada (registro, identidade e dono com nome, ou o agente não roda) é política que dá para adotar antes de escolher qualquer painel: define quem responde por cada agente desde o primeiro dia, e não na faxina depois."
  C: "Na compra de plataforma de agentes, a pergunta muda de \"onde o agente é criado\" para \"onde ele é registrado e desligado\": a LG U+ usa agentes de várias nuvens e SaaS e quer um único ponto de controle para todos."
fonte:
  nome: "Microsoft Ignite 2026, sessão BRK345 (vídeo oficial)"
  url: "https://youtu.be/7kRTopS4Xfg?t=261"
  data: "2026-11-19"
  tipo: primaria
outrasFontes: []
apuradoEm: "2026-11-23"
base: "lg-uplus-20-mil-agentes-sem-dono-nao-roda"
correcoes: []
assinatura: agente
rascunho: false
---

A LG U+, uma das três grandes operadoras móveis da Coreia do Sul, contou na sessão BRK345 do Ignite, em 19/11/2026, que padronizou o Copilot como ferramenta de trabalho em maio e que seus funcionários já criaram mais de 20 mil agentes só no tenant da Microsoft, sem contar os que rodam em outras nuvens, SaaS e na plataforma interna. O número foi dito no palco pela empresa, sem método publicado.

A resposta foi uma regra de entrada, não uma plataforma: sem registro, sem identidade, sem dono, sem operação. Agente novo precisa estar num registro único, ter identidade própria e um dono ativo com nome; se faltar qualquer um dos três, é bloqueado ou aposentado. Na síntese do executivo da operadora, "we just need one control plane for every agent": não uma plataforma para todos os agentes, mas um único plano de controle.

O caso foi apresentado na sessão de um fornecedor, a Microsoft, que vende o Agent 365 como esse plano de controle. A lição que vale fora dele é a ordem: primeiro a regra de quem responde pelo agente, depois a ferramenta que a aplica.

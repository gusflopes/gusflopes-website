---
title: "Azure SRE Agent pede aprovação no Teams e fala com outros agentes"
excerpt: "A Microsoft pôs em prévia pública, em 18/11/2026, o Azure SRE Agent dentro do Teams, com cada ação marcada como permitida, sujeita a aprovação ou bloqueada, e a colaboração entre agentes de times diferentes por A2A."
date: "2026-11-19"
temas: ["agentes-engenharia", "governanca-e-seguranca"]
ferramentas: ["azure-sre-agent", "humano-no-circuito", "a2a"]
porQueImporta:
  B: "O humano no circuito do agente de operação vira configuração por ação, no chat onde o time já responde a incidentes; antes de ligar, o time precisa decidir quais mitigações exigem aprovação e quem aprova de madrugada."
fonte:
  nome: "Microsoft Tech Community"
  url: "https://techcommunity.microsoft.com/t5/apps-on-azure-blog/beyond-the-pilot-scaling-azure-sre-agent-across-your-enterprise/ba-p/4573349"
  data: "2026-11-18"
  tipo: primaria
outrasFontes: []
apuradoEm: "2026-11-19"
base: "azure-sre-agent-no-teams-com-aprovacao-e-a2a"
correcoes: []
assinatura: agente
rascunho: false
---

A Microsoft pôs em prévia pública, em 18/11/2026, a integração do Azure SRE Agent, o agente de operação do Azure, com o Teams. O time conversa com o agente no chat, e o admin marca cada ação como permitida, sujeita a aprovação ou bloqueada; o acesso do agente aos recursos do Azure continua governado pela identidade e pelas permissões dele, à parte do chat.

Também entrou em prévia pública a colaboração agente-a-agente (A2A) entre times: cada agente só aceita pedidos de chamadores que o time aprovou, identificados pela identidade no Microsoft Entra. A integração com o Slack segue em prévia privada.

A aprovação sai do runbook e vai para a mensagem no chat. O post não fala de preço, e o cenário de incidente que ele descreve é exemplo, não medição.

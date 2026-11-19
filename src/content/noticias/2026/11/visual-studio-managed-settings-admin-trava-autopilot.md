---
title: "Admin do Visual Studio poderá travar o modo Autopilot do Copilot"
excerpt: "Na .NET Conf, em 11/11/2026, a Microsoft mostrou as managed settings do Visual Studio: o administrador distribui controles do Copilot, e o primeiro é travar o Autopilot, em que o agente age sem pedir aprovação. Por ora, só no Insiders."
date: "2026-11-19"
temas: ["governanca-e-seguranca", "agentes-engenharia"]
ferramentas: ["visual-studio", "github-copilot", "humano-no-circuito", "politica-de-ia"]
porQueImporta:
  A: "Instrução e skill orientam o agente; política gerenciada controla. Defina já quem pode usar o modo sem aprovação e em que contas, porque o controle chega à IDE agora, ainda em versão de teste."
  B: "Conte com o Autopilot bloqueado em contas da empresa quando a política sair do Insiders; fluxos que dependem do agente agir sozinho precisam de plano com aprovação."
fonte:
  nome: ".NET Conf 2026 (canal .NET no YouTube)"
  url: "https://youtu.be/CnV8B-ER67k?t=1330"
  data: "2026-11-11"
  tipo: primaria
outrasFontes: []
apuradoEm: "2026-11-19"
base: "visual-studio-managed-settings-admin-trava-autopilot"
correcoes: []
assinatura: agente
rascunho: false
---

Na sessão "The State of AI in Visual Studio", da .NET Conf 2026, em 11/11, o time do Visual Studio apresentou as managed settings: o administrador define e distribui controles do Copilot pelo GitHub, por MDM (a gestão de dispositivos da empresa) ou por arquivo de configuração.

O primeiro controle é travar o Autopilot, o modo em que o agente age sem pedir aprovação. Na demo, a mesma pessoa tem o Autopilot liberado numa conta e bloqueado pelo administrador em outra. O recurso está no Visual Studio Insiders; outros controles vêm "soon", sem data.

A justificativa dita no palco foi separar "helpful guidance from controls that organizations actually manage". A primeira política que a Microsoft entregou ao administrador foi justamente a da aprovação: é ali, e não no modelo, que a empresa sente o risco.

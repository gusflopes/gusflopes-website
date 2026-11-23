---
title: "Copilot harness no Foundry passa a ser cobrado em 1º de dezembro"
excerpt: "O Copilot harness do Foundry Agent Service, em prévia desde 28/10/2026 e mostrado de novo no Ignite, começa a ser cobrado em 01/12/2026 por hora de vCPU e de memória do sandbox, além do modelo e das ferramentas."
date: "2026-11-23"
temas: ["custo-e-precificacao", "agentes-engenharia"]
ferramentas: ["microsoft-foundry", "microsoft-copilot-sdk", "cobranca-por-uso"]
porQueImporta:
  B: "Quem montou prova de conceito no harness durante a prévia grátis tem até 01/12 para medir quantas horas de sandbox cada agente consome, e para escolher o harness com cuidado: trocar depois de criar o agente ainda não é possível."
  A: "O harness vira linha própria no custo do agente, somada ao modelo: a conta de um agente que roda horas em tarefas longas passa a ter tempo de máquina, não só tokens."
fonte:
  nome: "Microsoft Foundry Blog"
  url: "https://devblogs.microsoft.com/foundry/microsoft-copilot-harness-in-foundry/"
  data: "2026-10-28"
  tipo: primaria
outrasFontes: []
apuradoEm: "2026-11-23"
base: "copilot-harness-no-foundry-cobra-a-partir-de-1-dez"
correcoes: []
assinatura: agente
rascunho: false
---

O Copilot harness no Foundry Agent Service é a camada gerenciada que roda o ciclo do agente (planejar, chamar ferramentas, executar tarefas longas) dentro de um sandbox da Microsoft. Está em prévia pública desde 28/10/2026 e voltou a aparecer na semana do Ignite, num vídeo do Microsoft Mechanics.

A cobrança começa em 1º de dezembro de 2026: US$ 0,0994 por vCPU-hora e US$ 0,0118 por GiB-hora de memória do sandbox, com variação por região e contrato. O modelo e as ferramentas continuam cobrados à parte. Até lá, o uso do harness é grátis.

Há uma restrição na própria página: trocar o harness depois de criar o agente ainda não é suportado.

O preço por hora é baixo, mas o que define a conta é quanto tempo o agente fica ligado, e esse número a prévia grátis não mostrava.

---
title: "Red Hat roda seus agentes de desenvolvimento presos no OpenShell"
excerpt: "Na KubeCon NA, em 10/11/2026, a Red Hat contou que roda todo dia seu ciclo de desenvolvimento com agentes dentro do OpenShell no OpenShift, partindo de uma premissa: o agente já está comprometido."
date: "2026-11-19"
temas: ["governanca-e-seguranca", "agentes-engenharia"]
ferramentas: ["nvidia-openshell", "red-hat-openshift", "humano-no-circuito", "identidade-de-agentes"]
porQueImporta:
  B: "É um desenho que dá para copiar: negar por padrão, registrar cada tentativa barrada, transformar a tentativa em pedido de aprovação e nunca entregar a chave real ao agente. Tudo com peças abertas (OpenShell, Kata Containers)."
  A: "Instrução no prompt não segura agente; política fora dele, sim. A pergunta ao time é onde fica essa política, quem aprova a exceção e onde ela fica registrada."
fonte:
  nome: "CNCF (keynote Sandbox Your Agents, KubeCon NA)"
  url: "https://youtu.be/ARFC0ono7qk"
  data: "2026-11-10"
  tipo: primaria
outrasFontes:
  - nome: "Red Hat Blog"
    url: "https://www.redhat.com/en/blog/great-power-comes-great-sandboxing"
    data: "2026-11-10"
    tipo: primaria
apuradoEm: "2026-11-19"
base: "red-hat-roda-sdlc-de-agentes-dentro-do-openshell"
correcoes: []
assinatura: agente
rascunho: false
---

Na keynote "Sandbox Your Agents", em 10/11/2026 na KubeCon NA, Jessica Forrester contou que a Red Hat roda todo dia o próprio ciclo de desenvolvimento com agentes, do pedido de feature ao código, dentro do OpenShell no OpenShift. A premissa declarada é que o agente já está comprometido, e a plataforma é construída a partir disso. Ela resumiu numa frase: "Prompts are like signs. Policies are like bolts."

Na demo, a política nega o que não foi previsto e cada tentativa barrada vira uma proposta que precisa ser aprovada antes de liberar o acesso. O agente recebe uma credencial falsa, trocada pela verdadeira só na saída e só para os destinos permitidos; para isolar ainda mais, cada agente pode rodar em Kata Containers, com kernel próprio.

A fala não trouxe número de agentes, custo nem incidentes. Mas é raro ver um fornecedor contar como prende os próprios agentes, e não só como vende o sandbox.

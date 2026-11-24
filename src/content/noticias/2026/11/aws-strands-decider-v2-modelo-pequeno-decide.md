---
title: "AWS abre o Strands Decider v2, modelo pequeno que só escolhe a opção"
excerpt: "A AWS lançou em 23/11/2026 o Strands Decider v2, cinco modelos de pesos abertos (Apache-2.0) que não geram texto: devolvem a probabilidade de cada opção, para escolher ferramenta, rotear entre modelos ou julgar uma resposta."
date: "2026-11-24"
temas: ["custo-e-precificacao", "agentes-engenharia", "modelos"]
ferramentas: ["strands-agents", "modelos-abertos"]
porQueImporta:
  B: "A decisão simples do agente (qual ferramenta, qual modelo, a resposta passa ou não) pode sair do modelo caro para um modelo pequeno e aberto que roda local ou no Lambda; os ganhos de custo são da própria AWS e precisam ser medidos no seu caso antes de virar arquitetura."
fonte:
  nome: "Strands Agents (AWS)"
  url: "https://strandsagents.com/blog/introducing-strands-decider-v2/"
  data: "2026-11-23"
  tipo: primaria
outrasFontes:
  - nome: "VentureBeat"
    url: "https://venturebeat.com/data/awss-strands-decider-v2-targets-the-agent-decisions-that-hinge-on-a-single-detail"
    data: "2026-11-23"
    tipo: imprensa
apuradoEm: "2026-11-24"
base: "aws-strands-decider-v2-modelo-pequeno-decide"
correcoes: []
assinatura: agente
rascunho: false
---

A AWS lançou em 23/11/2026 o Strands Decider v2: cinco modelos de pesos abertos, sob licença Apache-2.0 e feitos sobre o Gemma 4, que não escrevem texto. Recebem um conjunto de opções e devolvem, numa única passada, a probabilidade de cada uma. O uso previsto é a decisão dentro do agente: que ferramenta chamar, para qual modelo mandar a tarefa, se uma resposta está boa.

O número que a AWS escolheu mostrar é de roteamento: entre o Claude Haiku 5.5 e o Sonnet 5.5, o Decider resolveu 94% das tarefas que o Sonnet sozinho resolveria, a 44% do custo. O modelo roda na máquina local, num endpoint do SageMaker AI ou no Lambda em arm64.

A leitura é a de sempre em custo de agente: nem toda etapa precisa do modelo mais caro, e a escolha de "quem faz" é ela mesma uma tarefa barata. O limite está na fonte: os números são benchmarks e casos da própria AWS, sem medida independente; vale reproduzir no próprio fluxo antes de trocar o roteamento.

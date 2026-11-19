---
title: "Estudo de Harvard: agente de código acelera o código e trava a revisão"
excerpt: "Paper de Fiona Chen e James Stratton (Harvard, versão de 14/11/2026), com dados de 655 empresas, estima que agentes de código elevam as linhas de código em 44%, mas as issues resolvidas só em 13,7%, e o tempo até aprovar um PR sobe 56,1%."
date: "2026-11-19"
temas: ["agentes-engenharia", "adocao-e-mercado"]
ferramentas: ["humano-no-circuito"]
porQueImporta:
  A: "Medir a adoção de agente por linhas ou PRs superestima o ganho: a pergunta para o time de engenharia passa a ser quanto chega a produção e quanto espera na revisão."
  B: "Se o agente aumenta muito o que entra na fila e a revisão continua igual, o gargalo é o revisor: tamanho de PR, testes automáticos e quem revisa o quê viram decisão de time."
fonte:
  nome: "Chen e Stratton (Harvard), paper de job market"
  url: "https://fion.ac/jellyfish.pdf"
  data: "2026-11-14"
  tipo: primaria
outrasFontes: []
apuradoEm: "2026-11-18"
base: "harvard-agente-de-codigo-trava-na-revisao"
correcoes: []
assinatura: agente
rascunho: false
---

Fiona Chen e James Stratton, de Harvard, publicaram em 14/11/2026 a versão atual de um paper que mede o efeito de assistentes e agentes de código em 655 empresas, com dados da Jellyfish, plataforma de análise de engenharia. Com agentes, as linhas de código sobem 44%, mas as issues resolvidas sobem só 13,7%. O tempo entre mandar o código para revisão e aprová-lo cresce 56,1%.

A leitura dos autores é que a revisão virou o gargalo: o código espera mais para ser revisado e recebe mais pedidos de mudança. Ferramenta de revisão por IA não resolveu, porque a maior parte das revisões continua sendo feita por pessoas.

Há dois descontos. O texto é um paper de job market, sem revisão por pares, e o parceiro de dados vende medição de engenharia (os autores dizem que ele só conferiu se havia dado proprietário exposto, não o conteúdo científico).

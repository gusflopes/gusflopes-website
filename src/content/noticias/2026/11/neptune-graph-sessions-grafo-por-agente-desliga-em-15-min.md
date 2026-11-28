---
title: "Neptune Graph Sessions: grafo por agente que desliga sozinho"
excerpt: "A AWS anunciou em 27/11/2026 o Neptune Graph Sessions, modo do banco de grafos pensado para agentes: o grafo cresce conforme o uso, desliga depois de 15 minutos parado e volta em segundos com os dados."
date: "2026-11-28"
temas: ["agentes-engenharia", "plataformas"]
ferramentas: ["amazon-neptune"]
porQueImporta:
  B: "Memória de agente em grafo (contexto por usuário, GraphRAG) deixa de exigir um cluster sempre ligado. Muda a conta de manter um grafo por cliente ou por agente, mas só fecha com o preço por unidade e a lista de regiões, que o anúncio não traz."
fonte:
  nome: "AWS What's New"
  url: "https://aws.amazon.com/about-aws/whats-new/2026/11/amazon-neptune-graph-sessions-generally-available"
  data: "2026-11-27"
  tipo: primaria
outrasFontes: []
apuradoEm: "2026-11-28"
base: "neptune-graph-sessions-grafo-por-agente-desliga-em-15-min"
correcoes: []
assinatura: agente
rascunho: false
---

A AWS anunciou em 27/11/2026 o Amazon Neptune Graph Sessions, um modo de computação do Neptune descrito como feito para agentes: cada grafo começa com 4 ou 8 s-NCU e a memória cresce até o dobro do tamanho inicial conforme a carga.

Depois de 15 minutos sem uso, o grafo desliga; na consulta seguinte, volta em segundos sem perder os dados. A cobrança é pela memória usada, sem o mínimo de 16 m-NCU que vale para o grafo provisionado.

A leitura é de arquitetura: o modelo de um grafo por tenant, por usuário ou por tarefa, que antes pedia capacidade ligada o tempo todo, passa a custar só enquanto é usado. É o mesmo movimento de outros serviços da AWS para cargas de agente, que ficam paradas a maior parte do tempo.

O que ainda não se sabe: o anúncio não traz o preço por s-NCU nem as regiões; não dá para dizer se já existe em São Paulo nem estimar o custo. O re:Invent, de 30/11 a 04/12, pode trazer esse detalhe.

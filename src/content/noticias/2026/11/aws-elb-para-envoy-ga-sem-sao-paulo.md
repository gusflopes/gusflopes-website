---
title: "AWS lança o ELB for Envoy, mas sem a região de São Paulo"
excerpt: "A AWS lançou em 25/11/2026 o ELB for Envoy, load balancer que roda proxies Envoy gerenciados em instâncias dedicadas e aplica sozinho os patches de segurança; está em 14 regiões, nenhuma na América do Sul."
date: "2026-11-26"
temas: ["plataformas"]
ferramentas: ["aws-elb", "kubernetes"]
porQueImporta:
  B: "O time de plataforma pode deixar de operar a frota de Envoy e manter os recursos do Gateway API no Kubernetes. Para carga no Brasil, ainda não dá: São Paulo não está na lista."
fonte:
  nome: "AWS (What's New)"
  url: "https://aws.amazon.com/about-aws/whats-new/2026/11/elastic-load-balancing-for-envoy-generally-available"
  data: "2026-11-25"
  tipo: primaria
outrasFontes: []
apuradoEm: "2026-11-26"
base: "aws-elb-para-envoy-ga-sem-sao-paulo"
correcoes: []
assinatura: agente
rascunho: false
---

A AWS anunciou em 25/11/2026 a disponibilidade geral do ELB for Envoy, um tipo novo de load balancer que roda proxies Envoy, de código aberto, em instâncias EC2 dedicadas. A AWS monitora as vulnerabilidades e aplica sozinha os patches do Envoy e do sistema operacional.

Quem usa o Envoy Gateway no Kubernetes pode instalar um provider para levar os proxies ao serviço gerenciado sem reescrever os recursos do Gateway API. O lançamento vale para 14 regiões, nenhuma na América do Sul.

A leitura é que operar proxy passa a ser serviço gerenciado, como já aconteceu com o banco de dados. A página não traz preço próprio, só o link para a tabela do ELB.

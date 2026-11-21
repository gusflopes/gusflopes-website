---
title: "AWS abre a calculadora de preço por API e cita agente de código"
excerpt: "A AWS liberou em 20/11/2026, em GA e sem custo adicional, uma API do Pricing Calculator que devolve o custo estimado de até 500 linhas de uso por chamada, a preço público ou com os descontos da conta."
date: "2026-11-21"
temas: ["custo-e-precificacao", "agentes-engenharia"]
ferramentas: ["aws-pricing-calculator", "camada-deterministica"]
porQueImporta:
  B: "O custo pode entrar na revisão do desenho antes do deploy: o agente propõe a arquitetura e a calculadora oficial dá o preço, em vez de o modelo estimar o número ou alguém montar planilha."
fonte:
  nome: "AWS (What's New)"
  url: "https://aws.amazon.com/about-aws/whats-new/2026/11/aws-pricing-calculator-api/"
  data: "2026-11-20"
  tipo: primaria
outrasFontes: []
apuradoEm: "2026-11-21"
base: "aws-calculadora-de-preco-por-api-para-agente"
correcoes: []
assinatura: agente
rascunho: false
---

A AWS liberou em 20/11/2026 a API GetUsageLinesEstimatedCost, do Pricing Calculator. Ela recebe até 500 linhas de uso numa chamada e devolve o custo de cada linha e o total, a preço público On-Demand, com os descontos da conta ou com Savings Plans e instâncias reservadas.

A API está em GA, sem custo adicional, em todas as regiões menos GovCloud e China. A própria AWS sugere como uso um agente de código que chama a API para precificar a carga enquanto ajuda a desenhá-la.

É a divisão de trabalho que funciona com IA: o modelo conversa e propõe, o software determinístico calcula. O limite é o de sempre da calculadora: é estimativa sobre o uso que você informar, não a fatura.

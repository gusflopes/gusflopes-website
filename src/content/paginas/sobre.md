---
# Rascunho (16/11/2026): o Gustavo revisa o texto antes de tirar o `rascunho`. Base: PR #7 (fechado), seções
# Trajetória, Formação e "três provas", ajustadas para quem lidera tecnologia. Enquanto for rascunho, /sobre/
# redireciona para /#about no build de produção e o rodapé e as análises apontam para lá.
title: "Sobre"
excerpt: "Gustavo Lopes: dez anos de Direito Tributário, engenharia desde 2018 e, hoje, Tech Lead e Staff Engineer em financial services. Escreve sobre levar IA da demonstração à produção dentro de empresa que já existe."
date: "2026-11-16"
rascunho: false
---

Sou Tech Lead e Staff Engineer em financial services. Lidero três squads e o sistema de pricing do varejo automotivo, um domínio em que decisão técnica e decisão comercial são a mesma decisão. Escrevo aqui para quem lidera tecnologia e precisa decidir o que fazer com IA sem apostar a operação numa demonstração.

## Trajetória

Comecei em Direito e Contabilidade. Fui advogado tributarista, presidi a Comissão de Direito Tributário da OAB/MS e atuei como administrador judicial em recuperação judicial: empresa quebrando, credor de um lado, juízo do outro e nenhuma resposta óbvia. Dez anos assim ensinam a operar sob pressão regulatória, com partes que querem coisas incompatíveis, e ainda entregar uma estrutura que sobreviva a quem for conferir depois.

Em 2018 eu não deixei o Direito: somei a engenharia. Vieram a pós em Engenharia de Software e o MBA em Liderança e Tecnologia, e com eles uma descoberta que não estava no programa de nenhum dos dois. A vantagem não era escrever código. Era entender o problema de negócio no nível em que ele precisa ser entendido para virar software correto. Converter regra tácita em estrutura defensável já era o meu trabalho havia dez anos; só mudou o artefato final.

Hoje o trabalho é esse, em escala de time: arquitetura, decisões que precisam se sustentar no negócio e IA que passa pelo crivo de segurança e de auditoria. Fui mentor de tecnologia no Porto Hack Santos 2025, edição com foco em IA.

## Três provas

O que separa uma demonstração de IA de um sistema em produção raramente é o modelo. São três coisas, e é delas que este site trata.

### 1. A última milha dentro da empresa

O trabalho difícil é extrair dados de um sistema legado sem derrubar o transacional, expor regra de negócio como ferramenta que o agente chama com segurança e passar pela revisão do time de segurança.

**O mecanismo:** extração incremental, camada colunar consultada em milissegundos, contrato MCP, controle de acesso por papel e mascaramento de dados pessoais.

### 2. Tradução de domínio

Dez anos como tributarista e administrador judicial foram dez anos convertendo regra tácita e contestada em estrutura que sobrevive a auditoria. É a mesma operação que transforma regra de negócio em ferramenta com critério de aceite por escrito.

**O mecanismo:** hoje, o sistema de pricing do varejo automotivo, com três squads e decisão técnica indistinguível de decisão comercial.

### 3. Prova por instrumentação

IA em operação exige prova, não promessa. Um agente só vai para produção depois de passar numa suíte de avaliações contra critérios escritos. Depois disso, cada interação deixa registro auditável: qual pergunta, qual ferramenta, qual latência, qual custo.

**O mecanismo:** confiança vira critério de aceite, não adjetivo.

## Formação

Direito · Contabilidade · Pós em Direito Tributário (IBET) · MBA em Finanças (FGV) · Pós em Engenharia de Software · MBA em Liderança e Tecnologia (Ibmec)

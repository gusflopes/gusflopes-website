---
title: "AWS lança emulador local gratuito escrito e mantido por agentes"
excerpt: "A AWS anunciou em 11/11/2026 o AWS Emulator, que responde às APIs da AWS na máquina do desenvolvedor ou no CI, sem conta e sem taxa, com código feito e mantido por agentes e placar de fidelidade publicado a cada versão."
date: "2026-11-23"
temas: ["agentes-engenharia", "plataformas"]
ferramentas: ["aws-emulator"]
porQueImporta:
  B: "Teste de integração com S3, DynamoDB e afins passa a rodar local e no pipeline sem conta AWS, e o agente de código ganha um laço curto de criar, conferir e corrigir; antes de adotar, confira o placar de fidelidade dos serviços que o time usa."
  A: "É a própria AWS mostrando um produto construído e mantido por agentes com testes como portão de qualidade: um caso concreto para discutir como o time valida código que ninguém escreveu à mão."
fonte:
  nome: "AWS News Blog"
  url: "https://aws.amazon.com/blogs/aws/test-your-applications-against-aws-locally-with-aws-emulator/"
  data: "2026-11-11"
  tipo: primaria
outrasFontes:
  - nome: "InfoQ"
    url: "https://infoq.com/news/2026/11/aws-emulator-agents"
    data: "2026-11-16"
    tipo: imprensa
apuradoEm: "2026-11-23"
base: "aws-emulator-200-servicos-local-feito-por-agentes"
correcoes: []
assinatura: agente
rascunho: false
---

A AWS anunciou em 11/11/2026, já como disponibilidade geral, o AWS Emulator: um programa local que responde às mesmas APIs da AWS, para a CLI, os SDKs e os agentes de código apontarem para a máquina do desenvolvedor ou para o CI em vez da nuvem. Não precisa de conta e não tem taxa; o código está no GitHub.

O emulador é construído e mantido por agentes a partir dos modelos de API da AWS: um grupo procura diferenças em relação à AWS real e abre issues, outro escreve os testes, implementa e revisa, e um agente de segurança revisa as mudanças antes da publicação. A cada versão, a AWS publica quantos testes de fidelidade cada serviço passa.

Na prática, serve para teste funcional rápido e para o agente iterar sem esperar deploy. Não serve para teste de segurança: o emulador não avalia políticas do IAM como a AWS, então um pedido negado na nuvem pode passar local. A fidelidade varia por serviço, por isso o placar de cada um importa mais do que a lista de serviços.

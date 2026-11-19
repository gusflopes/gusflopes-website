---
title: "AWS lança sandbox isolado e token delegado para agentes"
excerpt: "O resumo semanal da AWS de 16/11 traz o Nitro Sandboxes, que dá fronteira de VM própria a pods e tasks numa instância compartilhada, e a troca de token OAuth no Cognito."
date: "2026-11-19"
temas: ["agentes-engenharia", "governanca-e-seguranca"]
ferramentas: ["aws-nitro-sandboxes", "identidade-de-agentes"]
porQueImporta:
  B: "Para tirar agente do piloto na AWS, duas peças que faltavam ficam prontas: isolar o código que o agente gera e deixá-lo agir em nome do usuário com um token de escopo menor, sem repassar a credencial original."
fonte:
  nome: "AWS News Blog"
  url: "https://aws.amazon.com/blogs/aws/aws-weekly-roundup-aws-nitro-sandboxes-aws-emulator-and-more-november-16-2026/"
  data: "2026-11-16"
  tipo: primaria
outrasFontes: []
apuradoEm: "2026-11-17"
base: "aws-sandbox-nitro-e-token-delegado-para-agentes"
correcoes: []
assinatura: agente
rascunho: false
---

O resumo semanal da AWS de 16/11 traz dois lançamentos que conversam com agentes em produção. O AWS Nitro Sandboxes dá a um pod do EKS ou a uma task do ECS uma fronteira de máquina virtual própria, mesmo dividindo a instância EC2 com outras cargas; há um modo isolado e um modo confidencial, com atestação criptográfica. Não há cobrança adicional nas instâncias suportadas, mas as tarifas de EC2, EKS e ECS continuam.

O segundo é a troca de token OAuth 2.0 no Amazon Cognito: o token do usuário vira outro, com permissões menores, audiência única e sem refresh token, para um serviço agir em nome dele. Está nos planos Essentials e Plus.

São as duas perguntas de segurança que travam o agente fora do piloto: onde roda o código que ele escreve e com que credencial ele age. A fonte é o resumo da semana; os anúncios de cada recurso não foram lidos, então detalhes de região e de instância suportada ficam no link.

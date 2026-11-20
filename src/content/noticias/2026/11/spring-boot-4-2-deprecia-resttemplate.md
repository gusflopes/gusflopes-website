---
title: "Spring Boot 4.2 deprecia o RestTemplate em favor do RestClient"
excerpt: "O Spring Boot 4.2.0 saiu em 19/11/2026 depreciando o RestTemplate e o TestRestTemplate em favor do RestClient e do RestTestClient; a versão também deprecia o suporte a Apache Pulsar e muda a imagem base dos Buildpacks para Ubuntu 26.04."
date: "2026-11-20"
temas: ["engenharia-de-software"]
ferramentas: ["spring-boot", "openjdk"]
porQueImporta:
  B: "O RestTemplate ainda funciona, mas entra no plano de migração de todo serviço Java que o usa; é tarefa boa para agente de código desde que haja teste cobrindo as chamadas HTTP antes da troca."
fonte:
  nome: "Spring (blog)"
  url: "https://spring.io/blog/2026/11/19/spring-boot-4-2-0-available-now"
  data: "2026-11-19"
  tipo: primaria
outrasFontes: []
apuradoEm: "2026-11-20"
base: "spring-boot-4-2-deprecia-resttemplate"
correcoes: []
assinatura: agente
rascunho: false
---
O Spring Boot 4.2.0 foi lançado em 19/11/2026 e deprecia o `RestTemplate` e o `TestRestTemplate` em favor do `RestClient` e do `RestTestClient`. O suporte a Apache Pulsar também foi depreciado, depois que o projeto foi para a Apache Software Foundation.

Nos Buildpacks, as imagens passam a usar o Ubuntu 26.04 como base padrão.

Depreciar não é remover: o código continua compilando. A troca de imagem base é a mudança que aparece primeiro, no próximo build de imagem; a do cliente HTTP entra no plano de migração e pede teste de contrato antes de ser automatizada.

---
title: "GitHub Enterprise Server 3.23 traz IA de segredos sem internet"
excerpt: "O release candidate do GitHub Enterprise Server 3.23, publicado em 20/11/2026, detecta segredos com um modelo que roda na CPU do appliance, sem GPU nem conexão externa, e espera 3 dias antes de o Dependabot sugerir versão nova."
date: "2026-11-21"
temas: ["governanca-e-seguranca", "engenharia-de-software"]
ferramentas: ["github-code-security"]
porQueImporta:
  B: "Empresa regulada ou com ambiente de código isolado ganha IA de segurança sem mandar código para fora; antes de exigir a expiração de token, vale ajustar os clientes OAuth que já existem."
fonte:
  nome: "GitHub (changelog)"
  url: "https://github.blog/changelog/2026-11-20-github-enterprise-server-3-23-release-candidate"
  data: "2026-11-20"
  tipo: primaria
outrasFontes: []
apuradoEm: "2026-11-21"
base: "ghes-3-23-ia-de-segredos-offline-e-cooldown"
correcoes: []
assinatura: agente
rascunho: false
---

O GitHub publicou em 20/11/2026 o release candidate do Enterprise Server 3.23. A detecção de segredos por IA usa um modelo próprio que roda na CPU do appliance, sem GPU, sem LLM hospedado e sem conexão externa; o recurso está em prévia pública.

O Dependabot passa a esperar por padrão ao menos três dias depois que uma versão aparece no registro antes de sugeri-la, e os tokens OAuth podem expirar em oito horas, de forma opcional nos apps existentes e padrão nos novos.

A espera de três dias é uma defesa simples contra pacote malicioso publicado e retirado em poucas horas. É release candidate: a versão final pode mudar.

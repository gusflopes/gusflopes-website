---
title: "Windows 365 só pôs agente na migração depois de padronizar o build"
excerpt: "No keynote da .NET Conf, em 10/11/2026, o time do Windows 365 contou que padronizou ferramentas e testes antes de usar um agente para migrar seus repositórios, com teste determinístico barrando regressão e revisão humana em todo PR."
date: "2026-11-19"
temas: ["agentes-engenharia", "engenharia-de-software", "governanca-e-seguranca"]
ferramentas: ["dotnet", "camada-deterministica", "humano-no-circuito"]
porQueImporta:
  B: "É um roteiro para migração com agente: primeiro deixe o ambiente e os testes confiáveis, depois automatize o trabalho repetível, com teste barrando regressão e humano revisando cada PR."
  A: "A ordem importa mais que a ferramenta: agente em processo instável acelera o problema. Antes de aprovar agente em modernização, pergunte se o build e os testes já são confiáveis."
fonte:
  nome: ".NET Conf 2026 (canal .NET no YouTube)"
  url: "https://youtu.be/PWAVvWTzzHo?t=2323"
  data: "2026-11-10"
  tipo: primaria
outrasFontes: []
apuradoEm: "2026-11-19"
base: "windows-365-aspire-agente-com-teste-e-revisao-humana"
correcoes: []
assinatura: agente
rascunho: false
---

No keynote de lançamento do .NET 11, em 10/11/2026, o time do Windows 365, o serviço de PC na nuvem da Microsoft, contou em que ordem pôs IA na migração de seus microsserviços em ASP.NET Core e Azure Functions. Primeiro padronizou o SDK do .NET, as ferramentas do Azure Functions e do Aspire entre a máquina do desenvolvedor e o build, e trocou esperas fixas por checagens de prontidão dos recursos.

Só quando esse padrão ficou confiável, e migrar repositório por repositório à mão virou o gargalo, entrou o agente: ele analisa cada repositório, faz o plano e aplica a mudança. Os testes determinísticos barram regressão, e todo pull request passa por revisão humana antes de seguir. Nas palavras do time, o agente entrou "not as a replacement for the engineering process, as an accelerator for a process we already understood".

É relato da própria Microsoft sobre um time interno, sem número de ganho de tempo ou de custo.

Agente acelera processo que já funciona; não conserta o que ainda não funciona.

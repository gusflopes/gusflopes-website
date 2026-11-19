---
title: "NuGet põe espera e humano com 2FA no caminho dos pacotes"
excerpt: "Na .NET Conf, em 10/11/2026, o NuGet anunciou cooldown para versões recém-publicadas, chaves de API de no máximo 30 dias e publicação em etapas com confirmação humana antes de o pacote ficar público."
date: "2026-11-19"
temas: ["governanca-e-seguranca", "engenharia-de-software"]
ferramentas: ["dotnet", "humano-no-circuito"]
porQueImporta:
  A: "O registro de pacotes desenhou o portão que falta em muito time que usa agente: espera antes de aceitar o novo, humano antes de publicar, chave que vence sozinha. Vale copiar o desenho para a política interna."
  B: "Ligue o cooldown nos projetos e troque a chave de API do CI por trusted publishing, a publicação sem chave: chave de 30 dias que fica no pipeline vira build quebrado todo mês."
fonte:
  nome: ".NET Conf 2026 (canal .NET no YouTube)"
  url: "https://youtu.be/H54iAyM08VM?t=69"
  data: "2026-11-10"
  tipo: primaria
outrasFontes:
  - nome: ".NET Blog (chaves de API do NuGet)"
    url: "https://devblogs.microsoft.com/dotnet/strengthening-nuget-supply-chain-security-reducing-api-key-lifetime/"
    data: "2026-08-03"
    tipo: primaria
apuradoEm: "2026-11-19"
base: "nuget-cooldown-chaves-30-dias-publicacao-em-etapas"
correcoes: []
assinatura: agente
rascunho: false
---

Na sessão "Securing Your NuGet Dependencies in the Age of AI", da .NET Conf 2026, em 10/11, Jon Douglas (Microsoft) apresentou três mudanças no NuGet. A primeira é o cooldown: o projeto define quantos dias espera antes de aceitar uma versão recém-publicada de um pacote, a defesa contra ataque rápido à cadeia de suprimentos. Chega à linha de comando do .NET 11 e ao Visual Studio 18.14.

A segunda são as chaves de API de no máximo 30 dias; as mais longas, criadas antes da regra, expiraram em 01/11, segundo o blog do .NET. A terceira é a publicação em etapas: o pacote fica em espera até uma pessoa confirmar, com 2FA, que foi ela quem publicou — a "prova de presença".

O motivo dito no palco é o volume de restore feito por agentes e de pacote malicioso, inclusive gerado com IA. O registro passou a tratar a dependência como código que alguém escolhe confiar, com espera e humano no caminho.

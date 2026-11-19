---
title: "Microsoft lança o .NET 11, com unions no C# 15 e suporte até 2028"
excerpt: "A Microsoft lançou o .NET 11 em 10/11/2026, com union types no C# 15. É versão de dois anos de suporte e acaba no mesmo dia do .NET 10 LTS, o que tira o prazo da escolha entre os dois."
date: "2026-11-19"
temas: ["engenharia-de-software"]
ferramentas: ["dotnet"]
porQueImporta:
  B: "Quem sai do .NET 8 escolhe entre 10 e 11 sem ganhar prazo: os dois acabam em 14/11/2028. A decisão é técnica (recursos novos contra mudanças de comportamento a testar), não de calendário."
fonte:
  nome: ".NET Blog"
  url: "https://devblogs.microsoft.com/dotnet/announcing-dotnet-11/"
  data: "2026-11-10"
  tipo: primaria
outrasFontes:
  - nome: "Política de suporte do .NET"
    url: "https://dotnet.microsoft.com/en-us/platform/support/policy/dotnet-core"
    data: "2026-11-10"
    tipo: primaria
apuradoEm: "2026-11-19"
base: "dotnet-11-lancado-sts-dois-anos-csharp-15"
correcoes: []
assinatura: agente
rascunho: false
---

A Microsoft lançou o .NET 11 em 10/11/2026, na abertura da .NET Conf. É uma versão STS, de dois anos de suporte: pela página oficial, acaba em 14/11/2028, o mesmo dia do .NET 10, que é LTS.

O C# 15 traz union types, pedido antigo da comunidade: um tipo declara que o valor é um entre um conjunto fechado de tipos, e o compilador cobra que todos os casos sejam tratados.

Com o mesmo fim de suporte, a escolha entre 10 e 11 depende do que o time quer usar e de quanto está disposto a testar, já que o 11 também muda o arredondamento de `double` e `decimal`.

---
title: ".NET 11 muda o arredondamento de double para decimal e do Math.Round"
excerpt: "O .NET 11, lançado em 10/11/2026, passou a converter double em decimal e a arredondar com Math.Round a partir do valor binário exato; sistemas que fazem conta de dinheiro em double podem ver outro centavo no upgrade."
date: "2026-11-19"
temas: ["engenharia-de-software"]
ferramentas: ["dotnet", "camada-deterministica"]
porQueImporta:
  B: "Antes de subir para o .NET 11, procure `(decimal)` aplicado a double e `Math.Round` sobre double no código de preço, nota ou câmbio, e rode os testes com valor esperado: não há chave para voltar ao comportamento antigo."
  C: "Se o sistema que calcula preço ou desconto roda em .NET, pergunte ao fornecedor se o upgrade foi testado com valores conhecidos; \"o build passou\" não prova que a conta continua igual."
fonte:
  nome: "Microsoft Learn"
  url: "https://learn.microsoft.com/en-us/dotnet/core/compatibility/core-libraries/11/math-round-digits"
  data: "2026-11-10"
  tipo: primaria
outrasFontes:
  - nome: "Microsoft Learn (conversões de decimal)"
    url: "https://learn.microsoft.com/en-us/dotnet/core/compatibility/core-libraries/11/decimal-biginteger-floating-point-conversions"
    data: "2026-11-10"
    tipo: primaria
apuradoEm: "2026-11-19"
base: "dotnet-11-decimal-e-math-round-mudam-arredondamento"
correcoes: []
assinatura: agente
rascunho: false
---

Duas mudanças de comportamento no .NET 11, documentadas pela Microsoft em 10/11/2026, mexem em conta de dinheiro. A primeira: `Math.Round(655.925, 2, MidpointRounding.AwayFromZero)` dava 655,93 e agora dá 655,92, porque o `double` guarda 655,92499999…, abaixo do ponto médio. A segunda: converter o `double` 1.23 para `decimal` dava 1,23 e agora dá 1,229999999999999982236431606.

A Microsoft trata as duas como correção, e com razão: o valor guardado em `double` nunca foi o que estava escrito no código. Para a conversão, não há chave de compatibilidade que devolva o resultado antigo; `Math.Round` sobre `decimal` não muda.

A orientação do próprio fornecedor é a de sempre: valor em base 10, como dinheiro, fica em `decimal` do começo ao fim. O risco está no código que mistura os dois tipos e nunca foi testado contra um valor esperado.

O software calcula, mas só é confiável se o número for conferido.

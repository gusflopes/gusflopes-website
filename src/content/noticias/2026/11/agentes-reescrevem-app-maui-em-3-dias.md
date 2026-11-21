---
title: "Agentes reescrevem app .NET MAUI em UI nativa em cerca de 3 dias"
excerpt: "Num experimento publicado em 20/11/2026 no .NET Blog, David Ortinau, da Microsoft, usou agentes para reescrever um app MAUI de cerca de 31 mil linhas em UI nativa de iOS e Android, com menos de 4 horas de trabalho dele."
date: "2026-11-21"
temas: ["agentes-engenharia", "engenharia-de-software"]
ferramentas: ["dotnet"]
porQueImporta:
  B: "A decisão entre UI compartilhada e nativa ganha um número: escrever a segunda UI ficou barato, mas o código cresceu e o compartilhado caiu, e cada plataforma passa a pedir teste e revisão próprios."
fonte:
  nome: ".NET Blog (Microsoft)"
  url: "https://devblogs.microsoft.com/dotnet/ai-cross-platform-decision-matrix/"
  data: "2026-11-20"
  tipo: primaria
outrasFontes: []
apuradoEm: "2026-11-21"
base: "agentes-reescrevem-app-maui-em-3-dias"
correcoes: []
assinatura: agente
rascunho: false
---

David Ortinau, gerente de produto do .NET na Microsoft, publicou em 20/11/2026 um experimento: agentes reescreveram um app .NET MAUI de cerca de 31 mil linhas de C# em UI nativa de iOS e Android, em cerca de três dias corridos e com menos de 4 horas de trabalho dele, por estimativa própria.

O preço apareceu no código: a parte compartilhada entre as plataformas caiu de 99,2% para 40,4%.

O agente barateia escrever a segunda UI, não ser dono dela. Com menos código compartilhado, cada correção passa a ter duas versões para revisar e testar, e o custo de manutenção é que decide.

É um app e um autor, num texto da própria Microsoft: serve de referência para a conversa, não de regra.

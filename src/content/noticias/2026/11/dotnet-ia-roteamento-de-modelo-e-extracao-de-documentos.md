---
title: ".NET mostra roteador que escolhe o modelo de IA por regra em código"
excerpt: "Na .NET Conf, em 10/11/2026, o time de IA do .NET mostrou adaptadores para os SDKs da OpenAI e da Anthropic, um cliente que escolhe o modelo por política escrita em código e uma interface única para extrair dados de documentos."
date: "2026-11-19"
temas: ["agentes-engenharia", "custo-e-precificacao", "contexto-e-metodo"]
ferramentas: ["dotnet", "microsoft-agent-framework", "camada-deterministica", "mcp"]
porQueImporta:
  B: "Escolher o modelo pode virar regra versionada no código (precisa de ferramenta? de quanto contexto?), e não hábito de quem escreveu o prompt; antes de adotar, confira no NuGet o que é estável e o que é preview, porque o palco não disse."
  C: "Os documentos da empresa podem virar contexto para IA com a mesma interface, lidos localmente ou na nuvem; a escolha entre um e outro passa a ser de custo e de onde o dado pode ficar."
fonte:
  nome: ".NET Conf 2026 (canal .NET no YouTube)"
  url: "https://youtu.be/ziD2ugBywDM?t=757"
  data: "2026-11-10"
  tipo: primaria
outrasFontes: []
apuradoEm: "2026-11-19"
base: "dotnet-ia-roteamento-de-modelo-e-extracao-de-documentos"
correcoes: []
assinatura: agente
rascunho: false
---

Na sessão "The .NET AI Stack", da .NET Conf 2026, em 10/11, Luis Quintanilla (Microsoft) mostrou três peças. Os SDKs em C# da OpenAI e da Anthropic ganharam adaptadores nativos para `IChatClient`, a interface comum do .NET, de modo que trocar de fornecedor não muda o código da aplicação. Um "routing chat client" escolhe o modelo a cada pedido por política escrita em código (precisa de ferramentas, de quanto contexto) ou por um modelo de decisão. E uma abstração de extração de documentos aceita implementação local, com a biblioteca aberta PdfPig, o OCR da Mistral ou qualquer modelo de visão.

Na demo, um app gera um vídeo a partir de um PDF: o modelo escreve roteiro e narração, mas a montagem final é feita "using standard code", sem IA, nas palavras do palestrante.

A sessão não disse o que já é estável e o que é preview, nem quanto custa cada rota. O roteador põe o custo do agente onde ele pode ser revisado: numa regra de código.

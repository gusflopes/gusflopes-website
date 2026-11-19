---
title: "SDK do .NET 11 cria servidor MCP com um comando"
excerpt: "O .NET 11, de 10/11/2026, traz o template `dotnet new mcpserver`, sobre o SDK oficial de MCP em C#, e declara Microsoft.Extensions.AI e o Agent Framework como a pilha de agentes; partes de UI de agente seguem em prerelease."
date: "2026-11-19"
temas: ["agentes-engenharia", "contexto-e-metodo"]
ferramentas: ["mcp", "dotnet", "microsoft-agent-framework"]
porQueImporta:
  B: "Expor um sistema legado em .NET como ferramenta para o Copilot, o Claude ou outro agente ficou a um `dotnet new` de distância; o trabalho que sobra é decidir quais operações expor e com que permissão."
  C: "O sistema de gestão feito em .NET pode virar fonte de contexto para agentes sem reescrita; vale perguntar à software house se isso está no plano e quem controla o acesso."
fonte:
  nome: ".NET Blog"
  url: "https://devblogs.microsoft.com/dotnet/announcing-dotnet-11/"
  data: "2026-11-10"
  tipo: primaria
outrasFontes: []
apuradoEm: "2026-11-19"
base: "dotnet-11-template-mcp-server-e-agent-framework"
correcoes: []
assinatura: agente
rascunho: false
---

O anúncio do .NET 11, em 10/11/2026, inclui o comando `dotnet new mcpserver`, que cria um servidor MCP (o protocolo que liga agentes a ferramentas e dados) sobre o SDK oficial de MCP em C#, já com uma ferramenta de exemplo.

O post também põe Microsoft.Extensions.AI (a interface `IChatClient`, que abstrai o fornecedor do modelo) e o Microsoft Agent Framework como a pilha de agentes da plataforma. O que ainda não tem compromisso: a hospedagem AG-UI está em prerelease, e os componentes de IA do Blazor ficam em prerelease durante todo o ciclo do .NET 11.

Tudo é gratuito; o custo é o do modelo que o agente chamar. A parte difícil deixou de ser o protocolo e passou a ser o desenho do que o sistema expõe.

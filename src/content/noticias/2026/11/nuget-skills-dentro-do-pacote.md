---
title: "Pacote NuGet passa a trazer skills para agentes de código"
excerpt: "Desde 03/11/2026, pacotes NuGet podem levar arquivos SKILL.md que chegam ao projeto com o restore; a própria Microsoft diz que isso abre um vetor novo de ameaça e que a orientação de segurança ainda será atualizada."
date: "2026-11-19"
temas: ["contexto-e-metodo", "agentes-engenharia", "governanca-e-seguranca"]
ferramentas: ["agent-skills", "dotnet", "evals"]
porQueImporta:
  B: "A instrução para o agente usar a biblioteca chega junto com a versão certa da biblioteca. Em troca, o agente passa a ler markdown de terceiro que entrou pelo restore: inclua as skills na revisão de dependências."
  A: "Quem aprova pacote hoje olha código e licença, não instrução para agente. A política de dependências precisa dizer quem revisa a skill que veio no pacote."
fonte:
  nome: ".NET Blog"
  url: "https://devblogs.microsoft.com/dotnet/delivering-skills-in-nuget-packages/"
  data: "2026-11-03"
  tipo: primaria
outrasFontes: []
apuradoEm: "2026-11-19"
base: "nuget-skills-dentro-do-pacote"
correcoes: []
assinatura: agente
rascunho: false
---

A Microsoft publicou em 03/11/2026 como entregar skills para agentes dentro de pacotes NuGet: cada skill é um arquivo SKILL.md numa pasta própria em `skills/<nome>/`, que chega à máquina com o `dotnet restore` e aparece listada no `project.assets.json`. O time do NuGet repetiu a novidade na .NET Conf, em 10/11.

O próprio post avisa que o consumo de markdown por agentes "adds a new threat vector" e que a orientação de segurança para quem consome pacotes ainda será atualizada; até lá, vale a regra antiga de usar só pacotes de mantenedores confiáveis. O servidor MCP do NuGet ainda não lê skills.

A skill virou dependência com versão: bom para o contexto do agente, novo para a governança. Quem revisa a instrução que entrou pelo restore?

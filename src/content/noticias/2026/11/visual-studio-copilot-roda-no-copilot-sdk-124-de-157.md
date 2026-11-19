---
title: "Copilot do Visual Studio troca de harness e resolve 21 tarefas a mais"
excerpt: "No Visual Studio 18.12, de 10/11/2026, o Copilot Chat passou a rodar sobre o Copilot SDK; no teste da própria Microsoft, com 157 tarefas em C# e o mesmo modelo, a versão nova resolveu 124 e a antiga, 103."
date: "2026-11-19"
temas: ["agentes-engenharia", "contexto-e-metodo"]
ferramentas: ["github-copilot", "evals", "visual-studio"]
porQueImporta:
  B: "Com o mesmo modelo, o runtime em volta dele mudou o resultado em 21 tarefas: ao comparar agentes de código, compare o harness e não só o modelo, e rode as suas próprias tarefas antes de confiar no número do fornecedor."
  A: "O custo de cada pedido em créditos aparece agora na tela do desenvolvedor; é a base para discutir orçamento de agente por time, com dado e não com estimativa."
fonte:
  nome: "Visual Studio Blog"
  url: "https://devblogs.microsoft.com/visualstudio/copilot-in-visual-studio-just-got-a-major-upgrade/"
  data: "2026-11-10"
  tipo: primaria
outrasFontes: []
apuradoEm: "2026-11-19"
base: "visual-studio-copilot-roda-no-copilot-sdk-124-de-157"
correcoes: []
assinatura: agente
rascunho: false
---

No Visual Studio 2026 18.12, anunciado em 10/11/2026, o Copilot Chat passou a rodar por padrão sobre o Microsoft Copilot SDK, o mesmo harness (o runtime que organiza raciocínio, ferramentas e tarefas do agente) usado nas outras experiências do Copilot.

No teste do próprio time, com 157 tarefas de código em C# e o mesmo modelo, a experiência antiga resolveu 103 e a nova, 124. A versão nova também mostra o custo de cada pedido em créditos.

O número é da Microsoft, em teste interno, com tarefas escolhidas pelo próprio time. Ainda assim, aponta na mesma direção de outros testes: o harness pesa tanto quanto o modelo na qualidade do agente.

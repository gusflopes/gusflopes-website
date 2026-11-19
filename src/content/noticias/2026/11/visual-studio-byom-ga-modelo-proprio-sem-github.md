---
title: "Visual Studio libera modelo próprio no Copilot, sem conta do GitHub"
excerpt: "O Bring Your Own Model ficou disponível no Visual Studio 18.12 em 11/11/2026: o agente usa modelos da Microsoft Foundry, OpenAI, Anthropic, Ollama ou endpoint compatível, sem login no GitHub, e o administrador liga ou desliga por política."
date: "2026-11-19"
temas: ["agentes-engenharia", "governanca-e-seguranca", "custo-e-precificacao"]
ferramentas: ["visual-studio", "github-copilot", "claude-modelos"]
porQueImporta:
  A: "Empresa que já tem contrato com Anthropic, OpenAI ou Foundry, ou que exige modelo local, pode usar o agente da IDE com a conta e o gateway que já governa; a decisão de liberar fica na política da organização."
  B: "O custo do modelo sai da franquia do Copilot e vai para a API escolhida, em dólar; a Microsoft não publicou preço, então meça o consumo por tarefa antes de liberar para o time."
fonte:
  nome: "Visual Studio Blog"
  url: "https://devblogs.microsoft.com/visualstudio/bring-your-own-model-is-now-generally-available-in-visual-studio/"
  data: "2026-11-11"
  tipo: primaria
outrasFontes: []
apuradoEm: "2026-11-19"
base: "visual-studio-byom-ga-modelo-proprio-sem-github"
correcoes: []
assinatura: agente
rascunho: false
---

A Microsoft anunciou em 11/11/2026 a disponibilidade geral do Bring Your Own Model no Visual Studio 18.12. O Copilot passa a usar modelos da Microsoft Foundry, da OpenAI, da Anthropic, do Ollama ou de qualquer serviço compatível com a API da OpenAI, como OpenRouter e LM Studio.

Não é preciso entrar com conta do GitHub. O administrador liga ou desliga o recurso por política da organização. Na .NET Conf, o time apresentou o BYOM como o que viabiliza IA de código em setores regulados e em ambientes isolados da internet.

O post não fala de preço. Na prática, o custo passa a ser o da API escolhida, e a escolha do modelo vira decisão de compras e de governança, não só de quem programa.

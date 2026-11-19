---
title: "Gemini 4 Neon chega ao Copilot e mostra o peso do harness no resultado"
excerpt: "O Google lançou em 18/11/2026 o Gemini 4 Neon, a US$ 3 por milhão de tokens de entrada; no mesmo dia o modelo entrou no GitHub Copilot, ligado por padrão onde o admin não desligou modelos novos."
date: "2026-11-19"
temas: ["modelos", "agentes-engenharia"]
ferramentas: ["gemini-modelos", "github-copilot", "evals"]
porQueImporta:
  B: "O mesmo modelo muda de resultado conforme o ambiente em que roda; benchmark do fornecedor mede o pacote, e no Copilot a política de modelos do admin decide se o time passa a usar o modelo novo sem pedir."
fonte:
  nome: "Google (blog)"
  url: "https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-neon/"
  data: "2026-11-18"
  tipo: primaria
outrasFontes:
  - nome: "GitHub Changelog"
    url: "https://github.blog/changelog/2026-11-18-gemini-4-neon-in-github-copilot"
    data: "2026-11-18"
    tipo: primaria
apuradoEm: "2026-11-19"
base: "gemini-4-neon-preco-e-harness"
correcoes: []
assinatura: agente
rascunho: false
---

O Google lançou em 18/11/2026 o Gemini 4 Neon, a US$ 3 por milhão de tokens de entrada e US$ 15 por milhão de saída.

Nos números do próprio Google, o modelo resolve 12,8% das tarefas do SWE-sweep num harness genérico (mini-SWE) e 39,0% dentro do Google Antigravity: o mesmo modelo, com o triplo de resultado, só trocando o ambiente do agente. No mesmo dia, o GitHub o liberou no Copilot para Pro+, Max, Business e Enterprise, ligado por padrão onde o admin não desligou modelos novos.

A leitura para quem escolhe ferramenta é que modelo e harness são uma coisa só na prática. Para quem paga o Copilot, modelo novo ligado por padrão é decisão de custo que o admin precisa tomar de propósito.

---
title: "VS Code vai remover o harness local do Copilot em fevereiro de 2027"
excerpt: "O VS Code 1.146 descontinua o harness local das sessões de agente do Copilot, que sai em fevereiro de 2027; o substituto é o harness do Copilot, padrão desde o 1.143."
date: "2026-11-19"
temas: ["agentes-engenharia", "engenharia-de-software"]
ferramentas: ["github-copilot"]
porQueImporta:
  B: "Quem mantém customizações de agente no VS Code tem até fevereiro para revisá-las, com permissões e sandbox, no harness novo; a exceção de empresa que segurava o antigo também deixa de existir."
fonte:
  nome: "GitHub Changelog"
  url: "https://github.blog/changelog/2026-11-16-vs-code-retires-the-local-harness-in-february-2027/"
  data: "2026-11-16"
  tipo: primaria
outrasFontes: []
apuradoEm: "2026-11-17"
base: "vscode-aposenta-harness-local-fev-2027"
correcoes: []
assinatura: agente
rascunho: false
---

O GitHub anunciou em 16/11 que o VS Code 1.146 descontinua o "Local harness", o software que coordena modelo, contexto e ferramentas nas sessões de agente do Copilot dentro do editor. Ele será removido em fevereiro de 2027, depois de uma janela de três meses. O substituto é o harness do Copilot, baseado no Copilot SDK e padrão para sessões novas desde a versão 1.143.

A configuração temporária de empresa que mantinha o harness antigo como padrão some junto com ele. E o próprio GitHub avisa que a troca não converte todas as customizações automaticamente.

A leitura é que o harness, o runtime em volta do modelo, virou peça de plataforma que o fornecedor troca com prazo. Para o time, é item de calendário: revisar customizações, fluxos obrigatórios, permissões e sandbox no harness novo antes de fevereiro.

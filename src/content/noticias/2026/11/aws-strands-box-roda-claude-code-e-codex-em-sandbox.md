---
title: "Strands Box da AWS põe Claude Code, Codex e Kiro em sandbox com política"
excerpt: "A AWS passou a rodar Claude Code, Codex e Kiro CLI dentro do Strands Box, sandbox de código aberto, em 23/11/2026: cada comando, arquivo, chamada de rede e de MCP é conferido contra uma política que fica fora do modelo."
date: "2026-11-24"
temas: ["agentes-engenharia", "governanca-e-seguranca"]
ferramentas: ["strands-agents", "claude-code", "codex"]
porQueImporta:
  B: "A regra de segurança sai do prompt e vira política fora do modelo, igual para os agentes de três fornecedores: é um caminho para liberar o modo sem pedidos de permissão sem entregar as chaves, desde que a chave não esteja num arquivo que o agente já lê."
fonte:
  nome: "Strands Agents (AWS)"
  url: "https://strandsagents.com/blog/strands-box-cli/"
  data: "2026-11-23"
  tipo: primaria
outrasFontes:
  - nome: "Unite.AI"
    url: "https://www.unite.ai/aws-releases-strands-decider-v2-and-sandboxes-more-coding-agents/"
    data: "2026-11-23"
    tipo: imprensa
apuradoEm: "2026-11-24"
base: "aws-strands-box-roda-claude-code-e-codex-em-sandbox"
correcoes: []
assinatura: agente
rascunho: false
---

A AWS publicou em 23/11/2026 que o Strands Box, sandbox de código aberto lançado em outubro, passou a rodar de forma nativa o Claude Code, o Codex e o Kiro CLI. Basta `box run claude` na pasta do projeto: o agente roda numa sandbox do sistema operacional e cada comando de shell, acesso a arquivo, requisição de rede e chamada de MCP é conferido contra uma política escrita fora do modelo, que o agente não consegue alterar.

O segundo ponto é a chave de API. As chaves roteadas pelo Box ficam fora da caixa: o agente vê um marcador e o gateway de saída põe a chave real quando a requisição sai. A própria página avisa o limite: isso protege só as chaves roteadas; a que está num arquivo do projeto ou na configuração do MCP continua visível para o agente.

A leitura é que o controle do agente de código deixa de depender de instrução no prompt e de clicar "permitir" a cada passo, e passa a ser uma política revisável, como qualquer regra de firewall. Funciona em Mac com Apple silicon (macOS 15 ou mais novo) e em Linux ARM64 e x86-64; a página não fala em Windows, em preço nem deixa clara a licença do Box.

---
# EXEMPLO da estratégia v2 (16/11/2026): rascunho, não vai ao ar.
title: "Amazon Connect passa a chamar ferramentas MCP sem código sob medida"
excerpt: "O atendimento da AWS ganhou um bloco que deixa o fluxo consultar ferramentas MCP pelo Bedrock AgentCore Gateway, sem escrever uma função Lambda para cada integração."
date: "2026-11-13"
temas: ["plataformas", "contexto-e-metodo", "fiscal-br"]
ferramentas: ["amazon-connect", "aws-bedrock", "mcp"]
porQueImporta:
  A: "Integração de atendimento com sistemas internos fica mais barata de manter: menos código sob medida por integração."
  B: "O fluxo busca o dado no sistema que calcula (CRM, histórico de casos) em vez de pedir ao modelo; a camada de integração vira o AgentCore Gateway."
  C: "Quem já usa Amazon Connect ganha integração com o CRM sem um projeto de desenvolvimento — mas confira a região antes."
fonte:
  nome: "AWS"
  url: "https://aws.amazon.com/about-aws/whats-new/2026/10/connect-flows-mcp-tools/"
  data: "2026-11-02"
apuradoEm: "2026-11-13"
base: "amazon-connect-fluxo-chama-ferramenta-mcp"
assinatura: agente-revisado
revisadoEm: "2026-11-14"
rascunho: false
---

O novo bloco External Tool permite que um fluxo do Amazon Connect chame ferramentas expostas por MCP por meio do Bedrock AgentCore Gateway. O exemplo da AWS é consultar o histórico de casos de um cliente no CRM durante o atendimento.

Até aqui, esse tipo de consulta pedia uma função Lambda escrita para cada integração.

O recurso está disponível em 9 regiões da AWS, nenhuma na América do Sul.

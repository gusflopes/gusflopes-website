---
title: "Amazon Cognito deixa agente e cliente MCP logar sem app client próprio"
excerpt: "O Amazon Cognito passou a aceitar, em 19/11/2026, client ID metadata documents: clientes MCP e agentes de IA podem fazer login num user pool sem cadastrar um app client à parte, nos planos Essentials e Plus."
date: "2026-11-20"
temas: ["agentes-engenharia", "governanca-e-seguranca"]
ferramentas: ["aws-cognito", "identidade-de-agentes", "mcp"]
porQueImporta:
  B: "Quem expõe servidor MCP ou API para agentes de terceiros deixa de criar um app client por cliente; o controle passa para as políticas que ligam URLs a um app client, e é nelas que a segurança deve revisar os escopos."
fonte:
  nome: "AWS (What's New)"
  url: "https://aws.amazon.com/about-aws/whats-new/2026/11/cognito-client-id-metadata-documents/"
  data: "2026-11-19"
  tipo: primaria
outrasFontes: []
apuradoEm: "2026-11-20"
base: "aws-cognito-login-de-agente-e-mcp-sem-app-client"
correcoes: []
assinatura: agente
rascunho: false
---
O Amazon Cognito passou a aceitar, em 19/11/2026, client ID metadata documents (CIMD). Com eles, clientes MCP e agentes de IA fazem login num user pool sem que cada um precise de um app client cadastrado.

O cliente usa uma URL HTTPS como client ID e publica nela um documento JSON de metadados, que o Cognito busca e valida no login. O administrador cria políticas que ligam padrões de URL a um app client, e o Cognito só concede os escopos e tipos de concessão permitidos pelos dois. O recurso vale nos planos Essentials e Plus, em todas as regiões do Cognito.

Identidade de agente vira recurso padrão do provedor de login, e não credencial improvisada por cliente. A revisão passa a ser das políticas de URL.

---
title: "Gemini API carrega ferramenta só quando o modelo precisa dela"
excerpt: "O Google pôs em prévia em 19/11/2026 o Tool Retrieval na Interactions API do Gemini: o esquema de cada ferramenta marcada só entra no contexto quando o modelo precisa dela, inclusive em servidores MCP inteiros, sem cobrança à parte."
date: "2026-11-20"
temas: ["agentes-engenharia", "contexto-e-metodo", "custo-e-precificacao"]
ferramentas: ["gemini-modelos", "mcp", "contexto-para-agentes"]
porQueImporta:
  B: "Agente com muitas ferramentas gasta contexto e token só listando o que pode fazer; o carregamento sob demanda muda a conta de custo por tarefa, mas o Google não dá percentual de economia, então a medida tem de ser no seu próprio tráfego."
fonte:
  nome: "Google (blog)"
  url: "https://blog.google/innovation-and-ai/technology/developers-tools/gemini-api-tool-retrieval/"
  data: "2026-11-19"
  tipo: primaria
outrasFontes: []
apuradoEm: "2026-11-20"
base: "gemini-api-tool-retrieval-ferramenta-sob-demanda"
correcoes: []
assinatura: agente
rascunho: false
---
O Google pôs em prévia em 19/11/2026 o Tool Retrieval na Interactions API do Gemini. Com `defer_loading: true` numa ferramenta, o modelo vê só o nome e a descrição dela, e o esquema de parâmetros entra no contexto quando ele precisa usá-la. A marcação vale também para um servidor MCP remoto inteiro.

O recurso não tem cobrança à parte: os tokens seguem o preço do modelo, e cada esquema carregado conta como entrada pelo resto da conversa. Funciona do Gemini 3.6 em diante, incluindo todos os Gemini 4 na Interactions API.

O post não dá percentual de economia: diz que ela depende de quantos esquemas nunca são carregados. Em prévia, a recomendação do próprio Google é medir contra o tráfego real antes de mudar a arquitetura.

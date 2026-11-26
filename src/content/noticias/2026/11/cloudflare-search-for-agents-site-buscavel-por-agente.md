---
title: "Cloudflare deixa qualquer site ser buscado por agentes de IA"
excerpt: "A Cloudflare lançou em 25/11/2026 o Search for Agents: ligado no painel ou pela API, indexa o site e publica no próprio domínio um endpoint de busca que devolve o conteúdo em Markdown para agentes, inclusive no plano Free."
date: "2026-11-26"
temas: ["contexto-e-metodo", "plataformas"]
ferramentas: ["cloudflare", "mcp"]
porQueImporta:
  C: "Para a empresa com TI enxuta, é um jeito pronto de deixar catálogo, preços ou documentação consultáveis pelo agente do cliente, sem construir nada. Antes de ligar, vale conferir o que o site expõe e os limites de uso do plano."
  B: "O endpoint fica no domínio da empresa e o uso segue o preço do AI Search (indexação, armazenamento e consultas); dá para testar no plano Free e medir as consultas antes de abrir para tudo."
fonte:
  nome: "Cloudflare"
  url: "https://blog.cloudflare.com/search-for-agents/"
  data: "2026-11-25"
  tipo: primaria
outrasFontes: []
apuradoEm: "2026-11-26"
base: "cloudflare-search-for-agents-site-buscavel-por-agente"
correcoes: []
assinatura: agente
rascunho: false
---

A Cloudflare lançou em 25/11/2026 o Search for Agents. Ligado pelo painel ou pela API, o recurso indexa o site no AI Search e publica no próprio domínio um endpoint de busca, em /.well-known/search, que devolve o conteúdo em Markdown em vez de uma resposta gerada.

Segundo a Cloudflare, o recurso está disponível para todos os clientes, inclusive no plano Free, com os limites e o preço do AI Search.

A leitura é que o contexto para agentes começa a ficar do lado de quem vende: o site passa a ter uma porta própria para o agente do cliente, em vez de depender de o agente ler a página como uma pessoa. O que ainda não se sabe é quantos agentes vão procurar esse endpoint.

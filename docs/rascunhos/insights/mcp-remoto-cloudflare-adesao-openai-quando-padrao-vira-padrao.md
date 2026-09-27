---
title: "Quando um padrão vira padrão: MCP remoto na Cloudflare e a adesão da OpenAI"
excerpt: "Em dois dias, a Cloudflare colocou servidores MCP remotos em Workers, a OpenAI adotou o protocolo e saiu uma revisão da spec com OAuth 2.1 e Streamable HTTP. O que isso muda para quem expõe API."
date: "2025-04-07"
duration: "9 min"
category: "Arquitetura"
eixo: "engenharia"
tags: ["mcp", "cloudflare", "openai", "oauth"]
image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1080&q=80"
---

Em dezembro, quando escrevi sobre as primeiras semanas do MCP, deixei três pendências para o protocolo deixar de ser aposta: servidor remoto em produção, uma história de autenticação e adoção por outros clientes. No fim de março, as três andaram na mesma semana.

- **25/03**: a Cloudflare publicou [suporte a servidores MCP remotos em Workers](https://blog.cloudflare.com/remote-model-context-protocol-servers-mcp/).
- **26/03**: saiu a [revisão 2025-03-26 da especificação](https://modelcontextprotocol.io/specification/2025-03-26/changelog), com autorização baseada em OAuth 2.1 e um transporte novo, o Streamable HTTP.
- **26/03**: a OpenAI [anunciou que vai suportar MCP](https://techcrunch.com/2025/03/26/openai-adopts-rival-anthropics-standard-for-connecting-ai-models-to-data/) nos seus produtos.

Separados, cada um seria notícia de nicho. Juntos, mudam a conversa de "vale a pena olhar o MCP?" para "qual é a sua estratégia de MCP?".

## A adesão da OpenAI, no tamanho certo

O que foi anunciado: suporte imediato no Agents SDK, e suporte "em breve" no app desktop do ChatGPT e na Responses API. Sam Altman escreveu que "as pessoas adoram o MCP" e que a empresa está animada para suportá-lo em todos os produtos. Mike Krieger, CPO da Anthropic, respondeu dando boas-vindas e disse que o MCP virou um padrão aberto "com milhares de integrações".

Duas leituras, uma de cada lado.

**O que é grande:** o principal concorrente do criador do protocolo decidiu adotar em vez de lançar o seu. É o momento em que um formato deixa de ser "o jeito da Anthropic" e passa a ser o jeito de fazer. O custo de escrever um servidor MCP continua o mesmo; o alcance potencial dele aumentou muito.

**O que ainda é promessa:** hoje, o que existe de fato é o suporte no SDK de agentes. O ChatGPT e a Responses API estão como "em breve". Anúncio de adoção não é adoção em produção. Eu planejaria contando com o SDK e trataria o resto como bônus quando chegar.

## O que a spec 2025-03-26 trouxe

O changelog lista quatro mudanças principais:

1. **Autorização baseada em OAuth 2.1.** Era a peça que faltava para tirar o servidor da máquina local. Agora existe um jeito padronizado de um cliente MCP obter permissão para agir em nome de um usuário.
2. **Streamable HTTP no lugar de HTTP+SSE.** O transporte anterior exigia uma conexão SSE aberta e um endpoint separado para POST. O novo é mais flexível. Na descrição da Cloudflare, ele permite conexões sem estado, com upgrade opcional para SSE quando o servidor precisa mandar mensagens.
3. **Batching de JSON-RPC.**
4. **Tool annotations**: metadados para descrever o comportamento de uma tool, como se ela é só leitura ou destrutiva.

As anotações parecem detalhe e não são. Em dezembro, eu disse que a distinção entre tool, resource e prompt empurra o desenho para o lugar certo. As anotações levam isso um passo adiante: o servidor pode declarar "esta tool apaga coisas", e o cliente pode tratar diferente, pedindo confirmação ou bloqueando. Vale lembrar que a anotação é declaração do servidor. Um cliente sério não deveria confiar cegamente nela vindo de servidor que não conhece.

## O que a Cloudflare entregou

O [post da Cloudflare](https://blog.cloudflare.com/remote-model-context-protocol-servers-mcp/) anuncia quatro peças:

- **workers-oauth-provider**: um provedor OAuth para Workers.
- **McpAgent**: uma classe no Agents SDK deles que cuida do transporte remoto.
- **mcp-remote**: um adaptador para que clientes que só falam MCP local, como o Claude Desktop hoje, conversem com servidores remotos.
- **AI Playground** com suporte a servidores MCP remotos e autenticação, para testar.

A comparação que eles usam é boa: MCP remoto está para o local como o software web esteve para o de desktop. Servidor local exige instalação em cada máquina, e isso limita o público a desenvolvedores. Servidor remoto é uma URL com login.

Dois detalhes de arquitetura me chamaram mais atenção que o anúncio em si.

**O servidor é dois papéis de OAuth ao mesmo tempo.** Ele é cliente OAuth do serviço de origem (o seu sistema, o GitHub, o Google) e provedor OAuth para o cliente MCP. O token do serviço de origem fica guardado criptografado no Workers KV, e o cliente MCP recebe **outro** token, emitido pelo servidor MCP. Se o token do cliente vazar, o estrago fica limitado ao que o servidor MCP permite, e não ao que o token original da sua API permite. É o desenho certo, e vale copiar mesmo fora da Cloudflare.

**Cada sessão é um Durable Object.** O servidor tem estado por sessão, o que permite ir além de um proxy que repassa chamadas para a API. Na data deste texto, a Cloudflare ainda roda o transporte HTTP+SSE e diz que o McpAgent vai se adaptar ao Streamable HTTP automaticamente.

[CONFIRMAR: se você testou o McpAgent ou o mcp-remote nestas duas semanas, descreva aqui o que montou e o que travou]

## O que muda para quem expõe API

É aqui que a notícia vira decisão. Se a sua empresa tem uma API, de produto, de parceiro ou interna, o MCP remoto cria uma superfície nova: a mesma capacidade, oferecida para o assistente de IA que o seu cliente ou o seu time já usa.

Algumas coisas que eu levaria para a próxima conversa de arquitetura.

**MCP não é a sua API REST com outro envelope.** O erro mais provável é gerar uma tool por endpoint. Um modelo com 80 tools parecidas escolhe mal. Tool boa é orientada a tarefa ("consultar situação do pedido"), com descrição clara do que faz, do que não faz e do que devolve. O desenho é de produto, não de roteamento.

**Autorização por usuário, desde o primeiro dia.** Com OAuth na spec, não há mais desculpa para servidor remoto com chave de API compartilhada. Cada chamada precisa agir em nome de alguém, com o escopo desse alguém, e ficar registrada. Em ambiente regulado, a trilha de "quem pediu, qual tool, com quais argumentos, qual resultado" é o que vai responder a auditoria.

**Escopo mínimo e ações destrutivas separadas.** Comece só com leitura. Ação que muda estado entra depois, anotada como tal e, de preferência, exigindo confirmação do usuário no cliente.

**Procedência na resposta.** Se a tool devolve um número, devolva junto de onde ele veio e quando. O modelo vai reescrever a resposta em linguagem natural; a procedência é o que permite a alguém conferir.

**Não aposte em um cliente só.** O ponto de um padrão é justamente esse. Teste o mesmo servidor em mais de um cliente e trate diferenças de comportamento como bug de compatibilidade, não como detalhe.

## Quando um padrão vira padrão

Não existe uma data em que um protocolo "vira" padrão. Existe o momento em que deixa de valer a pena apostar contra ele. Com o criador empurrando, o maior concorrente aderindo e uma plataforma de infraestrutura grande oferecendo hospedagem pronta, eu acho que esse momento chegou para o MCP.

A recomendação continua condicional. Se a sua API tem usuários que já trabalham dentro de um assistente de IA, vale colocar um servidor MCP remoto no roteiro do trimestre: pequeno, só leitura, com OAuth e log de auditoria desde o início. Se a sua API é só interna e ninguém pediu, um servidor local para o próprio time aprender já cumpre o papel. O que eu não faria mais é tratar o MCP como experimento da Anthropic.

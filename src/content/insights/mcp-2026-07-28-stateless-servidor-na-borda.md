---
title: "MCP 2026-07-28: o protocolo ficou stateless. O que muda para quem roda servidor na borda"
excerpt: "A nova versão da spec do MCP acabou com o handshake initialize e com o Mcp-Session-Id. Cada requisição carrega o que precisa. O impacto em Workers e Durable Objects, e o que fazer com o estado que antes morava na sessão."
date: "2026-08-10"
duration: "10 min"
category: "Arquitetura"
eixo: "engenharia"
tags: ["mcp", "cloudflare", "arquitetura-serverless"]
image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1080&q=80"
---

Desde que a Cloudflare [colocou MCP remoto em Workers](https://blog.cloudflare.com/remote-model-context-protocol-servers-mcp/), em março de 2025, rodar um servidor MCP na borda tinha um custo escondido: a sessão. O protocolo começava com um handshake `initialize`, o servidor devolvia um `Mcp-Session-Id` e as requisições seguintes precisavam cair no mesmo lugar. Na Cloudflare, isso significava um Durable Object por sessão via `McpAgent`. Funcionava, mas um servidor que só consulta uma API e devolve o resultado acabava carregando infraestrutura de estado sem precisar dela.

A spec **2026-07-28**, publicada em 28 de julho, tira esse peso. O [release candidate](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/) saiu em 21 de maio, com dez semanas para os SDKs validarem, e o texto final virou a [versão atual](https://modelcontextprotocol.io/specification/versioning). O próprio anúncio avisa: "esta versão contém mudanças incompatíveis".

## O que saiu

- **O handshake `initialize`/`initialized`.** Não existe mais negociação no início da conexão.
- **O header `Mcp-Session-Id`.** Não há sessão no nível do protocolo.
- **O endpoint GET do Streamable HTTP.** O cliente não abre mais um stream SSE avulso para receber mensagens do servidor.
- **Retomada de stream com `Last-Event-ID`.** Os streams deixaram de ser retomáveis.
- **Requisições do servidor no meio do stream.** O servidor não manda mais pedidos próprios (sampling, elicitation) pelo SSE.

## O que entrou

**Cada requisição se descreve sozinha.** Versão do protocolo, identidade e capacidades do cliente vão no `_meta` de toda requisição:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "consultar_pedido",
    "arguments": { "pedido_id": "A-1042" },
    "_meta": {
      "io.modelcontextprotocol/protocolVersion": "2026-07-28",
      "io.modelcontextprotocol/clientInfo": { "name": "ExemploCliente", "version": "1.0.0" },
      "io.modelcontextprotocol/clientCapabilities": {}
    }
  }
}
```

**Headers para a infraestrutura rotear sem ler o corpo.** No [Streamable HTTP](https://modelcontextprotocol.io/specification/2026-07-28/basic/transports/streamable-http), todo POST leva `MCP-Protocol-Version`, `Mcp-Method` e, em `tools/call`, `resources/read` e `prompts/get`, também `Mcp-Name`. A tool pode ainda marcar parâmetros com `x-mcp-header` para que o cliente os espelhe como `Mcp-Param-{Nome}`. O servidor que processa o corpo é obrigado a validar que header e corpo batem e, se não baterem, responder `400` com o erro `HeaderMismatch` (-32020). Isso evita o cenário em que o balanceador roteia por um valor e o servidor executa outro.

**`server/discover`.** Método [obrigatório no servidor](https://modelcontextprotocol.io/specification/2026-07-28/server/discover) e opcional para o cliente. Devolve numa chamada as versões suportadas, as capacidades, a identidade e as instruções do servidor, com `ttlMs` e `cacheScope` para o cliente saber por quanto tempo pode guardar a resposta.

**Negociação por requisição.** Se o servidor não suporta a versão pedida, [responde](https://modelcontextprotocol.io/specification/2026-07-28/basic/versioning) `UnsupportedProtocolVersionError` com a lista do que suporta, e o cliente tenta de novo.

**Multi Round-Trip Requests (MRTR).** Quando o servidor precisa de algo do cliente no meio de uma chamada (confirmação do usuário, uma resposta de LLM), ele devolve um `InputRequiredResult` com os pedidos e um `requestState`. O cliente coleta as respostas e refaz a chamada original com elas. Como o estado viaja na própria requisição, qualquer instância do servidor pode continuar o trabalho.

**Notificações de longa duração** passam a ter um canal explícito, `subscriptions/listen`, cuja resposta é um stream SSE com os tipos de notificação que o cliente pediu.

**Extensões oficiais.** MCP Apps e Tasks viraram extensões com identificador próprio. Tasks saiu do núcleo experimental e ganhou ciclo novo (`tasks/get`, `tasks/update`, `tasks/cancel`).

**Deprecações.** Roots, Sampling e Logging entraram como deprecados, com pelo menos doze meses até a remoção. As alternativas indicadas são, respectivamente, parâmetros de tool ou URIs de recurso, integração direta com a API do LLM, e stderr ou OpenTelemetry.

O anúncio também traz endurecimento de autorização (validação do `iss` pela RFC 9207, entre outros pontos), propagação de W3C Trace Context pelo `_meta` e JSON Schema 2020-12 completo nas tools.

## E o estado?

A spec não proíbe estado. Ela tira o estado do protocolo e devolve para a aplicação. A orientação do anúncio é fazer o que APIs HTTP sempre fizeram: a tool gera um identificador explícito (um `basket_id`, um `browser_id`) e o modelo passa esse identificador de volta como argumento comum nas chamadas seguintes.

É uma mudança boa de desenho. O estado que antes ficava implícito na sessão agora aparece no schema da tool: tem nome, tipo e dono. Dá para auditar, expirar e autorizar. A documentação da Cloudflare diz o mesmo com outras palavras: dados que atravessam requisições devem ficar atrás de um identificador autenticado, num Durable Object, D1, KV ou R2, "em vez de um ID de sessão MCP".

## O impacto em Workers e Durable Objects

A Cloudflare se moveu antes da publicação final. O [Agents SDK v0.20.0](https://developers.cloudflare.com/changelog/post/2026-07-27-agents-sdk-v0.20.0-mcp-sdk-v2/), de 27 de julho, trouxe suporte de cliente e servidor ao release candidate e mudou o caminho recomendado:

- **`createMcpHandler`** recebe uma fábrica que devolve um servidor do SDK MCP v2 (`@modelcontextprotocol/server`), e cria um servidor isolado para cada requisição;
- **`McpAgent` ficou deprecado e congelado.** A recomendação é migrar para o handler stateless, ainda sem data de remoção anunciada;
- **a mesma rota atende clientes 2026-07-28 e clientes legados**, e há `isLegacyRequest()` para rotear o que ainda depender de sessão.

O SDK oficial de TypeScript também saiu em [versão 2.0.0](https://www.npmjs.com/package/@modelcontextprotocol/server) no mesmo dia, dividido em pacotes de servidor e cliente. O código mínimo na borda fica assim:

```typescript
import { McpServer } from "@modelcontextprotocol/server";
import { createMcpHandler } from "agents/mcp/server";
import { z } from "zod";

function createServer(env: Env) {
  const server = new McpServer({ name: "pedidos", version: "1.0.0" });
  server.registerTool(
    "consultar_pedido",
    { description: "Consulta um pedido", inputSchema: { pedido_id: z.string() } },
    async ({ pedido_id }) => {
      const row = await env.DB.prepare("SELECT status FROM pedidos WHERE id = ?1")
        .bind(pedido_id)
        .first();
      return { content: [{ type: "text", text: JSON.stringify(row) }] };
    },
  );
  return server;
}

export default {
  fetch(request, env, ctx) {
    return createMcpHandler(() => createServer(env), { route: "/mcp" })(request, env, ctx);
  },
} satisfies ExportedHandler<Env>;
```

No [post de 6 de agosto](https://blog.cloudflare.com/mcp-v2/), a Cloudflare resume o efeito: o protocolo deixa de exigir o `McpAgent`, e servidores passam a escalar melhor em infraestrutura com escopo de requisição, sem sessão fixa nem gestão de streams.

Isso não aposenta os Durable Objects. Muda o papel deles. Antes, o Durable Object existia porque o **protocolo** pedia sessão. Agora ele entra quando a **aplicação** precisa de coordenação forte: um carrinho, uma automação de navegador, um documento editado por vários agentes. É o mesmo critério que você usaria para qualquer API na Cloudflare.

## O que eu checaria num servidor na borda

1. **Clientes legados.** Pela [matriz de compatibilidade](https://modelcontextprotocol.io/specification/2026-07-28/basic/versioning) da spec, um cliente legado falha contra um servidor que só fala a versão nova, porque clientes legados não têm como avançar de versão. Enquanto os clientes do seu público não migrarem, o servidor precisa atender as duas eras.
2. **Estado escondido.** Procure tudo o que dependia da sessão (usuário "logado" na conversa, contexto acumulado entre chamadas) e transforme em identificador explícito ou em dado persistido atrás de autenticação.
3. **Rate limit e roteamento por header.** Com `Mcp-Method` e `Mcp-Name`, dá para limitar e observar por tool no gateway, sem abrir o corpo. A spec recomenda que intermediários só confiem nesses headers quando a versão declarada exige a validação entre header e corpo.
4. **Elicitation.** Se o servidor pedia confirmação ao usuário por stream, o fluxo passa a ser MRTR, com o estado no `requestState`, e o servidor deixa de depender de conexão aberta.
5. **Deprecações.** Se usa Sampling, Roots ou Logging, planeje a saída dentro dos doze meses.

[CONFIRMAR: descreva aqui o servidor MCP que você estava desenhando em ago/2026 (sem citar detalhes de produção) e como a spec nova mudou o desenho]

## Por que isso importa além da Cloudflare

O MCP nasceu pensando em processo local, falando por stdio com o Claude Desktop, onde a conexão e a sessão são a mesma coisa. Os transportes HTTP herdaram essa ideia de conexão com estado. A versão 2026-07-28 assume que servidor MCP é, na maioria dos casos, uma API HTTP como outra qualquer, e passa a tratá-lo assim: requisição independente, estado explícito, headers para a infraestrutura e cache com prazo definido.

Para quem constrói, a conta fica mais simples. O servidor MCP entra no mesmo pipeline de deploy, observabilidade e segurança das suas outras APIs. Deixa de ser um caso especial, e isso tende a ajudar a adoção mais do que qualquer recurso novo da spec.

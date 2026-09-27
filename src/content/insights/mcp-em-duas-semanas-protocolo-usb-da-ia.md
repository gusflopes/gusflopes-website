---
title: "MCP em duas semanas: por que um protocolo pode ser o \"USB\" da IA"
excerpt: "O Model Context Protocol saiu em 25/11. Um servidor local em stdio, o Claude Desktop como cliente, e o que são tools, resources e prompts. Por que um padrão importa mais que mais um SDK."
date: "2024-12-09"
duration: "9 min"
category: "Agentes"
eixo: "engenharia"
tags: ["mcp", "claude", "integracao"]
image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1080&q=80"
---

Toda integração de IA que vi até hoje tinha o mesmo formato: um SDK do fornecedor do modelo, um punhado de funções declaradas num JSON específico daquele fornecedor, e código de cola para ligar as funções ao sistema interno. Troque o modelo e você reescreve a cola. Troque o cliente (do chat para a IDE, da IDE para um bot) e reescreve de novo.

No dia 25 de novembro, a Anthropic [lançou o Model Context Protocol](https://www.anthropic.com/news/model-context-protocol), o MCP. O diagnóstico do anúncio é exatamente esse: "cada nova fonte de dados exige sua própria implementação, o que torna difícil escalar sistemas realmente conectados". A proposta é um protocolo aberto no meio: quem tem o dado ou a ação escreve um servidor uma vez, e qualquer aplicação de IA que fale MCP consegue usar.

Duas semanas depois, dá para dizer o que ele é, o que ele não é ainda e por que eu acho que a aposta é boa.

## O que saiu no dia 25

Três coisas, segundo o anúncio:

1. **A especificação e os SDKs** (TypeScript e Python), abertos no GitHub.
2. **Suporte a servidores MCP locais** no Claude Desktop, em todos os planos do Claude.ai.
3. **Um repositório de servidores prontos**: Google Drive, Slack, GitHub, Git, Postgres e Puppeteer.

A Block e a Apollo aparecem como primeiras empresas integrando; Zed, Replit, Codeium e Sourcegraph, como ferramentas de desenvolvimento trabalhando com o protocolo. Para empresas, o anúncio diz que ferramentas para colocar servidores remotos em produção vêm "em breve". Hoje, na prática, MCP no Claude Desktop é local.

## A arquitetura em um parágrafo

A [especificação 2024-11-05](https://modelcontextprotocol.io/specification/2024-11-05) usa mensagens JSON-RPC 2.0 entre três papéis: o **host** (a aplicação de IA, como o Claude Desktop), o **cliente** (o conector que o host abre para cada servidor) e o **servidor** (quem oferece dados e ações). A conexão tem estado e começa com uma negociação de capacidades: cada lado declara o que sabe fazer. A spec diz com todas as letras que se inspira no Language Server Protocol, o padrão que fez qualquer editor ganhar suporte a qualquer linguagem sem que cada editor reimplementasse cada linguagem.

Essa é a analogia que importa. O "USB da IA" é a versão de marketing; o LSP é a versão de engenharia. Antes do LSP, eram M editores vezes N linguagens. Depois, M mais N. O MCP tenta fazer a mesma conta com aplicações de IA e sistemas.

## Tools, resources e prompts: quem controla o quê

O servidor pode oferecer três primitivas. O detalhe que mais gostei na [spec](https://modelcontextprotocol.io/specification/2024-11-05/server) é que cada uma tem um dono diferente:

| Primitiva | Quem controla | Para quê | Exemplo |
|---|---|---|---|
| **Prompts** | O usuário | Modelos de interação que a pessoa escolhe usar | Comando de barra, opção de menu |
| **Resources** | A aplicação | Dados de contexto anexados pelo cliente | Conteúdo de arquivo, histórico do git |
| **Tools** | O modelo | Funções que o LLM decide chamar | Requisição à API, escrita de arquivo |

Isso não é taxonomia de enfeite. É um desenho de controle. **Tool é execução decidida pelo modelo**, então é onde mora o risco. A própria spec trata tool como "execução arbitrária de código" e diz que o host precisa obter consentimento explícito do usuário antes de invocar uma. Resource é leitura que a aplicação decide anexar. Prompt é atalho que a pessoa escolhe. Quando for desenhar um servidor, a primeira pergunta é: isto é algo que o modelo deve poder disparar sozinho, ou algo que o usuário ou a aplicação deveria escolher?

## Um servidor mínimo em stdio

A spec define dois transportes: **stdio**, em que o cliente sobe o servidor como subprocesso e troca mensagens pela entrada e saída padrão, e HTTP com Server-Sent Events. Para começar, stdio é o caminho: sem rede, sem autenticação, sem porta aberta.

O exemplo abaixo usa o SDK de TypeScript (`@modelcontextprotocol/sdk`, versão 1.0) e expõe uma tool só: contar dias úteis entre duas datas. Escolhi de propósito um cálculo determinístico. O modelo entende o pedido ("quantos dias úteis até o fim do mês?") e o código calcula.

```ts
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

function diasUteis(inicio: string, fim: string): number {
  const d = new Date(`${inicio}T00:00:00Z`);
  const f = new Date(`${fim}T00:00:00Z`);
  let total = 0;
  while (d <= f) {
    const dia = d.getUTCDay();
    if (dia !== 0 && dia !== 6) total++;
    d.setUTCDate(d.getUTCDate() + 1);
  }
  return total;
}

const server = new Server(
  { name: "prazos", version: "0.1.0" },
  { capabilities: { tools: {} } },
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "dias_uteis_entre",
      description:
        "Conta dias úteis (segunda a sexta) entre duas datas, inclusive. Não considera feriados.",
      inputSchema: {
        type: "object",
        properties: {
          inicio: { type: "string", description: "Data inicial, YYYY-MM-DD" },
          fim: { type: "string", description: "Data final, YYYY-MM-DD" },
        },
        required: ["inicio", "fim"],
      },
    },
  ],
}));

server.setRequestHandler(CallToolRequestSchema, async (req) => {
  if (req.params.name !== "dias_uteis_entre") {
    throw new Error(`Tool desconhecida: ${req.params.name}`);
  }
  const { inicio, fim } = req.params.arguments as { inicio: string; fim: string };
  const resultado = {
    inicio,
    fim,
    diasUteis: diasUteis(inicio, fim),
    criterio: "segunda a sexta; feriados não considerados",
  };
  return { content: [{ type: "text", text: JSON.stringify(resultado) }] };
});

await server.connect(new StdioServerTransport());
```

Três detalhes que valem mais que o código:

- **A descrição é o contrato com o modelo.** "Não considera feriados" está ali para o modelo avisar o usuário, e não para enfeitar. Tool mal descrita é tool usada errado.
- **A resposta carrega o critério.** Devolver só o número deixaria o modelo livre para inventar a explicação. Devolver o critério junto força a resposta a dizer como a conta foi feita.
- **Nada de `console.log`.** No stdio, a spec proíbe escrever no `stdout` qualquer coisa que não seja mensagem MCP válida. Log vai para o `stderr`. É o primeiro erro que quase todo mundo comete.

Para testar sem o Claude, existe o MCP Inspector (`npx @modelcontextprotocol/inspector node build/index.js`), que lista as tools e deixa chamar cada uma à mão. Para ligar no Claude Desktop, basta registrar o comando no `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "prazos": {
      "command": "node",
      "args": ["/caminho/absoluto/build/index.js"]
    }
  }
}
```

Reinicie o Claude Desktop, e a tool aparece disponível na conversa. Quando o modelo decide usá-la, o app pede sua aprovação antes de executar.

[CONFIRMAR: descreva aqui seu primeiro servidor MCP local, o que ele fazia, quanto tempo levou e o que deu errado no caminho]

## Por que um padrão importa mais que mais um SDK

Todo fornecedor de modelo já tem "function calling". O que faltava era o mesmo contrato de ferramenta funcionar **fora** de um fornecedor. Hoje o MCP tem um cliente de peso (o Claude Desktop) e algumas ferramentas de desenvolvimento se aproximando. É pouco para chamar de padrão de mercado. Um protocolo só vira padrão quando outros clientes, de outros fornecedores, adotam. Isso ainda não aconteceu, e pode não acontecer.

Mesmo assim, eu escreveria servidores MCP hoje por dois motivos que não dependem dessa adoção:

1. **Separa a ferramenta do agente.** A tool de prazos acima não sabe nada sobre Claude. Se amanhã eu quiser usá-la em outro cliente, o trabalho está feito. Se o MCP morrer, a lógica continua isolada e testável, e a cola nova é fina.
2. **Obriga a pensar em controle.** A distinção entre tool, resource e prompt, e a exigência de consentimento para tool, empurram o desenho para o lugar certo: o que o modelo pode fazer sozinho, o que precisa de aprovação e o que é só leitura.

## O que falta

Duas semanas não é tempo para veredito. Pelo que está na spec e no anúncio, falta: servidor remoto em produção no Claude Desktop (anunciado como "em breve"), uma história de autenticação para quando o servidor sair da máquina local, e adoção por outros clientes. São exatamente as três coisas que definem se o MCP vira o LSP da IA ou só mais um formato proprietário com licença aberta.

A recomendação, por enquanto, é condicional. Se você tem uma API interna que várias pessoas gostariam de consultar conversando, vale escrever um servidor MCP local como experimento: é pouco código, e o aprendizado de desenhar tools para um modelo serve para qualquer protocolo que vencer. Se você precisa de algo em produção, com usuários fora da sua máquina e autenticação, ainda é cedo.

---
title: "Claude Agent SDK: quando o harness do coding agent vira o seu produto"
excerpt: "Em 29/09/2025 o Claude Code SDK passou a se chamar Claude Agent SDK. A troca de nome admite o que já acontecia: o loop do coding agent serve para muito mais que código. O que dá para construir com ele, e o que muda para quem já usava o SDK."
date: "2025-10-13"
duration: "9 min"
category: "Agentes"
eixo: "engenharia"
tags: ["claude-agent-sdk", "claude-code", "agentes", "mcp"]
image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1080&q=80"
---

Em 29 de setembro de 2025, junto com o Claude Sonnet 4.5, a Anthropic renomeou o Claude Code SDK para **Claude Agent SDK**. O [post de engenharia do anúncio](https://www.anthropic.com/engineering/building-agents-with-the-claude-agent-sdk) explica o motivo sem rodeio: internamente, o Claude Code passou a ser usado para pesquisa, criação de vídeo, anotações e "incontáveis" outras tarefas que não são código. Segundo o post, ele "começou a alimentar quase todos os nossos principais loops de agente".

A troca de nome importa menos que a tese por trás dela. O que torna o Claude Code útil não é o modelo sozinho. É o harness: o loop, as ferramentas, a gestão de contexto e as permissões em volta do modelo. E esse harness agora é oferecido como peça para montar o seu produto.

## A tese: dar um computador ao agente

O princípio de design do SDK, nas palavras do post, é "dar aos seus agentes um computador, permitindo que trabalhem como humanos trabalham". O Claude Code funciona porque tem acesso ao terminal: acha arquivos, edita, roda, lê o erro e tenta de novo. Com as mesmas ferramentas (bash, criar e editar arquivos, buscar), o agente também lê CSV, busca na web, monta visualização e interpreta métrica.

Os exemplos que a Anthropic lista vão bem além de código: agentes de finanças, de assistência pessoal, de atendimento ao cliente e de pesquisa em grandes coleções de documentos.

## O loop: coletar contexto, agir, verificar

O post descreve o ciclo como **coletar contexto → agir → verificar o trabalho → repetir**. Cada etapa corresponde a recursos do SDK.

**Coletar contexto.**

- **Busca agêntica no sistema de arquivos.** O agente decide como carregar arquivos grandes usando `grep`, `tail` e afins. O post diz que "a estrutura de pastas e arquivos de um agente vira uma forma de context engineering". A recomendação é começar por ela e só adicionar busca semântica (embeddings) se precisar de mais velocidade, porque a semântica é "menos precisa, mais difícil de manter e menos transparente".
- **Subagentes.** Servem para paralelizar e para isolar contexto: cada subagente tem a própria janela e devolve ao orquestrador só o que interessa.
- **Compactação.** Quando o limite de contexto se aproxima, o SDK resume as mensagens anteriores automaticamente. É o mesmo mecanismo do comando `/compact` do Claude Code.

**Agir.**

- **Ferramentas** próprias, que são as ações que o modelo mais considera. O post lembra que elas ocupam espaço nobre no contexto e precisam ser desenhadas com isso em mente.
- **Bash e scripts** para trabalho flexível.
- **Geração de código**, porque "código é preciso, componível e infinitamente reutilizável".
- **MCP**, para integrar Slack, GitHub, Google Drive e outros sem escrever a integração nem gerir OAuth.

**Verificar.** É a parte que eu mais gosto, e a que mais projetos esquecem. O post sugere três formas, em ordem de robustez:

1. **Regras explícitas.** A melhor forma de feedback é uma regra clara e a explicação de qual falhou e por quê. Lint é o exemplo clássico. O post observa que gerar TypeScript e rodar o lint costuma ser melhor que gerar JavaScript puro, porque dá mais camadas de verificação.
2. **Feedback visual**, com captura de tela, por exemplo via o servidor MCP do Playwright.
3. **LLM como juiz**, que o próprio texto chama de "geralmente não muito robusto" e com custo de latência.

Essa ordem conversa com uma convicção que eu tenho há tempo. O modelo pode conversar, planejar e escrever, mas a verificação deve ser o mais determinística possível. Quando o resultado precisa estar certo (um número, um contrato, um cálculo), a regra verificável vale mais que a opinião de outro modelo.

## O que muda para quem já usava o SDK

O [guia de migração](https://docs.claude.com/en/docs/claude-code/sdk/migration-guide) traz a troca de pacotes:

| | Antes | Depois |
|---|---|---|
| TypeScript | `@anthropic-ai/claude-code` | `@anthropic-ai/claude-agent-sdk` |
| Python | `claude-code-sdk` | `claude-agent-sdk` |
| Tipo de opções (Python) | `ClaudeCodeOptions` | `ClaudeAgentOptions` |

Há duas mudanças de comportamento que podem quebrar um agente em produção sem nenhum erro de compilação:

**1. O system prompt do Claude Code não vem mais por padrão.** Agora o padrão é vazio. Quem dependia do comportamento antigo precisa pedir o preset explicitamente:

```typescript
import { query } from "@anthropic-ai/claude-agent-sdk";

const result = query({
  prompt: "Revise o módulo de faturamento",
  options: {
    systemPrompt: { type: "preset", preset: "claude_code" },
  },
});
```

**2. As configurações do sistema de arquivos não são mais lidas por padrão.** `CLAUDE.md`, `settings.json` e slash commands ficam de fora, a não ser que você declare `settingSources` (por exemplo, `["project"]`).

A justificativa da Anthropic é previsibilidade em CI/CD, em aplicações publicadas, em testes e, principalmente, em sistemas multi-inquilino, para "evitar vazamento de configurações entre usuários". Concordo com a decisão. Um agente de produto não deve mudar de comportamento porque alguém esqueceu um `CLAUDE.md` na pasta do servidor.

[CONFIRMAR: se você migrou algum projeto do Claude Code SDK, descreva aqui o que quebrou e quanto levou]

## Onde eu usaria, e onde não usaria

**Faz sentido quando:**

- a tarefa é aberta, com vários passos e caminho que não dá para prever (investigar um incidente, revisar código, montar um relatório a partir de fontes variadas);
- o agente precisa de um ambiente de trabalho de verdade: arquivos, comandos, scripts;
- você quer reaproveitar o que já funciona no Claude Code (subagentes, hooks, compactação, MCP) em vez de reescrever o loop.

**Eu pensaria duas vezes quando:**

- **o fluxo é fixo.** Se os passos são sempre os mesmos, um pipeline comum com chamadas pontuais ao modelo é mais barato, mais rápido e mais fácil de testar. Nem todo problema pede um agente;
- **o ambiente não pode ser isolado.** Dar um computador ao agente significa dar a ele um shell. Em produção, isso exige sandbox, permissões por ferramenta e limites claros. O SDK tem controle de permissões granular, mas o isolamento do ambiente é responsabilidade sua;
- **o modelo de cobrança não fecha.** A documentação diz que, salvo aprovação prévia, terceiros não podem usar os limites do Claude.ai nos próprios produtos. Agente de produto se autentica por chave da API (ou via Amazon Bedrock e Google Vertex AI) e paga por token. Um loop que lê arquivos e tenta de novo pode gastar muitas chamadas por tarefa, então o custo precisa estar no desenho desde o início.

## O harness é o produto

A lição mais interessante do rename é de arquitetura. Por muito tempo, a conversa sobre agentes foi sobre qual modelo usar. O que a Anthropic está dizendo com o Agent SDK é que a diferença está no harness: como o contexto é coletado, que ferramentas existem, como o trabalho é verificado e o que o agente pode ou não fazer.

Isso favorece quem constrói. Trocar o modelo é trocar um parâmetro. Desenhar ferramentas boas, regras de verificação e um ambiente seguro dá trabalho, e é justamente o que fica como diferencial de um produto para outro.

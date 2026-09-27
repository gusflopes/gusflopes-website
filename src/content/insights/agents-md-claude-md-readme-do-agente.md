---
title: "AGENTS.md, CLAUDE.md e afins: o README que o seu agente lê"
excerpt: "Todo coding agent lê um arquivo de instruções do repositório. Em agosto de 2025 o AGENTS.md virou formato aberto. O que colocar nele, o que deixar de fora e como versionar junto com o código."
date: "2025-09-08"
duration: "8 min"
category: "Agentes"
eixo: "engenharia"
tags: ["agents-md", "claude-code", "coding-agents", "context-engineering"]
image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1080&q=80"
---

Todo coding agent começa o trabalho sem saber nada do seu projeto. Ele não sabe que o teste de integração precisa do Docker rodando, que a pasta `legacy/` não deve ser tocada, nem que o time usa rebase em vez de merge. A saída que o mercado encontrou é simples: um arquivo Markdown na raiz do repositório, lido automaticamente no início de cada sessão.

O problema é que cada ferramenta inventou o seu nome. Em agosto de 2025, parte do mercado resolveu convergir.

## O que é o AGENTS.md

O [AGENTS.md](https://agents.md/) se apresenta como "um formato simples e aberto para orientar coding agents" e se define como "um README para agentes". A ideia é separar públicos: o README continua para humanos (como começar, descrição do projeto, como contribuir), e o AGENTS.md traz o contexto extra que o agente precisa, como passos de build, testes e convenções que poluiriam o README.

O formato surgiu de um esforço conjunto que o próprio site atribui a OpenAI Codex, Amp, Jules (Google), Cursor e Factory. O nome já era usado antes: em maio, o [README do Codex CLI](https://github.com/openai/codex/blob/ae809f37217083b942278d9139d970d10895d6b9/README.md) documentava a leitura de `AGENTS.md` em três lugares (global em `~/.codex/`, na raiz do repositório e na pasta atual), com mesclagem de cima para baixo.

Na versão do site em setembro de 2025, a página dizia que o formato era usado por mais de 20 mil projetos de código aberto e listava compatibilidade com Codex, Amp, Jules, Cursor, Factory, RooCode, Aider, Gemini CLI, Kilo Code, opencode, Phoenix, Zed, Semgrep, Warp, o coding agent do GitHub Copilot e Ona.

As regras são poucas, e por isso funcionam:

- **Não há campo obrigatório.** É Markdown comum, com os títulos que você quiser.
- **Monorepo usa arquivos aninhados.** O agente lê o AGENTS.md mais próximo na árvore de diretórios, e o mais próximo prevalece. O site cita que o repositório principal da OpenAI tinha 88 arquivos AGENTS.md na época.
- **Em caso de conflito**, vale o arquivo mais próximo do que está sendo editado, e o pedido explícito do usuário no chat passa por cima de tudo.
- **Comandos de teste listados no arquivo são executados.** O agente tenta rodar as checagens e corrigir as falhas antes de dar a tarefa por terminada.

## E o CLAUDE.md?

O Claude Code não aparece na lista de compatíveis do site. Ele usa o próprio arquivo, o `CLAUDE.md`, com um sistema de [memória em camadas](https://docs.anthropic.com/en/docs/claude-code/memory):

| Camada | Onde fica | Para quê |
|---|---|---|
| Política da empresa | caminho do sistema (ex.: `/etc/claude-code/CLAUDE.md` no Linux) | padrões da organização, geridos por TI |
| Projeto | `./CLAUDE.md` | instruções do time, versionadas |
| Usuário | `~/.claude/CLAUDE.md` | preferências pessoais em todos os projetos |

Alguns detalhes da documentação que fazem diferença no dia a dia:

- **Leitura recursiva.** O Claude Code sobe da pasta atual até a raiz lendo os `CLAUDE.md` que encontrar. Os arquivos em subpastas só entram quando ele lê arquivos daquela subpasta.
- **Imports.** Um `CLAUDE.md` pode importar outros arquivos com a sintaxe `@caminho/do/arquivo`, com até 5 níveis de profundidade. A própria documentação sugere isso para instruções individuais fora do repositório e marca o antigo `CLAUDE.local.md` como descontinuado, em favor dos imports.
- **Manutenção.** O comando `/init` gera um primeiro rascunho, o atalho `#` adiciona uma instrução durante a sessão e `/memory` abre os arquivos no editor.

Se o seu time usa mais de um agente, a pergunta prática é como evitar dois arquivos que dizem coisas diferentes. Vejo duas saídas:

1. **Link simbólico.** O próprio site do AGENTS.md sugere `ln -s` para migrar arquivos antigos mantendo compatibilidade. Um `CLAUDE.md` que aponta para o `AGENTS.md` resolve o caso simples.
2. **Import.** Pelo mecanismo documentado, um `CLAUDE.md` com a linha `@AGENTS.md` carrega o arquivo comum, e abaixo dela você acrescenta só o que for específico do Claude Code.

Para outras ferramentas, o site do AGENTS.md documenta a configuração: no Gemini CLI, `"contextFileName": "AGENTS.md"` em `.gemini/settings.json`; no Aider, `read: AGENTS.md` em `.aider.conf.yml`.

[CONFIRMAR: descreva aqui como você organiza os arquivos de instrução nos seus repositórios, se usa link simbólico, import ou arquivos separados]

## O que colocar

A lista que o site do AGENTS.md sugere é boa: visão geral do projeto, comandos de build e teste, estilo de código, instruções de teste e cuidados de segurança. As [boas práticas do Claude Code](https://www.anthropic.com/engineering/claude-code-best-practices) acrescentam etiqueta do repositório (nome de branch, merge ou rebase), setup do ambiente e comportamentos inesperados do projeto.

Eu organizaria por uma pergunta: **o que um colega novo, competente, erraria na primeira semana?** É isso que vai no arquivo.

```markdown
# AGENTS.md

## Comandos
- Instalar: `pnpm install`
- Testar um pacote: `pnpm --filter <pacote> test`
- Antes de commitar: `pnpm lint && pnpm typecheck`

## Convenções
- Datas sempre em UTC no banco; conversão só na borda.
- Valores monetários em centavos (inteiro). Nunca float.

## Não faça
- Não edite migrations já aplicadas; crie uma nova.
- Não adicione dependência sem registrar o motivo no PR.

## PR
- Título: [pacote] descrição curta
- Todo PR precisa de teste que falha sem a mudança.
```

Repare no que esse exemplo tem em comum: tudo é verificável, curto e específico do projeto.

## O que deixar de fora

- **O que o agente descobre sozinho.** Estrutura de pastas óbvia e linguagem do projeto ele vê lendo o código.
- **Documentação longa.** O arquivo entra em toda sessão. A Anthropic avisa que um erro comum é acrescentar conteúdo extenso sem iterar sobre a eficácia. Se precisa de um documento de arquitetura, aponte para ele, não cole o conteúdo.
- **Segredos.** Nada de chaves, senhas ou URLs internas sensíveis. O arquivo é versionado, lido por ferramentas de terceiros e vai parar no contexto de um modelo.
- **Regra que ninguém segue.** Instrução velha que contradiz o código ensina o agente a desconfiar do arquivo inteiro, ou pior, a seguir a regra errada.
- **Preferência pessoal.** Isso vai no arquivo do usuário, não no do projeto.

## Como versionar

O AGENTS.md é código. Três práticas que eu adotaria:

1. **Muda no mesmo PR que muda o comportamento.** Trocou o comando de teste? O arquivo muda junto, e o revisor vê as duas coisas.
2. **Revisão como qualquer arquivo.** A Anthropic conta que ajusta as instruções como ajusta um prompt, inclusive com ênfase ("IMPORTANT", "YOU MUST") quando a regra não está sendo seguida. Isso só funciona se alguém olha o diff.
3. **Poda periódica.** Se uma instrução nunca foi necessária, ela só ocupa contexto. Vale reler o arquivo quando alguém reclama que o agente "ignorou" uma regra: às vezes a regra estava enterrada entre vinte outras.

## Um arquivo, vários leitores

O mérito do AGENTS.md não é técnico. É de coordenação: um nome previsível, sem campos obrigatórios, que várias ferramentas leem. Isso tira do time a tarefa de manter três arquivos com o mesmo conteúdo.

Para quem lidera time, o arquivo tem um efeito colateral bom. Ele obriga a escrever o conhecimento tácito que antes só existia na cabeça de quem está há mais tempo no projeto. O humano que entra no time também ganha com isso.

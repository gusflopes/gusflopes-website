---
title: "Context engineering: nome novo para um trabalho antigo"
excerpt: "O termo pegou em junho de 2025, mas o problema é velho: decidir o que o modelo vê. O que muda na prática com arquivos de instrução, recorte de ferramentas e sessões curtas, e os quatro jeitos mais comuns de estragar um contexto."
date: "2025-07-14"
duration: "8 min"
category: "IA"
eixo: "engenharia"
tags: ["context-engineering", "coding-agents", "claude-code"]
image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=1080&q=80"
---

Em junho de 2025, "context engineering" saiu de nicho e virou o termo da vez. Desconfio de termos da vez. Mas este acerta num ponto: o nome antigo, "prompt engineering", passou a descrever mal o trabalho de quem constrói com LLMs.

## De onde veio o termo

A sequência foi rápida e dá para rastrear:

- **12/06**: a Cognition publicou ["Don't Build Multi-Agents"](https://cognition.com/blog/dont-build-multi-agents) e chamou context engineering de "o trabalho número 1 de quem constrói agentes de IA".
- **Meados de junho**: Tobi Lütke, CEO da Shopify, [escreveu](https://twitter.com/tobi/status/1935533422589399127) que prefere "context engineering" a "prompt engineering" porque o termo descreve melhor a habilidade central.
- **23/06**: a LangChain publicou ["The rise of context engineering"](https://www.langchain.com/blog/the-rise-of-context-engineering) com uma definição: construir sistemas dinâmicos que entregam a informação e as ferramentas certas, no formato certo, para que o LLM consiga plausivelmente cumprir a tarefa.
- **25/06**: Andrej Karpathy deu o ["+1"](https://twitter.com/karpathy/status/1937902205765607626), lembrando que as pessoas associam "prompt" a uma descrição curta de tarefa.
- **27/06**: Simon Willison [registrou](https://simonwillison.net/2025/Jun/27/context-engineering/) por que o termo tende a pegar: o significado que as pessoas deduzem só pelo nome fica mais perto do trabalho real. "Prompt engineering" acabou entendido como "digitar coisas num chatbot".

O argumento do Willison é o que me convence. O termo não descreve nada novo. Ele corrige a percepção.

## O que é velho nisso

Quem já montou RAG, escolheu exemplos para few-shot ou resumiu histórico de conversa para caber na janela já fazia context engineering. A diferença é de escala. Um chat recebe uma pergunta e devolve uma resposta. Um agente roda em loop: lê arquivos, chama ferramentas, acumula resultados e decide o próximo passo com base em tudo o que se acumulou. Cada volta do loop acrescenta coisa ao contexto, e nem tudo que entra ajuda.

O prompt virou uma parte pequena do que o modelo vê. O resto é montado por sistema: instruções do projeto, definições de ferramentas, saídas de comando, trechos de arquivo, histórico. Projetar esse sistema é o trabalho.

## Quatro jeitos de estragar um contexto

O texto mais útil que li sobre o assunto é o de Drew Breunig, ["How Long Contexts Fail"](https://www.dbreunig.com/2025/06/22/how-contexts-fail-and-how-to-fix-them.html), de 22/06. Ele organiza as falhas em quatro tipos, cada um com evidência publicada:

1. **Envenenamento.** Uma alucinação entra no contexto e passa a ser referenciada de novo e de novo. No relatório do Gemini 2.5 jogando Pokémon, citado por Breunig, partes do contexto (metas, resumo) ficaram "envenenadas" com informação falsa sobre o estado do jogo, e o agente passou a perseguir objetivos impossíveis.
2. **Distração.** O contexto cresce tanto que o modelo passa a repetir o próprio histórico em vez de pensar. No mesmo caso, acima de 100 mil tokens o agente tendia a repetir ações antigas em vez de montar planos novos. Breunig também cita um estudo da Databricks em que a precisão do Llama 3.1 405B começou a cair por volta de 32 mil tokens, e modelos menores caíram antes.
3. **Confusão.** Informação supérflua degrada a resposta. No Berkeley Function-Calling Leaderboard, todos os modelos pioraram com mais ferramentas disponíveis. Num benchmark citado por ele, um Llama 3.1 8B quantizado falhou com 46 ferramentas e acertou com 19, mesmo com espaço de sobra na janela.
4. **Conflito.** Informação nova contradiz a antiga. Num estudo da Microsoft e da Salesforce em que o pedido chega fatiado ao longo de vários turnos, o desempenho caiu 39% em média. Os modelos fazem suposições cedo, tentam uma resposta final antes da hora e depois se apegam a ela.

A lição que tiro dessa lista: janela grande não resolve. Ela só adia o problema e deixa mais caro cada erro que entra.

## Como isso aparece num coding agent

Traduzindo para o dia a dia de quem usa agente em repositório, vejo três alavancas.

### 1. Arquivo de instrução curto e revisado

O Claude Code carrega automaticamente o `CLAUDE.md` no início de cada conversa. As [boas práticas publicadas pela Anthropic em abril](https://www.anthropic.com/engineering/claude-code-best-practices) dizem para manter o arquivo "conciso e legível por humanos" e avisam do erro comum de sair acrescentando conteúdo sem medir se ajuda. O arquivo vira parte do prompt, então precisa ser iterado como prompt.

O que costuma valer a pena colocar:

- comandos de build, teste e lint;
- convenções que o código não deixa óbvias;
- armadilhas conhecidas do projeto ("este teste depende de fuso horário");
- o que não fazer ("não altere migrations já aplicadas").

O que costuma atrapalhar: histórico do projeto, documentação de arquitetura inteira colada, regra que ninguém mais segue. Tudo isso entra em toda sessão e vira candidato a confusão.

### 2. Recorte do que o agente vê

A evidência de "confusão" vale especialmente para ferramentas. Cada servidor MCP conectado acrescenta definições ao contexto, estejam elas em uso ou não. Conectar todos os servidores "porque pode precisar" é o equivalente a entregar 46 ferramentas quando a tarefa pede 19.

O mesmo vale para arquivos. Apontar os arquivos relevantes ("leia `PedidoService` e o teste dele") costuma funcionar melhor que deixar o agente varrer o repositório inteiro. O fluxo que a Anthropic sugere começa por aí: pedir para ler os arquivos relevantes e dizer explicitamente para não escrever código ainda. Só depois vêm plano, código e commit.

### 3. Sessões curtas, um objetivo por vez

As mesmas boas práticas recomendam usar `/clear` com frequência entre tarefas, porque em sessões longas a janela se enche de conversa, conteúdo de arquivo e saída de comando irrelevantes, o que "pode reduzir o desempenho e às vezes distrair o Claude". É a falha de distração, com nome de comando.

Para tarefas grandes, a sugestão é manter um checklist num arquivo Markdown que o agente lê e atualiza. É memória externa: o estado da tarefa sai do histórico da conversa e vai para um arquivo que você controla, lê e pode corrigir. Se o agente se perder, você limpa a sessão e retoma do arquivo, não do zero.

Um exemplo típico de erro por excesso de contexto é a sessão que começou corrigindo um bug, passou por uma refatoração e terminou numa feature nova. Lá pelas tantas, o agente reaplica uma decisão que valia para o bug e não vale para a feature, porque as duas estão no mesmo histórico e nada diz qual prevalece. É conflito puro. A correção é barata: uma sessão por objetivo.

## E os multiagentes?

O post da Cognition que abriu a discussão é, no fundo, um alerta contra dividir tarefas entre agentes que não compartilham contexto. Os dois princípios deles:

- compartilhe o contexto inteiro, com o rastro completo do agente, não só mensagens soltas;
- ações carregam decisões implícitas, e decisões conflitantes geram resultados ruins.

O exemplo deles é didático: peça um clone de Flappy Bird a dois subagentes em paralelo, e um faz um cenário no estilo Super Mario enquanto o outro desenha um pássaro que não combina. Cada um cumpriu a sua parte. O conjunto não fecha. Antes de paralelizar, vale perguntar se as partes realmente não dependem de decisões umas das outras.

## Nome novo, disciplina velha

Context engineering é o velho princípio de engenharia de dar a cada componente só a informação de que ele precisa, aplicado a um componente que lê texto. Nada disso exige ferramenta nova. Exige três hábitos: tratar o arquivo de instrução como código (curto, revisado, versionado), recortar ferramentas e arquivos por tarefa e encerrar a sessão quando o objetivo muda.

O ganho de chamar isso por um nome próprio é permitir que o time converse sobre o assunto. "O agente errou" vira "o contexto estava envenenado desde o terceiro passo", e esse segundo diagnóstico dá para corrigir.

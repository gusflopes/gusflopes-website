---
title: "Claude Code GA, Codex CLI e o Copilot agent: o terminal virou o novo IDE?"
excerpt: "Em pouco mais de um mês, OpenAI, GitHub e Anthropic lançaram agentes de código com três desenhos diferentes. Comparo o modelo de uso, o preço e, principalmente, quem controla o quê."
date: "2025-05-26"
duration: "8 min"
category: "Agentes"
eixo: "engenharia"
tags: ["claude-code", "codex-cli", "github-copilot", "coding-agents"]
image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&w=1080&q=80"
---

Abril e maio de 2025 condensaram um ano de lançamentos em cinco semanas. Em 16 de abril a OpenAI publicou o Codex CLI. Em 19 de maio, no Build, o GitHub anunciou o Copilot coding agent. Em 22 de maio a Anthropic lançou o Claude Opus 4 e o Sonnet 4 e tirou o Claude Code da research preview.

Os três são "agentes de código", mas a semelhança para no nome. Cada um parte de uma ideia diferente sobre onde o agente deve trabalhar e sobre quem aprova o que ele faz. Para quem lidera time, essa diferença pesa mais que qualquer benchmark.

## Três lançamentos, três lugares de trabalho

**Codex CLI (OpenAI).** É um agente que roda no seu terminal, no seu repositório local. O [README do projeto](https://github.com/openai/codex/blob/ae809f37217083b942278d9139d970d10895d6b9/README.md) resume bem: "lightweight coding agent that runs in your terminal". Instala com `npm i -g @openai/codex`, usa a sua chave da API da OpenAI e tem código aberto sob licença Apache-2.0. Com a flag `--provider`, aceita outros provedores compatíveis com a API de Chat Completions.

**GitHub Copilot coding agent.** O agente não roda na sua máquina. Você [atribui uma issue ao Copilot](https://github.blog/news-insights/product-news/github-copilot-meet-the-new-coding-agent/) e ele sobe um ambiente de desenvolvimento baseado em GitHub Actions, trabalha lá e vai empurrando commits para um pull request em rascunho. Você acompanha pelos logs da sessão e revisa no PR, como faria com um colega.

**Claude Code (Anthropic).** Estava em research preview desde 24 de fevereiro e, no [anúncio do Claude 4](https://www.anthropic.com/news/claude-4), virou produto de disponibilidade geral. Continua sendo um agente de terminal, mas ganhou extensões beta para VS Code e JetBrains (as edições aparecem inline no arquivo), um SDK para montar agentes próprios e uma integração beta com o GitHub, em que você marca o Claude Code num PR.

Resumindo: dois agentes moram no terminal do desenvolvedor, e um mora no fluxo de issues e PRs do repositório remoto.

## Controle: quem aprova o quê

Essa é a pergunta que eu faria antes de qualquer outra. Um agente de código lê arquivos, escreve arquivos e executa comandos. O risco está no terceiro verbo.

O Codex CLI deixa o controle explícito numa flag, `--approval-mode`, com três níveis:

| Modo | O que faz sem pedir | O que ainda pede aprovação |
|---|---|---|
| Suggest (padrão) | Lê arquivos | Toda escrita e todo comando |
| Auto Edit | Lê e aplica patches | Todo comando de shell |
| Full Auto | Lê, escreve e executa | Nada |

O Full Auto não fica solto. No macOS, cada comando roda dentro do Apple Seatbelt, com o sistema de arquivos só para leitura (exceto o diretório de trabalho e alguns temporários) e rede de saída bloqueada. No Linux, o README diz com todas as letras que não há sandbox por padrão e recomenda rodar o Codex dentro de um contêiner Docker com firewall. O agente também avisa se você entra em modo automático num diretório sem Git. É um bom sinal de maturidade: a rede de segurança é o versionamento.

O Copilot coding agent resolve o controle pelo lado do repositório. Pelo [post de lançamento](https://github.blog/news-insights/product-news/github-copilot-meet-the-new-coding-agent/):

- ele só consegue fazer push em branches que ele mesmo criou;
- quem pediu o PR não pode aprová-lo, então as regras de revisão obrigatória continuam valendo;
- os workflows do GitHub Actions não rodam sem aprovação humana;
- o acesso à internet fica limitado a uma lista de destinos que você configura.

Para um time que já tem branch protection e revisão obrigatória, isso é o caminho de menor atrito. O agente entra no processo que já existe. Ele não pula a fila.

O Claude Code segue o modelo de permissões por ferramenta. Por padrão, [pede autorização](https://www.anthropic.com/engineering/claude-code-best-practices) para qualquer ação que modifique o sistema e deixa você montar uma lista de ferramentas permitidas, que pode ser versionada no repositório em `.claude/settings.json`.

Minha leitura é que não existe resposta certa. Existe adequação ao time. Se o time vive no terminal e confia no próprio julgamento a cada passo, os agentes locais dão mais velocidade. Se o time precisa de trilha de auditoria e de revisão formal, o agente que só entrega por PR cabe melhor.

## Preço: três lógicas de cobrança

Aqui a comparação fica difícil, porque cada fornecedor cobra de um jeito:

- **Codex CLI:** a ferramenta é gratuita e aberta. Você paga o consumo de tokens da API do modelo que usar.
- **Copilot coding agent:** está disponível nos planos Copilot Pro+ e Copilot Enterprise. A partir de 4 de junho de 2025, segundo o GitHub, cada requisição de modelo feita pelo agente consome uma "premium request" da cota do plano.
- **Claude Code:** roda sobre os modelos da Anthropic. Na API, o [Opus 4 custa US$ 15 por milhão de tokens de entrada e US$ 75 por milhão de saída; o Sonnet 4, US$ 3 e US$ 15](https://www.anthropic.com/news/claude-4). As condições de assinatura mudam com frequência, então confira a página de preços no dia em que for decidir.

O ponto que eu levaria para uma reunião de orçamento é o seguinte: agente de código consome tokens de um jeito muito diferente de um chat. Ele lê arquivos, roda testes, lê a saída e tenta de novo. Uma tarefa pode virar dezenas de chamadas ao modelo. Por isso, orçamento por assento não diz muito. O que importa é o custo por tarefa concluída, e isso só aparece medindo no seu repositório.

[CONFIRMAR: descreva aqui sua experiência de custo com algum desses agentes, se houver, com o período e o tipo de tarefa]

## E os benchmarks?

A Anthropic divulgou 72,5% no SWE-bench para o Opus 4 e 72,7% para o Sonnet 4. São números do fornecedor, num benchmark de correção de issues em repositórios Python de código aberto. Servem para mostrar a tendência. Não servem para prever o comportamento no seu monólito .NET com dez anos de convenções implícitas.

A variável que mais pesa no resultado não é o modelo, é o contexto que o agente recebe. Os três lançamentos deixam isso claro: o Codex CLI lê instruções de projeto em arquivos `AGENTS.md` (global, na raiz do repo e na pasta atual), e o Claude Code usa o `CLAUDE.md`, que a Anthropic [recomenda versionar no git](https://www.anthropic.com/engineering/claude-code-best-practices) para o time inteiro. Quem escreve bem esse arquivo tira mais do agente que quem troca de modelo toda semana.

## O terminal virou o novo IDE?

Em parte. O que mudou foi o lugar da interface principal. Durante anos, a IA de código foi um recurso do editor: autocompletar, chat lateral. Agora o agente é o ator principal e o editor vira o lugar onde você revisa o que ele fez. O terminal ganhou porque é onde o agente consegue fazer o ciclo completo: ler, editar, rodar o teste, ler o erro e corrigir.

Mas o movimento do GitHub mostra outra coisa. Para muitos times, o lugar natural do agente não é o terminal de ninguém, e sim o PR. Ali já existem revisão, CI, histórico e responsável. O Claude Code também caminha nessa direção com a integração beta no GitHub e com o SDK para rodar em pipelines. O Codex CLI já traz um modo silencioso para CI no próprio README.

Minha aposta para os próximos meses é de convergência: o mesmo agente disponível no terminal, no editor e no PR, e a escolha feita pelo tipo de tarefa. Tarefa exploratória, com muita ida e volta, fica no terminal. Tarefa bem especificada, que cabe numa issue, vai para o agente assíncrono.

## O que eu faria nesta semana

1. **Escolher uma tarefa real e pequena**, com critério de aceite claro. Uma correção de bug com teste reproduzível serve.
2. **Rodar com o controle no nível mais restrito.** No Codex CLI, o modo Suggest. No Claude Code, sem liberar ferramentas extras. Aumentar a autonomia só depois de ver o comportamento.
3. **Medir custo e retrabalho**, não só tempo. Tokens gastos, rodadas de revisão e quanto do diff sobreviveu.
4. **Escrever o arquivo de instruções do repositório** antes de comparar agentes. Sem ele, você compara modelos adivinhando o seu projeto.
5. **Definir a regra de merge.** Código de agente passa pela mesma revisão que código humano. O desenho do Copilot coding agent, em que quem pede não aprova, é um bom padrão para copiar.

O terminal não matou o IDE. O que perdeu importância foi digitar código. O trabalho que sobra é decidir o que o agente pode fazer sozinho e revisar o que ele entrega, e isso nenhum dos três lançamentos resolve por você.

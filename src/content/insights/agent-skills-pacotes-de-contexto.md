---
title: "Agent Skills: pacotes de contexto e o fim do prompt gigante"
excerpt: "As Skills da Anthropic, lançadas em 16/10/2025, são pastas com um SKILL.md que o agente só carrega quando precisa. Quando uma skill substitui uma instrução longa, como organizar e por que o paralelo certo é com biblioteca interna."
date: "2025-11-03"
duration: "8 min"
category: "Agentes"
eixo: "engenharia"
tags: ["agent-skills", "claude-code", "context-engineering", "mcp"]
image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&w=1080&q=80"
---

Todo time que usa agente em algum momento escreve um prompt gigante. Ele começa como um arquivo de instruções razoável e vai crescendo: o jeito certo de gerar relatório, o padrão do e-mail para cliente, o passo a passo do deploy, as regras da planilha do financeiro. Tudo entra em toda sessão, inclusive quando a tarefa é trocar a cor de um botão.

As **Agent Skills**, que a Anthropic [lançou em 16 de outubro de 2025](https://www.anthropic.com/news/skills), atacam esse problema com uma ideia simples: empacotar cada conhecimento procedimental numa pasta e deixar o agente carregar só o pacote de que precisa.

## O que é uma skill

Pelo [post de engenharia do lançamento](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills), uma skill é um diretório com um arquivo `SKILL.md`. O arquivo começa com um frontmatter YAML com dois campos obrigatórios, `name` e `description`, e segue com instruções em Markdown. A pasta pode trazer outros arquivos: referências, modelos e scripts.

```markdown
---
name: relatorio-mensal
description: Gera o relatório mensal de indicadores no padrão da diretoria. Use quando pedirem relatório mensal, fechamento do mês ou indicadores consolidados.
---

# Relatório mensal

1. Rode `scripts/extrair.py` para puxar os dados do mês.
2. Siga a estrutura de `modelo.md`.
3. Valores em reais, sem casas decimais nos totais.
4. Se algum indicador variar mais de 20% sobre o mês anterior, destaque e peça confirmação.
```

A [documentação do Claude Code](https://docs.claude.com/en/docs/claude-code/skills) define os limites: `name` só com letras minúsculas, números e hífens, até 64 caracteres; `description` com até 1.024 caracteres, dizendo o que a skill faz e quando usar.

## Divulgação progressiva: o pulo do gato

O princípio central é o que a Anthropic chama de *progressive disclosure*, em três níveis:

1. **Metadados.** Ao iniciar, o agente carrega só o `name` e a `description` de cada skill instalada. É o suficiente para saber quando usar cada uma.
2. **Corpo do SKILL.md.** Se a skill parece relevante para a tarefa, o agente lê o arquivo inteiro.
3. **Arquivos anexos.** Referências e detalhes ficam em arquivos separados, que o agente abre só se precisar. No exemplo do post, a skill de PDF deixa as instruções de preenchimento de formulário em `forms.md`, lido só quando a tarefa é preencher formulário.

A consequência, nas palavras do post, é que a quantidade de contexto que cabe numa skill é "efetivamente ilimitada", porque o agente não precisa ler tudo. Simon Willison [resumiu o efeito](https://simonwillison.net/2025/Oct/16/claude-skills/): cada skill ocupa "algumas dezenas de tokens" até ser usada.

É context engineering aplicado: em vez de entregar tudo e torcer para o modelo achar o trecho certo, você entrega um índice e deixa o modelo abrir o capítulo.

## Scripts: quando o modelo não deve gerar a resposta

Uma skill pode trazer código para o agente executar. O post dá o argumento econômico, que ordenar uma lista gerando tokens é muito mais caro que rodar um algoritmo de ordenação, e o argumento de confiabilidade: muitas aplicações exigem a "confiabilidade determinística que só código oferece".

Para mim, esse é o ponto mais importante do lançamento. A skill junta a instrução (o que o modelo entende) com o script (o que o computador calcula) no mesmo pacote. O modelo decide quando rodar, e o script garante que o resultado é sempre o mesmo. Se o seu processo tem conta, validação ou transformação de dados, esse trecho vai para o script, não para o prompt.

## Onde as skills funcionam

No lançamento, a Anthropic informou suporte em quatro frentes:

- **Apps do Claude:** planos Pro, Max, Team e Enterprise. Em Team e Enterprise, o administrador precisa habilitar antes.
- **Claude Code:** skills pessoais em `~/.claude/skills/`, skills de projeto em `.claude/skills/` (versionadas no git e compartilhadas com o time) e skills que vêm em plugins.
- **API:** skills nas requisições da Messages API e um endpoint `/v1/skills` para versionar e gerenciar. Exige o Code Execution Tool, em beta.
- **Claude Agent SDK:** o mesmo suporte para agentes próprios.

No Claude Code, a diferença para os slash commands é quem dispara. A documentação define skills como *model-invoked*: o modelo decide usar com base na descrição. Slash commands são *user-invoked*: você digita `/comando`. O campo `allowed-tools` permite restringir as ferramentas que a skill pode usar.

## Skill, arquivo de instruções ou MCP?

As três coisas convivem, e confundir o papel de cada uma é o jeito mais rápido de voltar ao prompt gigante.

| | Arquivo de instruções (CLAUDE.md, AGENTS.md) | Skill | Servidor MCP |
|---|---|---|---|
| Carregado | Sempre, em toda sessão | Só os metadados; o resto sob demanda | Definições das ferramentas no contexto |
| Serve para | Regras gerais do projeto | Procedimentos específicos | Acesso a sistemas externos |
| Exemplo | "Rode o lint antes do commit" | "Como fechar o relatório mensal" | Ler o CRM, consultar o banco |

A regra que eu seguiria: **o que vale para toda tarefa vai no arquivo de instruções; o que vale para um tipo de tarefa vira skill; o que precisa falar com outro sistema é MCP.** O próprio post indica que a Anthropic vai explorar como skills podem complementar servidores MCP, ensinando fluxos mais complexos que envolvem ferramentas externas.

Willison foi mais provocativo e chamou as skills de "talvez algo maior que o MCP". O argumento dele é o custo de contexto: o servidor MCP oficial do GitHub, sozinho, consome dezenas de milhares de tokens. A contrapartida, que ele também aponta, é que skills dependem de um ambiente com sistema de arquivos e execução de comandos. Sem isso, não funcionam.

## O paralelo com bibliotecas internas

A melhor analogia que encontrei para explicar skills a um time é a biblioteca interna. Nenhum time sério copia e cola a função de cálculo de frete em dez serviços. Ele cria um pacote, versiona, documenta a interface e importa onde precisa.

Skills são o mesmo movimento para conhecimento procedimental:

- **Uma responsabilidade por skill.** A documentação recomenda skills focadas. Uma skill que faz relatório, deploy e e-mail é o equivalente a um `Utils.cs` de três mil linhas.
- **A descrição é a interface.** O modelo decide usar a skill pela `description`. Descrição vaga significa skill que nunca é chamada, ou que é chamada na hora errada. O post pede atenção especial ao nome e à descrição.
- **Versionamento e revisão.** Skill de projeto mora no repositório e passa por PR como qualquer código.
- **Teste com tarefa real.** A recomendação da Anthropic é começar por avaliação: rodar o agente em tarefas representativas, ver onde ele tropeça e escrever skills para essas lacunas, não para tudo o que dá para imaginar.

[CONFIRMAR: se você já migrou instruções longas para skills, descreva aqui o caso, o que virou skill e o que ficou no arquivo de instruções]

## O cuidado que não dá para pular

Uma skill traz instruções e código que o agente executa. O post é direto: uma skill maliciosa pode introduzir vulnerabilidades ou levar o agente a exfiltrar dados. A orientação é instalar só de fontes confiáveis e, quando a fonte for menos confiável, auditar tudo antes de usar, com atenção a dependências, scripts e instruções que mandem o agente se conectar a destinos externos.

Na prática, trate skill de terceiros como dependência de terceiros. Tem que ter origem conhecida, alguém precisa ler o código e a versão deve ficar fixada. Se o seu time já tem processo para adotar pacote npm ou NuGet, use o mesmo.

## O fim do prompt gigante

Skills não inventam nada que um bom engenheiro não pudesse montar com arquivos e disciplina. A contribuição delas é dar um formato simples e o mesmo em todo lugar para uma prática que já funcionava: separar o conhecimento em módulos, carregar sob demanda e deixar o cálculo com o código.

O prompt gigante vira um índice com pacotes pequenos. O agente fica mais rápido, o contexto fica mais limpo e o conhecimento do time passa a ter endereço, dono e histórico.

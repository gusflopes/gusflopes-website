---
title: "Claude 3.5 Sonnet e Artifacts: quando o chat virou ambiente de trabalho"
excerpt: "O Artifacts abre uma janela ao lado da conversa onde o modelo devolve código que roda, e não só texto. O que isso muda para quem prototipa telas e scripts, e onde o limite aparece rápido."
date: "2024-07-15"
duration: "7 min"
category: "IA"
eixo: "engenharia"
tags: ["claude", "artifacts", "prototipagem"]
image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1080&q=80"
---

Durante um ano e meio, o fluxo de quem usava chatbot para programar foi o mesmo: pedir, copiar o bloco de código, colar no editor, rodar, voltar ao chat com o erro, repetir. O modelo escrevia; quem executava era você. A conversa era o rascunho e o trabalho acontecia em outro lugar.

Em 20 de junho, a Anthropic lançou o [Claude 3.5 Sonnet](https://www.anthropic.com/news/claude-3-5-sonnet) e, junto com ele, uma prévia de um recurso chamado Artifacts. A descrição oficial é modesta: quando você pede um trecho de código, um documento ou o desenho de um site, o resultado aparece "numa janela dedicada ao lado da conversa", onde dá para ver, editar e continuar construindo em tempo real. Parece detalhe de interface. Não é.

## O que foi anunciado, sem adjetivo

Os números do modelo, segundo a própria Anthropic:

- **Preço na API**: US$ 3 por milhão de tokens de entrada e US$ 15 por milhão de saída.
- **Contexto**: 200 mil tokens.
- **Velocidade**: o dobro do Claude 3 Opus, que até então era o topo da família.
- **Código**: numa avaliação interna de programação "agêntica" (o modelo recebe um repositório e precisa corrigir um bug ou adicionar funcionalidade), o 3.5 Sonnet resolveu 64% dos problemas; o Claude 3 Opus, 38%.

Esse último número é interno e sem metodologia pública detalhada, então trato como indicação de direção, não como benchmark. Mas a direção bate com o resto: um modelo intermediário, mais barato e mais rápido, passando o modelo grande da geração anterior.

Cinco dias depois vieram os [Projects](https://www.anthropic.com/news/projects), para Pro e Team: conversas agrupadas em torno de uma base de conhecimento, com os mesmos 200 mil tokens de contexto ("o equivalente a um livro de 500 páginas", nas palavras da Anthropic). E em 9 de julho, segundo o [registro do Simon Willison](https://simonwillison.net/2024/Jul/9/claude-share-artifacts/), passou a ser possível publicar e compartilhar artifacts por link.

## Por que um painel lateral muda o trabalho

O ponto não é estético. É o ciclo de feedback.

Quando o modelo devolve texto, quem fecha o ciclo é você: copiar, colar, instalar dependência, rodar, descobrir que faltou um import. Cada volta custa minutos e, pior, custa atenção. Quando o modelo devolve um artefato que **renderiza ali mesmo**, uma página HTML, um componente React, um SVG, um diagrama Mermaid, a volta cai para segundos. Você olha, aponta o que está errado, e a próxima versão aparece no mesmo lugar.

O Simon Willison resumiu bem no [post do lançamento](https://simonwillison.net/2024/Jun/20/claude-35-sonnet/): o mais interessante é que o modelo agora consegue construir *e depois renderizar* páginas e aplicações de uma página só, direto na interface. Nas semanas seguintes ele documentou uma série de ferramentas pequenas feitas assim, de geradores de CSS a utilitários para PDF.

Isso muda o que vale a pena pedir. Antes, pedir uma tela inteira ao chat dava trabalho demais para validar. Agora a validação é olhar.

## Onde eu usaria no dia a dia de um time

Pensando como tech lead, três usos parecem óbvios e de baixo risco.

**1. Protótipo de tela para conversar com o negócio.** A reunião em que alguém descreve uma tela em palavras e cada pessoa sai imaginando uma coisa diferente é clássica. Um protótipo clicável em React, com dados fictícios, gerado durante a própria conversa, corta essa ambiguidade. Não é o front-end do produto. É um objeto para apontar e dizer "não, o filtro fica aqui".

**2. Diagramas que viram documentação.** Mermaid renderizado na hora serve para rascunhar fluxo de integração, diagrama de sequência ou máquina de estados. O texto-fonte do diagrama vai para o repositório junto com o ADR. O artefato é o rascunho; o arquivo versionado é o registro.

**3. Scripts descartáveis com interface.** Converter um CSV, comparar dois JSONs, montar uma calculadora de conferência para uma planilha que o financeiro manda todo mês. É o tipo de ferramenta que ninguém prioriza no backlog e que, agora, sai numa conversa.

[CONFIRMAR: descreva aqui sua experiência com Artifacts nas primeiras semanas, por exemplo o primeiro protótipo que você fez e quanto tempo levou]

## Onde o limite aparece

A empolgação precisa de freio, e o freio vem de três lugares.

**O artefato roda numa caixa de areia.** Ele vive no navegador, dentro da interface do Claude. Não tem backend seu, não tem banco de dados, não tem acesso à sua rede interna. Serve para demonstrar comportamento de interface e lógica local. Não serve para provar que uma integração funciona.

**Código que roda não é código revisado.** O fato de a tela aparecer bonita não diz nada sobre tratamento de erro, acessibilidade, segurança ou manutenção. Um protótipo feito em dez minutos tem a qualidade de um protótipo feito em dez minutos. O risco real é organizacional: alguém ver a tela funcionando e perguntar "então já está pronto?". A resposta precisa ser não, e o time precisa ter isso combinado antes.

**Conta que vale dinheiro não pode sair de código que ninguém testou.** Esse é o ponto em que meu lado de contador e advogado fala mais alto que o de engenheiro. Uma calculadora gerada por um LLM é código escrito por um LLM. Se ela calcula juros, prazo ou imposto, o número só pode ser usado depois de testado contra casos conhecidos, como qualquer outro código. O Artifacts torna muito fácil ter uma calculadora na tela. Não torna a calculadora correta.

E há o cuidado de sempre com dados: o que você cola na conversa sai da sua máquina. Protótipo com dado fictício, sempre. Planilha real de cliente não entra em chat de uso geral sem uma decisão consciente sobre contrato, política da empresa e LGPD.

## O que isso sinaliza

Vale separar o que é fato do que é leitura minha.

O fato: um modelo intermediário, com preço de modelo intermediário, passou a gerar código que roda na própria interface, e a Anthropic está organizando o produto em torno de trabalho (Projects, artefatos compartilháveis) e não só de conversa.

A leitura: a fronteira entre "chat" e "ferramenta de desenvolvimento" começou a se mover. Hoje o artefato vive numa caixa de areia sem acesso a nada. É razoável esperar que essa caixa vá ganhando paredes mais largas: acesso a arquivos, a repositórios, a ferramentas. Quando isso acontecer, as perguntas deixam de ser "o modelo escreve bom código?" e passam a ser as de sempre em engenharia: quem revisa, onde roda, o que pode acessar e como se desfaz o que deu errado.

Para quem lidera time, a recomendação é condicional. Se o gargalo do seu time é alinhar expectativa antes de construir, vale testar Artifacts como ferramenta de protótipo e de diagrama, com uma regra clara de que nada dali vai direto para produção. Se o gargalo é qualidade, revisão ou dívida técnica, isso não resolve nada, e pode até piorar se virar atalho.

O chat virou ambiente de trabalho. A disciplina de engenharia continua sendo sua.

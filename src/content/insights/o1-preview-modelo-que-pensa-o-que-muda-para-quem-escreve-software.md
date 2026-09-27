---
title: "o1-preview e o \"modelo que pensa\": o que muda para quem escreve software"
excerpt: "O o1-preview troca velocidade por raciocínio e cobra pelos tokens que você não vê. Onde esse custo compensa em engenharia de software, onde não compensa e como eu decidiria."
date: "2024-09-23"
duration: "8 min"
category: "IA"
eixo: "engenharia"
tags: ["openai", "o1", "modelos-de-raciocinio"]
image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1080&q=80"
---

No dia 12 de setembro, a OpenAI liberou o o1-preview e o o1-mini para assinantes do ChatGPT Plus e Team e para uma parte dos desenvolvedores na API. É a primeira vez que um fornecedor grande vende, como produto, um modelo que **gasta tempo pensando antes de responder**. O nome que pegou foi "modelo de raciocínio".

Dez dias de barulho depois, dá para separar o que foi anunciado, o que já se sabe dos limites e onde isso encaixa no trabalho de quem escreve software.

## O que é diferente, de fato

Os modelos anteriores geram a resposta token a token, direto. O o1 foi treinado com aprendizado por reforço em larga escala para produzir uma cadeia de raciocínio interna antes da resposta: quebrar o problema, testar caminhos, corrigir o próprio erro. Essa cadeia **não aparece** para você. Na API, ela vira "reasoning tokens": tokens que não voltam na resposta, mas são contados e cobrados como saída. O [resumo do Simon Willison](https://simonwillison.net/2024/Sep/12/openai-o1/) do lançamento é a melhor referência técnica que encontrei até aqui.

Os números que mais circularam: num exame classificatório da Olimpíada Internacional de Matemática, o GPT-4o resolveu 13% dos problemas e o novo modelo de raciocínio, 83%; em programação competitiva (Codeforces), percentil 89. A [TechCrunch](https://techcrunch.com/2024/09/12/openai-unveils-a-model-that-can-fact-check-itself/) atribui esses números ao o1, a versão completa que a OpenAI mostrou mas não liberou. Então leia com o asterisco: o que está nas nossas mãos é a prévia.

Mais interessante que o benchmark é um resultado que a própria OpenAI publicou: em testes de preferência com avaliadores humanos, o o1-preview ganhou do GPT-4o em programação, análise de dados e matemática, e **perdeu em escrita pessoal**. O fornecedor dizendo onde o produto novo é pior é informação rara e útil ([resumo na The Batch](https://www.deeplearning.ai/the-batch/openais-o1-models-excel-in-reasoning-outperform-gpt-4o-in-math-and-coding)).

## O preço de pensar

Aqui mora a decisão de engenharia.

**Dinheiro.** Na API, o o1-preview custa US$ 15 por milhão de tokens de entrada e US$ 60 por milhão de saída, e os tokens de raciocínio entram como saída. A TechCrunch coloca a entrada em seis vezes o preço do GPT-4o. A OpenAI sugere reservar algo como 25 mil tokens para raciocínio em prompts complexos. Fazendo a conta com esses números, só o raciocínio de uma chamada difícil pode custar perto de US$ 1,50, antes da resposta propriamente dita. Não é caro para uma decisão de arquitetura. É caríssimo para autocompletar código.

**Tempo.** A resposta pode levar de poucos segundos a vários minutos. Qualquer fluxo com alguém esperando na frente da tela sente.

**Recursos que faltam.** Na API de lançamento, sem system prompt, sem streaming, sem uso de ferramentas (function calling), sem imagens. O acesso começou restrito ao tier 5, contas que já gastaram pelo menos US$ 1.000 em créditos. No ChatGPT, o limite inicial era de 30 mensagens por semana no o1-preview; no dia 17, a [OpenAI ampliou](https://x.com/OpenAI/status/1835857163765637607) para 50 por semana, e o o1-mini foi de 50 por semana para 50 por dia.

**Alucinação não sumiu.** A própria OpenAI reconheceu, segundo a TechCrunch, que o o1 tende a alucinar mais que o GPT-4o em alguns cenários. Pensar mais não é o mesmo que saber mais.

## Onde eu apostaria que compensa

Com essas restrições, o critério que eu usaria é simples: **o o1 vale quando o custo de errar é maior que o custo de esperar e pagar**. Em engenharia de software, isso aponta para alguns lugares.

**Bugs de lógica difíceis de reproduzir.** Condição de corrida, erro de arredondamento que só aparece em certos valores, regra de negócio com muitos casos que se cruzam. Aqui o gargalo é raciocinar sobre o problema, não digitar a solução.

**Planejamento de refatoração.** Antes de mexer em um módulo acoplado, pedir um plano: ordem das mudanças, o que quebra no caminho, onde colocar teste de caracterização antes de tocar. O plano é texto curto, a decisão é cara. Bom perfil.

**Revisão de desenho.** Descrever uma proposta de arquitetura e pedir que o modelo procure falhas: ponto único de falha, inconsistência transacional, caso de borda esquecido. É o "advogado do diabo" que ninguém no time tem tempo de fazer direito.

**Algoritmo e estrutura de dados.** É onde os benchmarks apontam, e faz sentido: problemas fechados, com resposta verificável.

[CONFIRMAR: descreva aqui um problema real em que você testou o o1-preview e o resultado comparado ao GPT-4o ou ao Claude 3.5 Sonnet]

## Onde não compensa

**Autocompletar e boilerplate.** Gerar DTO, teste repetitivo, mapeamento de campos. Latência e preço matam o ganho, e um modelo rápido faz igual.

**Conversa exploratória.** Quando você mesmo ainda não sabe o que quer, iterar rápido com um modelo rápido rende mais que esperar um minuto por uma resposta muito pensada para a pergunta errada.

**Qualquer coisa que precise de ferramenta.** Sem function calling, o o1-preview não consulta seu banco, não roda teste, não lê o repositório sozinho. Tudo que ele sabe é o que você colou.

**Texto para gente.** E-mail, documentação voltada a usuário, comunicação. O próprio teste de preferência da OpenAI diz que ele não é melhor nisso.

## Como muda o jeito de pedir

Algumas práticas de prompt que viraram hábito com o GPT-4 atrapalham aqui.

- **Não peça "pense passo a passo".** O modelo já faz isso por dentro. Pedir de novo só gasta token.
- **Contexto enxuto.** A orientação da OpenAI, registrada pelo Simon Willison, vai contra o costume de RAG: incluir só a informação mais relevante, para o modelo não complicar a resposta. Colar o repositório inteiro "por garantia" é pior, não melhor.
- **Diga o critério de sucesso.** "Encontre a causa do bug e explique por que a correção funciona para os casos X, Y e Z" rende mais que "conserte isso".

## A combinação que me parece mais promissora

Se o o1 é bom para pensar e ruim para executar, e os modelos rápidos são o contrário, a divisão de trabalho quase se desenha sozinha: um modelo de raciocínio produz o plano ou o diagnóstico, e um modelo rápido e barato faz a execução mecânica, com um humano revisando a passagem de um para o outro. Não é uma ferramenta pronta que eu possa recomendar; é um desenho que dá para montar hoje, à mão, com duas abas abertas.

A mudança de fundo é que a escolha de modelo deixou de ser "qual é o melhor" e passou a ser "qual é o certo para esta etapa". Isso é uma decisão de arquitetura, com custo, latência e qualidade na mesa, como qualquer outra dependência. A recomendação, então, é condicional: se o seu time tem problemas em que errar custa caro e esperar um minuto não custa nada, vale reservar orçamento para testar o o1-preview neles, com casos conhecidos e comparação honesta contra o modelo que vocês já usam. Se o uso é autocompletar e gerar boilerplate, fique onde está.

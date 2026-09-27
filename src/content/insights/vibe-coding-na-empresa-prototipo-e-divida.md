---
title: "Vibe coding na empresa: protótipo numa tarde, dívida por um ano"
excerpt: "Pedir para a IA escrever um sistema inteiro sem ler o código ficou fácil. Para validar uma ideia, é ótimo. Para rodar a operação da empresa, é um risco que precisa de dono. Um guia de decisão para quem não é da área técnica."
date: "2025-04-28"
duration: "8 min"
category: "Estratégia"
eixo: "negocios"
tags: ["vibe-coding", "prototipo", "governanca"]
image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1080&q=80"
---

Em fevereiro, Andrej Karpathy, um dos nomes mais respeitados da área de IA, [publicou um post](https://x.com/karpathy/status/1886192184808149383) descrevendo um jeito novo de programar que ele chamou de **vibe coding**: você descreve o que quer, aceita o que a IA escreve, cola a mensagem de erro quando algo quebra e, nas palavras dele, "esquece que o código existe". Ele deixou claro que falava de projetos descartáveis de fim de semana.

Em poucas semanas o termo saiu do nicho. Em março, a Y Combinator, uma das principais aceleradoras de startups do mundo, disse que um quarto das empresas da turma atual [tinha cerca de 95% do código gerado por IA](https://techcrunch.com/2025/03/06/a-quarter-of-startups-in-ycs-current-cohort-have-codebases-that-are-almost-entirely-ai-generated/). Ferramentas que geram um aplicativo inteiro a partir de uma conversa começaram a aparecer em anúncio para público não técnico.

E aí chegou a pergunta que empresário e gestor está fazendo agora: **"se o meu analista consegue fazer um sistema numa tarde, por que eu pago uma software house?"**

A resposta honesta é que as duas coisas não são o mesmo produto.

## O que o vibe coding faz muito bem

Vale começar pelo lado bom, que é real. Para algumas situações, o vibe coding é a melhor ferramenta que já existiu.

- **Validar uma ideia.** Antes, testar se uma tela ou um fluxo fazia sentido custava semanas de desenvolvimento. Agora, um protótipo clicável sai numa tarde. Se a ideia for ruim, você descobre barato.
- **Ferramenta pessoal e descartável.** Um script que junta três planilhas, uma página que calcula uma estimativa interna, um conversor de arquivo. Se quebrar, ninguém se prejudica.
- **Mostrar o que você quer para quem vai construir.** Um protótipo funcional comunica muito melhor do que um documento de requisitos. Levar isso para a conversa com o time técnico economiza muita reunião.
- **Aprender.** Gestores que nunca programaram passam a entender melhor o que é difícil e o que é fácil, e isso melhora a relação com o time técnico.

Em todos esses casos, o valor está na **velocidade de descobrir**. O código é um meio, e pode ir para o lixo depois.

## Onde vira dívida

O problema começa quando o protótipo, que funcionou na demonstração, passa a ser usado de verdade. Isso quase nunca é uma decisão. Acontece aos poucos: um colega pede acesso, depois o time inteiro usa, depois um cliente recebe um relatório gerado por ele. Um dia alguém percebe que parte da operação depende de um sistema que ninguém entende.

Os riscos que aparecem nesse ponto são sempre os mesmos:

1. **Ninguém é dono.** A pessoa que fez sai de férias ou da empresa. O código nunca foi lido por ninguém, nem por ela, porque essa era justamente a proposta.
2. **Segurança.** Sistemas gerados sem revisão costumam guardar senha no código, deixar dados expostos, não controlar quem acessa o quê. A IA escreve o que foi pedido. Se ninguém pediu segurança, ela pode não aparecer.
3. **Dados de cliente num lugar que ninguém mapeou.** Se o protótipo guarda nome, e-mail ou CPF, ele está sujeito à LGPD como qualquer outro sistema. Não existe exceção para protótipo.
4. **Manutenção impossível.** Na primeira mudança de regra, pede-se à IA para ajustar. Ela ajusta uma parte e quebra outra. Como ninguém entende o todo, cada correção vira uma aposta.
5. **Conta que ninguém conferiu.** Se o sistema calcula comissão, preço ou imposto, e ninguém validou a regra, o erro só aparece quando alguém reclama.

O custo de um sistema não está em escrever a primeira versão. Está nos anos de manutenção. O vibe coding derrubou o custo da primeira versão e não mexeu no resto.

## Um critério simples: quem paga se quebrar?

Para decidir se um sistema feito "na conversa" pode continuar como está, eu uso uma pergunta: **se isso quebrar ou der resultado errado, quem paga?**

| Situação | O que fazer |
|---|---|
| Ninguém além de quem fez | Pode continuar como está. |
| O time interno, com incômodo | Defina um dono, faça backup dos dados e anote o que o sistema faz. |
| Um cliente, o caixa ou uma obrigação legal | Passe por revisão técnica antes de continuar usando. Talvez reescreva. |
| Envolve dados pessoais ou financeiros de terceiros | Não use em produção sem revisão de segurança e sem saber onde os dados ficam. |

Essa tabela não proíbe nada. Ela só obriga alguém a decidir, em vez de deixar o protótipo virar sistema por inércia.

## Como aproveitar sem se machucar

Para empresas que querem incentivar o uso (e deveriam, porque o ganho de velocidade é real), algumas regras funcionam bem:

- **Deixe claro o que é protótipo.** Um nome, um aviso na tela, uma pasta separada. Protótipo tem prazo de validade.
- **Protótipo não recebe dado real de cliente.** Use dados fictícios até alguém decidir que o sistema vai virar oficial.
- **Todo sistema em uso tem um dono nomeado**, mesmo que seja pequeno.
- **A passagem de protótipo para sistema é uma decisão explícita**, com alguém técnico olhando o código antes.
- **O código fica num lugar versionado**, e não no computador de quem fez.

## A conta real

A pergunta "por que eu pago uma software house se o analista faz numa tarde?" tem uma resposta menos óbvia do que parece. O analista faz numa tarde a parte que sempre foi a mais barata. O que você paga num sistema profissional é o que vem depois: entender a regra de negócio, tratar os casos que ninguém lembrou, proteger os dados, manter funcionando quando a lei ou o processo muda.

O vibe coding é um presente para quem precisa descobrir rápido o que quer. Use-o assim e ele vai economizar dinheiro. Se deixar que ele vire a base da operação sem que ninguém decida isso, a economia de uma tarde vira um ano de dívida.

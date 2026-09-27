---
title: "Computer Use: agentes que clicam na tela são RPA com outro nome?"
excerpt: "A Anthropic colocou em beta um modelo que usa o computador olhando screenshots e movendo o mouse. Comparado com RPA, ele é mais flexível, mais lento, mais caro por passo e menos previsível. Onde isso faz sentido numa empresa hoje."
date: "2024-10-28"
duration: "8 min"
category: "Agentes"
eixo: "engenharia"
tags: ["claude", "computer-use", "rpa", "automacao"]
image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1080&q=80"
---

Na terça-feira, 22 de outubro, a Anthropic [anunciou](https://www.anthropic.com/news/3-5-models-and-computer-use) uma versão nova do Claude 3.5 Sonnet, o Claude 3.5 Haiku e um beta público chamado **Computer Use**: o modelo usa o computador "do jeito que as pessoas usam", olhando a tela, movendo o cursor, clicando e digitando.

A primeira reação de quem já trabalhou com automação corporativa é previsível: "isso é RPA". A pergunta é justa e merece resposta mais cuidadosa que sim ou não.

## Como funciona, pelo que a Anthropic publicou

O mecanismo está descrito num [texto técnico da própria Anthropic](https://www.anthropic.com/news/developing-computer-use). O modelo recebe um screenshot, decide a próxima ação e **conta quantos pixels** precisa mover o cursor na horizontal e na vertical para clicar no lugar certo. A empresa diz que treinar essa contagem precisa foi crítico. Sem ela, o modelo não consegue dar comandos de mouse.

Na API, isso chega como ferramentas definidas pela Anthropic: uma de computador (screenshot, mouse, teclado), uma de terminal e uma de edição de texto, habilitadas por um cabeçalho de beta. Quem executa as ações é o **seu** ambiente. A Anthropic publicou uma [implementação de referência](https://github.com/anthropics/anthropic-quickstarts/tree/main/computer-use-demo) em Docker, com um desktop virtual e o loop do agente.

O loop é este: screenshot → modelo decide → seu código executa → novo screenshot → repete. Cada passo é uma chamada ao modelo com uma imagem nova.

## Os números, e o que eles dizem

No [OSWorld](https://www.anthropic.com/news/3-5-models-and-computer-use), benchmark de tarefas reais em sistema operacional, o Claude marcou **14,9%** na categoria só com screenshots, contra 7,8% do segundo colocado; com mais passos permitidos, 22%. A Anthropic lembra que o desempenho humano fica em 70–75%.

Leia de novo: o melhor resultado publicado completa menos de um quarto das tarefas. A própria Anthropic chama o recurso de experimental, diz que ele às vezes é "desajeitado e sujeito a erro" e lista o que ainda não funciona bem: rolar a tela, arrastar, dar zoom. Tem mais uma limitação que acho a mais importante para empresa: a visão é de "folheto", screenshots em sequência e não vídeo, então **notificações e ações rápidas podem passar despercebidas**.

Na mesma leva, o 3.5 Sonnet novo foi de 33,4% para 49% no SWE-bench Verified, benchmark de correção de bugs reais em repositórios. É outro sinal de para onde a Anthropic está empurrando o modelo: agir, e não só responder.

Empresas citadas como testando o recurso: Asana, Canva, Cognition, DoorDash, Replit e The Browser Company.

## RPA e Computer Use, lado a lado

RPA clássico grava ou programa uma sequência de passos sobre seletores: o campo com tal identificador, o botão em tal posição da árvore da tela, a janela com tal título. Quando a tela muda, o robô quebra. Quem já manteve RPA em produção sabe que o custo real não é construir o robô, é mantê-lo vivo a cada atualização do sistema de terceiro.

Computer Use troca seletor por visão. Ele procura "o botão Salvar" na imagem, onde quer que esteja. Isso resolve a fragilidade clássica e cria outras.

| | RPA tradicional | Computer Use (beta) |
|---|---|---|
| Como acha o alvo | Seletor, posição, árvore de UI | Screenshot e contagem de pixels |
| Mudança de layout | Quebra | Tende a se adaptar |
| Mesma entrada, mesma saída? | Sim | Não necessariamente |
| Custo por execução | Baixo e previsível | Uma chamada ao modelo por passo, com imagem |
| Velocidade | Rápida | Lenta: cada passo espera o modelo |
| Auditoria | Script legível | Log de ações e screenshots; a decisão é do modelo |
| Lida com o imprevisto | Não; cai numa exceção | Tenta; às vezes acerta |

A resposta curta à pergunta do título: **o objetivo é o mesmo do RPA, automatizar sistema sem API pela interface. O modelo de falha é o oposto.** O RPA falha barulhento e previsível: quebrou, parou. O agente falha em silêncio e de forma plausível: clicou no botão parecido, preencheu o campo vizinho, seguiu em frente.

Para processo financeiro, fiscal ou jurídico, essa diferença decide tudo. Um robô que para é um chamado aberto. Um agente que lança o valor no campo errado e continua é um problema que alguém descobre no fechamento.

## Segurança: o risco novo tem nome

A Anthropic é explícita sobre **prompt injection**: o modelo pode seguir instruções que encontra no conteúdo da página ou numa imagem, passando por cima do que você mandou. Um agente que lê e-mail ou navega em site de terceiro está, por definição, lendo texto que você não controla.

As recomendações da [implementação de referência](https://github.com/anthropics/anthropic-quickstarts/tree/main/computer-use-demo) valem como checklist mínimo:

1. Máquina virtual ou container dedicado, com privilégio mínimo.
2. Nada de dado sensível, como credenciais, ao alcance do agente.
3. Internet limitada a uma lista de domínios permitidos.
4. Confirmação humana para decisões com consequência: transação financeira, aceite de termos.

Traduzindo para uma empresa: o agente não roda no notebook de ninguém, não usa a sessão logada de ninguém e não tem permissão de concluir nada irreversível sozinho.

## Onde faz sentido hoje

Com 15% a 22% de acerto em benchmark, a pergunta certa não é "substitui o RPA?". É "em que tarefa um acerto parcial, supervisionado, já vale a pena?". Os candidatos que eu enxergo:

**Cauda longa de baixo volume.** Aquele processo que acontece dez vezes por mês num portal antigo, que nunca justificou um robô de RPA nem uma integração. Se o agente prepara e o humano confere e confirma, o ganho aparece sem risco de lançamento errado.

**Teste exploratório de interface.** Pedir ao agente que tente completar um fluxo do seu próprio sistema e registre onde travou. Aqui a imprevisibilidade é quase uma vantagem: ele não sabe o caminho "certo", então encontra caminhos que o roteiro de teste não previu.

**Tratamento de exceção do RPA existente.** O robô determinístico faz o caminho feliz. Quando cai numa exceção, em vez de abrir chamado direto, um agente tenta diagnosticar e propõe o próximo passo para um humano aprovar.

**Onde não faz sentido:** alto volume, qualquer processo com efeito financeiro sem revisão, e qualquer caso em que existe API. Se existe API, use a API. Clicar na tela é o último recurso de integração, não o primeiro.

[CONFIRMAR: se você testou a demo de referência, descreva aqui a tarefa, quantos passos levou e onde o agente errou]

## O que eu levaria para uma conversa de arquitetura

Três pontos, para quem vai ouvir "vamos trocar o RPA por IA" na próxima reunião:

1. **Custo por tarefa, não por token.** Some quantas chamadas com imagem uma tarefa típica exige, multiplique pelo preço e compare com o custo de manter o robô atual. Sem essa conta, a discussão é de fé.
2. **Taxa de erro silencioso.** Meça quantas execuções terminaram "com sucesso" e erradas. Esse é o número que importa para área de negócio, e não aparece no benchmark.
3. **Humano no loop como requisito, não como fase.** Enquanto o acerto for desse tamanho, a confirmação humana antes de efeito irreversível faz parte do desenho, e o ganho precisa ser calculado com ela.

Computer Use não é RPA com outro nome. É uma tentativa de resolver o problema que o RPA nunca resolveu, a fragilidade, pagando com o que o RPA tinha de melhor, a previsibilidade. Se essa troca vale a pena depende do processo. Para a maioria dos processos críticos, hoje, ainda não vale. Para a cauda longa que nunca foi automatizada, pode valer, com supervisão.

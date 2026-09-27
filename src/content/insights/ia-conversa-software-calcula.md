---
title: "IA conversa, software calcula: por que eu não deixo um LLM fazer conta que vale dinheiro"
excerpt: "O modelo de linguagem entende o pedido e explica o resultado. O motor determinístico faz a conta. E toda resposta diz de onde veio cada número. O método, em linguagem de empresário."
date: "2024-11-11"
duration: "8 min"
category: "Estratégia"
eixo: "negocios"
tags: ["llm", "calculo", "procedencia"]
image: "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?auto=format&fit=crop&w=1080&q=80"
---

Existe uma pergunta que eu faço antes de colocar IA em qualquer processo: **se esse número sair errado, quem paga?**

Se a resposta é "ninguém, a gente ajusta depois", pode deixar o modelo de linguagem trabalhar à vontade. Se a resposta é "o cliente, o juiz, o Fisco ou o meu caixa", a conversa muda. Nesse caso, o número não pode sair da IA. Ele precisa sair de um software que faz a mesma conta sempre do mesmo jeito e que consegue mostrar como chegou lá.

Esse é o método que uso em tudo o que construo com IA e resumo numa frase: **IA generativa conversa, software determinístico calcula.**

## O problema: o modelo prevê, não calcula

Um modelo de linguagem (o motor por trás do ChatGPT, do Claude e do Gemini) gera texto prevendo a próxima palavra mais provável. Isso funciona muito bem para entender um pedido mal escrito, resumir um documento e explicar um conceito. Para fazer conta, é o mecanismo errado.

Não é uma opinião isolada. Em outubro, pesquisadores da Apple publicaram o estudo [GSM-Symbolic](https://machinelearning.apple.com/research/gsm-symbolic) com problemas de matemática do nível escolar. Bastava trocar os números de um enunciado, mantendo a mesma lógica, para o desempenho dos modelos cair. E acrescentar ao enunciado uma frase irrelevante, que parecia importante, derrubava muito mais o acerto. A leitura dos autores é que os modelos reconhecem padrões mais do que raciocinam formalmente.

Os modelos novos "que pensam antes de responder", como o o1-preview lançado pela OpenAI em setembro, erram menos nesse tipo de tarefa. Mas errar menos não resolve o meu problema. Numa liquidação de sentença ou numa apuração de imposto, eu não preciso de uma conta que acerta quase sempre. Preciso de uma conta que **acerta sempre para a mesma entrada e que qualquer pessoa pode conferir.**

## Três propriedades que o dinheiro exige

Quando uma conta vale dinheiro, ela precisa de três coisas que um modelo de linguagem não entrega sozinho.

**1. Determinismo.** A mesma entrada gera a mesma saída, hoje, amanhã e daqui a dois anos, quando alguém contestar o cálculo. Pergunte a mesma coisa duas vezes a um chatbot e você pode receber duas respostas diferentes.

**2. Rastreabilidade.** Cada número precisa ter origem: qual índice, de qual fonte, em qual data, com qual regra. Um perito, um juiz ou um auditor não aceita "o sistema achou". Ele quer a memória de cálculo.

**3. Responsabilidade.** Alguém responde pela regra implementada. Num software, essa regra está escrita, testada e versionada. Dá para dizer: "na versão de março, a regra era esta; em junho, mudou por causa daquela decisão". Num prompt, a regra está espalhada em probabilidades que ninguém consegue auditar.

## O desenho: cada um faz o que sabe

Nada disso quer dizer que a IA não serve. Ela serve muito, desde que fique no lugar certo. O desenho que uso tem três camadas:

1. **A IA entende o pedido.** O usuário escreve do jeito dele: "preciso atualizar esse valor da condenação até hoje, com juros desde a citação". O modelo transforma isso em parâmetros estruturados: valor, data-base, índice, termo inicial dos juros. Se faltar alguma coisa, ele pergunta.
2. **O software calcula.** Os parâmetros vão para um motor determinístico, com as regras escritas em código, testadas e versionadas. O modelo não mexe nessa parte. Hoje, as principais plataformas de IA já permitem que o modelo chame funções externas em vez de inventar a resposta, e é exatamente esse recurso que torna o desenho viável.
3. **A IA explica o resultado.** O motor devolve os números e a memória de cálculo. O modelo traduz isso para uma explicação legível, sem alterar nenhum valor.

E há uma regra que atravessa as três camadas: **procedência em toda resposta.** Cada saída diz qual motor calculou, em qual versão, com quais parâmetros, em qual data e com quais premissas. Se alguém questionar, a trilha está ali.

## Um exemplo: cálculo judicial

O caso mais claro é o cálculo judicial: atualização monetária, juros, índices que mudam com decisões dos tribunais. É o tipo de conta em que um erro pequeno vira um valor grande e em que a outra parte vai conferir cada linha.

Nesse tipo de conta, a separação não é luxo. O motor aplica as regras e os índices, a IA ajuda a montar o pedido e a entender o resultado, e a memória de cálculo mostra de onde saiu cada número.

## O que isso significa para quem decide

Se você é empresário ou sócio de escritório e está avaliando uma ferramenta com IA para algo que envolve dinheiro (cálculo trabalhista, tributo, precificação, comissão, provisão), faça ao fornecedor quatro perguntas:

1. **Quem faz a conta: o modelo ou um motor separado?** Se a resposta for "o modelo", desconfie.
2. **Se eu rodar o mesmo caso duas vezes, o resultado é idêntico?** Peça para ver.
3. **O resultado vem com memória de cálculo e fontes?** Índice, data, regra aplicada.
4. **Quando a regra muda, como vocês atualizam e como eu sei qual versão foi usada?**

Um fornecedor sério responde isso em cinco minutos. Quem enrola nessas perguntas provavelmente colocou um chatbot na frente de uma planilha, ou pior, colocou só o chatbot.

## A IA não substitui o profissional. Ela muda o trabalho dele

Esse desenho também responde a um medo comum entre contadores e advogados. Se a conta está num motor auditável e a IA só conversa, **o profissional continua no centro**: é ele quem define as premissas, escolhe a tese, confere o resultado e assina. A IA tira o trabalho braçal de montar o pedido e redigir a explicação. O julgamento continua com ele.

É por isso que defendo que a IA seja parceira da contabilidade e da advocacia, e não concorrente. Um modelo de linguagem não tem registro profissional, não responde a processo ético e não assina laudo. Quem faz tudo isso é o profissional, e ele precisa de ferramentas em que possa confiar.

A frase que deixo para quem está começando é a mesma que uso comigo: **deixe a IA conversar e deixe o software calcular.** Se as duas coisas ficarem misturadas, você não vai saber qual das duas errou.

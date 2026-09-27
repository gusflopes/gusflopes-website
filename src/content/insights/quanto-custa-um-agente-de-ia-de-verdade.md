---
title: "Quanto custa um agente de IA de verdade: tokens, pessoas e manutenção"
excerpt: "A conta de tokens é a menor parte do custo de um agente de IA. Um modelo simples de custo total, com integração, revisão humana, manutenção e avaliação, para comparar com o processo que você já tem."
date: "2025-06-09"
duration: "8 min"
category: "Operações"
eixo: "negocios"
tags: ["agentes", "custo-total", "roi"]
image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1080&q=80"
---

Quando um fornecedor apresenta um agente de IA, a conversa sobre custo quase sempre gira em torno de uma coisa: o preço do modelo. "São poucos dólares por milhão de tokens." É verdade. E é por isso que muita empresa se surpreende seis meses depois, quando a conta real aparece.

O preço do modelo é a parte mais visível e, na maioria dos casos, a menor. Este texto propõe um modelo simples de custo total, que qualquer gestor consegue preencher numa planilha, para comparar o agente com o processo que você já tem.

## Tokens: a parte fácil de calcular

Um token é um pedaço de palavra. Os modelos cobram separadamente o que entra (a instrução, o documento, o histórico) e o que sai (a resposta). Para ter uma referência: no lançamento do Claude Sonnet 4, em maio, a Anthropic [anunciou o preço](https://www.anthropic.com/news/claude-4) de US$ 3 por milhão de tokens de entrada e US$ 15 por milhão de tokens de saída.

Vamos a um exemplo **hipotético**, só para mostrar a ordem de grandeza. Uma empresa quer um agente que leia os e-mails de clientes, classifique o assunto e rascunhe uma resposta:

- 3.000 e-mails por mês;
- cerca de 3.000 tokens de entrada por e-mail (instrução, o e-mail e um pouco de contexto do cliente);
- cerca de 500 tokens de saída (classificação e rascunho).

Entrada: 9 milhões de tokens, ou US$ 27. Saída: 1,5 milhão de tokens, ou US$ 22,50. Total: **em torno de US$ 50 por mês.**

Esse número costuma encerrar a discussão, e é aí que mora o erro. Ele está certo, mas é só a primeira linha da planilha.

## As outras quatro linhas

### 1. Integração

O agente precisa ler os e-mails de algum lugar, consultar o cadastro do cliente em algum sistema e gravar o rascunho em outro. Cada conexão dessas é trabalho de desenvolvimento: autenticação, tratamento de erro, o que fazer quando o sistema de origem está fora do ar.

Essa é a linha que mais varia. Se os seus sistemas têm API bem documentada, é pouco trabalho. Se a informação mora num ERP antigo ou numa planilha compartilhada, a integração pode custar mais do que todo o resto somado.

### 2. Revisão humana

Nenhum agente sério vai para produção sem alguém conferindo pelo menos parte do que ele faz. No começo, o ideal é revisar tudo. Com o tempo, dá para revisar por amostragem e manter a revisão obrigatória nos casos de maior risco.

Faça a conta em horas. Se o agente gera 3.000 rascunhos por mês e alguém gasta um minuto conferindo cada um, são 50 horas por mês. É bem menos do que escrever 3.000 respostas, mas não é zero, e precisa estar na planilha.

### 3. Manutenção do prompt e das regras

O agente não fica pronto. O processo muda, aparece um tipo novo de pedido, um produto sai de linha, a política de reembolso muda. Cada mudança exige ajustar as instruções e verificar se o comportamento continua certo.

Além disso, os próprios modelos mudam. Os fornecedores lançam versões novas e aposentam as antigas. Trocar de versão pode melhorar o resultado, mas também pode mudar o comportamento em casos que funcionavam. Alguém precisa ser responsável por isso.

### 4. Avaliação

Como saber se o agente está funcionando? Não é "parece bom". Vale montar um conjunto de casos reais, com a resposta esperada, e rodá-lo a cada mudança. Essa é a diferença entre "o agente está bom" e "o agente acerta 94% da classificação nos 200 casos de teste". Montar e manter esse conjunto é trabalho.

## O modelo de custo total

Juntando tudo, a planilha tem duas partes.

**Custo de implantação (uma vez):**

- desenvolvimento das integrações;
- desenho das instruções e das regras;
- montagem do conjunto de casos de teste;
- período em paralelo, com o agente rodando e o humano fazendo tudo, para comparar.

**Custo recorrente (por mês):**

- tokens (a conta do exemplo acima);
- horas de revisão humana;
- horas de manutenção de instruções e regras;
- infraestrutura e ferramentas (hospedagem, monitoramento);
- reavaliação periódica.

E, do outro lado, o **custo do processo atual**: horas gastas hoje na tarefa, erros e retrabalho, tempo de resposta ao cliente e o que se perde por demorar.

## Três armadilhas na comparação

1. **Comparar o custo recorrente do agente com o custo total do processo atual.** A implantação precisa ser amortizada. Se ela custa o equivalente a um ano de economia, o retorno só vem no segundo ano, se o processo não mudar antes.
2. **Esquecer que a revisão humana é feita pelas mesmas pessoas.** Se a equipe que revisa é a mesma que fazia o trabalho, o ganho real é a diferença entre fazer e revisar, e não o tempo inteiro da tarefa.
3. **Ignorar o custo do erro.** Um agente que erra 2% em rascunho de e-mail é aceitável. Um que erra 2% em cálculo de desconto pode ser caríssimo. Essa é, aliás, a razão pela qual eu defendo que a IA converse e que a conta fique com um software determinístico: o erro de cálculo sai da equação.

## Quando a conta fecha

Pela lógica do modelo, o agente tende a compensar quando três condições aparecem juntas:

- **volume alto e repetitivo**, para diluir a implantação;
- **erro barato ou fácil de pegar na revisão**;
- **dados acessíveis**, com sistemas que já têm API ou exportação simples.

Quando falta uma delas, a conta fica apertada. Quando faltam duas, provavelmente é melhor melhorar o processo sem IA primeiro.

[CONFIRMAR: se houver um caso real (do Gustavo ou de cliente, anonimizado) com números de implantação, revisão e economia, incluir aqui como ilustração. Caso contrário, manter só o exemplo hipotético.]

A recomendação, então, é condicional: vale investir num agente **se** a planilha completa, com as cinco linhas, mostrar retorno num prazo que a empresa aceita. O preço do token entra nessa conta, mas quase nunca é o que decide.

---
title: "Qualificação de lead com LLM: enriquecimento, rubric e o humano no fim do funil"
excerpt: "Um desenho de qualificação de leads com IA que dá para explicar e auditar: dados públicos, rubric escrito, saída estruturada com a fonte de cada campo e a decisão final com uma pessoa. Com os riscos de viés e de alucinação."
date: "2025-09-22"
duration: "9 min"
category: "Vendas & GTM"
eixo: "negocios"
tags: ["lead-scoring", "llm", "lgpd"]
image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1080&q=80"
---

Em fevereiro escrevi sobre [o que vem antes da IA na qualificação de leads](/insights/article/qualificacao-de-lead-antes-da-ia-icp-bant-crm): um perfil de cliente ideal escrito, critérios explícitos e a análise do que o CRM já sabe. Este texto é a continuação. Com essa base pronta, como colocar um modelo de linguagem no processo sem perder o controle?

O desenho que proponho tem quatro etapas e uma regra que atravessa todas: **cada nota precisa ter explicação, e cada dado precisa ter fonte.**

## Etapa 1: captura

O lead chega por algum lugar: formulário do site, evento, indicação ou uma lista de empresas-alvo que o time montou. Nessa etapa, o importante é registrar **a origem** e **o que a pessoa informou**, exatamente como informou. Não misture o que o lead disse com o que você vai descobrir depois. Essa separação é o que permite auditar o processo mais tarde.

## Etapa 2: enriquecimento

É aqui que a IA começa a ajudar, mas não é a primeira fonte. A ordem que recomendo é esta:

1. **Dados estruturados e oficiais primeiro.** No Brasil, os [dados abertos do CNPJ](https://www.gov.br/receitafederal/pt-br/acesso-a-informacao/dados-abertos) da Receita Federal trazem atividade principal (CNAE), porte, data de abertura, município e opção pelo Simples. É informação verificável, sem interpretação.
2. **Fontes públicas da própria empresa depois.** Site, página de vagas, perfil institucional. Aqui um modelo de linguagem é útil: ele lê a página e resume o que a empresa faz, para quem vende e que sinais relevantes aparecem.
3. **Nada de dedução sem fonte.** Se o modelo não encontrou o faturamento, o campo fica vazio. "Deve faturar uns R$ 10 milhões porque tem um site bonito" não é dado.

O ponto técnico que faz diferença é pedir ao modelo uma **saída estruturada**, e não um texto livre. Desde agosto do ano passado, a OpenAI oferece na API um modo em que a resposta [segue um formato definido](https://openai.com/index/introducing-structured-outputs-in-the-api/) (um JSON com campos fixos), e outros fornecedores oferecem recursos parecidos. Para cada campo, peça três coisas: o valor, a fonte (a URL ou o dado oficial de onde veio) e um indicador de "não encontrado". Um campo sem fonte vale como não encontrado.

## Etapa 3: qualificação com rubric

Rubric é uma grade de avaliação: uma lista de critérios, cada um com uma descrição clara do que vale cada nota. É o que professores usam para corrigir redação, e funciona igualmente bem para qualificar leads.

Um exemplo simplificado para uma empresa que vende software de gestão para indústrias pequenas:

| Critério | 0 | 1 | 2 |
|---|---|---|---|
| Atividade (CNAE) | Fora do ICP | Adjacente | Indústria de transformação no foco |
| Porte | MEI | ME | EPP ou média |
| Sinal de necessidade | Nenhum | Vaga administrativa aberta | Vaga para controller ou menção a troca de sistema |
| Região | Fora da área atendida | Atendimento remoto | Área com atendimento presencial |

A divisão de trabalho é esta: **o modelo de linguagem extrai e classifica; a soma e o corte são feitos por código.** O LLM lê a página de vagas e responde "existe vaga para controller: sim, fonte: URL". Uma regra escrita em software soma os pontos e decide se o lead passa do corte. É a mesma separação que defendo em tudo o que envolve decisão: a IA lida com a linguagem, e a regra fica explícita, testável e igual para todos.

Por que não pedir ao modelo, direto, "dê uma nota de 0 a 10 para este lead"? Porque essa nota não é comparável. O mesmo lead pode receber 7 hoje e 6 amanhã, e ninguém consegue explicar a diferença. Com o rubric, a nota é a soma de critérios que qualquer vendedor entende e pode contestar.

## Etapa 4: o humano no fim do funil

A saída do processo não é uma decisão, é uma **recomendação com justificativa**. Algo como: "Lead A: 7 pontos. Indústria de transformação (CNAE, Receita), EPP (Receita), vaga para controller aberta (URL). Sugestão: contato em até 48 horas."

Um vendedor lê isso em trinta segundos e decide. Se discordar, registra o motivo. Esse registro é ouro: é com ele que você ajusta o rubric ao longo do tempo.

No começo, faça o processo rodar **em paralelo** com a qualificação manual por algumas semanas. Compare as notas do sistema com a avaliação do seu melhor vendedor. Onde eles discordam, um dos dois está errado, e vale descobrir qual.

## Os riscos que você precisa gerenciar

**Alucinação no enriquecimento.** O modelo pode inventar um cargo, um porte ou uma informação que não está na página. A fonte obrigatória por campo e a revisão humana existem para isso. Faça auditorias por amostragem: pegue dez leads por semana e confira cada campo na fonte.

**Viés do histórico.** Se o rubric for construído só a partir dos clientes que você já tem, ele vai continuar trazendo mais do mesmo. Pode ser exatamente o que você quer, ou pode estar descartando um segmento novo que daria certo. Reserve uma parte dos contatos para leads fora do padrão e meça o resultado.

**Custo que cresce sem ninguém ver.** Ler páginas e consultar várias fontes para cada lead consome tokens e chamadas de API. Meça o custo por lead qualificado, e não só o custo total.

**LGPD.** Nome, cargo e e-mail do contato são dados pessoais, mesmo quando se trata de uma empresa. O enriquecimento precisa de base legal. Para prospecção B2B, a mais usada é o legítimo interesse, e a ANPD publicou em 2024 um [guia sobre o tema](https://www.gov.br/anpd/pt-br/assuntos/noticias/anpd-lanca-guia-orientativo-sobre-legitimo-interesse), com um teste de balanceamento que vale documentar antes de colocar o processo no ar. Colete só o que o rubric usa. Se um campo não entra na nota, ele não precisa ser coletado.

## Por onde começar

1. Pegue o ICP e o framework de qualificação que você já escreveu e transforme em um rubric com notas descritas.
2. Monte o enriquecimento começando pelos dados de CNPJ, que são baratos e confiáveis.
3. Adicione a leitura do site com IA, sempre com saída estruturada e fonte por campo.
4. Rode em paralelo com a qualificação manual por algumas semanas.
5. Só então deixe o sistema priorizar a fila, com o vendedor decidindo no fim.

[CONFIRMAR: se o Gustavo tiver um protótipo desse desenho rodando (próprio ou de cliente), inserir aqui números reais de tempo por lead, custo e concordância com o vendedor.]

A IA não substitui o julgamento do vendedor. Ela prepara a decisão: junta os dados, aplica o critério e mostra de onde veio cada informação. Quem decide continua sendo uma pessoa, e agora com mais informação.

---
title: "Lead scoring com IA e LGPD: legítimo interesse sem teatro"
excerpt: "Enriquecer e pontuar leads com IA mexe com dados pessoais, mesmo no B2B. O teste de balanceamento do guia da ANPD aplicado ao dia a dia comercial: o que registrar, o que evitar e como responder quando o titular perguntar."
date: "2026-06-22"
duration: "9 min"
category: "Vendas & GTM"
eixo: "negocios"
tags: ["lgpd", "lead-scoring", "legitimo-interesse"]
image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1080&q=80"
---

Existem dois jeitos ruins de lidar com LGPD num processo comercial com IA. O primeiro é ignorar: "é B2B, são dados de empresa, a lei não se aplica". O segundo é o teatro: um documento de vinte páginas que ninguém leu, escrito uma vez para "estar em conformidade" e esquecido numa pasta.

Os dois falham quando alguém pergunta de verdade. Pode ser um titular que recebeu um contato e quer saber de onde a empresa tirou os dados dele. Pode ser um cliente grande que pede, na due diligence, a documentação do tratamento. Pode ser, um dia, a ANPD.

Este texto é para quem já usa ou pretende usar IA para enriquecer e pontuar leads e quer fazer isso direito, sem burocracia inútil. Escrevo como advogado e engenheiro, mas o texto é informativo: não substitui a análise do seu caso por quem cuida de privacidade na sua empresa.

## Primeiro: sim, a lei se aplica

O argumento "é B2B" tem uma parte certa e uma errada. Dados de pessoa jurídica (CNPJ, razão social, CNAE, porte) não são dados pessoais. Mas quase todo processo comercial trata também dados de pessoas: nome e cargo do contato, e-mail corporativo com nome e sobrenome, telefone, perfil profissional. Esses são dados pessoais, e a [LGPD](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm) se aplica a eles.

Um detalhe que costuma passar despercebido: os dados abertos do CNPJ trazem o quadro de sócios, com nomes de pessoas físicas. O dado ser público não significa que qualquer uso esteja liberado. A finalidade e a base legal continuam valendo.

## A base legal: legítimo interesse

Para prospecção e qualificação B2B, a base legal mais usada é o **legítimo interesse** (art. 7º, IX, e art. 10 da LGPD). O artigo 10 cita expressamente o "apoio e promoção de atividades do controlador", e impõe três condições que interessam diretamente a quem monta um processo com IA:

- **só os dados estritamente necessários** para a finalidade podem ser tratados (§ 1º);
- o controlador precisa **garantir transparência** (§ 2º);
- a ANPD pode pedir um **relatório de impacto** (§ 3º).

Além disso, o artigo 37 pede que se mantenha registro das operações de tratamento, "especialmente quando baseado no legítimo interesse".

Legítimo interesse não é um cheque em branco. É uma base que exige que você demonstre o equilíbrio entre o seu interesse e os direitos da pessoa.

## O teste de balanceamento, na prática

Em fevereiro de 2024, a ANPD publicou o [guia orientativo sobre legítimo interesse](https://www.gov.br/anpd/pt-br/assuntos/noticias/anpd-lanca-guia-orientativo-sobre-legitimo-interesse), com um teste em três fases. Veja como ele se aplica a um processo de lead scoring com IA.

### Fase 1: finalidade

*O interesse é legítimo, concreto e declarado?*

Escreva a finalidade numa frase específica. "Marketing" não serve. "Priorizar os contatos recebidos pelo formulário do site, para que o time comercial responda primeiro às empresas com maior aderência à nossa oferta" serve.

Se você usa o mesmo dado para mais de uma finalidade (qualificar o lead e treinar um modelo, por exemplo), cada finalidade precisa do próprio teste.

### Fase 2: necessidade

*Cada dado coletado é necessário para essa finalidade?*

Aqui a IA cria uma tentação: como enriquecer ficou barato, dá vontade de coletar tudo o que for possível. O teste pede o contrário. Pegue o rubric de pontuação e confira campo a campo:

- **o campo entra na nota?** Se não entra, não colete;
- **dá para usar um dado da empresa em vez de um dado da pessoa?** Porte e setor vêm do CNPJ. O perfil pessoal do contato raramente é necessário;
- **por quanto tempo o dado precisa ficar guardado?** Lead que não avançou em doze meses precisa continuar no banco com todos os campos enriquecidos?

### Fase 3: balanceamento e salvaguardas

*A pessoa esperaria esse tratamento? Quais medidas reduzem o impacto sobre ela?*

Quem preenche um formulário pedindo contato espera ser contatado, e espera que a empresa olhe para os dados da empresa dela. Alguém que nunca falou com você e descobre que foi enriquecido e pontuado por um agente de IA tende a ter uma expectativa bem diferente. Quanto menor a expectativa, mais salvaguardas o tratamento exige.

Salvaguardas que fazem sentido num processo com IA:

- **fonte registrada por campo**, para responder "de onde veio esse dado?";
- **nada de dados sensíveis** (saúde, religião, opinião política, entre outros). O legítimo interesse não se aplica a eles, e um agente que lê perfis públicos pode esbarrar nesse tipo de informação sem que ninguém peça;
- **instrução explícita para o modelo ignorar informações pessoais que não estão no rubric**;
- **canal simples para a pessoa pedir para sair**, respeitado de fato;
- **revisão humana** antes de qualquer decisão que afete a pessoa.

## Decisão automatizada: o artigo 20

Um ponto que o lead scoring com IA toca diretamente: o artigo 20 da LGPD dá ao titular o direito de pedir revisão de decisões tomadas unicamente com base em tratamento automatizado que afetem seus interesses, e o controlador precisa informar os critérios usados, quando solicitado, respeitados os segredos comercial e industrial.

Na maioria dos casos de prospecção B2B, a nota do lead afeta pouco a pessoa. Mas o desenho com rubric explícito e humano no fim do funil resolve o problema de qualquer forma: a decisão não é unicamente automatizada, e os critérios estão escritos e são explicáveis. Um score gerado por um modelo que ninguém consegue explicar ("a IA deu 7") é o pior cenário tanto para a LGPD quanto para o time comercial.

## O que registrar (sem teatro)

A documentação útil cabe em duas páginas e deve ser atualizada sempre que o processo mudar:

1. **Finalidade** em uma frase.
2. **Lista de campos**, com fonte e justificativa de cada um.
3. **Ferramentas e fornecedores** que recebem os dados, incluindo o provedor do modelo de IA, e onde os dados ficam.
4. **Prazo de retenção** e o que acontece depois dele.
5. **Salvaguardas** adotadas.
6. **Como o titular é informado** (política de privacidade, aviso no primeiro contato).
7. **Data da última revisão** e responsável.

Guarde isso junto com o processo, no mesmo lugar em que está o rubric. Se o rubric muda, a documentação muda junto.

## Quando o titular perguntar

Mais cedo ou mais tarde, alguém vai escrever: "de onde vocês tiraram meus dados?". Tenha a resposta pronta:

- **de onde veio cada dado** (e é aqui que a fonte por campo paga o investimento);
- **para que ele é usado**;
- **como a pessoa pede a exclusão** ou deixa de receber contatos.

Responder bem a essa pergunta, rápido e sem rodeios, é a diferença entre uma empresa que respeita a privacidade e uma que apenas tem um documento dizendo isso.

[CONFIRMAR: se o Gustavo já respondeu a um pedido de titular num processo desse tipo, ou tem um modelo de registro que usa, vale incluir um exemplo real, anonimizado.]

## Resumo

Lead scoring com IA é compatível com a LGPD **se** a finalidade estiver clara, **se** os dados forem só os necessários, **se** as salvaguardas existirem de verdade e **se** alguém conseguir explicar cada nota. As mesmas práticas que tornam o processo defensável perante a lei são as que o tornam confiável para o time comercial. A melhor conformidade é a que você consegue demonstrar em cinco minutos.

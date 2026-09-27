---
title: "DeepSeek R1: o que um modelo aberto e barato muda na conta do seu projeto"
excerpt: "O R1 chegou com licença MIT, desempenho comparável ao o1 nos benchmarks publicados e preço de API perto de 27 vezes menor. O que isso muda na decisão de arquitetura, e o que não muda: dados, LGPD e onde o modelo roda."
date: "2025-01-27"
duration: "9 min"
category: "IA"
eixo: "engenharia"
tags: ["deepseek", "modelos-abertos", "custo", "lgpd"]
image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1080&q=80"
---

Na segunda-feira, 20 de janeiro, a DeepSeek publicou o R1. Uma semana depois, é difícil achar conversa sobre IA que não passe por ele. Boa parte do barulho é geopolítica e mercado. Aqui interessa outra coisa: o que muda para quem precisa decidir qual modelo entra num projeto, quanto ele custa e onde ele roda.

## O que foi publicado

Pelo [anúncio oficial](https://api-docs.deepseek.com/news/news250120) e pelo [repositório no GitHub](https://github.com/deepseek-ai/DeepSeek-R1):

- **Licença MIT** para o modelo. O anúncio diz, com todas as letras, que dá para destilar e comercializar livremente, e que as saídas da API podem ser usadas para fine-tuning e destilação.
- **Arquitetura**: mistura de especialistas (MoE) com 671 bilhões de parâmetros no total, dos quais 37 bilhões ativos por token, e contexto de 128 mil tokens. É construído sobre o DeepSeek-V3, lançado no fim de dezembro.
- **Seis modelos destilados**, de 1,5 bilhão a 70 bilhões de parâmetros, baseados em Qwen e Llama. Atenção: esses herdam a licença do modelo-base, não a MIT pura.
- **Preço da API** (`deepseek-reasoner`): US$ 0,14 por milhão de tokens de entrada com cache, US$ 0,55 sem cache, e US$ 2,19 por milhão de saída.

E os benchmarks que a própria DeepSeek publicou, lado a lado com o o1 da OpenAI (versão de 17/12):

| Benchmark | DeepSeek-R1 | OpenAI o1-1217 |
|---|---|---|
| AIME 2024 (pass@1) | 79,8 | 79,2 |
| MATH-500 (pass@1) | 97,3 | 96,4 |
| Codeforces (rating) | 2029 | 2061 |
| SWE-bench Verified (resolvidos) | 49,2 | 48,9 |
| LiveCodeBench (pass@1-CoT) | 65,9 | 63,4 |

São números do fabricante. Até alguém reproduzir de forma independente, trato como "comparável", não como "melhor". Mas "comparável ao o1" já é notícia suficiente.

## A conta que chamou atenção

O o1 custa, na API, [US$ 15 por milhão de tokens de entrada e US$ 60 por milhão de saída](https://www.digitaltrends.com/computing/select-developers-can-access-full-o1-model-through-openai-api/). Comparando com os preços de lista da DeepSeek sem cache, a entrada sai cerca de 27 vezes mais barata (15 ÷ 0,55) e a saída também (60 ÷ 2,19). Em modelo de raciocínio, a saída é o que pesa, porque é ali que entram os tokens de "pensamento".

A outra conta que circula é a do treino. O [relatório técnico do DeepSeek-V3](https://arxiv.org/abs/2412.19437) fala em 2,788 milhões de horas de GPU H800 para o treino completo do modelo-base. O valor em dólares que aparece nas manchetes sai daí, a partir de um preço de aluguel por hora de GPU, e **não inclui** pesquisa anterior, experimentos que não deram certo, equipe nem a infraestrutura própria. É o custo de uma rodada de treino, não o custo de ter feito o modelo. A diferença importa para quem vai usar esse número numa apresentação.

## O que isso muda na decisão de arquitetura

Para quem constrói produto, o R1 muda três coisas.

**1. Raciocínio deixou de ser recurso premium.** Até dezembro, "modelo que pensa" significava o1, com preço e limite de acesso de produto premium. Agora existe uma alternativa com pesos abertos e preço de modelo barato. Tarefas que não fechavam a conta com o1, como classificação com justificativa em volume, revisão automática em lote ou planejamento em pipelines de dados, precisam ser reavaliadas.

**2. "Rodar localmente" virou opção séria para raciocínio.** Os destilados menores cabem em hardware que uma empresa média tem ou consegue alugar. O modelo completo, com 671 bilhões de parâmetros, não é para servidor de escritório, mas qualquer provedor pode hospedá-lo, porque a licença permite. A escolha deixou de ser binária (OpenAI ou nada) e passou a ter três caminhos.

**3. Ficou mais fácil ter um plano B.** Um projeto que depende de um único fornecedor de modelo tem um risco de continuidade que ninguém coloca na planilha. Um modelo de pesos abertos com licença permissiva é, no mínimo, um seguro: se o fornecedor principal mudar preço, política ou disponibilidade, existe para onde ir.

## Os três caminhos, e o que cada um significa para os seus dados

É aqui que a conversa técnica encontra a jurídica, e onde vejo mais gente pulando etapa.

**Caminho A: API da própria DeepSeek.** É o mais barato e o mais simples. A [política de privacidade](https://cdn.deepseek.com/policies/en-US/deepseek-privacy-policy.html) da empresa diz que os dados pessoais são coletados, processados e armazenados na República Popular da China. Para um projeto brasileiro que trata dado pessoal, isso é transferência internacional de dados, com as exigências do art. 33 da LGPD. Para dado de cliente, dado financeiro, dado de saúde ou segredo de negócio, a pergunta não é técnica. É de governança, e precisa ser respondida antes do primeiro teste com dado real.

**Caminho B: os mesmos pesos num provedor de sua escolha.** A licença MIT permite que qualquer provedor sirva o modelo. Você escolhe a jurisdição, o contrato e as garantias de retenção de dados que já conhece. O modelo é o mesmo; a relação jurídica é outra. O preço tende a ser maior que o da API da DeepSeek e menor que o do o1, mas isso precisa ser verificado caso a caso.

**Caminho C: infraestrutura própria.** Um destilado rodando em servidor seu, ou o modelo completo em infraestrutura dedicada. O dado não sai de casa. O custo passa a ser de hardware, operação e gente, e o desempenho dos destilados menores não é o do R1 completo. É o caminho para dado que realmente não pode sair.

A decisão entre os três não é "qual é o melhor". É **qual dado passa por ali**. Um mesmo projeto pode usar o caminho A para dados públicos, como documentação e texto de norma, e o C para o que é sensível.

[CONFIRMAR: se você testou o R1 (API ou destilado local) nesta semana, descreva aqui o teste, o hardware e o que observou]

## O que não muda

Algumas coisas continuam exatamente iguais, e vale repetir porque o preço baixo cria tentação.

**Modelo de raciocínio continua errando.** Pensar mais não elimina alucinação. Um modelo 27 vezes mais barato que erra na mesma proporção continua exigindo a mesma verificação.

**Conta que vale dinheiro continua sendo de código determinístico.** O benchmark de matemática impressiona, mas 97% no MATH-500 quer dizer que há erro. Em cálculo financeiro, fiscal ou jurídico, o modelo interpreta o pedido e o software calcula. Isso não depende de qual modelo está na moda.

**Avaliação continua sendo sua.** Benchmark público mede o benchmark. O que importa é o desempenho nos seus casos. Antes de trocar de modelo, rode os mesmos casos que você já usa para avaliar o atual e compare.

## Como eu abordaria esta semana

Se eu tivesse um projeto em andamento com o1 ou outro modelo de raciocínio, faria três coisas, nesta ordem:

1. **Separar os fluxos por sensibilidade do dado.** Quais chamadas levam dado pessoal ou confidencial e quais não levam. Sem isso, qualquer troca de modelo é aposta.
2. **Rodar o conjunto de avaliação atual contra o R1**, pelo caminho compatível com cada fluxo: API para os casos com dado público, destilado local ou provedor escolhido para os outros.
3. **Refazer a conta de custo** com o resultado real, incluindo o retrabalho quando o modelo erra, e não só o preço por token.

O R1 não muda o que é boa engenharia com LLM. Muda o preço de entrada do raciocínio e coloca pesos abertos na mesa. A recomendação é condicional: se o custo era o que travava um caso de uso, vale reavaliar agora, escolhendo o caminho pelo dado e não pelo preço. Se o que travava era qualidade ou confiança, um modelo mais barato não resolve isso sozinho.

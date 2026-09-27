---
title: "MCP como integração B2B: sua API agora precisa conversar com a IA do cliente"
excerpt: "O MCP virou um padrão neutro, sob a Linux Foundation, suportado pelas principais plataformas de IA. Se o seu cliente trabalha dentro do ChatGPT ou do Claude, o seu produto precisa estar lá como ferramenta. O que isso muda para quem vende software e serviços B2B."
date: "2026-01-19"
duration: "8 min"
category: "Estratégia"
eixo: "negocios"
tags: ["mcp", "integracao", "saas"]
image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1080&q=80"
---

Durante vinte anos, a pergunta que um cliente B2B fazia ao avaliar um software era: "vocês têm integração com o meu ERP?". Em 2026, começa a aparecer outra: **"dá para usar isso de dentro do ChatGPT?"**

Parece um detalhe, mas indica uma mudança na forma de trabalhar. Cada vez mais gente passa o dia dentro de um assistente de IA: redigindo, pesquisando, analisando. Quando precisa de um dado ou de uma ação de outro sistema, a pessoa não quer abrir mais uma aba, fazer login e procurar o menu. Quer pedir na conversa. O produto que não estiver acessível ali fica, na prática, mais longe do cliente.

A tecnologia que torna isso possível tem nome: **MCP**, o Model Context Protocol. E em dezembro ela deu um passo que interessa a quem decide investimento em produto.

## O que é o MCP, sem jargão

O MCP é um padrão aberto que define como um assistente de IA se conecta a sistemas externos. Pense numa tomada: qualquer aparelho que siga o padrão funciona em qualquer tomada compatível. Com o MCP, uma empresa descreve uma vez as funções do seu sistema ("consultar pedido", "emitir segunda via", "calcular frete") e qualquer assistente compatível consegue usá-las.

A Anthropic lançou o protocolo em [novembro de 2024](https://www.anthropic.com/news/model-context-protocol). Em pouco mais de um ano, ele deixou de ser "o padrão de uma empresa" e passou a ser adotado pelas maiores plataformas:

- **Março de 2025:** a OpenAI [anunciou que adotaria o MCP](https://techcrunch.com/2025/03/26/openai-adopts-rival-anthropics-standard-for-connecting-ai-models-to-data/) nos seus produtos.
- **Abril de 2025:** o Google anunciou suporte no Gemini.
- **Maio de 2025:** a Microsoft levou o MCP ao Windows, ao GitHub e ao Copilot Studio, e a Anthropic passou a permitir conectar servidores MCP remotos ao Claude.
- **Outubro de 2025:** a OpenAI lançou o [Apps SDK](https://openai.com/index/introducing-apps-in-chatgpt/), a forma de colocar aplicativos dentro do ChatGPT, construído sobre o MCP.
- **Dezembro de 2025:** a Anthropic [doou o MCP à Agentic AI Foundation](https://blog.modelcontextprotocol.io/posts/2025-12-09-mcp-joins-agentic-ai-foundation/), uma fundação nova dentro da Linux Foundation.

Esse último ponto é o que muda a conversa para quem decide.

## Por que a doação importa para o seu negócio

Enquanto o MCP pertencia a uma empresa, investir nele tinha um risco óbvio: e se o dono mudasse as regras, ou se um concorrente lançasse um padrão rival? Muito gestor de produto sensato esperou para ver.

Com o protocolo sob uma fundação neutra, ao lado de outros projetos de código aberto, o risco de aposta diminui bastante. É o mesmo movimento que tornou tecnologias como o Linux e o Kubernetes escolhas seguras para empresas: ninguém é dono sozinho, e os concorrentes colaboram no mesmo padrão.

Isso não garante que o MCP vai durar para sempre. Garante que, hoje, é o padrão com maior adoção e governança neutra. Para uma decisão de produto em 2026, é o suficiente.

## O que muda para quem vende B2B

**1. A sua API ganha um novo tipo de cliente.** Até agora, quem consumia a sua API era um desenvolvedor, que lia a documentação e escrevia código. Com o MCP, quem consome é um modelo de IA, agindo em nome do usuário. Ele precisa de descrições claras do que cada função faz, de parâmetros bem nomeados e de respostas que expliquem o resultado.

**2. A experiência do usuário passa a acontecer fora do seu produto.** O cliente pode resolver o que precisa sem nunca abrir a sua tela. Isso assusta quem mede sucesso por acessos ao sistema, mas é uma oportunidade para quem mede por valor entregue. Se o seu produto está no fluxo de trabalho do cliente, ele é usado com mais frequência.

**3. Segurança e permissão viram parte da proposta.** Quando uma IA age em nome do usuário, a pergunta "o que essa IA pode fazer no meu sistema?" precisa de uma resposta clara. Consultar é uma coisa, emitir uma nota ou transferir dinheiro é outra. Defina quais funções exigem confirmação humana antes de executar.

**4. A procedência vira diferencial.** Um assistente vai misturar a resposta do seu sistema com outras informações. Se a sua resposta traz de onde veio o dado, quando foi calculado e com qual regra, o usuário consegue separar o que é fato do seu sistema do que é interpretação da IA. Para quem vende cálculo, dados financeiros ou informação regulatória, isso é decisivo. É a mesma ideia que defendo há tempos: **a IA conversa, o seu software calcula**, e a resposta diz de onde veio cada número.

## Não é para todo mundo, ainda

Recomendo cautela antes de sair construindo. Faz sentido priorizar um servidor MCP se:

- **os seus clientes já usam assistentes de IA no trabalho** (pergunte a eles, não suponha);
- **o seu produto tem ações ou consultas frequentes e bem definidas**, que alguém faria de dentro de uma conversa;
- **você já tem uma API razoável.** O MCP é uma camada sobre a API, e não substitui uma API bem feita.

Se nenhuma dessas condições vale hoje, o investimento pode esperar. Se duas ou três valem, vale começar com um piloto pequeno: duas ou três funções de consulta, somente leitura, para um grupo de clientes que já usa IA.

## Três perguntas para levar à reunião de produto

1. **Quais são as cinco coisas que os nossos clientes mais fazem no nosso sistema?** Dessas, quais fariam sentido pedir numa conversa?
2. **O que a IA do cliente pode fazer sozinha e o que exige confirmação?** Escreva isso antes de escrever código.
3. **Como o cliente sabe que a resposta veio do nosso sistema e não foi inventada pela IA?** Se a resposta for "não sabe", comece por aí.

[CONFIRMAR: se o Gustavo já tinha, em jan/2026, algum servidor MCP próprio ou de cliente em teste (sem citar o rt2026, que é posterior), um parágrafo de relato cabe aqui.]

A integração B2B sempre foi sobre estar onde o cliente trabalha. Por muito tempo, isso significava o ERP e o e-mail. Para uma parte crescente dos clientes, passa a significar também o assistente de IA. Vale começar a planejar agora, antes que o cliente precise perguntar.

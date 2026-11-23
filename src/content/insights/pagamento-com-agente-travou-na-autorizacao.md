---
title: "Pagamento com agente travou na autorização, não no modelo"
excerpt: "Citi, PNC e Wells Fargo reescreveram o contrato para dizer que o cliente responde pelo agente de IA de terceiro. Lidos de perto, os textos mostram o que falta: uma credencial do agente com escopo, limite, prazo e revogação."
date: "2026-11-25"
duration: "7 min"
category: "Agentes"
eixo: "engenharia"
tags: [agentes, pagamentos, open-finance, autorizacao, bancos]
publicos: [A, B]
image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1080&q=80"
---

Em novembro, três bancos americanos reescreveram o contrato do internet banking para tratar de agentes de IA. O Citi acrescentou uma seção nova ao Online User Agreement. O PNC publicou uma versão do contrato de serviços digitais que vale a partir de 19 de dezembro. O Wells Fargo atualizou o contrato de acesso online, com vigência em 24 de novembro. Segundo o TechCrunch, JPMorgan e Bank of America anunciaram políticas parecidas em outubro, e o Citizens avisou os clientes por e-mail.

A manchete que circulou foi "o cliente está por conta própria, mesmo se o agente for invadido". Ela é verdadeira, mas é a parte menos interessante. Lidos de perto, os contratos explicam por que pagamento com agente ainda não saiu do lugar. E o motivo não é o modelo.

## O que os contratos dizem

O Citi é o mais direto. Se o cliente entregar a credencial a um agente de IA de terceiro, o banco vai considerar todo acesso e toda ação do agente como autorizados pelo cliente. Se essa credencial vazar do agente para outras pessoas ou outros agentes, vale a mesma regra.

O Wells Fargo vai na mesma linha: pedidos que chegam por uma ferramenta de IA de terceiro podem ser tratados como se tivessem vindo do próprio cliente, e o banco se reserva o direito de bloquear essas ferramentas.

O PNC é o mais interessante dos três. Ele proíbe dar senha ou código de uso único ao agente, proíbe automação de navegador e screen scraping e, salvo permissão expressa, proíbe que o agente inicie pagamento. Mas também descreve o caminho permitido: conectar o agente "by authenticating directly with PNC and specifying the Eligible Account(s), information, duration, and permissions included in your authorization". Em português: o cliente se autentica no próprio banco e escolhe quais contas, quais dados, por quanto tempo e com quais permissões.

Guarde essa frase. Ela é a especificação do que falta.

## Por que travou

O acesso que os bancos estão vetando funciona assim: o cliente entrega login e senha, e o agente entra na conta vestindo a identidade dele.

Do lado do banco, esse acesso é idêntico ao de alguém que roubou a mesma senha. Mesmo usuário, mesma credencial, mesmo canal. Não existe um sinal que diga "este é o agente que o cliente autorizou, para estas contas, até este valor, até esta data".

Sem esse sinal, o banco não consegue aceitar o risco de forma seletiva. Ele não distingue o agente legítimo do invasor, então faz a única coisa que o contrato permite: põe a perda na conta de quem escolheu compartilhar a senha.

A regra americana de transferências eletrônicas já tem essa lógica. O comentário oficial da Regulation E diz que, quando o consumidor entrega o meio de acesso a alguém e essa pessoa passa do limite combinado, o consumidor responde integralmente pelas transferências, até avisar o banco. Os contratos do Citi e do Wells Fargo leem o agente de IA como esse "alguém".

Por isso, a mudança nos termos não é resistência à IA. É o preço de um modelo de permissão que ainda não existe na conta bancária.

## A parte que incomoda

Essa leitura é generosa com os bancos, e o texto do Citi tem um detalhe que a complica. A seção nova diz que as regras não se aplicam a nenhum agente, ferramenta ou função de IA oferecida pelo próprio Citi. Seu agente, seu risco. Agente do banco, fora da regra.

Se a linha de responsabilidade fosse só sobre risco técnico, ela não dependeria de quem é o dono do agente. O agente do Citi também age dentro da conta do cliente. A diferença é que ele é do Citi.

Não dá para fechar essa conta com uma moral limpa, porque os bancos não traçaram a linha no mesmo lugar. O Wells Fargo faz o contrário do Citi: o cliente responde pelo que for feito com o acesso dele, inclusive pelas ferramentas de IA do próprio Wells Fargo. E o PNC traça a linha pelo canal, não pelo dono: conexão aprovada pelo banco, sim; senha e scraping, não.

As duas leituras convivem. O problema de autenticação é real, e pelo menos um grande banco escolheu uma solução que favorece o agente da casa. Quem constrói agente para finanças precisa contar com as duas.

Fica também uma pergunta jurídica, e ela é só isso, uma pergunta. A lei americana de transferências eletrônicas proíbe que um contrato tire do consumidor os direitos que ela garante, e a Regulation E trata como não autorizada a transferência feita por quem obteve o meio de acesso por fraude ou roubo. Se um invasor rouba a senha que estava guardada no agente, vale o contrato ou vale a lei? Não encontrei manifestação de regulador americano sobre isso, nem decisão de tribunal.

## O que falta existir

A peça que falta é pouco glamorosa: uma credencial do agente, separada da do usuário, com escopo, limite por transação, prazo e revogação, e com uma trilha de auditoria que o banco consiga ver.

No cartão, isso já começou. O Shared Payment Token da Stripe, parte do protocolo de comércio por agente que ela desenvolveu com a OpenAI, dá ao agente acesso a um meio de pagamento restrito a um vendedor, com valor máximo, moeda, prazo de expiração e revogação a qualquer momento (ainda em preview, nos EUA, no Canadá e em parte da Europa). A Visa tokeniza o cartão para o agente e exige passkey do titular. O ChatGPT Wallet, lançado em novembro nos EUA, entrega ao agente e à loja uma credencial substituta, nunca o número do cartão, e pede aprovação por biometria.

Na conta bancária, os Estados Unidos estão atrás. A regra de open banking de lá, a 1033, está suspensa por liminar e em reescrita. A iniciativa do FDX, o consórcio que define o padrão de compartilhamento de dados financeiros no país, abriu consulta sobre agentes em abril e ainda não publicou padrão.

O Brasil, curiosamente, já escreveu esse formato na regra, mas só para quem é autorizado pelo Banco Central. O Open Finance não é só compartilhamento de dados: um iniciador de pagamento autorizado pode disparar um Pix na conta do cliente em outro banco, com o consentimento dele. A Jornada Sem Redirecionamento do Open Finance, incluída na resolução em 2024, exige um consentimento com a forma de pagamento, o prazo de validade e os valores máximos por transação e por dia, e a revogação tem de valer em até um dia. Ela não foi desenhada para agente de IA, e o Banco Central não falou de pagamento por agente. Mas é exatamente a frase do PNC: contas, permissões, prazo e limite, autorizados no banco. E aqui quem inicia o pagamento é uma instituição regulada, que responde por isso, não um agente qualquer com a senha do cliente.

## O que isso muda no seu roadmap

Se você constrói agente que toca dinheiro, a pergunta não é se o modelo planeja bem. É como o seu agente se autentica hoje.

Se a resposta for "com a credencial do usuário", você tem um problema de produto, não de modelo. O Citi e o Wells Fargo se reservam, por escrito, o direito de bloquear agentes de terceiros, e o risco de cada ação fica com o seu cliente, que vai descobrir isso no pior momento.

O caminho, por enquanto, é o mais chato:

1. **Leitura** por conexão autorizada pelo banco, nunca por senha nem scraping.
2. **Pagamento** por um canal com consentimento, limite e revogação: no Brasil, o iniciador e a jornada do Open Finance; no cartão, os tokens de agente.
3. **Aprovação humana** em cada transação enquanto a credencial do agente não existir no seu caso.

Não por acaso, a ferramenta de finanças pessoais que a Anthropic lançou neste mês é, segundo o TechCrunch, somente leitura: não move, não gerencia e não investe dinheiro.

Satya Nadella disse no DealBook Summit, em 18 de novembro, que "if you don't accept the agent, somebody else will", ou seja, quem não aceitar o agente vai perder para quem aceitar. Ele provavelmente está certo. Mas o banco que aceitar o agente primeiro vai precisar de algo para aceitar, e isso não é um modelo melhor. É uma credencial que diga quem o agente é, o que ele pode fazer e até quando.

## Fontes

- Citi, [Online User Agreement, Seção H](https://www.citi.com/tandc) (atualizado em novembro de 2026).
- PNC, [Digital Services Agreement](https://www.pnc.com/content/dam/digital-assets/en/documents/digital_services_agreement_UPDATE.pdf), versão vigente a partir de 19/12/2026.
- Wells Fargo, [atualização do Online Access Agreement](https://www.wellsfargo.com/mobile-online-banking/updates/), vigente a partir de 24/11/2026.
- TechCrunch, [More banks say customers using AI agents are on their own, even if they get hacked](https://techcrunch.com/2026/11/18/more-banks-says-customers-using-ai-agents-are-on-their-own-even-if-they-get-hacked/), 18/11/2026.
- CFPB, [Regulation E, 12 CFR 1005.2(m)](https://www.consumerfinance.gov/rules-policy/regulations/1005/2/) e [comentário oficial 2(m)](https://www.consumerfinance.gov/rules-policy/regulations/1005/interp-2/); [15 U.S.C. 1693l](https://www.law.cornell.edu/uscode/text/15/1693l).
- Stripe, [Shared Payment Tokens](https://docs.stripe.com/agentic-commerce/concepts/shared-payment-tokens); Visa, [Visa Intelligent Commerce](https://developer.visa.com/capabilities/visa-intelligent-commerce); OpenAI, [ChatGPT Wallet](https://openai.com/index/introducing-chatgpt-wallet).
- Cozen O'Connor, [Section 1033 compliance date: open banking rule enjoined and under reconsideration](https://www.cozen.com/news-resources/publications/2026/section-1033-compliance-date-open-banking-rule-enjoined-and-under-reconsideration), 09/04/2026; FDX, [iniciativa sobre agentes de IA](https://financialdataexchange.org/fdx-feed/as-ai-agents-get-involved-in-financial-data-sharing-leading-standards-body-launches-initiative-to-stay-ahead/), 14/04/2026.
- Banco Central do Brasil, [Resolução Conjunta nº 1/2020](https://normativos.bcb.gov.br/Lists/Normativos/Attachments/51028/Res_Conj_0001_v9_L.pdf), arts. 9º, 13-A e 15.
- TechCrunch, [Satya Nadella predicts AI agents will reshuffle the economics of the web](https://techcrunch.com/2026/11/18/satya-nadella-predicts-ai-agents-will-reshuffle-the-economics-of-the-web/), 18/11/2026.

Leitura relacionada no site: [Amazon Cognito passa a trocar o token do usuário por um token com escopo menor para o agente](https://gusflopes.dev/noticias/aws-sandbox-nitro-e-token-delegado-para-agentes/).

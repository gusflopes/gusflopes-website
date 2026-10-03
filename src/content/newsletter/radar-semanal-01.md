---
title: "Modelo bom virou commodity. Contexto não."
excerpt: "4 modelos em 9 dias, a IA virando conta de consumo e o que fazer com isso na segunda-feira."
edicao: 1
date: "2026-10-03"
duration: "6 min"
image: "https://media.gusflopes.dev/newsletter/2026-10-03/capa-v3.jpg"
substackUrl: "https://gusflopes.substack.com/p/modelo-bom-virou-commodity-contexto"
---

Em 9 dias saíram quatro modelos de IA novos: GPT-6 Sol e Luna, Claude Opus 5.5, GPT-6.1 Sol e Gemini 4 Argon. Cada um mais barato ou mais rápido que o anterior. Se você tentou acompanhar, deve ter tido a mesma sensação que eu: não dá, e talvez não precise.

Esta semana o meu radar passou por 93 notícias de IA. A conclusão que mais se repetiu não foi sobre modelo. Foi esta: **o modelo virou commodity; o que diferencia agora é o contexto que você dá para ele** — a tarefa bem descrita, os documentos certos, a regra de quando conferir. É isso que eu chamo de método.

Esta é a primeira edição do Radar de IA. Toda semana: o que mudou em IA, por que importa para quem trabalha ou empreende, e uma coisa prática para testar. Sem hype.

---

## O que importa esta semana

### 1. A IA virou conta de consumo

![Agente que trabalha sozinho gasta sozinho.](https://media.gusflopes.dev/newsletter/2026-10-03/secao-1-consumo-v3.jpg)

Duas mudanças de cobrança chegaram juntas.

**No WhatsApp:** desde 01/10, a Meta cobra as mensagens de serviço — as respostas da empresa dentro da janela de 24h — na API oficial do WhatsApp, e volta a cobrar as de utilidade. Cada número tem 1.000 mensagens de serviço grátis por mês, e o app WhatsApp Business continua sem cobrança por mensagem. ([Meta](https://developers.facebook.com/documentation/business-messaging/whatsapp/pricing/non-template-messages))

**No Copilot:** a Microsoft refez o Copilot em três partes (Home, Code e Autopilot) e separou a conta. Chat e Office ficam na licença por usuário; agentes, Code e modelos de ponta passam a consumir créditos, cobrados por uso. Licenças novas do Copilot Business vendidas por revenda (CSP) a partir de 02/11 já vêm com essa cobrança ligada. ([Microsoft](https://blogs.microsoft.com/blog/2026/09/25/introducing-the-new-copilot-with-home-code-and-autopilot/) · [Partner Center](https://learn.microsoft.com/en-us/partner-center/announcements/2026-september))

**A minha leitura:** um bot que responde em cinco mensagens o que caberia em uma agora custa cinco vezes. Um agente que trabalha sozinho também gasta sozinho. Desenhar o fluxo deixou de ser capricho e virou conta de custo. Quem não sabe o que está delegando vai descobrir pela fatura.

### 2. Instrução escrita é o ativo

![Instrução escrita é o ativo.](https://media.gusflopes.dev/newsletter/2026-10-03/secao-2-instrucao-v4.jpg)

O Google anunciou as **skills** no Gemini: instruções reutilizáveis, que você escreve uma vez e combina com outras. Chegam ao Workspace em 05/10 e ao app Gemini em 13/10. Os Gems vão para Configurações em 17/11 e, nos planos Business e Enterprise, são removidos em 01/03/2027, com migração automática para rascunho de skill. ([Google](https://workspaceupdates.googleblog.com/2026/09/skills-gemini-app-workspace.html))

Do lado da OpenAI, segundo a imprensa, os GPTs personalizados serão aposentados em 11/12/2026, com migração para plugins. ([FAQ da OpenAI](https://help.openai.com/en/articles/20001519-custom-gpt-retirement-and-migration-faq))

**A minha leitura:** Google, Anthropic, OpenAI e Notion estão convergindo para a mesma ideia: o que vale é a instrução escrita, não a ferramenta onde ela mora. Quem documentou como trabalha migra em minutos. Quem guardou o processo dentro de um GPT, ou só na cabeça, começa do zero a cada troca.

### 3. O agente só sabe o que está documentado

![O agente só sabe o que está documentado.](https://media.gusflopes.dev/newsletter/2026-10-03/secao-3-contexto-v4.jpg)

Três anúncios da semana vão na mesma direção:

→ A Cloudflare apresentou o **Cloudflare OS**, um espaço de trabalho com agentes ligado aos dados e sistemas da empresa (Google Workspace, GitHub). ([Cloudflare](https://blog.cloudflare.com/managed-cloudflare-os/))
→ A Microsoft liberou os **conectores federados** do Microsoft 365 Copilot, que buscam dados de outros sistemas em tempo real via MCP (um padrão para ligar a IA a outras ferramentas), sem copiá-los. ([Microsoft](https://learn.microsoft.com/en-us/microsoft-365/copilot/release-notes))
→ No Google Docs, dá para usar um **Notebook do Gemini como fonte**, para a IA escrever com base em documentos escolhidos por você. ([Google](https://workspaceupdates.googleblog.com/2026/09/ground-ai-prompts-in-google-docs-on-existing-sources-from-Gemini-Notebook.html))

**A minha leitura:** todo mundo está vendendo o "colega agente que conhece a sua empresa". Ele só conhece o que estiver escrito e acessível. A pergunta deixou de ser "qual IA usar" e virou "quais dados eu deixo ela ver, e em que estado eles estão". Contexto para agentes é, hoje, o tema mais importante para as empresas — mais que o modelo.

### 4. Seu próximo cliente pode ser um agente

![Seu próximo cliente pode ser um agente.](https://media.gusflopes.dev/newsletter/2026-10-03/secao-4-agentes-v4.jpg)

A Shopify liberou para agentes de IA de navegador lerem, preencherem e finalizarem o checkout das lojas elegíveis, sem configuração do lojista, com confirmação do comprador. ([Shopify](https://shopify.dev/changelog/posts/webmcp-support-for-checkout))

A Cloudflare diz que mais de 50% do tráfego da internet já é automatizado, que as requisições de agentes de IA cresceram mais de 1.700% em um ano e que alguns setores perderam até 40% do tráfego humano. ([Cloudflare](https://blog.cloudflare.com/agentic-web/))

E no Brasil, segundo a imprensa, o Itaú, via Rede, lançou um gateway para lojistas receberem cartão de crédito dentro da conversa com agentes de IA. ([Mobile Time](https://www.mobiletime.com.br/noticias/30/09/2026/itau-comercio-agentico/))

**A minha leitura:** o site da sua empresa agora tem dois públicos, gente e robô. Catálogo, preço e estoque precisam estar legíveis para um agente. Cadastro de produto bagunçado vira venda perdida — e você nem vê, porque o agente só vai embora.

---

## Giro rápido

→ **Sonnet 5.5 no plano gratuito.** A Anthropic lançou o Claude Sonnet 5.5, mais rápido e mais barato por tarefa que o Sonnet 5, também para quem não paga. ([Anthropic](https://www.anthropic.com/claude-sonnet-5-5))
→ **GPT-6.1 Sol por 1/5 do preço.** Quase no nível do GPT-6 Astra em trabalho profissional, no ChatGPT Work, no Codex e na API. ([OpenAI](https://openai.com/index/introducing-gpt-6-1-sol/))
→ **Gemini 4 Argon, por enquanto só para cibersegurança.** O modelo mais forte do Google saiu, mas o resto de nós vai esperar. ([Google](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-4-argon/))
→ **IA que escolhe em vez de escrever.** A OpenAI abriu em prévia a Decisions API: recebe um contexto e uma lista fechada de respostas e devolve a opção escolhida, com nível de confiança. A Cloudflare lançou modelos abertos na mesma linha, o Clef. É o "IA conversa, software calcula" vindo dos próprios fornecedores. ([OpenAI](https://community.openai.com/t/devday-2026-announcements-and-developer-resources/1402006) · [Cloudflare](https://blog.cloudflare.com/clef-decision-models/))
→ **Agentes sempre ligados.** Os "dots" da OpenAI trabalham em segundo plano, com computador e navegador próprios na nuvem, nos planos Pro e Business Premium. ([OpenAI](https://openai.com/index/introducing-dots/))
→ **Onde a IA paga rápido em finanças.** Em pesquisa do Gartner com 160 líderes de finanças, extração de dados, contas a pagar e a receber e relatórios dão retorno em 9 a 10 meses. ([Gartner](https://www.gartner.com/en/newsroom/press-releases/2026-09-24-gartner-says-cfos-must-take-a-more-disciplined-approach))
→ **Documento agora tem dois leitores.** O STF multou em R$ 5 mil um advogado que escondeu numa petição um comando para a IA do tribunal; é o segundo caso em uma semana. Texto escondido pode instruir a IA de quem recebe. ([STF](https://noticias.stf.jus.br/postsnoticias/stf-multa-advogado-por-insercao-de-comando-oculto-de-ia-em-peticao-de-reu-do-8-de-janeiro/))
→ **Não, ainda não existe "Marco Legal da IA" sancionado.** O PL 2338/2023 foi aprovado no Senado em 2024 e segue aguardando parecer na Câmara. O que já vale hoje é a LGPD. ([Câmara](https://www.camara.leg.br/proposicoesWeb/fichadetramitacao?idProposicao=2487262))

---

## Uma coisa para testar esta semana

**Escreva a instrução de uma tarefa que você repete.**

Escolha uma tarefa que você faz toda semana com IA, ou que gostaria de fazer: responder pedido de orçamento, resumir uma reunião, revisar um contrato simples, montar o relatório de sexta. Abra um documento e escreva, em tópicos:

1. **Objetivo:** o que sai no final e para quem.
2. **Entradas:** o que você entrega para a IA (o e-mail, a planilha, a transcrição).
3. **Passo a passo:** como você faria, na ordem.
4. **Como conferir:** o que você checa antes de usar o resultado.
5. **Um exemplo bom:** um resultado que você aprovaria.

Cole esse texto no ChatGPT, no Gemini ou no Claude antes de pedir a tarefa, e compare com o que você recebia antes. Se ficar bom, guarde fora da ferramenta. É esse documento que vira skill, Gem ou plugin — e é ele que sobrevive quando a ferramenta muda.

---

Esta semana o giro dos quatro modelos virou carrossel no [Instagram](https://www.instagram.com/gusflopes/?utm_source=newsletter&utm_medium=email&utm_campaign=radar-semanal-01) e no [X](https://x.com/gusflopes?utm_source=newsletter&utm_medium=email&utm_campaign=radar-semanal-01). No dia a dia, eu publico as notícias lá e no [LinkedIn](https://www.linkedin.com/in/gusflopes/?utm_source=newsletter&utm_medium=email&utm_campaign=radar-semanal-01).

Se você testar a instrução escrita, me conta qual tarefa escolheu, respondendo este e-mail ou nos comentários. Eu leio todas. E se alguém do seu time vive perdido nos lançamentos, encaminha para ele: o Radar de IA chega todo sábado de manhã, de graça.

Até sábado que vem,
Gustavo

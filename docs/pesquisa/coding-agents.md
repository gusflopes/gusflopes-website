# Coding agents e agentes de IA citados pelo Gustavo

> Pesquisa feita em **26/09/2026** para embasar artigos do gusflopes.dev.
> Regra: nada inventado. Quando a fonte é secundária (blog, agregador, Wikipedia), isso está indicado. "Não confirmado" = não achei fonte confiável.
> Números de estrelas no GitHub e versões no npm foram consultados direto na API do GitHub e no registry do npm em 26/09/2026 (fonte primária, mas mudam todo dia).

## Resumo rápido: identificação provável de cada nome

| Nome citado | Identificação mais provável | Confiança | É coding agent? |
|---|---|---|---|
| **Pi** | *pi* (pi-coding-agent), de Mario Zechner, hoje na Earendil | Alta | Sim, harness de código mínimo no terminal |
| **Hermes** | *Hermes Agent*, da Nous Research | Alta | Agente geral (memória, skills, gateways), também programa |
| **Claude Code** | Claude Code, da Anthropic | Certa | Sim |
| **Grok Bot** | *Grok Bot*, agente "sempre ligado" da xAI/SpaceXAI (ago/2026) **ou** *Grok Build*, a CLI de código (mai/2026) **ou** o @grok do X | **Média: confirmar** | Grok Build é coding agent; Grok Bot é agente de uso geral |
| **Jev** | *Jev*, modelo "System One" da TypeSafe AI (set/2026) | **Média: confirmar** | **Não.** É modelo de decisão estruturada, usado *dentro* de agentes |
| **Paperclip** | *Paperclip*, orquestrador open source de agentes ("zero-human companies") | Alta | Não é coding agent; orquestra Claude Code, Codex, OpenClaw etc. |

---

## 1. Pi

**Interpretações possíveis**
1. **pi (pi-coding-agent)**, de Mario Zechner (criador do libGDX). É a mais provável no contexto de coding agents em 2025–2026.
2. *Pi*, chatbot "pessoal" da Inflection AI (2023). É assistente de conversa, não coding agent. Improvável no contexto.
3. Forks e derivados, como o *oh-my-pi* (Stencil Labs): https://github.com/can1357/oh-my-pi

**O que é**
- Harness de coding agent para o terminal, mínimo e opinativo. Por padrão dá ao modelo **só quatro ferramentas: `read`, `write`, `edit`, `bash`**. O system prompt, somado às definições de ferramenta, fica abaixo de 1.000 tokens. Não traz plan mode, sub-agentes, MCP nem to-dos embutidos: a ideia é você montar isso com extensões em TypeScript. Fonte: post do autor, "What I learned building an opinionated and minimal coding agent", **30/11/2025**: https://mariozechner.at/posts/2025-11-30-pi-coding-agent/
- O monorepo tem `pi-ai` (API unificada para vários provedores LLM), `pi-agent-core` (runtime do agente), `pi-tui` (UI de terminal) e `pi-coding-agent` (a CLI). Mesma fonte.
- Provedores suportados: Anthropic, OpenAI, Google, xAI, Groq, Cerebras, OpenRouter e endpoints compatíveis com OpenAI (Ollama, llama.cpp, vLLM, LM Studio). Mesma fonte.
- É o agente mínimo por trás do **OpenClaw** (ex-Clawdbot/Moltbot). Fontes: anúncio da Earendil (08/04/2026, abaixo) e matérias secundárias.

**Datas e marcos**
- Repositório criado no GitHub em **09/08/2025** (API do GitHub, `earendil-works/pi`, `created_at`).
- Primeira publicação no npm como `@mariozechner/pi-coding-agent`: **12/11/2025**, versão 0.6.2 (registry do npm).
- 30/11/2025: post de lançamento/explicação do autor (link acima).
- **08/04/2026**: a **Earendil** (empresa de Armin Ronacher, criador do Flask, e Colin Sidoti) adquire o projeto e Mario Zechner entra como sócio. O núcleo continua MIT e open source. Fontes: https://earendil.com/posts/announcing-pi-and-lefos/ e https://lucumr.pocoo.org/2026/4/8/mario-and-earendil/ (08/04/2026). A RFC de licenciamento do pi fica em https://rfc.earendil.com/0015/
- 07/05/2026: pacote passa a ser publicado como `@earendil-works/pi-coding-agent` (npm). Última versão em 22/09/2026: 0.87.1.
- Em 26/09/2026: ~109,6 mil estrelas no GitHub (API).

**Licença e preço**: MIT, gratuito. Você paga o provedor de LLM que usar.
**Links oficiais**: https://pi.dev · https://github.com/earendil-works/pi (o antigo `badlogic/pi-mono` redireciona para cá)
**Diferencial para artigo**: é a antítese do Claude Code. Traz o mínimo, você constrói o resto, e o modelo pode ser trocado no meio da sessão (handoff entre provedores).

---

## 2. Hermes

**Interpretações possíveis**
1. **Hermes Agent**, da Nous Research. É a mais provável: agente open source que viralizou em 2026.
2. **Modelos Hermes** (Hermes 3, Hermes 4…), LLMs de pesos abertos da mesma Nous Research. São modelos, não agentes.
3. Outros projetos chamados "Hermes" (ex.: o motor JavaScript Hermes, do React Native). Não têm relação com o contexto.

**O que é**
- Agente autônomo open source, **auto-hospedado**, com um "ciclo de aprendizado": memória persistente curada pelo próprio agente, busca em sessões passadas e **criação automática de skills** depois de tarefas complexas (compatível com o padrão agentskills.io). Tem gateway de mensagens (Telegram, Discord, Slack, WhatsApp, Signal, e-mail, CLI), agendador cron, sub-agentes, 40+ ferramentas, vários backends de terminal (local, Docker, SSH, Modal, Daytona…) e suporte a servidores MCP. Fontes: README https://github.com/NousResearch/hermes-agent e site https://hermes-agent.nousresearch.com/ (consultados em 26/09/2026).
- Não é "só" coding agent: é agente de uso geral que também executa código.

**Datas e marcos**
- Lançamento público: **25/02/2026**, com o anúncio "Meet Hermes Agent, the open source agent that grows with you". Fonte: agregadores e matérias (https://hermes-agent.org/about/, https://www.layer3labs.io/guides/hermes-agent-explained). **Não achei o post original da Nous para citar a data.** O repositório existe desde 22/07/2025 (API do GitHub); as releases mais antigas ainda listadas são de 12/03/2026.
- Crescimento: sites secundários falam em ~95,6 mil estrelas em 7 semanas e 175–180 mil em menos de 4 meses (https://hermesatlas.com/reports/state-of-hermes-april-2026). Em 26/09/2026 eram **~249 mil estrelas** (API do GitHub).
- Última release vista: v0.21.5, de **24/09/2026** (https://github.com/NousResearch/hermes-agent/releases).
- Tem app desktop para macOS, Windows e Linux (site oficial).

**Licença e preço**: MIT, gratuito para auto-hospedar. O site oficial lista planos com créditos de modelo pelo Nous Portal: Free (só modelos gratuitos), Plus US$ 20/mês, Super US$ 100/mês e Ultra US$ 200/mês (consultado em 26/09/2026).
**Links oficiais**: https://hermes-agent.nousresearch.com/ · https://github.com/NousResearch/hermes-agent
**Cuidado**: `hermes-agent.org` parece site de terceiros, não oficial da Nous.

---

## 3. Claude Code

**O que é**: coding agent da Anthropic. Nasceu no terminal e hoje também roda em IDE, web e desktop. Lê e edita código, roda comandos e testes, faz commit e usa MCP, skills, hooks e sub-agentes.

**Datas e marcos (fontes primárias quando possível)**
- **24/02/2025**: "research preview" limitada, anunciada junto com o Claude 3.7 Sonnet. https://www.anthropic.com/news/claude-3-7-sonnet. O pacote `@anthropic-ai/claude-code` foi criado no npm no mesmo dia.
- **22/05/2025**: disponibilidade geral (GA), junto com Claude Opus 4 e Sonnet 4. Fontes: https://www.anthropic.com/news/claude-4 e a Wikipedia (https://en.wikipedia.org/wiki/Claude_(language_model)).
- Jun/2025: suporte a servidores MCP remotos no Claude Code. https://www.anthropic.com/news/claude-code-remote-mcp
- **29/09/2025**: o "Claude Code SDK" passa a se chamar **Claude Agent SDK** (junto com o Sonnet 4.5). Fonte secundária: https://www.morphllm.com/claude-agent-sdk; a docs oficial diz "The Claude Code SDK is now the Claude Agent SDK".
- 16/10/2025: Agent Skills. 20/10/2025: Claude Code na web, com sandbox (Wikipedia).
- 12/01/2026: **Claude Cowork** (research preview), agente para não-programadores construído sobre a arquitetura do Claude Code. https://simonwillison.net/2026/Jan/12/claude-cowork/
- Receita: US$ 1 bi anualizado em nov/2025 e US$ 2,5 bi em fev/2026, segundo fontes secundárias (https://sacra.com/c/anthropic/, https://venturebeat.com/technology/anthropic-says-it-hit-a-30-billion-revenue-run-rate-after-crazy-80x-growth). **Verifique no release oficial antes de publicar números de receita.**
- Versão no npm em 25/09/2026: 2.1.283.

**Licença e preço**: proprietário (o npm diz "SEE LICENSE IN README.md"). Vem incluído nos planos Claude Pro (US$ 20/mês), Max (US$ 100 e US$ 200/mês), Team (assentos premium) e Enterprise, ou pode ser pago por token pela API. https://claude.com/pricing (valores confirmados por agregadores em 2026; confira a página no dia da publicação).
**Links**: https://claude.com/claude-code · https://docs.claude.com/en/docs/claude-code

---

## 4. Grok Bot (dúvida: confirmar com o Gustavo)

**Interpretações possíveis**
1. **Grok Bot (agente)**, da xAI/SpaceXAI, lançado em beta em **11/08/2026**: "time" de agentes sempre ligados, cada um com o **próprio computador na nuvem**, que entram nas ferramentas do usuário e executam tarefas de várias etapas mesmo com o laptop fechado. Disponível para SuperGrok (todos os níveis), Cursor Pro/Pro+/Ultra e Cursor Teams, no desktop e no iOS. É o primeiro produto conjunto depois da compra do Cursor. Fonte primária: https://x.ai/news/introducing-grok-bot. Secundárias: https://venturebeat.com/orchestration/spacexais-grok-bot-turns-agents-into-persistent-digital-coworkers-that-can-operate-your-apps-for-120-per-month e https://www.unite.ai/xai-launches-grok-bot-always-on-ai-teammates-with-their-own-cloud-computers/
2. **Grok Build**, a **CLI de código** da xAI, que é o equivalente direto ao Claude Code. Se ele falava de *coding agents*, provavelmente é este.
   - Early beta em **14/05/2026** para o SuperGrok Heavy; ampliado em **25/05/2026** para SuperGrok e X Premium+ (https://x.ai/news/grok-build-cli; a data de 14/05 vem de fonte secundária: https://pulse2.com/xai-grok-build-launches-early-beta-coding-agent-cli/).
   - Modelo dedicado "Grok Build 0.1" na API em 29/05/2026, segundo fonte secundária (https://www.buildfastwithai.com/blogs/grok-build-xai-cli-ai-agents-2026). **Não confirmado em fonte primária.**
   - **Código aberto**: repositório `xai-org/grok-build` criado em **14/07/2026** (API do GitHub), licença **Apache-2.0**, escrito em Rust. Fontes secundárias dão 15/07/2026 como data da abertura. https://github.com/xai-org/grok-build
   - Recursos: plano → revisão → aprovação com diffs, até 8 sub-agentes em paralelo, modo headless (`-p`), Agent Client Protocol (ACP), MCP, AGENTS.md, skills, plugins e hooks. https://docs.x.ai/build/overview
   - Preço: exige assinatura SuperGrok/X Premium+. As fontes secundárias divergem nos valores (US$ 30/mês no SuperGrok, US$ 299 no Heavy, promoções de US$ 99). **Confirmar na página oficial antes de publicar.**
3. **@grok no X**: o chatbot que responde quando é marcado em posts. Liberado em mar/2025 (https://techcrunch.com/2025/03/07/x-now-lets-you-query-grok-by-mentioning-it-in-replies/). Não é coding agent.

**Contexto corporativo (para não errar o nome da empresa)**
- A SpaceX adquiriu a xAI em **02/02/2026** (https://en.wikipedia.org/wiki/SpaceXAI; https://x.ai/news/xai-joins-spacex).
- A xAI foi rebatizada **SpaceXAI** em **06/07/2026** (https://dataconomy.com/2026/07/07/elon-musk-rebrands-merged-xai-and-spacex-as-spacexai/).
- A SpaceX anunciou a compra da Anysphere (Cursor) por US$ 60 bi em **16/06/2026**, com fechamento em **14/08/2026** (https://www.cnbc.com/2026/06/16/spacex-spcx-cursor-acquisition-ipo.html; a data de fechamento vem de fonte secundária: https://qz.com/spacex-buying-cursor-anysphere-60-billion-deal-061626).

---

## 5. Jev (dúvida: confirmar com o Gustavo)

**Interpretações possíveis**
1. **Jev, da TypeSafe AI**: é o único produto de IA chamado "Jev" que encontrei, e é bem recente. A TypeSafe saiu do stealth em **15/09/2026** com seed de **US$ 40 mi** (liderada pela DCVC). Fontes: https://www.hpcwire.com/aiwire/2026/09/16/typesafe-ai-emerges-from-stealth-with-40m-in-funding-with-new-model-for-composable-ai/ e https://en.wowtale.net/2026/09/21/235190/
   - O que é: um modelo "**System One**" que **não gera texto nem código**. Recebe dados e uma lista de perguntas tipadas e devolve respostas estruturadas (sim/não, opção de lista, posição em escala) com probabilidades calibradas, em ~100 ms. Serve para roteamento, scoring e checagens *dentro* de agentes e apps. Fonte oficial: https://typesafe.ai/blog/introducing-system-one-models-and-jev. A página que consultei está datada de 26/09/2026 e fala em "early access" com waitlist; a própria TypeSafe tem uma página sobre "Jev com coding agents": https://docs.typesafe.ai/introduction/coding-agents
   - Preço divulgado: US$ 0,042 por milhão de tokens de entrada; saída gratuita (site oficial).
   - Fundadores: Diogo Almeida (ex-OpenAI), Erik Gafni e Sasha Sheng (fontes secundárias). Há notícias de conversas para captar mais de US$ 1 bi com valuation acima de US$ 10 bi (https://cryptobriefing.com/typesafe-ai-billion-dollar-funding-jev-model/). **Não confirmado.**
   - Licença/pesos abertos: nada indica que seja open source.
   - **Atenção**: se o Gustavo listou Jev como "coding agent", a classificação está errada. Jev é um *componente* para agentes, não um agente.
2. **Grafia errada de outro agente.** Candidatos com som ou grafia parecidos: **Devin** (Cognition, 12/03/2024), **Jules** (coding agent assíncrono do Google) ou **Junie** (agente da JetBrains). **Não confirmado**; perguntar a ele.

---

## 6. Paperclip

**Interpretações possíveis**
1. **Paperclip (paperclipai/paperclip)**: orquestrador open source de "zero-human companies". É a mais provável.
2. O "paperclip maximizer" (experimento mental de Nick Bostrom sobre IA desalinhada). É referência cultural, não produto.
3. Forks e sites de terceiros (`agencyenterprise/paperclip-ai`, `paperclip.inc`). O oficial parece ser `paperclip.ing` / org `paperclipai`. **Confirmar.**

**O que é**
- Servidor Node.js com interface React que **organiza agentes existentes** (Claude Code, Codex, Cursor, OpenClaw, scripts bash e webhooks HTTP) como uma empresa: organograma, papéis, orçamento e custo por agente, governança e aprovações, tarefas, "heartbeats" agendados e isolamento multi-organização. **Não é coding agent**: é a camada de gestão acima deles. Fonte: README https://github.com/paperclipai/paperclip (Paperclip Labs, Inc.)
- Origem: o autor pseudônimo **@dotta** rodava 20 a 30 janelas de Claude Code ao mesmo tempo sem conseguir acompanhar o que cada uma fazia. Fonte secundária: https://www.mindstudio.ai/blog/what-is-paperclip-zero-human-ai-company-framework-2

**Datas e marcos**
- Repositório criado em **02/03/2026** e pacote npm `paperclipai` em **03/03/2026** (API do GitHub / npm). Fontes secundárias citam lançamento público em **04/03/2026** (https://codescrum.medium.com/paperclip-ai-the-open-source-framework-that-turns-ai-agents-into-a-full-company-e0b0b0f8a735).
- Crescimento: ~30 mil estrelas em 3 semanas (fontes secundárias). **~87,5 mil em 26/09/2026** (API do GitHub).
- Última versão no npm: 2026.916.1, publicada em 27/09/2026 UTC (registry do npm).

**Licença e preço**: MIT, gratuito para auto-hospedar.
**Links**: https://paperclip.ing · https://github.com/paperclipai/paperclip
**Ângulo para artigo**: "empresa sem humanos" é marketing. Para PME, o útil é a *governança* (orçamento, aprovação humana, trilha de auditoria), que conversa com o nosso tema de ter um humano no loop.

---

## Outros agentes relevantes (só o essencial)

| Agente | Quem | Lançamento | Licença / preço | Fonte |
|---|---|---|---|---|
| **Codex CLI** | OpenAI | 16/04/2025 (npm `@openai/codex` criado no mesmo dia) | Apache-2.0; usa conta ChatGPT ou API | https://en.wikipedia.org/wiki/Codex_CLI |
| **Codex (nuvem)** | OpenAI | Research preview 16/05/2025; GA 06/10/2025 (DevDay) | Incluído nos planos ChatGPT | https://hidekazu-konishi.com/entry/openai_gpt_model_release_timeline.html (secundária) |
| **Gemini CLI** | Google | 25/06/2025 | Apache-2.0; cota gratuita de 60 req/min e 1.000 req/dia no lançamento | https://blog.google/innovation-and-ai/technology/developers-tools/introducing-gemini-cli-open-source-ai-agent/ · https://techcrunch.com/2025/06/25/google-unveils-gemini-cli-an-open-source-ai-tool-for-terminals/ |
| **Jules** | Google | Anunciado em 11/12/2024 (com o Gemini 2.0) | Proprietário | https://en.wikipedia.org/wiki/Gemini_(language_model) |
| **Cursor** | Anysphere (desde 14/08/2026, da SpaceX/SpaceXAI) | IDE desde 2023; Cursor 2.0 + modelo próprio Composer em 29/10/2025 | Proprietário; planos Pro/Ultra/Teams | https://cursor.com/blog/2-0 · https://en.wikipedia.org/wiki/Cursor_(company) |
| **Aider** | Paul Gauthier | Repositório criado em 09/05/2023 | Apache-2.0; traga sua chave de API | https://github.com/Aider-AI/aider (API do GitHub) |
| **OpenCode** | SST, depois Anomaly | npm `opencode-ai` em 31/05/2025; lançamento citado como 19/06/2025 | MIT; 75+ provedores | https://github.com/anomalyco/opencode · https://www.developersdigest.tech/blog/opencode-developer-guide-2026 (secundária) |
| **Devin** | Cognition | 12/03/2024 ("primeiro engenheiro de software de IA") | Proprietário, SaaS | https://venturebeat.com/ai/cognition-emerges-from-stealth-to-launch-ai-software-engineer-devin |
| **GitHub Copilot coding agent** | GitHub/Microsoft | Build 2025 (19/05/2025) | Planos Copilot | https://blogs.microsoft.com/blog/2025/05/19/microsoft-build-2025-the-age-of-ai-agents-and-building-the-open-agentic-web/ |
| **OpenClaw** (ex-Clawdbot/Moltbot) | Peter Steinberger, depois fundação independente | Nov/2025 como projeto pessoal; lançamento oficial em 25/01/2026; renomeado para Moltbot em 27/01 e OpenClaw em 29/01/2026; Steinberger vai para a OpenAI em 14/02/2026 | Open source | https://en.wikipedia.org/wiki/OpenClaw · https://www.taskade.com/blog/moltbook-clawdbot-openclaw-history (secundária) |

## Dúvidas para o Gustavo confirmar
1. **"Grok Bot"**: é o *Grok Bot* (agente sempre ligado, ago/2026), o *Grok Build* (CLI de código, mai/2026) ou o @grok do X?
2. **"Jev"**: é o *Jev* da TypeSafe AI (modelo de decisão, set/2026, *não* é coding agent) ou outro nome (Devin? Jules? Junie?)?
3. **"Pi"**: confirmar que é o pi do Mario Zechner/Earendil, e não o Pi da Inflection.
4. **"Hermes"**: confirmar que é o *Hermes Agent*, e não os modelos Hermes da Nous.
5. **"Paperclip"**: confirmar que é o `paperclipai/paperclip` (paperclip.ing).
6. Números de estrelas e receita mudam rápido. Antes de publicar, datar ("em 26/09/2026…") ou reconsultar.

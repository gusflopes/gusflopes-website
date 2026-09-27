# Pauta editorial: backlog de artigos (jul/2024 → set/2026)

Estado em 26/09/2026. O backlog tem 38 artigos nos três eixos (ver `docs/revisao-site-2026-09.md`, Parte 2).

## Regras da pauta

- **A data nunca vem antes do fato.** Cada artigo só pode citar o que existia na data sugerida. A coluna "Não pode citar" lembra os anacronismos mais prováveis.
- As datas de lançamento vêm de `docs/pesquisa/linha-do-tempo-ia.md` e `docs/pesquisa/coding-agents.md`, com fontes marcadas lá.
- **Pesquisa?**
  - **Sim**: o texto depende de fatos, datas ou números que precisam ser checados na fonte primária antes de publicar.
  - **Leve**: só um ou dois fatos a conferir.
  - **Dono**: depende de informação que só o Gustavo tem (datas reais de projetos, fotos, métricas).
- **Série família**: o filho tem 10 anos em set/2026. Artigos em que ele "tem 10 anos" não podem ter data anterior ao aniversário de 10 anos. Por isso a série está em 2026, e as datas precisam ser confirmadas. Os termos de consumidor do Claude exigem 18+, então o texto deve deixar claro que **o pai opera a conta** e a criança programa junto (ver `docs/pesquisa/ensinar-criancas-ia.md`, seção 2). Não publicar o rosto nem o nome completo da criança sem decisão consciente (ECA Digital em vigor desde 17/03/2026).
- **Reforma Tributária**: no site principal ela aparece só como case técnico ou de negócio. Nenhum artigo daqui explica regra tributária nem recomenda opção. Isso fica na landing, com as regras de ética da OAB.
- Cadência:
  - 2024: 1 artigo por mês, ou menos (fase de "caderno de estudos").
  - 2025: de 1 a 2 por mês.
  - 2026: de 2 a 3 por mês, contando os 22 itens já publicados (Engenharia, dez/2025 a jun/2026).
- Recomendação de transparência para datas retroativas: ver a Parte 2.6 da revisão ("Escrito em …, publicado aqui em …").

Legenda de eixo: **ENG** = Engenharia & IA · **NEG** = Negócios · **BAS** = Bastidores.

---

## 2024: caderno de estudos (6)

| # | Data | Eixo | Título | Público | Resumo | Pesquisa? | Não pode citar |
|---|---|---|---|---|---|---|---|
| 1 | 2024-07-15 | ENG | Claude 3.5 Sonnet e Artifacts: quando o chat virou ambiente de trabalho | Devs e tech leads | Primeiras semanas usando Artifacts (20/06/2024) para prototipar telas e scripts. O que muda quando o modelo devolve um artefato executável e não só texto. | Leve | MCP, Claude Code, o1 |
| 2 | 2024-08-26 | NEG | O ChatGPT do contador: onde ele ajuda e onde ele inventa | Donos de escritório contábil, gestores | Testes com casos do dia a dia de um escritório (resumo de norma, e-mail para cliente, conferência). A conclusão é que o texto sai bom, mas nenhum número deve sair dali sem checagem. | Não | LC 214/2025 (ainda era PLP 68/2024), modelos de raciocínio |
| 3 | 2024-09-23 | ENG | o1-preview e o "modelo que pensa": o que muda para quem escreve software | Devs | O o1-preview (12/09/2024) em problemas de lógica e refatoração: onde o raciocínio mais lento compensa o custo e a latência, e onde não compensa. | Sim | o1 completo (dez/2024), DeepSeek R1 |
| 4 | 2024-10-28 | ENG | Computer Use: agentes que clicam na tela são RPA com outro nome? | Arquitetos, times de automação | O beta de Computer Use (22/10/2024) comparado com RPA tradicional: fragilidade, custo por tarefa e onde ele faz sentido numa empresa hoje. | Sim | Operator (jan/2025), MCP |
| 5 | 2024-11-11 | NEG | IA conversa, software calcula: por que eu não deixo um LLM fazer conta que vale dinheiro | Empresários, escritórios | O manifesto do método (a origem do CalcJud): o LLM entende o pedido e explica, o motor determinístico calcula, e a procedência fica em toda resposta. | Dono (datas e histórico do CalcJud) | MCP (lançado em 25/11/2024) |
| 6 | 2024-12-09 | ENG | MCP em duas semanas: por que um protocolo pode ser o "USB" da IA | Devs, arquitetos | Primeiro servidor MCP local (stdio) no Claude Desktop, feito logo depois do lançamento (25/11/2024). O que é tool, resource e prompt, e por que um padrão importa mais que mais um SDK. | Sim | MCP remoto, Streamable HTTP (mar/2025), adoção da OpenAI |

## 2025: da curiosidade ao método (15)

| # | Data | Eixo | Título | Público | Resumo | Pesquisa? | Não pode citar |
|---|---|---|---|---|---|---|---|
| 7 | 2025-01-27 | ENG | DeepSeek R1: o que um modelo aberto e barato muda na conta do seu projeto | Tech leads, CTOs | O R1 (20/01/2025, MIT) e o "momento DeepSeek": custo por token, rodar localmente, riscos de dados e quando um modelo aberto é a escolha certa. | Sim | Claude 3.7, GPT-4.5 |
| 8 | 2025-02-17 | NEG | Qualificação de lead antes da IA: ICP, BANT e o que o seu CRM já sabe | Empresários, gestores comerciais | A base que vem antes de qualquer automação: perfil de cliente ideal, critérios explícitos e dados que o CRM já tem. Sem isso, a IA só acelera a bagunça. | Não | GTM Engineering como tendência, casos de 2026 |
| 9 | 2025-03-10 | ENG | Duas semanas com Claude Code: diário de um tech lead cético | Devs, tech leads | Primeiras impressões da research preview (24/02/2025) num projeto pessoal: onde o agente acertou, onde se perdeu, e o custo em tokens contra horas economizadas. | Leve | Claude Code GA, subagents, hooks, Skills |
| 10 | 2025-04-07 | ENG | Quando um padrão vira padrão: MCP remoto na Cloudflare e a adesão da OpenAI | Arquitetos | Na mesma semana, a Cloudflare publicou MCP remoto em Workers (25/03/2025) e a OpenAI adotou o MCP (26/03/2025). O que isso muda para quem expõe API. | Sim | Adoção do Google (09/04/2025), Claude Integrations (01/05/2025) |
| 11 | 2025-04-28 | NEG | Vibe coding na empresa: protótipo numa tarde, dívida por um ano | Empresários, gestores | O termo "vibe coding" (fev/2025) explicado para quem decide: quando o protótipo feito com IA é ótimo, e quando ele vira sistema crítico sem dono. | Leve | Claude Code GA, Codex na nuvem |
| 12 | 2025-05-26 | ENG | Claude Code GA, Codex CLI e o Copilot agent: o terminal virou o novo IDE? | Devs | O mês em que Codex CLI (16/04), GitHub Copilot coding agent (19/05) e Claude Code GA com Claude 4 (22/05) chegaram. Comparação de modelo de uso, preço e controle. | Sim | Gemini CLI (25/06/2025), GPT-5 |
| 13 | 2025-06-09 | NEG | Quanto custa um agente de IA de verdade: tokens, pessoas e manutenção | Empresários, CFOs | Um modelo simples de custo total (tokens, integração, revisão humana, manutenção de prompt e avaliação) para comparar com o custo do processo atual. | Leve | Casos com números de 2026 (Vercel etc.) |
| 14 | 2025-07-14 | ENG | Context engineering: nome novo para um trabalho antigo | Devs, tech leads | Por que o termo pegou em jun/2025 e o que muda na prática: arquivos de instrução, recorte do que o agente vê e sessões curtas. Com exemplos de erro por excesso de contexto. | Sim (origem do termo) | Agent Skills (out/2025), AGENTS.md (ago/2025) |
| 15 | 2025-08-11 | ENG | Três agentes no mesmo repositório: Claude Code, Codex CLI e Gemini CLI num teste honesto | Devs | A mesma tarefa (bug e feature pequena) nos três agentes, com medição de tempo, custo e retrabalho. Sem ranking definitivo: cada um ganha num cenário. | Sim | GPT-5-Codex (15/09/2025), Sonnet 4.5 |
| 16 | 2025-08-25 | NEG | GTM Engineering: o cargo que mistura vendas, dados e código | Empresários, gestores comerciais | O que faz um GTM engineer (termo que a Clay diz ter criado em 2023) e por que interessa a quem vende B2B no Brasil, mesmo sem contratar um. | Sim | Números da Clay de 2026, caso Vercel (jan/2026) |
| 17 | 2025-09-08 | ENG | AGENTS.md, CLAUDE.md e afins: o README que o seu agente lê | Devs, tech leads | Como escrever o arquivo de instruções do repositório (AGENTS.md, ago/2025): o que colocar, o que deixar de fora e como versionar junto com o código. | Leve | Agent Skills, AAIF (dez/2025) |
| 18 | 2025-09-22 | NEG | Qualificação de lead com LLM: enriquecimento, rubric e o humano no fim do funil | Gestores comerciais, escritórios | Um desenho de qualificação com IA: dados públicos, rubric explícito, pontuação explicável e decisão final humana. Inclui os riscos de viés e alucinação. | Sim | Caso Vercel (jan/2026), Sebrae 2026 |
| 19 | 2025-10-13 | ENG | Claude Agent SDK: quando o harness do coding agent vira o seu produto | Devs, arquitetos | O rename do Claude Code SDK para Agent SDK (29/09/2025) e o que dá para construir com o mesmo loop de agente fora do terminal. | Sim | Agent Skills (16/10/2025), Claude Cowork |
| 20 | 2025-11-03 | ENG | Agent Skills: pacotes de contexto e o fim do prompt gigante | Devs, tech leads | Skills (16/10/2025) na prática: quando uma skill substitui uma instrução longa, como organizar e o paralelo com bibliotecas internas. | Sim | Skills como padrão aberto (18/12/2025) |
| 21 | 2025-11-24 | NEG | Do ChatGPT do dono ao processo da empresa: roteiro de adoção de IA para PME | Empresários | Um roteiro em quatro etapas (uso pessoal → tarefas do time → processo documentado → integração), com os dados do Sebrae 2025 sobre adoção (44%). | Sim (Sebrae 2025) | Sebrae 2026 (52%), Cetic TIC 2025 (divulgada em 2026) |

## 2026: agentes em todo lugar e os primeiros cases (17)

Os 22 itens já publicados (dez/2025 a jun/2026, todos ENG) entram nessa cadência. Por isso, 2026 tem menos ENG novo no 1º semestre.

| # | Data | Eixo | Título | Público | Resumo | Pesquisa? | Não pode citar |
|---|---|---|---|---|---|---|---|
| 22 | 2026-01-05 | ENG | Pi: um coding agent com quatro ferramentas e menos de mil tokens de prompt | Devs | O pi de Mario Zechner (npm 12/11/2025; post de 30/11/2025): a tese do harness mínimo (read, write, edit, bash) e o que ela revela sobre os agentes "completos". | Sim | Aquisição pela Earendil (08/04/2026), OpenClaw |
| 23 | 2026-01-19 | NEG | MCP como integração B2B: sua API agora precisa conversar com a IA do cliente | Empresários de SaaS, gestores de produto | O MCP virou padrão neutro (doado à Agentic AI Foundation em 09/12/2025). Se o cliente trabalha dentro do ChatGPT ou do Claude, o seu produto precisa estar lá como ferramenta. | Leve | MCP Apps (26/01/2026) |
| 24 | 2026-02-09 | ENG | OpenClaw e a semana em que todo mundo quis um agente pessoal | Devs, curiosos | Clawdbot → Moltbot → OpenClaw (25–29/01/2026): o que ele faz, os riscos de dar a um agente acesso às suas contas e por que ele roda sobre o pi. | Sim | Ida de Steinberger para a OpenAI (14/02/2026) |
| 25 | 2026-03-09 | ENG | Hermes Agent: memória, skills e um agente que "cresce com você". Funciona? | Devs | Teste do Hermes Agent (Nous Research, lançado em 25/02/2026): memória curada pelo próprio agente, criação automática de skills, auto-hospedagem e custo real. | Sim (data de lançamento só em fonte secundária) | Números de estrelas de abril em diante |
| 26 | 2026-03-23 | BAS | Nosso primeiro jogo no Roblox, pai e filho, com IA | Pais, curiosos, empresários | Como fizemos juntos o primeiro jogo: ele desenhava a ideia, eu operava a IA, ele testava. O que uma criança de 10 anos entende rápido sobre "dar instrução para a máquina". | **Dono** (data real, idade na época, ferramentas usadas) | Se usou o MCP do Studio, a data precisa ser ≥ 05/03/2026. "Studio agentic" só a partir de 15/04/2026 |
| 27 | 2026-04-06 | NEG | Paperclip e as "empresas sem humanos": o que aproveitar numa empresa de verdade | Empresários, gestores | O Paperclip (04/03/2026) orquestra agentes como se fossem uma empresa (org chart, metas, orçamento). O que é demonstração e o que vale copiar: papéis claros, orçamento por agente e trilha de auditoria. | Sim | Números de estrelas atuais (datar) |
| 28 | 2026-04-20 | BAS | Ele fez o próprio jogo sozinho, e o que eu não ensinei ele aprendeu | Pais, empresários | O segundo passo da série: o filho criando jogos sem o pai do lado. O que ele aprendeu sozinho (tentativa e erro, pedir de outro jeito) e o paralelo com times adotando IA. | **Dono** | Roblox Kids/Select (13/04/2026) só se for relevante e com a data certa |
| 29 | 2026-05-04 | BAS | Refazendo meu site com coding agents: de um export do Figma a Astro | Devs, tech leads | Os bastidores da migração deste site (Figma → Astro 6, Content Collections, Cloudflare), feita com agentes em abr/2026: plano em ondas, specs e o que precisou de mão humana. | Dono (git log de 26/04/2026 e docs/superpowers) | Evolução de marca de set/2026 |
| 30 | 2026-05-18 | NEG | GTM Engineering para escritórios de contabilidade e advocacia, dentro da ética | Sócios de escritórios | Qualificação de lead informativa, sem captação de causa (Provimento OAB 205/2021): sinais públicos (CNAE, regime), rubric explícito e teste de legítimo interesse da LGPD. | Sim | Nada da campanha de set/2026 |
| 31 | 2026-06-01 | BAS | Versionamento explicado para uma criança: git como "salvar o jogo" | Pais, devs, gestores | Como explicamos commit, branch e "voltar para antes de quebrar" com a metáfora do save game, e por que o mesmo argumento convence um diretor a versionar prompts e planilhas. | Dono | — |
| 32 | 2026-06-22 | NEG | Lead scoring com IA e LGPD: legítimo interesse sem teatro | Empresários, escritórios | O teste de balanceamento do guia da ANPD (02/02/2024) aplicado a enriquecimento e scoring com IA: o que registrar, o que evitar e como responder ao titular. | Sim | — |
| 33 | 2026-07-13 | BAS | Gerenciando contexto com uma criança: por que "explica de novo" é o bug mais comum | Pais, tech leads | O que a série ensinou sobre contexto: sessões curtas, um objetivo por vez, anotar o que já foi decidido. É exatamente o que funciona com coding agents num time. | Dono | — |
| 34 | 2026-08-10 | ENG | MCP 2026-07-28: o protocolo ficou stateless. O que muda para quem roda servidor na borda | Devs, arquitetos | A nova spec sem `initialize` nem `Mcp-Session-Id`, com `server/discover`, e o impacto em Workers e Durable Objects, com base no servidor da Reforma que estava sendo desenhado. | Sim | Detalhes do rt2026 em produção (só depois do lançamento) |
| 35 | 2026-08-24 | ENG | Grok Bot e agentes com computador próprio: o fim do "deixa o laptop aberto" | Devs, gestores | O Grok Bot (beta em 11/08/2026) coloca agentes sempre ligados, cada um com máquina na nuvem. O que muda em segurança, custo e supervisão quando o agente trabalha enquanto você dorme. | **Sim + Dono** (confirmar se "Grok Bot" é esse produto, o Grok Build CLI ou o @grok do X) | Grok 5 (não lançado) |
| 36 | 2026-09-21 | ENG | Jev e os modelos que não escrevem: decisão estruturada dentro de agentes | Devs, arquitetos | O Jev (TypeSafe AI, fora do stealth em 15/09/2026) responde perguntas tipadas com probabilidade calibrada em vez de gerar texto. Onde isso encaixa: roteamento, scoring e checagem. | **Sim + Dono** (confirmar se é o "Jev" que ele citou; o produto está em early access) | Resultados de uso em produção |
| 37 | 2026-09-24 | BAS | Uma campanha inteira com Claude Code: landing, formulário e e-mails em dias | Empresários, devs, marketing | Os bastidores da campanha "Simples Nacional: opte até 30/09, decida até 30/11": da tese à landing no ar, com Turnstile, D1, Resend e consentimentos separados. O que a IA fez e o que foi decisão humana. | Dono (datas reais, tempo gasto, custo) | Resultados da campanha (ainda não existem) |
| 38 | 2026-09-29 | BAS | Um servidor MCP sobre a calculadora oficial da Receita em um dia: o rt2026 por dentro | Devs, escritórios, empresários | Como a API oficial da RFB virou servidor MCP remoto (mcp.gusflopes.dev/rt2026): a IA conversa, o motor oficial calcula, e cada resposta traz a procedência. É um case técnico, sem recomendação tributária. | Dono (arquitetura final, limites, versão da spec MCP usada) | Métricas de uso (publicar numa parte 3, em out/2026) |

---

## Resumo por eixo e por ano

| Eixo | 2024 | 2025 | 2026 | Total |
|---|---|---|---|---|
| Engenharia & IA | 4 | 9 | 6 | 19 |
| Negócios | 2 | 6 | 4 | 12 |
| Bastidores | 0 | 0 | 7 | 7 |
| **Total** | 6 | 15 | 17 | **38** |

Contando também os 22 itens existentes (ENG), o site fecha set/2026 com cerca de 60 itens: 41 de Engenharia & IA, 12 de Negócios e 7 de Bastidores. O desequilíbrio para ENG é esperado porque ele reflete a trajetória real. Daqui para frente, a cadência sugerida é 2 ENG, 2 NEG e 1 BAS por mês.

## Ordem de produção sugerida (o que escrever primeiro)

A data de publicação e a ordem de escrita são coisas diferentes. Priorize pelo que gera resultado agora:

1. **#37 e #38 (Bastidores, Reforma)**: são o case vivo, dão conteúdo ao hub Bastidores (que hoje está vazio e com `noindex`) e alimentam o LinkedIn durante a campanha.
2. **#5 (IA conversa, software calcula)**: é o texto-manifesto do método, citado por #37 e #38 e pelo posicionamento com parceiros.
3. **#23, #30 e #18 (Negócios)**: com eles o eixo Negócios aparece no menu (o menu esconde eixo vazio) e passa a haver material para escritórios parceiros.
4. **#26 (primeiro texto da série família)**, junto com o vídeo do YouTube.
5. O resto, seguindo as datas.

## Pendências com o Gustavo

1. **Grok Bot** e **Jev**: confirmar quais produtos ele quis dizer (ver `docs/pesquisa/coding-agents.md`, "Dúvidas").
2. **Série família**: datas reais do primeiro jogo e dos jogos solo, idade do filho em cada momento, quais ferramentas de IA usaram, e o que pode ser mostrado (rosto, nome, tela).
3. **CalcJud**: quando foi construído, e se pode ser citado com nome e métricas.
4. **Campanha da Reforma**: datas reais de construção da landing e do MCP ("~1 dia"), custo e tempo, e o que pode ser divulgado.
5. **Datas retroativas**: decidir se adota o "Escrito em … / publicado aqui em …" (recomendado).

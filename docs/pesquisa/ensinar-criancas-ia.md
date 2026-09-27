# Ensinar uma criança de 10 anos a programar com IA: base de pesquisa

> Pesquisa feita em **26/09/2026** para a série do YouTube e do blog ("se ensino uma criança, imagine numa empresa").
> Regra: toda afirmação importante tem link e data da fonte. O que não foi possível confirmar em fonte primária está marcado **não confirmado**.
> As datas "(acesso 26/09/2026)" indicam páginas vivas sem data de publicação visível, como termos de uso e documentação.

---

## TL;DR para quem vai gravar

1. **Uma criança de 10 anos não pode ter conta própria no Claude nem no ChatGPT.** O Claude exige 18+ e o ChatGPT exige 13+, com autorização dos pais até os 18. O uso precisa ser **pela conta do pai, com ele ao lado**. Isso tem que aparecer no vídeo: é o que os termos exigem, e também é o exemplo certo a dar.
2. **O GitHub também exige 13+.** O repositório fica na conta do pai (o filho pode ser citado como autor nos commits, mas a conta é do pai).
3. **Roblox Studio + Luau é um bom ponto de partida.** O Studio é gratuito, não achamos nele uma idade mínima além da conta Roblox, e ele tem IA nativa: o Assistant, que desde 2026 aceita chave própria de Claude/OpenAI/Gemini e tem um **servidor MCP embutido** que conecta ao Claude Code. Dá para mostrar a mesma arquitetura "IA + ferramenta determinística" do projeto principal.
4. **Na pedagogia, a IA não deve entregar a resposta.** Há evidência experimental (PNAS, 2025) de que a IA sem guarda-corpo melhora o desempenho durante a prática e piora o aprendizado. Use a IA como tutor que dá dica, e peça para a criança **prever e explicar** o código (PRIMM).
5. **No Brasil, o ECA Digital (Lei 15.211/2025) está em vigor desde 17/03/2026.** Contas de até 16 anos devem ficar vinculadas a um responsável.

---

## 1. Roblox Studio e Luau

### O que são

- O **Roblox Studio** é o editor gratuito para criar "experiences" (jogos) no Roblox. A documentação oficial fica no Creator Hub: https://create.roblox.com/docs (acesso 26/09/2026).
- O **Luau** é a linguagem de script do Roblox. Nasceu do Lua 5.1 e continuou evoluindo com compatibilidade retroativa. Ganhou tipagem gradual e ficou mais rápida.
  - **Virou open source em 03/11/2021**, a partir da versão 0.501, sob **licença MIT**, com runtime, compilador, type checker e linter. Fonte: "Luau Goes Open-Source", https://luau.org/news/2021-11-03-luau-goes-open-source/ (03/11/2021). Anúncio no DevForum: https://devforum.roblox.com/t/luau-goes-open-source/1534471.
  - Repositório: https://github.com/luau-lang/luau. Site: https://luau.org.
- Por que funciona para criança:
  - O retorno é visual e imediato: a peça muda de cor, o personagem pula.
  - A sintaxe é curta.
  - Ela pode mostrar o jogo para os amigos.
  - O mesmo ambiente tem teto alto: o Luau é usado profissionalmente.

### IA dentro do Roblox Studio: linha do tempo

| Data | Marco | Fonte |
|---|---|---|
| out/2023 | "Assistant for Docs" (assistente na documentação) | citado no post de 01/12/2023, abaixo |
| 01/12/2023 | **Assistant in Studio (Beta)**: responde perguntas de documentação, gera e insere scripts, explica código e gera materiais. Limitação declarada: "não tem o contexto completo da cena" | https://devforum.roblox.com/t/introducing-assistant-in-studio-beta/2725977 |
| 2023 (beta) | **Code Assist Beta**: autocompletar de código com IA. Data exata do beta **não confirmada** (o fórum sugere 1º semestre de 2023) | https://devforum.roblox.com/t/code-assist-beta-ai-powered-code-completion/2224387 |
| 22/02/2024 | **Code Assist em release completo** (data vinda de resultado de busca e não conferida no post) | https://devforum.roblox.com/t/code-assist-full-release-ai-powered-code-completion/2848978 |
| 13/05/2025 | **Studio MCP Server open source** (prova de conceito): plugin + servidor que deixa Claude Desktop/Cursor inserir modelos da Creator Store e executar Luau no Studio | https://devforum.roblox.com/t/introducing-the-open-source-studio-mcp-server/3649365 · repo: https://github.com/Roblox/studio-rust-mcp-server |
| 21/02/2026 | **Assistant aceita chave de API própria** de Anthropic (Claude), OpenAI e Google Gemini. O servidor MCP ganha ferramentas de playtest (`get_console_output`, `start_stop_play`, `run_script_in_play_mode`) | https://devforum.roblox.com/t/studio-mcp-server-updates-and-external-llm-support-for-assistant/4415631 |
| 05/03/2026 | **Servidor MCP embutido no Studio**: tudo o que o Assistant faz vira ferramenta MCP. Tem automação de playtest (simula mouse, teclado e navegação do personagem). A Roblox cita Claude Code, VS Code, Cursor e Antigravity como clientes (data vinda de resultado de busca) | https://devforum.roblox.com/t/assistant-updates-studio-built-in-mcp-server-and-playtest-automation/4474643 |
| 09/04/2026 | Beta do **playtest agent** (Studio Assistant & MCP Playtest Agent) (data vinda de resultado de busca) | https://devforum.roblox.com/t/studio-beta-studio-assistant-mcp-playtest-agent/4566767 |
| 15/04/2026 | **"Roblox Studio is Going Agentic"**: Planning Mode com planos de vários passos, geração de mesh e modelos procedurais, playtesting agent (beta) e integração com Claude, Cursor e Codex via MCP. No roadmap: agentes em paralelo e fluxos longos na nuvem | https://about.roblox.com/newsroom/2026/04/roblox-studio-going-agentic |

**Estado atual pela documentação** (acesso 26/09/2026):

- **Assistant** (https://create.roblox.com/docs/assistant/guide):
  - Cria e edita scripts e instâncias.
  - Insere assets da Creator Store.
  - Gera materiais, meshes e modelos procedurais (limite de 50 gerações por 24h).
  - Analisa screenshots do viewport.
  - Tem **modo Plan** (`/plan`): gera um plano em Markdown editável antes de executar.
  - O histórico de chat fica salvo na nuvem e é privado do criador.
  - **A página não fala de idade mínima nem de verificação para usar o Assistant.** Requisito de idade do Assistant: **não confirmado**.
- **Servidor MCP** (https://create.roblox.com/docs/studio/mcp):
  - Ativação: Assistant → "…" → Manage MCP Servers → "Enable Studio as MCP server".
  - Transporte **stdio**, local.
  - Quick connect para Claude Code, Claude Desktop, Codex CLI, Gemini CLI, Cursor, VS Code e Antigravity.
  - Ferramentas: scripts, execução de Luau, exploração do data model, playtest, simulação de input e docs.
  - Aviso oficial: "only connect clients you trust".
- **Assistant e Studio são gratuitos.** Essa informação vem de fontes secundárias (ex.: blog obby.fun). A documentação oficial não fala de preço. **Não confirmado em fonte primária**, mas nenhuma cobrança aparece na documentação.
- **Ponto de atenção pedagógico:** no próprio anúncio de 21/02/2026, parte da comunidade de devs criticou que o recurso pode "desencorajar o aprendizado de iniciantes". Esse contraponto é útil no vídeo.

**Gancho para a série:** o fluxo "Claude Code (na conta do pai) → MCP do Roblox Studio → jogo do filho" mostra na prática a tese do projeto: a IA conversa e planeja, e a ferramenta determinística (o Studio/engine) executa e valida.

---

## 2. Termos de uso para menores: quem pode usar o quê

| Ferramenta | Idade mínima / regra | Fonte (data) |
|---|---|---|
| **Claude (Anthropic, consumidor)** | "You must be at least **18** years old or the minimum age required to consent to use the Services in your location, whichever is higher." | Consumer Terms, vigentes desde 08/10/2025: https://www.anthropic.com/legal/consumer-terms (acesso 26/09/2026) |
| Claude: verificação | Detecta sinais de uso por menor e **desativa a conta** até verificação etária via Yoti (selfie, documento ou Yoti Digital ID). A Anthropic recebe só "passou/não passou" | https://support.claude.com/en/articles/15171100-age-assurance-on-claude (atualizado em 18/05/2026) |
| Claude para menores via terceiros | Empresas que atendem menores podem usar a API com salvaguardas próprias (verificação, moderação, prompt de child-safety da Anthropic). **Claude for Teachers** é só para educadores, não para alunos | https://support.claude.com/en/articles/9307344-responsible-use-of-anthropic-s-models-guidelines-for-organizations-serving-minors · https://support.claude.com/en/articles/15926041-claude-for-teachers-your-data-and-our-terms (acesso 26/09/2026) |
| **ChatGPT (OpenAI)** | 13+ (ou a idade mínima do país). **Menores de 18 precisam de permissão dos pais ou responsável.** Menores de 13 não podem usar | Terms of Use: https://openai.com/policies/row-terms-of-use/ (texto obtido por resultado de busca; o site devolveu 403 ao acesso direto em 26/09/2026) |
| ChatGPT: controles parentais | Lançados em **29/09/2025**. O pai vincula a conta à do adolescente (os dois precisam aceitar) e pode definir horário de silêncio, ajustes e alertas de segurança | https://openai.com/index/introducing-parental-controls/ (29/09/2025; data vinda de resultado de busca, página com 403 no acesso direto) |
| ChatGPT: predição de idade | Rollout global anunciado em **20/01/2026**, com base em sinais da conta e de comportamento. Na dúvida, aplica a experiência de menor de 18. Correção via Persona (selfie/ID) | https://openai.com/index/our-approach-to-age-prediction/ · CNBC, 20/01/2026: https://www.cnbc.com/2026/01/20/open-ai-age-prediction-chatgpt.html |
| ChatGPT for Teens | Experiência para 13–17 anos | https://openai.com/index/chatgpt-for-teens/ (data **não confirmada**, página com 403) |
| **Gemini (Google)** | Menores de 13 **podem** usar o app Gemini em conta supervisionada pelo **Family Link**, se o pai ativar (Controls > Gemini). Não disponível para contas supervisionadas no EEE, na Suíça e no Reino Unido. O Google alerta que os filtros "não são perfeitos", que a IA pode alucinar e que o pai deve explicar que "é uma ferramenta, não uma pessoa em quem confiar" | https://support.google.com/gemini/answer/16109150 (acesso 26/09/2026) |
| **Microsoft Copilot (consumidor)** | 13+ em geral, maior em alguns países. Menores de 18 têm conversas fora do treino e sem personalização | https://support.microsoft.com/en-us/microsoft-copilot/microsoft-copilot-age-limits-and-parental-controls (acesso 26/09/2026). Idade específica para o Brasil: **não confirmada** (a página não lista) |
| **GitHub** (e, por extensão, GitHub Copilot) | "You must be age **13** or older." "We do not permit any Users under 13" | https://docs.github.com/en/site-policy/github-terms/github-terms-of-service (acesso 26/09/2026) |
| **Roblox / Roblox Studio** | Não encontramos idade mínima para usar o Studio. Colaboração (Team Create) com gente de fora da faixa etária exige verificação e, para menores de 16, permissão dos pais via conta vinculada | https://en.help.roblox.com/hc/en-us/articles/45500519296532-Age-Guidelines-for-Collaborating-in-Roblox-Studio (conteúdo via resultado de busca; a página devolveu 403). Idade para o **Assistant**: **não confirmada** |

**Implicação para a série:**

- O filho de 10 anos **não pode** ter conta própria no Claude, no ChatGPT, no Copilot nem no GitHub.
- O modelo correto é **"pai no teclado, filho no comando das ideias"**:
  - o pai opera a conta dele (Claude Code, GitHub);
  - a criança dita, prevê, testa e decide.
- No Roblox, a conta da criança pode existir, com controles parentais e conta de pai vinculada.
- Dizer isso explicitamente no vídeo protege juridicamente e reforça a mensagem de responsabilidade.

---

## 3. Segurança e controle parental (Roblox e Brasil)

### Roblox

- **18/11/2024**: menores de 13 perdem DM fora de jogos. Pais passam a gerenciar controles **do próprio dispositivo** (tempo de tela, limite de gastos, atividade). Fonte: https://about.roblox.com/newsroom/2024/11/major-updates-to-our-safety-systems-and-parental-controls (nov/2024).
- **Nov/2025**: anúncio de que a verificação de idade será obrigatória para o chat, começando em alguns mercados em dezembro. Fonte: https://about.roblox.com/newsroom/2025/11/roblox-requires-age-checks-limits-minor-and-adult-chat.
- **07/01/2026**: **estimativa facial de idade obrigatória para usar o chat no mundo todo**. Fonte: https://about.roblox.com/newsroom/2026/01/roblox-age-checks-required-to-chat (07/01/2026).
  - Faixas: menos de 9, 9–12, 13–15, 16–17, 18–20 e 21+. Cada faixa conversa com a própria e as vizinhas.
  - Menores de 9 precisam de consentimento dos pais para o chat.
  - As imagens são apagadas logo após o processamento.
  - Fornecedor: Persona, com erro médio de 1,4 ano para menores de 18 (certificação ACCS do Reino Unido).
  - **Uma criança de 10 anos fica na faixa 9–12.**
- **13/04/2026**: contas por idade. **Roblox Kids** (5–8 anos): comunicação desligada por padrão, só jogos Minimal/Mild. **Roblox Select** (9–15 anos): jogos até Moderate. Rollout previsto para o início de junho de 2026. Pais podem bloquear jogos específicos e gerir chat direto até os 15 anos. Fonte: https://about.roblox.com/newsroom/2026/04/introducing-roblox-kids-and-select-accounts (13/04/2026). O anúncio **não fala do Studio**. Impacto do Roblox Select no uso do Studio: **não confirmado**.
- Visão geral dos controles: https://en.help.roblox.com/hc/en-us/articles/30428310121620-Parental-Controls-Overview.

### Brasil: ECA Digital (Lei 15.211/2025)

- **Sancionada em 17/09/2025. Em vigor desde 17/03/2026.** Texto: https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2025/lei/l15211.htm. Notícia: Senado, 17/03/2026, https://www12.senado.leg.br/noticias/materias/2026/03/17/eca-digital-para-protecao-on-line-de-criancas-e-adolescentes-entra-em-vigor.
- **Alcance**: vale para produtos e serviços digitais "direcionados a" crianças e adolescentes ou "de acesso provável" por eles, inclusive de empresas estrangeiras (redes sociais, apps, jogos, lojas de apps, sistemas operacionais).
- **Contas de até 16 anos devem estar vinculadas à conta de um responsável legal.** Os provedores devem oferecer ferramentas de supervisão parental fáceis de usar.
- **Acaba a autodeclaração de idade** para conteúdo restrito a menores de 18: passa a ser exigida verificação etária efetiva.
- **Fiscalização da ANPD.** Multa de até 10% do faturamento do grupo ou R$ 50 milhões por infração. Fonte: Lefosse, "ECA Digital entra em vigor em 17 de março": https://lefosse.com/noticias/alerta/eca-digital-entra-em-vigor-em-17-de-marco-como-se-preparar/ (2026).
- Regras específicas sobre loot boxes em jogos: citadas em análises, mas **não confirmadas** aqui. Conferir o artigo exato no texto do Planalto antes de publicar.

---

## 4. Boas práticas pedagógicas (com fonte)

- **UNESCO, "Guidance for generative AI in education and research"** (set/2023). Propõe **idade mínima de 13 anos para uso independente** de IA generativa em sala e pede proteção de dados e formação de professores. https://www.unesco.org/en/articles/guidance-generative-ai-education-and-research. O ponto conversa bem com a série: aos 10 anos, **uso mediado por adulto**, nunca independente.
- **UNICEF, "Guidance on AI and Children 3.0"** (dez/2025). Dez requisitos para uma IA centrada na criança: segurança, privacidade, transparência, bem-estar, preparar a criança para a IA etc. https://www.unicef.org/innocenti/reports/policy-guidance-ai-children · PDF: https://www.unicef.org/innocenti/media/11991/file/UNICEF-Innocenti-Guidance-on-AI-and-Children-3-2025.pdf.
- **TeachAI (Code.org, ETS, ISTE, Khan Academy, WEF), "AI Guidance for Schools Toolkit"** (17/10/2023). Princípios: propósito, conformidade, letramento em IA, equilíbrio, integridade e **agência humana** (a decisão continua com a pessoa). https://www.teachai.org/toolkit.
- **Evidência de risco: PNAS 2025.** Bastani et al., "Generative AI without guardrails can harm learning". Em cerca de mil alunos de ensino médio (matemática), o GPT-4 "puro" melhorou o desempenho durante a prática, e os alunos foram **pior quando a IA foi retirada**. O tutor com prompt que **dá dicas em vez de respostas** mitigou o efeito. https://www.pnas.org/doi/10.1073/pnas.2422633122. **É o argumento científico para configurar a IA como tutor.**
- **Construcionismo e Scratch: Mitchel Resnick (MIT Media Lab).**
  - Os "4 Ps": Projects, Passion, Peers, Play.
  - Ferramentas com **low floor, high ceiling, wide walls**. Ensaio: https://mres.medium.com/designing-for-wide-walls-323bdb4e7277.
  - Sobre IA: "Generative AI and Creative Learning: Concerns, Opportunities, and Choices" (primeira versão em abr/2023, depois publicado pela MIT Press). Defende a IA como parceira em projetos de interesse da criança, sem substituir a criação. https://mit-genai.pubpub.org/pub/gj6eod3e/release/2.
- **PRIMM (Predict, Run, Investigate, Modify, Make)**, de Sue Sentance e Jane Waite (King's College London). O aluno **lê e prevê** o que um código faz antes de escrever. Base em Vygotsky (zona de desenvolvimento proximal). Sentance, Waite & Kallia, *Computer Science Education* 29(2-3), 2019: https://www.tandfonline.com/doi/abs/10.1080/08993408.2019.1608781 · projeto: https://suesentance.net/primm-project/.
  - **Adaptação para a IA:** a IA gera o script → a criança **prevê** o que ele faz → roda → investiga → modifica → faz o próximo sozinha.
- **Pair programming** (pai "navegador", filho "piloto", ou o contrário): é prática consolidada, mas **não levantamos aqui um estudo específico para crianças de 10 anos**. Citar como prática, sem número.

### Regras práticas para a série (derivadas das fontes acima)

1. A IA explica e dá dica; a criança digita e decide. Configurar o prompt ou as instruções do projeto para "não entregar a solução completa; faça perguntas" (linha Bastani 2025).
2. Antes de rodar qualquer coisa que a IA escreveu: "o que você acha que vai acontecer?" (PRIMM).
3. Projetos que a criança escolheu (Resnick): o jogo dela, não um exercício.
4. Sessões curtas, com o pai presente. A conta de IA é do pai (termos de uso + UNESCO).
5. Mostrar erros e alucinações da IA como parte da aula: "a IA errou; como descobrimos?"

---

## 5. Ideias de progressão (10 anos → adolescência)

Proposta editorial em estágios. Não é um currículo validado.

| Estágio | Objetivo | Ferramentas | Conceito "de empresa" que espelha |
|---|---|---|---|
| 1. Brincar e ler | Mudar propriedades, ler scripts prontos, prever o comportamento (PRIMM) | Roblox Studio, Luau básico | Entender o sistema antes de mexer |
| 2. Pedir bem | Descrever o que quer em frases claras. Comparar pedido vago com pedido específico no Assistant (Planning Mode) | Assistant do Studio | Especificação / briefing |
| 3. Dar contexto | Criar um arquivo "sobre o meu jogo" (regras, nomes, objetivos) para a IA ler. Mostrar como o resultado melhora | Doc de texto → evolui para `AGENTS.md`/`CLAUDE.md` | Documentação de projeto, contexto para agentes |
| 4. Organizar o projeto | Pastas, nomes de scripts, um script por responsabilidade. Checklist de "pronto" | Studio + Rojo (opcional, sincroniza arquivos com o Studio; **confirmar compatibilidade atual antes de recomendar**) | Arquitetura, definição de pronto |
| 5. Salvar versões | "Foto do jogo" antes de cada mudança grande. Voltar quando a IA quebrar algo | git local na máquina do pai. **Repositório no GitHub na conta do pai** (GitHub exige 13+) | Versionamento, rollback |
| 6. IA agente com ferramentas | Claude Code (conta do pai) conectado ao **MCP do Roblox Studio**: a IA planeja, edita e roda playtest, e a criança valida | Claude Code + Studio MCP | "IA conversa, software determinístico executa" |
| 7. Testar e medir | Playtest automatizado vs. teste manual; a criança escreve o que "deveria acontecer" | Playtest agent (beta) | QA, critérios de aceite |

---

## Dúvidas para o Gustavo confirmar

1. **Conta e idade:** confirmar que todo uso de Claude/Claude Code/ChatGPT/GitHub no vídeo será pela conta dele, com ele presente. Os termos proíbem conta própria para 10 anos. Vale até colocar um aviso na tela.
2. **Roblox Assistant:** não achamos uma exigência de idade explícita para o Assistant. Vale testar na conta do filho (faixa 9–12 / Roblox Select) se o Assistant e a geração de assets aparecem, e registrar isso no vídeo.
3. **Chave de API própria no Assistant (Claude):** usar a chave dele no Studio da criança deixa o uso técnico "na conta do pai". Avaliar se isso fica claro no roteiro e cuidar para a chave não ficar exposta à criança.
4. **Rojo/git:** decidir se a série entra em git "de verdade" (Rojo + VS Code) ou fica no versionamento nativo do Studio no começo. A compatibilidade atual do Rojo não foi verificada.
5. **Publicar o jogo do filho no Roblox:** atenção a chat, monetização e ECA Digital (conta vinculada até os 16). Recomenda-se revisar as configurações de controle parental antes de publicar.

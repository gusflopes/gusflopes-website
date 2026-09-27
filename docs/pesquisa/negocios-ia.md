# Pesquisa: negócios + IA (GTM Engineering, qualificação de lead, PMEs brasileiras)

- Data da pesquisa: **26/09/2026**
- Finalidade: base factual para artigos de negócio em gusflopes.dev.
- Convenção: cada afirmação importante tem link e data da fonte. "Não confirmado" = não achei fonte primária confiável. Métricas publicadas por fornecedor (vendor) estão marcadas como **[vendor]**, porque são autodeclaradas e não auditadas.

---

## 1. GTM Engineering

### 1.1 Origem do termo

- **Clay afirma ter cunhado o termo em 2023.** O guia oficial da Clay diz que a empresa criou o termo "GTM Engineering" em 2023 — [Clay, "GTM Engineering: What It Is and How to Hire in 2026", 21/04/2026](https://www.clay.com/blog/gtm-engineering). **[vendor]**
- Fontes secundárias atribuem o uso inicial aos cofundadores da Clay, **Kareem Amin (CEO) e Varun Anand**, em 2023, como nome para o que os melhores usuários da Clay faziam — [nrich.io, perfil da Clay](https://nrich.io/challenger-brand-gtm-library/clay) e [Stacksync, origem da Clay](https://www.stacksync.com/blog/six-years-of-obscurity-then-100m-arr-the-origin-story-of-clay) (datas das páginas não confirmadas).
- Ressalva para o artigo: "a Clay cunhou/popularizou" está bem sustentado como **popularização**. Que ninguém tenha usado a expressão antes de 2023 é **não confirmado** (não achei estudo independente sobre a origem). Sugestão de redação: "termo popularizado pela Clay a partir de 2023".

### 1.2 O que é e como funciona

- Definição da Clay: construir sistemas de receita automatizados com IA, enriquecimento de dados e automação de fluxos, atendendo RevOps, Growth e Customer Success. Três níveis: **base de dados** (CRM limpo e sem duplicidade), **modelagem** (scores de propensão, atributos de ICP) e **ativação** (fluxos automáticos de receita). Normalmente fica dentro de RevOps e depois se espalha para outras áreas — [Clay, 21/04/2026](https://www.clay.com/blog/gtm-engineering). **[vendor]**
- Ferramentas citadas pela Clay: a própria Clay como orquestrador, CRMs, plataformas de e-mail, data warehouses, provedores de sinais, **n8n, Zapier e coding agents** — mesma fonte.
- Em resumo: é engenharia de software aplicada a vendas e marketing, com workflows versionados, experimentos e dados de sinais (vaga aberta, rodada de investimento, visita ao site, tecnologia usada), mais enriquecimento em cascata (vários provedores de dados até achar o campo), scoring e ativação (roteamento no CRM, sequência de e-mail, alerta no Slack).

### 1.3 Mercado de trabalho e salários

- Cerca de **100 vagas de "GTM Engineer" publicadas por mês**, segundo a Clay — [Clay, 21/04/2026](https://www.clay.com/blog/gtm-engineering). **[vendor]**
- Análise de **1.394 vagas, 1.966 profissionais e 1.084 empresas**: outbound é 34,3% das vagas; **53% das vagas de GTME de outbound citam Clay**; 64% das vagas de RevOps Systems citam Salesforce; **31% das vagas de "AI Accelerator" citam o Claude pelo nome**; o único perfil com escassez real é o de "AI Enablement Engineer" (47 vagas para 36 profissionais) — [GTM Council (Substack), "Analysis of 1,394 GTM Engineer Roles", 11/07/2026](https://gtmcouncil.substack.com/p/analysis-of-1394-gtm-engineer-roles). Observação: a URL cita Andy Mowat, mas a página lida atribui o texto a Mada Seghete; **confirmar a autoria antes de citar**.
- **Salários: não confirmado.** Nenhuma das duas fontes acima traz faixa salarial. Não achei dado brasileiro.

### 1.4 Clay (empresa) — números para contextualizar

- Series C de **US$ 100 milhões com valuation de US$ 3,1 bilhões**, liderada pela CapitalG. Na época, o CEO disse que esperava fechar 2025 com **US$ 100 milhões de receita**. Clientes citados: OpenAI, Anthropic, Canva, Intercom e Rippling — [TechCrunch, 05/08/2025](https://techcrunch.com/2025/08/05/clay-confirms-it-closed-100m-round-at-3-1b-valuation).
- Valuation de US$ 5 bi (tender oferecido a funcionários, jan/2026), Series D de US$ 115 mi a US$ 7,1 bi (2026) e ARR de US$ 150 mi em mai/2026: vieram de resultados de busca que agregam [Sacra](https://sacra.com/c/clay/) e [Clay dossier](https://www.clay.com/dossier/clay-funding). **Não confirmado** em fonte primária de imprensa. Se for usar, verificar antes.

### 1.5 Ferramentas relacionadas (só o essencial)

| Ferramenta | O que é | Fonte |
|---|---|---|
| Clay | Planilha/orquestrador de enriquecimento em cascata com IA ("Claygent") e ativação | [clay.com](https://www.clay.com) |
| HubSpot Breeze Intelligence (ex-Clearbit) | A HubSpot comprou a Clearbit (nov/2023) e lançou o Breeze Intelligence em **18/09/2024**, com enriquecimento e intenção de compra dentro do HubSpot | [Business Wire, 18/09/2024](https://www.businesswire.com/news/home/20240918001493/en) |
| Apollo.io | Base de contatos B2B com engajamento (sequências) | [apollo.io](https://www.apollo.io) — detalhes não pesquisados |
| Unify | Plataforma de outbound baseado em sinais | [unifygtm.com](https://www.unifygtm.com) — detalhes não pesquisados |
| Common Room | Sinais de comunidade/produto/web para identificar contas | [commonroom.io](https://www.commonroom.io) — detalhes não pesquisados |
| n8n | Automação de workflows *fair-code*, que pode rodar no próprio servidor. A Clay cita como ferramenta de GTME | [n8n.io](https://n8n.io); [Clay](https://www.clay.com/blog/gtm-engineering) |

Nota: para o público brasileiro, vale citar que várias dessas bases de contatos têm cobertura fraca de PMEs no Brasil. **Não confirmado** com dado — é uma hipótese a validar na prática.

---

## 2. Qualificação de lead com IA

### 2.1 Frameworks clássicos

- **BANT** (Budget, Authority, Need, Timeline): a origem é atribuída à **IBM**, mas as fontes divergem entre **anos 1950 e 1960**, e todas são blogs de fornecedores sem fonte primária da IBM — ex.: [Mailchimp](https://mailchimp.com/resources/what-is-bant/), [Pipedrive](https://www.pipedrive.com/en/blog/bant). Datação precisa: **não confirmada**. Sugestão de redação: "atribuído à IBM, em meados do século XX".
- **MEDDIC** (Metrics, Economic buyer, Decision criteria, Decision process, Identify pain, Champion): criado em **1996 na PTC** por **Dick Dunkel**, com Jack Napoli, sob o SVP John McMahon. Relato: a PTC teria passado de ~US$ 300 mi para US$ 1 bi em vendas em quatro anos — [MEDDICC, "Who created MEDDIC?"](https://meddicc.com/resources/who-created-meddic) (site ligado a Andy Whyte, coautor do livro *MEDDICC* com Dunkel e Napoli — [livro](https://www.everand.com/book/507037901/MEDDICC-The-ultimate-guide-to-staying-one-step-ahead-in-the-complex-sale)). O crescimento de US$ 300 mi para US$ 1 bi é narrativa dos próprios autores: **não auditado**.
- Variações: **MEDDPICC** acrescenta Paper process e Competition — [MEDDICC](https://meddicc.com/meddpicc-sales-methodology-and-process).

### 2.2 Enriquecimento e scoring com LLM — como funciona

Padrão técnico (síntese das fontes abaixo; é descrição, não dado):
1. **Captura**: formulário ou cadastro (inbound) ou lista de contas-alvo (outbound).
2. **Enriquecimento**: bases de dados (firmográficos) + pesquisa web por agente (site da empresa, vagas, notícias). No Brasil, dados públicos de CNPJ (Receita Federal) são uma fonte natural para PME.
3. **Qualificação**: o LLM aplica um rubric (BANT/MEDDIC/ICP) e devolve **saída estruturada** (JSON com campos e justificativa), e não texto livre.
4. **Roteamento com humano no loop**: alerta no Slack/CRM, rascunho de resposta e aprovação humana.

Casos com números publicados:
- **Vercel — lead agent**: o agente de qualificação de inbound reduziu o time de SDRs de inbound de **10 para 1** (outra fonte diz ~1,25), com ROI de **32x**. Custo: **divergente entre fontes** — ~US$ 60 mil/ano incluindo engenharia + APIs ([Drew Bredvick, engenheiro de GTM da Vercel, 23/01/2026](https://drew.tech/posts/building-vercels-first-gtm-agent)) contra ~US$ 5 mil/ano só infraestrutura + tokens ([SaaStr, entrevista com a COO Jeanne DeWitt Grosser](https://www.saastr.com/vercel-took-a-10-person-sdr-team-down-to-1-the-whole-thing-costs-5000-a-year-with-vercels-coo-jeanne-dewitt-grosser/), data do post não confirmada). Lançado em **ago/2025**; prototipado em um fim de semana e colocado em produção em 6 semanas, rodando em *shadow mode* com a melhor SDR revisando as saídas. Método: "acompanhe sua melhor pessoa, codifique o que ela faz, faça QA até superá-la". Código aberto como referência: [vercel-labs/lead-agent](https://github.com/vercel-labs/lead-agent). **[autodeclarado pela empresa]**
- **Anthropic + Clay**: a Anthropic triplicou a cobertura de enriquecimento de leads inbound para quase 100%, com enriquecimento, scoring e sinalização antes do Salesforce — [Clay customer story](https://www.clay.com/customers/anthropic) (data não confirmada). **[vendor]**
- Pesquisa acadêmica: modelo de ML (Gradient Boosting) para lead scoring B2B com dados reais de CRM (2020–2024) — [PMC / Frontiers in AI, 2025](https://pmc.ncbi.nlm.nih.gov/articles/PMC11925937/). Atenção: é ML clássico, **não LLM**. Artigo arXiv sobre ranking de leads com LLM por preferência hierárquica, que discute por que LLMs genéricos são ruins para gerar scores comparáveis — [arXiv 2606.04387](https://arxiv.org/html/2606.04387) (preprint, sem revisão por pares).
- Estatísticas genéricas ("IA melhora a qualificação em 40%", "75% das empresas usam scoring com IA"): aparecem em blogs de fornecedores sem metodologia. **Não usar** — não confirmado.

### 2.3 Riscos

- **Alucinação no enriquecimento**: o agente pode inventar um cargo ou um porte de empresa. Mitigação: saída estruturada, citação da fonte por campo e humano no loop (é o próprio desenho da Vercel acima).
- **Viés do ICP**: o scoring reproduz o histórico de fechamento e pode descartar segmentos novos.
- **Custo de tokens com enriquecimento em cascata**: medir custo por lead qualificado.
- **Paralelo com a tese do projeto**: "IA conversa, software determinístico calcula" vale aqui também. Regras de ICP/qualificação explícitas, com o LLM só extraindo e classificando.

### 2.4 LGPD

- A ANPD publicou em **02/02/2024** o *Guia Orientativo — Hipóteses legais de tratamento de dados pessoais: Legítimo Interesse*, com teste de balanceamento em três fases (finalidade; necessidade; balanceamento e salvaguardas). O legítimo interesse **não se aplica a dados sensíveis** — [ANPD, notícia](https://www.gov.br/anpd/pt-br/assuntos/noticias/anpd-lanca-guia-orientativo-sobre-legitimo-interesse); [PDF do guia](https://www.gov.br/anpd/pt-br/centrais-de-conteudo/materiais-educativos-e-publicacoes/guia_legitimo_interesse.pdf).
- Aplicação a prospecção B2B e enriquecimento de contato de pessoa física (nome, cargo, e-mail corporativo): a base legal mais citada é o legítimo interesse, **com teste documentado, transparência e opt-out**. Não achei posição específica da ANPD sobre enriquecimento com IA/data brokers: **não confirmado**. Dados de CNPJ são de pessoa jurídica, mas o QSA (quadro societário) contém dados de pessoa física, e isso vale uma nota no artigo.

---

## 3. IA em PMEs brasileiras — dados de adoção

Atenção: as pesquisas medem coisas diferentes (universo, porte, pergunta). **Não compare os percentuais diretamente.**

| Pesquisa | Universo | Resultado | Fonte |
|---|---|---|---|
| **Sebrae — Transformação Digital nos Pequenos Negócios 2026** | 7.182 MEI/ME/EPP, coleta de 24/03 a 08/05/2026 | **52%** usaram ferramentas de IA nas duas semanas anteriores à entrevista; 60% pretendem adotar/expandir no semestre seguinte (EUA: 21% e 24%); 38% dos que não usam citam falta de conhecimento; em 90% dos que adotaram, o quadro de pessoal não mudou em 6 meses | [Estado de Minas, set/2026](https://www.em.com.br/mundo-corporativo/2026/09/7507917-uso-de-ia-por-pequenos-negocios-atinge-52-no-brasil.html) (divulgação em 17/08/2026, segundo resultado de busca; **fonte primária do Sebrae não lida**) |
| **Sebrae — Transformação Digital nos Pequenos Negócios 2025** | pequenos negócios | **44%** usam IA; EPP 65%, MEI 35%; entre usuários, 51% usam IA generativa de texto (ChatGPT, DeepSeek, Copilot, Gemini), 41% chatbot de WhatsApp, 30% chatbot de vendas; pós-graduados 75%; até 34 anos 56% | [CNN Brasil, jun/2025](https://www.cnnbrasil.com.br/economia/macroeconomia/44-dos-pequenos-negocios-usam-inteligencia-artificial-diz-sebrae/) |
| **Cetic.br — TIC Empresas 2025** | 4.174 empresas com **10+ empregados**, coleta de fev/2025 a jan/2026 | Uso de IA: **17%** (13% em 2024); pequenas (10–49): **15%** (10%); grandes (250+): **50%** (38%). Geração de linguagem natural entre usuárias de IA: 20% → 30%. 80% compraram software pronto | [Cetic.br, 15/06/2026](https://cetic.br/pt/noticia/uso-de-inteligencia-artificial-por-empresas-brasileiras-avanca-e-atinge-17-aponta-pesquisa-do-cetic-br/) |
| **IBGE — PINTEC Semestral (tecnologias avançadas)** | Indústria, empresas com **100+ pessoas ocupadas** | IA: **16,9% (2022) → 41,9% (1º sem. 2024)**; de 1.619 para 4.261 empresas (+163%); 500+ PO: 57,5%. Usos: administração 87,9%, comercialização 75,2%. Obstáculo principal: custo alto (78,6% das que usam; 74,3% das que não usam); falta de pessoal qualificado: 54,2% / 60,6% | [Agência Brasil, set/2025](https://agenciabrasil.ebc.com.br/economia/noticia/2025-09/numero-de-empresas-industriais-que-usam-ia-cresce-163-em-dois-anos-0); [Agência IBGE](https://agenciadenoticias.ibge.gov.br/agencia-noticias/2012-agencia-de-noticias/noticias/44551-de-2022-a-2024-percentual-de-empresas-industriais-utilizando-inteligencia-artificial-subiu-de-16-9-para-41-9) (retornou 403 no fetch; números conferidos pela Agência Brasil) |

Leitura para o artigo: pesquisas **declaratórias com MEI** (Sebrae) mostram uso alto de ferramentas gratuitas (ChatGPT, WhatsApp). Pesquisas **institucionais** (Cetic, IBGE) mostram adoção empresarial estruturada ainda baixa em pequenas. O espaço entre "o dono usa ChatGPT" e "a empresa tem processo com IA" é exatamente o argumento de negócio.

Outros dados vistos, mas não verificados: pesquisa Sebrae/FGV "Perspectivas Digitais nos Negócios" (4.967 empresas, mar/2026; 54,2% esperam vender mais com ferramentas digitais) — só em resultado de busca, **não confirmado**. Programa "Negócio em dIA" (Google, Sebrae, Itaú, Tera) — **não confirmado**, sem data verificada.

---

## 4. Casos reais e métricas publicadas (resumo)

| Caso | Métrica | Tipo | Fonte |
|---|---|---|---|
| Vercel — lead agent | Inbound SDR 10 → 1; ROI 32x; ~US$ 60 mil/ano (com engenharia) ou ~US$ 5 mil/ano (só infra/tokens) | autodeclarado | [drew.tech, 23/01/2026](https://drew.tech/posts/building-vercels-first-gtm-agent); [SaaStr](https://www.saastr.com/vercel-took-a-10-person-sdr-team-down-to-1-the-whole-thing-costs-5000-a-year-with-vercels-coo-jeanne-dewitt-grosser/) |
| Vercel — suporte/conteúdo | Agente cobre 93% dos casos técnicos de suporte; 96% das atualizações de conteúdo | autodeclarado | [SaaStr](https://www.saastr.com/how-vercel-runs-on-ai-agents-96-of-marketing-93-of-support-and-an-sdr-team-reabsorbed-a-deep-dive-with-cpo-tom-occhino/) |
| Anthropic com Clay | Cobertura de enriquecimento inbound 3x, perto de 100% | vendor | [clay.com/customers/anthropic](https://www.clay.com/customers/anthropic) |
| Clay (empresa) | Receita esperada de US$ 100 mi em 2025 (3x ano a ano) | declaração do CEO à imprensa | [TechCrunch, 05/08/2025](https://techcrunch.com/2025/08/05/clay-confirms-it-closed-100m-round-at-3-1b-valuation) |

Casos brasileiros de PME com métricas publicadas: **não encontrei fonte confiável** nesta rodada. Sugestão: produzir o próprio caso (ver tema 5.5).

---

## 5. Cinco outros temas de negócio com potencial

1. **"Contador aumentado": IA no escritório contábil durante a transição da reforma tributária.** Triagem de clientes do Simples por impacto de IBS/CBS, com o motor oficial calculando e a IA explicando. Reforça "parceiro, nunca concorrente".
2. **MCP como integração B2B: transformar a API da empresa em ferramenta para a IA do cliente.** Caso próprio: Calculadora RTC da RFB exposta como servidor MCP. Liga com a frase da Vercel de que produto sem API/MCP fica "invisível" para fluxos agênticos ([SaaStr](https://www.saastr.com/how-vercel-runs-on-ai-agents-96-of-marketing-93-of-support-and-an-sdr-team-reabsorbed-a-deep-dive-with-cpo-tom-occhino/)).
3. **GTM Engineering para escritórios de contabilidade e advocacia (dentro da ética OAB).** Qualificação de lead informativa, sem captação: sinais públicos (CNPJ, CNAE, regime tributário), rubric explícito e LGPD com teste de legítimo interesse documentado. Cuidado: Provimento OAB 205/2021 no caso de advocacia.
4. **"IA conversa, software calcula": onde não usar LLM em processos financeiros e fiscais.** Custos de erro, determinismo, trilha de auditoria e procedência. Serve como artigo-manifesto do método (CalcJud/Simulador).
5. **Do ChatGPT do dono ao processo da empresa: um roteiro de adoção de IA para PME brasileira.** Usa o contraste entre Sebrae (52% usam) e Cetic (15% das pequenas com 10+ empregados). Barreiras medidas: custo (IBGE) e falta de conhecimento (Sebrae). Pode virar um caso próprio documentado com métricas, suprindo a falta de casos brasileiros publicados.

---

## Dúvidas para o Gustavo

- Quer citar números de valuation/ARR da Clay de 2026? Só o de 2025 (TechCrunch) está confirmado em imprensa primária.
- Autoria do post do GTM Council (Andy Mowat x Mada Seghete): confirmar antes de citar.
- A Vercel tem dois números de custo (US$ 5 mil x US$ 60 mil/ano). Recomendo citar os dois com o escopo de cada um.
- Sebrae 2026 (52%): vale buscar o PDF/release oficial no Sebrae/DataSebrae antes de publicar. Li só a matéria do Estado de Minas.

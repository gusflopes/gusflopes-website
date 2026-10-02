---
title: "Um servidor MCP sobre a calculadora oficial da Receita em um dia: o rt2026 por dentro"
excerpt: "Como a Calculadora RTC da Receita Federal virou um servidor MCP remoto: a IA conversa, o motor oficial calcula e cada resposta traz a procedência. Um case técnico: de seis para onze tools em dois dias, acesso gratuito por chave automática e o teste com agente real que mudou as instruções do servidor."
date: "2026-09-29"
duration: "8 min"
category: "Casos"
eixo: "bastidores"
tags: ["mcp", "cloudflare", "claude-code", "reforma-tributaria"]
image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1080&q=80"
---

No [texto anterior](/insights/article/campanha-inteira-com-claude-code) contei como a campanha "opte até 30/09, decida até 30/11" foi ao ar numa noite. No meio dela, às 21h23 de 26/09, entrou no repositório algo que estava planejado para depois: o **rt2026**, um servidor MCP remoto sobre a calculadora oficial de IBS e CBS da Receita Federal. Ele está em `mcp.gusflopes.dev/rt2026`, aberto e gratuito.

O objetivo não é vender uma calculadora. É um experimento público: mostrar, para quem não é de tecnologia, o quanto a mesma IA que a pessoa já usa melhora quando recebe a ferramenta certa e o contexto certo.

Este é um relato técnico. Não explica regra tributária nem recomenda nada a nenhuma empresa. O assunto é a arquitetura, e um erro de comportamento que só apareceu quando pus um agente de verdade para usar o servidor.

## A tese: a IA conversa, o software calcula

Uso a mesma regra em tudo o que construo com IA em áreas reguladas: **o modelo conduz a conversa, e um software determinístico faz a conta.** Um LLM é ótimo para entender "vendo mais para empresa ou para consumidor final?" e péssimo para garantir que 0,9% de uma base dê sempre o mesmo resultado, com a mesma regra, auditável.

No caso da reforma, o software determinístico já existe e é oficial: a Calculadora RTC da Receita, com API aberta e especificação OpenAPI publicada. Por isso a primeira regra do projeto é **"nunca calcular tributo no nosso código"**. O servidor monta a operação, chama o motor oficial e agrega o resultado. Somar débitos e créditos que o motor devolveu é agregação. Aplicar alíquota, não: isso é sempre com o motor.

E por que MCP? Porque o empresário já usa uma IA (Claude, ChatGPT, Cursor) e não quer outra. MCP é o protocolo que deixa qualquer uma delas chamar ferramentas externas. Em vez de construir um chat, eu entrego ferramentas para o assistente que a pessoa já tem.

## Reusar antes de construir

Antes de escrever qualquer coisa, olhei o que já existia. Existe um servidor MCP em Python sobre a mesma API, o [mcp-calculadora-rtc](https://github.com/Izaiaspertrelly/mcp-calculadora-rtc) (MIT, 17 tools, com procedência em toda resposta), e um cliente Python, o `rfbcalc`, que grava respostas do motor como fixtures para teste. Os dois viraram referência de desenho.

O que faltava era outra coisa: a **camada de cenário**. Cálculo por operação já existe; ninguém modela "sou do Simples, vendo 70% para empresas do regime regular, tenho estas compras: o que muda se eu recolher IBS/CBS por fora do DAS?". O valor está aí.

Como a hospedagem é Cloudflare Workers, em TypeScript, escrevi um cliente fino (`packages/rtc-client`) com os tipos gerados direto do OpenAPI oficial e respostas gravadas do motor para os testes. Se a API mudar, basta regenerar os tipos e o compilador aponta o que quebrou, antes de chegar em produção.

## A arquitetura

O caminho de uma chamada é curto:

```text
Agente (Claude, ChatGPT, Cursor, Claude Code)
   │  MCP · Streamable HTTP · chave individual ou login
   ▼
Worker rt2026 (stateless)
   ├─ premissas.json (versionado, com fonte e data)
   ├─ D1: chaves (só o hash) e histórico de chamadas
   ▼
rtc-client (tipos do OpenAPI oficial)
   ▼
Calculadora RTC da Receita Federal
```

O servidor é **stateless**. Uso o `createMcpHandler` do Agents SDK da Cloudflare com o SDK do MCP na versão 2: cada requisição monta o servidor, atende e acaba. Não há sessão nem Durable Object. Deixei anotado onde eles entrariam: sessão com estado (progresso de operação longa, notificações), importação de notas fiscais por usuário e limite de uso com contagem exata. Nenhum desses casos existe hoje. O handler atende a especificação atual, sem estado, e continua aceitando clientes que ainda falam a versão 2025-06-18 — foi essa que o Claude Code negociou nos meus testes.

Começou com seis tools, todas somente leitura:

- `rt_prazos` — próximos prazos, com dias restantes e fonte oficial;
- `rt_premissas` — alíquotas vigentes e projetadas usadas nas simulações;
- `rt_buscar_municipio` — código IBGE do município;
- `rt_consultar_classificacoes` — ajuda a achar CST e classificação tributária por NCM, NBS ou texto;
- `rt_calcular_operacao` — IBS e CBS de uma operação, no motor oficial;
- `rt_comparar_simples_hibrido` — débito nas vendas menos crédito nas compras, o crédito que os clientes do regime regular passariam a aproveitar e, se o usuário informar quanto do DAS corresponde a IBS/CBS, o ponto de virada.

No dia seguinte vieram mais cinco, todas pensadas para quem não é especialista: `rt_buscar_nbs` (acha o código do serviço a partir das palavras do usuário), `rt_explicar` (explicações com exemplo numérico, como "por dentro × por fora" e créditos), `rt_preco_margem` (quanto o preço precisa mudar para manter a margem), `rt_minhas_empresas` e `rt_meu_cenario` (as empresas da conta e o diagnóstico que a pessoa já fez no site, para a conversa não começar do zero).

## O envelope: toda resposta diz de onde veio

Toda tool devolve o mesmo formato: `resultado`, `premissas`, `procedencia`, `avisos` e `proximas_perguntas`. A procedência traz a URL do motor, o modo (público ou local), a versão do motor e da base, as chamadas feitas, a versão das premissas e o timestamp. O aviso fixo vai em toda resposta: é simulação, o motor está em beta e nada disso substitui o contador ou o advogado.

As premissas são a parte mais delicada. Para 2026, o motor usa as alíquotas-teste e **não aceita** alíquota informada. A partir de 2027, ele **exige** que a alíquota nominal seja informada, e a alíquota de referência da CBS só sai com a resolução do Senado, cujo prazo é 15/12/2026. Então, para 2027 e 2028, o servidor envia ao motor uma alíquota projetada, marcada como `projetada`, com fonte e data, e devolve essa premissa junto com o resultado. Ninguém recebe um número de 2027 sem saber que ele depende de uma projeção. Por isso a versão atual vai só de 2026 a 2028: de 2029 em diante entra a transição do ICMS e do ISS, e isso fica para depois.

Campo que o usuário não informou nunca vira zero silencioso. Vira aviso e vira pergunta em `proximas_perguntas`.

## Acesso gratuito, com chave e com histórico

O acesso é por chave individual, gerada automaticamente: no fim do diagnóstico do site, o botão "Gerar meu acesso grátis" cria a chave, guarda o cenário da empresa (sem dado pessoal) e manda o link também por e-mail. Não há aprovação manual. Há ainda um segundo caminho, em teste: login com conta, pelo OAuth que os clientes MCP já sabem fazer. A chave vai no header `Authorization: Bearer` (Claude Code, Cursor) ou como parâmetro na URL, para os conectores web que não deixam configurar header. No banco fica só o hash SHA-256 da chave. Sem chave, o servidor responde 401 com uma mensagem que aponta para a inscrição. O limite é de 60 chamadas por minuto por chave. E quem abre a URL no navegador recebe uma página curta explicando o que é aquilo, em vez de um erro de protocolo.

O servidor vive num caminho próprio (`/rt2026`). Testando com um agente real, as tools aparecem isoladas com o prefixo do servidor (`mcp__rt2026__*`), e cada servidor futuro pode ganhar o próprio caminho no mesmo host.

Toda chamada fica registrada no D1: tool, entrada, resultado (truncado), cliente, país e rótulo da chave, com retenção de 24 meses. Isso está dito nas instruções do servidor, que o agente lê, e na política de privacidade. As instruções também pedem que o usuário não envie dado pessoal. A especificação original previa um modo anônimo que descartava tudo. Para um experimento, preferi auditar cada chamada e ser transparente sobre isso. O modo anônimo com telemetria só agregada continua no desenho.

Construí o MCP na mesma noite porque a campanha promete o simulador, e eu precisava vê-lo funcionando com agente de verdade antes de abrir para qualquer pessoa. O histórico completo foi escolha minha: quero saber tudo o que aconteceu em cada simulação, porque é o uso real que mostra o que melhorar. Por isso ele está declarado nas instruções do servidor e na política de privacidade.

## O teste que mudou o servidor

Tipos, testes unitários e fixtures dizem se o servidor funciona. Não dizem se um agente vai **usá-lo bem**. Então rodei o Claude Code em modo headless contra o servidor local, conversando como um empresário do Simples. O roteiro foi simples: `claude -p` com um `--mcp-config` apontando para o rt2026, a lista de ferramentas liberadas restrita às dele e uma pergunta escrita como um empresário escreveria. Foram duas conversas. A primeira, contra o servidor local: uma consultoria de TI em Campo Grande, faturando R$ 80 mil por mês, 90% para empresas do Lucro Real, com o valor do DAS informado pelo contador. O agente buscou o município, os prazos, as premissas, as classificações dos serviços e só então chamou a comparação — 9 turnos, cerca de US$ 0,43. A segunda, já contra produção: uma loja de roupas em Curitiba, R$ 150 mil por mês, quase tudo para consumidor final — 6 turnos, cerca de US$ 0,26.

Dois problemas apareceram:

1. **O agente inventava dados.** Faltava o valor das compras? Ele supunha um. Faltava a margem? Supunha outra. A simulação saía completa e errada, com cara de certa.
2. **O agente esquecia a lógica do prazo.** Ele respondia a comparação de números e deixava de fora o que dá sentido à decisão em setembro: quem opta até 30/09 pode cancelar até 30/11; quem não opta perde a janela do primeiro semestre de 2027.

Os exemplos vieram da segunda conversa. Sem que a pergunta dissesse, o agente supôs R$ 75 mil de compras por mês (margem de 50%) e estimou em R$ 2.200 o IBS/CBS dentro do DAS, fazendo a conta do anexo por conta própria. Até avisou que eram suposições — mas a comparação saiu construída sobre elas. E fechou com "continuar no Simples tende a ser a melhor escolha", sem dizer que quem opta até 30/09 ainda pode cancelar até 30/11. A primeira conversa revelou um terceiro ponto, menor: o agente não conseguia confirmar a descrição do código NBS que ele mesmo escolheu. Virou uma consulta a mais dentro de `rt_consultar_classificacoes`.

A correção não foi no código das tools. Foi nas **instruções do servidor**, o texto que todo cliente MCP recebe ao se conectar. Entraram duas coisas. A primeira: "Não invente dados que o usuário não informou (compras, margem, valor do IBS/CBS no DAS). Pergunte antes de simular." A segunda: o contexto do prazo que deve acompanhar toda resposta sobre o Simples, explicado como lógica e não como recomendação, porque a decisão final é da empresa com o contador.

A lição: num servidor MCP, o schema das tools é metade do produto. A outra metade é a conduta que você pede ao agente, e ela só se testa com agente de verdade.

Teve também um bug mais prosaico. Os "dias restantes" até cada prazo não levavam em conta o fuso, e perto da meia-noite a conta podia sair errada por um dia. O cálculo passou a usar o calendário de Brasília.

## O que vem depois

A conta já está em teste: login com Google, Microsoft ou e-mail e várias empresas por conta, que a IA consulta com autorização. Depois vêm a transição ano a ano e as premissas de 2027 trocadas pela alíquota oficial quando o Senado publicar.

Métricas de uso vão num texto próprio, quando houver volume para dizer algo honesto. Se você é contador ou advogado tributarista e quer testar o simulador com seus clientes, o acesso é gratuito e sai no fim do diagnóstico, na [landing do projeto](https://reforma-tributaria.gusflopes.dev/simulador?utm_source=gusflopes.dev&utm_medium=site&utm_campaign=simulador&utm_content=artigo-servidor-mcp-calculadora-oficial-receita-rt2026). A ideia é que ele seja usado com você, não no seu lugar.

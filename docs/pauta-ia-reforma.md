# Pauta: IA com ferramenta e contexto, usando a Reforma Tributária como demonstração

Criada em 28/09/2026. Fonte dos fatos: repositório `reforma-tributaria` até 27/09 23:00 (−04). Onde algo não está verificado, está marcado **[validar]**.

## A tese de toda a pauta

> A mesma IA que você já usa fica muito mais útil quando recebe a **ferramenta certa** e o **contexto certo**.

O projeto da reforma (landing, diagnóstico e servidor MCP `rt2026`) é a prova pública disso, para quem não é de tecnologia: empresário, contador, advogado. Não se vende a ferramenta. Ela é gratuita porque é demonstração.

Nesta fase, o conteúdo não menciona workshops nem mentorias. Ele constrói a prova de que funciona.

## Regras (valem para artigo, short e vídeo)

- A **IA conversa, o motor oficial calcula**: todo número de imposto vem da Calculadora RTC da Receita.
- **Alíquotas de 2027 em diante são premissa, não oficial.** Dizer isso em voz e mostrar na tela. A CBS de 8,7% é estimativa própria. Não citar TaxUp nem o benchmark interno.
- Recomendação sempre condicional. Sempre "converse com seu contador". Sem promessa de economia. Sem parceiros comerciais e sem "consultoria gratuita" (OAB, Provimento 205/2021).
- **Não afirmar:**
  - que há usuários ou tração (hoje só existem testes);
  - que o ChatGPT foi testado **[validar]**;
  - que o login está em produção (está em staging);
  - que a newsletter semanal é enviada.
- LGPD: as chamadas são registradas por até 24 meses, sem IP; não compartilhar o link com chave; nunca pedir CPF, senha ou certificado.

## Calendário

| Quando | O quê | Canal |
|---|---|---|
| 28/09 | Gravar a **demonstração em três níveis** (bloco central do vídeo longo abaixo). Dessa gravação saem o artigo N1 e metade dos shorts. | — |
| 28–29/09 | Shorts da janela do prazo: C3 "Duas portas" (roteiro pronto) e S1 "A IA inventa" | Reels, Shorts, TikTok, LinkedIn |
| 29/09 | Vídeo longo sobre IBS/CBS (roteiro pronto em `reforma-tributaria/docs/roteiro-video-ibs-cbs.md`) + artigo B2 no site (`pnpm run deploy` no dia) | YouTube + site |
| 30/09 | Último dia da opção: short C1 "0,9% × 8,8%" | Shorts |
| 01/10 → | A landing muda sozinha para "decida até 30/11". Usar as versões pós-prazo dos cortes. | — |
| 1ª semana/out | **Vídeo longo da ferramenta** (V2) + artigo N1 + shorts S2–S6 | YouTube + site |
| out–nov | Um short por semana (S7–S10), artigo N2 | Shorts, site |
| 16/11 e 25/11 | Lembretes automáticos por e-mail + short sobre o 30/11 | E-mail, Shorts |
| dez | Artigo B3 com os números reais do experimento, se houver volume para dizer algo honesto | Site |

## Artigos (site)

Poucos e de referência, seguindo a linha editorial (skill `novo-conteudo`).

| # | Eixo | Título provisório | Estado | Depende de |
|---|---|---|---|---|
| B1 | Bastidores | Uma campanha inteira com Claude Code: landing, formulário e e-mails em uma noite | Escrito, com 5 `[CONFIRMAR]` | Respostas do Gustavo (ver abaixo) |
| B2 | Bastidores | Um servidor MCP sobre a calculadora oficial da Receita em um dia: o rt2026 por dentro | **Pronto**, atualizado em 28/09 (11 tools, chave automática) | Deploy em 29/09 |
| N1 | Negócios | A mesma IA, três respostas: sozinha, com contexto e com a calculadora oficial | A escrever | A gravação dos três níveis (as respostas reais entram no texto) |
| N2 | Negócios | O que é um servidor MCP, explicado para quem não é de TI | A escrever (evergreen) | — |
| B3 | Bastidores | O que aprendi abrindo uma IA com ferramenta para o público | Futuro | Dados de uso reais |

**N1**, o texto-âncora da tese:
- Mesma pergunta de empresário ("vale optar pelo híbrido?") em três níveis:
  1. IA pura: responde com confiança e pode inventar alíquota.
  2. IA com o prompt do diagnóstico ("Copiar só o prompt"): entende o caso, mas ainda prevê texto.
  3. IA com o conector: pergunta a alíquota antes, busca o código do serviço, calcula no motor oficial e mostra a fonte de cada número.
- Fecha com o que isso significa para qualquer processo da empresa: ferramenta + contexto.

**N2** fica em pé sem a reforma:
- MCP como "tomada" que deixa o assistente usar sistemas;
- o que muda para o dono de empresa;
- cuidados (permissões, dados);
- a reforma como exemplo, não como assunto.

## Vídeo longo da ferramenta (V2, ~12 min)

**Título provisório:** "Dei à IA a calculadora oficial da Receita. Veja a diferença."
**Público:** quem já usa ChatGPT ou Claude e nunca ouviu falar de MCP.

| Tempo | Bloco | Conteúdo |
|---|---|---|
| 0:00–0:30 | Gancho | "Perguntei para uma IA quanto de imposto uma empresa vai pagar em 2027. Ela respondeu com confiança. E inventou a alíquota." Tela com a resposta real do nível 1. |
| 0:30–1:15 | Promessa | O mesmo assistente, três vezes, e por que a terceira é outra coisa. Aviso: conteúdo informativo, alíquotas de 2027+ são premissa. |
| 1:15–3:30 | Nível 1: IA sozinha | Pergunta de empresário (manutenção de computadores em Campo Grande, R$ 25 mil/mês, R$ 5 mil de peças). Marcar na tela o que é palpite. Explicação em uma frase: a IA prevê texto, não calcula. |
| 3:30–5:30 | Nível 2: com contexto | Colar o prompt do diagnóstico. Melhora: entende o caso e segue regras ("não invente alíquota"). Continua sem motor e sem fonte, e você repete o contexto a cada conversa. |
| 5:30–9:00 | Nível 3: com a ferramenta | Conectar o `rt2026` no Claude (Configurações → Conectores). A IA confirma a alíquota que vai usar e pergunta se você quer outra; acha a NBS do serviço e confirma; calcula no motor oficial (IBS/CBS R$ 2.200, crédito R$ 440, R$ 1.760 por fora, com CBS de 8,7% declarada como premissa); mostra a procedência e recusa o que não faz (DAS, anos depois de 2028). |
| 9:00–10:15 | O que mudou | Três coisas: **ferramenta** (número do motor oficial), **contexto** (o cenário da empresa já carregado), **conduta** (a IA pergunta em vez de supor). Mencionar que a conduta foi ajustada depois de testar com agente de verdade. |
| 10:15–11:15 | Isso vale para a sua empresa | Não é sobre imposto: qualquer processo com número que vale dinheiro (preço, comissão, estoque) ganha o mesmo tratamento. |
| 11:15–12:00 | Fechamento | Por que é grátis: é demonstração. Link do diagnóstico. "Converse com seu contador." |

**Antes de gravar [validar]:**
- ChatGPT: o repositório só registra uso real no Claude Code e no curl, e as telas divergem (`pagina.ts` diz OAuth; o `/simulador` diz link com chave). Gravar no Claude, ou testar o ChatGPT antes.
- Os textos do `rt_explicar` estão "pendente de revisão do autor" (`apps/mcp/src/explicacoes.ts`). Revisar os que aparecerem no vídeo.
- Confirmar que o e-mail com o link da chave está chegando (`docs/PARA-O-GUSTAVO-29-09.md` §1).
- Não mostrar a chave na tela, e trocá-la depois da gravação.

**Rendimento da gravação:** os níveis 1, 2 e 3 viram o artigo N1, os shorts S1–S5 e prints para o LinkedIn.

## Shorts (9:16, 30–60 s)

Formato: gancho em texto nos 2 primeiros segundos, legenda queimada, aviso informativo no rodapé, CTA no fim (`reforma-tributaria.gusflopes.dev/simulador`).

**Já roteirizados** em `reforma-tributaria/docs/roteiro-video-ibs-cbs.md`, sobre o imposto:
- **C1 "0,9% × 8,8%"**: o seu cliente perde crédito comprando de você.
- **C2 "18% não é 18%"**: por dentro × por fora.
- **C3 "Duas portas"**: 30/09 e 30/11. Tem versão pós-prazo.

**Novos**, sobre IA com ferramenta e contexto (a série que prova a tese):

| # | Gancho (texto na tela) | Mensagem | Visual | Fonte |
|---|---|---|---|---|
| S1 | "A IA inventou a alíquota" | Pergunte à IA quanto de imposto vai pagar: ela responde com confiança, e pode estar inventando. IA sozinha prevê texto. | Resposta real do nível 1 com o trecho inventado marcado | Gravação; roteiro-base no anexo do roteiro |
| S2 | "Mesma IA, resposta diferente" | O que muda não é o modelo, é o que você dá a ele: contexto e ferramenta. | Nível 1 × nível 3 lado a lado | Gravação |
| S3 | "A melhor resposta foi uma pergunta" | Com as instruções certas, a IA pergunta a alíquota e as compras em vez de supor. Nos testes, sem isso, ela inventava compras e margem. | Tela da IA perguntando | `docs/validacao/conversas-mcp-2026-09-28.md` e artigo B2 |
| S4 | "Cada número com fonte" | A procedência: qual motor, qual versão, quais premissas. É o que você leva ao contador. | Zoom no bloco de procedência | Gravação |
| S5 | "O que é MCP em 45 segundos" | Uma "tomada" que deixa o ChatGPT ou o Claude usar um sistema de verdade. | Animação simples: IA → tomada → calculadora da Receita | N2 |
| S6 | "Conectei em 3 cliques" | Passo a passo no Claude: Configurações → Conectores → colar o link. | Gravação de tela (sem mostrar a chave) | `pagina.ts`, `/simulador` |
| S7 | "A IA também diz o que não sabe" | Ela recusa calcular o DAS e anos depois de 2028, e avisa. Honestidade também é conduta. | Tela da recusa | Instruções do servidor |
| S8 | "Por que é de graça?" | Não é para vender calculadora. É para mostrar o que a IA faz quando tem contexto. | Câmera | Anexo do roteiro ("Por que é grátis") |
| S9 | "Uma campanha em uma noite" | Landing, formulário, e-mails e 21 criativos com IA. O que foi da IA e o que continuou sendo decisão minha. | Timeline dos commits | Artigo B1 |
| S10 | "Criativo feito com código" | As 21 peças saíram de um template HTML renderizado por script: muda a landing, mudam os criativos. | `marketing/img/` em sequência | Commit f327c4b |
| S11 | "Seu contador + IA" | A IA não substitui o contador; ela chega com a conversa pronta: as 12 perguntas para levar a ele. | Tela das perguntas | `docs/pesquisa/ibs-cbs-o-que-muda.md` §9 |

Ordem sugerida: S1 e C3 antes de 30/09; S2–S6 junto com o V2; S7–S11 um por semana até 30/11.

## Respostas pendentes do Gustavo

- **Artigo B1 (campanha): 5 marcadores.**
  1. Quanto tempo levou preparar os documentos antes do primeiro commit, e se foram escritos com IA no chat.
  2. Se, fazendo à mão, você teria cortado parte do básico (rate limit, descadastro, lembretes) para chegar a tempo.
  3. Como foi a revisão: commit a commit ou por blocos.
  4. Como foi ver a landing em produção no mesmo dia; algum momento de corrigir o agente.
  5. Custo real da noite (assinatura/tokens) e a verba de mídia colocada. Pode ficar "não divulgado".
- ~~Público~~: confirmado em 28/09. **Anúncio pago só para empresário.** Contadores e advogados não são alvo de anúncio, mas o conteúdo orgânico (site, shorts, vídeos) é escrito para que também os alcance e eles possam chegar ao Gustavo por ali.

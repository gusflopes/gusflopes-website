---
title: "Uma campanha inteira com Claude Code: landing, formulário e e-mails em uma noite"
excerpt: "Os bastidores da campanha \"Simples Nacional: opte até 30/09, decida até 30/11\": da tese à landing em produção, com Turnstile, D1, consentimentos separados e pixels só com aceite. O que a IA fez e o que continuou sendo decisão minha."
date: "2026-09-28"
duration: "8 min"
category: "Casos"
eixo: "bastidores"
tags: ["claude-code", "cloudflare", "reforma-tributaria", "lgpd"]
image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1080&q=80"
---

Em 26 de setembro de 2026 eu tinha um prazo e uma ideia. O prazo era o 30/09: é até lá que a empresa do Simples Nacional escolhe se vai recolher IBS e CBS pelo regime regular no primeiro semestre de 2027. A ideia cabia numa frase: **"Simples Nacional: opte até 30/09, decida até 30/11. A gente te lembra."** A meta que eu mesmo tinha escrito era ter landing, formulário e e-mail de confirmação no ar até 28/09, para dar tempo de aprovar os anúncios.

O primeiro commit do repositório saiu às 20h02 de 26/09. A landing estava em produção antes da meia-noite. Este texto conta como isso aconteceu, o que o Claude Code fez e o que não delegaria de jeito nenhum.

Um aviso antes: este é um relato de tecnologia. A lógica tributária da campanha está explicada na própria landing, com fontes. Aqui ela aparece só como contexto, e não é recomendação para ninguém.

## O trabalho que veio antes do primeiro commit

O primeiro commit não tinha código. Tinha documentos: um `CLAUDE.md` com as regras do projeto, a especificação da campanha (seções da landing, copy, campos do formulário, schema do banco, textos dos e-mails), um calendário de prazos com fonte e um arquivo de premissas em que cada número tem fonte e data.

É ali que está o trabalho de advogado e de contador. O agente escreve código muito rápido, mas não sabe quais cuidados a publicidade precisa ter para respeitar o Provimento 205/2021 da OAB, nem que o consentimento para receber lembretes e o consentimento para ser contatado por parceiros precisam ser separados e opcionais. Essas regras entraram no `CLAUDE.md` como "inegociáveis":

- **nunca calcular tributo no nosso código**: todo número vem do motor oficial da Receita;
- data sempre explícita e procedência em toda saída;
- recomendação sempre condicional, nunca "faça X";
- LGPD: consentimentos separados, revogáveis, e nunca pedir CPF, senha ou certificado digital.

O prompt da primeira sessão também estava escrito: seis passos em ordem, commits pequenos e uma instrução que eu repito em todo projeto: "antes de começar, me mostre o plano em até 10 linhas e pergunte só o que for bloqueante".

[CONFIRMAR: quanto tempo levou preparar esses documentos, e se foram escritos com ajuda de IA no chat antes da sessão no Claude Code.]

## A linha do tempo, pelo git

Os horários abaixo são dos commits. Eles mostram o ritmo, não o esforço total, porque a revisão acontece entre um commit e outro.

- **20h02** — estrutura inicial com docs e premissas.
- **20h09** — scaffold do monorepo, migration do D1 e a API de leads com testes.
- **20h14** — landing, formulário com Turnstile, página de obrigado, privacidade e termos.
- **20h16** — correção de acessibilidade: nota 100 no Lighthouse (a meta do prompt era 95 ou mais).
- **21h00** — pixels de anúncio com consentimento e Conversions API.
- **21h17 a 21h22** — imagens da campanha geradas por template, variante da landing para depois de 30/09 e copy dos anúncios.
- **21h23** — cliente da calculadora oficial e o servidor MCP (assunto do próximo texto).
- **21h36** — deploy de produção.
- **22h54 a 23h11** — página do simulador, interesse no beta no formulário e links de volta para este site.

## A arquitetura: um Worker, um domínio

O plano original falava em Cloudflare Pages com adapter. Acabou mais simples: Astro gerando HTML estático e **um único Worker** servindo tudo, no mesmo padrão que eu já usava em gusflopes.dev. O Worker responde `/api/*` e entrega o resto como arquivo estático. Como é tudo no mesmo domínio, não precisa de CORS e o deploy é um só.

A troca foi sugestão do agente: antes de escrever código, ele leu o repositório do meu site principal, viu que ele já roda como Worker com arquivos estáticos e propôs o mesmo padrão para a campanha. Eu aceitei — um deploy só, e o formulário no mesmo domínio.

A rota que importa é `POST /api/leads`. Ela faz rate limit por IP (5 por minuto), valida o corpo com zod, confere o Turnstile no servidor, grava o lead no D1 com a versão do texto de consentimento e dispara a confirmação por e-mail com um arquivo `.ics` do 30/11. O descadastro usa token HMAC e aceita one-click (RFC 8058). Os lembretes de 16/11 e 25/11 saem por Cron Trigger, com uma tabela de log que impede o envio em dobro. E os logs não guardam dado pessoal: só o id do lead, o status e o nome dos campos com erro.

Nada disso é sofisticado. É o básico bem feito, e com prazo apertado é justamente o básico que costuma ser cortado. [CONFIRMAR: se, fazendo à mão, você teria cortado parte disso para chegar a tempo.] Com o agente, não foi preciso escolher.

## A landing: leve de propósito

A landing é HTML estático, com as fontes servidas pelo próprio domínio, uma ilustração em SVG inline (as "duas portas" da campanha) e o Turnstile carregado só quando o formulário aparece. O Lighthouse de acessibilidade ficou em 100 depois de uma rodada de correção.

Um detalhe de que gosto: a mensagem "opte até 30/09" vence em quatro dias. Então a landing já foi ao ar com as duas versões. Um script inline no `<head>` escolhe a variante pela data antes da primeira pintura, e a partir de 01/10 ela passa a falar em "decida até 30/11", sem salto de layout. O mesmo commit incluiu preload das fontes para zerar o CLS causado pelo refluxo do título.

## Pixels, mas só com aceite

Anúncio pago exige medir conversão, e medir conversão costuma virar desculpa para carregar tudo sem perguntar. Aqui a regra foi outra:

- banner de cookies com "Aceitar" e "Recusar" do mesmo tamanho e peso;
- nenhum pixel (Meta, Google, LinkedIn, TikTok, X) carrega antes do aceite;
- o evento de Lead dispara uma única vez, na página de obrigado, com um `event_id` compartilhado;
- a Conversions API da Meta roda no Worker, com o e-mail em hash SHA-256, **só se a pessoa aceitou**, e é deduplicada pelo mesmo `event_id`.

A política de privacidade descreve exatamente o que o código faz. Parece óbvio, mas é raro.

## O material de campanha também virou código

Os criativos saíram de um template HTML renderizado com Puppeteer: 21 imagens em PNG (feed, stories, LinkedIn, carrossel e a imagem de compartilhamento). A ilustração das portas é lida do mesmo componente da landing, então se ela muda lá, muda nas peças. Os títulos e descrições do Google Ads passam por um script que confere o limite de caracteres antes de eu colar no painel.

A copy seguiu as regras da campanha: explicar a lógica, nunca prometer economia, sempre "converse com seu contador" e nenhuma menção a parceiros comerciais ou "consultoria gratuita". A posição é de parceiro da contabilidade, não de concorrente.

## O que não saiu perfeito

Duas coisas, pelo menos.

**O e-mail não estava ligado no fim da noite.** O código de envio pelo Resend estava pronto e testado, mas o provedor ainda não estava configurado em produção. Em vez de segurar o lançamento, o agente fez o envio trocável (Resend ou o Email Service da própria Cloudflare) e criou uma varredura a cada 30 minutos que manda a confirmação para quem se inscreveu antes do provedor existir. Ninguém perde o e-mail; só recebe mais tarde. O plano grátis do Resend tem limite de 100 e-mails por dia, o que também não serve para uma campanha paga, e isso ficou anotado como pendência.

**O escopo cresceu.** O prompt dizia, com todas as letras: "não crie `apps/mcp` ainda". O servidor MCP era para depois da campanha. Às 21h23 ele estava no repositório. Deu certo, e conto no próximo texto como foi. Mas vale o registro: com um agente, o custo de "só mais uma coisa" cai tanto que o escopo precisa de um dono.

Antecipei porque a campanha promete o simulador e eu queria validá-lo antes de liberar de verdade. Combinei com o agente: o que não ficasse bom no MCP iria para uma versão 2, depois de 30/09. A campanha precisava estar feita, não perfeita.

## O que foi da IA e o que foi meu

A divisão ficou mais clara do que eu esperava.

O Claude Code escreveu o código, os testes, a migration, o README com o passo a passo do deploy, o gerador de imagens e as variações de copy. Ele também listou os secrets que eu precisava criar, sem inventar valores, porque o prompt pedia isso.

Comigo ficaram a tese da campanha, as regras inegociáveis, o que a copy pode e não pode dizer, a criação das contas e dos secrets e a decisão de publicar. Revisar também. [CONFIRMAR: como foi a revisão — se você leu cada commit antes do seguinte ou revisou por blocos.]

[CONFIRMAR: como você se sentiu vendo a landing em produção no mesmo dia; se houve algum momento de desconfiança ou de corrigir o agente que valha contar.]

## Custo e resultado

O custo de infraestrutura é pequeno: tudo roda na Cloudflare, e a referência que usei no planejamento é o plano pago de Workers, de US$ 5 por mês, que cobre D1, Cron e o resto. [CONFIRMAR: custo real da noite (assinatura do Claude, tokens) e a verba de mídia que você efetivamente colocou.]

Resultado ainda não existe. A campanha começou agora, e os números (inscrições, custo por lead, quantos contadores se interessaram) vão num texto próprio quando houver algo honesto para mostrar.

Se quiser ver o projeto funcionando, a landing está em [reforma-tributaria.gusflopes.dev](https://reforma-tributaria.gusflopes.dev/?utm_source=gusflopes.dev&utm_medium=site&utm_campaign=simulador&utm_content=artigo-campanha-inteira-com-claude-code). A lição que fica para quem constrói com agentes: a velocidade vem do agente, mas quem define o que "pronto" significa, e o que nunca pode acontecer, continua sendo você.

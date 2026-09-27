---
title: "Três Raspberry Pi para aprender agentes de IA de verdade"
excerpt: "Montei um cluster Kubernetes em casa para rodar agentes de IA. A lição mais útil não veio dos agentes: veio de um backup que dizia 'done' todo dia e nunca copiou um byte."
date: "2026-09-27"
duration: "8 min"
category: "Casos"
eixo: "bastidores"
tags: ["homelab", "agentes", "kubernetes", "raspberry-pi"]
image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1080&q=80"
---

Dá para aprender muito sobre agentes de IA usando só o que já vem pronto: uma assinatura, um chat, um coding agent no terminal. Mas tem uma parte que só aparece quando o agente precisa morar em algum lugar: ter disco, memória que sobrevive a um restart, credencial, backup e alguém responsável quando ele para.

Foi para aprender essa parte que montei um homelab. Eu queria uma infraestrutura ligada o tempo todo, para agentes, observabilidade e aplicações variadas: um espaço de teste real, tanto para IA quanto para DevOps, plataforma e arquitetura. Container rodando no meu computador já não bastava; foi aí que comprei três Raspberry Pi para montar o lab de verdade.

## O que tem na mesa

Três Raspberry Pi 5, todos com SSD NVMe. Um de 16 GB faz o papel de *control plane* e segura o Postgres, o GitOps e o monitoramento. Os outros dois, de 8 GB, rodam o que interessa: um fica com os agentes, o outro com um terminal remoto persistente e aplicações.

Por cima, o que se usaria numa empresa, só que em versão leve:

- **K3s**, uma distribuição Kubernetes pensada para ARM e borda;
- **Cilium** para a rede;
- **ArgoCD** para que tudo o que roda no cluster esteja descrito num repositório Git;
- **CloudNativePG** para o Postgres, com backup em object storage;
- **Tailscale** para acessar tudo de fora de casa sem abrir porta no roteador.

O repositório começou em 4 de abril. O cluster físico subiu em 5 de agosto; o terceiro Pi entrou dois dias depois. Entre uma data e outra, tudo foi validado antes num cluster local, em containers, que espelhava o alvo.

## Os agentes que moram lá

Hoje rodam dois agentes pessoais, com papéis separados de propósito:

- **Hermes**, o agente principal, com memória própria e acesso pelo Telegram. O papel dele, nas notas do projeto, é de *chief of staff*: organizar, lembrar, preparar.
- **OpenClaw**, na borda, como prova de conceito de atendimento. A borda é quem fala com terceiros; o agente principal fala comigo.

Separar "cérebro" e "borda" foi a primeira decisão de arquitetura que veio do uso e não da teoria. Um agente que fala com estranhos não deveria ter a memória e os acessos do agente que organiza a sua vida.

É ali que exploro o Hermes e delego tarefas aos agentes. Os modelos locais chegam pelo Ollama, servidos pelo meu desktop com GPU ou pelo MacBook quando estão ligados. E o cluster dá o que um agente precisa para ser útil: contexto e servidores MCP que ele consulta, e observabilidade para ver o que ele fez, com Langfuse sobre as chamadas dos agentes e Postgres guardando o estado.

Ao lado dos agentes roda o meu laboratório de dados, sobre uma base de GitOps e engenharia de plataforma: a mesma camada sustenta tudo.

Há também um *terminal pod*: um ambiente de desenvolvimento que fica ligado no cluster, com Neovim, tmux e Claude Code, acessível de qualquer lugar. A sessão sobrevive ao notebook fechado e ao restart do próprio pod.

## A lição mais útil: sucesso silencioso

O que mais me ensinou não foi um agente. Foi um backup.

O cluster tinha um job diário que copiava o disco dos três agentes para o object storage. Todo dia ele rodava, imprimia `done` e terminava com sucesso. Quando fui ensaiar a restauração, a pasta de destino estava vazia. Desde sempre.

O motivo era uma linha. O script checava se cada disco existia com `kubectl`, mas a imagem do container não tinha `kubectl`. O erro de "comando não encontrado" era descartado por um `2>&1`, o script concluía que o disco não existia, pulava os três e saía com código zero.

Em duas sessões de revisão apareceram cerca de dezesseis casos do mesmo tipo: coisas que diziam estar funcionando e não estavam. Virou uma regra escrita do projeto: **backup tem que falhar alto**. Toda verificação precisa ser vista reprovando antes de ser vista aprovando.

Isso importa para agentes por um motivo simples. Agente também reporta sucesso. Ele diz "pronto, fiz o backup", "pronto, corrigi o teste". A disciplina de desconfiar do "done" é a mesma, e um homelab é um lugar barato para aprendê-la.

## O que mudou no jeito de usar IA

Três coisas que levo para qualquer projeto com agentes:

1. **Agente não guarda credencial de infraestrutura.** No cluster, as chaves que mexem na infraestrutura ficam fora do espaço onde os agentes rodam. Se um agente for enganado por uma mensagem, o estrago tem limite.
2. **Tudo que o agente faz precisa estar num lugar que você lê.** Com GitOps, uma mudança no cluster é um commit. Quando um coding agent ajuda a operar o lab, a revisão acontece no *pull request*, não na confiança.
3. **Memória é dado, e dado precisa de backup.** A memória do Hermes é o que o torna útil. Perder o disco dele seria como começar do zero com um assistente novo.

O que mais me surpreendeu foi a velocidade do troubleshooting com IA. Quando algo quebra, o agente consolida os logs de vários componentes de uma vez e testa várias hipóteses em paralelo, em vez de uma por vez. E como tudo estava estruturado (manifestos no Git, decisões registradas, runbooks escritos), ele tinha contexto para chegar rápido à causa. Estrutura, no fim, é o que deixa a IA rápida.

## Para quem quer começar

Não precisa de três Raspberry Pi. Um computador velho, ou um único Pi, já basta para rodar um agente com memória, um banco e um backup de verdade. O ponto não é o hardware; é ter um lugar seu onde o agente vive e onde você enxerga o que ele faz.

A construção do lab está documentada passo a passo e, mais adiante, vai virar uma série de vídeos.

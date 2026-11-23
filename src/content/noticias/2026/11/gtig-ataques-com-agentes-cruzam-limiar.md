---
title: "Google vê ataque com IA explorando falha sem humano no laço"
excerpt: "O grupo de inteligência de ameaças do Google relatou em 16/11/2026 o primeiro caso de atacantes usando frameworks de LLM para achar e explorar falhas sem humano no laço, além de chave de LLM roubada e configuração do Claude Code usada como porta de entrada."
date: "2026-11-23"
temas: ["governanca-e-seguranca", "agentes-engenharia"]
ferramentas: ["claude-code", "cobranca-por-uso"]
porQueImporta:
  A: "Chave de API de LLM virou alvo com custo direto na fatura: vale exigir cota e alerta de gasto por chave, rotação e inventário de quem usa cada uma antes do próximo susto no cartão."
  B: "Arquivo de configuração de assistente de código no repositório (.claude/settings.json e afins) executa coisas na máquina do dev: entra na revisão de código e no monitoramento como qualquer script do projeto."
fonte:
  nome: "Google Threat Intelligence Group"
  url: "https://cloud.google.com/blog/topics/threat-intelligence/agentic-threat-activity-crosses-a-significant-threshold"
  data: "2026-11-16"
  tipo: primaria
outrasFontes: []
apuradoEm: "2026-11-23"
base: "gtig-ataques-com-agentes-cruzam-limiar"
correcoes: []
assinatura: agente
rascunho: false
---

O Google Threat Intelligence Group (GTIG) publicou em 16/11/2026 que, no último trimestre, identificou pela primeira vez atacantes usando frameworks de LLM para automatizar de ponta a ponta a descoberta e a exploração de vulnerabilidades, sem humano no laço. No mesmo relatório, casos atendidos pela Mandiant mostram roubo de acesso a LLM (o chamado LLMJacking) com cobrança fraudulenta acima de US$ 100 mil num único dia.

O terceiro achado mexe direto com quem usa agente de código: um grupo suspeito de ligação com a Coreia do Norte alterou o `.claude/settings.json` de repositórios para que, ao abrir o Claude Code, a máquina baixasse um backdoor. Não é falha do produto; é o arquivo de configuração do agente usado como gatilho de execução.

A leitura prática é tratar a configuração do agente como código e a chave de LLM como credencial de produção: revisão, monitoramento de integridade, alerta de consumo e janela de patch mais curta, que é também o que o próprio relatório recomenda.

O limite está no próprio texto: o caso "sem humano no laço" se apoia em um servidor exposto, sem medida de quão comum isso é, e a atribuição à Coreia do Norte é tratada como suspeita.

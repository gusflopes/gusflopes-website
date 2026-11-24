---
title: "AWS passa a achar servidor MCP escondido e protegê-lo no WAF"
excerpt: "A AWS pôs em GA em 23/11/2026 a descoberta automática de endpoints de LLM, MCP e A2A em toda a AWS Organization e um grupo de regras do AWS WAF que confere esses protocolos e chama o Bedrock Guardrails contra prompt injection."
date: "2026-11-24"
temas: ["governanca-e-seguranca", "agentes-engenharia"]
ferramentas: ["aws-waf", "mcp", "a2a", "aws-bedrock"]
porQueImporta:
  B: "O inventário de servidores MCP passa a sair do tráfego, sem instalar nada: é o primeiro passo para governar agentes na AWS. A proteção cobra à parte (WAF mais cada chamada ao Guardrails, sem preço no anúncio) e ainda não está em São Paulo."
fonte:
  nome: "AWS What's New"
  url: "https://aws.amazon.com/about-aws/whats-new/2026/11/waf-ai-endpoint-discovery-protection/"
  data: "2026-11-23"
  tipo: primaria
outrasFontes: []
apuradoEm: "2026-11-24"
base: "aws-waf-acha-e-protege-endpoint-mcp-e-a2a"
correcoes: []
assinatura: agente
rascunho: false
---

A AWS anunciou em 23/11/2026 a disponibilidade geral de duas funções para endpoints de IA. A primeira é a descoberta: o novo API Portal do API Gateway encontra endpoints de LLM, MCP e A2A atrás de API Gateway, Application Load Balancer e CloudFront em toda a AWS Organization, a partir dos logs de tráfego e da configuração, e marca o servidor MCP público e não documentado como "shadow API".

A segunda é a proteção: o grupo de regras gerenciadas AI Security do AWS WAF bloqueia mensagens MCP e A2A malformadas e, com a inspeção de conteúdo ligada, chama o Amazon Bedrock Guardrails para detectar prompt injection, jailbreak e dado sensível na resposta.

A leitura é que a pergunta "quais servidores MCP existem aqui?" passa a ter resposta sem depender de o time declarar. O limite é de região e de custo: o AI Security está em 7 regiões, nenhuma no Brasil, e o anúncio diz só que há taxa adicional e que o Bedrock cobra cada inspeção, sem os valores.

---
title: "Microsoft põe agentes no SOC e leva o Sentinel ao Defender do E5"
excerpt: "A Microsoft anunciou no Ignite, em 17/11/2026, o Perception e quatro agentes de segurança em disponibilidade geral; clientes de Defender Suite, Microsoft 365 E5 e E7 passam a ter o SIEM do Sentinel no Defender."
date: "2026-11-23"
temas: ["governanca-e-seguranca", "agentes-engenharia"]
ferramentas: ["microsoft-defender", "agent-365"]
porQueImporta:
  A: "Quem já paga Microsoft 365 E5 ou E7 tem o SIEM do Sentinel no pacote: vale revisar o contrato de SIEM antes da renovação, lembrando que o conjunto completo ainda está em prévia e que não há preço da ingestão reduzida."
  B: "Triagem de alerta, investigação e escrita de regra de detecção passam a ter agente em disponibilidade geral; o time de segurança precisa definir o que o agente decide sozinho e o que volta para o analista."
fonte:
  nome: "Microsoft Security Blog"
  url: "https://www.microsoft.com/en-us/security/blog/2026/11/17/security-for-the-agentic-era-powered-by-microsoft-perception/"
  data: "2026-11-17"
  tipo: primaria
outrasFontes: []
apuradoEm: "2026-11-23"
base: "microsoft-perception-ga-e-sentinel-no-defender-para-e5"
correcoes: []
assinatura: agente
rascunho: false
---

A Microsoft anunciou no Ignite, em 17/11/2026, a disponibilidade geral do Microsoft Perception, que coordena por playbooks agentes de segurança de ataque simulado, de detecção e de correção. Quatro agentes de detecção e investigação entraram em disponibilidade geral: Alert Triage, Attack Investigation, Detection Authoring e Threat Intelligence.

A outra parte do anúncio mexe em orçamento: o SOC integrado no Defender ficou disponível para as capacidades centrais, e clientes elegíveis de Defender Suite, Microsoft 365 E5 e E7 passam a ter os recursos do SIEM do Sentinel, com ingestão de dados a tarifa reduzida. O conjunto completo do SIEM segue em prévia.

O post não publica preço, nem da ingestão reduzida. A leitura é dupla: agente fazendo trabalho de rotina no SOC e uma linha de contrato que pode mudar para quem já está no E5.

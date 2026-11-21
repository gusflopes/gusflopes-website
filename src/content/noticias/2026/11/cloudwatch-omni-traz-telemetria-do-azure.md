---
title: "CloudWatch Omni passa a juntar a telemetria do Azure com a da AWS"
excerpt: "A AWS anunciou em 21/11/2026 que o CloudWatch Omni coleta logs, métricas, flow logs e traces do Azure e mostra essa telemetria junto com a da AWS, com conexão por um tenant do Entra ID."
date: "2026-11-21"
temas: ["plataformas", "engenharia-de-software"]
ferramentas: ["amazon-cloudwatch"]
porQueImporta:
  B: "Quem opera nas duas nuvens pode testar um console único de observabilidade em vez de duas ferramentas; a conta a fazer é o custo de ingestão, que o anúncio não informa."
fonte:
  nome: "AWS (What's New)"
  url: "https://aws.amazon.com/about-aws/whats-new/2026/11/amazon-cloudwatch-omni-microsoft-azure"
  data: "2026-11-21"
  tipo: primaria
outrasFontes: []
apuradoEm: "2026-11-21"
base: "cloudwatch-omni-traz-telemetria-do-azure"
correcoes: []
assinatura: agente
rascunho: false
---

A AWS anunciou em 21/11/2026 que o CloudWatch Omni passa a coletar dados do Azure: logs de recursos, métricas do Azure Monitor, flow logs de VNet e traces do Application Insights. A telemetria aparece junto com a da AWS, num só lugar.

A conexão é feita ligando um tenant do Microsoft Entra ID à conta e à região da AWS, e dá para escolher tipos de dado, assinaturas, regiões, tipos de recurso e tags.

Não é um lançamento de IA, mas mexe no time que opera multicloud. O anúncio não traz preço.

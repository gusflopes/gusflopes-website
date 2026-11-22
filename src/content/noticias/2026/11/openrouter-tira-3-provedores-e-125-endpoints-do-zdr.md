---
title: "OpenRouter desliga 3 provedores e tira 125 endpoints do ZDR"
excerpt: "A OpenRouter informou em 22/11/2026 que desligou três provedores de inferência e tirou 125 endpoints da elegibilidade a Zero Data Retention, depois que pesquisadores apontaram dados expostos em provedores."
date: "2026-11-22"
temas: ["governanca-e-seguranca", "plataformas"]
ferramentas: ["openrouter"]
porQueImporta:
  B: "Quem usa roteador de modelos não escolhe, por padrão, o provedor que recebe o prompt: vale fixar a lista de provedores no roteamento e revisar quais chamadas dependiam do selo de retenção zero."
  A: "\"Zero retenção\" é promessa de cada provedor, não do gateway: no contrato, peça a lista fechada de provedores que processam os dados e o aviso de incidente com prazo."
fonte:
  nome: "OpenRouter"
  url: "https://openrouter.ai/blog/announcements/data-processing-incidents-on-inference-providers/"
  data: "2026-11-22"
  tipo: primaria
outrasFontes: []
apuradoEm: "2026-11-22"
base: "openrouter-tira-3-provedores-e-125-endpoints-do-zdr"
correcoes: []
assinatura: agente
rascunho: false
---

A OpenRouter, plataforma que roteia chamadas para modelos de vários provedores de inferência, publicou em 22/11/2026 que desligou três provedores da plataforma depois de investigar achados de pesquisadores sobre dados expostos em provedores. A empresa não diz quais foram os três.

Também tirou 125 endpoints da elegibilidade a Zero Data Retention (ZDR), incluindo, por precaução, endpoints que não estavam entre os apontados. Segundo a OpenRouter, não houve invasão dos próprios sistemas, e os clientes possivelmente afetados foram notificados.

O caso mostra onde mora a promessa de não reter dados: no provedor que de fato processa o prompt, não na marca do gateway. Quem compra inferência por um intermediário passa a ter de saber, e de limitar, por quais provedores os dados passam.

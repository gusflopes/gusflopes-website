---
title: "OpenAI passa a exigir aprovação de quem revende acesso aos modelos"
excerpt: "As políticas de uso da OpenAI em vigor desde 20/11/2026 exigem revisão e aprovação prévias para plataformas que dão a terceiros acesso direto aos modelos, e proíbem usar as saídas para treinar modelo concorrente."
date: "2026-11-21"
temas: ["governanca-e-seguranca", "plataformas"]
ferramentas: ["openai-api", "politica-de-ia"]
porQueImporta:
  A: "Se a empresa chega ao GPT por um intermediário (roteador multimodelo, revenda de API, plataforma de agentes), vale perguntar ao fornecedor se ele tem a aprovação da OpenAI e o que acontece com o acesso se não tiver."
  B: "Quem usa GPT para gerar, selecionar ou avaliar dado de treino de modelo próprio precisa checar se esse modelo pode ser lido como concorrente; a regra pega o pipeline, não só o produto."
fonte:
  nome: "OpenAI (políticas de uso)"
  url: "https://openai.com/policies/usage-policies/"
  data: "2026-11-20"
  tipo: primaria
outrasFontes:
  - nome: "eWeek"
    url: "https://www.eweek.com/news/openai-ai-gateway-approval-rules/"
    data: "2026-11-20"
    tipo: imprensa
apuradoEm: "2026-11-21"
base: "openai-gateway-de-modelo-precisa-de-aprovacao"
correcoes: []
assinatura: agente
rascunho: false
---

As políticas de uso da OpenAI revisadas em 21/10/2026 entraram em vigor em 20/11/2026. Quem opera plataforma que dá a terceiros acesso direto aos modelos da OpenAI precisa de revisão e aprovação prévias. A política diz que o simples fato de um aplicativo integrar os modelos não dispara a exigência.

A mesma revisão proíbe usar os modelos ou suas saídas para gerar, preparar, selecionar ou fornecer material de treino de modelos que substituam os da OpenAI.

Na prática, o risco muda de lugar: passa a estar no contrato com o intermediário, não só no uso da API. A política não publica critério nem prazo para a aprovação.

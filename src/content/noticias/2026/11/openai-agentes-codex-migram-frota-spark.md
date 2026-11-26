---
title: "OpenAI usa agentes Codex para migrar jobs Spark, com sombra e rollback"
excerpt: "Segundo a InfoQ (25/11/2026), a OpenAI contou na QCon San Francisco que agentes Codex migram jobs Spark da frota interna: rodam o job em sombra, analisam a validação e voltam à versão anterior se ele falhar em produção."
date: "2026-11-26"
temas: ["agentes-engenharia", "engenharia-de-software"]
ferramentas: ["codex", "apache-spark"]
porQueImporta:
  B: "A ordem importa: a execução em sombra com entrada real, a configuração isolada e a validação entre produção e sombra vieram antes dos agentes. É o roteiro para quem quer agente fazendo upgrade de dependência em escala."
fonte:
  nome: "InfoQ"
  url: "https://www.infoq.com/news/2026/11/openai-spark-fleet/"
  data: "2026-11-25"
  tipo: imprensa
outrasFontes: []
apuradoEm: "2026-11-26"
base: "openai-agentes-codex-migram-frota-spark"
correcoes: []
assinatura: agente
rascunho: false
---

Segundo a InfoQ, Mouli Mukherjee, gerente de engenharia de Data Infrastructure da OpenAI, contou na QCon San Francisco que agentes Codex migram os jobs Spark da frota interna para versões novas. O agente escolhe o job, roda em sombra com entrada de produção, analisa o relatório de validação e promove a versão nova.

Se um job passa na sombra e depois falha em produção, ele volta sozinho à versão anterior. As salvaguardas, segundo a palestra, foram construídas antes de os agentes entrarem.

A leitura é a mesma de outras migrações feitas com agente: o agente faz o trabalho repetitivo, e o que dá segurança é o sistema de verificação em volta dele. O limite é a fonte: é o relato da palestra pela imprensa, sem post da OpenAI nem número de resultado.

---
title: "Amazon Transcribe devolve a transcrição na mesma chamada"
excerpt: "A AWS lançou em 20/11/2026 a API síncrona TranscribeAudio no Amazon Transcribe: áudio de até 1 hora volta transcrito na própria resposta, com português entre os idiomas e a região de São Paulo na lista."
date: "2026-11-21"
temas: ["plataformas", "areas-de-negocio"]
ferramentas: ["amazon-transcribe"]
porQueImporta:
  B: "Transcrever áudio deixa de exigir job assíncrono e polling: uma chamada resolve, o que simplifica o fluxo de atendimento, reunião ou nota de voz que alimenta um agente."
fonte:
  nome: "AWS (What's New)"
  url: "https://aws.amazon.com/about-aws/whats-new/2026/11/amazon-transcribe-sync-api/"
  data: "2026-11-20"
  tipo: primaria
outrasFontes: []
apuradoEm: "2026-11-21"
base: "amazon-transcribe-transcricao-na-mesma-chamada"
correcoes: []
assinatura: agente
rascunho: false
---

A AWS lançou em 20/11/2026 a API síncrona TranscribeAudio no Amazon Transcribe. O áudio inteiro, de 0,5 segundo a 1 hora, volta transcrito na mesma resposta, com separação de falantes e identificação de idioma.

O português está na lista de idiomas, e a região de São Paulo está entre as atendidas, mas sem a redação de dados pessoais, que lá não está disponível.

Para quem monta fluxo com áudio, some uma etapa de fila e espera. Antes de trocar a API em produção, vale testar a qualidade no sotaque e no vocabulário do seu negócio.

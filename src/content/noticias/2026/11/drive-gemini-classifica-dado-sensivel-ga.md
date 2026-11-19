---
title: "Gemini passa a rotular dado sensível no Google Drive por regra escrita"
excerpt: "O Google liberou em 17/11/2026 a classificação de arquivos do Drive pelo Gemini nas edições Enterprise Plus, Frontline Plus e AI Pro for Education: o admin escreve a regra em linguagem comum e o rótulo aciona DLP e retenção."
date: "2026-11-19"
temas: ["governanca-e-seguranca", "plataformas"]
ferramentas: ["google-workspace", "gemini", "politica-de-ia"]
porQueImporta:
  C: "Rotular o que é sensível vira pré-requisito para soltar agente no Drive, e a TI enxuta pode fazer isso com uma instrução escrita e teste no Admin console, sem projeto de dados; o que demora é a varredura dos arquivos antigos."
fonte:
  nome: "Google Workspace Updates"
  url: "https://workspaceupdates.googleblog.com/2026/11/gemini-powered-data-classification-in-Google-Drive-is-now-generally-available.html"
  data: "2026-11-17"
  tipo: primaria
outrasFontes: []
apuradoEm: "2026-11-18"
base: "drive-gemini-classifica-dado-sensivel-ga"
correcoes: []
assinatura: agente
rascunho: false
---

O Google pôs em disponibilidade geral, em 17/11/2026, a classificação de arquivos do Drive pelo Gemini, nas edições Enterprise Plus, Frontline Plus e Google AI Pro for Education. A liberação vai até 15/12/2026. O admin escreve a regra em linguagem comum, escolhe o rótulo, testa no Admin console e o Gemini aplica; o rótulo é que aciona as regras de DLP e de retenção.

O Gemini não sobrescreve rótulo aplicado à mão nem por regra de DLP. Ao ligar a aplicação automática, começa uma varredura única dos arquivos existentes que, segundo o Google, pode levar semanas ou meses.

Para quem planeja agente sobre o Drive, a ordem é classificar antes e liberar depois; quem começar agora ainda vai esperar a varredura terminar.

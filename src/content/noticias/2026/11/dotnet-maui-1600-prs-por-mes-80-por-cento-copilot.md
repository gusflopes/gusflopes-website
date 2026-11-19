---
title: "Time do .NET MAUI diz mesclar 1.600 PRs por mês, 80% do Copilot"
excerpt: "No keynote da .NET Conf, em 10/11/2026, a Microsoft disse que o time do .NET MAUI passou de 400 a 500 PRs mesclados por mês para mais de 1.600, 80% escritos pelo Copilot, com \"a mesma qualidade\" — sem mostrar métrica de qualidade."
date: "2026-11-19"
temas: ["agentes-engenharia", "adocao-e-mercado"]
ferramentas: ["github-copilot", "dotnet"]
porQueImporta:
  A: "É o número que o fornecedor vai levar para a mesa de compra. Antes de usá-lo como meta, peça o par dele: taxa de reversão, bug em produção e tempo de revisão por PR."
  B: "Quatro vezes mais PRs muda o gargalo para a revisão; se o time vai nessa direção, a pergunta é quem revisa, com que critério e com que teste barrando regressão."
fonte:
  nome: ".NET Conf 2026 (canal .NET no YouTube)"
  url: "https://youtu.be/PWAVvWTzzHo?t=1758"
  data: "2026-11-10"
  tipo: primaria
outrasFontes: []
apuradoEm: "2026-11-19"
base: "dotnet-maui-1600-prs-por-mes-80-por-cento-copilot"
correcoes: []
assinatura: agente
rascunho: false
---

No keynote de lançamento do .NET 11, em 10/11/2026, Gerald Versluis (Microsoft) disse que o time do .NET MAUI mesclava 400, talvez 500 pull requests por mês um ano atrás, e passou de 1.600 no mês anterior ao evento. Segundo ele, 80% desses PRs foram escritos pelo GitHub Copilot.

A frase seguinte foi "the quality is still the same". Nenhum número de qualidade foi mostrado: nem taxa de reversão, nem bug em produção, nem tempo de revisão.

É dado da própria Microsoft sobre um time interno, dito no palco de um evento que vende o Copilot. Serve como sinal de direção, não como benchmark: quatro vezes mais código mesclado só é ganho se a revisão e os testes acompanharam.

Volume de PR mede produção, não resultado.

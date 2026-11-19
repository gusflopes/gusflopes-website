---
title: "Ruby corrige sete falhas, algumas com execução remota, e deixa a 3.2 sem patch"
excerpt: "O Ruby publicou em 18/11/2026 correções para sete falhas em strings e Regexp, várias com possível execução remota de código; a 3.2 e as anteriores, em fim de vida, ficam sem correção."
date: "2026-11-19"
temas: ["governanca-e-seguranca", "engenharia-de-software"]
ferramentas: []
porQueImporta:
  B: "Atualizar para 4.0.10, 3.4.13 ou 3.3.14; app em Ruby 3.2 ou anterior não tem patch, e a dívida de versão vira risco direto, inclusive em Rails na configuração padrão."
fonte:
  nome: "Ruby (anúncio oficial)"
  url: "https://www.ruby-lang.org/en/news/2026/11/18/multiple-vulnerabilities-in-regexp-and-string/"
  data: "2026-11-18"
  tipo: primaria
outrasFontes:
  - nome: "Veria Labs"
    url: "https://verialabs.com/ruby2shell/"
    data: "2026-11-18"
    tipo: primaria
apuradoEm: "2026-11-19"
base: "ruby-falhas-de-rce-atingem-rails-por-padrao"
correcoes: []
assinatura: agente
rascunho: false
---

O Ruby publicou em 18/11/2026 correções para sete falhas em conversão de caixa de strings e em Regexp, várias com possível execução remota de código. As correções saíram no Ruby 4.0.10, 3.4.13 e 3.3.14.

A 3.2 e as anteriores, em fim de vida, não recebem correção. A Veria Labs, que achou uma das falhas, diz que Rails e Sinatra clássico ficam expostos na configuração padrão.

É a terceira falha crítica de runtime na semana, depois do OpenJDK e do NGINX. Não é IA; para app legado, o custo de não atualizar a linguagem deixou de ser teórico.

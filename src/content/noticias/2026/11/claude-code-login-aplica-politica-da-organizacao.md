---
title: "Claude Code passa a aplicar a política da empresa no login"
excerpt: "Na versão 2.1.330, de 20/11/2026, o Claude Code passou a aplicar as configurações da organização gerida no Enterprise Admin Console depois do login, incluindo o provedor de nuvem ou o gateway definidos por ela."
date: "2026-11-21"
temas: ["governanca-e-seguranca", "agentes-engenharia"]
ferramentas: ["claude-code", "politica-de-ia"]
porQueImporta:
  B: "O time de plataforma ganha um ponto central para definir configuração, nuvem e gateway do Claude Code de todos os devs, em vez de depender de cada máquina configurada à mão."
fonte:
  nome: "Anthropic (Claude Code no GitHub)"
  url: "https://github.com/anthropics/claude-code/releases/tag/v2.1.330"
  data: "2026-11-20"
  tipo: primaria
outrasFontes: []
apuradoEm: "2026-11-21"
base: "claude-code-login-aplica-politica-da-organizacao"
correcoes: []
assinatura: agente
rascunho: false
---

A versão 2.1.330 do Claude Code, publicada em 20/11/2026, acrescentou o login em organizações geridas no Enterprise Admin Console da Anthropic. Depois do `claude auth login`, a ferramenta aplica as configurações da organização e passa a usar o provedor de nuvem ou o gateway que ela definiu.

Até aqui, cada dev configurava o Claude Code por conta própria, e a política da empresa dependia de arquivo distribuído a cada máquina. Agora ela chega com a identidade da pessoa, o que facilita controlar por onde passa o tráfego e quanto se gasta.

A nota da versão não fala de preço nem detalha quais configurações a organização pode impor.

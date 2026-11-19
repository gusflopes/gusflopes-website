---
title: "Microsoft separa aprovar o agente de limitar o que ele alcança"
excerpt: "Na .NET Conf, em 11/11/2026, a Microsoft comparou três sandboxes para o GitHub Copilot CLI em modernização de legado .NET e lembrou que o modo sem aprovação não limita arquivos, rede nem credenciais."
date: "2026-11-19"
temas: ["governanca-e-seguranca", "agentes-engenharia"]
ferramentas: ["github-copilot", "humano-no-circuito"]
porQueImporta:
  B: "Ligar o \"allow all\" para o agente parar de perguntar não protege nada: antes de rodar o agente num legado, defina a fronteira (pasta, rede, segredo) e trabalhe numa cópia clonada, com revisão antes de trazer a mudança."
  A: "A política de uso de agente precisa ter duas linhas separadas: o que o agente pode fazer sem pedir e o que ele pode alcançar. A segunda, segundo o próprio fornecedor, é decisão humana."
fonte:
  nome: ".NET Conf 2026 (canal .NET no YouTube)"
  url: "https://youtu.be/OoALkRag2tY?t=71"
  data: "2026-11-11"
  tipo: primaria
outrasFontes: []
apuradoEm: "2026-11-19"
base: "copilot-cli-sandbox-permissao-de-rodar-e-de-alcancar"
correcoes: []
assinatura: agente
rascunho: false
---

Na sessão "Protect your PC from AI coding agents", da .NET Conf 2026, em 11/11, Justin Yoo (Microsoft) separou duas permissões que costumam andar juntas: a de rodar (o agente executar sem pedir aprovação) e a de alcançar (os arquivos, a rede e as credenciais que ele enxerga). O modo "allow all" do GitHub Copilot CLI tira as perguntas, mas não mexe na segunda.

Ele comparou três sandboxes para modernizar um sistema legado em .NET Framework: o sandbox local do próprio CLI, com política de arquivos, rede e ferramentas; o Docker Sandboxes, uma micro-VM Linux em que o código entra clonado e a mudança só volta depois de revisada; e o sandbox no Azure Container Apps, que, segundo o palestrante, libera todo o tráfego de saída por padrão e exige configurar a política de rede.

O ponto prático é o segredo esquecido: credencial num web.config continua legível para o agente se a fronteira não for desenhada. A regra que fechou a sessão é restringir, observar o que a ferramenta tocou e revisar.

Isolar a execução não é o mesmo que limitar o alcance.

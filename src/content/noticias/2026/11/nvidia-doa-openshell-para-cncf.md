---
title: "NVIDIA doa o OpenShell, sandbox de agentes, à CNCF"
excerpt: "A NVIDIA doou em 10/11/2026 o OpenShell, runtime aberto que isola agentes e aplica política sobre ferramentas, inferência e execução, à CNCF como projeto Sandbox, e anunciou uma integração com o Agent Substrate do Google, sem data."
date: "2026-11-19"
temas: ["agentes-engenharia", "governanca-e-seguranca"]
ferramentas: ["nvidia-openshell", "kubernetes", "identidade-de-agentes"]
porQueImporta:
  B: "Há um desenho de referência aberto para sandbox de agente: a política fica fora do agente, no runtime, e não depende de um fornecedor. É projeto Sandbox na CNCF, então conte com APIs mudando."
  A: "A governança do agente (o que ele usa, chama e executa) passa a morar na plataforma, sem licença; o custo passa a ser operar, e a pergunta ao time é quem escreve e revisa essa política."
fonte:
  nome: "NVIDIA Blog"
  url: "https://blogs.nvidia.com/blog/open-source-openshell-infrastructure/"
  data: "2026-11-10"
  tipo: primaria
outrasFontes:
  - nome: "The New Stack"
    url: "https://thenewstack.io/nvidia-donates-openshell-cncf/"
    data: "2026-11-10"
    tipo: imprensa
apuradoEm: "2026-11-19"
base: "nvidia-doa-openshell-para-cncf"
correcoes: []
assinatura: agente
rascunho: false
---

A NVIDIA anunciou em 10/11/2026, na KubeCon NA, a doação do OpenShell à CNCF como projeto Sandbox. O OpenShell é um runtime aberto que roda o agente isolado e aplica controles determinísticos sobre o que ele faz: as ferramentas que usa, o acesso a serviços de inferência e a execução de workloads.

A empresa também disse que trabalha com o Google numa integração entre o OpenShell e o Agent Substrate, para governar agentes em várias nuvens e em data center próprio. O post não dá data para essa integração.

A leitura é de arquitetura: a regra do agente sai do prompt e vai para a infraestrutura. No vídeo exibido na abertura da KubeCon, a própria NVIDIA resumiu assim: "We can't simply ask agents to follow the rules. The infrastructure must enforce them."

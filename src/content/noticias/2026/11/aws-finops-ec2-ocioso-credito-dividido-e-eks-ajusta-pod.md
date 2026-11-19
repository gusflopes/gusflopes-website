---
title: "AWS para EC2 ociosa com um clique e ajusta pod sozinha no EKS"
excerpt: "A AWS lançou em 17/11/2026 a parada de instâncias EC2 ociosas direto no Cost Optimization Hub e, em preview, o ajuste automático de CPU e memória de pods no EKS Auto Mode, ainda sem a região de São Paulo."
date: "2026-11-19"
temas: ["custo-e-precificacao", "plataformas"]
ferramentas: ["kubernetes"]
porQueImporta:
  B: "Duas tarefas de FinOps que pediam script viram configuração: parar o ocioso sem perder o disco e dimensionar pod pelo uso real; no Brasil, o ajuste de pod ainda depende de rodar fora de São Paulo."
fonte:
  nome: "AWS (What's New)"
  url: "https://aws.amazon.com/about-aws/whats-new/2026/11/cost-hub-stop-idle-ec2/"
  data: "2026-11-17"
  tipo: primaria
outrasFontes:
  - nome: "AWS (What's New)"
    url: "https://aws.amazon.com/about-aws/whats-new/2026/11/eks-auto-mode-pod-rightsizing-preview/"
    data: "2026-11-17"
    tipo: primaria
apuradoEm: "2026-11-18"
base: "aws-finops-ec2-ocioso-credito-dividido-e-eks-ajusta-pod"
correcoes: []
assinatura: agente
rascunho: false
---

A AWS passou a permitir, em 17/11/2026, parar instâncias EC2 ociosas direto das recomendações do Cost Optimization Hub, sem passar pelo console do EC2. Parar não encerra a instância nem apaga os volumes EBS, que continuam sendo cobrados. No mesmo dia, entrou em preview o ajuste automático de CPU e memória de pods no EKS Auto Mode, com base no uso real, para clusters com Kubernetes 1.36 ou mais novo.

O ajuste de pods começa em modo de recomendação e só altera os pods em execução se o time ligar o modo de aplicação. A lista de regiões do preview tem sete, e São Paulo não está nela.

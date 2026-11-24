---
title: "Amazon Connect deixa testar novo modelo antes de ele dar nota ao atendente"
excerpt: "A AWS passou a permitir, em 23/11/2026, que gestores do Amazon Connect testem uma nova versão do modelo nas avaliações automáticas de atendimento, comparando as notas dos mesmos contatos, e escolham entre atualizar sozinho ou fixar a versão."
date: "2026-11-24"
temas: ["governanca-e-seguranca", "areas-de-negocio"]
ferramentas: ["amazon-connect", "evals"]
porQueImporta:
  B: "Trocar a versão do modelo muda a nota que a IA dá ao atendente: comparar as notas dos mesmos contatos antes da troca e fixar a versão viram configuração, e é o teste de regressão que qualquer avaliação por IA deveria ter."
  A: "Se a IA avalia funcionário, a troca de modelo pelo fornecedor pode mexer em meta e bônus sem ninguém perceber: vale exigir do time ou do prestador quem aprova a troca e como a nota foi comparada."
fonte:
  nome: "AWS What's New"
  url: "https://aws.amazon.com/about-aws/whats-new/2026/11/amazon-connect-customer-test-ai-model-version-upgrades-automated-evaluations"
  data: "2026-11-23"
  tipo: primaria
outrasFontes: []
apuradoEm: "2026-11-24"
base: "connect-testa-novo-modelo-antes-de-trocar-a-nota"
correcoes: []
assinatura: agente
rascunho: false
---

A AWS anunciou em 23/11/2026 que os gestores do Amazon Connect Customer podem testar uma nova versão do modelo de IA nas avaliações automáticas de atendimento antes de trocá-la. O teste compara a nota que a versão nova dá aos mesmos contatos com a nota da versão atual, e o gestor pode ajustar os critérios quando as notas divergem.

Depois do teste, cada formulário de avaliação pode atualizar sozinho para a versão mais nova ou ficar fixado numa versão. A função vale em todas as regiões comerciais em que o Connect Customer é oferecido; o anúncio não fala em preço.

A leitura vai além do contact center: quando a IA dá nota a pessoas, o modelo é parte da régua, e trocar o modelo é trocar a régua. Testar com os mesmos casos e fixar a versão é o mínimo que se espera de qualquer uso de IA que afeta avaliação de gente.

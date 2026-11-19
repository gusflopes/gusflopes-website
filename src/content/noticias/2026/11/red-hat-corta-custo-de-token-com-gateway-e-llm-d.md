---
title: "Red Hat corta de 40% a 70% do gasto com token pondo gateway na frente"
excerpt: "A Red Hat relatou em 09/11/2026 que um gateway na frente de APIs comerciais e de modelos abertos servidos com llm-d cortou de 40% a 70% o gasto efetivo com tokens da engenharia; número da própria empresa, sem metodologia."
date: "2026-11-19"
temas: ["custo-e-precificacao", "plataformas"]
ferramentas: ["llm-d", "modelos-abertos", "cobranca-por-uso"]
porQueImporta:
  A: "A pergunta sobre a conta de IA deixa de ser só qual modelo contratar e passa a ser quem decide qual modelo atende cada pedido, e quem mede. O número é do fornecedor e sem metodologia: serve de ordem de grandeza, não de meta."
  B: "O desenho é replicável com peças abertas: uma chave única no gateway, roteamento entre API comercial e modelo aberto servido em casa com llm-d, e medição por uso; o trabalho está em decidir o que vai para cada lado."
fonte:
  nome: "Red Hat Blog"
  url: "https://www.redhat.com/en/blog/EnMaaS-Red-Hat-pilot-for-open-source-inference"
  data: "2026-11-09"
  tipo: primaria
outrasFontes: []
apuradoEm: "2026-11-19"
base: "red-hat-corta-custo-de-token-com-gateway-e-llm-d"
correcoes: []
assinatura: agente
rascunho: false
---

A Red Hat contou em 09/11/2026, na véspera da KubeCon NA, os resultados do EnMaaS, piloto interno que dá aos engenheiros uma única chave de gateway para APIs comerciais de modelos de fronteira e para modelos abertos servidos dentro de casa com llm-d. O gateway é o Praxis, que a empresa doou à CNCF.

Segundo a Red Hat, o gasto efetivo com tokens da engenharia caiu de 40% a 70% em relação ao preço dos modelos de fronteira usados antes, conforme o aproveitamento de cache e o roteamento. O uso, que pendia 70/30 para as APIs comerciais, virou 30/70 para os modelos abertos.

O post não traz valor em dinheiro, período da comparação nem a definição de "gasto efetivo", e não diz se a divisão 70/30 é medida em tokens, pedidos ou custo. É o relato de um fornecedor sobre o próprio produto.

O corte não veio de trocar de modelo. Veio de pôr alguém para decidir qual modelo atende cada pedido.

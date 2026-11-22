---
title: "Versões do agent-framework no PyPI traziam ladrão de credenciais"
excerpt: "As versões 1.26.1 e 1.26.2 do pacote legítimo agent-framework (Microsoft Agent Framework), publicadas no PyPI em 17/11/2026, roubavam credenciais ao iniciar o Python; o alerta manda tratar o ambiente como exposto."
date: "2026-11-22"
temas: ["governanca-e-seguranca", "engenharia-de-software"]
ferramentas: ["microsoft-agent-framework"]
porQueImporta:
  B: "Quem instalou 1.26.1 ou 1.26.2 em máquina, runner de CI ou imagem deve fixar a 1.26.0, reconstruir o ambiente e trocar todo segredo alcançável dali; versão fixada com hash evita a próxima."
  A: "Pacote oficial de fornecedor grande também é porta de entrada: vale perguntar ao time ou ao prestador como ele trava versões de dependência e em quanto tempo troca credenciais."
fonte:
  nome: "GitHub Advisory Database"
  url: "https://github.com/advisories/GHSA-764m-3ppc-5m73"
  data: "2026-11-18"
  tipo: primaria
outrasFontes:
  - nome: "BleepingComputer"
    url: "https://bleepingcomputer.com/news/security/microsofts-agent-framework-pypi-package-compromised-to-steal-credentials"
    data: "2026-11-18"
    tipo: imprensa
apuradoEm: "2026-11-22"
base: "agent-framework-pypi-versoes-com-ladrao-de-credenciais"
correcoes: []
assinatura: agente
rascunho: false
---

As versões 1.26.1 e 1.26.2 do pacote legítimo agent-framework, o Microsoft Agent Framework, publicadas no PyPI em 17/11/2026, traziam um ladrão de credenciais. Segundo o alerta GHSA-764m-3ppc-5m73 do GitHub, o código roda a cada início do Python, sem que o pacote seja importado, e coleta segredos de variáveis de ambiente, arquivos de credencial e tokens de nuvem e de CI; a 1.26.2 inclui os do GitHub Actions.

As duas versões foram removidas do PyPI, e a 1.26.0 é a última limpa. O alerta manda tratar como comprometido todo ambiente onde elas rodaram e trocar as credenciais. Como o ataque entrou no pacote não está no alerta.

O risco não depende de usar o framework em produção: basta a instalação, numa máquina de desenvolvimento ou num runner de CI, para o código rodar.

---
title: ".NET 8 e .NET 9 saem de suporte e param de receber correção"
excerpt: "O .NET 8 e o .NET 9 saíram de suporte em 10/11/2026; os últimos patches foram o 8.0.34 e o 9.0.23, no pacote de novembro, que corrigiu 25 CVEs. Sistema que segue nessas versões fica sem correção de segurança."
date: "2026-11-19"
temas: ["engenharia-de-software", "governanca-e-seguranca"]
ferramentas: ["dotnet", "github-copilot"]
porQueImporta:
  B: "Instale o 8.0.34 ou o 9.0.23 se ainda não instalou e abra o plano de migração para o .NET 10 ou 11; se usar o agente de upgrade, o critério de pronto é teste passando, não só build."
  A: "Peça o inventário de sistemas em .NET 8 e 9, dentro de casa e nos fornecedores, com data de migração: a partir de agora, falha nova nessas versões não terá correção."
fonte:
  nome: "Política de suporte do .NET"
  url: "https://dotnet.microsoft.com/en-us/platform/support/policy/dotnet-core"
  data: "2026-11-10"
  tipo: primaria
outrasFontes:
  - nome: ".NET Blog (atualizações de novembro)"
    url: "https://devblogs.microsoft.com/dotnet/dotnet-and-dotnet-framework-november-2026-servicing-updates/"
    data: "2026-11-10"
    tipo: primaria
apuradoEm: "2026-11-19"
base: "dotnet-8-e-9-fim-de-suporte-10-nov-25-cves"
correcoes: []
assinatura: agente
rascunho: false
---

O .NET 8, versão LTS, e o .NET 9 chegaram ao fim do suporte em 10/11/2026, segundo a página oficial de política de suporte. As últimas versões são a 8.0.34 e a 9.0.23.

Elas saíram no pacote de manutenção de novembro, publicado no mesmo dia, que corrigiu 25 CVEs. Daqui em diante, falha nova descoberta no 8 ou no 9 não ganha patch.

Para a saída, a Microsoft aposta na migração assistida pelo agente de upgrade do GitHub Copilot; na demonstração da .NET Conf, o "pronto" foi o build passar sem erro, e o teste do app migrado ficou como opção.

Sistema sem patch é risco que se acumula em silêncio.

---
title: "Java4Shell: falha crítica no OpenJDK 17.0.6+ em x86 com AVX-512"
excerpt: "A Calif.io divulgou em 17/11/2026 a CVE-2026-114938, execução remota de código sem credencial no OpenJDK 17.0.6 ou mais novo, com nota 9,2 no CVSS 4.0, restrita a processadores x86-64 com AVX-512 VBMI."
date: "2026-11-19"
temas: ["engenharia-de-software", "governanca-e-seguranca"]
ferramentas: ["openjdk"]
porQueImporta:
  B: "Quem roda Java em x86 recente precisa atualizar a JVM ou desligar o intrínseco de Base64 (-XX:-UseBASE64Intrinsics) já; servidores ARM64, como Graviton, ficam fora, o que ajuda a priorizar a frota."
fonte:
  nome: "Calif.io"
  url: "https://calif.io/java4shell/"
  data: "2026-11-17"
  tipo: primaria
outrasFontes: []
apuradoEm: "2026-11-18"
base: "java4shell-rce-no-openjdk-base64"
correcoes: []
assinatura: agente
rascunho: false
---

A Calif.io publicou em 17/11/2026 a CVE-2026-114938, apelidada de Java4Shell: uma entrada Base64 malformada permite a um atacante sem credencial corromper a memória e executar código no OpenJDK 17.0.6 ou mais novo. A nota é 9,2 no CVSS 4.0. A falha só existe em processadores x86-64 com AVX-512 VBMI; ARM64 não é afetado.

O contorno até a atualização é desligar a aceleração de Base64 com a opção -XX:-UseBASE64Intrinsics. A correção saiu junto com o aviso, em 17/11.

Não é assunto de IA, mas é o tipo de falha que pega serviço Java exposto à internet. O aviso oficial do OpenJDK não abriu na apuração; a lista de versões afetadas por produto está na página da Calif.io.

---
title: "Spring AI 2.1 pede confirmação antes de ferramenta e limita chamadas"
excerpt: "O Spring AI 2.1.0, lançado em 20/11/2026 sobre o Spring Boot 4.2, traz ferramenta que só roda com decisão de uma pessoa e tetos padrão de chamadas de ferramenta por turno."
date: "2026-11-21"
temas: ["agentes-engenharia", "governanca-e-seguranca"]
ferramentas: ["spring-ai", "humano-no-circuito", "mcp"]
porQueImporta:
  B: "Quem roda agente em Java passa a ter aprovação humana e limite de chamadas no próprio framework, em vez de cada time escrever o seu; a atualização exige migrar para o Boot 4.2 e trocar o ChatMemory."
fonte:
  nome: "Spring (blog)"
  url: "https://spring.io/blog/2026/11/20/spring-ai-2-1-0-GA-available-now"
  data: "2026-11-20"
  tipo: primaria
outrasFontes: []
apuradoEm: "2026-11-21"
base: "spring-ai-2-1-confirmacao-e-teto-de-tool-call"
correcoes: []
assinatura: agente
rascunho: false
---

O time do Spring lançou em 20/11/2026 o Spring AI 2.1.0, construído sobre o Spring Boot 4.2. A ferramenta marcada para confirmação pausa o ciclo de chamadas: nada da resposta roda antes da decisão de uma pessoa.

O ciclo também passa a limitar as chamadas por ferramenta e por turno, em 40 e 150 por padrão, configuráveis. E a nova Session API, com memória de sessão, compactação e recuperação, substitui o ChatMemory, que fica depreciado.

São os controles que todo time que põe agente em produção acaba escrevendo à mão. No framework, viram configuração revisável. O custo é a migração junto com o Boot 4.2.

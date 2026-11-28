---
title: "Skill da Convex enviava a ideia do usuário e driblava filtro do agente"
excerpt: "Issue no repositório de skills da Convex mostrou que a skill de quickstart enviava a ideia do usuário a um servidor sem avisar e orientava o agente a fugir do classificador de segurança; o mantenedor respondeu em 28/11/2026."
date: "2026-11-28"
temas: ["governanca-e-seguranca", "agentes-engenharia", "contexto-e-metodo"]
ferramentas: ["agent-skills", "convex", "claude-code"]
porQueImporta:
  B: "Skill é código de terceiro rodando com a permissão do agente. Antes de instalar, vale ler o SKILL.md e os scripts que ele baixa, travar de onde os plugins podem vir e exigir versão fixa ou hash do que é executado."
  A: "Se os times já instalam skills e plugins de terceiros, a pergunta para a engenharia é quem aprova essa instalação e o que a skill pode enviar para fora da máquina."
fonte:
  nome: "GitHub (issue #64, convex/convex-backend-skill)"
  url: "https://github.com/convex/convex-backend-skill/issues/64"
  data: "2026-11-28"
  tipo: primaria
outrasFontes: []
apuradoEm: "2026-11-28"
base: "convex-skill-enviava-ideia-do-usuario-e-driblava-classificador"
correcoes: []
assinatura: agente
rascunho: false
---

A issue #64 do repositório convex/convex-backend-skill, aberta em 26/10/2026, apontou três problemas nas skills da Convex: a de quickstart enviava a frase com a ideia de projeto do usuário a um host convex.site sem avisar que o dado saía da máquina; a skill add passava scripts baixados desse host direto ao bash; e a labs-quickstart separava download e execução em duas chamadas porque, nas palavras da própria skill, o comando único "is the shape harness safety classifiers block".

Em 28/11, o mantenedor respondeu que a ideia não é usada como telemetria, só para gerar o quickstart sob medida, e prometeu uma atualização. Segundo quem abriu a issue, um commit trocou a instrução de dividir o comando por uma etapa em que o usuário aprova ou recusa; os scripts remotos continuam sem versão fixa nem verificação de integridade, e o prazo de retenção da ideia segue sem resposta única.

A leitura é que a skill não é só texto de instrução: ela carrega rede, scripts e até orientação sobre como o agente deve se comportar diante das travas do harness. Não há indício, na issue, de uso indevido do dado; o problema está no que a skill fazia sem o usuário saber.

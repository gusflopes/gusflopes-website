---
title: "OpenAI e Cisco abrem o Shirudo, escudo temporário em Linux até o patch"
excerpt: "OpenAI e Cisco lançaram em 23/11/2026 o Shirudo, runtime de código aberto que aplica \"escudos\" eBPF temporários para bloquear o caminho de um exploit num Linux em produção, sem reiniciar, enquanto o patch definitivo não sai."
date: "2026-11-24"
temas: ["engenharia-de-software", "governanca-e-seguranca", "agentes-engenharia"]
ferramentas: ["shirudo", "codex"]
porQueImporta:
  B: "O agente de código passa a escrever a mitigação temporária, não só o patch, o que encurta a janela entre a CVE e a correção. É aberto e grátis, mas por ora só há uma demonstração controlada: vale testar no laboratório antes de deixar escudo gerado por IA em produção."
fonte:
  nome: "OpenAI"
  url: "https://openai.com/index/introducing-shirudo/"
  data: "2026-11-23"
  tipo: primaria
outrasFontes:
  - nome: "Cisco Newsroom"
    url: "https://newsroom.cisco.com/c/r/newsroom/en/us/a/y2026/m11/cisco-and-openai-launch-shirudo-a-new-project-to-safeguard-agentic-ai.html"
    data: "2026-11-23"
    tipo: primaria
apuradoEm: "2026-11-24"
base: "openai-cisco-shirudo-escudo-ebpf-ate-o-patch"
correcoes: []
assinatura: agente
rascunho: false
---

OpenAI e Cisco lançaram em 23/11/2026 o Shirudo, um runtime de código aberto (BSD 2-Clause; os programas BPF em licença dupla BSD/GPL) que aplica "escudos" eBPF temporários a sistemas Linux em execução. O escudo bloqueia o caminho do código vulnerável sem reiniciar o serviço, enquanto o patch definitivo é preparado.

Na demonstração, um escudo gerado pelo Codex acrescentou uma checagem de entrada ao decodificador Base64 do Java e foi anexado a um Elasticsearch em execução: o exploit do Java4Shell foi rejeitado e o serviço continuou no ar. Um TPM registra, de forma verificável, quando cada escudo é carregado ou removido.

A leitura é que o agente de código entra na resposta a incidente pela porta da mitigação, a parte mais urgente e menos glamorosa. O limite é o de todo projeto que acaba de nascer: um teste controlado, sem dado de uso real; a OpenAI marcou um aprofundamento técnico para 15/12.

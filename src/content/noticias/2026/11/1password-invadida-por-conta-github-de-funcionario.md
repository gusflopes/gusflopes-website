---
title: "1Password é invadida pela conta de GitHub de um funcionário"
excerpt: "A 1Password informou em 25/11/2026 que um invasor usou a conta corporativa de GitHub de um funcionário para chegar ao código e ao CI/CD e expor dados administrativos de parte dos usuários; os cofres não foram afetados."
date: "2026-11-27"
temas: ["governanca-e-seguranca", "engenharia-de-software"]
ferramentas: ["1password"]
porQueImporta:
  B: "A conta de GitHub e o token de CI são credenciais de produção: deles se chega ao código, aos segredos da pipeline e aos serviços. Vale revisar quem tem acesso de escrita, por quanto tempo vivem os tokens e o que a pipeline consegue publicar sem outra aprovação."
fonte:
  nome: "1Password"
  url: "https://1password.com/blog/update-on-nov-2026-security-incident"
  data: "2026-11-25"
  tipo: primaria
outrasFontes: []
apuradoEm: "2026-11-27"
base: "1password-invadida-por-conta-github-de-funcionario"
correcoes: []
assinatura: agente
rascunho: false
---

A 1Password informou em 25/11/2026 que um invasor usou a conta corporativa de GitHub de um funcionário para copiar código de repositórios privados, acessar o sistema de CI/CD e enviar código malicioso a serviços de backend.

Esses serviços baixaram dados administrativos de parte dos usuários, como nome, e-mail, identificadores de conta e chaves públicas. Segundo a empresa, o conteúdo dos cofres não foi acessado, e o usuário não precisa mudar nada na conta; a recomendação é desconfiar de e-mail, mensagem ou ligação sobre convite ou recuperação de conta que ele não pediu.

A leitura é sobre o caminho do ataque, não sobre o cofre: credencial de desenvolvedor, depois repositório, depois CI/CD, depois serviço em produção. A 1Password diz ter trocado todos os segredos que a pipeline guardava.

O que ainda não se sabe: como a conta foi tomada e quantos usuários foram afetados. A empresa promete a análise da causa nas próximas semanas.

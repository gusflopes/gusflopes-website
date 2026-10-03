---
name: nova-edicao
description: Traz uma edição da newsletter Radar de IA (Substack) do repositório de marketing para o arquivo do site em /newsletter, valida e prepara o deploy. Use quando sair ou ficar pronta uma edição nova, quando o texto de uma edição mudar no marketing, ou quando chegar o link do post no Substack.
---

# Nova edição da newsletter

A newsletter **Radar de IA** sai pelo Substack (`newsletter.substack` em `src/config/site.ts`); o site guarda o
arquivo em `/newsletter`. A fonte de cada edição é o repositório de marketing — o site é o espelho, nunca editado à mão.

## Onde está cada coisa

- Fonte: `../marketing-brands/gusflopes/content/newsletter/<AAAA-MM-DD>-<slug>/` com `edicao.md` (o texto) e
  `README.md` (assunto escolhido, pré-cabeçalho, pendências `[CONFIRMAR]`). Kit da publicação: `../substack.md`.
- Destino: `src/content/newsletter/<slug>.md` (schema `newsletter` em `src/content.config.ts`).
- Importação: `python3 .claude/skills/nova-edicao/importar.py <pasta> --edicao N --assunto "…" --preheader "…" [--substack-url …]`.
  Tira o comentário de instruções, a capa (vira `image`) e o link final para o próprio site.

## Quando rodar

1. **Edição pronta, ainda não enviada** (o marketing gera na sexta): importar sem `--substack-url`. A data da pasta é
   o sábado do envio, então o build de produção deixa a edição fora até um deploy feito na data
   (`src/lib/publicado.ts`). Commitar já: o arquivo fica pronto e aparece no `pnpm dev`.
2. **Texto mudou no marketing** (correções, imagens `-vN`): importar de novo com os mesmos argumentos. Sobrescreve.
3. **Edição enviada**: o Gustavo passa o link do post (`https://gusflopes.substack.com/p/<slug>`). Importar de novo com
   `--substack-url` e pedir o deploy.

## Passos

1. Ler o `README.md` da edição: **assunto** = o marcado como escolhido/recomendado (na dúvida, perguntar);
   **pré-cabeçalho** = a linha "Pré-cabeçalho"; **nº da edição** = o do título da pasta/README (`-01` → 1).
   Duração: a do README ("Leitura: ~… min"), senão estimar ~220 palavras/min.
2. Rodar o `importar.py`.
3. Validar antes de commitar:
   - `grep -n "CONFIRMAR" src/content/newsletter/<slug>.md` — nada pode sobrar. Se houver, listar ao Gustavo as
     pendências do README em vez de seguir (o filtro `publicado` também barraria a edição no build).
   - Toda imagem (`image` e as do corpo) responde 200: `curl -s -o /dev/null -w "%{http_code}" <url>`.
   - Com `--substack-url`: o post responde 200 e o `og:title` bate com o assunto
     (`curl -sL <url> | grep -o 'og:title" content="[^"]*"'`). 404 = ainda não publicado: importar sem o link e
     voltar depois.
   - `pnpm build` passa; em dev, `/newsletter/<slug>` renderiza.
4. Commit: `conteudo(newsletter): edição #N — <assunto>` (ou `… com o link do Substack`).
5. Deploy: `pnpm run deploy` publica em produção — **só com aval explícito**, e no dia do envio ou depois. Se a
   permissão for negada, pedir que o Gustavo rode `!pnpm run deploy` e depois conferir em produção
   `/newsletter/<slug>` (200, "Ler no Substack" quando houver link).

## Não fazer

- Não editar o `.md` espelhado à mão: corrigir no `edicao.md` do marketing e reimportar.
- Não mudar `newsletter.name`/`pitch` nem o texto das páginas: é copy (zona protegida, `CLAUDE.md`).
- Não publicar edição com `[CONFIRMAR]` nem antes do envio pelo Substack.

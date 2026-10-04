# Versões do redesign

Cada linha é uma versão navegável. O checkout pelo SHA funciona sempre. O checkout pela tag só funciona onde as tags existem: elas foram criadas na sessão de 04/10, mas o ambiente não deixou fazer push delas (veja o fim do arquivo).

Antes de trocar de versão, rode `git fetch origin` para ter as branches `design/*`. O checkout de um SHA deixa o repositório em "detached HEAD", o que é normal para olhar. Para voltar, use `git switch design/base` ou `git switch main`.

| Versão | Branch | SHA | Checkout |
| --- | --- | --- | --- |
| Base (antes do redesign; tagline nova, PRODUCT.md, Impeccable) | `design/base` | `a7829e8d1c4f04bb08e8ff49f7cbe1034ac8bee2` | `git checkout a7829e8` |
| redesign-v1-evolucao | `design/evolucao` | `61ce4b1fb3ca09ea2370f6e361b4377d08a9623c` | `git checkout 61ce4b1` |
| redesign-v2-evolucao | `design/evolucao` | `e84cf9edd62ed013c71e1b60d91644598c2cc03b` | `git checkout e84cf9e` |
| redesign-v3-evolucao | `design/evolucao` | `dd150beef7079019b827556a5779f2e434f05900` | `git checkout dd150be` |
| redesign-v4-evolucao | `design/evolucao` | `4994a372278a0dac9ab6556c40afc801ade01788` | `git checkout 4994a37` |
| redesign-v1-concretismo | `design/concretismo` | `e4022e9e8eb9f5949bc019e500c2480eab6d71df` | `git checkout e4022e9` |
| redesign-v2-concretismo | `design/concretismo` | `b70201cbe2e0b522fe858ae1864e5989563d07ac` | `git checkout b70201c` |
| redesign-v3-concretismo | `design/concretismo` | `e275549065ffad393ab27e1d7c66b59b3a60d512` | `git checkout e275549` |
| redesign-v4-concretismo | `design/concretismo` | `e0f149b4873214f6dfbe1f10e751650a1c68bf0d` | `git checkout e0f149b` |
| redesign-v1-pincelada | `design/pincelada` | `72b15f51579c66ae8f76a464e4e8ebc8c8d9dada` | `git checkout 72b15f5` |
| redesign-v2-pincelada | `design/pincelada` | `16a96d701136d379204a0d5e19da13ef531dfd1d` | `git checkout 16a96d7` |
| redesign-v3-pincelada | `design/pincelada` | `e28b3fe6fb46e4180599d19c07484c5ab0b6a0e1` | `git checkout e28b3fe` |
| redesign-v4-pincelada | `design/pincelada` | `fb4c63f7702f85ad3af00a826325a52d792edd4d` | `git checkout fb4c63f` |
| redesign-v1-metro (descartada) | `design/metro` | `0d2753a427688371bd853105e1e7a38b408f2c26` | `git checkout 0d2753a` |


## O que muda entre as versões

- **v1:** primeira construção de cada direção. O hero ganhou a cara da direção; o resto da página ainda tinha o mesmo esqueleto nas quatro.
- **v2:** refaz tudo abaixo do hero (mandato "mudou o hero, mas o resto continua ruim"). Na Pincelada, também o gerador de empasto.
- **v3:** "o hero prende, cada camada conquista". "Ideias recentes" fundida nos eixos e vídeo realocado nas três. Concretismo baixa o volume (par 900/100, caixa mista); Evolução vira camadas de revista; Pincelada troca o padrão "duas luzes + espiral" por seis arquétipos de composição.
- **v4:** cor como sistema (avaliação do dono: "um azulão só", "o laranja sumiu"). Laranja em detalhes pela página inteira, claros no ritmo, rodapé chegando do claro, cores do quadro (petróleo, areia, ferrugem, ardósia) com função, texto sobre laranja em azul-escuro. Na Pincelada, gerador recolorido com a paleta do quadro.

## Ver uma versão rodando

```sh
git checkout <sha>
pnpm install
pnpm dev          # http://localhost:3001
```

Na Pincelada, o primeiro `pnpm dev`/`pnpm build` gera as telas e leva cerca de 40 s a mais.

## Publicar as tags (uma vez, da sua máquina)

O push de tags foi recusado pelo ambiente da sessão (HTTP 403). Para criar as tags no GitHub:

```sh
git fetch origin design/evolucao design/concretismo design/pincelada design/metro
git tag -a redesign-v1-evolucao    61ce4b1 -m "Evolução v1"
git tag -a redesign-v2-evolucao    e84cf9e -m "Evolução v2"
git tag -a redesign-v3-evolucao    dd150be -m "Evolução v3"
git tag -a redesign-v4-evolucao    4994a37 -m "Evolução v4"
git tag -a redesign-v1-concretismo e4022e9 -m "Concretismo v1"
git tag -a redesign-v2-concretismo b70201c -m "Concretismo v2"
git tag -a redesign-v3-concretismo e275549 -m "Concretismo v3"
git tag -a redesign-v4-concretismo e0f149b -m "Concretismo v4"
git tag -a redesign-v1-pincelada   72b15f5 -m "Pincelada v1"
git tag -a redesign-v2-pincelada   16a96d7 -m "Pincelada v2"
git tag -a redesign-v3-pincelada   e28b3fe -m "Pincelada v3"
git tag -a redesign-v4-pincelada   fb4c63f -m "Pincelada v4"
git tag -a redesign-v1-metro       0d2753a -m "Metrô v1 (descartado)"
git push origin --tags
```

Depois disso, `git checkout redesign-v2-pincelada` funciona igual ao SHA.

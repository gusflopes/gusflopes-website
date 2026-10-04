/**
 * Abertura tipográfica — o sistema concretista que transforma um título em bloco de tipo.
 *
 * Regras determinísticas (mesmo título + mesmo eixo = mesma abertura, sempre):
 * 1. Corte: o título se divide no primeiro ": " (ou " — ", " – ", " - ", " (") em cabeça e cauda.
 *    A cabeça vira o bloco; a cauda vira a linha-fina abaixo dele. O separador fica visível,
 *    em laranja, no fim da última linha do bloco.
 * 2. Liga: palavras curtas (de, e, o, a, para, com…) não terminam linha — grudam na seguinte.
 * 3. Linhas: o número de linhas sai do comprimento da cabeça (1 a 5) e a quebra escolhe a
 *    partição mais equilibrada pelas larguras reais dos glifos (Archivo 900/100, medidas no
 *    build por scripts/gerar-metricas-abertura.mjs).
 * 4. Escala e forma por eixo:
 *    - engenharia → "bloco": cada linha ajustada à largura toda (justificado), alinhado à esquerda;
 *      a última linha leve.
 *    - negocios → "escada": larguras decrescentes, alinhado à direita; a primeira linha leve.
 *    - bastidores → "degraus": mesmo corpo em todas as linhas, cada uma recuada um degrau;
 *      a linha do meio leve.
 *    - newsletter → "bloco", com a última linha leve.
 * 5. Par 900/100: a linha marcada é o mesmo desenho no peso 100, sólida, medida com as larguras
 *    do peso 100. O contorno vazado fica para quem pede (`vazado: true`): na home, só o Simulador
 *    (e o MESMO da tese, que é montado à mão).
 *
 * O resultado é só dado (linhas, tamanhos em cqi, recuos); quem desenha é o componente
 * Abertura (site) e o gerador de capa do Substack (docs/substack-kit/gerar-capa.mjs).
 * Sem imports de TypeScript para rodar também direto no Node (type stripping).
 */
import metricas from './abertura-metricas.json' with { type: 'json' };

export type FormaAbertura = 'bloco' | 'escada' | 'degraus';
export type EixoAbertura = 'engenharia' | 'negocios' | 'bastidores' | 'newsletter';
/**
 * Instância de desenho: "larga" (Archivo 900/100, aberturas de texto e da tese) ou "estreita"
 * (850/62, aberturas de seção e de lista). Mesmas regras de corte, liga e forma; só muda a
 * largura dos glifos usada no ajuste.
 */
export type InstanciaAbertura = 'larga' | 'estreita';

export interface LinhaAbertura {
  texto: string;
  /** Corpo da linha em unidades de cqi (1cqi = 1% da largura do bloco). */
  fit: number;
  /** Recuo à esquerda em cqi (forma "degraus"). */
  recuo: number;
  /**
   * "leve": a linha marcada do par 900/100 (mesmo desenho no peso 100, sólida).
   * "vazado": só no contorno, reservado a pedidos explícitos (opção `vazado`).
   */
  estilo: 'cheio' | 'leve' | 'vazado';
  /** Largura da linha em em (para quem desenha fora do CSS). */
  largura: number;
}

export interface Abertura {
  forma: FormaAbertura;
  instancia: InstanciaAbertura;
  alinhamento: 'start' | 'end';
  linhas: LinhaAbertura[];
  /** Separador mantido no fim da última linha (":" ou "—"), desenhado em laranja. */
  sep?: string;
  cauda?: string;
}

const LIGA = new Set([
  'a', 'à', 'ao', 'as', 'às', 'o', 'os', 'e', 'é', 'de', 'da', 'do', 'das', 'dos', 'em', 'no', 'na',
  'nos', 'nas', 'um', 'uma', 'por', 'para', 'pra', 'com', 'que', 'se', 'sem', 'sua', 'seu', 'meu',
  'the', 'of', 'to', 'and', 'for', 'in', 'on', 'with', 'a', 'an', 'vs', 'x',
]);

const TRACKING = -0.02; // em por glifo, igual ao letter-spacing do CSS
const ESPACO_ESTREITA = 0.12; // em extra por espaço na estreita, igual ao word-spacing do CSS
// nenhuma linha passa deste corpo (em % da largura do bloco): 24 na larga, 34 na estreita
const TETOS: Record<InstanciaAbertura, number> = { larga: 24, estreita: 34 };
type Tabela = { larguras: Record<string, number>; padrao: number };
const TABELAS: Record<InstanciaAbertura, { cheio: Tabela; leve: Tabela }> = {
  larga: {
    cheio: { larguras: metricas.larguras as Record<string, number>, padrao: metricas.padrao },
    leve: { larguras: metricas.leve.larguras as Record<string, number>, padrao: metricas.leve.padrao },
  },
  estreita: {
    cheio: { larguras: metricas.estreita.larguras as Record<string, number>, padrao: metricas.estreita.padrao },
    leve: { larguras: metricas.estreita.leve.larguras as Record<string, number>, padrao: metricas.estreita.leve.padrao },
  },
};

/** Largura em em de um texto já em caixa-alta, na instância de display pedida (peso 900/850 ou leve 100). */
export function larguraEm(texto: string, instancia: InstanciaAbertura = 'larga', leve = false): number {
  const t = TABELAS[instancia][leve ? 'leve' : 'cheio'];
  let soma = 0;
  for (const ch of texto) soma += t.larguras[ch] ?? t.padrao;
  // a estreita leva word-spacing de 0.12em no CSS (o espaço dela é apertado demais)
  const espacos = instancia === 'estreita' ? (texto.match(/ /g)?.length ?? 0) * ESPACO_ESTREITA : 0;
  return soma / metricas.upm + TRACKING * [...texto].length + espacos;
}

const caixaAlta = (s: string) => s.toLocaleUpperCase('pt-BR');

function cortar(titulo: string): { cabeca: string; sep?: string; cauda?: string } {
  const t = titulo.replace(/\s+/g, ' ').trim();
  const doisPontos = t.indexOf(': ');
  if (doisPontos > 0) return { cabeca: t.slice(0, doisPontos), sep: ':', cauda: t.slice(doisPontos + 2) };
  const traco = t.match(/ ([—–-]) /);
  if (traco && traco.index && traco.index > 0) {
    return { cabeca: t.slice(0, traco.index), sep: '—', cauda: t.slice(traco.index + 3) };
  }
  const parentese = t.indexOf(' (');
  if (parentese > 0) return { cabeca: t.slice(0, parentese), cauda: t.slice(parentese + 1) };
  return { cabeca: t };
}

/** Palavras com as ligas aplicadas: "para aprender" vira uma unidade inquebrável. */
function unidades(cabeca: string): string[] {
  const palavras = cabeca.split(' ').filter(Boolean);
  const out: string[] = [];
  let pendente = '';
  palavras.forEach((p, i) => {
    const curta = LIGA.has(p.toLocaleLowerCase('pt-BR')) && i < palavras.length - 1;
    if (curta) {
      pendente = pendente ? `${pendente} ${p}` : p;
      return;
    }
    out.push(pendente ? `${pendente} ${p}` : p);
    pendente = '';
  });
  if (pendente) out.push(pendente);
  return out;
}

function numeroDeLinhas(cabeca: string, total: number, instancia: InstanciaAbertura): number {
  // A estreita cabe ~1,4× mais letras por linha: menos linhas para o mesmo título.
  const n = instancia === 'estreita' ? cabeca.length / 1.4 : cabeca.length;
  const alvo = n <= 11 ? 1 : n <= 24 ? 2 : n <= 38 ? 3 : n <= 54 ? 4 : 5;
  return Math.max(1, Math.min(alvo, total));
}

/** Partição em n linhas que minimiza a linha mais larga (desempate: soma dos quadrados). */
function particionar(us: string[], n: number, instancia: InstanciaAbertura): string[] {
  const w = (a: number, b: number) => larguraEm(caixaAlta(us.slice(a, b).join(' ')), instancia);
  let melhor: { max: number; sq: number; cortes: number[] } | null = null;
  const busca = (inicio: number, resta: number, cortes: number[]) => {
    if (resta === 1) {
      const todos = [...cortes, us.length];
      let ant = 0;
      let max = 0;
      let sq = 0;
      for (const c of todos) {
        const lw = w(ant, c);
        max = Math.max(max, lw);
        sq += lw * lw;
        ant = c;
      }
      if (!melhor || max < melhor.max - 1e-6 || (Math.abs(max - melhor.max) < 1e-6 && sq < melhor.sq)) {
        melhor = { max, sq, cortes: todos };
      }
      return;
    }
    for (let c = inicio + 1; c <= us.length - resta + 1; c++) busca(c, resta - 1, [...cortes, c]);
  };
  busca(0, n, []);
  const linhas: string[] = [];
  let ant = 0;
  for (const c of (melhor as { cortes: number[] } | null)?.cortes ?? [us.length]) {
    linhas.push(us.slice(ant, c).join(' '));
    ant = c;
  }
  return linhas;
}

const FORMA: Record<EixoAbertura, FormaAbertura> = {
  engenharia: 'bloco',
  negocios: 'escada',
  bastidores: 'degraus',
  newsletter: 'bloco',
};

const arred = (x: number) => Math.round(x * 100) / 100;

export function abertura(
  titulo: string,
  eixo: EixoAbertura = 'engenharia',
  instancia: InstanciaAbertura = 'larga',
  opcoes: { vazado?: boolean } = {},
): Abertura {
  const { cabeca, sep, cauda } = cortar(titulo);
  const us = unidades(cabeca);
  const n = numeroDeLinhas(cabeca, us.length, instancia);
  const textos = particionar(us, n, instancia);
  const forma = FORMA[eixo];
  const TETO_CQI = TETOS[instancia];
  // A linha marcada de cada forma: última no bloco, primeira na escada, a do meio nos degraus.
  // Ela é leve (peso 100, sólida) — o par 900/100; vazada só quando pedido.
  const marcada = n < 2 ? -1 : forma === 'bloco' ? n - 1 : forma === 'escada' ? 0 : Math.floor(n / 2);
  const marca: LinhaAbertura['estilo'] = opcoes.vazado ? 'vazado' : 'leve';
  const estilo = (i: number): LinhaAbertura['estilo'] => (i === marcada ? marca : 'cheio');
  // A largura medida inclui o separador na última linha, para ele caber no ajuste.
  const medidas = textos.map((t, i) =>
    larguraEm(caixaAlta(i === textos.length - 1 && sep ? t + sep : t), instancia, estilo(i) === 'leve'),
  );
  // margem de 3% para kerning e arredondamento do navegador
  const util = 97;

  let linhas: LinhaAbertura[];
  if (forma === 'bloco') {
    linhas = medidas.map((m, i) => ({
      texto: textos[i],
      fit: arred(Math.min(util / m, TETO_CQI)),
      recuo: 0,
      estilo: estilo(i),
      largura: m,
    }));
  } else if (forma === 'escada') {
    linhas = medidas.map((m, i) => {
      const fracao = n === 1 ? 1 : 1 - i * (n === 2 ? 0.28 : 0.42 / (n - 1));
      return {
        texto: textos[i],
        fit: arred(Math.min((util * fracao) / m, TETO_CQI)),
        recuo: 0,
        estilo: estilo(i),
        largura: m,
      };
    });
  } else {
    const degrau = n > 1 ? Math.min(8, 24 / (n - 1)) : 0;
    const recuos = medidas.map((_, i) => i * degrau);
    const corpo = Math.min(TETO_CQI, ...medidas.map((m, i) => (util - recuos[i]) / m));
    linhas = medidas.map((m, i) => ({
      texto: textos[i],
      fit: arred(corpo),
      recuo: arred(recuos[i]),
      estilo: estilo(i),
      largura: m,
    }));
  }

  return { forma, instancia, alinhamento: forma === 'escada' ? 'end' : 'start', linhas, sep, cauda };
}

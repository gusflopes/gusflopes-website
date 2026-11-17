import { useEffect, useState, type ReactNode } from 'react';
import { telaFaixa } from '../../lib/telas';
import {
  ANEIS,
  ANEL_IDS,
  CRITERIO_ANEL,
  EDICOES_RADAR,
  QUADRANTES,
  QUADRANTE_IDS,
  VISAO_IDS,
  VISOES,
  type AnelId,
  type EdicaoRadarId,
  type MovimentoId,
  type QuadranteId,
  type VisaoId,
} from '../../lib/temas';
import { AberturaHub } from '../AberturaHub';

export interface BlipView {
  id: string;
  nome: string;
  quadrante: QuadranteId;
  movimento: MovimentoId;
  visoes: Partial<Record<VisaoId, { anel: AnelId; texto: string; anterior?: AnelId }>>;
  /** Notícias publicadas que sustentam o blip. */
  evidencias: { title: string; href: string }[];
}

export interface TechRadarPageProps {
  edicao?: {
    id: string;
    title: string;
    excerpt: string;
    tipo: EdicaoRadarId;
    dateFormatted: string;
    rascunho: boolean;
    blips: BlipView[];
  };
  /** Outras edições publicadas (arquivo). */
  outras: { id: string; title: string; href: string; dateFormatted: string }[];
  /** Apresentação da edição (markdown) já renderizada. */
  children?: ReactNode;
}

type Mudanca = { tipo: 'novo' | 'subiu' | 'desceu' | 'igual'; anterior?: AnelId };

/** O que mudou no blip nesta visão: novo na edição, mudou de anel (com o anel anterior) ou sem mudança. */
function mudancaNa(b: BlipView, v: VisaoId): Mudanca {
  if (b.movimento === 'novo') return { tipo: 'novo' };
  const pos = b.visoes[v];
  if (pos?.anterior && pos.anterior !== pos.anel) {
    const subiu = ANEL_IDS.indexOf(pos.anel) < ANEL_IDS.indexOf(pos.anterior);
    return { tipo: subiu ? 'subiu' : 'desceu', anterior: pos.anterior };
  }
  if (b.movimento === 'subiu' || b.movimento === 'desceu') return { tipo: b.movimento };
  return { tipo: 'igual' };
}

function textoMudanca(m: Mudanca): string | undefined {
  if (m.tipo === 'novo') return 'Novo nesta edição';
  if (m.tipo === 'igual') return undefined;
  const verbo = m.tipo === 'subiu' ? 'Subiu' : 'Desceu';
  return m.anterior ? `${verbo} de anel · antes: ${ANEIS[m.anterior]}` : `${verbo} de anel`;
}

// --- Disco (estilo Thoughtworks): quatro quadrantes, quatro anéis, cada blip numerado ---------------------------

const TAM = 440;
const C = TAM / 2;
/** Raios das bordas dos anéis (adotar no centro), mais largos por dentro, como no radar da Thoughtworks. */
const RAIOS = [0, 80, 130, 170, 200];
/** Posição de cada quadrante no disco: ângulo inicial em graus (sentido anti-horário, 0° = leste). */
const ANGULO: Record<QuadranteId, number> = { plataforma: 0, tecnica: 90, ferramenta: 180, modelo: 270 };
/** Canto do rótulo do quadrante. */
const CANTO: Record<QuadranteId, { x: number; y: number; anchor: 'start' | 'end' }> = {
  tecnica: { x: 8, y: 18, anchor: 'start' },
  plataforma: { x: TAM - 8, y: 18, anchor: 'end' },
  ferramenta: { x: 8, y: TAM - 8, anchor: 'start' },
  modelo: { x: TAM - 8, y: TAM - 8, anchor: 'end' },
};
/** Tons dos anéis, do centro para fora (papel e creme da paleta). */
const TONS = ['#FDEED9', '#F9F2EC', '#F3ECE6', '#EEE7E1'];
const SANS = 'Hanken Grotesk Variable, Hanken Grotesk, system-ui, sans-serif';
const SERIF = 'Literata Variable, Literata, Georgia, serif';

const ponto = (raio: number, graus: number) => {
  const t = (graus * Math.PI) / 180;
  return { x: C + raio * Math.cos(t), y: C - raio * Math.sin(t) };
};

interface BlipNumerado extends BlipView {
  n: number;
  anel: AnelId;
  mudanca: Mudanca;
}

/** Blips da visão, numerados na ordem da lista: quadrante, anel, nome. */
function numerar(blips: BlipView[], v: VisaoId): BlipNumerado[] {
  return blips
    .flatMap((b) => {
      const pos = b.visoes[v];
      return pos ? [{ ...b, anel: pos.anel, mudanca: mudancaNa(b, v) }] : [];
    })
    .sort(
      (a, b) =>
        QUADRANTE_IDS.indexOf(a.quadrante) - QUADRANTE_IDS.indexOf(b.quadrante) ||
        ANEL_IDS.indexOf(a.anel) - ANEL_IDS.indexOf(b.anel) ||
        a.nome.localeCompare(b.nome, 'pt-BR')
    )
    .map((b, i) => ({ ...b, n: i + 1 }));
}

/** Posição determinística de cada blip dentro da sua célula (quadrante × anel), espalhando em ângulo e raio. */
function posicoes(blips: BlipNumerado[]) {
  const pos = new Map<string, { x: number; y: number }>();
  for (const q of QUADRANTE_IDS)
    ANEL_IDS.forEach((anel, k) => {
      const celula = blips.filter((b) => b.quadrante === q && b.anel === anel);
      const dentro = Math.max(RAIOS[k], 22);
      const fora = RAIOS[k + 1];
      const niveis = celula.length > 1 ? [0.3, 0.7, 0.5] : [0.5];
      celula.forEach((b, i) => {
        const graus = ANGULO[q] + 10 + ((i + 0.5) * 70) / celula.length;
        pos.set(b.id, ponto(dentro + (fora - dentro) * niveis[i % niveis.length], graus));
      });
    });
  return pos;
}

function Disco({ blips, visao }: { blips: BlipNumerado[]; visao: VisaoId }) {
  const pos = posicoes(blips);
  return (
    <svg
      viewBox={`0 0 ${TAM} ${TAM}`}
      role="img"
      aria-label={`Radar na visão ${VISOES[visao].label}: ${blips.length} itens. A lista abaixo traz cada um com o anel e a justificativa.`}
      className="w-full max-w-[34rem] h-auto mx-auto block"
    >
      {[3, 2, 1, 0].map((k) => (
        <circle key={k} cx={C} cy={C} r={RAIOS[k + 1]} fill={TONS[k]} stroke="#E6D9C8" strokeWidth={1} />
      ))}
      <line x1={C - RAIOS[4]} y1={C} x2={C + RAIOS[4]} y2={C} stroke="#F97316" strokeWidth={2} />
      <line x1={C} y1={C - RAIOS[4]} x2={C} y2={C + RAIOS[4]} stroke="#F97316" strokeWidth={2} />
      {ANEL_IDS.map((anel, k) => {
        const meio = (RAIOS[k] + RAIOS[k + 1]) / 2;
        return [C - meio, C + meio].map((x, i) => (
          <text key={`${anel}-${i}`} x={x} y={C - 5} textAnchor="middle" fontSize={k === 0 ? 10 : 8.5} fontWeight={700} fill="#315B6F" fontFamily={SANS}>
            {ANEIS[anel]}
          </text>
        ));
      })}
      {QUADRANTE_IDS.map((q) => (
        <text key={q} x={CANTO[q].x} y={CANTO[q].y} textAnchor={CANTO[q].anchor} fontSize={15} fontWeight={600} fill="#0B1A33" fontFamily={SERIF}>
          {QUADRANTES[q]}
        </text>
      ))}
      {blips.map((b) => {
        const p = pos.get(b.id)!;
        const mudou = textoMudanca(b.mudanca);
        return (
          <a key={b.id} href={`#${b.id}`} aria-label={`${b.n}. ${b.nome}`}>
            <title>{`${b.n}. ${b.nome} · ${ANEIS[b.anel]}${mudou ? ` · ${mudou}` : ''}`}</title>
            {b.mudanca.tipo !== 'igual' && (
              <circle
                cx={p.x}
                cy={p.y}
                r={11.5}
                fill="none"
                stroke="#0B1A33"
                strokeWidth={1.5}
                strokeDasharray={b.mudanca.tipo === 'novo' ? undefined : '3 2.5'}
              />
            )}
            <circle cx={p.x} cy={p.y} r={8} fill="#F97316" />
            <text x={p.x} y={p.y + 3} textAnchor="middle" fontSize={8.5} fontWeight={700} fill="#0B1A33" fontFamily={SANS}>
              {b.n}
            </text>
          </a>
        );
      })}
    </svg>
  );
}

/** Amostra da legenda do disco. */
function Marca({ tracejado, anel = true }: { tracejado?: boolean; anel?: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
      {anel && <circle cx="11" cy="11" r="9.5" fill="none" stroke="#0B1A33" strokeWidth="1.5" strokeDasharray={tracejado ? '3 2.5' : undefined} />}
      <circle cx="11" cy="11" r={anel ? 6 : 8} fill="#F97316" />
    </svg>
  );
}

/**
 * Radar (tech radar no estilo Thoughtworks): técnicas, ferramentas, plataformas e modelos em quatro anéis (adotar,
 * experimentar, avaliar, evitar), com uma visão por público. O disco mostra a posição de cada item; a lista por
 * quadrante (mesma numeração) traz a justificativa, o que mudou desde a edição anterior e as notícias que servem de
 * evidência — e é o que o leitor de tela lê. A visão vai no hash (#visao=ti-enxuta), para dar para mandar o link
 * certo para cada público; #<id-do-blip> (link vindo de uma notícia) abre a primeira visão em que o blip está.
 */
export function TechRadarPage({ edicao, outras, children }: TechRadarPageProps) {
  const [visao, setVisao] = useState<VisaoId>('tecnologia');

  const [alvo, setAlvo] = useState<string | null>(null);
  useEffect(() => {
    const hash = decodeURIComponent(window.location.hash.slice(1));
    const m = hash.match(/^visao=([a-z-]+)$/);
    if (m && (VISAO_IDS as readonly string[]).includes(m[1])) return setVisao(m[1] as VisaoId);
    const blip = edicao?.blips.find((b) => b.id === hash);
    const v = blip && VISAO_IDS.find((id) => blip.visoes[id]);
    if (v) {
      setVisao(v);
      setAlvo(hash);
    }
  }, [edicao]);
  useEffect(() => {
    if (alvo) document.getElementById(alvo)?.scrollIntoView();
  }, [alvo, visao]);

  const escolher = (v: VisaoId) => {
    setVisao(v);
    history.replaceState(null, '', `#visao=${v}`);
  };

  const blips = edicao ? numerar(edicao.blips, visao) : [];

  return (
    <main id="conteudo" tabIndex={-1} className="bg-papel min-h-screen">
      <AberturaHub
        tela={telaFaixa('tech-radar')}
        titulo="Radar"
        deck="Técnicas, ferramentas, plataformas e modelos de IA em quatro anéis — adotar, experimentar, avaliar, evitar — com uma leitura para cada tipo de empresa."
      />

      <div className="bg-papel papel">
        <div className="max-w-7xl mx-auto px-4 md:px-6 pt-10 md:pt-14 pb-20 md:pb-28">
          {!edicao ? (
            <div className="py-16 border-t border-regua font-sans text-tinta-2 grid gap-3">
              <p>Ainda não há edição publicada do Radar.</p>
              <p>
                A curadoria comentada que ficava nesta página até novembro de 2026 está no{' '}
                <a href="/noticias/curadoria/" className="text-laranja-fundo underline underline-offset-2 hover:no-underline">
                  arquivo da curadoria
                </a>
                .
              </p>
            </div>
          ) : (
            <>
              <header className="grid gap-4 lg:grid-cols-12 lg:gap-12 mb-10">
                <div className="lg:col-span-7">
                  <h2 className="capitulo font-serif text-[1.9rem] md:text-[2.4rem] leading-tight text-tinta">
                    {edicao.rascunho && <span className="rotulo text-laranja-fundo mr-3 align-middle">Rascunho</span>}
                    {edicao.title}
                  </h2>
                  <p className="mt-5 font-sans text-sm text-tinta-2">
                    {EDICOES_RADAR[edicao.tipo]} · {edicao.dateFormatted}
                  </p>
                </div>
                <div className="lg:col-span-5 font-sans text-tinta-2 leading-relaxed">
                  <p>{edicao.excerpt}</p>
                </div>
              </header>

              {children && <div className="leitura mb-12">{children}</div>}

              <nav aria-label="Visão do radar" className="rolagem-x flex flex-nowrap md:flex-wrap gap-x-6 gap-y-1 border-b border-regua -mx-4 px-4 md:mx-0 md:px-0">
                {VISAO_IDS.map((v) => (
                  <button
                    key={v}
                    type="button"
                    aria-pressed={visao === v}
                    onClick={() => escolher(v)}
                    className={`relative shrink-0 whitespace-nowrap py-3 font-sans text-[0.9375rem] font-semibold transition-colors after:absolute after:left-0 after:-bottom-px after:h-[3px] after:bg-laranja after:w-full after:origin-left after:transition-transform after:duration-300 ${
                      visao === v ? 'text-tinta after:scale-x-100' : 'text-tinta-2 hover:text-tinta after:scale-x-0'
                    }`}
                  >
                    {VISOES[v].label}
                  </button>
                ))}
              </nav>
              <p className="mt-4 mb-10 font-sans text-sm text-tinta-2">Para quem: {VISOES[visao].publico}.</p>

              <div className="grid gap-10 lg:grid-cols-12 lg:gap-12 mb-14">
                <div className="lg:col-span-7">
                  <Disco blips={blips} visao={visao} />
                  <ul aria-label="Legenda do disco" className="mt-5 flex flex-wrap justify-center gap-x-6 gap-y-2 font-sans text-sm text-tinta-2">
                    <li className="inline-flex items-center gap-2"><Marca anel={false} />Sem mudança</li>
                    <li className="inline-flex items-center gap-2"><Marca />Novo</li>
                    <li className="inline-flex items-center gap-2"><Marca tracejado />Mudou de anel</li>
                  </ul>
                </div>
                <dl className="lg:col-span-5 border-t-2 border-t-laranja self-start">
                  {ANEL_IDS.map((anel) => (
                    <div key={anel} className="border-b border-regua py-4">
                      <dt className="font-serif text-xl text-tinta">{ANEIS[anel]}</dt>
                      <dd className="mt-1 font-sans text-sm text-tinta-2 leading-relaxed">{CRITERIO_ANEL[visao][anel]}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="grid gap-12 md:grid-cols-2 md:gap-x-12 md:gap-y-14">
                {QUADRANTE_IDS.map((q) => {
                  const doQuadrante = blips.filter((b) => b.quadrante === q);
                  return (
                    <section key={q} aria-labelledby={`quadrante-${q}`}>
                      <h3 id={`quadrante-${q}`} className="capitulo font-serif text-2xl md:text-[1.75rem] text-tinta mb-4">
                        {QUADRANTES[q]}
                      </h3>
                      {doQuadrante.length === 0 ? (
                        <p className="border-t-2 border-t-laranja py-5 font-sans text-sm text-tinta-2">Nada neste quadrante nesta visão.</p>
                      ) : (
                        <ol className="border-t-2 border-t-laranja">
                          {doQuadrante.map((b) => {
                            const mudou = textoMudanca(b.mudanca);
                            return (
                              <li key={b.id} id={b.id} className="border-b border-regua py-5 scroll-mt-24">
                                <p className="font-serif text-[1.3rem] leading-snug text-tinta flex items-baseline gap-3">
                                  <span className="font-sans text-sm font-bold text-tinta tabular-nums bg-laranja min-w-7 h-7 px-1.5 inline-flex items-center justify-center shrink-0 self-center">
                                    {b.n}
                                  </span>
                                  {b.nome}
                                </p>
                                <p className="mt-2 font-sans text-sm flex flex-wrap items-center gap-x-2 gap-y-1">
                                  <span className="font-bold text-petroleo">{ANEIS[b.anel]}</span>
                                  {mudou && <span className="text-tinta-2">· {mudou}</span>}
                                </p>
                                <p className="mt-3 font-sans text-tinta-2 leading-relaxed max-w-[68ch]">{b.visoes[visao]?.texto}</p>
                                {b.evidencias.length > 0 && (
                                  <div className="mt-3 font-sans text-sm text-tinta-2">
                                    <p className="font-semibold text-tinta">Evidência nas notícias:</p>
                                    <ul className="mt-1 grid gap-1">
                                      {b.evidencias.map((e) => (
                                        <li key={e.href}>
                                          <a href={e.href} className="text-laranja-fundo underline underline-offset-2 hover:no-underline">
                                            {e.title}
                                          </a>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                              </li>
                            );
                          })}
                        </ol>
                      )}
                    </section>
                  );
                })}
              </div>
            </>
          )}

          {outras.length > 0 && (
            <section aria-labelledby="edicoes-anteriores" className="mt-20 border-t border-regua pt-10">
              <h2 id="edicoes-anteriores" className="capitulo font-serif text-2xl text-tinta mb-6">Outras edições</h2>
              <ul>
                {outras.map((o) => (
                  <li key={o.id} className="border-b border-regua">
                    <a href={o.href} className="flex justify-between gap-4 py-3 font-sans text-[0.9375rem] text-tinta hover:text-laranja-fundo transition-colors">
                      <span>{o.title}</span>
                      <span className="text-tinta-2 tabular-nums">{o.dateFormatted}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </main>
  );
}

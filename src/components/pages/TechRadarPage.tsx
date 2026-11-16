import { useEffect, useState, type ReactNode } from 'react';
import { telaFaixa } from '../../lib/telas';
import {
  ANEIS,
  ANEL_IDS,
  CRITERIO_ANEL,
  MOVIMENTOS,
  QUADRANTES,
  VISAO_IDS,
  VISOES,
  type AnelId,
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
  visoes: Partial<Record<VisaoId, { anel: AnelId; texto: string }>>;
  /** Notícias publicadas que sustentam o blip. */
  evidencias: { title: string; href: string }[];
}

export interface TechRadarPageProps {
  edicao?: {
    id: string;
    title: string;
    excerpt: string;
    dateFormatted: string;
    rascunho: boolean;
    blips: BlipView[];
  };
  /** Outras edições publicadas (arquivo). */
  outras: { id: string; title: string; href: string; dateFormatted: string }[];
  /** Apresentação da edição (markdown) já renderizada. */
  children?: ReactNode;
}

/**
 * Tech radar: ferramentas e práticas em quatro anéis (adotar, experimentar, avaliar, evitar), com uma
 * visão por público. Em vez do disco clássico, uma lista por anel: lê no celular, cabe em leitor de tela
 * e cada blip leva a justificativa e as notícias que a sustentam. A visão escolhida vai no hash
 * (#visao=ti-enxuta), para dar para mandar o link certo para cada público.
 */
export function TechRadarPage({ edicao, outras, children }: TechRadarPageProps) {
  const [visao, setVisao] = useState<VisaoId>('tecnologia');

  // #visao=<id> escolhe a visão; #<blip> (link vindo de uma notícia) abre a primeira visão em que o blip está e rola até ele.
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

  return (
    <main id="conteudo" tabIndex={-1} className="bg-papel min-h-screen">
      <AberturaHub
        tela={telaFaixa('tech-radar')}
        titulo="Tech radar"
        deck="Ferramentas e práticas de IA em quatro anéis — adotar, experimentar, avaliar, evitar — com uma leitura para cada tipo de empresa."
      />

      <div className="bg-papel papel">
        <div className="max-w-7xl mx-auto px-4 md:px-6 pt-10 md:pt-14 pb-20 md:pb-28">
          {!edicao ? (
            <p className="py-16 border-t border-regua font-sans text-tinta-2">Ainda não há edição publicada do tech radar.</p>
          ) : (
            <>
              <header className="grid gap-4 lg:grid-cols-12 lg:gap-12 mb-10">
                <div className="lg:col-span-7">
                  <h2 className="capitulo font-serif text-[1.9rem] md:text-[2.4rem] leading-tight text-tinta">
                    {edicao.rascunho && <span className="rotulo text-laranja-fundo mr-3 align-middle">Rascunho</span>}
                    {edicao.title}
                  </h2>
                  <p className="mt-5 font-sans text-sm text-tinta-2">Edição de {edicao.dateFormatted}</p>
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

              <div className="grid gap-12 md:gap-14">
                {ANEL_IDS.map((anel) => {
                  const blips = edicao.blips.filter((b) => b.visoes[visao]?.anel === anel);
                  return (
                    <section key={anel} aria-labelledby={`anel-${anel}`} className="grid gap-4 lg:grid-cols-12 lg:gap-12">
                      <div className="lg:col-span-4">
                        <h3 id={`anel-${anel}`} className="capitulo font-serif text-2xl md:text-[1.75rem] text-tinta">
                          {ANEIS[anel]}
                        </h3>
                        <p className="mt-4 font-sans text-sm text-tinta-2 leading-relaxed max-w-[40ch]">{CRITERIO_ANEL[visao][anel]}</p>
                      </div>
                      <div className="lg:col-span-8">
                        {blips.length === 0 ? (
                          <p className="border-t-2 border-t-laranja py-5 font-sans text-sm text-tinta-2">Nada neste anel nesta edição.</p>
                        ) : (
                          <ul className="border-t-2 border-t-laranja">
                            {blips.map((b) => (
                              <li key={b.id} id={b.id} className="border-b border-regua py-5 scroll-mt-24">
                                <p className="font-serif text-[1.3rem] leading-snug text-tinta">{b.nome}</p>
                                <p className="mt-1 font-sans text-sm flex flex-wrap items-center gap-x-2 gap-y-1">
                                  <span className="marca" aria-hidden="true" />
                                  <span className="font-bold text-petroleo">{QUADRANTES[b.quadrante]}</span>
                                  <span className="text-tinta-2">· {MOVIMENTOS[b.movimento]}</span>
                                </p>
                                <p className="mt-3 font-sans text-tinta-2 leading-relaxed max-w-[68ch]">{b.visoes[visao]?.texto}</p>
                                {b.evidencias.length > 0 && (
                                  <p className="mt-3 font-sans text-sm text-tinta-2">
                                    Evidência:{' '}
                                    {b.evidencias.map((e, i) => (
                                      <span key={e.href}>
                                        {i > 0 && ' · '}
                                        <a href={e.href} className="text-laranja-fundo underline underline-offset-2 hover:no-underline">
                                          {e.title}
                                        </a>
                                      </span>
                                    ))}
                                  </p>
                                )}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
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

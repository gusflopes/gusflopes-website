import { ArrowRight } from 'lucide-react';
import { EIXOS, EIXO_CAMPO, type EixoId } from '../lib/eixos';
import { Abertura, NomeCelula } from './Abertura';

export interface TextoEixo {
  title: string;
  href: string;
  /** Data ISO (YYYY-MM-DD) e partes já formatadas para exibição (dia; mês e ano). */
  isoDate: string;
  dia: string;
  mesAno: string;
}

export interface EixoResumo {
  id: EixoId;
  /** Textos mais recentes do eixo (o primeiro é o mais recente), se houver. */
  textos: TextoEixo[];
  /** Link alternativo quando o eixo ainda não tem texto (ex.: projeto em produção). */
  projeto?: { label: string; href: string };
}

interface EixosProps {
  eixos: EixoResumo[];
}

/**
 * Trabalho da seção: escolher por onde entrar — e ver o que saiu em cada porta.
 * Composição: um plano de petróleo alto (cor do quadro; a pergunta, em papel) encostado em três linhas de papel, uma
 * por porta, cada uma aberta por filete laranja de 2px (sem marca de canto). A ação de cada porta é link com seta: a
 * região não tem ação chapada. O nome do eixo é estreita 780 em caixa mista (a caixa-alta 900 fica para a
 * pergunta); os textos mais recentes do eixo descem como linhas de tabela iguais às dos hubs:
 * dia em numeral leve no campo do quadro do eixo | título | "Mais recente" ao lado do primeiro.
 */
export function Eixos({ eixos }: EixosProps) {
  if (eixos.length === 0) return null;

  return (
    <section aria-labelledby="eixos-title" className="campo-azul max-lg:pt-12">
      <div className="moldura !px-0 md:!px-[var(--gutter)]">
        <div className="grid lg:grid-cols-12 gap-[2px] bg-azul">
          <div
            className={`campo-azul !bg-petroleo lg:col-span-4 ${eixos.length === 3 ? 'lg:row-span-3' : eixos.length === 2 ? 'lg:row-span-2' : ''} px-[var(--gutter)] md:px-7 pt-8 pb-9 lg:py-10 flex flex-col justify-between gap-8 border-t-2 border-papel`}
          >
            <Abertura id="eixos-title" as="h2" titulo="O que eu escrevo, e para quem" instancia="estreita" teto={7} />
            <p className="font-serif text-[1.125rem] leading-snug max-w-[34ch] text-papel">
              Tecnologia e negócio são partes do mesmo sistema — mas cada leitor entra por uma porta.
            </p>
          </div>

          {eixos.map(({ id, textos, projeto }) => {
            const eixo = EIXOS[id];
            const temTexto = textos.length > 0;
            return (
              <article key={id} className="campo-papel lg:col-span-8 grid md:grid-cols-8 border-t-2 border-laranja">
                <div className="md:col-span-3 px-[var(--gutter)] md:px-7 pt-9 md:pt-12 md:pb-8 flex flex-col gap-4">
                  <a href={eixo.href} className="group block text-azul hover:text-laranja-fundo transition-colors">
                    <NomeCelula titulo={eixo.label} inteiro className="!text-[clamp(2rem,1.45rem+1.2vw,2.5rem)] !text-current lg:whitespace-nowrap" />
                  </a>
                  <p className="font-sans font-semibold [font-stretch:87%] text-[0.9375rem] leading-snug text-tinta-2">{eixo.publico}</p>
                </div>
                <div className="md:col-span-5 md:border-l border-filete px-[var(--gutter)] md:px-7 pt-4 pb-8 md:pt-12 md:pb-8 flex flex-col gap-5">
                  <p className="font-serif text-[1.0625rem] leading-relaxed text-tinta">{eixo.descricao}</p>
                  {temTexto && (
                    <ol className="filete-laranja">
                      {textos.map((t, i) => (
                        <li key={t.href} className="border-b border-filete">
                          <a
                            href={t.href}
                            className="group grid grid-cols-[4.75rem_minmax(0,1fr)] gap-x-4 gap-y-1 py-3 hover:bg-papel-3 transition-colors"
                          >
                            {/* Célula de data no campo do eixo (o mesmo dos hubs): a cor diz para quem é o texto. */}
                            <time dateTime={t.isoDate} className={`row-span-2 self-start flex flex-col gap-1.5 px-2 pt-2 pb-2.5 ${EIXO_CAMPO[id].campo} ${EIXO_CAMPO[id].texto}`}>
                              <span className="numeral text-[2.25rem]">{t.dia}</span>
                              <span className="rotulo !text-[0.6875rem] !tracking-[0.08em]">{t.mesAno}</span>
                            </time>
                            <span className="font-sans font-bold [font-stretch:87%] text-[1.0625rem] leading-snug text-azul group-hover:text-laranja-fundo transition-colors">
                              {t.title}
                            </span>
                            {i === 0 && (
                              <span className="rotulo text-tinta-2 inline-flex items-center gap-2">
                                <span className="marca !w-2 !h-2" aria-hidden="true" />
                                Mais recente
                              </span>
                            )}
                          </a>
                        </li>
                      ))}
                    </ol>
                  )}
                  <a href={temTexto ? eixo.href : projeto?.href ?? eixo.href} className="acao mt-auto self-start">
                    {temTexto ? `Ler ${eixo.shortLabel}` : projeto?.label ?? `Ver ${eixo.shortLabel}`}
                    <ArrowRight size={16} strokeWidth={2.5} aria-hidden="true" />
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

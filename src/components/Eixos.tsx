import { ArrowRight } from 'lucide-react';
import { EIXOS, type EixoId } from '../lib/eixos';
import { Abertura } from './Abertura';

export interface EixoResumo {
  id: EixoId;
  /** Texto mais recente do eixo, se houver. */
  destaque?: { title: string; href: string };
  /** Link alternativo quando o eixo ainda não tem texto (ex.: projeto em produção). */
  projeto?: { label: string; href: string };
}

interface EixosProps {
  eixos: EixoResumo[];
}

/**
 * Trabalho da seção: escolher por onde entrar.
 * Composição: um plano laranja alto (a pergunta) encostado em três linhas de papel, uma por
 * porta. O nome de cada eixo é uma abertura estreita que ocupa a célula inteira, na forma do
 * próprio eixo; o texto mais recente fica numa célula de metadados ao lado do título dele.
 */
export function Eixos({ eixos }: EixosProps) {
  if (eixos.length === 0) return null;

  return (
    <section aria-labelledby="eixos-title" className="campo-azul">
      <div className="moldura !px-0 md:!px-[var(--gutter)]">
        <div className="grid lg:grid-cols-12 gap-[2px] bg-azul">
          <div
            className={`campo-laranja lg:col-span-4 ${eixos.length === 3 ? 'lg:row-span-3' : eixos.length === 2 ? 'lg:row-span-2' : ''} px-[var(--gutter)] md:px-7 pt-8 pb-9 lg:py-10 flex flex-col justify-between gap-8`}
          >
            <Abertura id="eixos-title" as="h2" titulo="O que eu escrevo, e para quem" instancia="estreita" teto={7} />
            <p className="font-serif text-[1.125rem] leading-snug max-w-[34ch]">
              Tecnologia e negócio são partes do mesmo sistema — mas cada leitor entra por uma porta.
            </p>
          </div>

          {eixos.map(({ id, destaque, projeto }) => {
            const eixo = EIXOS[id];
            return (
              <article key={id} className="campo-papel lg:col-span-8 grid md:grid-cols-8">
                <div className="md:col-span-3 px-[var(--gutter)] md:px-7 pt-7 md:py-8 flex flex-col gap-4">
                  <a href={eixo.href} className="group block text-azul hover:text-laranja-fundo transition-colors">
                    <Abertura as="h3" titulo={eixo.label} eixo={id} instancia="estreita" teto={4.75} semCauda className="!text-current" />
                  </a>
                  <p className="font-sans font-semibold [font-stretch:87%] text-[0.9375rem] leading-snug text-tinta-2">{eixo.publico}</p>
                </div>
                <div className="md:col-span-5 md:border-l border-filete px-[var(--gutter)] md:px-7 pt-4 pb-8 md:py-8 flex flex-col gap-5">
                  <p className="font-serif text-[1.0625rem] leading-relaxed text-tinta">{eixo.descricao}</p>
                  {destaque && (
                    <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-4 border-t border-filete pt-3">
                      <a href={destaque.href} className="font-sans font-bold [font-stretch:87%] text-[1.0625rem] leading-snug text-azul hover:text-laranja-fundo transition-colors">
                        {destaque.title}
                      </a>
                      <span className="rotulo text-tinta-2 pt-0.5">Mais recente</span>
                    </div>
                  )}
                  <a href={destaque ? eixo.href : projeto?.href ?? eixo.href} className="acao mt-auto self-start">
                    {destaque ? `Ler ${eixo.shortLabel}` : projeto?.label ?? `Ver ${eixo.shortLabel}`}
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

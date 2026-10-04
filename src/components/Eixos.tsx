import { ArrowRight } from 'lucide-react';
import { EIXOS, type EixoId } from '../lib/eixos';

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
 * Faixa sólida dos eixos: uma grade de células em papel, separadas por filetes azul-escuro.
 * A primeira célula, laranja, diz o que a faixa é; as outras são as portas de entrada.
 * A página só recebe eixos que têm algo para mostrar.
 */
export function Eixos({ eixos }: EixosProps) {
  if (eixos.length === 0) return null;

  const cols = eixos.length === 3 ? 'lg:grid-cols-4' : eixos.length === 2 ? 'lg:grid-cols-3' : 'lg:grid-cols-2';

  return (
    <section aria-labelledby="eixos-title" className="campo-azul">
      <div className="moldura !px-0 lg:!px-[var(--gutter)]">
        <div className={`grid grid-cols-1 md:grid-cols-2 ${cols} gap-[2px] bg-azul`}>
          <div className="bg-laranja text-laranja-tinta px-[var(--gutter)] lg:px-7 py-8 lg:py-10 flex flex-col gap-4">
            <h2 id="eixos-title" className="display text-[2rem] md:text-[2.375rem] uppercase text-laranja-tinta">
              O que eu escrevo, e para quem
            </h2>
            <p className="font-serif text-[1.0625rem] leading-snug">
              Tecnologia e negócio são partes do mesmo sistema — mas cada leitor entra por uma porta.
            </p>
          </div>

          {eixos.map(({ id, destaque, projeto }) => {
            const eixo = EIXOS[id];
            return (
              <article
                key={id}
                className="relative flex flex-col bg-papel px-[var(--gutter)] lg:px-7 py-8 lg:py-10 transition-colors hover:bg-papel-2"
              >
                <h3 className="display text-[1.75rem] md:text-[2rem] uppercase mb-3">
                  <a href={eixo.href} className="text-azul hover:text-laranja-fundo transition-colors">
                    {eixo.label}
                  </a>
                </h3>
                <p className="rotulo text-tinta-2 mb-4">{eixo.publico}</p>
                <p className="font-serif text-[1.0625rem] leading-relaxed text-tinta mb-6 flex-grow">{eixo.descricao}</p>

                {destaque && (
                  <div className="border-t border-filete pt-3 mb-6">
                    <span className="rotulo block text-tinta-2 mb-1.5">Mais recente</span>
                    <a href={destaque.href} className="font-sans font-bold [font-stretch:87%] text-[1.0625rem] leading-snug text-azul hover:text-laranja-fundo transition-colors">
                      {destaque.title}
                    </a>
                  </div>
                )}

                <a href={destaque ? eixo.href : projeto?.href ?? eixo.href} className="acao mt-auto self-start">
                  {destaque ? `Ler ${eixo.shortLabel}` : projeto?.label ?? `Ver ${eixo.shortLabel}`}
                  <ArrowRight size={16} strokeWidth={2.5} aria-hidden="true" />
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

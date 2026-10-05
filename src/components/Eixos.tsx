import { ArrowRight } from 'lucide-react';
import { EIXOS, type EixoId } from '../lib/eixos';
import { telaPortas } from '../lib/telas';
import { TelaPicture } from './TelaPicture';

export interface EixoResumo {
  id: EixoId;
  /** Textos mais recentes do eixo (até dois), do mais novo para o mais antigo. */
  recentes: { title: string; href: string }[];
  /** Link alternativo quando o eixo ainda não tem texto (ex.: projeto em produção). */
  projeto?: { label: string; href: string };
}

interface EixosProps {
  eixos: EixoResumo[];
}

/**
 * "Escolher por onde entrar" (e ver o que acabou de sair): o primeiro campo claro depois da
 * abertura — papel, como a coluna de leitura — com uma tela em três estratos ao lado de três portas. A tela tem a estrutura da lista — cada estrato corre ao lado de uma porta — e o fio
 * laranja é a costura vertical entre a pintura e as portas. Cada porta traz os textos mais
 * recentes do eixo (a antiga lista "Ideias recentes" vive aqui).
 */
export function Eixos({ eixos }: EixosProps) {
  if (eixos.length === 0) return null;

  return (
    <section aria-labelledby="eixos-title" className="bg-papel papel px-4 md:px-6 pt-16 pb-16 md:pt-24 md:pb-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid gap-4 lg:grid-cols-12 lg:gap-14 mb-10 md:mb-14 items-end">
          <h2 id="eixos-title" className="capitulo lg:col-span-7 font-serif text-[2.1rem] md:text-5xl leading-[1.08] tracking-[-0.01em] text-tinta">
            O que eu escrevo, e para quem
          </h2>
          <p className="lg:col-span-5 font-sans text-lg text-tinta-2 leading-relaxed max-w-[52ch] lg:pb-1.5">
            Tecnologia e negócio são partes do mesmo sistema — mas cada leitor entra por uma porta.
          </p>
        </div>

        <div className="grid lg:grid-cols-12">
          <figure className="lg:col-span-4 relative h-36 md:h-48 lg:h-auto overflow-hidden" aria-hidden="true">
            <div className="absolute inset-0">
              <TelaPicture tela={telaPortas()} sizes="(min-width: 1024px) 34vw, 100vw" />
            </div>
          </figure>

          <ol className="lg:col-span-8 border-l-[3px] lg:border-l-[6px] border-laranja">
            {eixos.map(({ id, recentes, projeto }, i) => {
              const eixo = EIXOS[id];
              const [maisRecente, anterior] = recentes;
              return (
                <li key={id} className={`cartao ${i > 0 ? 'border-t border-regua' : ''}`}>
                  <span className="fio-vivo" />
                  <div className="grid gap-x-10 gap-y-4 pl-5 pr-0 py-8 md:py-10 lg:pl-10 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
                    <div>
                      <h3 className="font-serif text-3xl md:text-[2.25rem] leading-[1.05] text-tinta mb-3">
                        <a href={eixo.href} className="hover:text-laranja-fundo transition-colors">
                          {eixo.label}
                        </a>
                      </h3>
                      <p className="font-sans text-sm font-semibold leading-snug text-petroleo">{eixo.publico}</p>
                    </div>
                    <div className="flex flex-col gap-4">
                      <p className="font-sans text-tinta-2 leading-relaxed">{eixo.descricao}</p>
                      {maisRecente && (
                        <ul className="flex flex-col gap-5 border-l-2 border-ardosia pl-4">
                          <li>
                            {/* o rótulo fica colado acima do título que ele qualifica, e o próximo item vem depois de um respiro maior */}
                            <span className="flex items-center gap-2 rotulo text-petroleo mb-1.5"><span className="marca" aria-hidden="true" />Mais recente</span>
                            <a href={maisRecente.href} className="font-serif text-lg leading-snug text-tinta hover:text-laranja-fundo transition-colors">
                              {maisRecente.title}
                            </a>
                          </li>
                          {anterior && (
                            <li>
                              <a href={anterior.href} className="font-serif text-base leading-snug text-tinta-2 hover:text-laranja-fundo transition-colors">
                                {anterior.title}
                              </a>
                            </li>
                          )}
                        </ul>
                      )}
                      <a href={maisRecente ? eixo.href : projeto?.href ?? eixo.href} className="acao text-laranja-fundo">
                        {maisRecente ? `Ler ${eixo.shortLabel}` : projeto?.label ?? `Ver ${eixo.shortLabel}`}
                        <ArrowRight size={16} aria-hidden="true" />
                      </a>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

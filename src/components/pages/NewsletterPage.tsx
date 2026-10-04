import { newsletter } from '../../config/site';
import { NewsletterCta } from '../NewsletterCta';
import { Abertura } from '../Abertura';

export interface EdicaoResumo {
  id: string;
  edicao: number;
  title: string;
  excerpt: string;
  dateFormatted: string;
}

/** Arquivo da newsletter: inscrição no topo, edições da mais recente para a mais antiga. */
export function NewsletterPage({ edicoes }: { edicoes: EdicaoResumo[] }) {
  return (
    <main>
      <header className="campo-azul pt-[72px]">
        <div className="moldura pt-12 md:pt-16 pb-12 md:pb-16">
          <Abertura titulo={newsletter.name} eixo="newsletter" teto={9} />
        </div>
      </header>

      <div className="campo-papel pb-24">
        <div className="moldura pt-12 md:pt-16 grid gap-14 lg:grid-cols-12 lg:gap-x-[var(--gutter)] items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <NewsletterCta content="newsletter-arquivo" />
          </div>

          <section className="lg:col-span-7" aria-labelledby="edicoes-title">
            <Abertura id="edicoes-title" as="h2" titulo="Edições" instancia="estreita" teto={7} />
            {edicoes.length === 0 ? (
              <p className="font-serif text-[1.0625rem] text-tinta-2 border-t-2 border-azul pt-6 mt-6">A primeira edição sai em breve.</p>
            ) : (
              <ul className="mt-6">
                {edicoes.map((e) => (
                  <li key={e.id} className="border-t-2 border-laranja border-b border-b-filete">
                    <a href={`/newsletter/${e.id}`} className="group grid gap-x-6 gap-y-3 py-7 sm:grid-cols-[minmax(0,1fr)_8.5rem]">
                      <div>
                        <h3 className="font-sans font-extrabold [font-stretch:87%] text-[1.625rem] md:text-[2.125rem] leading-[1.05] tracking-[-0.012em] text-azul group-hover:text-laranja-fundo transition-colors text-balance mb-3">
                          {e.title}
                        </h3>
                        <p className="font-serif text-[1.0625rem] leading-relaxed text-tinta-2 max-w-[60ch]">{e.excerpt}</p>
                      </div>
                      <p className="sm:col-start-2 sm:row-start-1 rotulo text-laranja-fundo tabular-nums">
                        Edição{' '}
                        <span className="numeral normal-case text-azul text-[1.75rem] sm:text-[3.75rem] sm:block sm:my-1">#{e.edicao}</span>
                        <span className="sm:sr-only"> · </span>
                        {e.dateFormatted}
                      </p>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}

import { newsletter } from '../../config/site';
import { telaFaixa, usaTela } from '../../lib/telas';
import { AberturaHub } from '../AberturaHub';
import { NewsletterCta } from '../NewsletterCta';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export interface EdicaoResumo {
  id: string;
  edicao: number;
  title: string;
  excerpt: string;
  dateFormatted: string;
  /** Capa autoral da edição (a mesma do Substack). */
  image?: string;
}

/**
 * Arquivo da newsletter: a mesma abertura dos outros hubs (faixa de tela acima, fio e o título na
 * faixa escura baixa). Inscrição ao lado, edições da mais recente para a mais antiga.
 */
export function NewsletterPage({ edicoes }: { edicoes: EdicaoResumo[] }) {
  return (
    <main className="bg-noite min-h-screen">
      <AberturaHub tela={telaFaixa('newsletter')} titulo={newsletter.name} />

      {/* Corpo em papel: as edições se leem de dia; o rodapé chega pela fita depois deste campo. */}
      <div className="bg-papel papel">
      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-12 md:pt-16 pb-20 md:pb-28 grid gap-12 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5 lg:order-last">
          <NewsletterCta content="newsletter-arquivo" pilha />
        </div>

        <section aria-labelledby="edicoes-title" className="lg:col-span-7">
          <h2 id="edicoes-title" className="font-serif text-2xl md:text-3xl text-tinta mb-6">Edições</h2>
          {edicoes.length === 0 ? (
            <p className="text-tinta-2">A primeira edição sai em breve.</p>
          ) : (
            <ul className="border-t-4 border-laranja">
              {edicoes.map((e) => (
                <li key={e.id} className="border-b border-laranja">
                  <a href={`/newsletter/${e.id}`} className="cartao group grid sm:grid-cols-[180px_minmax(0,1fr)] gap-5 py-7">
                    {e.image && !usaTela(e.image) && (
                      <div className="aspect-[16/9] overflow-hidden bg-noite-2">
                        <ImageWithFallback src={e.image} alt="" loading="lazy" className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div>
                      <h3 className="font-serif text-2xl md:text-[1.75rem] leading-snug text-tinta group-hover:text-laranja-fundo transition-colors mb-2">
                        {e.title}
                      </h3>
                      <p className="font-sans text-tinta-2 leading-relaxed mb-3">{e.excerpt}</p>
                      <p className="font-sans text-sm font-semibold text-petroleo flex items-center gap-2"><span className="marca" aria-hidden="true" />
                        Edição #{e.edicao} · {e.dateFormatted}
                      </p>
                    </div>
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

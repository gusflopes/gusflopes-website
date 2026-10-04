import { newsletter } from '../../config/site';
import { NewsletterCta } from '../NewsletterCta';
import { RecorteQuadro } from '../RecorteQuadro';
import type { FundoResponsivo } from '../../lib/imagens';

export interface EdicaoResumo {
  id: string;
  edicao: number;
  title: string;
  excerpt: string;
  dateFormatted: string;
}

/**
 * Arquivo da newsletter: moldura escura com o recorte do quadro, a inscrição numa faixa de creme
 * (a caixa da página) e as edições no papel, da mais recente para a mais antiga.
 */
export function NewsletterPage({ edicoes, fundo }: { edicoes: EdicaoResumo[]; fundo: FundoResponsivo }) {
  return (
    <main className="claro min-h-screen bg-papel text-tinta">
      <div className="bg-noite pt-32 md:pt-40 pb-12 md:pb-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h1 className="display-opsz font-serif font-semibold text-5xl md:text-[4.5rem] leading-[1] text-white">
            {newsletter.name}
          </h1>
        </div>
      </div>

      <RecorteQuadro fundo={fundo} eager />

      <div className="bg-creme">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 md:py-12">
          <NewsletterCta content="newsletter-arquivo" />
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-14 md:pt-20 pb-24 md:pb-32">
        <h2 className="h-secao text-tinta pb-5">Edições</h2>
        {edicoes.length === 0 ? (
          <p className="mt-8 text-tinta-2">A primeira edição sai em breve.</p>
        ) : (
          <ul>
            {edicoes.map((e) => (
              <li key={e.id} className="indice-linha">
                <a href={`/newsletter/${e.id}`} className="group block py-8 md:py-10">
                  <h3 className="font-serif text-2xl md:text-[1.875rem] font-semibold leading-[1.18] text-tinta group-hover:text-laranja-fundo transition-colors">
                    {e.title}
                  </h3>
                  <p className="meta mt-3">
                    <span className="font-semibold">Edição #{e.edicao}</span>
                    <span>{e.dateFormatted}</span>
                  </p>
                  <p className="mt-4 font-sans text-[1.0625rem] leading-relaxed text-tinta-2 max-w-[40rem]">{e.excerpt}</p>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}

import { newsletter } from '../../config/site';
import { NewsletterCta } from '../NewsletterCta';

export interface EdicaoResumo {
  id: string;
  edicao: number;
  title: string;
  excerpt: string;
  dateFormatted: string;
}

/**
 * Arquivo da newsletter em papel frio, como o Substack: inscrição no topo, edições da mais
 * recente para a mais antiga.
 */
export function NewsletterPage({ edicoes }: { edicoes: EdicaoResumo[] }) {
  return (
    <main className="claro min-h-screen bg-papel text-tinta">
      <div className="bg-noite pt-32 md:pt-40 pb-14 md:pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h1 className="font-serif font-semibold text-5xl md:text-[4.25rem] leading-[1.02] tracking-[-0.018em] text-white">
            {newsletter.name}
          </h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-12 md:pt-16 pb-24 md:pb-32">
        <NewsletterCta content="newsletter-arquivo" />

        <h2 className="font-serif text-[1.75rem] md:text-[2rem] leading-tight text-tinta mt-20 pb-5 border-b border-tinta">Edições</h2>
        {edicoes.length === 0 ? (
          <p className="mt-8 text-tinta-2">A primeira edição sai em breve.</p>
        ) : (
          <ul>
            {edicoes.map((e) => (
              <li key={e.id} className="border-b border-papel-fio">
                <a href={`/newsletter/${e.id}`} className="group grid gap-3 sm:grid-cols-[7.5rem_minmax(0,1fr)] sm:gap-8 py-8">
                  <p className="num font-sans text-sm text-tinta-3 sm:pt-1.5">
                    <span className="block font-semibold text-laranja-fundo">Edição #{e.edicao}</span>
                    {e.dateFormatted}
                  </p>
                  <div>
                    <h3 className="font-serif text-2xl md:text-[1.75rem] font-semibold leading-snug text-tinta group-hover:text-laranja-fundo transition-colors mb-2">
                      {e.title}
                    </h3>
                    <p className="font-sans text-[1.0625rem] leading-relaxed text-tinta-2">{e.excerpt}</p>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}

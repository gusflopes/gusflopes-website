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
 * Arquivo da newsletter: inscrição no topo, edições da mais recente para a mais antiga,
 * como paradas de um serviço semanal (trilho tracejado laranja).
 */
export function NewsletterPage({ edicoes }: { edicoes: EdicaoResumo[] }) {
  return (
    <main className="min-h-screen bg-noite text-luz">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-12 md:pt-16 pb-24">
        <h1 className="text-5xl md:text-7xl leading-none font-extrabold tracking-[-0.035em] text-white mb-10">
          {newsletter.name}
        </h1>
        <NewsletterCta content="newsletter-arquivo" />

        <h2 className="text-2xl md:text-3xl font-extrabold tracking-[-0.02em] text-white mt-16 mb-8">Edições</h2>
        {edicoes.length === 0 ? (
          <p className="text-nevoa">A primeira edição sai em breve.</p>
        ) : (
          <ol className="list-none m-0 p-0">
            {edicoes.map((e, idx) => (
              <li key={e.id} className="flex gap-5">
                <div
                  aria-hidden="true"
                  className={`trilhos ${idx === 0 ? 'trilhos-inicio' : ''} ${idx === edicoes.length - 1 ? 'trilhos-fim' : ''}`}
                >
                  <span data-tracejado style={{ '--linha': 'var(--color-laranja)' } as React.CSSProperties}>
                    <span className="estacao-ponto" />
                  </span>
                </div>
                <a href={`/newsletter/${e.id}`} className="group block min-w-0 flex-1 pb-12">
                  <p className="text-[0.8rem] font-bold uppercase tracking-[0.1em] text-laranja-claro tabular-nums mb-2">
                    Edição #{e.edicao} · {e.dateFormatted}
                  </p>
                  <h3 className="text-2xl md:text-[1.9rem] leading-[1.15] font-extrabold tracking-[-0.02em] text-white group-hover:underline decoration-laranja decoration-2 underline-offset-[6px] mb-3">
                    {e.title}
                  </h3>
                  <p className="font-serif text-[1.05rem] md:text-lg text-nevoa leading-relaxed">{e.excerpt}</p>
                </a>
              </li>
            ))}
          </ol>
        )}
      </div>
    </main>
  );
}

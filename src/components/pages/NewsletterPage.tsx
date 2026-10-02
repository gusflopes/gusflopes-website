import { newsletter } from '../../config/site';
import { NewsletterCta } from '../NewsletterCta';

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
    <main className="pt-32 pb-24 px-6 min-h-screen bg-slate-950 text-slate-200">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-serif text-4xl md:text-6xl text-white font-bold mb-8">{newsletter.name}</h1>
        <NewsletterCta content="newsletter-arquivo" />

        <h2 className="font-serif text-2xl text-white mt-16 mb-6">Edições</h2>
        {edicoes.length === 0 ? (
          <p className="text-slate-400">A primeira edição sai em breve.</p>
        ) : (
          <ul className="space-y-8">
            {edicoes.map((e) => (
              <li key={e.id} className="border-b border-slate-800 pb-8">
                <p className="font-mono text-xs uppercase tracking-wider text-orange-400 mb-2">
                  Edição #{e.edicao} · {e.dateFormatted}
                </p>
                <a href={`/newsletter/${e.id}`} className="group">
                  <h3 className="font-serif text-2xl md:text-3xl text-white group-hover:text-orange-300 transition-colors mb-2">
                    {e.title}
                  </h3>
                  <p className="font-sans text-slate-400 leading-relaxed">{e.excerpt}</p>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}

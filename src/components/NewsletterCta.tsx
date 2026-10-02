import { newsletter, linkInscricao } from '../config/site';
import { SocialLinks } from './SocialLinks';

/**
 * Caixa de inscrição das páginas da newsletter. Sem `newsletter.substack` configurado,
 * avisa que as inscrições abrem em breve e aponta para as redes.
 */
export function NewsletterCta({ content }: { content: string }) {
  return (
    <div className="rounded-xl border border-orange-500/40 bg-slate-900/70 p-6 md:p-8">
      <p className="font-sans text-slate-300 leading-relaxed mb-5">{newsletter.pitch}</p>
      {newsletter.substack ? (
        <a
          href={linkInscricao(content)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center font-sans bg-orange-500 hover:bg-orange-600 text-[#1c0a02] font-bold px-8 h-12 rounded-lg transition-colors"
        >
          {newsletter.ctaLabel}
        </a>
      ) : (
        <>
          <p className="font-sans text-sm text-slate-400 mb-3">
            As inscrições abrem em breve. Enquanto isso, as notícias do dia a dia estão nas redes:
          </p>
          <SocialLinks linkClassName="text-slate-400 hover:text-white" />
        </>
      )}
    </div>
  );
}

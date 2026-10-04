import { newsletter, linkInscricao } from '../config/site';
import { SocialLinks } from './SocialLinks';

/**
 * Caixa de inscrição das páginas da newsletter. Sem `newsletter.substack` configurado,
 * avisa que as inscrições abrem em breve e aponta para as redes.
 */
export function NewsletterCta({ content }: { content: string }) {
  return (
    <div className="relative rounded-md bg-noite-2 p-6 md:p-8 overflow-hidden">
      {/* o serviço semanal: trilho tracejado laranja no topo da caixa */}
      <span
        aria-hidden="true"
        className="absolute left-0 right-0 top-0 h-1.5 bg-[repeating-linear-gradient(to_right,var(--color-laranja)_0_18px,transparent_18px_26px)]"
      />
      <p className="font-serif text-lg text-luz leading-relaxed mb-6 max-w-[56ch]">{newsletter.pitch}</p>
      {newsletter.substack ? (
        <a
          href={linkInscricao(content)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center bg-laranja hover:bg-laranja-claro text-brasa font-bold px-7 min-h-12 rounded-md transition-colors"
        >
          {newsletter.ctaLabel}
        </a>
      ) : (
        <>
          <p className="text-sm text-nevoa mb-3">
            As inscrições abrem em breve. Enquanto isso, as notícias do dia a dia estão nas redes:
          </p>
          <SocialLinks linkClassName="text-nevoa hover:text-white" />
        </>
      )}
    </div>
  );
}

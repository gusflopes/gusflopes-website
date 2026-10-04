import { ArrowRight } from 'lucide-react';
import { newsletter, linkInscricao } from '../config/site';
import { SocialLinks } from './SocialLinks';

/**
 * Caixa de inscrição das páginas da newsletter (papel frio, como o Substack). Sem
 * `newsletter.substack` configurado, avisa que as inscrições abrem em breve e aponta para as redes.
 */
export function NewsletterCta({ content }: { content: string }) {
  return (
    <div className="border-y border-tinta py-8 md:py-10 grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
      <p className="font-serif text-xl md:text-[1.375rem] leading-snug text-tinta max-w-[34rem]">{newsletter.pitch}</p>
      {newsletter.substack ? (
        <a
          href={linkInscricao(content)}
          target="_blank"
          rel="noopener noreferrer"
          className="botao justify-self-start"
        >
          {newsletter.ctaLabel}
          <ArrowRight size={18} strokeWidth={2.25} aria-hidden="true" />
        </a>
      ) : (
        <div>
          <p className="font-sans text-sm text-tinta-2 mb-3">
            As inscrições abrem em breve. Enquanto isso, as notícias do dia a dia estão nas redes:
          </p>
          <SocialLinks linkClassName="text-tinta-3 hover:text-tinta" />
        </div>
      )}
    </div>
  );
}

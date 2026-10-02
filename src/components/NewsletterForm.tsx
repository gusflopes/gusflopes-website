import { newsletter, linkInscricao } from '../config/site';

interface NewsletterFormProps {
  /** "hero" usa o botão grande; "footer" usa o layout compacto. */
  variant?: 'hero' | 'footer';
}

/**
 * Chamada para a newsletter. A inscrição acontece no Substack (`newsletter.substack` em
 * src/config/site.ts); sem URL configurada, o botão leva para o arquivo em /newsletter.
 */
export function NewsletterForm({ variant = 'hero' }: NewsletterFormProps) {
  const isHero = variant === 'hero';
  const externo = Boolean(newsletter.substack);
  return (
    <a
      href={linkInscricao(`newsletter-${variant}`)}
      {...(externo && { target: '_blank', rel: 'noopener noreferrer' })}
      className={
        isHero
          ? 'inline-flex items-center justify-center font-sans bg-orange-500 hover:bg-orange-600 text-[#1c0a02] font-bold px-8 h-14 rounded-lg text-lg shadow-lg shadow-orange-900/20 transition-all hover:scale-105 shrink-0'
          : 'inline-flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-[#1c0a02] font-bold w-full h-10 rounded-md'
      }
    >
      {newsletter.ctaLabel}
    </a>
  );
}

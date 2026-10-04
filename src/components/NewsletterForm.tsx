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
          ? 'inline-flex items-center justify-center bg-laranja hover:bg-laranja-claro text-brasa font-bold px-7 h-13 min-h-[3.25rem] rounded-md text-[1.05rem] shadow-[0_1px_0_rgb(255_255_255/0.25)_inset,0_10px_24px_-12px_rgb(249_115_22/0.7)] transition-colors shrink-0'
          : 'inline-flex items-center justify-center bg-laranja hover:bg-laranja-claro text-brasa font-bold w-full h-11 rounded-md transition-colors'
      }
    >
      {newsletter.ctaLabel}
    </a>
  );
}

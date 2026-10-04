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
      className={isHero ? 'botao self-start min-h-[3.25rem] px-7 text-[1.0625rem]' : 'botao w-full'}
    >
      {newsletter.ctaLabel}
    </a>
  );
}

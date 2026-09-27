import { newsletter } from '../config/site';

interface NewsletterFormProps {
  /** "hero" usa o botão grande; "footer" usa o layout compacto. */
  variant?: 'hero' | 'footer';
}

/**
 * Chamada para a newsletter. A inscrição acontece na página de reforma-tributaria.gusflopes.dev
 * (formulário com Turnstile e consentimentos LGPD), a primeira newsletter de gusflopes.dev.
 * Quando houver um provedor próprio da newsletter, troque `newsletter.url` em src/config/site.ts.
 */
export function NewsletterForm({ variant = 'hero' }: NewsletterFormProps) {
  const isHero = variant === 'hero';
  const url = `${newsletter.url}${newsletter.url.includes('?') ? '&' : '?'}utm_content=newsletter-${variant}#inscricao`;
  return (
    <a
      href={url}
      className={
        isHero
          ? 'inline-flex items-center justify-center font-sans bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 h-14 rounded-lg text-lg shadow-lg shadow-orange-900/20 transition-all hover:scale-105 shrink-0'
          : 'inline-flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white font-bold w-full h-10 rounded-md'
      }
    >
      {newsletter.ctaLabel}
    </a>
  );
}

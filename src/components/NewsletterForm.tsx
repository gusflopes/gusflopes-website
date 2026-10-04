import { ArrowRight } from 'lucide-react';
import { newsletter, linkInscricao } from '../config/site';

interface NewsletterFormProps {
  /**
   * "hero" usa o botão grande; "footer" usa o layout compacto; "link" é a ação em texto laranja
   * com seta (rodapé de página que já fecha com a caixa da newsletter: um botão chapado por tela).
   */
  variant?: 'hero' | 'footer' | 'link';
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
        variant === 'link' ? 'acao text-laranja' : isHero ? 'botao min-h-[3.25rem] px-6 text-[1.0625rem]' : 'botao w-full sm:w-auto'
      }
    >
      {newsletter.ctaLabel}
      <ArrowRight size={variant === 'link' ? 16 : 18} strokeWidth={variant === 'link' ? 2 : 2.25} aria-hidden="true" />
    </a>
  );
}

import { newsletter, linkInscricao } from '../config/site';
import { SocialLinks } from './SocialLinks';

/**
 * Plano laranja de inscrição (laranja chapado = a ação principal da região) das páginas da newsletter. Sem `newsletter.substack` configurado,
 * avisa que as inscrições abrem em breve e aponta para as redes.
 */
export function NewsletterCta({ content }: { content: string }) {
  return (
    <div className="campo-laranja p-6 md:p-8">
      <p className="font-sans font-medium [font-stretch:87%] text-[1.25rem] md:text-[1.375rem] leading-snug mb-6 max-w-[40ch]">{newsletter.pitch}</p>
      {newsletter.substack ? (
        <a
          href={linkInscricao(content)}
          target="_blank"
          rel="noopener noreferrer"
          className="botao"
        >
          {newsletter.ctaLabel}
        </a>
      ) : (
        <>
          <p className="font-sans text-sm mb-3">
            As inscrições abrem em breve. Enquanto isso, as notícias do dia a dia estão nas redes:
          </p>
          <SocialLinks linkClassName="text-laranja-tinta hover:text-azul" />
        </>
      )}
    </div>
  );
}

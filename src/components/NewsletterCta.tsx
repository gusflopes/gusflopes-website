import { newsletter, linkInscricao } from '../config/site';
import { SocialLinks } from './SocialLinks';

/**
 * Caixa de inscrição das páginas da newsletter. Sem `newsletter.substack` configurado,
 * avisa que as inscrições abrem em breve e aponta para as redes.
 */
export function NewsletterCta({ content }: { content: string }) {
  return (
    <div className="campo-azul border-t-4 border-laranja p-6 md:p-8">
      <p className="font-sans font-medium [font-stretch:87%] text-[1.25rem] md:text-[1.375rem] leading-snug text-papel mb-6 max-w-[40ch]">{newsletter.pitch}</p>
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
          <p className="font-sans text-sm text-ceu-claro mb-3">
            As inscrições abrem em breve. Enquanto isso, as notícias do dia a dia estão nas redes:
          </p>
          <SocialLinks linkClassName="text-ceu-claro hover:text-laranja" />
        </>
      )}
    </div>
  );
}

import { newsletter, linkInscricao } from '../config/site';
import { SocialLinks } from './SocialLinks';

/**
 * Caixa de inscrição das páginas da newsletter. Sem `newsletter.substack` configurado,
 * avisa que as inscrições abrem em breve e aponta para as redes.
 */
export function NewsletterCta({ content }: { content: string }) {
  return (
    <div className="bg-noite text-nevoa fio p-6 md:p-8">
      <p className="font-serif text-lg md:text-xl text-white leading-snug mb-6 max-w-[48ch]">{newsletter.pitch}</p>
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
          <p className="font-sans text-sm text-nevoa mb-3">
            As inscrições abrem em breve. Enquanto isso, as notícias do dia a dia estão nas redes:
          </p>
          <SocialLinks linkClassName="text-nevoa hover:text-laranja-claro" />
        </>
      )}
    </div>
  );
}

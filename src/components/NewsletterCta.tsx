import { newsletter, linkInscricao } from '../config/site';
import { telaNewsletter } from '../lib/telas';
import { SocialLinks } from './SocialLinks';
import { TelaPicture } from './TelaPicture';

/**
 * Caixa de inscrição das páginas da newsletter e do fim dos textos. A tela é a da própria
 * newsletter (semente "Radar de IA", a mesma da capa no Substack), vista de perto, ao lado do
 * convite — nunca atrás dele. `pilha` empilha tela e texto (colunas estreitas).
 * Sem `newsletter.substack` configurado, avisa que as inscrições abrem em breve e aponta para as redes.
 */
export function NewsletterCta({ content, pilha = false }: { content: string; pilha?: boolean }) {
  return (
    <div className={`bg-noite-2 text-nevoa grid ${pilha ? '' : 'sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]'}`}>
      <div className={`relative overflow-hidden h-28 ${pilha ? 'sm:h-36' : 'sm:h-auto sm:min-h-full'}`} aria-hidden="true">
        <div className="absolute inset-0">
          <TelaPicture tela={telaNewsletter()} sizes={pilha ? '(min-width: 1024px) 34vw, 100vw' : '(min-width: 640px) 260px, 100vw'} />
        </div>
      </div>
      <div className={`p-6 md:p-8 ${pilha ? 'border-t-[3px]' : 'border-t-[3px] sm:border-t-0 sm:border-l-[3px]'} border-laranja`}>
        <p className="font-serif text-lg md:text-xl text-white leading-snug mb-6 max-w-[48ch]">{newsletter.pitch}</p>
        {newsletter.substack ? (
          <a href={linkInscricao(content)} target="_blank" rel="noopener noreferrer" className="botao">
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
    </div>
  );
}

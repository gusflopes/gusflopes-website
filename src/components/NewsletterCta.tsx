import { newsletter, linkInscricao } from '../config/site';
import { telaNewsletter } from '../lib/telas';
import { SocialLinks } from './SocialLinks';
import { TelaPicture } from './TelaPicture';

/**
 * Caixa de inscrição das páginas da newsletter e do fim dos textos. A tela é a da própria
 * newsletter (semente "Radar de IA", a mesma da capa no Substack): correntes que passam, em escala
 * 1:1 — uma coluna estreita ao lado do convite, nunca atrás dele, e nunca o close da Ferramenta.
 * O convite fica sempre sobre um campo claro (fim do texto, arquivo): a caixa é o campo de areia do
 * quadro, com o texto em tinta — nunca um bloco escuro logo acima do rodapé.
 * `pilha` empilha tela e texto (colunas estreitas), com a tela em faixa baixa.
 * Sem `newsletter.substack` configurado, avisa que as inscrições abrem em breve e aponta para as redes.
 */
export function NewsletterCta({ content, pilha = false }: { content: string; pilha?: boolean }) {
  return (
    <div className={`bg-campo papel text-tinta-2 grid ${pilha ? '' : 'md:grid-cols-[200px_minmax(0,1fr)]'}`}>
      <div className={`relative overflow-hidden h-28 ${pilha ? 'sm:h-32' : 'md:h-auto md:min-h-[240px]'}`} aria-hidden="true">
        <div className="absolute inset-0">
          <TelaPicture
            tela={pilha ? telaNewsletter('topo') : { ...telaNewsletter('lado'), estreita: telaNewsletter('topo') }}
            sizes={pilha ? '(min-width: 1024px) 34vw, 100vw' : '200px'}
          />
        </div>
      </div>
      <div className={`p-6 md:p-8 ${pilha ? 'border-t-[3px]' : 'border-t-[3px] md:border-t-0 md:border-l-[3px]'} border-laranja`}>
        <p className="font-serif text-lg md:text-xl text-tinta leading-snug mb-6 max-w-[48ch]">{newsletter.pitch}</p>
        {newsletter.substack ? (
          <a href={linkInscricao(content)} target="_blank" rel="noopener noreferrer" className="botao">
            {newsletter.ctaLabel}
          </a>
        ) : (
          <>
            <p className="font-sans text-sm text-tinta-2 mb-3">
              As inscrições abrem em breve. Enquanto isso, as notícias do dia a dia estão nas redes:
            </p>
            <SocialLinks linkClassName="text-tinta-2 hover:text-laranja-fundo" />
          </>
        )}
      </div>
    </div>
  );
}

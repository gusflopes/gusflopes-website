import { newsletter } from '../config/site';
import type { EixoId } from '../lib/eixos';
import { InscricaoForm } from './InscricaoForm';
import { telaNewsletter } from '../lib/telas';
import { TelaPicture } from './TelaPicture';

/**
 * Caixa de inscrição das páginas da newsletter e do fim dos textos. A tela é a da própria
 * newsletter (semente "Radar de IA", a mesma da capa no Substack): correntes que passam, em escala
 * 1:1 — uma coluna estreita ao lado do convite, nunca atrás dele, e nunca o close da Ferramenta.
 * O convite fica sempre sobre um campo claro (fim do texto, arquivo): a caixa é o campo creme
 * (#FDEED9), com o texto em tinta — nunca um bloco escuro logo acima do rodapé.
 * `pilha` empilha tela e texto (colunas estreitas), com a tela em faixa baixa.
 * A inscrição acontece aqui mesmo (lista própria, InscricaoForm): ninguém sai do texto para assinar.
 */
export function NewsletterCta({ content, eixo, pilha = false }: { content: string; eixo?: EixoId; pilha?: boolean }) {
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
        <InscricaoForm source={content} eixo={eixo} />
      </div>
    </div>
  );
}

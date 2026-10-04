import { useState } from 'react';
import { Search, ArrowRight, ExternalLink, Play } from 'lucide-react';
import { EIXOS, EIXO_LIST, type EixoId } from '../../lib/eixos';
import { telaFaixa, type Tela } from '../../lib/telas';
import { AberturaHub } from '../AberturaHub';

export interface RadarItem {
  id: string;
  title: string;
  excerpt: string;
  /** Data já formatada para exibição pt-BR (ex: "10 Jun, 2026"). */
  date: string;
  duration: string;
  category: string;
  eixo: EixoId;
  type: 'article' | 'video';
  isExternal: boolean;
  link: string;
  source: string;
  image: string;
  /** Capa: tela gerada do slug no build (substitui a foto de banco no render). */
  tela: Tela;
  /** Margem pintada do item (variáveis CSS da classe `.margem`): a lombada no diário. */
  margem?: Record<string, string>;
}

interface RadarPageProps {
  items: RadarItem[];
}

export function RadarPage({ items }: RadarPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedEixo, setSelectedEixo] = useState<EixoId | 'todos'>('todos');

  const inEixo = items.filter((item) => selectedEixo === 'todos' || item.eixo === selectedEixo);
  // Categorias derivadas do conteúdo do eixo selecionado.
  const categories = ['Todos', ...Array.from(new Set(inEixo.map((item) => item.category)))];
  // Só mostra o filtro de eixo quando há conteúdo em mais de um eixo.
  const eixosComConteudo = EIXO_LIST.filter((e) => items.some((item) => item.eixo === e.id));

  const term = searchTerm.toLowerCase();
  const filteredItems = inEixo.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(term) || item.excerpt.toLowerCase().includes(term);
    const matchesCategory = selectedCategory === 'Todos' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="bg-noite min-h-screen">
      <AberturaHub
        tela={telaFaixa('radar')}
        titulo="Radar"
        deck="Curadoria comentada: o que mudou em IA, engenharia e negócios — e por que importa."
      />

      {/* Corpo em papel: o diário de bordo se lê de dia; o rodapé chega pela fita depois dele. */}
      <div className="bg-papel papel">
      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-6 md:pt-8 pb-20 md:pb-28">
        {eixosComConteudo.length > 1 && (
          <nav aria-label="Filtrar por eixo" className="flex flex-wrap gap-x-6 gap-y-1 border-b border-regua">
            {[{ id: 'todos' as const, label: 'Todos os eixos' }, ...eixosComConteudo].map((e) => (
              <button
                key={e.id}
                type="button"
                aria-pressed={selectedEixo === e.id}
                onClick={() => {
                  setSelectedEixo(e.id);
                  setSelectedCategory('Todos');
                }}
                className={`relative py-3 font-sans text-[0.9375rem] font-semibold transition-colors after:absolute after:left-0 after:-bottom-px after:h-[3px] after:bg-laranja after:w-full after:origin-left after:transition-transform after:duration-300 ${
                  selectedEixo === e.id ? 'text-tinta after:scale-x-100' : 'text-tinta-2 hover:text-tinta after:scale-x-0'
                }`}
              >
                {e.label}
              </button>
            ))}
          </nav>
        )}

        <div className="mt-8 mb-12 md:mb-16 flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
          <label className="flex items-center gap-3 border-b border-ardosia focus-within:border-laranja md:w-72 shrink-0 transition-colors">
            <Search size={16} className="text-tinta-2" aria-hidden="true" />
            <input
              placeholder="Buscar no radar..."
              aria-label="Buscar no radar"
              className="bg-transparent border-none outline-none focus-visible:outline-none w-full py-2.5 text-[0.9375rem] text-tinta placeholder:text-tinta-2 font-sans"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </label>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                aria-pressed={selectedCategory === cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 h-8 border font-sans text-[0.8125rem] font-semibold transition-colors whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-laranja border-laranja text-noite'
                    : 'border-regua text-tinta-2 hover:border-petroleo hover:text-tinta'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {filteredItems.length > 0 ? (
          /* Um diário de bordo: a data na margem, o item e o comentário no meio, a fonte e a ação à direita. */
          <ol className="border-t-2 border-t-laranja">
            {filteredItems.map((item) => {
              const externo = item.isExternal;
              return (
                <li key={item.id} className="relative border-b-2 border-laranja">
                  {item.margem && <span aria-hidden="true" className="margem absolute left-0 top-0 bottom-0 w-5 md:w-14" style={item.margem} />}
                  <a
                    href={item.link}
                    {...(externo ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className={`cartao group grid gap-x-10 gap-y-2 py-7 md:grid-cols-12 ${item.margem ? 'pl-9 md:pl-[5.5rem]' : 'pl-5 lg:pl-8'}`}
                  >
                    <span className="md:col-span-7 md:col-start-3 md:row-start-1 flex flex-col gap-2">
                      <span className="font-serif text-[1.35rem] md:text-[1.5rem] leading-snug text-tinta group-hover:text-laranja-fundo transition-colors">
                        {item.type === 'video' && (
                          <Play size={16} fill="currentColor" className="inline-block align-[-0.05em] mr-2 text-laranja" aria-hidden="true" />
                        )}
                        {item.title}
                      </span>
                      <span className="font-sans text-tinta-2 leading-relaxed line-clamp-2 max-w-[68ch]">{item.excerpt}</span>
                    </span>
                    <span className="md:col-span-2 md:col-start-1 md:row-start-1 md:pt-2 font-sans text-sm font-semibold text-tinta tabular-nums flex md:flex-col items-start gap-2"><span className="marca mt-1.5" aria-hidden="true" /><span>
                      {item.date} · {item.duration}
                    </span></span>
                    <span className="md:col-span-3 md:row-start-1 flex flex-col gap-1 md:items-end md:text-right md:pt-2 font-sans text-sm">
                      <span className="font-bold text-petroleo">
                        {selectedEixo === 'todos' && eixosComConteudo.length > 1
                          ? `${EIXOS[item.eixo].shortLabel} · ${item.category}`
                          : item.category}
                      </span>
                      {externo && <span className="text-tinta-2">{item.source}</span>}
                      <span className="acao text-laranja-fundo text-sm uppercase tracking-[0.1em] mt-2">
                        {externo
                          ? item.type === 'video' ? 'Assistir Agora' : 'Ler na Fonte'
                          : item.type === 'video' ? 'Assistir Vídeo' : 'Ler Artigo'}
                        {externo ? <ExternalLink size={14} aria-hidden="true" /> : <ArrowRight size={14} aria-hidden="true" />}
                      </span>
                    </span>
                  </a>
                </li>
              );
            })}
          </ol>
        ) : (
          <div className="py-24 border-t border-regua">
            <p className="text-tinta-2 font-sans">Nenhum item encontrado para sua busca.</p>
            <button
              type="button"
              className="acao text-laranja-fundo mt-3"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('Todos');
                setSelectedEixo('todos');
              }}
            >
              Limpar filtros
            </button>
          </div>
        )}
      </div>
      </div>
    </main>
  );
}

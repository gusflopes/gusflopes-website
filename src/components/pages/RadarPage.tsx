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

      <div className="max-w-7xl mx-auto px-4 md:px-6 pb-20 md:pb-28">
        {eixosComConteudo.length > 1 && (
          <nav aria-label="Filtrar por eixo" className="flex flex-wrap gap-x-6 gap-y-1 border-b border-linha">
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
                  selectedEixo === e.id ? 'text-white after:scale-x-100' : 'text-bruma hover:text-white after:scale-x-0'
                }`}
              >
                {e.label}
              </button>
            ))}
          </nav>
        )}

        <div className="mt-8 mb-12 md:mb-16 flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
          <label className="flex items-center gap-3 border-b border-petroleo focus-within:border-laranja-claro md:w-72 shrink-0 transition-colors">
            <Search size={16} className="text-bruma" aria-hidden="true" />
            <input
              placeholder="Buscar no radar..."
              aria-label="Buscar no radar"
              className="bg-transparent border-none outline-none focus-visible:outline-none w-full py-2.5 text-[0.9375rem] text-white font-sans"
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
                    : 'border-linha text-nevoa hover:border-ceu hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {filteredItems.length > 0 ? (
          /* Um diário de bordo: a data na margem, o item e o comentário no meio, a fonte e a ação à direita. */
          <ol className="border-t border-linha">
            {filteredItems.map((item) => {
              const externo = item.isExternal;
              return (
                <li key={item.id} className="border-b border-linha">
                  <a
                    href={item.link}
                    {...(externo ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="cartao group grid gap-x-10 gap-y-2 py-7 md:grid-cols-12"
                  >
                    <span className="md:col-span-7 md:col-start-3 md:row-start-1 flex flex-col gap-2">
                      <span className="font-serif text-[1.35rem] md:text-[1.5rem] leading-snug text-white group-hover:text-pessego transition-colors">
                        {item.type === 'video' && (
                          <Play size={16} fill="currentColor" className="inline-block align-[-0.05em] mr-2 text-laranja-claro" aria-hidden="true" />
                        )}
                        {item.title}
                      </span>
                      <span className="font-sans text-nevoa leading-relaxed line-clamp-2 max-w-[68ch]">{item.excerpt}</span>
                    </span>
                    <span className="md:col-span-2 md:col-start-1 md:row-start-1 md:pt-2 font-sans text-sm text-bruma tabular-nums">
                      {item.date} · {item.duration}
                    </span>
                    <span className="md:col-span-3 md:row-start-1 flex flex-col gap-1 md:items-end md:text-right md:pt-2 font-sans text-sm">
                      <span className="font-bold text-ceu">
                        {selectedEixo === 'todos' && eixosComConteudo.length > 1
                          ? `${EIXOS[item.eixo].shortLabel} · ${item.category}`
                          : item.category}
                      </span>
                      {externo && <span className="text-bruma">{item.source}</span>}
                      <span className="acao text-laranja-claro text-sm uppercase tracking-[0.1em] mt-2">
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
          <div className="py-24 border-t border-linha">
            <p className="text-nevoa font-sans">Nenhum item encontrado para sua busca.</p>
            <button
              type="button"
              className="acao text-laranja-claro mt-3"
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
    </main>
  );
}

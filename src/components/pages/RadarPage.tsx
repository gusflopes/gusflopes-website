import { useState } from 'react';
import { Search, ArrowRight, ExternalLink, Play } from 'lucide-react';
import { EIXOS, EIXO_LIST, type EixoId } from '../../lib/eixos';
import { telaFaixa, type Tela } from '../../lib/telas';
import { TelaPicture } from '../TelaPicture';
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
                className={`px-3 h-8 border font-sans text-[0.75rem] font-bold uppercase tracking-[0.1em] transition-colors whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-laranja border-laranja text-brasa'
                    : 'border-linha text-nevoa hover:border-ceu hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
            {filteredItems.map((item) => {
              const externo = item.isExternal;
              return (
                <a
                  key={item.id}
                  href={item.link}
                  {...(externo ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="cartao group flex flex-col"
                >
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <TelaPicture tela={item.tela} sizes="(min-width: 1024px) 31vw, (min-width: 768px) 46vw, 100vw" />
                    {item.type === 'video' && (
                      <span className="absolute left-4 bottom-4 w-11 h-11 bg-laranja text-brasa flex items-center justify-center">
                        <Play fill="currentColor" size={18} className="ml-0.5" aria-hidden="true" />
                      </span>
                    )}
                  </div>
                  <span className="fio-vivo" />
                  <h2 className="font-serif text-[1.4rem] leading-snug text-white group-hover:text-pessego transition-colors mt-5 mb-3">
                    {item.title}
                  </h2>
                  <p className="font-sans text-nevoa leading-relaxed line-clamp-3 mb-4">{item.excerpt}</p>
                  <div className="mt-auto mb-4 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <p className="rotulo text-laranja-claro">
                      {selectedEixo === 'todos' && eixosComConteudo.length > 1
                        ? `${EIXOS[item.eixo].shortLabel} · ${item.category}`
                        : item.category}
                    </p>
                    {externo && <p className="font-sans text-xs font-semibold text-bruma">{item.source}</p>}
                  </div>
                  <p className="font-sans text-sm text-bruma mb-4">
                    {item.date} · {item.duration}
                  </p>
                  <span className="acao text-laranja-claro text-sm uppercase tracking-[0.1em]">
                    {externo
                      ? item.type === 'video' ? 'Assistir Agora' : 'Ler na Fonte'
                      : item.type === 'video' ? 'Assistir Vídeo' : 'Ler Artigo'}
                    {externo ? <ExternalLink size={14} aria-hidden="true" /> : <ArrowRight size={14} aria-hidden="true" />}
                  </span>
                </a>
              );
            })}
          </div>
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

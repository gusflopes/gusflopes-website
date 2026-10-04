import { useState } from 'react';
import { ArrowRight, ExternalLink, Play } from 'lucide-react';
import { EIXOS, EIXO_LIST, type EixoId } from '../../lib/eixos';
import { Abertura } from '../Abertura';
import { BarraFiltro, Celula, DataCelula } from './InsightsPage';

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
    <main>
      <header className="campo-azul pt-[72px]">
        <div className="moldura pt-12 md:pt-16 pb-10">
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-x-[var(--gutter)] items-end">
            <div className="lg:col-span-7">
              <Abertura titulo="Radar" eixo="engenharia" teto={9} />
            </div>
            <p className="lg:col-span-5 bg-petroleo-escuro border-t-2 border-papel px-5 pt-4 pb-5 font-serif text-[1.1875rem] leading-relaxed text-papel">
              Curadoria comentada: o que mudou em IA, engenharia e negócios — e por que importa.
            </p>
          </div>
        </div>

        {eixosComConteudo.length > 1 && (
          <nav aria-label="Filtrar por eixo" className="moldura">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-[2px] bg-azul-3 border-2 border-azul-3">
              {[{ id: 'todos' as const, label: 'Todos os eixos' }, ...eixosComConteudo].map((e) => (
                <Celula
                  key={e.id}
                  ativo={selectedEixo === e.id}
                  onClick={() => {
                    setSelectedEixo(e.id);
                    setSelectedCategory('Todos');
                  }}
                >
                  {e.label}
                </Celula>
              ))}
            </div>
          </nav>
        )}
        <div className="h-10" />
      </header>

      <div className="campo-papel pb-24">
        <div className="moldura pt-10 md:pt-14">
          <BarraFiltro
            rotuloBusca="Buscar no radar"
            placeholder="Buscar no radar..."
            termo={searchTerm}
            setTermo={setSearchTerm}
            categorias={categories}
            categoria={selectedCategory}
            setCategoria={setSelectedCategory}
          />

          {filteredItems.length > 0 ? (
            <ol className="list-none">
              {filteredItems.map((item, idx) => {
                const acao = item.isExternal
                  ? item.type === 'video' ? 'Assistir Agora' : 'Ler na Fonte'
                  : item.type === 'video' ? 'Assistir Vídeo' : 'Ler Artigo';
                const Icone = item.isExternal ? ExternalLink : ArrowRight;
                return (
                  <li key={item.id} className="border-t-2 border-laranja first:border-t-0">
                    <a
                      href={item.link}
                      {...(item.isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="group grid gap-x-[var(--gutter)] gap-y-3 py-7 md:grid-cols-12 hover:bg-papel-3 transition-colors"
                    >
                      <DataCelula data={item.date} duracao={item.duration} destaque={!term && selectedCategory === 'Todos' && selectedEixo === 'todos' && idx === 0} eixo={item.eixo} />
                      <div className="md:col-span-7">
                        <h2 className="font-sans font-extrabold [font-stretch:87%] text-[1.375rem] md:text-[1.75rem] leading-[1.1] tracking-[-0.01em] text-azul group-hover:text-laranja-fundo transition-colors text-balance mb-3">
                          {item.type === 'video' && (
                            <span className="inline-grid place-items-center w-[1.1em] h-[1.1em] mr-2 align-[-0.12em] bg-laranja text-laranja-tinta" aria-hidden="true">
                              <Play size={14} strokeWidth={3} fill="currentColor" />
                            </span>
                          )}
                          {item.title}
                        </h2>
                        <p className="font-serif text-[1.0625rem] leading-relaxed text-tinta-2 max-w-[62ch] line-clamp-3">{item.excerpt}</p>
                      </div>
                      <div className="md:col-span-3 flex flex-wrap md:flex-col justify-between md:justify-start gap-3">
                        <p className="rotulo text-laranja-fundo">
                          {selectedEixo === 'todos' && eixosComConteudo.length > 1
                            ? `${EIXOS[item.eixo].shortLabel} · ${item.category}`
                            : item.category}
                        </p>
                        {item.isExternal && <p className="rotulo text-tinta-2 border border-filete px-2 py-1 self-start">{item.source}</p>}
                        <span className="acao">
                          {acao}
                          <Icone size={14} strokeWidth={2.5} aria-hidden="true" />
                        </span>
                      </div>
                    </a>
                  </li>
                );
              })}
            </ol>
          ) : (
            <div className="py-24 border-b-2 border-azul">
              <p className="font-serif text-[1.125rem] text-tinta-2">Nenhum item encontrado para sua busca.</p>
              <button
                type="button"
                className="acao mt-4"
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

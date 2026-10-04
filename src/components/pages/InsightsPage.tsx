import { useState, type ReactNode } from 'react';
import { ArrowRight, Search } from 'lucide-react';
import { EIXOS, EIXO_LIST, type EixoId } from '../../lib/eixos';
import { Abertura } from '../Abertura';
import { datePartsPtBR } from '../../lib/format';

export interface InsightArticle {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  eixo: EixoId;
  /** Rota do artigo (insights ou radar local). */
  href: string;
  /** Data já formatada para exibição pt-BR (ex: "10 Jun, 2026"). */
  date: string;
  /** Data ISO (YYYY-MM-DD), para ordenação e metadados. */
  isoDate: string;
  duration: string;
  image: string;
}

interface InsightsPageProps {
  articles: InsightArticle[];
  /** Título da página (default: "Insights"). Usado pelas páginas de eixo. */
  heading?: string;
  subheading?: string;
  /** Quando definido, a página é o hub de um eixo: some o filtro de eixo e aparece a linha de público. */
  eixo?: EixoId;
  /** Conteúdo extra abaixo do cabeçalho (ex.: destaque de projeto no eixo Bastidores). */
  aside?: ReactNode;
}

/**
 * Célula de data das listas: o dia como numeral grande, "Mês, ano" e a duração como rótulo.
 * No item mais recente (sem filtro) a célula vira plano laranja — a cor marca a ordem real.
 */
export function DataCelula({ iso, data, duracao, destaque = false }: { iso?: string; data?: string; duracao: string; destaque?: boolean }) {
  const partes = iso ? datePartsPtBR(iso) : (() => {
    const i = (data ?? '').indexOf(' ');
    return i > 0 ? { dia: data!.slice(0, i), mesAno: data!.slice(i + 1) } : { dia: data ?? '', mesAno: '' };
  })();
  const Tag = iso ? 'time' : 'p';
  return (
    <Tag
      {...(iso ? { dateTime: iso } : {})}
      className={`md:col-span-2 self-start flex md:flex-col items-baseline md:items-start gap-x-3 gap-y-2 tabular-nums ${
        destaque ? 'campo-laranja px-3 pt-3 pb-3 md:pb-4 -mx-0' : ''
      }`}
    >
      <span className={`numeral text-[2.75rem] md:text-[4.25rem] ${destaque ? '' : 'text-azul'}`}>{partes.dia}</span>
      <span className={`rotulo flex md:flex-col gap-x-3 gap-y-1 ${destaque ? '' : 'text-tinta-2'}`}>
        <span>{partes.mesAno}</span>
        <span>{duracao}</span>
      </span>
    </Tag>
  );
}

/** Botão de filtro em célula de grade: preenchido de laranja quando ativo. */
export function Celula({ ativo, onClick, children }: { ativo: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={ativo}
      onClick={onClick}
      className={`rotulo px-4 py-3 text-left transition-colors ${
        ativo ? 'bg-laranja text-laranja-tinta' : 'bg-azul text-ceu-claro hover:text-papel hover:bg-azul-2'
      }`}
    >
      {children}
    </button>
  );
}

/** Barra de busca + categorias, sobre papel. */
export function BarraFiltro({
  rotuloBusca,
  placeholder,
  termo,
  setTermo,
  categorias,
  categoria,
  setCategoria,
}: {
  rotuloBusca: string;
  placeholder: string;
  termo: string;
  setTermo: (v: string) => void;
  categorias: string[];
  categoria: string;
  setCategoria: (v: string) => void;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] md:gap-8 items-end border-b-2 border-azul pb-4">
      <label className="flex items-center gap-3 border-b-2 border-azul focus-within:border-laranja-fundo pb-2">
        <Search size={18} strokeWidth={2.5} className="text-azul shrink-0" aria-hidden="true" />
        <input
          aria-label={rotuloBusca}
          className="w-full bg-transparent outline-none font-sans [font-stretch:87%] text-[1.0625rem] text-azul"
          placeholder={placeholder}
          value={termo}
          onChange={(e) => setTermo(e.target.value)}
        />
      </label>
      <div className="flex gap-x-1 gap-y-1 flex-wrap" role="group" aria-label="Categorias">
        {categorias.map((cat) => (
          <button
            key={cat}
            type="button"
            aria-pressed={categoria === cat}
            onClick={() => setCategoria(cat)}
            className={`rotulo !text-[0.75rem] px-2.5 py-2 transition-colors ${
              categoria === cat ? 'bg-azul text-papel' : 'text-tinta-2 hover:text-azul hover:bg-papel-2'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}

export function InsightsPage({
  articles,
  heading = 'Insights',
  subheading = 'Textos autorais sobre engenharia, negócio e IA aplicada — organizados em três eixos.',
  eixo,
  aside,
}: InsightsPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedEixo, setSelectedEixo] = useState<EixoId | 'todos'>('todos');

  const eixoFilter = eixo ?? selectedEixo;
  const inEixo = articles.filter((a) => eixoFilter === 'todos' || a.eixo === eixoFilter);
  // Categorias derivadas do conteúdo visível no eixo — nunca um filtro que leve a lista vazia.
  const categories = ['Todos', ...Array.from(new Set(inEixo.map((a) => a.category)))];

  const term = searchTerm.toLowerCase();
  const filteredArticles = inEixo.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(term) || article.excerpt.toLowerCase().includes(term);
    const matchesCategory = selectedCategory === 'Todos' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  const semFiltro = !term && selectedCategory === 'Todos' && selectedEixo === 'todos';

  const selectEixo = (id: EixoId | 'todos') => {
    setSelectedEixo(id);
    setSelectedCategory('Todos');
  };

  return (
    <main>
      <header className="campo-azul pt-[72px]">
        <div className="moldura pt-12 md:pt-16 pb-10">
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-x-[var(--gutter)] items-end">
            <div className="lg:col-span-7">
              <Abertura titulo={heading} eixo={eixo ?? 'engenharia'} teto={9} />
            </div>
            <div className="lg:col-span-5 border-t-2 border-papel pt-4">
              <p className="font-serif text-[1.1875rem] leading-relaxed text-ceu-claro">{subheading}</p>
              {eixo && <p className="mt-4 font-sans font-semibold [font-stretch:87%] text-[1rem] leading-snug text-laranja">{EIXOS[eixo].publico}</p>}
            </div>
          </div>
        </div>

        {/* Eixos — só na listagem geral; nos hubs o eixo já está fixo */}
        {!eixo && (
          <nav aria-label="Filtrar por eixo" className="moldura pb-0">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-[2px] bg-azul-3 border-2 border-azul-3">
              {[{ id: 'todos' as const, label: 'Todos os eixos' }, ...EIXO_LIST].map((e) => (
                <Celula key={e.id} ativo={selectedEixo === e.id} onClick={() => selectEixo(e.id)}>
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
          {aside && <div className="mb-14">{aside}</div>}

          {articles.length > 0 && (
            <BarraFiltro
              rotuloBusca="Buscar artigos"
              placeholder="Filtrar ideias..."
              termo={searchTerm}
              setTermo={setSearchTerm}
              categorias={categories}
              categoria={selectedCategory}
              setCategoria={setSelectedCategory}
            />
          )}

          <ol className="list-none">
            {filteredArticles.map((article, idx) => {
              const destaque = semFiltro && idx === 0;
              return (
                <li key={article.id} className="border-b border-filete">
                  <a href={article.href} className="group grid gap-x-[var(--gutter)] gap-y-4 py-7 md:grid-cols-12 hover:bg-papel-2/70 transition-colors">
                    <DataCelula iso={article.isoDate} duracao={article.duration} destaque={destaque} />
                    <div className="md:col-span-7">
                      <h2
                        className={`font-sans text-azul group-hover:text-laranja-fundo transition-colors text-balance mb-3 ${
                          destaque
                            ? 'font-black uppercase text-[1.875rem] md:text-[3rem] leading-[0.95] tracking-[-0.02em]'
                            : 'font-extrabold [font-stretch:87%] tracking-[-0.012em] text-[1.5rem] md:text-[1.875rem] leading-[1.08]'
                        }`}
                      >
                        {article.title}
                      </h2>
                      <p className="font-serif text-[1.0625rem] leading-relaxed text-tinta-2 max-w-[62ch]">{article.excerpt}</p>
                    </div>
                    <div className="md:col-span-3 flex md:flex-col justify-between md:justify-start gap-3 md:pt-1">
                      <p className="rotulo text-laranja-fundo">
                        {eixo ? article.category : `${EIXOS[article.eixo].shortLabel} · ${article.category}`}
                      </p>
                      <span className="acao">
                        Ler Artigo
                        <ArrowRight size={14} strokeWidth={2.5} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </a>
                </li>
              );
            })}
          </ol>

          {filteredArticles.length === 0 && (
            <div className="py-24 border-b-2 border-azul">
              <p className="display uppercase text-[2rem] md:text-[3rem] text-azul">O silêncio faz parte da música.</p>
              <p className="font-serif text-[1.0625rem] mt-3 text-tinta-2">
                {articles.length === 0 ? 'Os primeiros textos deste eixo estão a caminho.' : 'Nenhum artigo encontrado.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

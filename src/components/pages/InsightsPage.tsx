import { useState, type ReactNode } from 'react';
import { ArrowRight, Search } from 'lucide-react';
import { EIXOS, EIXO_LIST, type EixoId } from '../../lib/eixos';
import { COR_LINHA } from '../../lib/linhas';

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
  // Categorias derivadas do conteúdo visível no eixo — nunca um pill que leve a lista vazia.
  const categories = ['Todos', ...Array.from(new Set(inEixo.map((a) => a.category)))];

  const term = searchTerm.toLowerCase();
  const filteredArticles = inEixo.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(term) || article.excerpt.toLowerCase().includes(term);
    const matchesCategory = selectedCategory === 'Todos' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const selectEixo = (id: EixoId | 'todos') => {
    setSelectedEixo(id);
    setSelectedCategory('Todos');
  };

  // Trilhos paralelos: um por linha (eixo) presente na lista visível.
  const linhas = EIXO_LIST.filter((e) => filteredArticles.some((a) => a.eixo === e.id));

  return (
    <main className="min-h-screen bg-noite text-luz">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 md:pt-16 pb-24">
        <header className="mb-10 md:mb-12 max-w-3xl">
          {eixo && (
            <span
              className="inline-flex items-center rounded-full px-3.5 py-1 mb-5 text-sm font-extrabold text-brasa"
              style={{ background: COR_LINHA[eixo] }}
>
              {articles.length} {articles.length === 1 ? 'estação' : 'estações'}
            </span>
          )}
          <h1 className="text-4xl md:text-6xl leading-[1.04] font-extrabold tracking-[-0.03em] text-white">
            {heading}
          </h1>
          <p className="mt-5 font-serif text-lg md:text-xl leading-relaxed text-nevoa">{subheading}</p>
          {eixo && (
            <p className="mt-4 text-sm font-semibold text-ambar">{EIXOS[eixo].publico}</p>
          )}
        </header>

        {/* Eixos — só na listagem geral; nos hubs o eixo já está fixo */}
        {!eixo && (
          <nav aria-label="Filtrar por eixo" className="flex flex-wrap gap-2 mb-6">
            {[{ id: 'todos' as const, label: 'Todos os eixos' }, ...EIXO_LIST].map((e) => {
              const ativo = selectedEixo === e.id;
              const cor = e.id === 'todos' ? undefined : COR_LINHA[e.id];
              return (
                <button
                  key={e.id}
                  type="button"
                  aria-pressed={ativo}
                  onClick={() => selectEixo(e.id)}
                  style={cor ? ({ '--linha': cor } as React.CSSProperties) : undefined}
                  className={`inline-flex items-center gap-2.5 min-h-10 px-4 rounded-full border text-sm font-bold transition-colors ${
                    ativo
                      ? 'bg-luz border-luz text-noite'
                      : 'border-trilho text-nevoa hover:border-nevoa hover:text-white'
                  }`}
                >
                  {cor && <span className="linha-roundel" aria-hidden="true" />}
                  {e.label}
                </button>
              );
            })}
          </nav>
        )}

        {aside && <div className="mb-12">{aside}</div>}

        {/* Busca e temas */}
        {articles.length > 0 && (
          <div className="flex flex-col md:flex-row md:items-center gap-4 pb-6 mb-10 border-b border-trilho">
            <label className="relative flex items-center md:w-72 shrink-0">
              <Search size={16} aria-hidden="true" className="absolute left-3.5 text-nevoa pointer-events-none" />
              <input
                aria-label="Buscar artigos"
                type="search"
                className="w-full h-11 pl-10 pr-3 rounded-md bg-noite-2 border border-trilho text-[0.95rem] text-luz placeholder:text-nevoa/80 focus:outline-none focus:border-laranja-claro"
                placeholder="Filtrar ideias..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </label>
            <div className="flex flex-wrap gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  aria-pressed={selectedCategory === cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`min-h-9 px-3 rounded-md text-[0.85rem] font-semibold transition-colors whitespace-nowrap ${
                    selectedCategory === cat ? 'bg-laranja text-brasa' : 'text-nevoa hover:text-white hover:bg-noite-2'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* As estações, na ordem do mais recente para o mais antigo, cada uma no trilho da sua linha */}
        {filteredArticles.length > 0 && (
          <ol className="list-none m-0 p-0">
            {filteredArticles.map((article, idx) => (
              <li
                key={article.id}
                className="flex gap-5 md:gap-8"
              >
                <div className={`trilhos ${idx === 0 ? 'trilhos-inicio' : ''} ${idx === filteredArticles.length - 1 ? 'trilhos-fim' : ''}`} aria-hidden="true">
                  {linhas.map((l) => (
                    <span key={l.id} style={{ '--linha': COR_LINHA[l.id] } as React.CSSProperties}>
                      {l.id === article.eixo && <span className="estacao-ponto" />}
                    </span>
                  ))}
                </div>
                <a href={article.href} className="group block min-w-0 flex-1 pb-12 md:pb-14">
                  <article>
                    <p className="flex flex-wrap gap-x-3 gap-y-1 text-[0.8rem] font-semibold uppercase tracking-[0.08em] text-nevoa">
                      <span className="tabular-nums">{article.date} · {article.duration}</span>
                      <span style={{ color: COR_LINHA[article.eixo] }}>
                        {eixo ? article.category : `${EIXOS[article.eixo].shortLabel} · ${article.category}`}
                      </span>
                    </p>
                    <h2 className="mt-2.5 max-w-3xl text-2xl md:text-[1.9rem] leading-[1.15] font-extrabold tracking-[-0.02em] text-white group-hover:underline decoration-2 underline-offset-[6px]" style={{ textDecorationColor: COR_LINHA[article.eixo] }}>
                      {article.title}
                    </h2>
                    <p className="mt-3 font-serif text-[1.05rem] md:text-lg leading-relaxed text-nevoa max-w-[65ch]">
                      {article.excerpt}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.1em] text-laranja-claro group-hover:text-white">
                      Ler Artigo
                      <ArrowRight size={14} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
                    </span>
                  </article>
                </a>
              </li>
            ))}
          </ol>
        )}

        {/* Empty State */}
        {filteredArticles.length === 0 && (
          <div className="py-24 text-nevoa">
            <p className="font-serif text-2xl italic text-luz">O silêncio faz parte da música.</p>
            <p className="text-sm mt-2">
              {articles.length === 0 ? 'Os primeiros textos deste eixo estão a caminho.' : 'Nenhum artigo encontrado.'}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

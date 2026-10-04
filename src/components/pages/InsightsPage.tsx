import { useState, type ReactNode } from 'react';
import { ArrowRight, Search } from 'lucide-react';
import { EIXOS, EIXO_LIST, type EixoId } from '../../lib/eixos';
import { telaFaixa, type Tela } from '../../lib/telas';
import { TelaPicture } from '../TelaPicture';
import { AberturaHub } from '../AberturaHub';

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
  /** Capa: tela gerada do slug no build. */
  tela: Tela;
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

  const [primeiro, ...demais] = filteredArticles;

  return (
    <main className="bg-noite min-h-screen">
      <AberturaHub
        tela={telaFaixa(eixo ?? 'insights')}
        titulo={heading}
        deck={subheading}
        nota={eixo ? <p className="font-sans text-sm font-semibold text-laranja-claro">{EIXOS[eixo].publico}</p> : undefined}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-6 pb-20 md:pb-28">
        {/* Eixos — só na listagem geral; nos hubs o eixo já está fixo */}
        {!eixo && (
          <nav aria-label="Filtrar por eixo" className="flex flex-wrap gap-x-6 gap-y-1 border-b border-linha">
            {[{ id: 'todos' as const, label: 'Todos os eixos' }, ...EIXO_LIST].map((e) => (
              <button
                key={e.id}
                type="button"
                aria-pressed={selectedEixo === e.id}
                onClick={() => selectEixo(e.id)}
                className={`relative py-3 font-sans text-[0.9375rem] font-semibold transition-colors after:absolute after:left-0 after:-bottom-px after:h-[3px] after:bg-laranja after:transition-[width] after:duration-300 ${
                  selectedEixo === e.id ? 'text-white after:w-full' : 'text-bruma hover:text-white after:w-0'
                }`}
              >
                {e.label}
              </button>
            ))}
          </nav>
        )}

        {aside && <div className="mt-10">{aside}</div>}

        {articles.length > 0 && (
          <div className="mt-8 mb-12 md:mb-16 flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
            <label className="flex items-center gap-3 border-b border-petroleo focus-within:border-laranja-claro md:w-72 shrink-0 transition-colors">
              <Search size={16} className="text-bruma" aria-hidden="true" />
              <input
                aria-label="Buscar artigos"
                className="bg-transparent border-none outline-none focus-visible:outline-none w-full py-2.5 text-[0.9375rem] text-white font-sans"
                placeholder="Filtrar ideias..."
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
                      ? 'bg-laranja border-laranja text-brasa'
                      : 'border-linha text-nevoa hover:border-ceu hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        )}

        {primeiro && (
          <a href={primeiro.href} className="cartao group grid md:grid-cols-12 gap-6 md:gap-10 mb-16 md:mb-20">
            <div className="md:col-span-7">
              <div className="aspect-[16/9] overflow-hidden">
                <TelaPicture tela={primeiro.tela} sizes="(min-width: 768px) 58vw, 100vw" />
              </div>
              <span className="fio-vivo" />
            </div>
            <div className="md:col-span-5 flex flex-col md:pt-2">
              <p className="rotulo text-laranja-claro mb-4">
                {eixo ? primeiro.category : `${EIXOS[primeiro.eixo].shortLabel} · ${primeiro.category}`}
              </p>
              <h2 className="font-serif text-3xl md:text-[2.5rem] leading-[1.1] text-white group-hover:text-pessego transition-colors mb-4">
                {primeiro.title}
              </h2>
              <p className="font-sans text-lg text-nevoa leading-relaxed mb-5">{primeiro.excerpt}</p>
              <p className="font-sans text-sm text-bruma mb-6">
                {primeiro.date} · {primeiro.duration}
              </p>
              <span className="acao text-laranja-claro">
                Ler Artigo <ArrowRight size={16} aria-hidden="true" />
              </span>
            </div>
          </a>
        )}

        {demais.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
            {demais.map((article) => (
              <a key={article.id} href={article.href} className="cartao group flex flex-col">
                <div className="aspect-[16/9] overflow-hidden">
                  <TelaPicture tela={article.tela} sizes="(min-width: 1024px) 31vw, (min-width: 768px) 46vw, 100vw" />
                </div>
                <span className="fio-vivo" />
                <p className="rotulo text-laranja-claro mt-5 mb-3">
                  {eixo ? article.category : `${EIXOS[article.eixo].shortLabel} · ${article.category}`}
                </p>
                <h2 className="font-serif text-[1.45rem] leading-snug text-white group-hover:text-pessego transition-colors mb-3">
                  {article.title}
                </h2>
                <p className="font-sans text-nevoa leading-relaxed mb-4 line-clamp-3">{article.excerpt}</p>
                <p className="font-sans text-sm text-bruma mt-auto mb-4">
                  {article.date} · {article.duration}
                </p>
                <span className="acao text-laranja-claro">
                  Ler Artigo <ArrowRight size={16} aria-hidden="true" />
                </span>
              </a>
            ))}
          </div>
        )}

        {/* Empty State */}
        {filteredArticles.length === 0 && (
          <div className="py-24 md:py-32 max-w-xl">
            <p className="font-serif text-2xl md:text-3xl italic text-white">O silêncio faz parte da música.</p>
            <p className="font-sans text-nevoa mt-3">
              {articles.length === 0 ? 'Os primeiros textos deste eixo estão a caminho.' : 'Nenhum artigo encontrado.'}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

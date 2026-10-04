import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { site } from '../config/site';
import { EIXOS, type EixoId } from '../lib/eixos';
import { COR_LINHA } from '../lib/linhas';
import logo from '../assets/cfa6876664fcc921be5a7c0a58c353ea12577968.png?url';

interface HeaderProps {
  pathname: string;
  /** Eixos com ao menos um texto publicado — eixo vazio não entra no menu. */
  eixosAtivos?: EixoId[];
}

/** Normaliza paths para comparação: remove barras finais ('/radar/' → '/radar'). */
const normalizePath = (p: string) => p.replace(/\/+$/, '') || '/';

interface NavItem {
  label: string;
  href: string;
  /** Cor da linha (eixos); formatos e oferta ficam sem placa. */
  linha?: string;
}

/**
 * Barra de sinalização: sempre noturna e fixa no topo. Cada eixo leva a placa (roundel)
 * da sua linha; o item ativo ganha o trilho por baixo, na cor da linha.
 */
export function Header({ pathname: rawPathname, eixosAtivos = [] }: HeaderProps) {
  const pathname = normalizePath(rawPathname);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isHome = pathname === '/';
  // Páginas de texto têm a própria moldura (linha + estação) e escondem esta barra.
  const isArticlePage =
    pathname.startsWith('/insights/article') || pathname.startsWith('/radar/article/');

  if (isArticlePage) return null;

  // Eixos primeiro (o "para quem"), depois os formatos e a oferta.
  const navItems: NavItem[] = [
    ...eixosAtivos.map((id) => ({ label: EIXOS[id].label, href: EIXOS[id].href, linha: COR_LINHA[id] })),
    { label: 'Radar', href: '/radar' },
    { label: 'Insights', href: '/insights' },
    { label: 'Trabalhe Comigo', href: '/#consulting' },
  ];
  const isActive = (href: string) => href !== '/' && !href.includes('#') && pathname.startsWith(href);

  const handleClick = (e: React.MouseEvent, href: string) => {
    setIsMenuOpen(false);
    if (href === '/' && isHome) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-noite/95 backdrop-blur-sm border-b border-trilho">
      <div className="max-w-7xl mx-auto h-16 px-4 sm:px-6 flex items-center justify-between gap-6">
        <a href="/" onClick={(e) => handleClick(e, '/')} className="shrink-0">
          <ImageWithFallback src={logo} alt="Gusflopes.dev" className="h-10 w-auto" />
        </a>

        <nav className="hidden lg:flex items-stretch h-full gap-1">
          {navItems.map((item) => {
            const ativo = isActive(item.href);
            return (
              <a
                key={item.label}
                aria-current={ativo ? 'page' : undefined}
                href={item.href}
                onClick={(e) => handleClick(e, item.href)}
                style={{ '--linha': item.linha ?? 'var(--color-laranja)' } as React.CSSProperties}
                className={`relative flex items-center gap-2 px-3 text-[0.9rem] font-semibold transition-colors after:absolute after:left-3 after:right-3 after:bottom-0 after:h-1 after:rounded-t-sm after:bg-[var(--linha)] after:transition-transform after:origin-bottom ${
                  ativo ? 'text-white after:scale-y-100' : 'text-nevoa hover:text-white after:scale-y-0 hover:after:scale-y-100'
                }`}
              >
                {item.linha && <span className="linha-roundel" aria-hidden="true" />}
                {item.label}
              </a>
            );
          })}
          <a
            href={`mailto:${site.email}`}
            className="self-center ml-3 inline-flex items-center h-9 px-4 rounded-full border border-laranja text-laranja-claro text-[0.9rem] font-semibold transition-colors hover:bg-laranja hover:text-brasa"
          >
            Contato
          </a>
        </nav>

        <button
          type="button"
          className="lg:hidden grid place-items-center w-11 h-11 -mr-2 text-luz"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={isMenuOpen}
          aria-controls="menu-movel"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMenuOpen && (
        <div id="menu-movel" className="lg:hidden absolute top-full left-0 right-0 bg-noite-2 border-b border-trilho">
          <nav className="flex flex-col px-4 sm:px-6 py-3">
            {navItems.map((item) => (
              <a
                key={item.label}
                aria-current={isActive(item.href) ? 'page' : undefined}
                href={item.href}
                onClick={(e) => handleClick(e, item.href)}
                style={{ '--linha': item.linha ?? 'var(--color-laranja)' } as React.CSSProperties}
                className={`flex items-center gap-3 py-3 text-lg font-semibold border-b border-trilho/70 ${
                  isActive(item.href) ? 'text-white' : 'text-nevoa hover:text-white'
                }`}
              >
                {item.linha ? (
                  <span className="linha-roundel" aria-hidden="true" />
                ) : (
                  <span className="w-3" aria-hidden="true" />
                )}
                {item.label}
              </a>
            ))}
            <a
              href={`mailto:${site.email}`}
              className="mt-4 mb-2 inline-flex items-center justify-center h-12 rounded-md bg-laranja text-brasa font-bold"
            >
              Contato
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

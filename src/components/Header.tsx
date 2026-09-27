import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { site } from '../config/site';
import { EIXOS, type EixoId } from '../lib/eixos';
import logo from '../assets/cfa6876664fcc921be5a7c0a58c353ea12577968.png?url';

interface HeaderProps {
  pathname: string;
  /** Eixos com ao menos um texto publicado — eixo vazio não entra no menu. */
  eixosAtivos?: EixoId[];
}

/** Normaliza paths para comparação: remove barras finais ('/radar/' → '/radar'). */
const normalizePath = (p: string) => p.replace(/\/+$/, '') || '/';

export function Header({ pathname: rawPathname, eixosAtivos = [] }: HeaderProps) {
  const pathname = normalizePath(rawPathname);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isHome = pathname === '/';
  // Páginas de artigo escondem o Header — match por prefixo para cobrir
  // tanto /insights/article (legado) quanto /insights/article/<id> e /radar/article/<id>.
  const isArticlePage =
    pathname.startsWith('/insights/article') || pathname.startsWith('/radar/article/');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isArticlePage) return null;

  // Eixos primeiro (o "para quem"), depois os formatos e a oferta.
  const navItems = [
    ...eixosAtivos.map((id) => ({ label: EIXOS[id].label, href: EIXOS[id].href })),
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
    <header
      className={`fixed top-0 left-0 right-0 z-50 px-6 py-6 transition-all duration-300 ${
        isScrolled || !isHome
          ? 'bg-slate-950/80 backdrop-blur-md border-b border-white/5'
          : 'bg-transparent border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div>
          <a href="/" onClick={(e) => handleClick(e, '/')}>
            <ImageWithFallback src={logo} alt="Gusflopes.dev" className="h-12 w-auto" />
          </a>
        </div>

        <nav className="hidden lg:flex items-center space-x-7">
          {navItems.map((item) => (
            <a
              key={item.label}
              aria-current={isActive(item.href) ? "page" : undefined}
              href={item.href}
              onClick={(e) => handleClick(e, item.href)}
              className={`font-sans text-sm font-medium uppercase tracking-wide transition-colors ${
                isActive(item.href)
                  ? 'text-orange-500'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              {item.label}
            </a>
          ))}
          <Button
            asChild
            variant="outline"
            className="font-sans border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-[#1c0a02] bg-transparent rounded-full px-6"
          >
            <a href={`mailto:${site.email}`}>Contato</a>
          </Button>
        </nav>

        <button
          className="lg:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-slate-900/95 backdrop-blur-md p-6 border-b border-slate-800 animate-in slide-in-from-top-5">
          <nav className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <a
                key={item.label}
                aria-current={isActive(item.href) ? "page" : undefined}
                href={item.href}
                onClick={(e) => handleClick(e, item.href)}
                className={`font-sans text-lg font-medium ${
                  isActive(item.href)
                    ? 'text-orange-500'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {item.label}
              </a>
            ))}
            <Button asChild className="font-sans bg-orange-500 text-[#1c0a02] hover:bg-orange-600 w-full">
              <a href={`mailto:${site.email}`}>Contato</a>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import logo from '../assets/logo.webp?url';

interface HeaderProps {
  pathname: string;
  /** Seções do menu (Notícias, Análise, Radar, Artigos, Ferramentas), já sem as que não têm conteúdo publicado. */
  secoes?: { label: string; href: string }[];
}

/** Chamadas do topo (16/11/2026): saíram do menu e ficam à direita, como ações. */
export const CHAMADAS = {
  newsletter: { label: 'Newsletter', href: '/newsletter' },
  trabalhe: { label: 'Trabalhe comigo', href: '/#consulting' },
} as const;

/** Normaliza paths para comparação: remove barras finais ('/radar/' → '/radar'). */
const normalizePath = (p: string) => p.replace(/\/+$/, '') || '/';

export function Header({ pathname: rawPathname, secoes = [] }: HeaderProps) {
  const pathname = normalizePath(rawPathname);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isHome = pathname === '/';
  // O artigo também leva o header do site: é a porta de entrada por busca e redes, e o leitor
  // precisa ver a marca e as seções sem rolar até o rodapé.
  const navItems = secoes;
  const isActive = (href: string) => href !== '/' && !href.includes('#') && (pathname === href || pathname.startsWith(`${href}/`));

  const handleClick = (e: React.MouseEvent, href: string) => {
    setIsMenuOpen(false);
    if (href === '/' && isHome) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-noite border-b border-linha">
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 md:h-[72px] flex items-center justify-between gap-6">
        <a href="/" onClick={(e) => handleClick(e, '/')} className="shrink-0">
          <ImageWithFallback src={logo} alt="Gusflopes.dev" width={311} height={168} className="h-10 md:h-11 w-auto" />
        </a>

        <nav aria-label="Principal" className="hidden lg:flex items-center gap-7">
          {navItems.map((item) => (
            <a
              key={item.label}
              aria-current={isActive(item.href) ? 'page' : undefined}
              href={item.href}
              onClick={(e) => handleClick(e, item.href)}
              className={`relative py-2 font-sans text-[0.9375rem] font-medium transition-colors after:absolute after:left-0 after:-bottom-px after:h-[2px] after:bg-laranja after:w-full after:origin-left after:transition-transform after:duration-300 ${
                isActive(item.href) ? 'text-white after:scale-x-100' : 'text-nevoa hover:text-white after:scale-x-0 hover:after:scale-x-100'
              }`}
            >
              {item.label}
            </a>
          ))}
          <span className="flex items-center gap-3">
            <a
              href={CHAMADAS.newsletter.href}
              className="font-sans text-[0.9375rem] font-bold text-laranja-claro border border-laranja/70 px-4 h-10 inline-flex items-center hover:bg-laranja hover:text-noite hover:border-laranja transition-colors whitespace-nowrap"
            >
              {CHAMADAS.newsletter.label}
            </a>
            <a
              href={CHAMADAS.trabalhe.href}
              onClick={() => setIsMenuOpen(false)}
              className="font-sans text-[0.9375rem] font-bold text-noite bg-laranja border border-laranja px-4 h-10 inline-flex items-center hover:bg-laranja-claro hover:border-laranja-claro transition-colors whitespace-nowrap"
            >
              {CHAMADAS.trabalhe.label}
            </a>
          </span>
        </nav>

        <button
          type="button"
          className="lg:hidden -mr-2.5 inline-flex items-center justify-center size-11 text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={isMenuOpen}
          aria-controls="menu-movel"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMenuOpen && (
        <div id="menu-movel" className="lg:hidden absolute top-full left-0 right-0 bg-noite border-b border-linha fio">
          <nav aria-label="Principal" className="flex flex-col px-4 py-4">
            {navItems.map((item) => (
              <a
                key={item.label}
                aria-current={isActive(item.href) ? 'page' : undefined}
                href={item.href}
                onClick={(e) => handleClick(e, item.href)}
                className={`font-serif text-xl py-3 border-b border-linha/70 ${
                  isActive(item.href) ? 'text-laranja-claro' : 'text-white'
                }`}
              >
                {item.label}
              </a>
            ))}
            <div className="mt-5 grid grid-cols-2 gap-3">
              <a
                href={CHAMADAS.newsletter.href}
                onClick={() => setIsMenuOpen(false)}
                className="font-sans font-bold text-laranja-claro border border-laranja/70 h-12 inline-flex items-center justify-center"
              >
                {CHAMADAS.newsletter.label}
              </a>
              <a href={CHAMADAS.trabalhe.href} onClick={() => setIsMenuOpen(false)} className="botao w-full">
                {CHAMADAS.trabalhe.label}
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

import { Linkedin, Github, Instagram, Youtube, Twitter } from 'lucide-react';
import { socials, newsletter } from '../config/site';

/** Ícones de marca que o lucide não traz (Bluesky e Substack), no mesmo traço de 20px. */
function Bluesky({ size = 20 }: { size?: number; strokeWidth?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M6.33 4.2C8.6 5.9 11.06 9.36 12 11.3c.94-1.94 3.4-5.4 5.67-7.1 1.64-1.23 4.3-2.18 4.3.85 0 .6-.35 5.07-.55 5.8-.7 2.52-3.27 3.16-5.55 2.77 3.99.68 5 2.93 2.81 5.18-4.17 4.27-5.99-1.07-6.45-2.44-.09-.25-.13-.37-.13-.27 0-.1-.04.02-.13.27-.46 1.37-2.28 6.71-6.45 2.44-2.19-2.25-1.18-4.5 2.81-5.18-2.28.39-4.85-.25-5.55-2.77-.2-.73-.55-5.2-.55-5.8 0-3.03 2.66-2.08 4.3-.85Z" />
    </svg>
  );
}

function Substack({ size = 20 }: { size?: number; strokeWidth?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M4 3h16v2.4H4V3Zm0 4.5h16v2.4H4V7.5ZM4 12h16v9.5l-8-4.5-8 4.5V12Z" />
    </svg>
  );
}

/** Todas as redes de src/config/site.ts; o Substack só aparece quando a URL estiver configurada. */
export const SOCIAL_LINKS = [
  { href: socials.linkedin, label: 'LinkedIn', Icon: Linkedin },
  { href: socials.instagram, label: 'Instagram', Icon: Instagram },
  { href: socials.youtube, label: 'YouTube', Icon: Youtube },
  { href: socials.x, label: 'X (antigo Twitter)', Icon: Twitter },
  { href: socials.bluesky, label: 'Bluesky', Icon: Bluesky },
  { href: newsletter.substack, label: 'Substack', Icon: Substack },
  { href: socials.github, label: 'GitHub', Icon: Github },
].filter((s) => s.href);

export function SocialLinks({ className = '', linkClassName = '' }: { className?: string; linkClassName?: string }) {
  return (
    <div className={`flex flex-wrap gap-1 -ml-2 ${className}`}>
      {SOCIAL_LINKS.map(({ href, label, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer me"
          aria-label={`${label} de Gustavo Lopes`}
          className={`inline-flex items-center justify-center w-10 h-10 rounded-[3px] transition-colors ${linkClassName}`}
        >
          <Icon size={19} strokeWidth={1.75} />
        </a>
      ))}
    </div>
  );
}

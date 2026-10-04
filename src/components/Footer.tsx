import { ImageWithFallback } from './figma/ImageWithFallback';
import { NewsletterForm } from './NewsletterForm';
import { SocialLinks } from './SocialLinks';
import { site, newsletter, projetos, comUtm } from '../config/site';
import { EIXO_LIST } from '../lib/eixos';
import { COR_LINHA } from '../lib/linhas';
import logoLight from '../assets/cfa6876664fcc921be5a7c0a58c353ea12577968.png?url';

const link = 'text-nevoa hover:text-white transition-colors';

export function Footer() {
  return (
    <footer className="bg-noite pb-8 px-4 sm:px-6">
      {/* as três linhas correm lado a lado no rodapé: a assinatura da rede */}
      <div aria-hidden="true" className="-mx-4 sm:-mx-6 grid gap-[3px] mb-14">
        {EIXO_LIST.map((e) => (
          <span key={e.id} className="block h-1.5" style={{ background: COR_LINHA[e.id] }} />
        ))}
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="mb-5">
              <ImageWithFallback src={logoLight} alt="Gusflopes.dev" className="h-14 w-auto" />
            </div>
            <p className="font-serif text-nevoa text-[0.95rem] leading-relaxed max-w-xs">
              Tecnologia e negócio, partes do mesmo sistema. Arquitetura, plataformas e IA aplicada para sistemas que evoluem.
            </p>
          </div>

          {/* Links */}
          <div>
            <h2 className="text-white text-sm font-extrabold uppercase tracking-[0.1em] mb-4">Navegação</h2>
            <ul className="space-y-2.5 text-[0.95rem]">
              {EIXO_LIST.map((eixo) => (
                <li key={eixo.id}>
                  <a
                    href={eixo.href}
                    className={`inline-flex items-center gap-2.5 ${link}`}
                    style={{ '--linha': COR_LINHA[eixo.id] } as React.CSSProperties}
                  >
                    <span className="linha-roundel" aria-hidden="true" />
                    {eixo.label}
                  </a>
                </li>
              ))}
              <li><a href="/radar" className={link}>Radar</a></li>
              <li><a href="/insights" className={link}>Insights</a></li>
              <li><a href="/newsletter" className={link}>Newsletter</a></li>
              <li><a href="/#about" className={link}>Sobre</a></li>
              <li>
                <a href={comUtm(projetos.reforma.url, projetos.reforma.campanha, 'footer')} className={link}>
                  {projetos.reforma.nome}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h2 className="text-white text-sm font-extrabold uppercase tracking-[0.1em] mb-4">Contato</h2>
            <ul className="space-y-2.5 text-[0.95rem]">
              <li><a href={`mailto:${site.email}`} className={link}>{site.email}</a></li>
              <li className="text-nevoa">Brasil | Global</li>
            </ul>
            <SocialLinks className="mt-5" linkClassName="text-nevoa hover:text-white" />
          </div>

          {/* Newsletter */}
          <div>
            <h2 className="text-white text-sm font-extrabold uppercase tracking-[0.1em] mb-4">{newsletter.name}</h2>
            <p className="font-serif text-nevoa text-[0.95rem] leading-relaxed mb-5">{newsletter.pitch}</p>
            <NewsletterForm variant="footer" />
          </div>
        </div>

        <div className="border-t border-trilho pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-nevoa text-xs">
            © {new Date().getFullYear()} Gusflopes.dev. Todos os direitos reservados.
          </p>
          <div className="flex gap-6 text-xs">
            <a href="/privacy" className={link}>Política de Privacidade</a>
            <a href="/terms" className={link}>Termos de Uso</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

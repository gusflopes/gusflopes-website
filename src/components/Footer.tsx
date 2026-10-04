import { NewsletterForm } from './NewsletterForm';
import { SocialLinks } from './SocialLinks';
import { site, newsletter, projetos, comUtm } from '../config/site';
import { EIXO_LIST } from '../lib/eixos';
import logoLight from '../assets/cfa6876664fcc921be5a7c0a58c353ea12577968.png?url';

const linkCls = 'text-nevoa hover:text-white underline-offset-4 hover:underline transition-colors';
const tituloCls = 'rotulo text-ceu mb-5';

export function Footer() {
  return (
    <footer className="bg-noite-fundo border-t border-noite-fio pt-16 md:pt-20 pb-10 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.3fr] gap-x-12 gap-y-12 mb-16">
          {/* Marca */}
          <div>
            <img src={logoLight} alt="Gusflopes.dev" width={1028} height={556} loading="lazy" className="h-14 w-auto mb-6" />
            <p className="font-serif text-[1.0625rem] leading-relaxed text-nevoa max-w-[22rem]">
              Tecnologia e negócio, partes do mesmo sistema. Arquitetura, plataformas e IA aplicada para sistemas que evoluem.
            </p>
          </div>

          {/* Links */}
          <div>
            <h2 className={tituloCls}>Navegação</h2>
            <ul className="space-y-2.5 text-[0.9375rem]">
              {EIXO_LIST.map((eixo) => (
                <li key={eixo.id}>
                  <a href={eixo.href} className={linkCls}>{eixo.label}</a>
                </li>
              ))}
              <li><a href="/radar" className={linkCls}>Radar</a></li>
              <li><a href="/insights" className={linkCls}>Insights</a></li>
              <li><a href="/newsletter" className={linkCls}>Newsletter</a></li>
              <li><a href="/#about" className={linkCls}>Sobre</a></li>
              <li>
                <a href={comUtm(projetos.reforma.url, projetos.reforma.campanha, 'footer')} className={linkCls}>
                  {projetos.reforma.nome}
                </a>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h2 className={tituloCls}>Contato</h2>
            <ul className="space-y-2.5 text-[0.9375rem]">
              <li><a href={`mailto:${site.email}`} className={linkCls}>{site.email}</a></li>
              <li className="text-nevoa-2">Brasil | Global</li>
            </ul>
            <SocialLinks className="mt-5" linkClassName="text-nevoa-2 hover:text-white hover:bg-noite-2" />
          </div>

          {/* Newsletter */}
          <div>
            <h2 className={tituloCls}>{newsletter.name}</h2>
            <p className="text-nevoa text-[0.9375rem] leading-relaxed mb-6">{newsletter.pitch}</p>
            <NewsletterForm variant="footer" />
          </div>
        </div>

        <div className="border-t border-noite-fio pt-8 flex flex-col md:flex-row justify-between md:items-center gap-4 text-[0.8125rem] text-nevoa-2">
          <p className="num">
            © {new Date().getFullYear()} Gusflopes.dev. Todos os direitos reservados.
          </p>
          <div className="flex gap-6">
            <a href="/privacy" className="hover:text-white underline-offset-4 hover:underline">Política de Privacidade</a>
            <a href="/terms" className="hover:text-white underline-offset-4 hover:underline">Termos de Uso</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

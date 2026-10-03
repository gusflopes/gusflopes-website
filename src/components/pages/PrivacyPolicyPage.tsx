import React from 'react';
import { newsletter } from '../../config/site';

export function PrivacyPolicyPage() {
  return (
    <main className="pt-32 pb-24 px-6 min-h-screen bg-slate-950">
      <article className="max-w-3xl mx-auto">
        <header className="mb-12 border-b border-slate-800 pb-8">
          <h1 className="font-serif text-4xl md:text-5xl text-white mb-4 font-bold">
            Política de Privacidade
          </h1>
          <p className="text-slate-400 font-sans text-sm uppercase tracking-wider">
            Última atualização: Outubro/2026
          </p>
        </header>

        <div className="prose prose-invert prose-lg max-w-none font-sans text-slate-300 leading-relaxed">
          <p className="text-xl text-slate-200 mb-8 font-serif italic">
            Esta política descreve, de forma direta, o que o gusflopes.dev faz (e o que não faz) com dados pessoais, em conformidade com a Lei Geral de Proteção de Dados (LGPD).
          </p>

          <section className="mb-10">
            <h2 className="text-2xl text-white font-bold mb-4 font-serif">1. Quem controla seus dados</h2>
            <p>
              O controlador dos dados coletados neste site é Gustavo Lopes. Para dúvidas relacionadas a dados, entre em contato pelo e-mail: <a href="mailto:gustavo@gusflopes.dev" className="text-orange-400 hover:text-orange-300 transition-colors">gustavo@gusflopes.dev</a>.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl text-white font-bold mb-4 font-serif">2. Quais dados este site coleta</h2>
            <ul className="list-disc pl-6 space-y-4">
              <li>
                <strong className="text-white">Nenhum formulário aqui:</strong> o gusflopes.dev não tem formulário de cadastro nem de contato. O contato é feito por e-mail, e você decide o que enviar.
              </li>
              <li>
                <strong className="text-white">Sem cookies de rastreamento:</strong> o site não usa Google Analytics, pixels de anúncio nem cookies de rastreamento ou de publicidade.
              </li>
              <li>
                <strong className="text-white">Estatística de visitas sem cookies:</strong> uso o Cloudflare Web Analytics para contar visitas, páginas mais lidas e de onde os leitores chegam. Ele não usa cookies nem identifica você individualmente.
              </li>
              <li>
                <strong className="text-white">Registros técnicos da hospedagem:</strong> o site é servido pela Cloudflare, que processa dados técnicos de cada acesso (como endereço IP, navegador e página solicitada) para entregar as páginas e proteger contra abuso.
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl text-white font-bold mb-4 font-serif">3. Newsletter</h2>
            <p>
              A inscrição na newsletter não acontece neste site.{' '}
              {newsletter.substack ? (
                <>
                  Ela é feita no <a href={newsletter.substack} className="text-orange-400 hover:text-orange-300 transition-colors">Substack</a>, que guarda o seu e-mail, envia as edições e traz o link de descadastro em todo envio, conforme a <a href="https://substack.com/privacy" className="text-orange-400 hover:text-orange-300 transition-colors">política de privacidade do Substack</a>.
                </>
              ) : (
                <>As inscrições abrem em breve; quando abrirem, esta seção dirá onde elas são feitas e geridas.</>
              )}{' '}
              Quem se inscreveu pela página <a href="https://reforma-tributaria.gusflopes.dev" className="text-orange-400 hover:text-orange-300 transition-colors">reforma-tributaria.gusflopes.dev</a> tem os dados, os consentimentos e a forma de cancelar descritos na <a href="https://reforma-tributaria.gusflopes.dev/privacidade" className="text-orange-400 hover:text-orange-300 transition-colors">política de privacidade daquela página</a>.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl text-white font-bold mb-4 font-serif">4. Contato por e-mail</h2>
            <p>
              Se você escrever para <a href="mailto:gustavo@gusflopes.dev" className="text-orange-400 hover:text-orange-300 transition-colors">gustavo@gusflopes.dev</a>, uso seu nome, e-mail e o conteúdo da mensagem só para responder ao que foi pedido (consultoria, palestra, parceria ou dúvida).
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl text-white font-bold mb-4 font-serif">5. Conteúdo de terceiros</h2>
            <p>
              Algumas imagens de artigos são carregadas de serviços externos (como o Unsplash), e alguns textos têm links para outros sites. Ao carregar ou clicar nesses conteúdos, o seu navegador se conecta a esses serviços, que seguem as próprias políticas de privacidade.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl text-white font-bold mb-4 font-serif">6. Seus direitos</h2>
            <p>
              Pela LGPD, você pode pedir confirmação de tratamento, acesso, correção ou exclusão dos seus dados pessoais a qualquer momento. Basta enviar um e-mail para <a href="mailto:gustavo@gusflopes.dev" className="text-orange-400 hover:text-orange-300 transition-colors">gustavo@gusflopes.dev</a>.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl text-white font-bold mb-4 font-serif">7. Transferência internacional</h2>
            <p>
              A Cloudflare opera uma rede global, então os dados técnicos de acesso podem ser processados em servidores fora do Brasil, sob as garantias contratuais e de segurança do provedor.
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}

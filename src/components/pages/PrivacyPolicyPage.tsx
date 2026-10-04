import React from 'react';
import { newsletter } from '../../config/site';

export function PrivacyPolicyPage() {
  return (
    <main className="pt-12 md:pt-16 pb-24 px-4 sm:px-6 min-h-screen bg-noite">
      <article className="max-w-3xl mx-auto">
        <header className="mb-12 border-b border-trilho pb-8">
          <h1 className="text-4xl md:text-6xl leading-[1.04] font-extrabold tracking-[-0.03em] text-white mb-4">
            Política de Privacidade
          </h1>
          <p className="text-nevoa text-sm font-semibold uppercase tracking-[0.08em]">
            Última atualização: Outubro/2026
          </p>
        </header>

        <div className="prosa prosa-noite">
          <p className="text-xl text-luz italic">
            Esta política descreve, de forma direta, o que o gusflopes.dev faz (e o que não faz) com dados pessoais, em conformidade com a Lei Geral de Proteção de Dados (LGPD).
          </p>

          <section className="mt-10">
            <h2>1. Quem controla seus dados</h2>
            <p>
              O controlador dos dados coletados neste site é Gustavo Lopes. Para dúvidas relacionadas a dados, entre em contato pelo e-mail: <a href="mailto:gustavo@gusflopes.dev">gustavo@gusflopes.dev</a>.
            </p>
          </section>

          <section className="mt-10">
            <h2>2. Quais dados este site coleta</h2>
            <ul>
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

          <section className="mt-10">
            <h2>3. Newsletter</h2>
            <p>
              A inscrição na newsletter não acontece neste site.{' '}
              {newsletter.substack ? (
                <>
                  Ela é feita no <a href={newsletter.substack}>Substack</a>, que guarda o seu e-mail, envia as edições e traz o link de descadastro em todo envio, conforme a <a href="https://substack.com/privacy">política de privacidade do Substack</a>.
                </>
              ) : (
                <>As inscrições abrem em breve; quando abrirem, esta seção dirá onde elas são feitas e geridas.</>
              )}{' '}
              Quem se inscreveu pela página <a href="https://reforma-tributaria.gusflopes.dev">reforma-tributaria.gusflopes.dev</a> tem os dados, os consentimentos e a forma de cancelar descritos na <a href="https://reforma-tributaria.gusflopes.dev/privacidade">política de privacidade daquela página</a>.
            </p>
          </section>

          <section className="mt-10">
            <h2>4. Contato por e-mail</h2>
            <p>
              Se você escrever para <a href="mailto:gustavo@gusflopes.dev">gustavo@gusflopes.dev</a>, uso seu nome, e-mail e o conteúdo da mensagem só para responder ao que foi pedido (consultoria, palestra, parceria ou dúvida).
            </p>
          </section>

          <section className="mt-10">
            <h2>5. Conteúdo de terceiros</h2>
            <p>
              Algumas imagens de artigos são carregadas de serviços externos (como o Unsplash), e alguns textos têm links para outros sites. Ao carregar ou clicar nesses conteúdos, o seu navegador se conecta a esses serviços, que seguem as próprias políticas de privacidade.
            </p>
          </section>

          <section className="mt-10">
            <h2>6. Seus direitos</h2>
            <p>
              Pela LGPD, você pode pedir confirmação de tratamento, acesso, correção ou exclusão dos seus dados pessoais a qualquer momento. Basta enviar um e-mail para <a href="mailto:gustavo@gusflopes.dev">gustavo@gusflopes.dev</a>.
            </p>
          </section>

          <section className="mt-10">
            <h2>7. Transferência internacional</h2>
            <p>
              A Cloudflare opera uma rede global, então os dados técnicos de acesso podem ser processados em servidores fora do Brasil, sob as garantias contratuais e de segurança do provedor.
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}

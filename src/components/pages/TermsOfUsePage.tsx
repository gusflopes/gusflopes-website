import React from 'react';

export function TermsOfUsePage() {
  return (
    <main className="pt-12 md:pt-16 pb-24 px-4 sm:px-6 min-h-screen bg-noite">
      <article className="max-w-3xl mx-auto">
        <header className="mb-12 border-b border-trilho pb-8">
          <h1 className="text-4xl md:text-6xl leading-[1.04] font-extrabold tracking-[-0.03em] text-white mb-4">
            Termos de Uso
          </h1>
          <p className="text-nevoa text-sm font-semibold uppercase tracking-[0.08em]">
            Última atualização: Dezembro/2025
          </p>
        </header>

        <div className="prosa prosa-noite">
          <section className="mt-10">
            <h2>1. Aceitação</h2>
            <p>
              Ao acessar e utilizar o site <strong>Gusflopes.dev</strong>, você concorda com estes termos. O conteúdo deste site tem caráter educacional e informativo, focado em Engenharia de Software, Arquitetura e Liderança Técnica.
            </p>
          </section>

          <section className="mt-10">
            <h2>2. Propriedade Intelectual</h2>
            <p>
              Todo o conteúdo original (textos, artigos, design, logotipos e vídeos) é de propriedade exclusiva de Gustavo Lopes, salvo indicação em contrário.
            </p>
            <ul>
              <li>
                <strong className="text-white">Compartilhamento:</strong> Você é encorajado a compartilhar os links dos artigos e insights, desde que dê os devidos créditos (atribuição) ao autor e ao site original.
              </li>
              <li>
                <strong className="text-white">Reprodução:</strong> É proibida a cópia integral ou reprodução dos artigos em outros sites sem prévia autorização por escrito.
              </li>
            </ul>
          </section>

          <section className="mt-10">
            <h2>3. Uso de Código e Exemplos Técnicos (Isenção de Responsabilidade)</h2>
            <p>
              Este site frequentemente compartilha snippets de código, diagramas de arquitetura (DDD, C4 Model) e exemplos de implementação.
            </p>
            <ul>
              <li>
                <strong className="text-white">"As Is":</strong> Todo o código e informação técnica são fornecidos "como estão", para fins puramente educacionais.
              </li>
              <li>
                <strong className="text-white">Responsabilidade:</strong> Embora eu me esforce para garantir a precisão e segurança das informações, não me responsabilizo por eventuais danos, bugs ou perdas de dados decorrentes do uso direto desses códigos em seus ambientes de produção. Cabe a você, como engenheiro, validar e testar qualquer solução antes de implementá-la.
              </li>
            </ul>
          </section>

          <section className="mt-10">
            <h2>4. Links Externos</h2>
            <p>
              O site pode conter links para sites de terceiros (ferramentas, documentações oficiais, etc.). Não possuo controle sobre o conteúdo ou políticas de privacidade desses sites externos.
            </p>
          </section>

          <section className="mt-10">
            <h2>5. Alterações</h2>
            <p>
              Estes termos podem ser atualizados a qualquer momento para refletir mudanças na legislação ou no conteúdo do site.
            </p>
          </section>

          <section className="mt-10">
            <h2>6. Foro</h2>
            <p>
              Fica eleito o foro da comarca de São Paulo, Brasil, para dirimir quaisquer dúvidas oriundas destes termos.
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}

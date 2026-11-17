import { ArrowRight } from 'lucide-react';
import { projetos, comUtm } from '../../config/site';
import { telaFaixa } from '../../lib/telas';
import { AberturaHub } from '../AberturaHub';

interface FerramentaItem {
  id: string;
  nome: string;
  /** Uma linha: o que é e para quem. */
  rotulo: string;
  descricao: string[];
  acao: { label: string; href: string };
  /** Endereço exibido (ex.: o do servidor MCP). */
  endereco?: string;
}

/**
 * Ferramentas (16/11/2026): o que o Gustavo construiu e qualquer pessoa pode usar. Só entra o que tem evidência no
 * repositório (config, artigo, landing no ar); nada de produto anunciado sem existir. Fonte dos dados:
 * `projetos` em src/config/site.ts. O texto reaproveita a copy já aprovada da home e do artigo do rt2026.
 */
const FERRAMENTAS: FerramentaItem[] = [
  {
    id: 'simulador-reforma',
    nome: projetos.reforma.nome,
    rotulo: 'Ferramenta gratuita · Para quem tem empresa',
    descricao: [
      'Como a reforma do IBS e da CBS afeta a sua empresa? Responda perguntas rápidas e veja para que lado o seu caso tende. Depois, simule com números do motor oficial da Receita, dentro da IA que você já usa.',
      'A IA conversa, a calculadora oficial calcula. Conteúdo informativo: alíquotas de 2027 em diante são premissa, e a decisão é sua com o seu contador.',
    ],
    acao: { label: 'Fazer o diagnóstico', href: comUtm(projetos.reforma.url, projetos.reforma.campanha, 'ferramentas') },
  },
  {
    id: 'mcp-rt2026',
    nome: 'Servidor MCP da Reforma Tributária (rt2026)',
    rotulo: 'Servidor MCP aberto e gratuito · Para usar na IA que você já tem',
    descricao: [
      'Um servidor MCP remoto sobre a calculadora oficial de IBS e CBS da Receita Federal. A mesma IA que você já usa, ligada a ele, passa a responder com números e fontes em vez de palpites.',
      'Acesso gratuito, com chave liberada automaticamente. Não explica regra tributária nem recomenda nada: monta a operação, chama o motor oficial e mostra a procedência.',
    ],
    endereco: projetos.reforma.mcpUrl,
    acao: { label: 'Como funciona por dentro', href: projetos.reforma.artigo },
  },
];

export function FerramentasPage() {
  return (
    <main id="conteudo" tabIndex={-1} className="bg-papel min-h-screen">
      <AberturaHub
        tela={telaFaixa('ferramentas')}
        titulo="Ferramentas"
        deck="O que eu construí e qualquer pessoa pode usar: IA ligada a software que calcula, aberta e gratuita."
      />
      <div className="bg-papel papel">
        <div className="max-w-7xl mx-auto px-4 md:px-6 pt-10 md:pt-14 pb-20 md:pb-28">
          <ol className="border-t-2 border-t-laranja">
            {FERRAMENTAS.map((f) => (
              <li key={f.id} id={f.id} className="border-b border-regua py-10 md:py-12 grid gap-6 lg:grid-cols-12 lg:gap-12 scroll-mt-24">
                <div className="lg:col-span-5">
                  <h2 className="font-serif text-[1.9rem] md:text-[2.3rem] leading-tight text-tinta">{f.nome}</h2>
                  <p className="mt-4 font-sans text-sm font-semibold text-petroleo flex items-center gap-2.5">
                    <span className="marca" aria-hidden="true" />
                    {f.rotulo}
                  </p>
                </div>
                <div className="lg:col-span-7 font-sans text-tinta-2 leading-relaxed grid gap-4 max-w-[64ch]">
                  {f.descricao.map((d) => (
                    <p key={d}>{d}</p>
                  ))}
                  {f.endereco && (
                    <p className="text-sm">
                      Endereço: <code className="font-mono text-tinta bg-papel-2 px-1.5 py-0.5 [overflow-wrap:anywhere]">{f.endereco}</code>
                    </p>
                  )}
                  <p className="mt-2 flex flex-wrap items-center gap-x-8 gap-y-4">
                    <a href={f.acao.href} className="botao">
                      {f.acao.label} <ArrowRight size={16} aria-hidden="true" />
                    </a>
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </main>
  );
}

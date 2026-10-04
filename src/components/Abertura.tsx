import type { CSSProperties } from 'react';
import { abertura, larguraEm, type EixoAbertura, type InstanciaAbertura } from '../lib/abertura';

interface AberturaProps {
  titulo: string;
  eixo?: EixoAbertura;
  /** "larga" (900/100) para textos e tese; "estreita" (850/62) para seções e listas. */
  instancia?: InstanciaAbertura;
  /** Nível do heading (h1 nas páginas de texto, h2 em listas e seções). */
  as?: 'h1' | 'h2' | 'h3';
  /** Teto do corpo em rem — limita a escala em colunas largas. */
  teto?: number;
  /** Esconde a linha-fina (cauda) — quando o contexto já mostra o título inteiro em outro lugar. */
  semCauda?: boolean;
  id?: string;
  className?: string;
}

/**
 * Título montado como bloco de tipo (regras em src/lib/abertura.ts). O texto do heading
 * continua sendo o título completo, na ordem original — só a forma muda.
 */
export function Abertura({
  titulo,
  eixo = 'engenharia',
  instancia = 'larga',
  as: Tag = 'h1',
  teto = 8,
  semCauda = false,
  id,
  className = '',
}: AberturaProps) {
  const a = abertura(titulo, eixo, instancia);
  const ultima = a.linhas.length - 1;
  return (
    <Tag
      id={id}
      className={`abertura ${className}`}
      data-forma={a.forma}
      data-instancia={a.instancia}
      data-alinhamento={a.alinhamento}
      style={{ '--teto': `${teto}rem` } as CSSProperties}
    >
      {a.linhas.map((l, i) => (
        <span key={i}>
          <span
            className="abertura-linha"
            data-estilo={l.estilo}
            style={{ '--fit': l.fit, '--recuo': l.recuo } as CSSProperties}
          >
            {l.texto}
            {i === ultima && a.sep && <span className="abertura-sep">{a.sep}</span>}
          </span>
          {i < ultima || (a.cauda && !semCauda) ? ' ' : null}
        </span>
      ))}
      {a.cauda && !semCauda && <span className="abertura-cauda">{a.cauda}</span>}
    </Tag>
  );
}

/**
 * Título curto de célula (temas, serviços): quebra no " & " (o "e" fica no fim da primeira
 * linha, em laranja) e cada linha é ajustada à largura da célula — um bloco justificado.
 * Sem linha vazada: o contorno é das aberturas de seção.
 */
export function BlocoCelula({ titulo, as: Tag = 'h3', teto = 5, className = '' }: { titulo: string; as?: 'h2' | 'h3' | 'dt' | 'p'; teto?: number; className?: string }) {
  const partes = titulo.includes(' & ') ? titulo.split(' & ') : titulo.split(' ');
  const linhas = partes.length === 2 && titulo.includes(' & ') ? [`${partes[0]} &`, partes[1]] : partes;
  const fits = linhas.map((l) => Math.round((96 / larguraEm(l.toLocaleUpperCase('pt-BR'), 'estreita')) * 100) / 100);
  // Largura máxima do bloco: onde a linha de maior corpo chega ao teto. Assim o teto nunca
  // quebra a justificação — o bloco fica mais estreito que a célula, mas sempre justificado.
  const maxW = (teto * 100) / Math.max(...fits);
  return (
    <Tag className={`bloco-celula ${className}`} style={{ '--teto': `${teto}rem`, maxWidth: `${Math.round(maxW * 100) / 100}rem` } as CSSProperties}>
      {linhas.map((l, i) => {
        const fit = fits[i];
        const amp = l.endsWith(' &');
        return (
          <span key={i} style={{ '--fit': fit } as CSSProperties}>
            {amp ? l.slice(0, -1) : l}
            {amp && <span className="text-laranja-fundo">&amp;</span>}
            {i < linhas.length - 1 ? ' ' : null}
          </span>
        );
      })}
    </Tag>
  );
}

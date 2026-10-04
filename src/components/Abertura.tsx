import type { CSSProperties } from 'react';
import { abertura, type EixoAbertura } from '../lib/abertura';

interface AberturaProps {
  titulo: string;
  eixo?: EixoAbertura;
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
export function Abertura({ titulo, eixo = 'engenharia', as: Tag = 'h1', teto = 8, semCauda = false, id, className = '' }: AberturaProps) {
  const a = abertura(titulo, eixo);
  const ultima = a.linhas.length - 1;
  return (
    <Tag
      id={id}
      className={`abertura ${className}`}
      data-forma={a.forma}
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

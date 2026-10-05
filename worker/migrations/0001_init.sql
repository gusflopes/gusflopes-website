-- Lista própria de gusflopes.dev: inscrição no site, dupla confirmação por e-mail.
-- Esta tabela é a fonte; Substack, cursos e o homelab recebem cópias (ver `syncs`).
CREATE TABLE subscribers (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL CHECK (status IN ('pending', 'confirmed', 'unsubscribed')),
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  confirmed_at TEXT,
  unsubscribed_at TEXT,
  -- Prova do consentimento: qual texto a pessoa viu e quando (a confirmação por e-mail completa a prova).
  consent_version TEXT NOT NULL,
  consent_at TEXT NOT NULL,
  -- Atribuição do primeiro cadastro (não muda em reinscrição).
  source TEXT,          -- ponto de clique: footer, artigo-<slug>, radar-<slug>, newsletter-arquivo…
  page TEXT,            -- caminho da página onde a pessoa se inscreveu
  eixo TEXT,            -- engenharia | negocios | bastidores, quando a inscrição veio de um texto
  landing_page TEXT,    -- primeira página da visita
  referrer_host TEXT,
  utm_source TEXT, utm_medium TEXT, utm_campaign TEXT, utm_content TEXT, utm_term TEXT
);
CREATE INDEX subscribers_status ON subscribers (status);

-- Todo e-mail enviado pelo Worker (confirmação, boas-vindas…): evita reenvio em rajada e serve de histórico.
CREATE TABLE emails_sent (
  id TEXT PRIMARY KEY,
  subscriber_id TEXT NOT NULL REFERENCES subscribers(id),
  kind TEXT NOT NULL,
  sent_at TEXT NOT NULL
);
CREATE INDEX emails_sent_subscriber ON emails_sent (subscriber_id, kind, sent_at);

-- Replicação para outros destinos (substack, homelab, cursos…), escrita pelos jobs que copiam a lista.
CREATE TABLE syncs (
  subscriber_id TEXT NOT NULL REFERENCES subscribers(id),
  destination TEXT NOT NULL,
  synced_at TEXT NOT NULL,
  external_id TEXT,
  PRIMARY KEY (subscriber_id, destination)
);

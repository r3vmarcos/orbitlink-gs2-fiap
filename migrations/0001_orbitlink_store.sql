/* === BANCO REMOTO ORBITLINK | inicio === */
CREATE TABLE IF NOT EXISTS orbitlink_store (
  chave TEXT PRIMARY KEY,
  valor TEXT NOT NULL,
  atualizado_em TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
/* === BANCO REMOTO ORBITLINK | fim === */

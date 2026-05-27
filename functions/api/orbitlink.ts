/// <reference types="@cloudflare/workers-types" />

/* === API REMOTA ORBITLINK | inicio === */
interface Env {
  DB: D1Database;
}

const chavesPermitidas = new Set([
  'tema',
  'postsUsuario',
  'statusUsuario',
  'postsCurtidos',
  'postsSalvos',
  'pontosSeguidos',
  'usuariosLocais',
  'usuarioAtualId',
  'comentariosLocais',
  'compartilhamentosExtras',
  'pontosApi',
  'galeriaApi',
  'imagemEpic',
  'ultimaSincronizacaoApi',
  'usuariosBase',
  'postsBase',
  'statusBase',
  'pontosArBase',
  'galeriaBase',
  'missoesBase',
  'odsBase',
]);

export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  const resultado = await env.DB.prepare('SELECT chave, valor FROM orbitlink_store').all<{ chave: string; valor: string }>();
  const dados: Record<string, unknown> = {};

  for (const linha of resultado.results ?? []) {
    if (!chavesPermitidas.has(linha.chave)) {
      continue;
    }

    try {
      dados[linha.chave] = JSON.parse(linha.valor);
    } catch {
      dados[linha.chave] = linha.valor;
    }
  }

  return responderJson({ sucesso: true, dados });
};

export const onRequestPut: PagesFunction<Env> = async ({ request, env }) => {
  const corpo = await request.json<Record<string, unknown>>();
  const entradas = Object.entries(corpo).filter(([chave]) => chavesPermitidas.has(chave));

  if (entradas.length === 0) {
    return responderJson({ sucesso: false, mensagem: 'Nenhum dado valido enviado.' }, 400);
  }

  const comandos = entradas.map(([chave, valor]) =>
    env.DB.prepare(
      `INSERT INTO orbitlink_store (chave, valor, atualizado_em)
       VALUES (?1, ?2, CURRENT_TIMESTAMP)
       ON CONFLICT(chave) DO UPDATE SET valor = excluded.valor, atualizado_em = CURRENT_TIMESTAMP`,
    ).bind(chave, JSON.stringify(valor)),
  );

  await env.DB.batch(comandos);

  return responderJson({ sucesso: true, chaves: entradas.map(([chave]) => chave) });
};

function responderJson(corpo: unknown, status = 200) {
  return new Response(JSON.stringify(corpo), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
    },
  });
}
/* === API REMOTA ORBITLINK | fim === */

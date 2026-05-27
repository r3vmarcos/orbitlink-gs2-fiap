import { pontosArData } from '@/data/pontos-ar.data';
import type { PostOrbitLink, TipoCategoriaPost } from '@/types/orbitlink.types';

/* === POSTS SIMULADOS | inicio === */
const imagensPostagens = [
  'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1200&q=82',
  'https://images.unsplash.com/photo-1454789548928-9efd52dc4031?auto=format&fit=crop&w=1200&q=82',
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=82',
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=82',
  'https://images.unsplash.com/photo-1543059080-f9b1272213d5?auto=format&fit=crop&w=1200&q=82',
  'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=1200&q=82',
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=82',
  'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1200&q=82',
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=82',
  'https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&w=1200&q=82',
  'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=82',
  'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?auto=format&fit=crop&w=1200&q=82',
  'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=82',
  'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?auto=format&fit=crop&w=1200&q=82',
  'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=1200&q=82',
  'https://images.unsplash.com/photo-1457364983758-510f8afa9f5f?auto=format&fit=crop&w=1200&q=82',
  'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1200&q=82',
  'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=82',
  'https://images.unsplash.com/photo-1614726365930-627c75da663e?auto=format&fit=crop&w=1200&q=82',
  'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=82',
  'https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?auto=format&fit=crop&w=1200&q=82',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=82',
  'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?auto=format&fit=crop&w=1200&q=82',
  'https://images.unsplash.com/photo-1492571350019-22de08371fd3?auto=format&fit=crop&w=1200&q=82',
  'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=82',
  'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=82',
  'https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?auto=format&fit=crop&w=1200&q=82',
  'https://images.unsplash.com/photo-1515705576963-95cad62945b6?auto=format&fit=crop&w=1200&q=82',
  'https://images.unsplash.com/photo-1545156521-77bd85671d30?auto=format&fit=crop&w=1200&q=82',
  'https://images.unsplash.com/photo-1517976547714-720226b864c1?auto=format&fit=crop&w=1200&q=82',
  'https://images.unsplash.com/photo-1465101162946-4377e57745c3?auto=format&fit=crop&w=1200&q=82',
  'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?auto=format&fit=crop&w=1200&q=82',
  'https://images.unsplash.com/photo-1504192010706-dd7f569ee2be?auto=format&fit=crop&w=1200&q=82',
  'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=82',
  'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=82',
  'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=82',
  'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?auto=format&fit=crop&w=1200&q=82',
  'https://images.unsplash.com/photo-1527489377706-5bf97e608852?auto=format&fit=crop&w=1200&q=82',
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=82',
  'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1200&q=82',
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=82',
  'https://images.unsplash.com/photo-1473773508845-188df298d2d1?auto=format&fit=crop&w=1200&q=82',
  'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=82',
  'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1200&q=82',
  'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=82',
  'https://images.unsplash.com/photo-1526778548025-fa2f459cd5ce?auto=format&fit=crop&w=1200&q=82',
  'https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?auto=format&fit=crop&w=1200&q=82',
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=82',
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=82',
  'https://images.unsplash.com/photo-1511300636408-a63a89df3482?auto=format&fit=crop&w=1200&q=82',
] as const;

const autoresTerra = ['helena_duarte', 'selene_base', 'rafael_kim', 'tomas_sato', 'omar_haddad', 'kai_roberts', 'benicio_luna', 'yara_mendes', 'enzo_moretti', 'lucas_ribeiro'];
const autoresEspaco = ['amazonia_viva', 'lia_novaes', 'leo_martins', 'maria_okafor', 'nina_alvarez', 'ines_carvalho', 'ayla_fernandes', 'diego_amaral', 'samira_nasser', 'clara_monteiro'];

function categoriaPorCamada(camada: string): TipoCategoriaPost {
  const mapa: Record<string, TipoCategoriaPost> = {
    planetas: 'evento',
    lua: 'lua',
    estacoes: 'estacao',
    satelites: 'satelite',
    missoes: 'missao',
    eventos: 'evento',
    cidades: 'cidade',
    turismo: 'turismo',
    clima: 'clima',
    biomas: 'bioma',
    ods: 'ods',
    social: 'comunidade',
  };

  return mapa[camada] ?? 'diario_orbital';
}

export const postsData: PostOrbitLink[] = pontosArData.map((ponto, indice) => {
  const autores = ponto.perspectiva === 'terra' ? autoresTerra : autoresEspaco;
  const camadaPrincipal = ponto.camada[0] ?? 'social';
  const local = ponto.perspectiva === 'terra' ? 'ceu observado da Terra' : 'superficie da Terra vista do espaco';

  return {
    id: `post_mark_${String(indice + 1).padStart(2, '0')}`,
    autorId: autores[indice % autores.length],
    perspectiva: ponto.perspectiva,
    titulo: ponto.perspectiva === 'terra' ? `${ponto.nome} alinhado no AR Terra` : `${ponto.nome} no mapa orbital`,
    texto: `Registro visual vinculado ao mark ${ponto.nome}, na camada ${camadaPrincipal}. A publicacao mostra o ${local}, conecta pessoas, dados e imagens diferentes para deixar o feed vivo durante a simulacao Orbitlink.`,
    imagem: imagensPostagens[indice % imagensPostagens.length],
    categoria: categoriaPorCamada(camadaPrincipal),
    pontoArId: ponto.id,
    ods: ponto.ods,
    curtidas: 180 + indice * 17,
    comentarios: indice % 5 === 0
      ? [{ id: `comentario_mark_${indice}`, autor: 'Orbitlink', texto: 'Mark ativo para teste de feed, AR e mapa.', criadoEm: new Date(Date.now() - 1000 * 60 * (indice + 12)).toISOString() }]
      : [],
    compartilhamentos: 12 + indice * 3,
    criadoEm: new Date(Date.now() - 1000 * 60 * (indice * 9 + 8)).toISOString(),
    origemDados: 'simulado',
  };
});
/* === POSTS SIMULADOS | fim === */

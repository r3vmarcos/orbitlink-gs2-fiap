import { pontosArData } from '@/data/pontos-ar.data';
import type { PostOrbitLink, TipoCategoriaPost, TipoPerspectiva } from '@/types/orbitlink.types';

/* === POSTS SIMULADOS | inicio === */
const imagensPostagens = [
  { url: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1200&q=82', tema: 'Terra vista da órbita', detalhe: 'nuvens, oceanos e horizonte azul', categoria: 'clima' },
  { url: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?auto=format&fit=crop&w=1200&q=82', tema: 'horizonte orbital', detalhe: 'curvatura da Terra e camada atmosférica', categoria: 'satelite' },
  { url: 'https://images.unsplash.com/photo-1454789548928-9efd52dc4031?auto=format&fit=crop&w=1200&q=82', tema: 'superfície lunar', detalhe: 'crateras, sombra e terreno cinza', categoria: 'lua' },
  { url: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=1200&q=82', tema: 'Marte', detalhe: 'terreno vermelho e exploração robótica', categoria: 'evento' },
  { url: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1200&q=82', tema: 'nebulosa profunda', detalhe: 'gás, poeira e brilho estelar', categoria: 'evento' },
  { url: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?auto=format&fit=crop&w=1200&q=82', tema: 'campo profundo', detalhe: 'galáxias distantes e luz antiga', categoria: 'evento' },
  { url: 'https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&w=1200&q=82', tema: 'lançamento espacial', detalhe: 'foguete, propulsão e janela de missão', categoria: 'missao' },
  { url: 'https://images.unsplash.com/photo-1517976547714-720226b864c1?auto=format&fit=crop&w=1200&q=82', tema: 'estação espacial', detalhe: 'módulos, energia solar e microgravidade', categoria: 'estacao' },
  { url: 'https://images.unsplash.com/photo-1515705576963-95cad62945b6?auto=format&fit=crop&w=1200&q=82', tema: 'satélite em órbita', detalhe: 'painéis solares, sensores e comunicação', categoria: 'satelite' },
  { url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=82', tema: 'floresta monitorada', detalhe: 'copa verde, umidade e alerta ambiental', categoria: 'bioma' },
  { url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=82', tema: 'oceano monitorado', detalhe: 'ondas, correntes e clima costeiro', categoria: 'clima' },
  { url: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1200&q=82', tema: 'cidade noturna', detalhe: 'luzes urbanas e padrões de ocupação', categoria: 'cidade' },
  { url: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=1200&q=82', tema: 'paisagem turística', detalhe: 'cidade, relevo e ponto cultural', categoria: 'turismo' },
  { url: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=82', tema: 'cidade turística', detalhe: 'arquitetura, fluxo urbano e cultura', categoria: 'turismo' },
  { url: 'https://images.unsplash.com/photo-1457364983758-510f8afa9f5f?auto=format&fit=crop&w=1200&q=82', tema: 'radioastronomia', detalhe: 'antenas, sinal e escuta do céu', categoria: 'diario_orbital' },
  { url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=82', tema: 'centro de controle', detalhe: 'equipe, telas e coordenação de missão', categoria: 'missao' },
  { url: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=82', tema: 'laboratório científico', detalhe: 'pesquisa, amostras e validação', categoria: 'ods' },
  { url: 'https://images.unsplash.com/photo-1527489377706-5bf97e608852?auto=format&fit=crop&w=1200&q=82', tema: 'aurora polar', detalhe: 'partículas solares e atmosfera iluminada', categoria: 'clima' },
  { url: 'https://images.unsplash.com/photo-1492571350019-22de08371fd3?auto=format&fit=crop&w=1200&q=82', tema: 'observação urbana', detalhe: 'ruas, pessoas e leitura social', categoria: 'comunidade' },
  { url: 'https://images.unsplash.com/photo-1473773508845-188df298d2d1?auto=format&fit=crop&w=1200&q=82', tema: 'agricultura observada', detalhe: 'plantio, solo e segurança alimentar', categoria: 'ods' },
] as const;

const autoresTerra = ['amazonia_viva', 'lia_novaes', 'leo_martins', 'maria_okafor', 'nina_alvarez', 'ines_carvalho', 'ayla_fernandes', 'diego_amaral', 'samira_nasser', 'clara_monteiro'];
const autoresEspaco = ['helena_duarte', 'selene_base', 'rafael_kim', 'tomas_sato', 'omar_haddad', 'kai_roberts', 'benicio_luna', 'yara_mendes', 'enzo_moretti', 'lucas_ribeiro'];

function categoriaPorCamada(camada: string, fallback: TipoCategoriaPost): TipoCategoriaPost {
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

  return mapa[camada] ?? fallback;
}

function criarPost(indice: number, perspectiva: TipoPerspectiva): PostOrbitLink {
  const pontos = pontosArData.filter((ponto) => ponto.perspectiva === perspectiva);
  const ponto = pontos[indice % pontos.length] ?? pontosArData[indice % pontosArData.length];
  const foto = imagensPostagens[indice % imagensPostagens.length];
  const autores = perspectiva === 'terra' ? autoresTerra : autoresEspaco;
  const camadaPrincipal = ponto.camada[indice % ponto.camada.length] ?? 'social';
  const categoria = categoriaPorCamada(camadaPrincipal, foto.categoria);
  const origem = perspectiva === 'terra' ? 'da Terra' : 'do espaço';
  const relacaoFoto = `A imagem de ${foto.tema} aparece porque o post fala de ${foto.detalhe}.`;

  return {
    id: `post_${perspectiva}_${String(indice + 1).padStart(3, '0')}`,
    autorId: autores[indice % autores.length],
    perspectiva,
    titulo: `${ponto.nome} visto ${origem} #${String(indice + 1).padStart(3, '0')}`,
    texto: `${relacaoFoto} Em ${ponto.nome}, a camada ${camadaPrincipal} conecta localização, relato social e dados simulados para alimentar o Orbifeed sem depender de APIs externas.`,
    imagem: foto.url,
    categoria,
    pontoArId: ponto.id,
    ods: ponto.ods,
    curtidas: 120 + indice * 11,
    comentarios: indice % 8 === 0
      ? [{ id: `comentario_${perspectiva}_${indice}`, autor: 'Orbitlink', texto: 'Registro validado com imagem relacionada ao tema da postagem.', criadoEm: new Date(Date.now() - 1000 * 60 * (indice + 12)).toISOString() }]
      : [],
    compartilhamentos: 8 + indice * 2,
    criadoEm: new Date(Date.now() - 1000 * 60 * (indice * 7 + (perspectiva === 'terra' ? 3 : 5))).toISOString(),
    origemDados: 'simulado',
  };
}

export const postsData: PostOrbitLink[] = [
  ...Array.from({ length: 100 }, (_, indice) => criarPost(indice, 'terra')),
  ...Array.from({ length: 100 }, (_, indice) => criarPost(indice, 'espaco')),
];
/* === POSTS SIMULADOS | fim === */

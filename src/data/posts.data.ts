import { pontosArData } from '@/data/pontos-ar.data';
import type { PostOrbitLink, TipoCategoriaPost } from '@/types/orbitlink.types';

/* === POSTS SIMULADOS | inicio === */
const imagensPostagens = [
  { url: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1200&q=82', tema: 'Terra vista da órbita', detalhe: 'nuvens, oceanos e horizonte azul' },
  { url: 'https://images.unsplash.com/photo-1454789548928-9efd52dc4031?auto=format&fit=crop&w=1200&q=82', tema: 'superfície lunar', detalhe: 'crateras, sombra e terreno cinza' },
  { url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=82', tema: 'rede digital terrestre', detalhe: 'linhas de conexão e luzes de dados' },
  { url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=82', tema: 'floresta monitorada', detalhe: 'copa verde, umidade e alerta ambiental' },
  { url: 'https://images.unsplash.com/photo-1543059080-f9b1272213d5?auto=format&fit=crop&w=1200&q=82', tema: 'tecnologia espacial', detalhe: 'equipamentos, sensores e leitura técnica' },
  { url: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=1200&q=82', tema: 'paisagem turística', detalhe: 'cidade, relevo e ponto cultural' },
  { url: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=82', tema: 'céu de observação', detalhe: 'horizonte aberto e campo de visualização' },
  { url: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1200&q=82', tema: 'nebulosa profunda', detalhe: 'gás, poeira e brilho estelar' },
  { url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=82', tema: 'oceano monitorado', detalhe: 'ondas, correntes e clima costeiro' },
  { url: 'https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&w=1200&q=82', tema: 'lançamento espacial', detalhe: 'foguete, propulsão e janela de missão' },
  { url: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=82', tema: 'deserto e atmosfera', detalhe: 'areia, poeira e leitura climática' },
  { url: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?auto=format&fit=crop&w=1200&q=82', tema: 'horizonte orbital', detalhe: 'curvatura da Terra e camada atmosférica' },
  { url: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=82', tema: 'rotina em habitat', detalhe: 'luz interna, abrigo e vida cotidiana' },
  { url: 'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?auto=format&fit=crop&w=1200&q=82', tema: 'céu estrelado', detalhe: 'estrelas, silhueta e observação noturna' },
  { url: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=1200&q=82', tema: 'Marte', detalhe: 'terreno vermelho e exploração robótica' },
  { url: 'https://images.unsplash.com/photo-1457364983758-510f8afa9f5f?auto=format&fit=crop&w=1200&q=82', tema: 'radioastronomia', detalhe: 'antenas, sinal e escuta do céu' },
  { url: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1200&q=82', tema: 'cidade noturna', detalhe: 'luzes urbanas e padrões de ocupação' },
  { url: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=82', tema: 'tempestade oceânica', detalhe: 'nuvens densas, vento e alerta costeiro' },
  { url: 'https://images.unsplash.com/photo-1614726365930-627c75da663e?auto=format&fit=crop&w=1200&q=82', tema: 'planeta gasoso', detalhe: 'faixas atmosféricas e tempestades' },
  { url: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=82', tema: 'cidade turística', detalhe: 'arquitetura, fluxo urbano e cultura' },
  { url: 'https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?auto=format&fit=crop&w=1200&q=82', tema: 'rover de exploração', detalhe: 'robótica, solo marciano e coleta de dados' },
  { url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=82', tema: 'painel de dados', detalhe: 'gráficos, telemetria e decisão em tempo real' },
  { url: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?auto=format&fit=crop&w=1200&q=82', tema: 'campo profundo', detalhe: 'galáxias distantes e luz antiga' },
  { url: 'https://images.unsplash.com/photo-1492571350019-22de08371fd3?auto=format&fit=crop&w=1200&q=82', tema: 'observação urbana', detalhe: 'ruas, pessoas e leitura social' },
  { url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=82', tema: 'centro de controle', detalhe: 'equipe, telas e coordenação de missão' },
  { url: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=82', tema: 'laboratório científico', detalhe: 'pesquisa, amostras e validação' },
  { url: 'https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?auto=format&fit=crop&w=1200&q=82', tema: 'Via Láctea', detalhe: 'faixa estelar e céu escuro' },
  { url: 'https://images.unsplash.com/photo-1515705576963-95cad62945b6?auto=format&fit=crop&w=1200&q=82', tema: 'satélite em órbita', detalhe: 'painéis solares, sensores e comunicação' },
  { url: 'https://images.unsplash.com/photo-1545156521-77bd85671d30?auto=format&fit=crop&w=1200&q=82', tema: 'planeta distante', detalhe: 'superfície, sombra e composição atmosférica' },
  { url: 'https://images.unsplash.com/photo-1517976547714-720226b864c1?auto=format&fit=crop&w=1200&q=82', tema: 'estação espacial', detalhe: 'módulos, energia solar e microgravidade' },
  { url: 'https://images.unsplash.com/photo-1465101162946-4377e57745c3?auto=format&fit=crop&w=1200&q=82', tema: 'céu cósmico', detalhe: 'estrelas, nebulosas e escala profunda' },
  { url: 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?auto=format&fit=crop&w=1200&q=82', tema: 'constelações', detalhe: 'pontos de luz e orientação no céu' },
  { url: 'https://images.unsplash.com/photo-1504192010706-dd7f569ee2be?auto=format&fit=crop&w=1200&q=82', tema: 'campo terrestre', detalhe: 'solo, vegetação e observação ambiental' },
  { url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=82', tema: 'montanhas sob estrelas', detalhe: 'altitude, clima e observação remota' },
  { url: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=82', tema: 'planície natural', detalhe: 'relevo aberto, céu e vento' },
  { url: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=82', tema: 'paisagem árida', detalhe: 'areia, erosão e variação térmica' },
  { url: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?auto=format&fit=crop&w=1200&q=82', tema: 'montanha isolada', detalhe: 'neve, altitude e turismo sustentável' },
  { url: 'https://images.unsplash.com/photo-1527489377706-5bf97e608852?auto=format&fit=crop&w=1200&q=82', tema: 'aurora polar', detalhe: 'partículas solares e atmosfera iluminada' },
  { url: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=82', tema: 'trilha de observação', detalhe: 'campo, horizonte e céu limpo' },
  { url: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1200&q=82', tema: 'bioma preservado', detalhe: 'vegetação, biodiversidade e umidade' },
  { url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=82', tema: 'vale e água', detalhe: 'rios, relevo e equilíbrio climático' },
  { url: 'https://images.unsplash.com/photo-1473773508845-188df298d2d1?auto=format&fit=crop&w=1200&q=82', tema: 'agricultura observada', detalhe: 'plantio, solo e segurança alimentar' },
  { url: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=82', tema: 'deserto amplo', detalhe: 'dunas, poeira e circulação atmosférica' },
  { url: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1200&q=82', tema: 'cidade costeira', detalhe: 'turismo, mar e malha urbana' },
  { url: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=82', tema: 'solo seco', detalhe: 'aridez, calor e risco climático' },
  { url: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5ce?auto=format&fit=crop&w=1200&q=82', tema: 'mapa de viagem', detalhe: 'rotas, deslocamento e conexão global' },
  { url: 'https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?auto=format&fit=crop&w=1200&q=82', tema: 'lago e montanhas', detalhe: 'água doce, relevo e clima frio' },
  { url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=82', tema: 'faixa oceânica', detalhe: 'ondas, vento e observação costeira' },
  { url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=82', tema: 'cordilheira', detalhe: 'altitude, gelo e turismo de natureza' },
  { url: 'https://images.unsplash.com/photo-1511300636408-a63a89df3482?auto=format&fit=crop&w=1200&q=82', tema: 'floresta densa', detalhe: 'carbono, sombra e biodiversidade' },
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

function criarTituloPost(nomePonto: string, categoria: TipoCategoriaPost, perspectiva: 'terra' | 'espaco', indice: number) {
  const titulosTerra: Record<TipoCategoriaPost, string[]> = {
    diario_orbital: [`${nomePonto} entrou na janela de observação`, `Registro aberto de ${nomePonto}`],
    missao: [`Missão em foco: ${nomePonto}`, `${nomePonto} atualiza a rota da equipe`],
    estacao: [`Sinal ativo em ${nomePonto}`, `${nomePonto} aparece na passagem de hoje`],
    lua: [`${nomePonto} no radar lunar`, `Detalhe lunar em ${nomePonto}`],
    satelite: [`Telemetria visível: ${nomePonto}`, `${nomePonto} cruzou o céu agora`],
    evento: [`Evento celeste em ${nomePonto}`, `${nomePonto} chamou atenção no céu`],
    cidade: [`${nomePonto} conectada ao céu`, `Olhar urbano para ${nomePonto}`],
    turismo: [`Rota visual por ${nomePonto}`, `${nomePonto} virou ponto de observação`],
    comunidade: [`Comunidade acompanhando ${nomePonto}`, `${nomePonto} no mural social`],
    clima: [`Clima espacial perto de ${nomePonto}`, `${nomePonto} acende alerta de observação`],
    bioma: [`${nomePonto} visto como paisagem viva`, `Leitura ambiental de ${nomePonto}`],
    ods: [`${nomePonto} conectado aos ODS`, `Indicador social em ${nomePonto}`],
  };

  const titulosEspaco: Record<TipoCategoriaPost, string[]> = {
    diario_orbital: [`${nomePonto} visto da órbita`, `Registro orbital de ${nomePonto}`],
    missao: [`Missão terrestre em ${nomePonto}`, `${nomePonto} no painel de missão`],
    estacao: [`Base de leitura sobre ${nomePonto}`, `${nomePonto} na rota de monitoramento`],
    lua: [`Referência lunar sobre ${nomePonto}`, `${nomePonto} em paralelo com a Lua`],
    satelite: [`Satélite acompanhando ${nomePonto}`, `${nomePonto} sob leitura de sensores`],
    evento: [`Evento observado em ${nomePonto}`, `${nomePonto} ganhou destaque orbital`],
    cidade: [`Cidade em foco: ${nomePonto}`, `${nomePonto} em luzes e mapas`],
    turismo: [`Rota orbital por ${nomePonto}`, `${nomePonto} no mapa de viagem`],
    comunidade: [`Vozes locais em ${nomePonto}`, `${nomePonto} no radar da comunidade`],
    clima: [`Alerta climático em ${nomePonto}`, `${nomePonto} sob monitoramento ambiental`],
    bioma: [`Bioma em foco: ${nomePonto}`, `${nomePonto} como leitura de vida`],
    ods: [`ODS em campo: ${nomePonto}`, `${nomePonto} como indicador social`],
  };

  const lista = perspectiva === 'terra' ? titulosTerra[categoria] : titulosEspaco[categoria];
  return lista[indice % lista.length];
}

function criarTextoPost(nomePonto: string, camada: string, local: string, temaFoto: string, detalheFoto: string, perspectiva: 'terra' | 'espaco') {
  if (perspectiva === 'terra') {
    return `A foto de ${temaFoto} ajuda a contar o que está acontecendo em ${nomePonto}: ${detalheFoto}. O registro nasce na camada ${camada} e transforma o ${local} em uma conversa rápida para quem acompanha o céu pelo Orbifeed.`;
  }

  return `Em ${nomePonto}, a foto de ${temaFoto} abre uma leitura sobre ${detalheFoto}. A camada ${camada} mistura mapa orbital, dados simulados e relato local para aproximar a superfície de quem acompanha o planeta de cima.`;
}

export const postsData: PostOrbitLink[] = pontosArData.map((ponto, indice) => {
  const autores = ponto.perspectiva === 'terra' ? autoresTerra : autoresEspaco;
  const camadaPrincipal = ponto.camada[0] ?? 'social';
  const foto = imagensPostagens[indice % imagensPostagens.length];
  const local = ponto.perspectiva === 'terra' ? 'céu observado da Terra' : 'superfície da Terra vista do espaço';
  const categoria = categoriaPorCamada(camadaPrincipal);

  return {
    id: `post_mark_${String(indice + 1).padStart(2, '0')}`,
    autorId: autores[indice % autores.length],
    perspectiva: ponto.perspectiva,
    titulo: criarTituloPost(ponto.nome, categoria, ponto.perspectiva, indice),
    texto: criarTextoPost(ponto.nome, camadaPrincipal, local, foto.tema, foto.detalhe, ponto.perspectiva),
    imagem: foto.url,
    categoria,
    pontoArId: ponto.id,
    ods: ponto.ods,
    curtidas: 180 + indice * 17,
    comentarios: indice % 5 === 0
      ? [{ id: `comentario_mark_${indice}`, autor: 'Orbitlink', texto: 'Mark ativo para testar feed, AR e mapa com contexto visual coerente.', criadoEm: new Date(Date.now() - 1000 * 60 * (indice + 12)).toISOString() }]
      : [],
    compartilhamentos: 12 + indice * 3,
    criadoEm: new Date(Date.now() - 1000 * 60 * (indice * 9 + 8)).toISOString(),
    origemDados: 'simulado',
  };
});
/* === POSTS SIMULADOS | fim === */

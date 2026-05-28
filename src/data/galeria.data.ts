import type { ItemGaleria } from '@/types/orbitlink.types';

/* === GALERIA SIMULADA | inicio === */
const imagensGaleria = [
  ['gal_nasa_terra_azul', 'Terra azul vista da órbita', 'Oceanos, nuvens e atmosfera aparecem como uma leitura visual da Terra para posts de clima e observação orbital.', 'terra', 'aurora', 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1400&q=82'],
  ['gal_nasa_horizonte_terra', 'Horizonte da Terra', 'A borda luminosa do planeta reforça a ideia de atmosfera fina, fragilidade climática e monitoramento contínuo.', 'terra', 'gaia13', 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?auto=format&fit=crop&w=1400&q=82'],
  ['gal_nasa_lua_cheia', 'Lua em alta resolução', 'Crateras e contraste lunar apoiam os marks de observação do céu e as conversas sobre fases da Lua.', 'lua', 'lua', 'https://images.unsplash.com/photo-1614642264762-d0a3b8bf3700?auto=format&fit=crop&w=1400&q=82'],
  ['gal_nasa_base_lunar', 'Base lunar experimental', 'Terreno árido e luz fria ajudam a imaginar a rotina social da Base Selene fora da Terra.', 'lua', 'selene', 'https://images.unsplash.com/photo-1454789548928-9efd52dc4031?auto=format&fit=crop&w=1400&q=82'],
  ['gal_nasa_marte_vermelho', 'Superfície de Marte', 'Relevo avermelhado e poeira marciana contextualizam missões educativas e exploração robótica.', 'marte', 'marte', 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=1400&q=82'],
  ['gal_nasa_rover_marte', 'Rover em terreno marciano', 'A cena destaca navegação autônoma, coleta de dados e rotina de pesquisa em outro planeta.', 'marte', 'sonda_marte_7', 'https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?auto=format&fit=crop&w=1400&q=82'],
  ['gal_nasa_nebulosa_orion', 'Nebulosa de Órion', 'Nuvens de gás e poeira mostram regiões onde novas estrelas podem nascer.', 'espaco', 'orion_nebula', 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1400&q=82'],
  ['gal_nasa_campo_profundo', 'Campo profundo do espaço', 'Galáxias distantes representam escala cósmica, luz antiga e observação por telescópios espaciais.', 'espaco', 'webb_deep', 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?auto=format&fit=crop&w=1400&q=82'],
  ['gal_nasa_saturno', 'Saturno e seus anéis', 'A imagem apoia conteúdos sobre planetas gasosos, anéis e observação telescópica.', 'espaco', 'anel_saturno', 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?auto=format&fit=crop&w=1400&q=82'],
  ['gal_nasa_jupiter', 'Júpiter em observação', 'Faixas atmosféricas e tempestades gigantes entram como referência para grandes planetas do Sistema Solar.', 'espaco', 'jupiter', 'https://images.unsplash.com/photo-1614726365930-627c75da663e?auto=format&fit=crop&w=1400&q=82'],
  ['gal_nasa_foguete', 'Lançamento de foguete', 'Fumaça, propulsão e torre de lançamento ajudam a explicar janelas de missão e operações de solo.', 'espaco', 'cabo_canaveral', 'https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&w=1400&q=82'],
  ['gal_nasa_estacao', 'Estação espacial em órbita', 'Módulos, painéis solares e microgravidade contextualizam vida e manutenção em órbita.', 'espaco', 'aurora', 'https://images.unsplash.com/photo-1517976547714-720226b864c1?auto=format&fit=crop&w=1400&q=82'],
  ['gal_nasa_satelite', 'Satélite de observação', 'Sensores orbitais aparecem como ponte entre clima, cidades e monitoramento ambiental.', 'espaco', 'gaia13', 'https://images.unsplash.com/photo-1515705576963-95cad62945b6?auto=format&fit=crop&w=1400&q=82'],
  ['gal_nasa_missao_controle', 'Centro de controle de missão', 'Telas e equipes em operação mostram telemetria, decisão em tempo real e coordenação técnica.', 'espaco', 'aurora', 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1400&q=82'],
  ['gal_nasa_amazonia', 'Amazônia por monitoramento orbital', 'Floresta, rios e calor aparecem como tema central para alertas climáticos e ODS 13.', 'clima', 'amazonia', 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1400&q=82'],
  ['gal_nasa_pantanal', 'Pantanal e água sazonal', 'Áreas alagadas e biodiversidade ajudam a conversar sobre seca, cheias e observação terrestre.', 'clima', 'pantanal', 'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?auto=format&fit=crop&w=1400&q=82'],
  ['gal_nasa_oceano', 'Oceano e correntes', 'Ondas e extensão azul apoiam conteúdos sobre temperatura, tempestades e vida marinha.', 'clima', 'pacifico', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=82'],
  ['gal_nasa_tempestade', 'Tempestade vista do alto', 'Nuvens densas e atmosfera carregada explicam alertas, vento e resposta de comunidades costeiras.', 'clima', 'alerta_atlantico', 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1400&q=82'],
  ['gal_nasa_antartida', 'Gelo antártico', 'Gelo, albedo e aquecimento global entram como leitura visual para ODS 13.', 'clima', 'antartida', 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1400&q=82'],
  ['gal_nasa_saara', 'Poeira do Saara', 'Dunas e aridez ajudam a explicar circulação atmosférica e transporte de partículas.', 'clima', 'saara', 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1400&q=82'],
  ['gal_nasa_sao_paulo', 'São Paulo noturna', 'Luzes urbanas e densidade visual abrem conversa sobre calor, mobilidade e cidades sustentáveis.', 'cidade', 'sao_paulo', 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1400&q=82'],
  ['gal_nasa_rio', 'Rio de Janeiro turístico', 'Paisagem, mar e cultura conectam turismo, pertencimento e ODS 11.', 'turismo', 'rio_cristo', 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=1400&q=82'],
  ['gal_nasa_paris', 'Paris vista como rede urbana', 'Arquitetura e fluxo de pessoas mostram turismo, luz noturna e vida de cidade global.', 'turismo', 'paris', 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1400&q=82'],
  ['gal_nasa_fuji', 'Monte Fuji', 'Relevo, neve e cultura visual aproximam turismo sustentável e observação remota.', 'turismo', 'monte_fuji', 'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?auto=format&fit=crop&w=1400&q=82'],
  ['gal_nasa_andes', 'Cordilheira dos Andes', 'Montanhas, altitude e gelo ajudam a conectar relevo, clima e turismo de natureza.', 'turismo', 'andes', 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1400&q=82'],
  ['gal_nasa_himalaias', 'Himalaia', 'Alta altitude, neve e risco climático aparecem como tema de água, gelo e adaptação.', 'turismo', 'himalaias', 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1400&q=82'],
  ['gal_nasa_cidade_noite', 'Cidades como constelações', 'Luzes urbanas revelam concentração, energia e desigualdade vistas como padrões do mapa.', 'cidade', 'nova_york', 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1400&q=82'],
  ['gal_nasa_agricultura', 'Agricultura observada por satélite', 'Plantio e solo entram como tema de safras, irrigação, segurança alimentar e dados abertos.', 'clima', 'cerrado', 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1400&q=82'],
  ['gal_nasa_radio', 'Radioastronomia', 'Antenas e observatórios explicam sinais, frequências e escuta científica do céu.', 'espaco', 'observatorio_solar', 'https://images.unsplash.com/photo-1457364983758-510f8afa9f5f?auto=format&fit=crop&w=1400&q=82'],
  ['gal_nasa_aurora', 'Aurora no horizonte', 'Luz polar e atmosfera terrestre conectam clima espacial, partículas solares e observação do céu.', 'espaco', 'portal_aurora', 'https://images.unsplash.com/photo-1483347756197-71ef80e95f73?auto=format&fit=crop&w=1400&q=82'],
] as const;

export const galeriaData: ItemGaleria[] = imagensGaleria.map(([id, titulo, descricao, categoria, pontoArId, imagem]) => ({
  id,
  titulo,
  descricao,
  imagem,
  categoria: categoria as ItemGaleria['categoria'],
  pontoArId,
  origemDados: 'nasa_images',
}));
/* === GALERIA SIMULADA | fim === */

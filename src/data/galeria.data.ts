import type { ItemGaleria } from '@/types/orbitlink.types';

/* === GALERIA SIMULADA | inicio === */
const imagensGaleriaBase = [
  ['Terra azul vista da órbita', 'Oceanos, nuvens e atmosfera mostram a Terra como referência de clima e observação orbital.', 'terra', 'aurora', 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1400&q=82'],
  ['Horizonte da Terra', 'A borda luminosa do planeta reforça atmosfera, fragilidade climática e monitoramento contínuo.', 'terra', 'gaia13', 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?auto=format&fit=crop&w=1400&q=82'],
  ['Lua em alta resolução', 'Crateras e contraste lunar apoiam marks de observação do céu e conversas sobre fases da Lua.', 'lua', 'lua', 'https://images.unsplash.com/photo-1614642264762-d0a3b8bf3700?auto=format&fit=crop&w=1400&q=82'],
  ['Base lunar experimental', 'Terreno árido e luz fria ajudam a imaginar a rotina social da Base Selene.', 'lua', 'selene', 'https://images.unsplash.com/photo-1454789548928-9efd52dc4031?auto=format&fit=crop&w=1400&q=82'],
  ['Superfície de Marte', 'Relevo avermelhado e poeira marciana contextualizam missões educativas e exploração robótica.', 'marte', 'marte', 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=1400&q=82'],
  ['Rover em terreno marciano', 'A cena destaca navegação autônoma, coleta de dados e rotina de pesquisa em outro planeta.', 'marte', 'sonda_marte_7', 'https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?auto=format&fit=crop&w=1400&q=82'],
  ['Nebulosa de Órion', 'Nuvens de gás e poeira mostram regiões onde novas estrelas podem nascer.', 'espaco', 'orion_nebula', 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1400&q=82'],
  ['Campo profundo do espaço', 'Galáxias distantes representam escala cósmica, luz antiga e observação espacial.', 'espaco', 'webb_deep', 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?auto=format&fit=crop&w=1400&q=82'],
  ['Saturno e seus anéis', 'A imagem apoia conteúdos sobre planetas gasosos, anéis e observação telescópica.', 'espaco', 'anel_saturno', 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?auto=format&fit=crop&w=1400&q=82'],
  ['Júpiter em observação', 'Faixas atmosféricas e tempestades gigantes entram como referência para grandes planetas.', 'espaco', 'jupiter', 'https://images.unsplash.com/photo-1614726365930-627c75da663e?auto=format&fit=crop&w=1400&q=82'],
  ['Lançamento de foguete', 'Fumaça, propulsão e torre explicam janelas de missão e operações de solo.', 'espaco', 'cabo_canaveral', 'https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&w=1400&q=82'],
  ['Estação espacial em órbita', 'Módulos, painéis solares e microgravidade contextualizam vida em órbita.', 'espaco', 'aurora', 'https://images.unsplash.com/photo-1517976547714-720226b864c1?auto=format&fit=crop&w=1400&q=82'],
  ['Amazônia por monitoramento orbital', 'Floresta, rios e calor aparecem como tema central para alertas climáticos.', 'clima', 'amazonia', 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1400&q=82'],
  ['Pantanal e água sazonal', 'Áreas alagadas e biodiversidade ajudam a conversar sobre seca, cheias e observação terrestre.', 'clima', 'pantanal', 'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?auto=format&fit=crop&w=1400&q=82'],
  ['Oceano e correntes', 'Ondas e extensão azul apoiam conteúdos sobre temperatura, tempestades e vida marinha.', 'clima', 'pacifico', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=82'],
  ['São Paulo noturna', 'Luzes urbanas e densidade visual abrem conversa sobre calor e cidades sustentáveis.', 'cidade', 'sao_paulo', 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1400&q=82'],
  ['Cidades como constelações', 'Luzes urbanas revelam concentração, energia e padrões do mapa.', 'cidade', 'nova_york', 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1400&q=82'],
  ['Rio de Janeiro turístico', 'Paisagem, mar e cultura conectam turismo, pertencimento e ODS 11.', 'turismo', 'rio_cristo', 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=1400&q=82'],
  ['Paris vista como rede urbana', 'Arquitetura e fluxo mostram turismo, luz noturna e vida de cidade global.', 'turismo', 'paris', 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1400&q=82'],
  ['Monte Fuji', 'Relevo, neve e cultura visual aproximam turismo sustentável e observação remota.', 'turismo', 'monte_fuji', 'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?auto=format&fit=crop&w=1400&q=82'],
] as const;

export const galeriaData: ItemGaleria[] = Array.from({ length: 100 }, (_, indice) => {
  const [titulo, descricao, categoria, pontoArId, imagem] = imagensGaleriaBase[indice % imagensGaleriaBase.length];

  return {
    id: `galeria_simulada_${String(indice + 1).padStart(3, '0')}`,
    titulo: `${titulo} #${String(indice + 1).padStart(3, '0')}`,
    descricao,
    imagem,
    categoria: categoria as ItemGaleria['categoria'],
    pontoArId,
    origemDados: 'nasa_images',
  };
});
/* === GALERIA SIMULADA | fim === */

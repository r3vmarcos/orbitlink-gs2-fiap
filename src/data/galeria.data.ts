import type { ItemGaleria } from '@/types/orbitlink.types';

/* === GALERIA SIMULADA | inicio === */
const imagensGaleria = [
  ['gal_nasa_terra_azul', 'Terra azul vista da orbita', 'Imagem inspirada nos acervos da NASA para mostrar oceanos, nuvens e atmosfera em uma leitura visual da Terra.', 'terra', 'aurora', 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1400&q=82'],
  ['gal_nasa_horizonte_terra', 'Horizonte da Terra', 'Registro traduzido para a galeria Orbitlink: a borda luminosa do planeta ajuda a explicar atmosfera e fragilidade climatica.', 'terra', 'gaia13', 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?auto=format&fit=crop&w=1400&q=82'],
  ['gal_nasa_lua_cheia', 'Lua em alta resolucao', 'Conteudo de apoio sobre a Lua, fases lunares e observacao do ceu para os marks da camada lunar.', 'lua', 'lua', 'https://images.unsplash.com/photo-1614642264762-d0a3b8bf3700?auto=format&fit=crop&w=1400&q=82'],
  ['gal_nasa_base_lunar', 'Base lunar experimental', 'Visual de missao lunar traduzido para o contexto da Base Selene e estudos de vida fora da Terra.', 'lua', 'selene', 'https://images.unsplash.com/photo-1454789548928-9efd52dc4031?auto=format&fit=crop&w=1400&q=82'],
  ['gal_nasa_marte_vermelho', 'Superficie de Marte', 'Imagem tematica sobre relevo marciano, poeira e exploracao robotica em missoes educativas.', 'marte', 'marte', 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=1400&q=82'],
  ['gal_nasa_rover_marte', 'Rover em terreno marciano', 'Registro visual para explicar navegacao, coleta de dados e rotina de exploracao em Marte.', 'marte', 'sonda_marte_7', 'https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?auto=format&fit=crop&w=1400&q=82'],
  ['gal_nasa_nebulosa_orion', 'Nebulosa de Orion', 'Conteudo astronomico traduzido: nuvens de gas e poeira onde novas estrelas podem nascer.', 'espaco', 'orion_nebula', 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1400&q=82'],
  ['gal_nasa_campo_profundo', 'Campo profundo do espaco', 'Imagem inspirada em observatorios espaciais para representar galaxias distantes e luz antiga.', 'espaco', 'webb_deep', 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?auto=format&fit=crop&w=1400&q=82'],
  ['gal_nasa_saturno', 'Saturno e seus aneis', 'Material visual para explicar planetas gasosos, aneis e observacao telescopica.', 'espaco', 'anel_saturno', 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?auto=format&fit=crop&w=1400&q=82'],
  ['gal_nasa_jupiter', 'Jupiter em observacao', 'Imagem de apoio sobre tempestades, atmosfera e grandes planetas do Sistema Solar.', 'espaco', 'jupiter', 'https://images.unsplash.com/photo-1614726365930-627c75da663e?auto=format&fit=crop&w=1400&q=82'],
  ['gal_nasa_foguete', 'Lancamento de foguete', 'Registro traduzido sobre janela de lancamento, propulsao e operacoes de solo.', 'espaco', 'cabo_canaveral', 'https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&w=1400&q=82'],
  ['gal_nasa_estacao', 'Estacao espacial em orbita', 'Imagem para contextualizar vida em microgravidade, manutencao e comunicacao com a Terra.', 'espaco', 'aurora', 'https://images.unsplash.com/photo-1517976547714-720226b864c1?auto=format&fit=crop&w=1400&q=82'],
  ['gal_nasa_satelite', 'Satelite de observacao', 'Conteudo sobre sensores orbitais usados para clima, cidades e monitoramento ambiental.', 'espaco', 'gaia13', 'https://images.unsplash.com/photo-1515705576963-95cad62945b6?auto=format&fit=crop&w=1400&q=82'],
  ['gal_nasa_missao_controle', 'Centro de controle de missao', 'Imagem traduzida para mostrar equipes, telemetria e decisoes em tempo real.', 'espaco', 'aurora', 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1400&q=82'],
  ['gal_nasa_amazonia', 'Amazonia vista por monitoramento orbital', 'Visual ambiental para discutir floresta, rios, calor e alertas climaticos.', 'clima', 'amazonia', 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1400&q=82'],
  ['gal_nasa_pantanal', 'Pantanal e agua sazonal', 'Registro de bioma para conversa sobre biodiversidade, seca e observacao terrestre.', 'clima', 'pantanal', 'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?auto=format&fit=crop&w=1400&q=82'],
  ['gal_nasa_oceano', 'Oceano e correntes', 'Imagem traduzida para apoiar conteudos sobre temperatura, tempestades e vida marinha.', 'clima', 'pacifico', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=82'],
  ['gal_nasa_tempestade', 'Tempestade vista do alto', 'Conteudo climatico para explicar alertas, nuvens e resposta de comunidades costeiras.', 'clima', 'alerta_atlantico', 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1400&q=82'],
  ['gal_nasa_antartida', 'Gelo antartico', 'Imagem de apoio para discutir gelo, albedo, aquecimento global e ODS 13.', 'clima', 'antartida', 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1400&q=82'],
  ['gal_nasa_saara', 'Poeira do Saara', 'Visual de deserto usado para explicar circulacao atmosferica e transporte de particulas.', 'clima', 'saara', 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1400&q=82'],
  ['gal_nasa_sao_paulo', 'Sao Paulo noturna', 'Imagem urbana para falar de calor, luz, mobilidade e cidades sustentaveis.', 'cidade', 'sao_paulo', 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1400&q=82'],
  ['gal_nasa_rio', 'Rio de Janeiro turistico', 'Camada de turismo orbital traduzida para conectar paisagem, cultura e ODS 11.', 'turismo', 'rio_cristo', 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=1400&q=82'],
  ['gal_nasa_paris', 'Paris vista como rede urbana', 'Imagem de cidade global para discutir turismo, luz noturna e fluxo de pessoas.', 'turismo', 'paris', 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1400&q=82'],
  ['gal_nasa_fuji', 'Monte Fuji', 'Registro turistico e natural para comparar cultura, relevo e observacao remota.', 'turismo', 'monte_fuji', 'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?auto=format&fit=crop&w=1400&q=82'],
  ['gal_nasa_andes', 'Cordilheira dos Andes', 'Imagem de montanhas para explicar relevo, neve, clima e turismo sustentavel.', 'turismo', 'andes', 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1400&q=82'],
  ['gal_nasa_himalaias', 'Himalaias', 'Visual de alta altitude para conversar sobre gelo, agua e risco climatico.', 'turismo', 'himalaias', 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1400&q=82'],
  ['gal_nasa_cidade_noite', 'Cidades como constelacoes', 'Imagem traduzida para mostrar como luz urbana revela concentracao, energia e desigualdade.', 'cidade', 'nova_york', 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1400&q=82'],
  ['gal_nasa_agricultura', 'Agricultura observada por satelite', 'Conteudo sobre safras, irrigacao, seguranca alimentar e dados abertos.', 'clima', 'cerrado', 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1400&q=82'],
  ['gal_nasa_radio', 'Radioastronomia', 'Imagem de antenas e observatorios para explicar sinais, frequencias e escuta do ceu.', 'espaco', 'observatorio_solar', 'https://images.unsplash.com/photo-1457364983758-510f8afa9f5f?auto=format&fit=crop&w=1400&q=82'],
  ['gal_nasa_aurora', 'Aurora no horizonte', 'Registro visual para conectar clima espacial, particulas solares e atmosfera terrestre.', 'espaco', 'portal_aurora', 'https://images.unsplash.com/photo-1483347756197-71ef80e95f73?auto=format&fit=crop&w=1400&q=82'],
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

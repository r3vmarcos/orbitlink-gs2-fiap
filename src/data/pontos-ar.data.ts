import type { PontoAr, TipoCamadaAr, TipoOds, TipoPontoAr, TipoPerspectiva } from '@/types/orbitlink.types';

/* === PONTOS AR SIMULADOS | inicio === */
interface EntradaPontoAr {
  id: string;
  nome: string;
  tipo: TipoPontoAr;
  perspectiva: TipoPerspectiva;
  camada: TipoCamadaAr[];
  x: number;
  y: number;
  latitude?: number;
  longitude?: number;
  statusAtivo?: boolean;
  nivelAlerta?: 'baixo' | 'medio' | 'alto';
  ods?: TipoOds[];
}

const pontosCeu: EntradaPontoAr[] = [
  ['lua', 'Lua', 'lua', ['lua', 'social'], 8, 12],
  ['selene', 'Colônia Lunar Selene', 'colonia_lunar', ['lua', 'missoes', 'social'], 17, 22, true],
  ['base_artemis', 'Base Artemis', 'colonia_lunar', ['lua', 'missoes'], 27, 14, true],
  ['marte', 'Marte', 'planeta', ['planetas', 'missoes'], 36, 28],
  ['venus', 'Venus', 'planeta', ['planetas', 'eventos'], 45, 11],
  ['jupiter', 'Júpiter', 'planeta', ['planetas', 'eventos'], 55, 24],
  ['saturno', 'Saturno', 'planeta', ['planetas'], 66, 16],
  ['mercurio', 'Mercúrio', 'planeta', ['planetas'], 74, 30],
  ['netuno', 'Netuno', 'planeta', ['planetas'], 84, 19],
  ['urano', 'Urano', 'planeta', ['planetas'], 94, 33],
  ['aurora', 'Estação Orbital Aurora', 'estacao_espacial', ['estacoes', 'social', 'missoes'], 4, 44, true],
  ['iss_passagem', 'Passagem ISS', 'estacao_espacial', ['estacoes', 'social'], 13, 56, true],
  ['tiangong_link', 'Tiangong Link', 'estacao_espacial', ['estacoes', 'missoes'], 23, 41],
  ['gaia13', 'Satélite Gaia-13', 'satelite', ['satelites', 'clima', 'missoes'], 33, 52, true],
  ['copernicus_eco', 'Copernicus Eco', 'satelite', ['satelites', 'clima', 'ods'], 43, 36],
  ['hubble_orbital', 'Hubble Orbital', 'satelite', ['satelites', 'eventos'], 53, 49],
  ['webb_deep', 'Webb Deep Field', 'satelite', ['satelites', 'eventos'], 63, 35],
  ['starlink_01', 'Constelação Starlink 01', 'satelite', ['satelites', 'social'], 73, 47],
  ['sentinel_azul', 'Sentinel Azul', 'satelite', ['satelites', 'clima'], 83, 39],
  ['meteor_9', 'Meteor-9', 'satelite', ['satelites', 'clima'], 93, 53],
  ['sirius', 'Sirius', 'evento_astronomico', ['eventos', 'social'], 10, 70, true],
  ['chuva_meteoros', 'Chuva de Meteoros', 'evento_astronomico', ['eventos', 'social'], 20, 78],
  ['orion_nebula', 'Nebulosa de Órion', 'evento_astronomico', ['eventos'], 30, 65],
  ['cruzeiro_sul', 'Cruzeiro do Sul', 'evento_astronomico', ['eventos', 'social'], 40, 84],
  ['alfa_centauri', 'Alfa Centauri', 'evento_astronomico', ['eventos'], 50, 69],
  ['pleiades', 'Plêiades', 'evento_astronomico', ['eventos'], 60, 80],
  ['vega', 'Vega', 'evento_astronomico', ['eventos'], 70, 63],
  ['antares', 'Antares', 'evento_astronomico', ['eventos'], 80, 76],
  ['eclipse_lunar', 'Eclipse Lunar', 'evento_astronomico', ['lua', 'eventos'], 90, 67, true],
  ['cometa_ares', 'Cometa Ares', 'evento_astronomico', ['eventos', 'missoes'], 6, 86],
  ['sonda_luna_3', 'Sonda Luna-3', 'satelite', ['lua', 'missoes'], 16, 33],
  ['sonda_marte_7', 'Sonda Marte-7', 'satelite', ['planetas', 'missoes'], 26, 73],
  ['drone_orbital', 'Drone Orbital FIAP', 'satelite', ['satelites', 'social'], 36, 58],
  ['observatorio_solar', 'Observatório Solar', 'satelite', ['satelites', 'clima'], 46, 88],
  ['anel_saturno', 'Anéis de Saturno', 'planeta', ['planetas', 'eventos'], 56, 59],
  ['janela_lunar', 'Janela Lunar', 'lua', ['lua', 'eventos'], 66, 72],
  ['rota_artemis', 'Rota Artemis', 'evento_astronomico', ['lua', 'missoes'], 76, 57],
  ['constelacao_ods', 'Constelação ODS', 'evento_astronomico', ['ods', 'social'], 86, 82],
  ['baliza_orbital', 'Baliza Orbital', 'satelite', ['satelites', 'missoes'], 96, 61],
  ['portal_aurora', 'Portal Aurora', 'evento_astronomico', ['eventos', 'clima'], 48, 6, true],
].map(([id, nome, tipo, camada, x, y, statusAtivo]) => ({
  id: id as string,
  nome: nome as string,
  tipo: tipo as TipoPontoAr,
  perspectiva: 'terra',
  camada: camada as TipoCamadaAr[],
  x: x as number,
  y: y as number,
  statusAtivo: Boolean(statusAtivo),
  ods: (camada as TipoCamadaAr[]).includes('clima') ? ['ODS 13'] : ['ODS 9'],
}));

const pontosTerra: EntradaPontoAr[] = [
  { id: 'brasil', nome: 'Brasil', tipo: 'pais', perspectiva: 'espaco', camada: ['cidades', 'social', 'ods'], x: 47, y: 58, latitude: -14.235, longitude: -51.9253, ods: ['ODS 11', 'ODS 13'] },
  { id: 'amazonia', nome: 'Amazônia', tipo: 'bioma', perspectiva: 'espaco', camada: ['biomas', 'clima', 'ods', 'social'], x: 42, y: 48, latitude: -3.4653, longitude: -62.2159, statusAtivo: true, nivelAlerta: 'medio', ods: ['ODS 13', 'ODS 2'] },
  { id: 'sao_paulo', nome: 'São Paulo', tipo: 'cidade', perspectiva: 'espaco', camada: ['cidades', 'social', 'ods'], x: 50, y: 65, latitude: -23.5505, longitude: -46.6333, ods: ['ODS 11'] },
  { id: 'rio_cristo', nome: 'Cristo Redentor', tipo: 'ponto_turistico', perspectiva: 'espaco', camada: ['turismo', 'cidades', 'social'], x: 54, y: 68, latitude: -22.9519, longitude: -43.2105, ods: ['ODS 8', 'ODS 11'] },
  { id: 'paris', nome: 'Paris', tipo: 'cidade', perspectiva: 'espaco', camada: ['cidades', 'turismo'], x: 52, y: 32, latitude: 48.8566, longitude: 2.3522, ods: ['ODS 8', 'ODS 11'] },
  { id: 'monte_fuji', nome: 'Monte Fuji', tipo: 'ponto_turistico', perspectiva: 'espaco', camada: ['turismo', 'biomas'], x: 75, y: 43, latitude: 35.3606, longitude: 138.7274, ods: ['ODS 8'] },
  { id: 'alerta_atlantico', nome: 'Alerta Atlântico Sul', tipo: 'alerta_ambiental', perspectiva: 'espaco', camada: ['clima', 'ods'], x: 38, y: 72, latitude: -32, longitude: -35, nivelAlerta: 'alto', ods: ['ODS 13'] },
  { id: 'tokyo_noite', nome: 'Tokyo', tipo: 'cidade', perspectiva: 'espaco', camada: ['cidades', 'turismo', 'social'], x: 69, y: 62, latitude: 35.6762, longitude: 139.6503, ods: ['ODS 11'] },
  { id: 'saara', nome: 'Deserto do Saara', tipo: 'bioma', perspectiva: 'espaco', camada: ['biomas', 'clima'], x: 88, y: 37, latitude: 23.4162, longitude: 25.6628, ods: ['ODS 13'] },
  { id: 'pacifico', nome: 'Oceano Pacífico', tipo: 'oceano', perspectiva: 'espaco', camada: ['clima', 'ods'], x: 95, y: 74, latitude: -8.7832, longitude: -124.5085, nivelAlerta: 'baixo', ods: ['ODS 13'] },
  { id: 'cabo_canaveral', nome: 'Cabo Canaveral', tipo: 'ponto_turistico', perspectiva: 'espaco', camada: ['missoes', 'turismo', 'social'], x: 28, y: 39, latitude: 28.3922, longitude: -80.6077, ods: ['ODS 8', 'ODS 9'] },
  { id: 'andes', nome: 'Cordilheira dos Andes', tipo: 'bioma', perspectiva: 'espaco', camada: ['biomas', 'turismo', 'clima'], x: 31, y: 76, latitude: -32.6532, longitude: -70.0119, ods: ['ODS 11', 'ODS 13'] },
  { id: 'mural_fiap', nome: 'Mural FIAP Orbitlink', tipo: 'comunidade', perspectiva: 'espaco', camada: ['social', 'ods'], x: 51, y: 66, latitude: -23.5733, longitude: -46.6238, statusAtivo: true, ods: ['ODS 9', 'ODS 11'] },
  { id: 'recife_antenas', nome: 'Recife Antenas', tipo: 'cidade', perspectiva: 'espaco', camada: ['cidades', 'social'], x: 55, y: 55, latitude: -8.0476, longitude: -34.877, ods: ['ODS 11'] },
  { id: 'pantanal', nome: 'Pantanal', tipo: 'bioma', perspectiva: 'espaco', camada: ['biomas', 'clima', 'ods'], x: 45, y: 71, latitude: -16.3501, longitude: -56.666, nivelAlerta: 'medio', ods: ['ODS 13', 'ODS 2'] },
  { id: 'cerrado', nome: 'Cerrado', tipo: 'bioma', perspectiva: 'espaco', camada: ['biomas', 'clima'], x: 48, y: 61, latitude: -15.78, longitude: -47.93, ods: ['ODS 13'] },
  { id: 'mata_atlantica', nome: 'Mata Atlântica', tipo: 'bioma', perspectiva: 'espaco', camada: ['biomas', 'clima', 'ods'], x: 56, y: 70, latitude: -20.3, longitude: -42.8, ods: ['ODS 13'] },
  { id: 'caatinga', nome: 'Caatinga', tipo: 'bioma', perspectiva: 'espaco', camada: ['biomas', 'clima'], x: 53, y: 53, latitude: -9.6, longitude: -40.4, ods: ['ODS 13'] },
  { id: 'londres', nome: 'Londres', tipo: 'cidade', perspectiva: 'espaco', camada: ['cidades', 'turismo'], x: 49, y: 29, latitude: 51.5072, longitude: -0.1276, ods: ['ODS 11'] },
  { id: 'nova_york', nome: 'Nova York', tipo: 'cidade', perspectiva: 'espaco', camada: ['cidades', 'turismo', 'social'], x: 30, y: 37, latitude: 40.7128, longitude: -74.006, ods: ['ODS 11'] },
  { id: 'cairo', nome: 'Cairo', tipo: 'cidade', perspectiva: 'espaco', camada: ['cidades', 'turismo'], x: 60, y: 43, latitude: 30.0444, longitude: 31.2357, ods: ['ODS 8', 'ODS 11'] },
  { id: 'nairobi', nome: 'Nairobi', tipo: 'cidade', perspectiva: 'espaco', camada: ['cidades', 'biomas'], x: 62, y: 58, latitude: -1.2921, longitude: 36.8219, ods: ['ODS 11'] },
  { id: 'sydney', nome: 'Sydney', tipo: 'cidade', perspectiva: 'espaco', camada: ['cidades', 'turismo'], x: 84, y: 79, latitude: -33.8688, longitude: 151.2093, ods: ['ODS 8', 'ODS 11'] },
  { id: 'himalaias', nome: 'Himalaias', tipo: 'bioma', perspectiva: 'espaco', camada: ['biomas', 'turismo', 'clima'], x: 72, y: 42, latitude: 27.9881, longitude: 86.925, ods: ['ODS 13'] },
  { id: 'grand_canyon', nome: 'Grand Canyon', tipo: 'ponto_turistico', perspectiva: 'espaco', camada: ['turismo', 'biomas'], x: 22, y: 46, latitude: 36.1069, longitude: -112.1129, ods: ['ODS 8'] },
  { id: 'machu_picchu', nome: 'Machu Picchu', tipo: 'ponto_turistico', perspectiva: 'espaco', camada: ['turismo', 'biomas'], x: 34, y: 70, latitude: -13.1631, longitude: -72.545, ods: ['ODS 8'] },
  { id: 'galapagos', nome: 'Galápagos', tipo: 'bioma', perspectiva: 'espaco', camada: ['biomas', 'clima', 'turismo'], x: 28, y: 64, latitude: -0.9538, longitude: -90.9656, ods: ['ODS 13'] },
  { id: 'antartida', nome: 'Antártida', tipo: 'bioma', perspectiva: 'espaco', camada: ['biomas', 'clima', 'ods'], x: 52, y: 94, latitude: -82.8628, longitude: 135, nivelAlerta: 'alto', ods: ['ODS 13'] },
  { id: 'groenlandia', nome: 'Groenlândia', tipo: 'bioma', perspectiva: 'espaco', camada: ['biomas', 'clima'], x: 37, y: 16, latitude: 71.7069, longitude: -42.6043, ods: ['ODS 13'] },
  { id: 'mediterraneo', nome: 'Mediterrâneo', tipo: 'oceano', perspectiva: 'espaco', camada: ['clima', 'turismo'], x: 56, y: 41, latitude: 35, longitude: 18, ods: ['ODS 13'] },
  { id: 'indico', nome: 'Oceano Índico', tipo: 'oceano', perspectiva: 'espaco', camada: ['clima', 'ods'], x: 70, y: 68, latitude: -20, longitude: 80, ods: ['ODS 13'] },
  { id: 'atlanta_luzes', nome: 'Atlanta Luzes', tipo: 'cidade', perspectiva: 'espaco', camada: ['cidades', 'social'], x: 27, y: 44, latitude: 33.749, longitude: -84.388, ods: ['ODS 11'] },
  { id: 'dubai', nome: 'Dubai', tipo: 'cidade', perspectiva: 'espaco', camada: ['cidades', 'turismo'], x: 65, y: 49, latitude: 25.2048, longitude: 55.2708, ods: ['ODS 8', 'ODS 11'] },
  { id: 'singapura', nome: 'Singapura', tipo: 'cidade', perspectiva: 'espaco', camada: ['cidades', 'turismo'], x: 74, y: 63, latitude: 1.3521, longitude: 103.8198, ods: ['ODS 11'] },
  { id: 'lisboa', nome: 'Lisboa', tipo: 'cidade', perspectiva: 'espaco', camada: ['cidades', 'turismo'], x: 46, y: 44, latitude: 38.7223, longitude: -9.1393, ods: ['ODS 8', 'ODS 11'] },
  { id: 'patagonia', nome: 'Patagonia', tipo: 'bioma', perspectiva: 'espaco', camada: ['biomas', 'turismo', 'clima'], x: 36, y: 87, latitude: -45.0, longitude: -69.0, ods: ['ODS 13'] },
  { id: 'serengeti', nome: 'Serengeti', tipo: 'bioma', perspectiva: 'espaco', camada: ['biomas', 'turismo'], x: 61, y: 61, latitude: -2.3333, longitude: 34.8333, ods: ['ODS 8', 'ODS 13'] },
  { id: 'everglades', nome: 'Everglades', tipo: 'bioma', perspectiva: 'espaco', camada: ['biomas', 'clima'], x: 29, y: 50, latitude: 25.2866, longitude: -80.8987, ods: ['ODS 13'] },
  { id: 'porto_santos', nome: 'Porto de Santos', tipo: 'cidade', perspectiva: 'espaco', camada: ['cidades', 'social', 'ods'], x: 51, y: 67, latitude: -23.9608, longitude: -46.3336, ods: ['ODS 11'] },
  { id: 'kilimanjaro', nome: 'Kilimanjaro', tipo: 'ponto_turistico', perspectiva: 'espaco', camada: ['turismo', 'biomas', 'clima'], x: 63, y: 60, latitude: -3.0674, longitude: 37.3556, ods: ['ODS 8', 'ODS 13'] },
];

function criarPonto(entrada: EntradaPontoAr): PontoAr {
  const camadaPrincipal = entrada.camada[0] ?? 'social';

  return {
    ...entrada,
    titulo: entrada.perspectiva === 'terra' ? `${entrada.nome} no céu` : `${entrada.nome} visto da órbita`,
    descricao: entrada.perspectiva === 'terra'
      ? `Mark celeste da camada ${camadaPrincipal} distribuído no céu 360 da Orbitlink.`
      : `Mark terrestre da camada ${camadaPrincipal} para leitura em mapa e visão espacial.`,
    dadosResumo: [
      `Camada: ${entrada.camada.join(', ')}`,
      `Perspectiva: ${entrada.perspectiva === 'terra' ? 'AR Terra' : 'MAPA Espaço'}`,
      `Posts vinculados: 1`,
    ],
    ods: entrada.ods ?? ['ODS 9'],
    origemDados: 'simulado',
  };
}

export const pontosArData: PontoAr[] = [...pontosCeu, ...pontosTerra].map(criarPonto);
/* === PONTOS AR SIMULADOS | fim === */

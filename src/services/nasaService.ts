import type { EventoNaturalNasa, ImagemNasaApi, ItemGaleria, PontoAr } from '@/types/orbitlink.types';

/* === TIPOS INTERNOS NASA | inicio === */
interface RespostaEonetEvento {
  id: string;
  title: string;
  categories?: Array<{ id?: string; title?: string }>;
  sources?: Array<{ url?: string }>;
  geometry?: Array<{
    coordinates?: unknown;
  }>;
}

interface RespostaEonet {
  events?: RespostaEonetEvento[];
}

interface RespostaImagesItem {
  href?: string;
  data?: Array<{
    nasa_id?: string;
    title?: string;
    description?: string;
  }>;
  links?: Array<{
    href?: string;
    rel?: string;
    render?: string;
  }>;
}

interface RespostaImages {
  collection?: {
    items?: RespostaImagesItem[];
  };
}

interface RespostaEpicItem {
  identifier?: string;
  caption?: string;
  image?: string;
  date?: string;
}
/* === TIPOS INTERNOS NASA | fim === */

/* === SERVICO NASA | inicio === */
const NASA_API_KEY = import.meta.env.VITE_NASA_API_KEY || 'DEMO_KEY';

function normalizarCoordenadas(coordenadas: unknown): { latitude: number; longitude: number } | null {
  if (!Array.isArray(coordenadas) || coordenadas.length < 2) {
    return null;
  }

  const longitude = Number(coordenadas[0]);
  const latitude = Number(coordenadas[1]);

  if (Number.isNaN(latitude) || Number.isNaN(longitude)) {
    return null;
  }

  return { latitude, longitude };
}

export async function buscarEventosNaturaisNasa(): Promise<EventoNaturalNasa[]> {
  const resposta = await fetch('https://eonet.gsfc.nasa.gov/api/v3/events?status=open&limit=16');

  if (!resposta.ok) {
    throw new Error('Não foi possível baixar eventos naturais da NASA EONET.');
  }

  const dados = (await resposta.json()) as RespostaEonet;
  const eventos = dados.events ?? [];

  return eventos
    .map((evento) => {
      const coordenadas = normalizarCoordenadas(evento.geometry?.[0]?.coordinates);

      if (!coordenadas) {
        return null;
      }

      const eventoNatural: EventoNaturalNasa = {
        id: evento.id,
        titulo: evento.title,
        categoria: evento.categories?.[0]?.title ?? 'Evento natural',
        latitude: coordenadas.latitude,
        longitude: coordenadas.longitude,
      };

      if (evento.sources?.[0]?.url) {
        eventoNatural.linkFonte = evento.sources[0].url;
      }

      return eventoNatural;
    })
    .filter((evento): evento is EventoNaturalNasa => Boolean(evento));
}

export async function buscarImagensNasa(termo = 'earth from space'): Promise<ImagemNasaApi[]> {
  const url = new URL('https://images-api.nasa.gov/search');
  url.searchParams.set('q', termo);
  url.searchParams.set('media_type', 'image');
  url.searchParams.set('page_size', '18');

  const resposta = await fetch(url.toString());

  if (!resposta.ok) {
    throw new Error('Não foi possível baixar imagens da NASA.');
  }

  const dados = (await resposta.json()) as RespostaImages;
  const itens = dados.collection?.items ?? [];

  return itens
    .map((item, indice) => {
      const data = item.data?.[0];
      const imagem = item.links?.find((link) => link.rel === 'preview' || link.render === 'image')?.href;

      if (!imagem || !data?.title) {
        return null;
      }

      return {
        id: data.nasa_id ?? `nasa_img_${indice}`,
        titulo: data.title,
        descricao: data.description ?? 'Imagem importada da NASA Image and Video Library.',
        imagem,
        origem: 'NASA Image and Video Library',
      } satisfies ImagemNasaApi;
    })
    .filter((imagem): imagem is ImagemNasaApi => Boolean(imagem));
}

export async function buscarImagemEpicMaisRecente(): Promise<ImagemNasaApi | null> {
  const resposta = await fetch(`https://api.nasa.gov/EPIC/api/natural/images?api_key=${NASA_API_KEY}`);

  if (!resposta.ok) {
    throw new Error('Não foi possível baixar imagem EPIC da NASA.');
  }

  const dados = (await resposta.json()) as RespostaEpicItem[];
  const item = dados[0];

  if (!item?.image || !item.date) {
    return null;
  }

  const data = new Date(item.date);
  const ano = String(data.getUTCFullYear());
  const mes = String(data.getUTCMonth() + 1).padStart(2, '0');
  const dia = String(data.getUTCDate()).padStart(2, '0');
  const imagem = `https://api.nasa.gov/EPIC/archive/natural/${ano}/${mes}/${dia}/png/${item.image}.png?api_key=${NASA_API_KEY}`;

  return {
    id: item.identifier ?? item.image,
    titulo: 'Terra vista pela NASA EPIC',
    descricao: item.caption ?? 'Imagem diária da Terra capturada pela câmera EPIC/DSCOVR.',
    imagem,
    origem: 'NASA EPIC',
  };
}

export function converterEventosNasaParaPontos(eventos: EventoNaturalNasa[]): PontoAr[] {
  return eventos.slice(0, 10).map((evento, indice) => ({
    id: `nasa_eonet_${evento.id}`,
    nome: evento.categoria,
    tipo: 'alerta_ambiental',
    perspectiva: 'espaco',
    camada: ['clima', 'ods'],
    titulo: evento.titulo,
    descricao: 'Evento natural importado da NASA EONET e convertido em mark na camada da Orbitlink.',
    x: 15 + ((indice * 17) % 70),
    y: 18 + ((indice * 13) % 64),
    latitude: evento.latitude,
    longitude: evento.longitude,
    dadosResumo: [`Categoria: ${evento.categoria}`, 'Origem: NASA EONET', 'Camada: clima/ODS'],
    ods: ['ODS 13'],
    origemDados: 'nasa_eonet',
    nivelAlerta: 'medio',
  }));
}

export function converterImagensNasaParaGaleria(imagens: ImagemNasaApi[]): ItemGaleria[] {
  return imagens.slice(0, 12).map((imagem) => ({
    id: `galeria_${imagem.id}`,
    titulo: imagem.titulo,
    descricao: imagem.descricao,
    imagem: imagem.imagem,
    categoria: 'espaco',
    origemDados: 'nasa_images',
  }));
}
/* === SERVICO NASA | fim === */

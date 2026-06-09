/* === TIPOS GLOBAIS DO ORBITLINK | inicio === */
export type TipoPerspectiva = 'terra' | 'espaco';
export type TipoTema = 'dark' | 'light';

export type TipoCategoriaPost =
  | 'diario_orbital'
  | 'missao'
  | 'estacao'
  | 'lua'
  | 'satelite'
  | 'evento'
  | 'cidade'
  | 'turismo'
  | 'comunidade'
  | 'clima'
  | 'bioma'
  | 'ods';

export type TipoOds = 'ODS 2' | 'ODS 8' | 'ODS 9' | 'ODS 11' | 'ODS 13';

export type TipoPerfil =
  | 'astronauta'
  | 'cientista'
  | 'turista_espacial'
  | 'comunidade_terra'
  | 'observador_terra'
  | 'estacao_espacial'
  | 'missao'
  | 'instituicao'
  | 'empresa_espacial';

export type TipoPontoAr =
  | 'planeta'
  | 'lua'
  | 'estacao_espacial'
  | 'satelite'
  | 'colonia_lunar'
  | 'evento_astronomico'
  | 'pais'
  | 'cidade'
  | 'ponto_turistico'
  | 'bioma'
  | 'oceano'
  | 'alerta_ambiental'
  | 'comunidade';

export type TipoCamadaAr =
  | 'social'
  | 'planetas'
  | 'lua'
  | 'estacoes'
  | 'satelites'
  | 'missoes'
  | 'eventos'
  | 'cidades'
  | 'turismo'
  | 'clima'
  | 'biomas'
  | 'ods';

export type TipoOrigemDados = 'simulado' | 'localStorage' | 'cloudflare_d1' | 'nasa_eonet' | 'nasa_epic' | 'nasa_images';

export interface UsuarioOrbitLink {
  id: string;
  email?: string;
  senha?: string;
  nome: string;
  usuario: string;
  tipo: TipoPerfil;
  avatarGradiente: string;
  fotoPerfil?: string;
  cargo: string;
  localizacaoAtual: string;
  missaoAtual?: string;
  seguidores: number;
  publicacoes: number;
  conquistas: string[];
  criadoLocalmente?: boolean;
}

export interface ComentarioPost {
  id: string;
  autor: string;
  texto: string;
  criadoEm: string;
}

export interface MensagemChatOrbitLink {
  id: string;
  autorId: string;
  texto: string;
  criadoEm: string;
}

export interface ChatOrbitLink {
  id: string;
  nome?: string;
  grupo: boolean;
  participanteIds: string[];
  mensagens: MensagemChatOrbitLink[];
  criadoPorId: string;
  criadoEm: string;
  atualizadoEm: string;
}

export interface PostOrbitLink {
  id: string;
  autorId: string;
  perspectiva: TipoPerspectiva;
  titulo: string;
  texto: string;
  imagem?: string;
  imagemCredito?: string;
  imagemFonte?: string;
  imagemOrigemUrl?: string;
  imagemBusca?: string;
  categoria: TipoCategoriaPost;
  pontoArId?: string;
  ods: TipoOds[];
  curtidas: number;
  comentarios: ComentarioPost[];
  compartilhamentos: number;
  criadoEm: string;
  origemDados: TipoOrigemDados;
  criadoPeloUsuario?: boolean;
}

export interface StatusOrbital {
  id: string;
  autorId: string;
  perspectiva: TipoPerspectiva;
  titulo: string;
  texto: string;
  tipo: 'texto' | 'imagem' | 'camera_orbital' | 'registro_ar' | 'alerta' | 'missao';
  imagem?: string;
  videoUrl?: string;
  pontoArId?: string;
  criadoEm: string;
  expiraEm: string;
  origemDados: TipoOrigemDados;
  criadoPeloUsuario?: boolean;
}

export interface PontoAr {
  id: string;
  nome: string;
  tipo: TipoPontoAr;
  perspectiva: TipoPerspectiva;
  camada: TipoCamadaAr[];
  titulo: string;
  descricao: string;
  x: number;
  y: number;
  latitude?: number;
  longitude?: number;
  imagem?: string;
  imagemCredito?: string;
  imagemFonte?: string;
  imagemOrigemUrl?: string;
  imagemBusca?: string;
  autorId?: string;
  postId?: string;
  dadosResumo: string[];
  ods: TipoOds[];
  origemDados: TipoOrigemDados;
  statusAtivo?: boolean;
  nivelAlerta?: 'baixo' | 'medio' | 'alto';
}

export interface MissaoOrbitLink {
  id: string;
  nome: string;
  status: 'planejada' | 'em_andamento' | 'concluida';
  local: 'orbita' | 'lua' | 'marte' | 'terra';
  objetivo: string;
  descricao: string;
  participantes: string[];
  ods: TipoOds[];
  pontoArId?: string;
  linhaTempo: Array<{
    id: string;
    data: string;
    titulo: string;
    descricao: string;
  }>;
}

export interface ItemGaleria {
  id: string;
  titulo: string;
  descricao: string;
  imagem: string;
  categoria: 'terra' | 'espaco' | 'lua' | 'marte' | 'cidade' | 'turismo' | 'clima' | 'usuario';
  autorId?: string;
  postId?: string;
  pontoArId?: string;
  origemDados: TipoOrigemDados;
}

export interface EventoNaturalNasa {
  id: string;
  titulo: string;
  categoria: string;
  latitude: number;
  longitude: number;
  linkFonte?: string;
}

export interface ImagemNasaApi {
  id: string;
  titulo: string;
  descricao: string;
  imagem: string;
  origem: string;
}
/* === TIPOS GLOBAIS DO ORBITLINK | fim === */

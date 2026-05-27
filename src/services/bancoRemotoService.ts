import type { ImagemNasaApi, ItemGaleria, ComentarioPost, PontoAr, PostOrbitLink, StatusOrbital, TipoTema, UsuarioOrbitLink } from '@/types/orbitlink.types';
import type { galeriaData } from '@/data/galeria.data';
import type { missoesData } from '@/data/missoes.data';
import type { odsData } from '@/data/ods.data';

/* === BANCO REMOTO | inicio === */
export interface EstadoRemotoOrbitLink {
  tema?: TipoTema;
  postsUsuario?: PostOrbitLink[];
  statusUsuario?: StatusOrbital[];
  postsCurtidos?: string[];
  postsSalvos?: string[];
  pontosSeguidos?: string[];
  usuariosLocais?: UsuarioOrbitLink[];
  usuarioAtualId?: string;
  comentariosLocais?: Record<string, ComentarioPost[]>;
  compartilhamentosExtras?: Record<string, number>;
  pontosApi?: PontoAr[];
  galeriaApi?: ItemGaleria[];
  imagemEpic?: ImagemNasaApi;
  ultimaSincronizacaoApi?: string;
  usuariosBase?: UsuarioOrbitLink[];
  postsBase?: PostOrbitLink[];
  statusBase?: StatusOrbital[];
  pontosArBase?: PontoAr[];
  galeriaBase?: typeof galeriaData;
  missoesBase?: typeof missoesData;
  odsBase?: typeof odsData;
}

interface RespostaBancoRemoto {
  sucesso: boolean;
  dados?: EstadoRemotoOrbitLink;
  mensagem?: string;
}

export async function carregarBancoRemoto(): Promise<EstadoRemotoOrbitLink> {
  const resposta = await fetch('/api/orbitlink', {
    headers: { accept: 'application/json' },
  });

  if (!resposta.ok) {
    throw new Error('Banco remoto indisponivel.');
  }

  const corpo = await resposta.json() as RespostaBancoRemoto;

  if (!corpo.sucesso) {
    throw new Error(corpo.mensagem ?? 'Banco remoto recusou a leitura.');
  }

  return corpo.dados ?? {};
}

export async function salvarBancoRemoto(dados: EstadoRemotoOrbitLink): Promise<void> {
  const resposta = await fetch('/api/orbitlink', {
    method: 'PUT',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
    body: JSON.stringify(dados),
  });

  if (!resposta.ok) {
    throw new Error('Banco remoto indisponivel.');
  }

  const corpo = await resposta.json() as RespostaBancoRemoto;

  if (!corpo.sucesso) {
    throw new Error(corpo.mensagem ?? 'Banco remoto recusou a gravacao.');
  }
}
/* === BANCO REMOTO | fim === */

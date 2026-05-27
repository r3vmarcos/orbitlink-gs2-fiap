import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { galeriaData } from '@/data/galeria.data';
import { missoesData } from '@/data/missoes.data';
import { odsData } from '@/data/ods.data';
import { pontosArData } from '@/data/pontos-ar.data';
import { postsData } from '@/data/posts.data';
import { statusData } from '@/data/status.data';
import { usuariosData } from '@/data/usuarios.data';
import { carregarBancoRemoto, salvarBancoRemoto, type EstadoRemotoOrbitLink } from '@/services/bancoRemotoService';
import { lerLocalStorage, salvarLocalStorage } from '@/services/localStorageService';
import {
  buscarEventosNaturaisNasa,
  buscarImagemEpicMaisRecente,
  buscarImagensNasa,
  converterEventosNasaParaPontos,
  converterImagensNasaParaGaleria,
} from '@/services/nasaService';
import type {
  ImagemNasaApi,
  ItemGaleria,
  ComentarioPost,
  PontoAr,
  PostOrbitLink,
  StatusOrbital,
  TipoCategoriaPost,
  TipoPerspectiva,
  TipoTema,
  UsuarioOrbitLink,
} from '@/types/orbitlink.types';
import { gerarId } from '@/utils/formatadores';

/* === TIPOS DO CONTEXTO | inicio === */
interface NovoPostEntrada {
  titulo: string;
  texto: string;
  imagem?: string;
  perspectiva: TipoPerspectiva;
  categoria: TipoCategoriaPost;
  pontoArId?: string;
  ods: Array<'ODS 2' | 'ODS 8' | 'ODS 9' | 'ODS 11' | 'ODS 13'>;
}

interface NovoStatusEntrada {
  titulo: string;
  texto: string;
  imagem?: string;
  perspectiva: TipoPerspectiva;
  tipo: StatusOrbital['tipo'];
  pontoArId?: string;
}

interface OrbitLinkContextValue {
  tema: TipoTema;
  usuarios: UsuarioOrbitLink[];
  posts: PostOrbitLink[];
  statusOrbitais: StatusOrbital[];
  pontosAr: PontoAr[];
  missoes: typeof missoesData;
  galeria: ItemGaleria[];
  ods: typeof odsData;
  postsCurtidos: string[];
  postsSalvos: string[];
  pontosSeguidos: string[];
  carregandoApi: boolean;
  erroApi?: string;
  ultimaSincronizacaoApi?: string;
  imagemEpic?: ImagemNasaApi;
  usuarioAtual?: UsuarioOrbitLink;
  usuarioAutenticado: boolean;
  cadastrarUsuario: (entrada: CadastroUsuarioEntrada) => { sucesso: boolean; mensagem?: string };
  entrarUsuario: (email: string, senha: string) => { sucesso: boolean; mensagem?: string };
  sairUsuario: () => void;
  alternarTema: () => void;
  criarPost: (entrada: NovoPostEntrada) => void;
  criarStatus: (entrada: NovoStatusEntrada) => void;
  curtirPost: (postId: string) => void;
  salvarPost: (postId: string) => void;
  comentarPost: (postId: string, texto: string) => void;
  compartilharPost: (postId: string) => void;
  excluirPost: (postId: string) => void;
  seguirPonto: (pontoId: string) => void;
  sincronizarApisNasa: () => Promise<void>;
}

interface CadastroUsuarioEntrada {
  nome: string;
  usuario: string;
  email: string;
  senha: string;
  localizacaoAtual: string;
}
/* === TIPOS DO CONTEXTO | fim === */

const OrbitLinkContext = createContext<OrbitLinkContextValue | null>(null);

/* === PROVIDER ORBITLINK | inicio === */
export function OrbitLinkProvider({ children }: { children: ReactNode }) {
  const [tema, setTema] = useState<TipoTema>(() => lerLocalStorage<TipoTema>('orbitlink_tema', 'dark'));
  const [postsUsuario, setPostsUsuario] = useState<PostOrbitLink[]>(() =>
    lerLocalStorage<PostOrbitLink[]>('orbitlink_posts_usuario', []),
  );
  const [statusUsuario, setStatusUsuario] = useState<StatusOrbital[]>(() =>
    lerLocalStorage<StatusOrbital[]>('orbitlink_status_usuario', []),
  );
  const [postsCurtidos, setPostsCurtidos] = useState<string[]>(() =>
    lerLocalStorage<string[]>('orbitlink_posts_curtidos', []),
  );
  const [postsSalvos, setPostsSalvos] = useState<string[]>(() =>
    lerLocalStorage<string[]>('orbitlink_posts_salvos', []),
  );
  const [pontosSeguidos, setPontosSeguidos] = useState<string[]>(() =>
    lerLocalStorage<string[]>('orbitlink_pontos_seguidos', []),
  );
  const [usuariosLocais, setUsuariosLocais] = useState<UsuarioOrbitLink[]>(() =>
    lerLocalStorage<UsuarioOrbitLink[]>('orbitlink_usuarios_locais', []),
  );
  const [usuarioAtualId, setUsuarioAtualId] = useState<string | undefined>(() =>
    lerLocalStorage<string | undefined>('orbitlink_usuario_atual_id', undefined),
  );
  const [comentariosLocais, setComentariosLocais] = useState<Record<string, ComentarioPost[]>>(() =>
    lerLocalStorage<Record<string, ComentarioPost[]>>('orbitlink_comentarios_posts', {}),
  );
  const [compartilhamentosExtras, setCompartilhamentosExtras] = useState<Record<string, number>>(() =>
    lerLocalStorage<Record<string, number>>('orbitlink_compartilhamentos_posts', {}),
  );
  const [pontosApi, setPontosApi] = useState<PontoAr[]>(() =>
    lerLocalStorage<PontoAr[]>('orbitlink_pontos_api_nasa', []),
  );
  const [galeriaApi, setGaleriaApi] = useState<ItemGaleria[]>(() =>
    lerLocalStorage<ItemGaleria[]>('orbitlink_galeria_api_nasa', []),
  );
  const [imagemEpic, setImagemEpic] = useState<ImagemNasaApi | undefined>(() =>
    lerLocalStorage<ImagemNasaApi | undefined>('orbitlink_imagem_epic', undefined),
  );
  const [carregandoApi, setCarregandoApi] = useState(false);
  const [erroApi, setErroApi] = useState<string | undefined>();
  const [ultimaSincronizacaoApi, setUltimaSincronizacaoApi] = useState<string | undefined>(() =>
    lerLocalStorage<string | undefined>('orbitlink_ultima_sinc_api', undefined),
  );
  const [usuariosBase, setUsuariosBase] = useState<UsuarioOrbitLink[]>(usuariosData);
  const [postsBase, setPostsBase] = useState<PostOrbitLink[]>(postsData);
  const [statusBase, setStatusBase] = useState<StatusOrbital[]>(statusData);
  const [pontosArBase, setPontosArBase] = useState<PontoAr[]>(pontosArData);
  const [galeriaBase, setGaleriaBase] = useState<ItemGaleria[]>(galeriaData);
  const [missoesBase, setMissoesBase] = useState(missoesData);
  const [odsBase, setOdsBase] = useState(odsData);
  const [bancoRemotoPronto, setBancoRemotoPronto] = useState(false);
  const salvamentoRemotoRef = useRef<number | undefined>(undefined);

  useEffect(() => salvarLocalStorage('orbitlink_tema', tema), [tema]);
  useEffect(() => salvarLocalStorage('orbitlink_posts_usuario', postsUsuario), [postsUsuario]);
  useEffect(() => salvarLocalStorage('orbitlink_status_usuario', statusUsuario), [statusUsuario]);
  useEffect(() => salvarLocalStorage('orbitlink_posts_curtidos', postsCurtidos), [postsCurtidos]);
  useEffect(() => salvarLocalStorage('orbitlink_posts_salvos', postsSalvos), [postsSalvos]);
  useEffect(() => salvarLocalStorage('orbitlink_pontos_seguidos', pontosSeguidos), [pontosSeguidos]);
  useEffect(() => salvarLocalStorage('orbitlink_usuarios_locais', usuariosLocais), [usuariosLocais]);
  useEffect(() => salvarLocalStorage('orbitlink_usuario_atual_id', usuarioAtualId), [usuarioAtualId]);
  useEffect(() => salvarLocalStorage('orbitlink_comentarios_posts', comentariosLocais), [comentariosLocais]);
  useEffect(() => salvarLocalStorage('orbitlink_compartilhamentos_posts', compartilhamentosExtras), [compartilhamentosExtras]);
  useEffect(() => salvarLocalStorage('orbitlink_pontos_api_nasa', pontosApi), [pontosApi]);
  useEffect(() => salvarLocalStorage('orbitlink_galeria_api_nasa', galeriaApi), [galeriaApi]);
  useEffect(() => salvarLocalStorage('orbitlink_imagem_epic', imagemEpic), [imagemEpic]);
  useEffect(() => salvarLocalStorage('orbitlink_ultima_sinc_api', ultimaSincronizacaoApi), [ultimaSincronizacaoApi]);

  useEffect(() => {
    let cancelado = false;

    async function carregarRemoto() {
      try {
        const remoto = await carregarBancoRemoto();

        if (cancelado) {
          return;
        }

        aplicarEstadoRemoto(remoto);
      } catch {
        if (!cancelado) {
          setErroApi('Banco remoto indisponivel. Usando fallback local neste navegador.');
        }
      } finally {
        if (!cancelado) {
          setBancoRemotoPronto(true);
        }
      }
    }

    void carregarRemoto();

    return () => {
      cancelado = true;
    };
  }, []);

  useEffect(() => {
    if (!bancoRemotoPronto) {
      return undefined;
    }

    window.clearTimeout(salvamentoRemotoRef.current);
    salvamentoRemotoRef.current = window.setTimeout(() => {
      const estado: EstadoRemotoOrbitLink = {
        tema,
        postsUsuario,
        statusUsuario,
        postsCurtidos,
        postsSalvos,
        pontosSeguidos,
        usuariosLocais,
        usuarioAtualId,
        comentariosLocais,
        compartilhamentosExtras,
        pontosApi,
        galeriaApi,
        imagemEpic,
        ultimaSincronizacaoApi,
        usuariosBase,
        postsBase,
        statusBase,
        pontosArBase,
        galeriaBase,
        missoesBase,
        odsBase,
      };

      void salvarBancoRemoto(estado).catch(() => {
        setErroApi('Falha ao salvar no banco remoto. O fallback local foi mantido.');
      });
    }, 450);

    return () => window.clearTimeout(salvamentoRemotoRef.current);
  }, [
    bancoRemotoPronto,
    tema,
    postsUsuario,
    statusUsuario,
    postsCurtidos,
    postsSalvos,
    pontosSeguidos,
    usuariosLocais,
    usuarioAtualId,
    comentariosLocais,
    compartilhamentosExtras,
    pontosApi,
    galeriaApi,
    imagemEpic,
    ultimaSincronizacaoApi,
    usuariosBase,
    postsBase,
    statusBase,
    pontosArBase,
    galeriaBase,
    missoesBase,
    odsBase,
  ]);

  function aplicarEstadoRemoto(remoto: EstadoRemotoOrbitLink) {
    if (remoto.tema) setTema(remoto.tema);
    if (remoto.postsUsuario) setPostsUsuario(remoto.postsUsuario);
    if (remoto.statusUsuario) setStatusUsuario(remoto.statusUsuario);
    if (remoto.postsCurtidos) setPostsCurtidos(remoto.postsCurtidos);
    if (remoto.postsSalvos) setPostsSalvos(remoto.postsSalvos);
    if (remoto.pontosSeguidos) setPontosSeguidos(remoto.pontosSeguidos);
    if (remoto.usuariosLocais) setUsuariosLocais(remoto.usuariosLocais);
    if ('usuarioAtualId' in remoto) setUsuarioAtualId(remoto.usuarioAtualId);
    if (remoto.comentariosLocais) setComentariosLocais(remoto.comentariosLocais);
    if (remoto.compartilhamentosExtras) setCompartilhamentosExtras(remoto.compartilhamentosExtras);
    if (remoto.pontosApi) setPontosApi(remoto.pontosApi);
    if (remoto.galeriaApi) setGaleriaApi(remoto.galeriaApi);
    if ('imagemEpic' in remoto) setImagemEpic(remoto.imagemEpic);
    if ('ultimaSincronizacaoApi' in remoto) setUltimaSincronizacaoApi(remoto.ultimaSincronizacaoApi);
    if (remoto.usuariosBase) setUsuariosBase(remoto.usuariosBase);
    // Mantem as sementes locais versionadas para que ajustes de feed/galeria entrem no deploy.
    if (remoto.statusBase) setStatusBase(remoto.statusBase);
    if (remoto.pontosArBase) setPontosArBase(remoto.pontosArBase);
    if (remoto.missoesBase) setMissoesBase(remoto.missoesBase);
    if (remoto.odsBase) setOdsBase(remoto.odsBase);
  }

  const statusValidos = useMemo(() => {
    const todos = [...statusBase, ...statusUsuario];
    return todos.filter((status) => new Date(status.expiraEm).getTime() > Date.now());
  }, [statusBase, statusUsuario]);

  const usuarios = useMemo(() => [...usuariosLocais, ...usuariosBase], [usuariosBase, usuariosLocais]);
  const usuarioAtual = useMemo(() => usuarios.find((usuario) => usuario.id === usuarioAtualId), [usuarioAtualId, usuarios]);
  const pontosAr = useMemo(() => [...pontosApi, ...pontosArBase], [pontosApi, pontosArBase]);
  const posts = useMemo(() => {
    const postsExistentes = [...postsUsuario, ...postsBase];
    const idsComPost = new Set(postsExistentes.map((post) => post.pontoArId).filter(Boolean));
    const postsGerados: PostOrbitLink[] = pontosAr
      .filter((ponto) => !idsComPost.has(ponto.id))
      .map((ponto) => ({
        id: `post_mark_${ponto.id}`,
        autorId: ponto.perspectiva === 'terra' ? 'lia_novaes' : 'helena_duarte',
        perspectiva: ponto.perspectiva,
        titulo: ponto.titulo,
        texto: ponto.descricao,
        categoria: ponto.camada.includes('satelites') ? 'satelite' : ponto.camada.includes('turismo') ? 'turismo' : ponto.camada.includes('clima') ? 'clima' : 'evento',
        pontoArId: ponto.id,
        ods: ponto.ods,
        curtidas: 42,
        comentarios: [],
        compartilhamentos: 0,
        criadoEm: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
        origemDados: 'simulado',
      }));

    return [...postsExistentes, ...postsGerados].map((post) => ({
      ...post,
      comentarios: [...post.comentarios, ...(comentariosLocais[post.id] ?? [])],
      compartilhamentos: post.compartilhamentos + (compartilhamentosExtras[post.id] ?? 0),
    }));
  }, [comentariosLocais, compartilhamentosExtras, pontosAr, postsBase, postsUsuario]);
  const galeriaUsuario = useMemo<ItemGaleria[]>(() => {
    return postsUsuario
      .filter((post) => Boolean(post.imagem))
      .map((post) => ({
        id: `gal_${post.id}`,
        titulo: post.titulo,
        descricao: post.texto,
        imagem: post.imagem as string,
        categoria: 'usuario',
        autorId: post.autorId,
        postId: post.id,
        pontoArId: post.pontoArId,
        origemDados: 'cloudflare_d1',
      }));
  }, [postsUsuario]);

  const galeria = useMemo(() => [...galeriaUsuario, ...galeriaApi, ...galeriaBase], [galeriaApi, galeriaBase, galeriaUsuario]);

  const alternarTema = useCallback(() => {
    setTema((temaAtual) => (temaAtual === 'dark' ? 'light' : 'dark'));
  }, []);

  const cadastrarUsuario = useCallback((entrada: CadastroUsuarioEntrada) => {
    const email = entrada.email.trim().toLowerCase();
    const usuarioNormalizado = entrada.usuario.trim().replace(/^@/, '').toLowerCase();

    if (!entrada.nome.trim() || !usuarioNormalizado || !email || entrada.senha.length < 6) {
      return { sucesso: false, mensagem: 'Preencha nome, usuário, e-mail e senha com pelo menos 6 caracteres.' };
    }

    const usuarioJaExiste = [...usuariosLocais, ...usuariosBase].some(
      (usuario) => usuario.email?.toLowerCase() === email || usuario.usuario.toLowerCase() === `@${usuarioNormalizado}`,
    );

    if (usuarioJaExiste) {
      return { sucesso: false, mensagem: 'Já existe uma conta com este e-mail ou usuário.' };
    }

    const novoUsuario: UsuarioOrbitLink = {
      id: gerarId('usuario_remoto'),
      nome: entrada.nome.trim(),
      usuario: `@${usuarioNormalizado}`,
      email,
      senha: entrada.senha,
      tipo: 'observador_terra',
      avatarGradiente: 'from-cyan-300 to-orange-500',
      cargo: 'Explorador Orbitlink',
      localizacaoAtual: entrada.localizacaoAtual.trim() || 'Base remota Orbitlink',
      seguidores: 0,
      publicacoes: 0,
      conquistas: ['Conta criada no banco remoto', 'Primeiro acesso Orbitlink'],
      criadoLocalmente: true,
    };

    setUsuariosLocais((atuais) => [novoUsuario, ...atuais]);
    setUsuarioAtualId(novoUsuario.id);
    return { sucesso: true };
  }, [usuariosBase, usuariosLocais]);

  const entrarUsuario = useCallback((email: string, senha: string) => {
    const usuarioEncontrado = [...usuariosLocais, ...usuariosBase].find(
      (usuario) => usuario.email?.toLowerCase() === email.trim().toLowerCase() && usuario.senha === senha,
    );

    if (!usuarioEncontrado) {
      return { sucesso: false, mensagem: 'E-mail ou senha invalidos para este banco remoto.' };
    }

    setUsuarioAtualId(usuarioEncontrado.id);
    return { sucesso: true };
  }, [usuariosBase, usuariosLocais]);

  const sairUsuario = useCallback(() => {
    setUsuarioAtualId(undefined);
  }, []);

  const criarPost = useCallback((entrada: NovoPostEntrada) => {
    const novoPost: PostOrbitLink = {
      id: gerarId('post_usuario'),
      autorId: usuarioAtual?.id ?? 'lia_novaes',
      perspectiva: entrada.perspectiva,
      titulo: entrada.titulo,
      texto: entrada.texto,
      imagem: entrada.imagem,
      categoria: entrada.categoria,
      pontoArId: entrada.pontoArId,
      ods: entrada.ods,
      curtidas: 0,
      comentarios: [],
      compartilhamentos: 0,
      criadoEm: new Date().toISOString(),
      origemDados: 'cloudflare_d1',
      criadoPeloUsuario: true,
    };

    setPostsUsuario((postsAtuais) => [novoPost, ...postsAtuais]);
  }, [usuarioAtual?.id]);

  const criarStatus = useCallback((entrada: NovoStatusEntrada) => {
    const criadoEm = new Date();
    const expiraEm = new Date(criadoEm.getTime() + 24 * 60 * 60 * 1000);
    const novoStatus: StatusOrbital = {
      id: gerarId('status_usuario'),
      autorId: usuarioAtual?.id ?? 'lia_novaes',
      perspectiva: entrada.perspectiva,
      titulo: entrada.titulo,
      texto: entrada.texto,
      tipo: entrada.tipo,
      imagem: entrada.imagem,
      pontoArId: entrada.pontoArId,
      criadoEm: criadoEm.toISOString(),
      expiraEm: expiraEm.toISOString(),
      origemDados: 'cloudflare_d1',
      criadoPeloUsuario: true,
    };

    setStatusUsuario((statusAtuais) => [novoStatus, ...statusAtuais]);
  }, [usuarioAtual?.id]);

  const curtirPost = useCallback((postId: string) => {
    setPostsCurtidos((ids) => (ids.includes(postId) ? ids.filter((id) => id !== postId) : [...ids, postId]));
  }, []);

  const salvarPost = useCallback((postId: string) => {
    setPostsSalvos((ids) => (ids.includes(postId) ? ids.filter((id) => id !== postId) : [...ids, postId]));
  }, []);

  const comentarPost = useCallback((postId: string, texto: string) => {
    const textoLimpo = texto.trim();

    if (!textoLimpo) {
      return;
    }

    const comentario: ComentarioPost = {
      id: gerarId('comentario'),
      autor: usuarioAtual?.nome ?? 'Visitante Orbitlink',
      texto: textoLimpo,
      criadoEm: new Date().toISOString(),
    };

    setComentariosLocais((atuais) => ({
      ...atuais,
      [postId]: [...(atuais[postId] ?? []), comentario],
    }));
  }, [usuarioAtual?.nome]);

  const compartilharPost = useCallback((postId: string) => {
    setCompartilhamentosExtras((atuais) => ({
      ...atuais,
      [postId]: (atuais[postId] ?? 0) + 1,
    }));
  }, []);

  const excluirPost = useCallback((postId: string) => {
    setPostsUsuario((postsAtuais) => postsAtuais.filter((post) => post.id !== postId));
  }, []);

  const seguirPonto = useCallback((pontoId: string) => {
    setPontosSeguidos((ids) => (ids.includes(pontoId) ? ids.filter((id) => id !== pontoId) : [...ids, pontoId]));
  }, []);

  const sincronizarApisNasa = useCallback(async () => {
    setCarregandoApi(true);
    setErroApi(undefined);

    try {
      const [eventos, imagens, epic] = await Promise.allSettled([
        buscarEventosNaturaisNasa(),
        buscarImagensNasa('earth from space satellite orbit'),
        buscarImagemEpicMaisRecente(),
      ]);

      if (eventos.status === 'fulfilled') {
        setPontosApi(converterEventosNasaParaPontos(eventos.value));
      }

      if (imagens.status === 'fulfilled') {
        setGaleriaApi(converterImagensNasaParaGaleria(imagens.value));
      }

      if (epic.status === 'fulfilled' && epic.value) {
        setImagemEpic(epic.value);
      }

      if (eventos.status === 'rejected' && imagens.status === 'rejected' && epic.status === 'rejected') {
        throw new Error('Todas as APIs NASA falharam. O app manteve os dados simulados.');
      }

      setUltimaSincronizacaoApi(new Date().toISOString());
    } catch (erro) {
      setErroApi(erro instanceof Error ? erro.message : 'Erro desconhecido ao sincronizar APIs NASA.');
    } finally {
      setCarregandoApi(false);
    }
  }, []);

  const valor = useMemo<OrbitLinkContextValue>(() => ({
    tema,
    usuarios,
    posts,
    statusOrbitais: statusValidos,
    pontosAr,
    missoes: missoesBase,
    galeria,
    ods: odsBase,
    postsCurtidos,
    postsSalvos,
    pontosSeguidos,
    carregandoApi,
    erroApi,
    ultimaSincronizacaoApi,
    imagemEpic,
    usuarioAtual,
    usuarioAutenticado: Boolean(usuarioAtual),
    cadastrarUsuario,
    entrarUsuario,
    sairUsuario,
    alternarTema,
    criarPost,
    criarStatus,
    curtirPost,
    salvarPost,
    comentarPost,
    compartilharPost,
    excluirPost,
    seguirPonto,
    sincronizarApisNasa,
  }), [
    tema,
    usuarios,
    posts,
    statusValidos,
    pontosAr,
    missoesBase,
    galeria,
    odsBase,
    postsCurtidos,
    postsSalvos,
    pontosSeguidos,
    carregandoApi,
    erroApi,
    ultimaSincronizacaoApi,
    imagemEpic,
    usuarioAtual,
    cadastrarUsuario,
    entrarUsuario,
    sairUsuario,
    alternarTema,
    criarPost,
    criarStatus,
    curtirPost,
    salvarPost,
    comentarPost,
    compartilharPost,
    excluirPost,
    seguirPonto,
    sincronizarApisNasa,
  ]);

  return <OrbitLinkContext.Provider value={valor}>{children}</OrbitLinkContext.Provider>;
}
/* === PROVIDER ORBITLINK | fim === */

/* === HOOK DO CONTEXTO | inicio === */
export function useOrbitLink() {
  const contexto = useContext(OrbitLinkContext);

  if (!contexto) {
    throw new Error('useOrbitLink precisa estar dentro de OrbitLinkProvider.');
  }

  return contexto;
}
/* === HOOK DO CONTEXTO | fim === */

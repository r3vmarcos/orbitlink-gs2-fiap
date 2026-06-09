import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AcessoUsuario } from '@/components/auth/AcessoUsuario';
import { CriarPostModal } from '@/components/feed/CriarPostModal';
import { VisualizadorStatus } from '@/components/feed/VisualizadorStatus';
import { LayoutPrincipal } from '@/components/layout/LayoutPrincipal';
import { Modal } from '@/components/ui/Modal';
import { Botao } from '@/components/ui/Botao';
import { OrbitLinkProvider, useOrbitLink } from '@/context/OrbitLinkContext';
import { categoriasTema, temasPorCategoria } from '@/data/temas-page-test.data';
import { lerLocalStorage, salvarLocalStorage } from '@/services/localStorageService';
import { AppRoutes } from '@/routes/AppRoutes';
import type { CategoriaTemaId } from '@/types/tema';
import type { PostOrbitLink, StatusOrbital } from '@/types/orbitlink.types';
import { aplicarTokensTema, gerarTokensTema } from '@/utils/tema';

const CATEGORIA_DARK_PADRAO: CategoriaTemaId = 'dark-sci';
const CATEGORIA_LIGHT_PADRAO: CategoriaTemaId = 'light-editorial';
const PALETA_DARK_PADRAO = 'Radio Telescope';
const PALETA_LIGHT_PADRAO = 'Paper Review';
const INDICE_PALETA_DARK_PADRAO = temasPorCategoria[CATEGORIA_DARK_PADRAO].findIndex((paleta) => paleta.name === PALETA_DARK_PADRAO);
const INDICE_PALETA_LIGHT_PADRAO = temasPorCategoria[CATEGORIA_LIGHT_PADRAO].findIndex((paleta) => paleta.name === PALETA_LIGHT_PADRAO);
const ID_USUARIO_PADRAO = 'marcos_nunes';

function lerCategoriaTemaPadrao(chave: string, categoriaPadrao: CategoriaTemaId, categoriaClassica: CategoriaTemaId) {
  const categoriaSalva = lerLocalStorage<CategoriaTemaId>(chave, categoriaPadrao);
  return categoriaSalva === categoriaClassica ? categoriaPadrao : categoriaSalva;
}

function lerIndicePaletaPadrao(chaveCategoria: string, chavePaleta: string, categoriaPadrao: CategoriaTemaId, categoriaClassica: CategoriaTemaId, indicePadrao: number) {
  const categoriaSalva = lerLocalStorage<CategoriaTemaId>(chaveCategoria, categoriaPadrao);

  if (categoriaSalva === categoriaClassica) {
    return indicePadrao;
  }

  return lerLocalStorage<number>(chavePaleta, indicePadrao);
}

/* === APP INTERNO | inicio === */
function AppInterno() {
  const [modalPostAberto, setModalPostAberto] = useState(false);
  const [abaPublicacao, setAbaPublicacao] = useState<'post' | 'status'>('post');
  const [statusAberto, setStatusAberto] = useState<StatusOrbital | undefined>();
  const [postDetalhe, setPostDetalhe] = useState<PostOrbitLink | undefined>();
  const [categoriaDarkId, setCategoriaDarkId] = useState<CategoriaTemaId>(() => lerCategoriaTemaPadrao('orbitlink_categoria_dark', CATEGORIA_DARK_PADRAO, 'dark'));
  const [categoriaLightId, setCategoriaLightId] = useState<CategoriaTemaId>(() => lerCategoriaTemaPadrao('orbitlink_categoria_light', CATEGORIA_LIGHT_PADRAO, 'light'));
  const [indicePaletaDark, setIndicePaletaDark] = useState(() => lerIndicePaletaPadrao('orbitlink_categoria_dark', 'orbitlink_paleta_dark', CATEGORIA_DARK_PADRAO, 'dark', Math.max(INDICE_PALETA_DARK_PADRAO, 0)));
  const [indicePaletaLight, setIndicePaletaLight] = useState(() => lerIndicePaletaPadrao('orbitlink_categoria_light', 'orbitlink_paleta_light', CATEGORIA_LIGHT_PADRAO, 'light', Math.max(INDICE_PALETA_LIGHT_PADRAO, 0)));
  const navigate = useNavigate();
  const location = useLocation();
  const { usuarios, pontosAr, tema, usuarioAutenticado, alternarTema, entrarUsuarioPorId } = useOrbitLink();
  const rotaAdmin = location.pathname === '/adm-orbitlink';
  const categoriasDoModo = useMemo(() => categoriasTema.filter((categoria) => categoria.id.startsWith(tema)), [tema]);
  const categoriaAtiva = tema === 'dark'
    ? (categoriasDoModo.some((categoria) => categoria.id === categoriaDarkId) ? categoriaDarkId : CATEGORIA_DARK_PADRAO)
    : (categoriasDoModo.some((categoria) => categoria.id === categoriaLightId) ? categoriaLightId : CATEGORIA_LIGHT_PADRAO);
  const paletasAtivas = temasPorCategoria[categoriaAtiva];
  const indicePaletaAtivo = tema === 'dark' ? indicePaletaDark : indicePaletaLight;
  const temaAtivo = paletasAtivas[indicePaletaAtivo % paletasAtivas.length] ?? paletasAtivas[0];

  useEffect(() => salvarLocalStorage('orbitlink_categoria_dark', categoriaDarkId), [categoriaDarkId]);
  useEffect(() => salvarLocalStorage('orbitlink_categoria_light', categoriaLightId), [categoriaLightId]);
  useEffect(() => salvarLocalStorage('orbitlink_paleta_dark', indicePaletaDark), [indicePaletaDark]);
  useEffect(() => salvarLocalStorage('orbitlink_paleta_light', indicePaletaLight), [indicePaletaLight]);

  useEffect(() => {
    aplicarTokensTema(gerarTokensTema({
      nome: temaAtivo.name,
      categoria: categoriaAtiva,
      paleta: temaAtivo.name,
      bg: temaAtivo.bg,
      text: temaAtivo.text,
      sec: temaAtivo.sec,
      accent: temaAtivo.accent,
      border: temaAtivo.border,
    }, tema));
  }, [categoriaAtiva, tema, temaAtivo]);

  useEffect(() => {
    const chaveInicio = 'orbitlink_inicio_feed';
    if (usuarioAutenticado && !rotaAdmin && !sessionStorage.getItem(chaveInicio)) {
      sessionStorage.setItem(chaveInicio, '1');
      if (location.pathname !== '/') {
        navigate('/', { replace: true });
      }
    }
  }, [location.pathname, navigate, rotaAdmin, usuarioAutenticado]);

  useEffect(() => {
    if (rotaAdmin || usuarioAutenticado || location.pathname !== '/') {
      return;
    }

    if (sessionStorage.getItem('orbitlink_forcar_login') === '1') {
      return;
    }

    const perfilPadrao = usuarios.find((usuario) => usuario.id === ID_USUARIO_PADRAO);

    if (!perfilPadrao) {
      return;
    }

    entrarUsuarioPorId(perfilPadrao.id);
    navigate(`/perfis/${perfilPadrao.id}`, { replace: true });
  }, [entrarUsuarioPorId, location.pathname, navigate, rotaAdmin, usuarioAutenticado, usuarios]);

  if (!usuarioAutenticado && !rotaAdmin) {
    return <AcessoUsuario />;
  }

  function handleVerAr(pontoId?: string) {
    setStatusAberto(undefined);
    setPostDetalhe(undefined);
    navigate(`/dualview-ar${pontoId ? `?ponto=${pontoId}` : ''}`);
  }

  function abrirPublicacao(aba: 'post' | 'status') {
    setAbaPublicacao(aba);
    setModalPostAberto(true);
  }

  const autorPost = postDetalhe ? usuarios.find((usuario) => usuario.id === postDetalhe.autorId) : undefined;
  const pontoPost = postDetalhe ? pontosAr.find((ponto) => ponto.id === postDetalhe.pontoArId) : undefined;

  return (
    <LayoutPrincipal
      onAbrirPost={() => abrirPublicacao('post')}
      onAbrirStatus={() => abrirPublicacao('status')}
      onAlternarClaroEscuro={alternarTema}
    >
      <AppRoutes
        onAbrirPost={() => abrirPublicacao('post')}
        onAbrirStatus={() => abrirPublicacao('status')}
        onVisualizarStatus={setStatusAberto}
        onAbrirDetalhesPost={setPostDetalhe}
        onAlternarClaroEscuro={alternarTema}
        categoriasTema={categoriasTema}
        paletasTema={paletasAtivas}
        categoriaAtivaId={categoriaAtiva}
        paletaAtivaNome={temaAtivo.name}
        onSelecionarCategoria={(id) => {
          if (id.startsWith('dark')) setCategoriaDarkId(id);
          else setCategoriaLightId(id);
        }}
        onSelecionarPaleta={(indice) => tema === 'dark' ? setIndicePaletaDark(indice) : setIndicePaletaLight(indice)}
      />
      <CriarPostModal aberto={modalPostAberto} abaInicial={abaPublicacao} onFechar={() => setModalPostAberto(false)} />
      <VisualizadorStatus status={statusAberto} onFechar={() => setStatusAberto(undefined)} onVerAr={handleVerAr} />
      <Modal aberto={Boolean(postDetalhe)} titulo={postDetalhe?.titulo ?? 'Publicação'} onFechar={() => setPostDetalhe(undefined)} telaCheiaMobile>
        {postDetalhe ? (
          <div className="space-y-5">
            {postDetalhe.imagem ? <img src={postDetalhe.imagem} alt={postDetalhe.titulo} className="max-h-[58dvh] w-full rounded-[1.5rem] object-cover sm:max-h-[62dvh] sm:rounded-[2rem]" /> : null}
            <div>
              <p className="font-monoapp text-[10px] font-black uppercase tracking-[0.08em] text-blue-300 sm:text-xs sm:tracking-[0.16em]">
                {autorPost?.nome ?? 'Orbitlink'} · {pontoPost?.nome ?? 'Sem ponto AR'}
              </p>
              <h2 className="mt-2 text-2xl font-black uppercase leading-tight text-white light-theme:text-sky-950 sm:text-3xl">{postDetalhe.titulo}</h2>
              <p className="mt-4 text-sm leading-7 text-slate-300 light-theme:text-slate-700 sm:text-base sm:leading-8">{postDetalhe.texto}</p>
            </div>
            <div className="grid gap-3 sm:flex sm:flex-wrap">
              <Botao onClick={() => handleVerAr(postDetalhe.pontoArId)}>Ver no AR</Botao>
              <Botao variante="secundario" onClick={() => setPostDetalhe(undefined)}>Fechar</Botao>
            </div>
          </div>
        ) : null}
      </Modal>
    </LayoutPrincipal>
  );
}
/* === APP INTERNO | fim === */

/* === APP PRINCIPAL | inicio === */
export default function App() {
  return (
    <OrbitLinkProvider>
      <AppInterno />
    </OrbitLinkProvider>
  );
}
/* === APP PRINCIPAL | fim === */

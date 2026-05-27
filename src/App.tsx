import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AcessoUsuario } from '@/components/auth/AcessoUsuario';
import { CriarPostModal } from '@/components/feed/CriarPostModal';
import { VisualizadorStatus } from '@/components/feed/VisualizadorStatus';
import { LayoutPrincipal } from '@/components/layout/LayoutPrincipal';
import { Modal } from '@/components/ui/Modal';
import { Botao } from '@/components/ui/Botao';
import { OrbitLinkProvider, useOrbitLink } from '@/context/OrbitLinkContext';
import { categoriasTema, temasPorCategoria } from '@/data/temas-page-test.data';
import { AppRoutes } from '@/routes/AppRoutes';
import type { CategoriaTemaId } from '@/types/tema';
import type { PostOrbitLink, StatusOrbital } from '@/types/orbitlink.types';
import { aplicarTokensTema, gerarTokensTema } from '@/utils/tema';

/* === APP INTERNO | inicio === */
function AppInterno() {
  const [modalPostAberto, setModalPostAberto] = useState(false);
  const [abaPublicacao, setAbaPublicacao] = useState<'post' | 'status'>('post');
  const [statusAberto, setStatusAberto] = useState<StatusOrbital | undefined>();
  const [postDetalhe, setPostDetalhe] = useState<PostOrbitLink | undefined>();
  const [indiceTemaDark, setIndiceTemaDark] = useState(0);
  const [indiceTemaLight, setIndiceTemaLight] = useState(0);
  const [indicePaleta, setIndicePaleta] = useState(0);
  const navigate = useNavigate();
  const { usuarios, pontosAr, tema, usuarioAutenticado, alternarTema } = useOrbitLink();
  const categoriasDoModo = useMemo(() => categoriasTema.filter((categoria) => categoria.id.startsWith(tema)), [tema]);
  const categoriaAtiva = categoriasDoModo[tema === 'dark' ? indiceTemaDark % categoriasDoModo.length : indiceTemaLight % categoriasDoModo.length]?.id as CategoriaTemaId;
  const paletasAtivas = temasPorCategoria[categoriaAtiva];
  const temaAtivo = paletasAtivas[indicePaleta % paletasAtivas.length] ?? paletasAtivas[0];

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

  if (!usuarioAutenticado) {
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
      onAlternarTemaVisual={() => tema === 'dark' ? setIndiceTemaDark((valor) => valor + 1) : setIndiceTemaLight((valor) => valor + 1)}
      onAlternarPaleta={() => setIndicePaleta((valor) => valor + 1)}
      onAlternarClaroEscuro={alternarTema}
    >
      <AppRoutes
        onAbrirPost={() => abrirPublicacao('post')}
        onAbrirStatus={() => abrirPublicacao('status')}
        onVisualizarStatus={setStatusAberto}
        onAbrirDetalhesPost={setPostDetalhe}
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

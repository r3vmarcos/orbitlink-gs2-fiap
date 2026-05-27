import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AcessoUsuario } from '@/components/auth/AcessoUsuario';
import { CriarPostModal } from '@/components/feed/CriarPostModal';
import { CriarStatusModal } from '@/components/feed/CriarStatusModal';
import { VisualizadorStatus } from '@/components/feed/VisualizadorStatus';
import { LayoutPrincipal } from '@/components/layout/LayoutPrincipal';
import { Modal } from '@/components/ui/Modal';
import { Botao } from '@/components/ui/Botao';
import { OrbitLinkProvider, useOrbitLink } from '@/context/OrbitLinkContext';
import { temasOrbitLink } from '@/data/temas.data';
import { AppRoutes } from '@/routes/AppRoutes';
import type { PostOrbitLink, StatusOrbital } from '@/types/orbitlink.types';
import { aplicarTokensTema, gerarTokensTema } from '@/utils/tema';

/* === APP INTERNO | inicio === */
function AppInterno() {
  const [modalPostAberto, setModalPostAberto] = useState(false);
  const [modalStatusAberto, setModalStatusAberto] = useState(false);
  const [statusAberto, setStatusAberto] = useState<StatusOrbital | undefined>();
  const [postDetalhe, setPostDetalhe] = useState<PostOrbitLink | undefined>();
  const navigate = useNavigate();
  const { usuarios, pontosAr, tema, usuarioAutenticado } = useOrbitLink();
  const temaAtivo = useMemo(() => temasOrbitLink[tema], [tema]);

  useEffect(() => {
    aplicarTokensTema(gerarTokensTema(temaAtivo, tema));
  }, [tema, temaAtivo]);

  if (!usuarioAutenticado) {
    return <AcessoUsuario />;
  }

  function handleVerAr(pontoId?: string) {
    setStatusAberto(undefined);
    setPostDetalhe(undefined);
    navigate(`/dualview-ar${pontoId ? `?ponto=${pontoId}` : ''}`);
  }

  const autorPost = postDetalhe ? usuarios.find((usuario) => usuario.id === postDetalhe.autorId) : undefined;
  const pontoPost = postDetalhe ? pontosAr.find((ponto) => ponto.id === postDetalhe.pontoArId) : undefined;

  return (
    <LayoutPrincipal onAbrirPost={() => setModalPostAberto(true)} onAbrirStatus={() => setModalStatusAberto(true)}>
      <AppRoutes
        onAbrirPost={() => setModalPostAberto(true)}
        onAbrirStatus={() => setModalStatusAberto(true)}
        onVisualizarStatus={setStatusAberto}
        onAbrirDetalhesPost={setPostDetalhe}
      />
      <CriarPostModal aberto={modalPostAberto} onFechar={() => setModalPostAberto(false)} />
      <CriarStatusModal aberto={modalStatusAberto} onFechar={() => setModalStatusAberto(false)} />
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

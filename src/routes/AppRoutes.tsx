import { Route, Routes } from 'react-router-dom';
import { AdmOrbitlinkPage } from '@/pages/AdmOrbitlinkPage';
import { ChatsPage } from '@/pages/ChatsPage';
import { DadosNasaPage } from '@/pages/DadosNasaPage';
import { DualViewArPage } from '@/pages/DualViewArPage';
import { FeedPage } from '@/pages/FeedPage';
import { GaleriaPage } from '@/pages/GaleriaPage';
import { ImpactoPage } from '@/pages/ImpactoPage';
import { LojaPage } from '@/pages/LojaPage';
import { MarkPage } from '@/pages/MarkPage';
import { MissoesPage } from '@/pages/MissoesPage';
import { PerfisPage } from '@/pages/PerfisPage';
import { PersonalizacaoPerfilPage } from '@/pages/PersonalizacaoPerfilPage';
import { PessoasPage } from '@/pages/PessoasPage';
import type { CategoriaTemaId, TemaVisual } from '@/types/tema';
import type { PostOrbitLink, StatusOrbital } from '@/types/orbitlink.types';

/* === ROTAS DO APP | inicio === */
interface AppRoutesProps {
  onAbrirPost: () => void;
  onAbrirStatus: () => void;
  onVisualizarStatus: (status: StatusOrbital) => void;
  onAbrirDetalhesPost: (post: PostOrbitLink) => void;
  onAlternarClaroEscuro: () => void;
  categoriasTema: Array<{ id: CategoriaTemaId; nome: string }>;
  paletasTema: TemaVisual[];
  categoriaAtivaId: CategoriaTemaId;
  paletaAtivaNome: string;
  onSelecionarCategoria: (id: CategoriaTemaId) => void;
  onSelecionarPaleta: (indice: number) => void;
}

export function AppRoutes({
  onAbrirPost,
  onAbrirStatus,
  onVisualizarStatus,
  onAbrirDetalhesPost,
  onAlternarClaroEscuro,
  categoriasTema,
  paletasTema,
  categoriaAtivaId,
  paletaAtivaNome,
  onSelecionarCategoria,
  onSelecionarPaleta,
}: AppRoutesProps) {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <FeedPage
            onAbrirPost={onAbrirPost}
            onAbrirStatus={onAbrirStatus}
            onVisualizarStatus={onVisualizarStatus}
            onAbrirDetalhesPost={onAbrirDetalhesPost}
          />
        }
      />
      <Route
        path="/feed"
        element={
          <FeedPage
            onAbrirPost={onAbrirPost}
            onAbrirStatus={onAbrirStatus}
            onVisualizarStatus={onVisualizarStatus}
            onAbrirDetalhesPost={onAbrirDetalhesPost}
          />
        }
      />
      <Route path="/chats" element={<ChatsPage />} />
      <Route path="/dualview-ar" element={<DualViewArPage />} />
      <Route path="/mark/:pontoId" element={<MarkPage onAbrirDetalhesPost={onAbrirDetalhesPost} />} />
      <Route path="/missoes" element={<MissoesPage />} />
      <Route path="/galeria" element={<GaleriaPage />} />
      <Route path="/loja/:produtoId" element={<LojaPage />} />
      <Route path="/perfis" element={<PerfisPage />} />
      <Route path="/perfis/:usuarioId" element={<PerfisPage />} />
      <Route path="/comunidade" element={<PessoasPage />} />
      <Route path="/pessoas" element={<PessoasPage />} />
      <Route
        path="/personalização_perfil"
        element={
          <PersonalizacaoPerfilPage
            onAlternarClaroEscuro={onAlternarClaroEscuro}
            categoriasTema={categoriasTema}
            paletasTema={paletasTema}
            categoriaAtivaId={categoriaAtivaId}
            paletaAtivaNome={paletaAtivaNome}
            onSelecionarCategoria={onSelecionarCategoria}
            onSelecionarPaleta={onSelecionarPaleta}
          />
        }
      />
      <Route path="/impacto" element={<ImpactoPage />} />
      <Route path="/dados-nasa" element={<DadosNasaPage />} />
      <Route path="/adm-orbitlink" element={<AdmOrbitlinkPage />} />
      <Route
        path="*"
        element={
          <FeedPage
            onAbrirPost={onAbrirPost}
            onAbrirStatus={onAbrirStatus}
            onVisualizarStatus={onVisualizarStatus}
            onAbrirDetalhesPost={onAbrirDetalhesPost}
          />
        }
      />
    </Routes>
  );
}
/* === ROTAS DO APP | fim === */

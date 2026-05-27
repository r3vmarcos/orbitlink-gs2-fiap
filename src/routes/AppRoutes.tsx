import { Route, Routes } from 'react-router-dom';
import { DadosNasaPage } from '@/pages/DadosNasaPage';
import { DualViewArPage } from '@/pages/DualViewArPage';
import { FeedPage } from '@/pages/FeedPage';
import { GaleriaPage } from '@/pages/GaleriaPage';
import { ImpactoPage } from '@/pages/ImpactoPage';
import { MarkPage } from '@/pages/MarkPage';
import { MissoesPage } from '@/pages/MissoesPage';
import { PerfisPage } from '@/pages/PerfisPage';
import type { PostOrbitLink, StatusOrbital } from '@/types/orbitlink.types';

/* === ROTAS DO APP | inicio === */
interface AppRoutesProps {
  onAbrirPost: () => void;
  onAbrirStatus: () => void;
  onVisualizarStatus: (status: StatusOrbital) => void;
  onAbrirDetalhesPost: (post: PostOrbitLink) => void;
}

export function AppRoutes({ onAbrirPost, onAbrirStatus, onVisualizarStatus, onAbrirDetalhesPost }: AppRoutesProps) {
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
      <Route path="/dualview-ar" element={<DualViewArPage />} />
      <Route path="/mark/:pontoId" element={<MarkPage onAbrirDetalhesPost={onAbrirDetalhesPost} />} />
      <Route path="/missoes" element={<MissoesPage />} />
      <Route path="/galeria" element={<GaleriaPage />} />
      <Route path="/perfis" element={<PerfisPage />} />
      <Route path="/perfis/:usuarioId" element={<PerfisPage />} />
      <Route path="/impacto" element={<ImpactoPage />} />
      <Route path="/dados-nasa" element={<DadosNasaPage />} />
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

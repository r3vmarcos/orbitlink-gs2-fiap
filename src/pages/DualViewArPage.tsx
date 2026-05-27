import { useNavigate, useSearchParams } from 'react-router-dom';
import { DualViewAr } from '@/components/ar/DualViewAr';

/* === DUALVIEW AR PAGE | inicio === */
export function DualViewArPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const pontoInicialId = params.get('ponto') ?? undefined;

  return (
    <DualViewAr
      pontoInicialId={pontoInicialId}
      onVerPosts={(pontoId) => navigate(`/mark/${pontoId}`)}
      onVerStatus={(pontoId) => navigate(`/feed?status=${pontoId}`)}
    />
  );
}
/* === DUALVIEW AR PAGE | fim === */

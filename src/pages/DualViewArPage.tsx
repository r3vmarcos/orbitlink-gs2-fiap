import { useNavigate, useSearchParams } from 'react-router-dom';
import { DualViewAr } from '@/components/ar/DualViewAr';
import type { TipoCamadaAr } from '@/types/orbitlink.types';

/* === DUALVIEW AR PAGE | inicio === */
export function DualViewArPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const pontoInicialId = params.get('ponto') ?? undefined;
  const camadaInicial = params.get('camada') as TipoCamadaAr | undefined;

  return (
    <DualViewAr
      pontoInicialId={pontoInicialId}
      camadaInicial={camadaInicial}
      onVerPosts={(pontoId) => navigate(`/mark/${pontoId}`)}
      onVerStatus={(pontoId) => navigate(`/feed?status=${pontoId}`)}
    />
  );
}
/* === DUALVIEW AR PAGE | fim === */

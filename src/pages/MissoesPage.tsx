import { useNavigate } from 'react-router-dom';
import { CardMissao } from '@/components/missoes/CardMissao';
import { CardBase } from '@/components/ui/CardBase';
import { useOrbitLink } from '@/context/OrbitLinkContext';

/* === MISSOES PAGE | inicio === */
export function MissoesPage() {
  const { missoes } = useOrbitLink();
  const navigate = useNavigate();

  return (
    <div className="space-y-5">
      <CardBase>
        <p className="font-monoapp text-xs font-black uppercase tracking-[0.18em] text-blue-300">Explorador de missões</p>
        <h1 className="mt-2 text-4xl font-black uppercase text-white light-theme:text-sky-950">Missões, estações e colônias</h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300 light-theme:text-slate-700">Linha do tempo de descobertas, infraestrutura espacial e registros sociais conectados ao DualView AR.</p>
      </CardBase>
      <div className="grid gap-5 lg:grid-cols-2">
        {missoes.map((missao) => <CardMissao key={missao.id} missao={missao} onVerAr={(pontoId) => navigate(`/dualview-ar?ponto=${pontoId ?? ''}`)} />)}
      </div>
    </div>
  );
}
/* === MISSOES PAGE | fim === */

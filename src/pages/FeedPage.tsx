import { useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CardPost } from '@/components/feed/CardPost';
import { StatusOrbitalLista } from '@/components/feed/StatusOrbitalLista';
import { CardBase } from '@/components/ui/CardBase';
import { useOrbitLink } from '@/context/OrbitLinkContext';
import type { PostOrbitLink, StatusOrbital, TipoCategoriaPost } from '@/types/orbitlink.types';

/* === FEED PAGE | inicio === */
interface FeedPageProps {
  onAbrirPost: () => void;
  onAbrirStatus: () => void;
  onVisualizarStatus: (status: StatusOrbital) => void;
  onAbrirDetalhesPost: (post: PostOrbitLink) => void;
}

const filtrosFeed: Array<TipoCategoriaPost | 'todos'> = ['todos', 'diario_orbital', 'missao', 'estacao', 'lua', 'satelite', 'evento', 'cidade', 'turismo', 'comunidade', 'clima', 'bioma', 'ods'];

export function FeedPage({ onAbrirPost, onAbrirStatus, onVisualizarStatus, onAbrirDetalhesPost }: FeedPageProps) {
  const { posts, pontosAr, usuarios } = useOrbitLink();
  const [filtro, setFiltro] = useState<TipoCategoriaPost | 'todos'>('todos');
  const [busca, setBusca] = useState('');
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const pontoFiltro = params.get('ponto');

  const postsFiltrados = useMemo(() => {
    return posts
      .filter((post) => !pontoFiltro || post.pontoArId === pontoFiltro)
      .filter((post) => filtro === 'todos' || post.categoria === filtro)
      .filter((post) => {
        const ponto = pontosAr.find((item) => item.id === post.pontoArId);
        const autor = usuarios.find((item) => item.id === post.autorId);
        const alvo = `${post.titulo} ${post.texto} ${post.categoria} ${ponto?.nome ?? ''} ${autor?.nome ?? ''} ${autor?.usuario ?? ''} ${autor?.localizacaoAtual ?? ''}`.toLowerCase();
        return alvo.includes(busca.toLowerCase());
      })
      .sort((a, b) => new Date(b.criadoEm).getTime() - new Date(a.criadoEm).getTime());
  }, [busca, filtro, pontoFiltro, pontosAr, posts, usuarios]);

  function handleVerAr(pontoId?: string) {
    const query = pontoId ? `?ponto=${pontoId}` : '';
    navigate(`/dualview-ar${query}`);
  }

  return (
    <div className="grid w-full min-w-0 gap-5 xl:grid-cols-[minmax(0,1fr)_340px]">
      <div className="min-w-0 space-y-5">
        <CardBase>
          <p className="font-monoapp text-[11px] font-black uppercase tracking-[0.1em] text-[var(--text-link)] sm:text-xs sm:tracking-[0.18em]">Orbitlink</p>
          <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="min-w-0">
              <h1 className="text-3xl font-black uppercase leading-tight text-[var(--text-text)] min-[380px]:text-4xl md:text-6xl">Orbifeed</h1>
            </div>
          </div>
          <input value={busca} onChange={(evento) => setBusca(evento.target.value)} className="input-form mt-5" placeholder="Buscar em posts, pessoas, locais, pontos AR ou ODS..." />
          <div className="mt-4 flex max-w-full gap-2 overflow-x-auto pb-1">
            {filtrosFeed.map((item) => (
              <button key={item} onClick={() => setFiltro(item)} className={`shrink-0 rounded-full border px-3 py-2 font-monoapp text-[10px] font-black uppercase tracking-[0.08em] ${filtro === item ? 'border-[var(--bg-primary)] bg-[var(--bg-primary)] text-[var(--text-primary)]' : 'border-[var(--border-border)] text-[var(--text-muted)]'}`}>
                {item.replaceAll('_', ' ')}
              </button>
            ))}
          </div>
        </CardBase>

        <StatusOrbitalLista onAbrirStatus={onVisualizarStatus} onCriarStatus={onAbrirStatus} />

        <div className="space-y-5">
          {postsFiltrados.map((post) => <CardPost key={post.id} post={post} onVerAr={handleVerAr} onAbrirDetalhes={onAbrirDetalhesPost} />)}
          {postsFiltrados.length === 0 ? <CardBase>Nenhuma publicacao encontrada para a busca atual.</CardBase> : null}
        </div>
      </div>

      <aside className="hidden min-w-0 space-y-5 xl:sticky xl:top-28 xl:block xl:self-start">
        <CardBase>
          <p className="font-monoapp text-xs font-black uppercase tracking-[0.18em] text-[var(--text-link)]">Tendencias</p>
          <div className="mt-4 space-y-3">
            {['#Orbitlink', '#Orbifeed', '#TerraECeu', '#StatusOrbital24h', '#NASAApi'].map((tag) => (
              <div key={tag} className="rounded-2xl border border-[var(--border-border)] bg-[var(--bg-muted)] px-4 py-3 text-sm font-bold text-[var(--text-text)]">{tag}</div>
            ))}
          </div>
        </CardBase>
        <CardBase>
          <p className="font-monoapp text-xs font-black uppercase tracking-[0.18em] text-[var(--text-link)]">Marks recomendados</p>
          <div className="mt-4 space-y-2">
            {pontosAr.slice(0, 6).map((ponto) => (
              <button key={ponto.id} onClick={() => handleVerAr(ponto.id)} className="w-full rounded-2xl border border-[var(--border-border)] bg-[var(--bg-muted)] px-4 py-3 text-left text-sm font-bold text-[var(--text-text)] hover:bg-[var(--bg-surface-hover)]">
                {ponto.nome}
              </button>
            ))}
          </div>
        </CardBase>
      </aside>
    </div>
  );
}
/* === FEED PAGE | fim === */

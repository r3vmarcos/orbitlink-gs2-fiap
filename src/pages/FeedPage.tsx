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
    <div className="grid w-full min-w-0 gap-5 lg:grid-cols-[300px_minmax(0,1fr)_320px] xl:grid-cols-[340px_minmax(0,720px)_360px] 2xl:grid-cols-[360px_minmax(0,760px)_380px]">
      <aside className="hidden min-w-0 space-y-5 lg:sticky lg:top-20 lg:block lg:h-[calc(100dvh-6rem)] lg:overflow-y-auto lg:pr-1">
        <PainelFeed busca={busca} filtro={filtro} onBusca={setBusca} onFiltro={setFiltro} />
        <StatusOrbitalLista onAbrirStatus={onVisualizarStatus} onCriarStatus={onAbrirStatus} />
      </aside>

      <div className="min-w-0 space-y-5 lg:col-start-2">
        <div className="lg:hidden">
          <PainelFeed busca={busca} filtro={filtro} onBusca={setBusca} onFiltro={setFiltro} />
        </div>

        <div className="lg:hidden">
          <StatusOrbitalLista onAbrirStatus={onVisualizarStatus} onCriarStatus={onAbrirStatus} />
        </div>

        <div className="space-y-5">
          {postsFiltrados.map((post) => <CardPost key={post.id} post={post} onVerAr={handleVerAr} onAbrirDetalhes={onAbrirDetalhesPost} />)}
          {postsFiltrados.length === 0 ? <CardBase>Nenhuma publicacao encontrada para a busca atual.</CardBase> : null}
        </div>
      </div>

      <aside className="hidden min-w-0 space-y-5 lg:sticky lg:top-20 lg:block lg:h-[calc(100dvh-6rem)] lg:overflow-y-auto lg:pl-1">
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

function PainelFeed({ busca, filtro, onBusca, onFiltro }: { busca: string; filtro: TipoCategoriaPost | 'todos'; onBusca: (valor: string) => void; onFiltro: (valor: TipoCategoriaPost | 'todos') => void }) {
  return (
    <CardBase>
      <p className="font-monoapp text-[11px] font-black uppercase tracking-[0.1em] text-[var(--text-link)] sm:text-xs sm:tracking-[0.18em]">Orbitlink</p>
      <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between lg:block">
        <div className="min-w-0">
          <h1 className="text-3xl font-black uppercase leading-tight text-[var(--text-text)] min-[380px]:text-4xl lg:text-4xl">Orbifeed</h1>
        </div>
      </div>
      <input value={busca} onChange={(evento) => onBusca(evento.target.value)} className="input-form mt-5" placeholder="Buscar em posts, pessoas, locais, pontos AR ou ODS..." />
      <div className="mt-4 flex max-w-full gap-2 overflow-x-auto pb-1 lg:flex-wrap lg:overflow-visible">
        {filtrosFeed.map((item) => (
          <button key={item} onClick={() => onFiltro(item)} className={`shrink-0 rounded-full border px-3 py-2 font-monoapp text-[10px] font-black uppercase tracking-[0.08em] ${filtro === item ? 'border-[var(--bg-primary)] bg-[var(--bg-primary)] text-[var(--text-primary)]' : 'border-[var(--border-border)] text-[var(--text-muted)]'}`}>
            {item.replaceAll('_', ' ')}
          </button>
        ))}
      </div>
    </CardBase>
  );
}
/* === FEED PAGE | fim === */

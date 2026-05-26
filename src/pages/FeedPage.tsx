import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CardPost } from '@/components/feed/CardPost';
import { StatusOrbitalLista } from '@/components/feed/StatusOrbitalLista';
import { Botao } from '@/components/ui/Botao';
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

const filtrosTerra: Array<TipoCategoriaPost | 'todos'> = ['todos', 'diario_orbital', 'missao', 'estacao', 'lua', 'satelite', 'evento'];
const filtrosEspaco: Array<TipoCategoriaPost | 'todos'> = ['todos', 'cidade', 'turismo', 'comunidade', 'clima', 'bioma', 'ods'];

export function FeedPage({ onAbrirPost, onAbrirStatus, onVisualizarStatus, onAbrirDetalhesPost }: FeedPageProps) {
  const { perspectiva, posts, pontosAr, usuarioAtual } = useOrbitLink();
  const [filtro, setFiltro] = useState<TipoCategoriaPost | 'todos'>('todos');
  const [busca, setBusca] = useState('');
  const navigate = useNavigate();
  const filtros = perspectiva === 'terra' ? filtrosTerra : filtrosEspaco;

  const postsFiltrados = useMemo(() => {
    return posts
      .filter((post) => post.perspectiva === perspectiva)
      .filter((post) => filtro === 'todos' || post.categoria === filtro)
      .filter((post) => {
        const alvo = `${post.titulo} ${post.texto} ${post.categoria}`.toLowerCase();
        return alvo.includes(busca.toLowerCase());
      })
      .sort((a, b) => new Date(b.criadoEm).getTime() - new Date(a.criadoEm).getTime());
  }, [busca, filtro, perspectiva, posts]);

  function handleVerAr(pontoId?: string) {
    const query = pontoId ? `?ponto=${pontoId}` : '';
    navigate(`/dualview-ar${query}`);
  }

  return (
    <div className="grid w-full min-w-0 gap-5 xl:grid-cols-[minmax(0,1fr)_340px]">
      <div className="min-w-0 space-y-5">
        <CardBase>
          <p className="font-monoapp text-xs font-black uppercase tracking-[0.18em] text-[var(--text-link)]">Orbifeed</p>
          <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="min-w-0">
              <h1 className="text-4xl font-black uppercase leading-tight text-[var(--text-text)] md:text-6xl">
                Orbifeed
              </h1>
              <span className="mt-2 inline-flex rounded-full border border-[var(--border-border)] bg-[var(--bg-primary)] px-3 py-1 font-monoapp text-[10px] font-black uppercase tracking-[0.14em] text-[var(--text-primary)]">
                {perspectiva === 'terra' ? 'Rede vista da Terra' : 'Rede vista do espaço'}
              </span>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--text-muted)]">
                Olá, {usuarioAtual?.nome ?? 'explorador'}. O Orbifeed reúne posts, imagens, comentários e pontos AR em uma rede social espacial local.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:flex">
              <Botao onClick={onAbrirPost}>Publicar</Botao>
              <Botao variante="secundario" onClick={onAbrirStatus}>Status 24h</Botao>
            </div>
          </div>
          <input value={busca} onChange={(evento) => setBusca(evento.target.value)} className="input-form mt-5" placeholder="Buscar posts, missões, pontos AR ou ODS..." />
          <div className="mt-4 flex max-w-full gap-2 overflow-x-auto pb-1">
            {filtros.map((item) => (
              <button key={item} onClick={() => setFiltro(item)} className={`shrink-0 rounded-full border px-3 py-2 font-monoapp text-[10px] font-black uppercase tracking-[0.08em] ${filtro === item ? 'border-[var(--bg-primary)] bg-[var(--bg-primary)] text-[var(--text-primary)]' : 'border-[var(--border-border)] text-[var(--text-muted)]'}`}>
                {item.replaceAll('_', ' ')}
              </button>
            ))}
          </div>
        </CardBase>

        <StatusOrbitalLista onAbrirStatus={onVisualizarStatus} onCriarStatus={onAbrirStatus} />

        <button onClick={onAbrirPost} className="w-full rounded-[1.5rem] border border-[var(--border-border)] bg-[var(--bg-surface)] p-5 text-left text-[var(--text-muted)] transition hover:bg-[var(--bg-surface-hover)]">
          <span className="font-monoapp text-xs font-black uppercase tracking-[0.18em] text-[var(--text-link)]">Criar publicação rápida</span>
          <span className="mt-2 block text-lg font-bold text-[var(--text-text)]">O que você quer compartilhar entre mundos?</span>
        </button>

        <div className="space-y-5">
          {postsFiltrados.map((post) => <CardPost key={post.id} post={post} onVerAr={handleVerAr} onAbrirDetalhes={onAbrirDetalhesPost} />)}
          {postsFiltrados.length === 0 ? <CardBase>Nenhuma publicação encontrada para o filtro atual.</CardBase> : null}
        </div>
      </div>

      <aside className="min-w-0 space-y-5 xl:sticky xl:top-28 xl:self-start">
        <CardBase>
          <p className="font-monoapp text-xs font-black uppercase tracking-[0.18em] text-[var(--text-link)]">Tendências</p>
          <div className="mt-4 space-y-3">
            {['#DualViewAR', '#StatusOrbital24h', '#AmazôniaViva', '#BaseSelene', '#NASAApi'].map((tag) => (
              <div key={tag} className="rounded-2xl border border-[var(--border-border)] bg-[var(--bg-muted)] px-4 py-3 text-sm font-bold text-[var(--text-text)]">{tag}</div>
            ))}
          </div>
        </CardBase>
        <CardBase>
          <p className="font-monoapp text-xs font-black uppercase tracking-[0.18em] text-[var(--text-link)]">Marks recomendados</p>
          <div className="mt-4 space-y-2">
            {pontosAr.filter((ponto) => ponto.perspectiva === perspectiva).slice(0, 5).map((ponto) => (
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

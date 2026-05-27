import { useNavigate, useParams } from 'react-router-dom';
import { CardPost } from '@/components/feed/CardPost';
import { CardBase } from '@/components/ui/CardBase';
import { useOrbitLink } from '@/context/OrbitLinkContext';
import type { PostOrbitLink } from '@/types/orbitlink.types';

/* === MARK PAGE | inicio === */
export function MarkPage({ onAbrirDetalhesPost }: { onAbrirDetalhesPost: (post: PostOrbitLink) => void }) {
  const { pontoId } = useParams();
  const { pontosAr, posts } = useOrbitLink();
  const navigate = useNavigate();
  const ponto = pontosAr.find((item) => item.id === pontoId);
  const postsDoPonto = posts.filter((post) => post.pontoArId === pontoId);

  function handleVerAr(id?: string) {
    navigate(`/dualview-ar${id ? `?ponto=${id}` : ''}`);
  }

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <CardBase>
        <p className="font-monoapp text-xs font-black uppercase tracking-[0.18em] text-[var(--text-link)]">Mark Orbitlink</p>
        <h1 className="mt-2 text-3xl font-black uppercase text-[var(--text-text)]">{ponto?.nome ?? 'Mark'}</h1>
        {ponto ? <p className="mt-3 text-sm leading-6 text-[var(--text-muted)]">{ponto.descricao}</p> : null}
      </CardBase>
      {postsDoPonto.map((post) => <CardPost key={post.id} post={post} onVerAr={handleVerAr} onAbrirDetalhes={onAbrirDetalhesPost} />)}
      {postsDoPonto.length === 0 ? <CardBase>Nenhuma publicacao vinculada a este mark.</CardBase> : null}
    </div>
  );
}
/* === MARK PAGE | fim === */

import { Bookmark, Heart, MapPin, MessageCircle, Send, Share2, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/Badge';
import { useOrbitLink } from '@/context/OrbitLinkContext';
import type { PostOrbitLink } from '@/types/orbitlink.types';
import { formatarNumeroCompacto, formatarTempoRelativo } from '@/utils/formatadores';

/* === CARD DE POST | inicio === */
interface CardPostProps {
  post: PostOrbitLink;
  onVerAr: (pontoId?: string) => void;
  onAbrirDetalhes?: (post: PostOrbitLink) => void;
}

export function CardPost({ post, onVerAr, onAbrirDetalhes }: CardPostProps) {
  const { usuarios, pontosAr, postsCurtidos, postsSalvos, curtirPost, salvarPost, excluirPost, comentarPost, compartilharPost } = useOrbitLink();
  const navigate = useNavigate();
  const [comentario, setComentario] = useState('');
  const [comentariosAbertos, setComentariosAbertos] = useState(false);
  const autor = usuarios.find((usuario) => usuario.id === post.autorId) ?? usuarios[0];
  const fotoAutor = autor.fotoPerfil ?? `https://i.pravatar.cc/120?u=${autor.id}`;
  const ponto = pontosAr.find((pontoAr) => pontoAr.id === post.pontoArId);
  const curtido = postsCurtidos.includes(post.id);
  const salvo = postsSalvos.includes(post.id);
  const localPostagem = ponto?.nome ?? autor.localizacaoAtual;

  function handleComentario() {
    if (!comentario.trim()) return;
    comentarPost(post.id, comentario);
    setComentario('');
    setComentariosAbertos(true);
  }

  return (
    <article className="animate-subir overflow-hidden rounded-[1.5rem] border border-[var(--border-border)] bg-transparent shadow-soft backdrop-blur-xl">
      <header className="flex items-center gap-3 p-3 sm:p-4">
        <img src={fotoAutor} alt={autor.nome} className="h-12 w-12 shrink-0 rounded-2xl border border-[var(--border-border)] object-cover" loading="lazy" />
        <div className="min-w-0 flex-1">
          <button onClick={() => navigate(`/perfis/${autor.id}`)} className="block max-w-full truncate text-left text-sm font-black text-[var(--text-text)] hover:text-[var(--text-link)]">{autor.nome}</button>
          <p className="truncate font-monoapp text-[9px] uppercase tracking-[0.04em] text-[var(--text-muted)] min-[380px]:text-[10px] min-[380px]:tracking-[0.08em]">
            {autor.usuario} - {formatarTempoRelativo(post.criadoEm)}
          </p>
          <p className="truncate text-[11px] font-semibold text-[var(--text-muted)] sm:hidden">{localPostagem}</p>
        </div>
        {post.criadoPeloUsuario ? (
          <button aria-label="Excluir publicação" onClick={() => excluirPost(post.id)} className="rounded-xl p-2 text-rose-300 hover:bg-rose-500/10">
            <Trash2 className="h-4 w-4" />
          </button>
        ) : null}
      </header>

      {post.imagem ? (
        <button onClick={() => onAbrirDetalhes?.(post)} className="group block w-full overflow-hidden">
          <img src={post.imagem} alt={post.titulo} className="aspect-[5/3] w-full object-cover transition duration-500 group-hover:scale-105 sm:aspect-[20/9]" loading="lazy" />
        </button>
      ) : null}

      <div className="space-y-4 p-3 sm:p-4">
        <div>
          <h2 className="text-lg font-black uppercase leading-snug text-[var(--text-text)] sm:text-xl">{post.titulo}</h2>
          <p className="mt-2 line-clamp-3 text-sm leading-6 text-[var(--text-muted)]">{post.texto}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge tom="laranja">{localPostagem}</Badge>
          <Badge>{`#${post.categoria.replaceAll('_', '')}`}</Badge>
          {post.ods.map((ods) => (
            <Badge key={ods} tom="verde">{`#${ods.replace(' ', '')}`}</Badge>
          ))}
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          <button onClick={() => curtirPost(post.id)} className={`inline-flex h-9 shrink-0 items-center justify-center gap-1 rounded-full border px-2.5 text-[10px] font-bold transition ${curtido ? 'border-rose-400 bg-rose-500/15 text-rose-300' : 'border-[var(--border-border)] text-[var(--text-muted)] hover:bg-[var(--bg-surface-hover)]'}`}>
            <Heart className="h-3.5 w-3.5" /> <span>{formatarNumeroCompacto(post.curtidas + (curtido ? 1 : 0))}</span>
          </button>
          <button onClick={() => setComentariosAbertos((valor) => !valor)} className="inline-flex h-9 shrink-0 items-center justify-center gap-1 rounded-full border border-[var(--border-border)] px-2.5 text-[10px] font-bold text-[var(--text-muted)] hover:bg-[var(--bg-surface-hover)]">
            <MessageCircle className="h-3.5 w-3.5" /> <span>{formatarNumeroCompacto(post.comentarios.length)}</span>
          </button>
          <button onClick={() => compartilharPost(post.id)} className="inline-flex h-9 shrink-0 items-center justify-center gap-1 rounded-full border border-[var(--border-border)] px-2.5 text-[10px] font-bold text-[var(--text-muted)] hover:bg-[var(--bg-surface-hover)]">
            <Share2 className="h-3.5 w-3.5" /> <span>{formatarNumeroCompacto(post.compartilhamentos)}</span>
          </button>
          <button onClick={() => salvarPost(post.id)} className={`inline-flex h-9 shrink-0 items-center justify-center gap-1 rounded-full border px-2.5 text-[10px] font-bold transition ${salvo ? 'border-amber-400 bg-amber-500/15 text-amber-300' : 'border-[var(--border-border)] text-[var(--text-muted)] hover:bg-[var(--bg-surface-hover)]'}`}>
            <Bookmark className="h-3.5 w-3.5" /> <span>Salvar</span>
          </button>
          <button onClick={() => onVerAr(post.pontoArId)} className="inline-flex h-9 shrink-0 items-center justify-center gap-1 rounded-full border border-[var(--border-border)] px-2.5 text-[10px] font-bold text-[var(--text-muted)] hover:bg-[var(--bg-surface-hover)]">
            <MapPin className="h-3.5 w-3.5" /> AR
          </button>
        </div>

        {comentariosAbertos && post.comentarios.length > 0 ? (
          <div className="space-y-2 rounded-2xl border border-[var(--border-border)] bg-[var(--bg-muted)] p-3">
            {post.comentarios.slice(-2).map((item) => (
              <p key={item.id} className="text-xs leading-5 text-[var(--text-muted)]">
                <strong className="text-[var(--text-text)]">{item.autor}:</strong> {item.texto}
              </p>
            ))}
          </div>
        ) : null}

        <div className="flex gap-2">
          <input value={comentario} onFocus={() => setComentariosAbertos(true)} onChange={(evento) => setComentario(evento.target.value)} className="input-form min-w-0 flex-1 rounded-full px-3 py-2 text-xs" placeholder="Comentar..." />
          <button onClick={handleComentario} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--bg-primary)] text-[var(--text-primary)]">
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </article>
  );
}
/* === CARD DE POST | fim === */

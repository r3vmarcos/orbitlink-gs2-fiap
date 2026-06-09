import { MessageCircle } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useOrbitLink } from '@/context/OrbitLinkContext';
import type { ChatOrbitLink } from '@/types/orbitlink.types';

/* === LISTA DE ULTIMOS CHATS | inicio === */
export function ListaUltimosChats() {
  const { chats, usuarios, usuarioAtual } = useOrbitLink();
  const ultimosChats = chats.slice(0, 5);

  function obterTitulo(chat: ChatOrbitLink) {
    if (chat.grupo) {
      return chat.nome ?? 'Grupo Orbitlink';
    }

    const outroUsuario = usuarios.find((usuario) => usuario.id !== usuarioAtual?.id && chat.participanteIds.includes(usuario.id));
    return outroUsuario?.nome ?? 'Conversa Orbitlink';
  }

  return (
    <section className="mb-2 flex h-[calc(100%-0.5rem)] min-h-0 flex-col rounded-[1.5rem] border border-[var(--border-border)] bg-[color-mix(in_srgb,var(--bg-surface)_78%,transparent)] p-3 backdrop-blur-xl">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="titulo-painel">Chats</h2>
        <NavLink to="/chats" className="flex h-8 w-8 items-center justify-center rounded-xl border border-[var(--border-border)] text-[var(--text-link)]" title="Abrir chats">
          <MessageCircle className="h-4 w-4" />
        </NavLink>
      </div>

      <div className="min-h-0 flex-1 space-y-2 overflow-hidden">
        {ultimosChats.map((chat) => {
          const autor = usuarios.find((usuario) => usuario.id !== usuarioAtual?.id && chat.participanteIds.includes(usuario.id)) ?? usuarios.find((usuario) => usuario.id === chat.participanteIds[0]) ?? usuarios[0];
          const fotoAutor = autor.fotoPerfil ?? `https://i.pravatar.cc/120?u=${autor.id}`;

          return (
            <NavLink key={chat.id} to={`/chats?chat=${chat.id}`} className="flex min-w-0 items-center gap-2 rounded-2xl border border-[var(--border-border)] bg-[var(--bg-muted)] p-2 transition hover:bg-[var(--bg-surface-hover)]">
              <img src={fotoAutor} alt={autor.nome} className="h-9 w-9 shrink-0 rounded-xl border border-[var(--border-border)] object-cover" loading="lazy" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-black text-[var(--text-text)]">{obterTitulo(chat)}</p>
              </div>
            </NavLink>
          );
        })}

        {ultimosChats.length === 0 ? (
          <p className="rounded-2xl border border-[var(--border-border)] bg-[var(--bg-muted)] p-3 text-xs text-[var(--text-muted)]">Nenhuma conversa iniciada.</p>
        ) : null}
      </div>
    </section>
  );
}
/* === LISTA DE ULTIMOS CHATS | fim === */

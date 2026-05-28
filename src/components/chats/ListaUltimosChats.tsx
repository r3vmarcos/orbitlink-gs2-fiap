import { MessageCircle } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useOrbitLink } from '@/context/OrbitLinkContext';
import type { ChatOrbitLink } from '@/types/orbitlink.types';
import { formatarTempoRelativo } from '@/utils/formatadores';

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
    <section className="rounded-[1.5rem] border border-[var(--border-border)] bg-[color-mix(in_srgb,var(--bg-surface)_78%,transparent)] p-3 backdrop-blur-xl">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="font-monoapp text-[10px] font-black uppercase tracking-[0.14em] text-[var(--text-link)]">Chats</h2>
        <NavLink to="/chats" className="flex h-8 w-8 items-center justify-center rounded-xl border border-[var(--border-border)] text-[var(--text-link)]" title="Abrir chats">
          <MessageCircle className="h-4 w-4" />
        </NavLink>
      </div>

      <div className="space-y-2">
        {ultimosChats.map((chat) => {
          const ultimaMensagem = chat.mensagens[chat.mensagens.length - 1];
          const autor = usuarios.find((usuario) => usuario.id === (ultimaMensagem?.autorId ?? chat.participanteIds[0])) ?? usuarios[0];
          const fotoAutor = autor.fotoPerfil ?? `https://i.pravatar.cc/120?u=${autor.id}`;

          return (
            <NavLink key={chat.id} to={`/chats?chat=${chat.id}`} className="flex min-w-0 items-center gap-2 rounded-2xl border border-[var(--border-border)] bg-[var(--bg-muted)] p-2 transition hover:bg-[var(--bg-surface-hover)]">
              <img src={fotoAutor} alt={autor.nome} className="h-9 w-9 shrink-0 rounded-xl border border-[var(--border-border)] object-cover" loading="lazy" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-black text-[var(--text-text)]">{obterTitulo(chat)}</p>
                <p className="mt-0.5 truncate text-[10px] text-[var(--text-muted)]">{ultimaMensagem?.texto ?? 'Conversa criada. Envie a primeira mensagem.'}</p>
              </div>
              <span className="shrink-0 font-monoapp text-[8px] uppercase text-[var(--text-muted)]">{formatarTempoRelativo(chat.atualizadoEm)}</span>
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

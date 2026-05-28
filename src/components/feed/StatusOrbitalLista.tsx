import { Camera } from 'lucide-react';
import { useOrbitLink } from '@/context/OrbitLinkContext';
import type { StatusOrbital } from '@/types/orbitlink.types';
import { calcularHorasRestantes } from '@/utils/formatadores';

/* === LISTA DE STATUS ORBITAIS | inicio === */
interface StatusOrbitalListaProps {
  onAbrirStatus: (status: StatusOrbital) => void;
  onCriarStatus?: () => void;
}

export function StatusOrbitalLista({ onAbrirStatus }: StatusOrbitalListaProps) {
  const { statusOrbitais, usuarios } = useOrbitLink();

  return (
    <section className="flex h-full min-h-0 flex-col overflow-hidden rounded-[1.5rem] border border-[var(--border-border)] bg-[color-mix(in_srgb,var(--bg-surface)_78%,transparent)] p-3 backdrop-blur-xl">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="min-w-0 font-monoapp text-[10px] font-black uppercase tracking-[0.14em] text-[var(--text-link)]">Status Orbitlink 24h</h2>
      </div>
      <div className="min-h-0 space-y-2 overflow-hidden">
        {statusOrbitais.slice(0, 2).map((status) => {
          const autor = usuarios.find((usuario) => usuario.id === status.autorId) ?? usuarios[0];
          const fotoAutor = autor.fotoPerfil ?? `https://i.pravatar.cc/120?u=${autor.id}`;

          return (
            <button key={status.id} onClick={() => onAbrirStatus(status)} className="group overflow-hidden rounded-2xl border border-[var(--border-border)] bg-[var(--bg-muted)] text-left transition hover:bg-[var(--bg-surface-hover)]">
              {status.imagem ? (
                <img src={status.imagem} alt={status.titulo} className="h-20 w-full object-cover transition duration-500 group-hover:scale-105 lg:h-24" loading="lazy" />
              ) : null}
              <div className="flex items-center gap-2 p-2">
                <div className="relative shrink-0">
                  <img src={fotoAutor} alt={autor.nome} className="h-9 w-9 rounded-xl border border-[var(--border-border)] object-cover" loading="lazy" />
                  {status.tipo === 'camera_orbital' ? (
                    <span className="absolute -right-1 -top-1 rounded-full bg-rose-500 p-1 text-white">
                      <Camera className="h-3 w-3" />
                    </span>
                  ) : null}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-xs font-black leading-4 text-[var(--text-text)]">{status.titulo}</p>
                  <p className="mt-0.5 line-clamp-1 text-[10px] leading-4 text-[var(--text-muted)]">{status.texto}</p>
                  <p className="mt-1 font-monoapp text-[9px] uppercase text-[var(--text-muted)]">{calcularHorasRestantes(status.expiraEm)}h restantes</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
/* === LISTA DE STATUS ORBITAIS | fim === */

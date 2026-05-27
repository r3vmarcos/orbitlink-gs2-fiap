import { Camera, Plus } from 'lucide-react';
import { AvatarOrbital } from '@/components/ui/AvatarOrbital';
import { useOrbitLink } from '@/context/OrbitLinkContext';
import type { StatusOrbital } from '@/types/orbitlink.types';
import { calcularHorasRestantes } from '@/utils/formatadores';

/* === LISTA DE STATUS ORBITAIS | inicio === */
interface StatusOrbitalListaProps {
  onAbrirStatus: (status: StatusOrbital) => void;
  onCriarStatus: () => void;
}

export function StatusOrbitalLista({ onAbrirStatus, onCriarStatus }: StatusOrbitalListaProps) {
  const { statusOrbitais, usuarios } = useOrbitLink();

  return (
    <section className="rounded-[1.5rem] border border-[var(--border-border)] bg-[color-mix(in_srgb,var(--bg-surface)_78%,transparent)] p-2 backdrop-blur-xl sm:rounded-[2rem] sm:p-4">
      <div className="mb-2 flex items-center justify-between gap-3 sm:mb-3">
        <h2 className="min-w-0 font-monoapp text-[7px] font-black uppercase tracking-[0.06em] text-[var(--text-link)] sm:text-xs sm:tracking-[0.18em]">Status Orbitlink 24h</h2>
        <button onClick={onCriarStatus} className="shrink-0 rounded-xl bg-[var(--bg-primary)] px-2 py-1.5 font-monoapp text-[7px] font-black uppercase tracking-[0.06em] text-[var(--text-primary)] sm:px-3 sm:py-2 sm:text-[10px] sm:tracking-[0.12em]">
          Criar
        </button>
      </div>
      <div className="flex gap-3 overflow-x-auto pb-1">
        <button onClick={onCriarStatus} className="flex w-16 shrink-0 flex-col items-center gap-1 rounded-2xl border border-dashed border-[var(--border-border)] p-2 text-[var(--text-muted)] sm:w-24 sm:gap-2 sm:rounded-3xl sm:p-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--bg-primary)] text-[var(--text-primary)] sm:h-14 sm:w-14 sm:rounded-2xl">
            <Plus className="h-4 w-4 sm:h-6 sm:w-6" />
          </span>
          <span className="text-center font-monoapp text-[7px] font-black uppercase sm:text-[10px]">Seu status</span>
        </button>
        {statusOrbitais.map((status) => {
          const autor = usuarios.find((usuario) => usuario.id === status.autorId) ?? usuarios[0];
          return (
            <button key={status.id} onClick={() => onAbrirStatus(status)} className="w-20 shrink-0 rounded-2xl border border-[var(--border-border)] bg-[var(--bg-muted)] p-2 text-left transition hover:bg-[var(--bg-surface-hover)] sm:w-28 sm:rounded-3xl sm:p-3">
              <div className="relative mb-2">
                <AvatarOrbital gradiente={autor.avatarGradiente} nome={autor.nome} tamanho="lg" />
                {status.tipo === 'camera_orbital' ? (
                  <span className="absolute -right-1 -top-1 rounded-full bg-rose-500 p-1 text-white">
                    <Camera className="h-3 w-3" />
                  </span>
                ) : null}
              </div>
              <p className="line-clamp-2 text-xs font-black text-[var(--text-text)]">{status.titulo}</p>
              <p className="mt-1 font-monoapp text-[9px] uppercase text-[var(--text-muted)]">{calcularHorasRestantes(status.expiraEm)}h restantes</p>
            </button>
          );
        })}
      </div>
    </section>
  );
}
/* === LISTA DE STATUS ORBITAIS | fim === */

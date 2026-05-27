import { Camera } from 'lucide-react';
import { AvatarOrbital } from '@/components/ui/AvatarOrbital';
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
    <section className="rounded-[1.5rem] border border-[var(--border-border)] bg-[color-mix(in_srgb,var(--bg-surface)_78%,transparent)] p-2 backdrop-blur-xl">
      <div className="mb-2 flex items-center justify-between gap-3">
        <h2 className="min-w-0 font-monoapp text-[7px] font-black uppercase tracking-[0.06em] text-[var(--text-link)] sm:text-xs sm:tracking-[0.18em]">Status Orbitlink 24h</h2>
      </div>
      <div className="flex gap-3 overflow-x-auto pb-1">
        {statusOrbitais.map((status) => {
          const autor = usuarios.find((usuario) => usuario.id === status.autorId) ?? usuarios[0];
          return (
            <button key={status.id} onClick={() => onAbrirStatus(status)} className="w-16 shrink-0 rounded-2xl border border-[var(--border-border)] bg-[var(--bg-muted)] p-1.5 text-left transition hover:bg-[var(--bg-surface-hover)] sm:w-20">
              <div className="relative mb-1">
                <AvatarOrbital gradiente={autor.avatarGradiente} nome={autor.nome} tamanho="lg" />
                {status.tipo === 'camera_orbital' ? (
                  <span className="absolute -right-1 -top-1 rounded-full bg-rose-500 p-1 text-white">
                    <Camera className="h-3 w-3" />
                  </span>
                ) : null}
              </div>
              <p className="line-clamp-2 text-[9px] font-black leading-3 text-[var(--text-text)]">{status.titulo}</p>
              <p className="mt-1 font-monoapp text-[7px] uppercase text-[var(--text-muted)]">{calcularHorasRestantes(status.expiraEm)}h</p>
            </button>
          );
        })}
      </div>
    </section>
  );
}
/* === LISTA DE STATUS ORBITAIS | fim === */

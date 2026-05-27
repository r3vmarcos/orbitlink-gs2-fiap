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
    <section className="rounded-[2rem] border border-[var(--border-border)] bg-[color-mix(in_srgb,var(--bg-surface)_78%,transparent)] p-4 backdrop-blur-xl">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="font-monoapp text-xs font-black uppercase tracking-[0.18em] text-[var(--text-link)]">Status Orbitlink 24h</h2>
        <button onClick={onCriarStatus} className="rounded-xl bg-[var(--bg-primary)] px-3 py-2 font-monoapp text-[10px] font-black uppercase tracking-[0.12em] text-[var(--text-primary)]">
          Criar
        </button>
      </div>
      <div className="flex gap-3 overflow-x-auto pb-1">
        <button onClick={onCriarStatus} className="flex w-24 shrink-0 flex-col items-center gap-2 rounded-3xl border border-dashed border-[var(--border-border)] p-3 text-[var(--text-muted)]">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--bg-primary)] text-[var(--text-primary)]">
            <Plus className="h-6 w-6" />
          </span>
          <span className="text-center font-monoapp text-[10px] font-black uppercase">Seu status</span>
        </button>
        {statusOrbitais.map((status) => {
          const autor = usuarios.find((usuario) => usuario.id === status.autorId) ?? usuarios[0];
          return (
            <button key={status.id} onClick={() => onAbrirStatus(status)} className="w-28 shrink-0 rounded-3xl border border-[var(--border-border)] bg-[var(--bg-muted)] p-3 text-left transition hover:bg-[var(--bg-surface-hover)]">
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

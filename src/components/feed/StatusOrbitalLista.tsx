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
  const statusAnimados = Array.from({ length: 10 }, (_, indice) => statusOrbitais[indice % statusOrbitais.length]).filter(Boolean);
  const statusDuplicados = [...statusAnimados, ...statusAnimados];

  return (
    <section className="rounded-[1.5rem] border border-[var(--border-border)] bg-[color-mix(in_srgb,var(--bg-surface)_78%,transparent)] p-2 backdrop-blur-xl">
      <div className="mb-2 flex items-center justify-between gap-3">
        <h2 className="min-w-0 font-monoapp text-[7px] font-black uppercase tracking-[0.06em] text-[var(--text-link)] sm:text-xs sm:tracking-[0.18em]">Status Orbitlink 24h</h2>
      </div>
      <div className="pausar-animacao overflow-hidden">
        <div className="animacao-marquee-horizontal flex w-max gap-3 pb-1">
        {statusDuplicados.map((status, indice) => {
          const autor = usuarios.find((usuario) => usuario.id === status.autorId) ?? usuarios[0];
          return (
            <button key={`${status.id}_${indice}`} onClick={() => onAbrirStatus(status)} className="flex w-44 shrink-0 items-center gap-2 rounded-2xl border border-[var(--border-border)] bg-[var(--bg-muted)] p-1.5 text-left transition hover:bg-[var(--bg-surface-hover)]">
              <div className="relative shrink-0">
                <AvatarOrbital gradiente={autor.avatarGradiente} nome={autor.nome} tamanho="sm" />
                {status.tipo === 'camera_orbital' ? (
                  <span className="absolute -right-1 -top-1 rounded-full bg-rose-500 p-1 text-white">
                    <Camera className="h-3 w-3" />
                  </span>
                ) : null}
              </div>
              <div className="min-w-0">
                <p className="truncate text-[9px] font-black leading-3 text-[var(--text-text)]">{status.titulo}</p>
                <p className="mt-1 font-monoapp text-[7px] uppercase text-[var(--text-muted)]">{calcularHorasRestantes(status.expiraEm)}h restantes</p>
              </div>
            </button>
          );
        })}
        </div>
      </div>
    </section>
  );
}
/* === LISTA DE STATUS ORBITAIS | fim === */

import { Camera } from 'lucide-react';
import { useOrbitLink } from '@/context/OrbitLinkContext';
import type { StatusOrbital, UsuarioOrbitLink } from '@/types/orbitlink.types';
import { calcularHorasRestantes } from '@/utils/formatadores';

/* === LISTA DE STATUS ORBITAIS | inicio === */
interface StatusOrbitalListaProps {
  onAbrirStatus: (status: StatusOrbital) => void;
  onCriarStatus?: () => void;
}

export function StatusOrbitalLista({ onAbrirStatus }: StatusOrbitalListaProps) {
  const { statusOrbitais, usuarios } = useOrbitLink();
  const statusTerra = statusOrbitais.filter((status) => status.perspectiva === 'terra');
  const statusEspaco = statusOrbitais.filter((status) => status.perspectiva === 'espaco');

  return (
    <section className="flex h-full min-h-0 flex-col overflow-hidden rounded-[1.5rem] border border-[var(--border-border)] bg-[color-mix(in_srgb,var(--bg-surface)_78%,transparent)] p-3 backdrop-blur-xl">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="titulo-painel min-w-0">Status Orbitlink 24h</h2>
      </div>
      <div className="min-h-0 flex-1 space-y-3 overflow-hidden">
        <LinhaStatus status={statusTerra.length > 0 ? statusTerra : statusOrbitais} direcao="esquerda" usuarios={usuarios} onAbrirStatus={onAbrirStatus} />
        <LinhaStatus status={statusEspaco.length > 0 ? statusEspaco : statusOrbitais} direcao="direita" usuarios={usuarios} onAbrirStatus={onAbrirStatus} />
      </div>
    </section>
  );
}

function LinhaStatus({ status, direcao, usuarios, onAbrirStatus }: { status: StatusOrbital[]; direcao: 'esquerda' | 'direita'; usuarios: UsuarioOrbitLink[]; onAbrirStatus: (status: StatusOrbital) => void }) {
  const itensBase = Array.from({ length: 10 }, (_, indice) => status[indice % status.length]).filter((item): item is StatusOrbital => Boolean(item));
  const itensDuplicados = [...itensBase, ...itensBase];

  return (
    <div className="grupo-marquee-status sem-scrollbar min-h-0 overflow-x-auto overflow-y-hidden rounded-2xl md:overflow-hidden">
      <div className={`flex min-h-0 gap-3 ${direcao === 'direita' ? 'animacao-status-direita' : 'animacao-status-esquerda'}`}>
        {itensDuplicados.map((item, indice) => {
          const autor = usuarios.find((usuario) => usuario.id === item.autorId) ?? usuarios[0];
          const fotoAutor = autor.fotoPerfil ?? `https://i.pravatar.cc/120?u=${autor.id}`;

          return (
            <button key={`${item.id}_${indice}`} onClick={() => onAbrirStatus(item)} className="group w-[80%] shrink-0 overflow-hidden rounded-2xl border border-[var(--border-border)] bg-[var(--bg-muted)] text-left transition hover:bg-[var(--bg-surface-hover)]">
              {item.imagem ? (
                <img src={item.imagem} alt={item.titulo} className="h-20 w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
              ) : null}
              <div className="flex items-center gap-2 p-2">
                <div className="relative shrink-0">
                  <img src={fotoAutor} alt={autor.nome} className="h-8 w-8 rounded-xl border border-[var(--border-border)] object-cover" loading="lazy" />
                  {item.tipo === 'camera_orbital' ? (
                    <span className="absolute -right-1 -top-1 rounded-full bg-rose-500 p-1 text-white">
                      <Camera className="h-3 w-3" />
                    </span>
                  ) : null}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-xs font-black leading-4 text-[var(--text-text)]">{item.titulo}</p>
                  <p className="mt-1 font-monoapp text-[9px] uppercase text-[var(--text-muted)]">{calcularHorasRestantes(item.expiraEm)}h restantes</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
/* === LISTA DE STATUS ORBITAIS | fim === */

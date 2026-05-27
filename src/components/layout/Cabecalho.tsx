import { Camera, LogOut, Moon, Rocket, Sun, Zap } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { Botao } from '@/components/ui/Botao';
import { useOrbitLink } from '@/context/OrbitLinkContext';

/* === CABECALHO | inicio === */
interface CabecalhoProps {
  onAbrirPost: () => void;
  onAbrirStatus: () => void;
}

const links = [
  { to: '/', label: 'Feed' },
  { to: '/dualview-ar', label: 'DualView AR' },
  { to: '/missoes', label: 'Missões' },
  { to: '/galeria', label: 'Galeria' },
  { to: '/perfis', label: 'Perfis' },
  { to: '/impacto', label: 'Impacto' },
  { to: '/dados-nasa', label: 'NASA' },
];

export function Cabecalho({ onAbrirPost, onAbrirStatus }: CabecalhoProps) {
  const { tema, alternarTema, usuarioAtual, sairUsuario } = useOrbitLink();

  return (
    <header className="sticky top-0 z-50 max-w-[100vw] border-b border-[var(--border-border)] bg-[color-mix(in_srgb,var(--bg-background)_88%,transparent)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-3 py-3 sm:px-6">
        <NavLink to="/" className="flex min-w-0 items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[var(--bg-primary)] text-[var(--text-primary)] shadow-neon">
            <Zap className="h-6 w-6" />
          </span>
          <span className="truncate font-monoapp text-lg font-black uppercase tracking-[0.16em] text-[var(--text-text)] sm:text-xl">
            Orbit<span className="text-[var(--text-link)]">link</span>
          </span>
        </NavLink>

        <nav className="ml-2 hidden flex-1 items-center gap-2 xl:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `rounded-2xl px-3 py-2 font-monoapp text-[11px] font-black uppercase tracking-[0.12em] transition ${
                  isActive ? 'bg-[var(--bg-primary)] text-[var(--text-primary)]' : 'text-[var(--text-muted)] hover:bg-[var(--bg-surface-hover)]'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto hidden items-center gap-2 lg:flex">
          <Botao variante="secundario" tamanho="sm" onClick={onAbrirStatus}>
            <Camera className="h-4 w-4" /> Status
          </Botao>
          <Botao tamanho="sm" onClick={onAbrirPost}>
            <Rocket className="h-4 w-4" /> Publicar
          </Botao>
          <button title="Alternar tema" onClick={alternarTema} className="rounded-2xl border border-[var(--border-border)] p-3 text-[var(--text-link)] hover:bg-[var(--bg-surface-hover)]">
            {tema === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <div className="max-w-40 truncate rounded-2xl border border-[var(--border-border)] px-3 py-2 text-xs font-bold text-[var(--text-muted)]">
            {usuarioAtual?.usuario}
          </div>
          <button title="Sair" onClick={sairUsuario} className="rounded-2xl border border-[var(--border-border)] p-3 text-[var(--text-link)] hover:bg-[var(--bg-surface-hover)]">
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
/* === CABECALHO | fim === */

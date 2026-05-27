import { Images, Plus, RadioTower, Rocket, UserRound, UsersRound } from 'lucide-react';
import { NavLink } from 'react-router-dom';

/* === MENU MOBILE | inicio === */
interface MenuMobileProps {
  onAbrirPost: () => void;
  onAbrirStatus: () => void;
}

export function MenuMobile({ onAbrirPost, onAbrirStatus }: MenuMobileProps) {
  const itemClasse = ({ isActive }: { isActive: boolean }) =>
    `flex min-w-0 flex-col items-center justify-center gap-1 rounded-2xl px-1 py-2 text-[8px] font-black uppercase tracking-normal min-[380px]:text-[9px] ${
      isActive ? 'bg-[var(--bg-primary)] text-[var(--text-primary)]' : 'text-[var(--text-muted)]'
    }`;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 max-w-[100vw] border-t border-[var(--border-border)] bg-[color-mix(in_srgb,var(--bg-background)_94%,transparent)] px-2 pb-[max(env(safe-area-inset-bottom),0.5rem)] pt-2 backdrop-blur-xl lg:hidden">
      <div className="mx-auto grid max-w-md grid-cols-6 gap-1">
        <NavLink to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className={itemClasse}>
          <RadioTower className="h-5 w-5" />
          <span className="truncate">Feed</span>
        </NavLink>
        <NavLink to="/dualview-ar" className={itemClasse}>
          <Rocket className="h-5 w-5" />
          <span className="truncate lg:hidden">AR</span>
          <span className="hidden truncate lg:inline">Mapa</span>
        </NavLink>
        <button onClick={onAbrirPost} className="flex min-w-0 flex-col items-center justify-center gap-1 rounded-2xl border border-[var(--bg-primary)] bg-transparent px-1 py-2 text-[8px] font-black uppercase tracking-normal text-[var(--bg-primary)] min-[380px]:text-[9px]">
          <Plus className="h-5 w-5" />
          <span className="truncate">Post</span>
        </button>
        <NavLink to="/pessoas" className={itemClasse}>
          <UsersRound className="h-5 w-5" />
          <span className="truncate">Pessoas</span>
        </NavLink>
        <NavLink to="/galeria" className={itemClasse}>
          <Images className="h-5 w-5" />
          <span className="truncate">Fotos</span>
        </NavLink>
        <NavLink to="/perfis" className={itemClasse}>
          <UserRound className="h-5 w-5" />
          <span className="truncate">Perfil</span>
        </NavLink>
      </div>
    </nav>
  );
}
/* === MENU MOBILE | fim === */

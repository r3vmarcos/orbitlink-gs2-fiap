import { Images, RadioTower, UserRound } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useOrbitLink } from '@/context/OrbitLinkContext';
import planetaBlack from '@/assets/planet_black.png';
import planetaWhite from '@/assets/planet_white.png';

/* === MENU MOBILE | inicio === */
interface MenuMobileProps {
  onAbrirPost: () => void;
  onAbrirStatus: () => void;
}

export function MenuMobile({ onAbrirPost, onAbrirStatus }: MenuMobileProps) {
  const { tema } = useOrbitLink();
  const planeta = tema === 'dark' ? planetaWhite : planetaBlack;
  const itemClasse = ({ isActive }: { isActive: boolean }) =>
    `flex min-w-0 flex-col items-center justify-center gap-1 rounded-2xl px-1 py-2 text-[8px] font-black uppercase tracking-normal min-[380px]:text-[9px] ${
      isActive ? 'bg-[var(--bg-primary)] text-[var(--text-primary)]' : 'text-[var(--text-muted)]'
    }`;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 max-w-[100vw] border-t border-[var(--border-border)] bg-[color-mix(in_srgb,var(--bg-background)_94%,transparent)] px-2 pb-[max(env(safe-area-inset-bottom),0.5rem)] pt-2 backdrop-blur-xl lg:hidden">
      <div className="mx-auto grid max-w-md grid-cols-5 gap-1">
        <NavLink to="/" className={itemClasse}>
          <RadioTower className="h-5 w-5" />
          <span className="truncate">Feed</span>
        </NavLink>
        <NavLink to="/dualview-ar" className={itemClasse}>
          <img src={planeta} alt="" className="h-5 w-5 object-contain" />
          <span className="truncate">AR</span>
        </NavLink>
        <button onClick={onAbrirPost} className="flex min-w-0 flex-col items-center justify-center gap-1 rounded-2xl bg-[var(--bg-primary)] px-1 py-2 text-[8px] font-black uppercase tracking-normal text-[var(--text-primary)] min-[380px]:text-[9px]">
          <IconePost className="h-5 w-5" />
          <span className="truncate">Post</span>
        </button>
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

function IconePost({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 197 197" className={className} role="img" aria-label="Post">
      <defs>
        <linearGradient id="postIconeGradiente" x1="30" x2="170" y1="20" y2="175" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1ee784" />
          <stop offset="1" stopColor="#1139aa" />
        </linearGradient>
      </defs>
      <rect width="197" height="197" rx="48" fill="url(#postIconeGradiente)" />
      <path d="M110 22 55 107h37l-11 68 62-93h-39l6-60Z" fill="#d8ffe8" stroke="#073f42" strokeLinejoin="round" strokeWidth="10" />
    </svg>
  );
}
/* === MENU MOBILE | fim === */

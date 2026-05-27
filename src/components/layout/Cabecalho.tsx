import { Camera, LogOut, Moon, Rocket, Sun } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { Botao } from '@/components/ui/Botao';
import { useOrbitLink } from '@/context/OrbitLinkContext';
import logoBlack from '@/assets/logo_black.png';
import logoWhite from '@/assets/logo_white.png';

/* === CABECALHO | inicio === */
interface CabecalhoProps {
  onAbrirPost: () => void;
  onAbrirStatus: () => void;
  onAlternarTemaVisual: () => void;
  onAlternarPaleta: () => void;
  onAlternarClaroEscuro: () => void;
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

export function Cabecalho({ onAbrirPost, onAbrirStatus, onAlternarTemaVisual, onAlternarPaleta, onAlternarClaroEscuro }: CabecalhoProps) {
  const { tema, usuarioAtual, sairUsuario } = useOrbitLink();
  const logo = tema === 'dark' ? logoWhite : logoBlack;

  return (
    <header className="sticky top-0 z-50 max-w-[100vw] border-b border-[var(--border-border)] bg-[color-mix(in_srgb,var(--bg-background)_88%,transparent)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center gap-2 px-2.5 py-2.5 min-[380px]:px-3 sm:gap-3 sm:px-6 sm:py-3">
        <NavLink to="/" className="flex min-w-0 items-center gap-2 sm:gap-3">
          <img src={logo} alt="Orbitlink" className="h-10 w-auto max-w-[155px] object-contain sm:h-11 sm:max-w-[190px]" />
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
          <BolinhasTema onAlternarTemaVisual={onAlternarTemaVisual} onAlternarPaleta={onAlternarPaleta} onAlternarClaroEscuro={onAlternarClaroEscuro} />
          <button title="Alternar tema" onClick={onAlternarClaroEscuro} className="hidden rounded-2xl border border-[var(--border-border)] p-3 text-[var(--text-link)] hover:bg-[var(--bg-surface-hover)]">
            {tema === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <div className="max-w-40 truncate rounded-2xl border border-[var(--border-border)] px-3 py-2 text-xs font-bold text-[var(--text-muted)]">
            {usuarioAtual?.usuario}
          </div>
          <button title="Sair" onClick={sairUsuario} className="rounded-2xl border border-[var(--border-border)] p-3 text-[var(--text-link)] hover:bg-[var(--bg-surface-hover)]">
            <LogOut className="h-5 w-5" />
          </button>
        </div>
        <div className="ml-auto lg:hidden"><BolinhasTema onAlternarTemaVisual={onAlternarTemaVisual} onAlternarPaleta={onAlternarPaleta} onAlternarClaroEscuro={onAlternarClaroEscuro} /></div>
      </div>
    </header>
  );
}

function BolinhasTema({ onAlternarTemaVisual, onAlternarPaleta, onAlternarClaroEscuro }: Pick<CabecalhoProps, 'onAlternarTemaVisual' | 'onAlternarPaleta' | 'onAlternarClaroEscuro'>) {
  return (
    <div className="flex items-center gap-2">
      <button title="Tema" onClick={onAlternarTemaVisual} className="h-5 w-5 rounded-full border border-[var(--border-border)] bg-[var(--bg-surface-hover)]" />
      <button title="Paleta" onClick={onAlternarPaleta} className="h-5 w-5 rounded-full border border-[var(--border-border)] bg-[var(--bg-primary)]" />
      <button title="Dark/light" onClick={onAlternarClaroEscuro} className="h-5 w-5 rounded-full border border-[var(--border-border)] bg-[var(--text-text)]" />
    </div>
  );
}
/* === CABECALHO | fim === */

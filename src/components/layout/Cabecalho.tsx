import { Moon, Sun } from 'lucide-react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logoBlack from '@/assets/logo_black.png';
import logoWhite from '@/assets/logo_white.png';
import { useOrbitLink } from '@/context/OrbitLinkContext';
import type { CategoriaTemaId, TemaVisual } from '@/types/tema';

/* === CABECALHO | inicio === */
interface CabecalhoProps {
  onAbrirPost: () => void;
  onAbrirStatus: () => void;
  onAlternarTemaVisual: () => void;
  onAlternarPaleta: () => void;
  onAlternarClaroEscuro: () => void;
  categoriasTema: Array<{ id: CategoriaTemaId; nome: string }>;
  paletasTema: TemaVisual[];
  categoriaAtivaId: CategoriaTemaId;
  paletaAtivaNome: string;
  onSelecionarCategoria: (id: CategoriaTemaId) => void;
  onSelecionarPaleta: (indice: number) => void;
}

const linksAntesPost = [
  { to: '/', label: 'Feed' },
  { to: '/dualview-ar', label: 'Mapa' },
];

const linksDepoisPost = [
  { to: '/pessoas', label: 'Pessoas' },
  { to: '/galeria', label: 'Fotos' },
  { to: '/perfis', label: 'Perfil' },
];

export function Cabecalho(props: CabecalhoProps) {
  const { onAbrirPost } = props;
  const { tema } = useOrbitLink();
  const logo = tema === 'dark' ? logoWhite : logoBlack;

  return (
    <header className="sticky top-0 z-50 max-w-[100vw] border-b border-[var(--border-border)] bg-[color-mix(in_srgb,var(--bg-background)_88%,transparent)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-md items-center gap-2 px-2.5 py-2.5 min-[380px]:px-3 lg:max-w-6xl lg:px-6 xl:max-w-7xl 2xl:max-w-[1440px]">
        <NavLink to="/" className="flex min-w-0 items-center gap-2">
          <span
            aria-label="Orbitlink"
            className="block h-9 w-[132px] bg-[var(--bg-primary)]"
            style={{ WebkitMask: `url(${logo}) center / contain no-repeat`, mask: `url(${logo}) center / contain no-repeat` }}
          />
        </NavLink>

        <nav className="ml-4 hidden flex-1 items-center justify-center gap-2 lg:flex">
          {linksAntesPost.map((link) => (
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
          <button onClick={onAbrirPost} className="rounded-2xl border border-[var(--bg-primary)] bg-transparent px-3 py-2 font-monoapp text-[11px] font-black uppercase tracking-[0.12em] text-[var(--bg-primary)] transition hover:bg-[color-mix(in_srgb,var(--bg-primary)_12%,transparent)]">
            Post
          </button>
          {linksDepoisPost.map((link) => (
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

        <div className="ml-auto">
          <MenuTemas {...props} />
        </div>
      </div>
    </header>
  );
}

function MenuTemas({ categoriasTema, paletasTema, categoriaAtivaId, paletaAtivaNome, onSelecionarCategoria, onSelecionarPaleta, onAlternarClaroEscuro }: CabecalhoProps) {
  const [menuAberto, setMenuAberto] = useState<'tema' | 'paleta' | undefined>();
  const { tema } = useOrbitLink();

  return (
    <div className="relative flex items-center gap-1.5">
      <button onClick={() => setMenuAberto(menuAberto === 'tema' ? undefined : 'tema')} className="rounded-xl border border-[var(--border-border)] px-2 py-1.5 font-monoapp text-[10px] font-black uppercase text-[var(--text-text)]">Tema</button>
      <button onClick={() => setMenuAberto(menuAberto === 'paleta' ? undefined : 'paleta')} className="rounded-xl border border-[var(--border-border)] px-2 py-1.5 font-monoapp text-[10px] font-black uppercase text-[var(--text-text)]">Paletas</button>
      <button title="Dark/light" onClick={onAlternarClaroEscuro} className="rounded-xl border border-[var(--border-border)] p-2 text-[var(--text-link)]">
        {tema === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </button>
      {menuAberto ? (
        <div className="absolute right-0 top-11 z-[80] max-h-80 w-56 overflow-y-auto rounded-2xl border border-[var(--border-border)] bg-[var(--bg-popover)] p-2 shadow-neon">
          {menuAberto === 'tema' ? categoriasTema.map((categoria) => (
            <button key={categoria.id} onClick={() => { onSelecionarCategoria(categoria.id); setMenuAberto(undefined); }} className={`block w-full rounded-xl px-3 py-2 text-left text-xs font-bold ${categoria.id === categoriaAtivaId ? 'bg-[var(--bg-primary)] text-[var(--text-primary)]' : 'text-[var(--text-text)] hover:bg-[var(--bg-surface-hover)]'}`}>{categoria.nome}</button>
          )) : paletasTema.map((paleta, indice) => (
            <button key={paleta.name} onClick={() => { onSelecionarPaleta(indice); setMenuAberto(undefined); }} className={`flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-xs font-bold ${paleta.name === paletaAtivaNome ? 'bg-[var(--bg-primary)] text-[var(--text-primary)]' : 'text-[var(--text-text)] hover:bg-[var(--bg-surface-hover)]'}`}>
              <span className="h-3 w-3 rounded-full border border-[var(--border-border)]" style={{ backgroundColor: paleta.accent }} />
              {paleta.name}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
/* === CABECALHO | fim === */

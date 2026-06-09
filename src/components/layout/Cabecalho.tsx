import { MessageCircle, Moon, Sun, UserRound } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import logoBlack from '@/assets/logo_black.png';
import logoWhite from '@/assets/logo_white.png';
import { useOrbitLink } from '@/context/OrbitLinkContext';

/* === CABECALHO | inicio === */
interface CabecalhoProps {
  onAbrirPost: () => void;
  onAlternarClaroEscuro: () => void;
}

const linksAntesPost = [
  { to: '/', label: 'Feed', mobile: 'Feed' },
  { to: '/dualview-ar', label: 'Mapa', mobile: 'AR' },
  { to: '/chats', label: 'Chats', mobile: 'Chats' },
];

const linksDepoisPost = [
  { to: '/pessoas', label: 'Pessoas', mobile: 'Pessoas' },
  { to: '/galeria', label: 'Fotos', mobile: 'Fotos' },
];

export function Cabecalho(props: CabecalhoProps) {
  const { onAbrirPost, onAlternarClaroEscuro } = props;
  const { tema } = useOrbitLink();
  const logo = tema === 'dark' ? logoWhite : logoBlack;
  const [oculto, setOculto] = useState(false);
  const ultimoScrollRef = useRef(0);
  const timerOcultarRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    function atualizarVisibilidadeMobile(evento: Event) {
      const detalhe = (evento as CustomEvent<{ oculto: boolean }>).detail;
      setOculto(Boolean(detalhe?.oculto));
    }

    function controlarCabecalho() {
      const scrollAtual = window.scrollY;
      const descendo = scrollAtual > ultimoScrollRef.current && scrollAtual > 96;

      window.clearTimeout(timerOcultarRef.current);

      if (descendo) {
        timerOcultarRef.current = window.setTimeout(() => setOculto(true), 2000);
      } else {
        setOculto(false);
      }

      ultimoScrollRef.current = scrollAtual;
    }

    window.addEventListener('orbitlink:cabecalho-mobile', atualizarVisibilidadeMobile);
    window.addEventListener('scroll', controlarCabecalho, { passive: true });

    return () => {
      window.removeEventListener('orbitlink:cabecalho-mobile', atualizarVisibilidadeMobile);
      window.removeEventListener('scroll', controlarCabecalho);
      window.clearTimeout(timerOcultarRef.current);
    };
  }, []);

  return (
    <header className={`fixed left-0 right-0 top-0 z-50 max-w-[100vw] border-b border-[var(--border-border)] bg-[color-mix(in_srgb,var(--bg-background)_90%,transparent)] backdrop-blur-xl transition-transform duration-300 ${oculto ? '-translate-y-full' : 'translate-y-0'}`}>
      <div className="mx-auto flex max-w-md flex-col gap-2 px-2.5 py-2.5 min-[380px]:px-3 md:grid md:max-w-6xl md:grid-cols-[230px_minmax(0,1fr)_230px] md:items-center md:gap-5 md:px-6 lg:grid-cols-[300px_minmax(0,1fr)_320px] xl:max-w-7xl xl:grid-cols-[340px_minmax(0,720px)_360px] 2xl:max-w-[1440px] 2xl:grid-cols-[360px_minmax(0,760px)_380px]">
        <div className="flex min-w-0 items-center gap-2 pr-32 md:pr-0">
          <NavLink to="/" className="flex min-w-0 items-center gap-2">
            <span
              aria-label="Orbitlink"
              className="block h-9 w-[112px] bg-[var(--bg-primary)] min-[380px]:w-[132px]"
              style={{ WebkitMask: `url(${logo}) center / contain no-repeat`, mask: `url(${logo}) center / contain no-repeat` }}
            />
          </NavLink>
        </div>

        <nav className="order-2 hidden grid-cols-5 gap-1 md:order-none md:col-start-2 md:flex md:min-w-0 md:items-center md:justify-center md:gap-2">
          {linksAntesPost.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `rounded-2xl px-2 py-2 text-center font-monoapp text-[10px] font-black uppercase tracking-[0.04em] transition md:px-3 md:text-[11px] md:tracking-[0.12em] ${link.to === '/chats' ? 'hidden md:block' : ''} ${
                  isActive ? 'bg-[var(--bg-primary)] text-[var(--text-primary)]' : 'text-[var(--text-muted)] hover:bg-[var(--bg-surface-hover)]'
                }`
              }
            >
              <span className="md:hidden">{link.mobile}</span>
              <span className="hidden md:inline">{link.label}</span>
            </NavLink>
          ))}
          <button onClick={onAbrirPost} className="rounded-2xl border border-[var(--bg-primary)] bg-transparent px-2 py-2 font-monoapp text-[10px] font-black uppercase tracking-[0.04em] text-[var(--bg-primary)] transition hover:bg-[color-mix(in_srgb,var(--bg-primary)_12%,transparent)] md:px-3 md:text-[11px] md:tracking-[0.12em]">
            Post
          </button>
          {linksDepoisPost.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `rounded-2xl px-2 py-2 text-center font-monoapp text-[10px] font-black uppercase tracking-[0.04em] transition md:px-3 md:text-[11px] md:tracking-[0.12em] ${
                  isActive ? 'bg-[var(--bg-primary)] text-[var(--text-primary)]' : 'text-[var(--text-muted)] hover:bg-[var(--bg-surface-hover)]'
                }`
              }
            >
              {link.mobile}
            </NavLink>
          ))}
          <NavLink
            to="/perfis"
            className={({ isActive }) =>
              `hidden rounded-2xl px-2 py-2 text-center font-monoapp text-[10px] font-black uppercase tracking-[0.04em] transition md:px-3 md:text-[11px] md:tracking-[0.12em] lg:block ${
                isActive ? 'bg-[var(--bg-primary)] text-[var(--text-primary)]' : 'text-[var(--text-muted)] hover:bg-[var(--bg-surface-hover)]'
              }`
            }
          >
            Perfil
          </NavLink>
        </nav>

        <div className="absolute right-2.5 top-2.5 flex items-center gap-1 md:static md:col-start-3 md:ml-auto">
          <NavLink to="/chats" title="Chats" className={({ isActive }) => `flex h-10 w-10 items-center justify-center rounded-2xl md:hidden ${isActive ? 'bg-[var(--bg-primary)] text-[var(--text-primary)]' : 'text-[var(--text-muted)]'}`}>
            <MessageCircle className="h-5 w-5" />
          </NavLink>
          <NavLink to="/perfis" title="Perfil" className={({ isActive }) => `flex h-10 w-10 items-center justify-center rounded-2xl lg:hidden ${isActive ? 'bg-[var(--bg-primary)] text-[var(--text-primary)]' : 'text-[var(--text-muted)]'}`}>
            <UserRound className="h-5 w-5" />
          </NavLink>
          <button title="Alternar claro e escuro" onClick={onAlternarClaroEscuro} className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[var(--border-border)] text-[var(--text-link)]">
            {tema === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </header>
  );
}
/* === CABECALHO | fim === */

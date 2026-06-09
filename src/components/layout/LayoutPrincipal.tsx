import { useEffect, useState, type ReactNode } from 'react';
import { Cabecalho } from '@/components/layout/Cabecalho';
import { MenuMobile } from '@/components/layout/MenuMobile';
import { useOrbitLink } from '@/context/OrbitLinkContext';

/* === LAYOUT PRINCIPAL | inicio === */
interface LayoutPrincipalProps {
  children: ReactNode;
  onAbrirPost: () => void;
  onAbrirStatus: () => void;
  onAlternarClaroEscuro: () => void;
}

export function LayoutPrincipal({ children, onAbrirPost, onAbrirStatus, onAlternarClaroEscuro }: LayoutPrincipalProps) {
  const { tema } = useOrbitLink();
  const [cabecalhoOcultoMobile, setCabecalhoOcultoMobile] = useState(false);

  useEffect(() => {
    function atualizarVisibilidade(evento: Event) {
      const detalhe = (evento as CustomEvent<{ oculto: boolean }>).detail;
      setCabecalhoOcultoMobile(Boolean(detalhe?.oculto));
    }

    window.addEventListener('orbitlink:cabecalho-mobile', atualizarVisibilidade);

    return () => window.removeEventListener('orbitlink:cabecalho-mobile', atualizarVisibilidade);
  }, []);

  return (
    <div className={`${tema === 'light' ? 'light-theme' : ''}`}>
      <div className="min-h-[100dvh] max-w-[100vw] overflow-x-hidden bg-[var(--bg-background)] bg-grade-orbital bg-[length:48px_48px] font-orbit text-[var(--text-text)] light-theme:bg-grade-clara">
        <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top_left,color-mix(in_srgb,var(--bg-primary)_22%,transparent),transparent_28rem),radial-gradient(circle_at_bottom_right,color-mix(in_srgb,var(--border-focus)_16%,transparent),transparent_30rem)]" />
        <div className="relative z-10">
          <Cabecalho onAbrirPost={onAbrirPost} onAlternarClaroEscuro={onAlternarClaroEscuro} />
          <main className={`mx-auto min-h-0 w-full max-w-md px-2.5 pb-28 transition-[padding] duration-300 min-[380px]:px-3 md:max-w-6xl md:px-6 md:pb-8 md:pt-20 xl:max-w-7xl 2xl:max-w-[1440px] ${cabecalhoOcultoMobile ? 'pt-0' : 'pt-[57px]'}`}>{children}</main>
          <MenuMobile onAbrirPost={onAbrirPost} onAbrirStatus={onAbrirStatus} />
        </div>
      </div>
    </div>
  );
}
/* === LAYOUT PRINCIPAL | fim === */

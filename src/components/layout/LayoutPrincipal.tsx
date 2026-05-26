import type { ReactNode } from 'react';
import { Cabecalho } from '@/components/layout/Cabecalho';
import { MenuMobile } from '@/components/layout/MenuMobile';
import { useOrbitLink } from '@/context/OrbitLinkContext';

/* === LAYOUT PRINCIPAL | inicio === */
interface LayoutPrincipalProps {
  children: ReactNode;
  onAbrirPost: () => void;
  onAbrirStatus: () => void;
}

export function LayoutPrincipal({ children, onAbrirPost, onAbrirStatus }: LayoutPrincipalProps) {
  const { tema } = useOrbitLink();

  return (
    <div className={`${tema === 'light' ? 'light-theme' : ''}`}>
      <div className="min-h-[100dvh] max-w-[100vw] overflow-x-hidden bg-[var(--bg-background)] bg-grade-orbital bg-[length:48px_48px] font-orbit text-[var(--text-text)] light-theme:bg-grade-clara">
        <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top_left,color-mix(in_srgb,var(--bg-primary)_22%,transparent),transparent_28rem),radial-gradient(circle_at_bottom_right,color-mix(in_srgb,var(--border-focus)_16%,transparent),transparent_30rem)]" />
        <div className="relative z-10">
          <Cabecalho onAbrirPost={onAbrirPost} onAbrirStatus={onAbrirStatus} />
          <main className="mx-auto min-h-[calc(100dvh-80px)] w-full max-w-7xl px-3 pb-28 pt-4 sm:px-6 lg:pb-10 lg:pt-6">{children}</main>
          <MenuMobile onAbrirPost={onAbrirPost} onAbrirStatus={onAbrirStatus} />
        </div>
      </div>
    </div>
  );
}
/* === LAYOUT PRINCIPAL | fim === */

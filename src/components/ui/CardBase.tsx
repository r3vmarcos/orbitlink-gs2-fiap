import type { ReactNode } from 'react';

/* === CARD BASE | inicio === */
interface CardBaseProps {
  children: ReactNode;
  className?: string;
}

export function CardBase({ children, className = '' }: CardBaseProps) {
  return (
    <section className={`rounded-[1.5rem] border border-[var(--border-border)] bg-[color-mix(in_srgb,var(--bg-surface)_82%,transparent)] p-5 shadow-soft backdrop-blur-xl ${className}`}>
      {children}
    </section>
  );
}
/* === CARD BASE | fim === */

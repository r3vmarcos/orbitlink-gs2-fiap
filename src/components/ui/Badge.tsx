import type { ReactNode } from 'react';

/* === BADGE PADRAO | inicio === */
interface BadgeProps {
  children: ReactNode;
  tom?: 'azul' | 'verde' | 'roxo' | 'laranja' | 'neutro';
}

export function Badge({ children, tom = 'azul' }: BadgeProps) {
  const classes = {
    azul: 'border-[var(--border-border)] bg-[var(--bg-muted)] text-[var(--text-link)]',
    verde: 'border-emerald-400/40 bg-emerald-500/10 text-emerald-200 light-theme:text-emerald-800',
    roxo: 'border-violet-400/40 bg-violet-500/10 text-violet-200 light-theme:text-violet-800',
    laranja: 'border-orange-400/40 bg-orange-500/10 text-orange-200 light-theme:text-orange-800',
    neutro: 'border-slate-400/30 bg-slate-500/10 text-slate-200 light-theme:text-slate-700',
  }[tom];

  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-1 font-monoapp text-[10px] font-black uppercase tracking-[0.14em] ${classes}`}>
      {children}
    </span>
  );
}
/* === BADGE PADRAO | fim === */

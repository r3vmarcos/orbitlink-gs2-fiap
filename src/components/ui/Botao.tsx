import type { ButtonHTMLAttributes, ReactNode } from 'react';

/* === BOTAO PADRAO | inicio === */
interface BotaoProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variante?: 'primario' | 'secundario' | 'fantasma' | 'perigo';
  tamanho?: 'sm' | 'md' | 'lg';
}

export function Botao({ children, variante = 'primario', tamanho = 'md', className = '', ...props }: BotaoProps) {
  const classesBase = 'inline-flex items-center justify-center gap-2 rounded-2xl font-monoapp font-black uppercase tracking-[0.12em] transition-all active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50';
  const classesTamanho = {
    sm: 'px-3 py-2 text-[10px]',
    md: 'px-4 py-3 text-xs',
    lg: 'px-5 py-4 text-sm',
  }[tamanho];
  const classesVariante = {
    primario: 'bg-[var(--bg-primary)] text-[var(--text-primary)] shadow-neon hover:bg-[var(--bg-primary-hover)]',
    secundario: 'border border-[var(--border-border)] bg-[var(--bg-muted)] text-[var(--text-text)] hover:bg-[var(--bg-surface-hover)]',
    fantasma: 'text-[var(--text-muted)] hover:bg-[var(--bg-surface-hover)]',
    perigo: 'bg-rose-500 text-white hover:bg-rose-400',
  }[variante];

  return (
    <button className={`${classesBase} ${classesTamanho} ${classesVariante} ${className}`} {...props}>
      {children}
    </button>
  );
}
/* === BOTAO PADRAO | fim === */

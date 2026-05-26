import type { TemaOrbitLink } from '@/data/temas.data';
import type { TipoTema } from '@/types/orbitlink.types';

/* === TOKENS DE TEMA | inicio === */
export function gerarTokensTema(tema: TemaOrbitLink, tipoTema: TipoTema): Record<string, string> {
  const mistura = tipoTema === 'dark' ? 'white' : 'black';

  return {
    '--bg-background': tema.bg,
    '--bg-surface': `color-mix(in srgb, ${tema.bg} 95%, ${mistura})`,
    '--bg-surface-secondary': `color-mix(in srgb, ${tema.bg} 90%, ${mistura})`,
    '--bg-popover': `color-mix(in srgb, ${tema.bg} 85%, ${mistura})`,
    '--bg-overlay': 'color-mix(in srgb, black 60%, transparent)',
    '--bg-muted': `color-mix(in srgb, ${tema.bg} 85%, ${tema.sec})`,
    '--text-text': tema.text,
    '--text-muted': tema.sec,
    '--text-placeholder': `color-mix(in srgb, ${tema.sec} 50%, ${tema.bg})`,
    '--text-inverse': tema.bg,
    '--text-link': tema.accent,
    '--bg-primary': tema.accent,
    '--text-primary': tema.bg,
    '--bg-secondary': `color-mix(in srgb, ${tema.bg} 80%, ${tema.accent})`,
    '--bg-accent': `color-mix(in srgb, ${tema.accent} 70%, ${mistura})`,
    '--bg-success': `color-mix(in srgb, #10B981 15%, ${tema.bg})`,
    '--text-success': '#10B981',
    '--bg-warning': `color-mix(in srgb, #F59E0B 15%, ${tema.bg})`,
    '--text-warning': '#F59E0B',
    '--bg-error': `color-mix(in srgb, #EF4444 15%, ${tema.bg})`,
    '--text-destructive': '#EF4444',
    '--bg-info': `color-mix(in srgb, #3B82F6 15%, ${tema.bg})`,
    '--text-info': '#3B82F6',
    '--bg-primary-hover': `color-mix(in srgb, ${tema.accent} 85%, ${mistura})`,
    '--bg-primary-active': `color-mix(in srgb, ${tema.accent} 70%, ${mistura})`,
    '--bg-primary-disabled': `color-mix(in srgb, ${tema.accent} 30%, ${tema.sec})`,
    '--bg-surface-hover': `color-mix(in srgb, ${tema.bg} 92%, ${mistura})`,
    '--bg-surface-selected': `color-mix(in srgb, ${tema.bg} 85%, ${tema.accent})`,
    '--border-border': tema.border,
    '--border-input': `color-mix(in srgb, ${tema.border} 40%, ${tema.bg})`,
    '--border-focus': tema.accent,
    '--ring-ring': `color-mix(in srgb, ${tema.accent} 30%, transparent)`,
  };
}

export function aplicarTokensTema(tokens: Record<string, string>): void {
  Object.entries(tokens).forEach(([chave, valor]) => {
    document.documentElement.style.setProperty(chave, valor);
  });
}
/* === TOKENS DE TEMA | fim === */

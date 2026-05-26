import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        orbit: ['Lexend', 'Inter', 'Poppins', 'system-ui', 'sans-serif'],
        monoapp: ['"JetBrains Mono"', '"Space Mono"', 'monospace'],
      },
      boxShadow: {
        neon: '0 0 0 1px rgba(59,130,246,.45), 0 0 35px rgba(59,130,246,.25)',
        soft: '0 28px 90px rgba(15, 23, 42, .22)',
      },
      backgroundImage: {
        'grade-orbital': 'linear-gradient(rgba(59,130,246,.12) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,.12) 1px, transparent 1px)',
        'grade-clara': 'linear-gradient(rgba(14,165,233,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,.15) 1px, transparent 1px)',
      },
      animation: {
        orbitar: 'orbitar 16s linear infinite',
        pulsar: 'pulsar 2s ease-in-out infinite',
        subir: 'subir .35s ease-out both',
      },
      keyframes: {
        orbitar: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        pulsar: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.08)', opacity: '.72' },
        },
        subir: {
          '0%': { transform: 'translateY(14px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [
    function ({ addVariant }: { addVariant: (nome: string, seletor: string) => void }) {
      addVariant('light-theme', '.light-theme &');
    },
  ],
} satisfies Config;

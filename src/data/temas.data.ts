/* === TEMAS ORBITLINK | inicio === */
export interface TemaOrbitLink {
  nome: string;
  categoria: 'Dark Classico' | 'Light Neon';
  paleta: 'Telemetry Blue' | 'Laser Flare';
  bg: string;
  text: string;
  sec: string;
  accent: string;
  border: string;
}

export const temasOrbitLink = {
  dark: {
    nome: 'Dark Classico',
    categoria: 'Dark Classico',
    paleta: 'Telemetry Blue',
    bg: '#060913',
    text: '#F0F4F8',
    sec: '#718296',
    accent: '#00E5FF',
    border: '#2962FF',
  },
  light: {
    nome: 'Light Neon',
    categoria: 'Light Neon',
    paleta: 'Laser Flare',
    bg: '#FFF7ED',
    text: '#9A3412',
    sec: '#EA580C',
    accent: '#FF4500',
    border: '#FFEDD5',
  },
} satisfies Record<'dark' | 'light', TemaOrbitLink>;
/* === TEMAS ORBITLINK | fim === */

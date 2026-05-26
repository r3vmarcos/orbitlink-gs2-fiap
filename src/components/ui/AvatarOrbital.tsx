import { Zap } from 'lucide-react';

/* === AVATAR ORBITAL | inicio === */
interface AvatarOrbitalProps {
  gradiente: string;
  nome: string;
  tamanho?: 'sm' | 'md' | 'lg';
}

export function AvatarOrbital({ gradiente, nome, tamanho = 'md' }: AvatarOrbitalProps) {
  const classesTamanho = {
    sm: 'h-10 w-10',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
  }[tamanho];

  return (
    <div className={`${classesTamanho} flex shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${gradiente} shadow-neon`} title={nome}>
      <Zap className="h-1/2 w-1/2 text-white" />
    </div>
  );
}
/* === AVATAR ORBITAL | fim === */

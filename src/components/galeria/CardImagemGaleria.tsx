import { ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import type { ItemGaleria } from '@/types/orbitlink.types';

/* === CARD IMAGEM GALERIA | inicio === */
interface CardImagemGaleriaProps {
  item: ItemGaleria;
  onAbrir: (item: ItemGaleria) => void;
}

export function CardImagemGaleria({ item, onAbrir }: CardImagemGaleriaProps) {
  return (
    <button onClick={() => onAbrir(item)} className="group overflow-hidden rounded-[2rem] border border-blue-500/30 bg-slate-950/70 text-left shadow-soft light-theme:border-sky-200 light-theme:bg-white/80">
      <div className="overflow-hidden">
        <img src={item.imagem} alt={item.titulo} className="h-56 w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
      </div>
      <div className="space-y-3 p-4">
        <div className="flex items-center justify-between gap-3">
          <Badge tom={item.origemDados === 'nasa_images' ? 'laranja' : 'azul'}>{item.categoria}</Badge>
          <ExternalLink className="h-4 w-4 text-blue-300" />
        </div>
        <h3 className="line-clamp-2 text-lg font-black text-white light-theme:text-sky-950">{item.titulo}</h3>
        <p className="line-clamp-3 text-sm leading-6 text-slate-300 light-theme:text-slate-700">{item.descricao}</p>
      </div>
    </button>
  );
}
/* === CARD IMAGEM GALERIA | fim === */

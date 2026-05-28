import type { ItemGaleria } from '@/types/orbitlink.types';

/* === CARD IMAGEM GALERIA | inicio === */
interface CardImagemGaleriaProps {
  item: ItemGaleria;
  onAbrir: (item: ItemGaleria) => void;
}

export function CardImagemGaleria({ item, onAbrir }: CardImagemGaleriaProps) {
  return (
    <button onClick={() => onAbrir(item)} className="group relative aspect-square min-w-0 overflow-hidden rounded-xl border border-blue-500/30 bg-slate-950/70 text-left shadow-soft light-theme:border-sky-200 light-theme:bg-white/80 sm:rounded-2xl">
      <img src={item.imagem} alt={item.titulo} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/78 to-transparent p-2 sm:p-3">
        <p className="font-monoapp text-[8px] font-black uppercase tracking-[0.08em] text-cyan-100 sm:text-[10px]">#{item.categoria}</p>
        <h3 className="mt-0.5 line-clamp-2 text-[10px] font-black leading-tight text-white sm:text-sm">{item.titulo}</h3>
      </div>
    </button>
  );
}
/* === CARD IMAGEM GALERIA | fim === */

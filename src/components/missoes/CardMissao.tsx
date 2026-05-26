import { Clock, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Botao } from '@/components/ui/Botao';
import type { MissaoOrbitLink } from '@/types/orbitlink.types';

/* === CARD MISSAO | inicio === */
interface CardMissaoProps {
  missao: MissaoOrbitLink;
  onVerAr: (pontoId?: string) => void;
}

export function CardMissao({ missao, onVerAr }: CardMissaoProps) {
  return (
    <article className="rounded-[2rem] border border-blue-500/35 bg-slate-950/68 p-5 backdrop-blur-xl light-theme:border-sky-200 light-theme:bg-white/78">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="font-monoapp text-xs font-black uppercase tracking-[0.16em] text-blue-300 light-theme:text-sky-700">{missao.local}</p>
          <h3 className="mt-2 text-2xl font-black uppercase text-white light-theme:text-sky-950">{missao.nome}</h3>
        </div>
        <Badge tom={missao.status === 'em_andamento' ? 'verde' : 'azul'}>{missao.status.replaceAll('_', ' ')}</Badge>
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-300 light-theme:text-slate-700">{missao.descricao}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {missao.ods.map((ods) => <Badge key={ods} tom="verde">{ods}</Badge>)}
      </div>
      <div className="mt-4 space-y-3">
        {missao.linhaTempo.map((item) => (
          <div key={item.id} className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-3">
            <p className="flex items-center gap-2 font-monoapp text-[10px] font-black uppercase tracking-[0.14em] text-blue-300"><Clock className="h-3 w-3" /> {item.data}</p>
            <h4 className="mt-1 font-bold text-white light-theme:text-sky-950">{item.titulo}</h4>
            <p className="mt-1 text-sm text-slate-300 light-theme:text-slate-700">{item.descricao}</p>
          </div>
        ))}
      </div>
      <Botao className="mt-4 w-full" onClick={() => onVerAr(missao.pontoArId)}><MapPin className="h-4 w-4" /> Ver no AR</Botao>
    </article>
  );
}
/* === CARD MISSAO | fim === */

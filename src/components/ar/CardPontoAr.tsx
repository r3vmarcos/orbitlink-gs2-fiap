import { Eye, Radio, Star } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Botao } from '@/components/ui/Botao';
import { useOrbitLink } from '@/context/OrbitLinkContext';
import type { PontoAr } from '@/types/orbitlink.types';

/* === CARD PONTO AR | inicio === */
interface CardPontoArProps {
  ponto?: PontoAr;
  onVerPosts: (pontoId: string) => void;
  onVerStatus: (pontoId: string) => void;
}

export function CardPontoAr({ ponto, onVerPosts, onVerStatus }: CardPontoArProps) {
  const { pontosSeguidos, seguirPonto } = useOrbitLink();

  if (!ponto) {
    return (
      <section className="rounded-[1.5rem] border border-blue-500/35 bg-slate-950/74 p-4 backdrop-blur-xl light-theme:bg-white/80 sm:rounded-[2rem] sm:p-5">
        <p className="font-monoapp text-[11px] font-black uppercase tracking-[0.08em] text-blue-300 light-theme:text-sky-700 sm:text-xs sm:tracking-[0.18em]">Selecione um ponto</p>
        <p className="mt-3 text-sm leading-6 text-slate-300 light-theme:text-slate-700">Toque em um planeta, estação, cidade, bioma ou alerta para abrir detalhes sociais e dados simulados/API.</p>
      </section>
    );
  }

  const seguido = pontosSeguidos.includes(ponto.id);

  return (
    <section className="rounded-[1.5rem] border border-blue-500/35 bg-slate-950/82 p-4 shadow-neon backdrop-blur-xl light-theme:bg-white/86 sm:rounded-[2rem] sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-monoapp text-[11px] font-black uppercase tracking-[0.08em] text-blue-300 light-theme:text-sky-700 sm:text-xs sm:tracking-[0.18em]">{ponto.tipo.replaceAll('_', ' ')}</p>
          <h2 className="mt-2 text-xl font-black uppercase leading-tight text-white light-theme:text-sky-950 sm:text-2xl">{ponto.nome}</h2>
        </div>
        {ponto.statusAtivo ? <Badge tom="laranja">Status ativo</Badge> : null}
      </div>
      {ponto.imagem ? (
        <div className="mt-4 overflow-hidden rounded-2xl">
          <img src={ponto.imagem} alt={ponto.nome} className="block h-36 w-[180%] max-w-none -translate-x-[22.222%] object-cover object-center" loading="lazy" />
          {(ponto.imagemCredito || ponto.imagemFonte) ? (
            <p className="bg-slate-950/70 px-3 py-1.5 text-[10px] font-semibold text-slate-300 light-theme:bg-white/80 light-theme:text-slate-600">
              Imagem: {ponto.imagemCredito ?? 'curadoria OrbitLink'}{ponto.imagemFonte ? ` · ${ponto.imagemFonte}` : ''}
            </p>
          ) : null}
        </div>
      ) : null}
      <p className="mt-3 text-sm leading-6 text-slate-300 light-theme:text-slate-700">{ponto.descricao}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {ponto.ods.map((ods) => <Badge key={ods} tom="verde">{ods}</Badge>)}
        <Badge tom={ponto.origemDados === 'nasa_eonet' ? 'laranja' : 'azul'}>{ponto.origemDados}</Badge>
      </div>
      <div className="mt-4 grid gap-2">
        {ponto.dadosResumo.map((dado) => (
          <div key={dado} className="rounded-2xl border border-blue-500/20 bg-blue-500/5 px-4 py-3 text-sm text-slate-200 light-theme:text-slate-700">
            {dado}
          </div>
        ))}
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2">
        <Botao tamanho="sm" onClick={() => onVerPosts(ponto.id)}><Eye className="h-4 w-4" /> Posts</Botao>
        <Botao tamanho="sm" variante="secundario" onClick={() => onVerStatus(ponto.id)}><Radio className="h-4 w-4" /> Status</Botao>
        <Botao tamanho="sm" variante={seguido ? 'primario' : 'secundario'} onClick={() => seguirPonto(ponto.id)}><Star className="h-4 w-4" /> {seguido ? 'Seguindo' : 'Seguir'}</Botao>
      </div>
    </section>
  );
}
/* === CARD PONTO AR | fim === */

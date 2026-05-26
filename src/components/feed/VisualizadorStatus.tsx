import { Heart, MapPin, MessageCircle } from 'lucide-react';
import { Botao } from '@/components/ui/Botao';
import { Modal } from '@/components/ui/Modal';
import { useOrbitLink } from '@/context/OrbitLinkContext';
import type { StatusOrbital } from '@/types/orbitlink.types';
import { calcularHorasRestantes, calcularProgressoStatus } from '@/utils/formatadores';

/* === VISUALIZADOR DE STATUS | inicio === */
interface VisualizadorStatusProps {
  status?: StatusOrbital;
  onFechar: () => void;
  onVerAr: (pontoId?: string) => void;
}

export function VisualizadorStatus({ status, onFechar, onVerAr }: VisualizadorStatusProps) {
  const { usuarios, pontosAr, imagemEpic } = useOrbitLink();

  if (!status) {
    return null;
  }

  const autor = usuarios.find((usuario) => usuario.id === status.autorId) ?? usuarios[0];
  const ponto = pontosAr.find((pontoAr) => pontoAr.id === status.pontoArId);
  const progresso = calcularProgressoStatus(status.criadoEm, status.expiraEm);
  const imagem = status.tipo === 'camera_orbital' && imagemEpic?.imagem ? imagemEpic.imagem : status.imagem;

  return (
    <Modal aberto={Boolean(status)} titulo={`${status.titulo} · ${calcularHorasRestantes(status.expiraEm)}h restantes`} onFechar={onFechar} telaCheiaMobile>
      <div className="relative min-h-[72dvh] overflow-hidden rounded-[2rem] border border-blue-500/25 bg-slate-900">
        {imagem ? <img src={imagem} alt={status.titulo} className="absolute inset-0 h-full w-full object-cover" /> : null}
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/20 to-black/90" />
        <div className="absolute left-4 right-4 top-4 h-1 rounded-full bg-white/20">
          <div className="h-1 rounded-full bg-blue-400" style={{ width: `${progresso}%` }} />
        </div>
        <div className="relative z-10 flex min-h-[72dvh] flex-col justify-between p-5">
          <div>
            <p className="font-monoapp text-xs font-black uppercase tracking-[0.16em] text-blue-200">{autor.nome} · {status.tipo.replaceAll('_', ' ')}</p>
            <h2 className="mt-2 max-w-xl text-3xl font-black uppercase tracking-[0.02em] text-white md:text-5xl">{status.titulo}</h2>
            {ponto ? <p className="mt-2 text-sm font-bold text-blue-100">Ponto AR: {ponto.nome}</p> : null}
          </div>
          <div className="rounded-[1.5rem] border border-white/15 bg-black/45 p-4 backdrop-blur-md">
            <p className="text-lg leading-7 text-white">{status.texto}</p>
            {imagemEpic && status.tipo === 'camera_orbital' ? (
              <p className="mt-3 text-xs text-blue-100">Fonte visual sincronizada: {imagemEpic.origem}</p>
            ) : null}
            <div className="mt-4 flex flex-wrap gap-2">
              <Botao variante="secundario" tamanho="sm"><Heart className="h-4 w-4" /> Curtir</Botao>
              <Botao variante="secundario" tamanho="sm"><MessageCircle className="h-4 w-4" /> Responder</Botao>
              <Botao tamanho="sm" onClick={() => onVerAr(status.pontoArId)}><MapPin className="h-4 w-4" /> Ver no AR</Botao>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
/* === VISUALIZADOR DE STATUS | fim === */

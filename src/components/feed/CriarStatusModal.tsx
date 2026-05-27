import { Camera, Send } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Botao } from '@/components/ui/Botao';
import { Modal } from '@/components/ui/Modal';
import { useOrbitLink } from '@/context/OrbitLinkContext';
import type { StatusOrbital, TipoPerspectiva } from '@/types/orbitlink.types';

/* === MODAL CRIAR STATUS | inicio === */
interface CriarStatusModalProps {
  aberto: boolean;
  onFechar: () => void;
}

export function CriarStatusModal({ aberto, onFechar }: CriarStatusModalProps) {
  const { pontosAr, criarStatus } = useOrbitLink();
  const [titulo, setTitulo] = useState('');
  const [texto, setTexto] = useState('');
  const [imagem, setImagem] = useState<string | undefined>();
  const [tipo, setTipo] = useState<StatusOrbital['tipo']>('texto');
  const [localStatus, setLocalStatus] = useState<TipoPerspectiva>('terra');
  const [pontoArId, setPontoArId] = useState<string>('');

  const pontosDisponiveis = useMemo(() => pontosAr.filter((ponto) => ponto.perspectiva === localStatus), [localStatus, pontosAr]);

  async function handleImagem(arquivo?: File) {
    if (!arquivo) {
      return;
    }

    if (arquivo.size > 1_600_000) {
      alert('Imagem muito grande. Use uma imagem com até 1,6 MB para salvar no localStorage.');
      return;
    }

    const leitor = new FileReader();
    leitor.onload = () => setImagem(String(leitor.result));
    leitor.readAsDataURL(arquivo);
  }

  function handlePublicar() {
    if (!titulo.trim() || !texto.trim()) {
      alert('Preencha título e texto do status.');
      return;
    }

    criarStatus({
      titulo: titulo.trim(),
      texto: texto.trim(),
      imagem,
      perspectiva: localStatus,
      tipo,
      pontoArId: pontoArId || undefined,
    });

    setTitulo('');
    setTexto('');
    setImagem(undefined);
    setPontoArId('');
    onFechar();
  }

  return (
    <Modal aberto={aberto} titulo="Criar Status Orbitlink 24h" onFechar={onFechar} telaCheiaMobile>
      <div className="grid gap-5 lg:grid-cols-[1.15fr_.85fr]">
        <div className="space-y-4">
          <label className="block">
            <span className="label-form">Título *</span>
            <input value={titulo} onChange={(evento) => setTitulo(evento.target.value)} className="input-form" placeholder="Ex.: Câmera orbital da noite" />
          </label>
          <label className="block">
            <span className="label-form">Texto *</span>
            <textarea value={texto} onChange={(evento) => setTexto(evento.target.value)} className="input-form min-h-36 resize-y" placeholder="Esse status ficará disponível por 24h..." />
          </label>
          <label className="block">
            <span className="label-form">Imagem opcional</span>
            <input type="file" accept="image/png,image/jpeg,image/jpg,image/webp" onChange={(evento) => void handleImagem(evento.target.files?.[0])} className="w-full rounded-2xl border border-[var(--border-border)] bg-[var(--bg-muted)] p-3 text-xs text-[var(--text-muted)] file:mr-3 file:rounded-xl file:border-0 file:bg-[var(--bg-primary)] file:px-3 file:py-2 file:font-bold file:text-[var(--text-primary)]" />
          </label>
          {imagem ? <img src={imagem} alt="Preview do status" className="max-h-64 w-full rounded-[1.5rem] object-cover" /> : <div className="flex min-h-48 items-center justify-center rounded-[1.5rem] border border-dashed border-[var(--border-border)] text-[var(--text-muted)]"><Camera className="mr-2 h-5 w-5" /> Preview do status</div>}
        </div>

        <div className="space-y-4 rounded-[1.5rem] border border-[var(--border-border)] bg-[var(--bg-muted)] p-4">
          <label className="block">
            <span className="label-form">Tipo de status</span>
            <select value={tipo} onChange={(evento) => setTipo(evento.target.value as StatusOrbital['tipo'])} className="input-form">
              <option value="texto">Texto</option>
              <option value="imagem">Imagem</option>
              <option value="camera_orbital">Câmera orbital simulada</option>
              <option value="registro_ar">Registro AR</option>
              <option value="alerta">Alerta</option>
              <option value="missao">Missão</option>
            </select>
          </label>
          <div>
            <span className="label-form">Onde você está?</span>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => setLocalStatus('terra')} className={`rounded-2xl border px-3 py-3 text-xs font-black uppercase tracking-[0.1em] ${localStatus === 'terra' ? 'border-[var(--bg-primary)] bg-[var(--bg-primary)] text-[var(--text-primary)]' : 'border-[var(--border-border)] text-[var(--text-muted)]'}`}>
                Terra
              </button>
              <button onClick={() => setLocalStatus('espaco')} className={`rounded-2xl border px-3 py-3 text-xs font-black uppercase tracking-[0.1em] ${localStatus === 'espaco' ? 'border-[var(--bg-primary)] bg-[var(--bg-primary)] text-[var(--text-primary)]' : 'border-[var(--border-border)] text-[var(--text-muted)]'}`}>
                Céu
              </button>
            </div>
          </div>
          <label className="block">
            <span className="label-form">Ponto AR vinculado</span>
            <select value={pontoArId} onChange={(evento) => setPontoArId(evento.target.value)} className="input-form">
              <option value="">Sem ponto vinculado</option>
              {pontosDisponiveis.map((ponto) => <option key={ponto.id} value={ponto.id}>{ponto.nome}</option>)}
            </select>
          </label>
          <div className="rounded-2xl border border-[var(--border-border)] bg-[var(--bg-surface)] p-4 text-sm leading-6 text-[var(--text-muted)]">
            O status aparece para todos na Orbitlink e registra se você publicou da Terra ou do céu.
          </div>
          <div className="flex gap-3">
            <Botao variante="fantasma" onClick={onFechar} className="flex-1">Cancelar</Botao>
            <Botao onClick={handlePublicar} className="flex-1"><Send className="h-4 w-4" /> Publicar</Botao>
          </div>
        </div>
      </div>
    </Modal>
  );
}
/* === MODAL CRIAR STATUS | fim === */

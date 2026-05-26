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
  const { perspectiva, pontosAr, criarStatus } = useOrbitLink();
  const [titulo, setTitulo] = useState('');
  const [texto, setTexto] = useState('');
  const [imagem, setImagem] = useState<string | undefined>();
  const [tipo, setTipo] = useState<StatusOrbital['tipo']>('texto');
  const [perspectivaForm, setPerspectivaForm] = useState<TipoPerspectiva>(perspectiva);
  const [pontoArId, setPontoArId] = useState<string>('');

  const pontosDisponiveis = useMemo(() => pontosAr.filter((ponto) => ponto.perspectiva === perspectivaForm), [pontosAr, perspectivaForm]);

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
      perspectiva: perspectivaForm,
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
    <Modal aberto={aberto} titulo="Criar Status Orbital 24h" onFechar={onFechar} telaCheiaMobile>
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
            <input type="file" accept="image/png,image/jpeg,image/jpg,image/webp" onChange={(evento) => void handleImagem(evento.target.files?.[0])} className="w-full rounded-2xl border border-blue-500/30 bg-blue-500/5 p-3 text-xs text-blue-200 file:mr-3 file:rounded-xl file:border-0 file:bg-blue-500 file:px-3 file:py-2 file:font-bold file:text-slate-950 light-theme:text-sky-900" />
          </label>
          {imagem ? <img src={imagem} alt="Preview do status" className="max-h-64 w-full rounded-[1.5rem] object-cover" /> : <div className="flex min-h-48 items-center justify-center rounded-[1.5rem] border border-dashed border-blue-400/40 text-blue-200"><Camera className="mr-2 h-5 w-5" /> Preview do status</div>}
        </div>

        <div className="space-y-4 rounded-[1.5rem] border border-blue-500/25 bg-blue-500/5 p-4">
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
          <label className="block">
            <span className="label-form">Perspectiva</span>
            <select value={perspectivaForm} onChange={(evento) => setPerspectivaForm(evento.target.value as TipoPerspectiva)} className="input-form">
              <option value="terra">Terra olhando para o espaço</option>
              <option value="espaco">Espaço olhando para a Terra</option>
            </select>
          </label>
          <label className="block">
            <span className="label-form">Ponto AR vinculado</span>
            <select value={pontoArId} onChange={(evento) => setPontoArId(evento.target.value)} className="input-form">
              <option value="">Sem ponto vinculado</option>
              {pontosDisponiveis.map((ponto) => <option key={ponto.id} value={ponto.id}>{ponto.nome}</option>)}
            </select>
          </label>
          <div className="rounded-2xl border border-blue-500/25 bg-slate-900/50 p-4 text-sm leading-6 text-slate-300 light-theme:bg-white/70 light-theme:text-slate-700">
            O Status Orbital expira automaticamente em 24h e destaca o ponto AR relacionado, criando uma experiência parecida com stories/status dentro da rede espacial.
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

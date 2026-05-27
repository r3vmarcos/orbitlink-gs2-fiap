import { ImagePlus, Send } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Botao } from '@/components/ui/Botao';
import { Modal } from '@/components/ui/Modal';
import { useOrbitLink } from '@/context/OrbitLinkContext';
import type { TipoCategoriaPost, TipoOds, TipoPerspectiva } from '@/types/orbitlink.types';

/* === MODAL CRIAR POST | inicio === */
interface CriarPostModalProps {
  aberto: boolean;
  onFechar: () => void;
}

const categoriasPorLocal: Record<TipoPerspectiva, TipoCategoriaPost[]> = {
  terra: ['diario_orbital', 'missao', 'estacao', 'lua', 'satelite', 'evento', 'cidade', 'comunidade', 'clima', 'ods'],
  espaco: ['diario_orbital', 'missao', 'estacao', 'lua', 'satelite', 'evento', 'cidade', 'turismo', 'comunidade', 'clima', 'bioma', 'ods'],
};
const opcoesOds: TipoOds[] = ['ODS 2', 'ODS 8', 'ODS 9', 'ODS 11', 'ODS 13'];

export function CriarPostModal({ aberto, onFechar }: CriarPostModalProps) {
  const { pontosAr, criarPost } = useOrbitLink();
  const [titulo, setTitulo] = useState('');
  const [texto, setTexto] = useState('');
  const [imagem, setImagem] = useState<string | undefined>();
  const [localPostagem, setLocalPostagem] = useState<TipoPerspectiva>('terra');
  const [categoria, setCategoria] = useState<TipoCategoriaPost>('diario_orbital');
  const [pontoArId, setPontoArId] = useState<string>('');
  const [odsSelecionado, setOdsSelecionado] = useState<TipoOds>('ODS 13');

  const pontosDisponiveis = useMemo(() => pontosAr.filter((ponto) => ponto.perspectiva === localPostagem), [localPostagem, pontosAr]);
  const categorias = categoriasPorLocal[localPostagem];

  function limparFormulario() {
    setTitulo('');
    setTexto('');
    setImagem(undefined);
    setPontoArId('');
  }

  function handleLocalPostagem(novoLocal: TipoPerspectiva) {
    setLocalPostagem(novoLocal);
    setCategoria(categoriasPorLocal[novoLocal][0]);
    setPontoArId('');
  }

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
      alert('Preencha título e texto da publicação.');
      return;
    }

    criarPost({
      titulo: titulo.trim(),
      texto: texto.trim(),
      imagem,
      perspectiva: localPostagem,
      categoria,
      pontoArId: pontoArId || undefined,
      ods: [odsSelecionado],
    });

    limparFormulario();
    onFechar();
  }

  return (
    <Modal aberto={aberto} titulo="Nova publicação Orbitlink" onFechar={onFechar} telaCheiaMobile>
      <div className="grid gap-5 lg:grid-cols-[1.2fr_.8fr]">
        <div className="space-y-4">
          <label className="block">
            <span className="label-form">Título *</span>
            <input value={titulo} onChange={(evento) => setTitulo(evento.target.value)} className="input-form" placeholder="Ex.: Passagem sobre a América do Sul" />
          </label>
          <label className="block">
            <span className="label-form">Texto *</span>
            <textarea value={texto} onChange={(evento) => setTexto(evento.target.value)} className="input-form min-h-36 resize-y" placeholder="Compartilhe uma experiência, observação, foto, cidade, missão ou alerta..." />
          </label>
          <label className="block">
            <span className="label-form">Imagem opcional</span>
            <div className="flex items-center gap-3 rounded-2xl border border-[var(--border-border)] bg-[var(--bg-muted)] p-3">
              <ImagePlus className="h-5 w-5 text-[var(--text-link)]" />
              <input type="file" accept="image/png,image/jpeg,image/jpg,image/webp" onChange={(evento) => void handleImagem(evento.target.files?.[0])} className="w-full text-xs text-[var(--text-muted)] file:mr-3 file:rounded-xl file:border-0 file:bg-[var(--bg-primary)] file:px-3 file:py-2 file:font-bold file:text-[var(--text-primary)]" />
            </div>
          </label>
          {imagem ? <img src={imagem} alt="Preview da publicação" className="max-h-64 w-full rounded-[1.5rem] object-cover" /> : null}
        </div>

        <div className="space-y-4 rounded-[1.5rem] border border-[var(--border-border)] bg-[var(--bg-muted)] p-4">
          <div>
            <span className="label-form">Onde você está postando?</span>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => handleLocalPostagem('terra')} className={`rounded-2xl border px-3 py-3 text-xs font-black uppercase tracking-[0.1em] ${localPostagem === 'terra' ? 'border-[var(--bg-primary)] bg-[var(--bg-primary)] text-[var(--text-primary)]' : 'border-[var(--border-border)] text-[var(--text-muted)]'}`}>
                Estou na Terra
              </button>
              <button onClick={() => handleLocalPostagem('espaco')} className={`rounded-2xl border px-3 py-3 text-xs font-black uppercase tracking-[0.1em] ${localPostagem === 'espaco' ? 'border-[var(--bg-primary)] bg-[var(--bg-primary)] text-[var(--text-primary)]' : 'border-[var(--border-border)] text-[var(--text-muted)]'}`}>
                Estou no céu
              </button>
            </div>
          </div>
          <label className="block">
            <span className="label-form">Categoria *</span>
            <select value={categoria} onChange={(evento) => setCategoria(evento.target.value as TipoCategoriaPost)} className="input-form">
              {categorias.map((opcao) => <option key={opcao} value={opcao}>{opcao.replaceAll('_', ' ')}</option>)}
            </select>
          </label>
          <label className="block">
            <span className="label-form">Ponto AR vinculado</span>
            <select value={pontoArId} onChange={(evento) => setPontoArId(evento.target.value)} className="input-form">
              <option value="">Sem ponto vinculado</option>
              {pontosDisponiveis.map((ponto) => <option key={ponto.id} value={ponto.id}>{ponto.nome}</option>)}
            </select>
          </label>
          <label className="block">
            <span className="label-form">ODS relacionado</span>
            <select value={odsSelecionado} onChange={(evento) => setOdsSelecionado(evento.target.value as TipoOds)} className="input-form">
              {opcoesOds.map((opcao) => <option key={opcao} value={opcao}>{opcao}</option>)}
            </select>
          </label>
          <div className="rounded-2xl border border-[var(--border-border)] bg-[var(--bg-surface)] p-4 text-sm leading-6 text-[var(--text-muted)]">
            A publicação será exibida para todos no Orbifeed. O local escolhido aparece no post como “postado da Terra” ou “postado do céu”.
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
/* === MODAL CRIAR POST | fim === */

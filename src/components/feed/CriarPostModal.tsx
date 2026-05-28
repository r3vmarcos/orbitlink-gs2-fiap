import { Camera, ImagePlus, Send } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Botao } from '@/components/ui/Botao';
import { Modal } from '@/components/ui/Modal';
import { useOrbitLink } from '@/context/OrbitLinkContext';
import type { StatusOrbital, TipoCategoriaPost, TipoOds, TipoPerspectiva } from '@/types/orbitlink.types';

/* === MODAL CRIAR POST | inicio === */
interface CriarPostModalProps {
  aberto: boolean;
  onFechar: () => void;
  abaInicial?: 'post' | 'status';
}

const categoriasPorLocal: Record<TipoPerspectiva, TipoCategoriaPost[]> = {
  terra: ['diario_orbital', 'missao', 'estacao', 'lua', 'satelite', 'evento', 'cidade', 'comunidade', 'clima', 'ods'],
  espaco: ['diario_orbital', 'missao', 'estacao', 'lua', 'satelite', 'evento', 'cidade', 'turismo', 'comunidade', 'clima', 'bioma', 'ods'],
};
const opcoesOds: TipoOds[] = ['ODS 2', 'ODS 8', 'ODS 9', 'ODS 11', 'ODS 13'];
const tamanhoMaximoImagemMb = 4;
const tamanhoMaximoImagemBytes = tamanhoMaximoImagemMb * 1024 * 1024;

export function CriarPostModal({ aberto, onFechar, abaInicial = 'post' }: CriarPostModalProps) {
  const { pontosAr, criarPost, criarStatus, usuarioAtual } = useOrbitLink();
  const [aba, setAba] = useState<'post' | 'status'>(abaInicial);
  const [titulo, setTitulo] = useState('');
  const [texto, setTexto] = useState('');
  const [imagem, setImagem] = useState<string | undefined>();
  const [localId, setLocalId] = useState<string>('local_usuario');
  const [categoria, setCategoria] = useState<TipoCategoriaPost>('diario_orbital');
  const [odsSelecionado, setOdsSelecionado] = useState<TipoOds>('ODS 13');
  const [tipoStatus, setTipoStatus] = useState<StatusOrbital['tipo']>('texto');

  const pontoSelecionado = pontosAr.find((ponto) => ponto.id === localId);
  const perspectivaAtual: TipoPerspectiva = pontoSelecionado?.perspectiva ?? 'terra';
  const categorias = categoriasPorLocal[perspectivaAtual];
  const locais = useMemo(() => [
    { id: 'local_usuario', nome: usuarioAtual?.localizacaoAtual ?? 'São Paulo, Brasil', perspectiva: 'terra' as TipoPerspectiva },
    ...pontosAr.map((ponto) => ({ id: ponto.id, nome: ponto.nome, perspectiva: ponto.perspectiva })),
  ], [pontosAr, usuarioAtual?.localizacaoAtual]);

  useEffect(() => {
    if (aberto) {
      setAba(abaInicial);
    }
  }, [abaInicial, aberto]);

  useEffect(() => {
    if (!categorias.includes(categoria)) {
      setCategoria(categorias[0]);
    }
  }, [categoria, categorias]);

  function limparFormulario() {
    setTitulo('');
    setTexto('');
    setImagem(undefined);
    setLocalId('local_usuario');
    setTipoStatus('texto');
  }

  async function handleImagem(arquivo?: File) {
    if (!arquivo) {
      return;
    }

    if (arquivo.size > tamanhoMaximoImagemBytes) {
      alert(`Imagem muito grande. Use uma imagem com até ${tamanhoMaximoImagemMb} MB.`);
      return;
    }

    const leitor = new FileReader();
    leitor.onload = () => setImagem(String(leitor.result));
    leitor.readAsDataURL(arquivo);
  }

  function validarCampos() {
    if (!titulo.trim() || !texto.trim()) {
      alert('Preencha título e texto.');
      return false;
    }

    return true;
  }

  function handlePublicarPost() {
    if (!validarCampos()) {
      return;
    }

    criarPost({
      titulo: titulo.trim(),
      texto: texto.trim(),
      imagem,
      perspectiva: perspectivaAtual,
      categoria,
      pontoArId: pontoSelecionado?.id,
      ods: [odsSelecionado],
    });

    limparFormulario();
    onFechar();
  }

  function handlePublicarStatus() {
    if (!validarCampos()) {
      return;
    }

    criarStatus({
      titulo: titulo.trim(),
      texto: texto.trim(),
      imagem,
      perspectiva: perspectivaAtual,
      tipo: tipoStatus,
      pontoArId: pontoSelecionado?.id,
    });

    limparFormulario();
    onFechar();
  }

  return (
    <Modal aberto={aberto} titulo="Publicar na Orbitlink" onFechar={onFechar} telaCheiaMobile>
      <div className="mb-4 grid grid-cols-2 gap-2 rounded-2xl border border-[var(--border-border)] bg-[var(--bg-muted)] p-1">
        <button onClick={() => setAba('post')} className={`rounded-xl px-3 py-2 text-xs font-black uppercase ${aba === 'post' ? 'bg-[var(--bg-primary)] text-[var(--text-primary)]' : 'text-[var(--text-muted)]'}`}>Post</button>
        <button onClick={() => setAba('status')} className={`rounded-xl px-3 py-2 text-xs font-black uppercase ${aba === 'status' ? 'bg-[var(--bg-primary)] text-[var(--text-primary)]' : 'text-[var(--text-muted)]'}`}>Status</button>
      </div>

      <div className="grid min-w-0 gap-4 lg:grid-cols-[1.2fr_.8fr] lg:gap-5">
        <div className="space-y-4">
          <label className="block">
            <span className="label-form">Título *</span>
            <input value={titulo} onChange={(evento) => setTitulo(evento.target.value)} className="input-form" placeholder={aba === 'post' ? 'Ex.: Passagem sobre São Paulo' : 'Ex.: Câmera orbital da noite'} />
          </label>
          <label className="block">
            <span className="label-form">Texto *</span>
            <textarea value={texto} onChange={(evento) => setTexto(evento.target.value)} className="input-form min-h-36 resize-y" placeholder="Compartilhe uma experiência, observação, foto, cidade, missão ou alerta..." />
          </label>
          <label className="block">
            <span className="label-form">Imagem opcional</span>
            <div className="flex min-w-0 items-center gap-3 rounded-2xl border border-[var(--border-border)] bg-[var(--bg-muted)] p-3">
              <ImagePlus className="h-5 w-5 shrink-0 text-[var(--text-link)]" />
              <input type="file" accept="image/png,image/jpeg,image/jpg,image/webp" onChange={(evento) => void handleImagem(evento.target.files?.[0])} className="min-w-0 w-full text-xs text-[var(--text-muted)] file:mb-2 file:mr-3 file:rounded-xl file:border-0 file:bg-[var(--bg-primary)] file:px-3 file:py-2 file:font-bold file:text-[var(--text-primary)] min-[420px]:file:mb-0" />
            </div>
            <span className="mt-2 block text-xs leading-5 text-[var(--text-muted)]">PNG, JPG ou WebP até {tamanhoMaximoImagemMb} MB. Fotos muito grandes precisam ser reduzidas antes do envio.</span>
          </label>
          {imagem ? <img src={imagem} alt="Prévia da publicação" className="max-h-64 w-full rounded-[1.5rem] object-cover" /> : aba === 'status' ? <div className="flex min-h-48 items-center justify-center rounded-[1.5rem] border border-dashed border-[var(--border-border)] text-[var(--text-muted)]"><Camera className="mr-2 h-5 w-5" /> Prévia do status</div> : null}
        </div>

        <div className="space-y-4 rounded-[1.5rem] border border-[var(--border-border)] bg-[var(--bg-muted)] p-4">
          <label className="block">
            <span className="label-form">Local da publicação</span>
            <select value={localId} onChange={(evento) => setLocalId(evento.target.value)} className="input-form">
              {locais.map((local) => <option key={local.id} value={local.id}>{local.id === 'local_usuario' ? `Meu local atual - ${local.nome}` : `${local.nome} - ${local.perspectiva === 'terra' ? 'Terra' : 'Espaço'}`}</option>)}
            </select>
          </label>
          {aba === 'post' ? (
            <>
              <label className="block">
                <span className="label-form">Categoria *</span>
                <select value={categoria} onChange={(evento) => setCategoria(evento.target.value as TipoCategoriaPost)} className="input-form">
                  {categorias.map((opcao) => <option key={opcao} value={opcao}>{opcao.replaceAll('_', ' ')}</option>)}
                </select>
              </label>
              <label className="block">
                <span className="label-form">ODS relacionado</span>
                <select value={odsSelecionado} onChange={(evento) => setOdsSelecionado(evento.target.value as TipoOds)} className="input-form">
                  {opcoesOds.map((opcao) => <option key={opcao} value={opcao}>{opcao}</option>)}
                </select>
              </label>
            </>
          ) : (
            <label className="block">
              <span className="label-form">Tipo de status</span>
              <select value={tipoStatus} onChange={(evento) => setTipoStatus(evento.target.value as StatusOrbital['tipo'])} className="input-form">
                <option value="texto">Texto</option>
                <option value="imagem">Imagem</option>
                <option value="camera_orbital">Câmera orbital simulada</option>
                <option value="registro_ar">Registro AR</option>
                <option value="alerta">Alerta</option>
                <option value="missao">Missão</option>
              </select>
            </label>
          )}
          <div className="rounded-2xl border border-[var(--border-border)] bg-[var(--bg-surface)] p-3 text-sm leading-6 text-[var(--text-muted)]">
            <p className="font-bold text-[var(--text-text)]">{pontoSelecionado ? pontoSelecionado.nome : 'Meu local atual'}</p>
            <p>{pontoSelecionado ? pontoSelecionado.descricao : `Publicando de ${usuarioAtual?.localizacaoAtual ?? 'São Paulo, Brasil'}. Use os outros locais quando a publicação estiver conectada a um mark, missão ou ponto AR.`}</p>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            <Botao variante="fantasma" onClick={onFechar} className="flex-1">Cancelar</Botao>
            <Botao onClick={aba === 'post' ? handlePublicarPost : handlePublicarStatus} className="flex-1"><Send className="h-4 w-4" /> Publicar</Botao>
          </div>
        </div>
      </div>
    </Modal>
  );
}
/* === MODAL CRIAR POST | fim === */

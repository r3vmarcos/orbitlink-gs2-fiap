import { Camera, UserPlus } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Badge } from '@/components/ui/Badge';
import { Botao } from '@/components/ui/Botao';
import { Modal } from '@/components/ui/Modal';
import type { UsuarioOrbitLink } from '@/types/orbitlink.types';
import { formatarNumeroCompacto } from '@/utils/formatadores';

/* === CARD PERFIL | inicio === */
export function CardPerfil({ usuario, destaque = false, onAlterarFoto }: { usuario: UsuarioOrbitLink; destaque?: boolean; onAlterarFoto?: (foto: string) => void }) {
  const foto = usuario.fotoPerfil ?? `https://i.pravatar.cc/240?u=${usuario.id}`;
  const bio = criarBioUsuario(usuario);
  const [modalConquistasAberto, setModalConquistasAberto] = useState(false);
  const [conquistasAtivas, setConquistasAtivas] = useState<string[]>(usuario.conquistas);
  const conquistasSelecionadas = useMemo(() => usuario.conquistas.filter((conquista) => conquistasAtivas.includes(conquista)), [conquistasAtivas, usuario.conquistas]);
  const conquistasVisiveis = conquistasSelecionadas.slice(0, 3);
  const quantidadeOculta = Math.max(0, conquistasSelecionadas.length - conquistasVisiveis.length);

  function handleFoto(arquivo?: File) {
    if (!arquivo || !onAlterarFoto) return;
    const leitor = new FileReader();
    leitor.onload = () => onAlterarFoto(String(leitor.result));
    leitor.readAsDataURL(arquivo);
  }

  return (
    <article className={`max-w-full overflow-hidden rounded-[1.5rem] border bg-slate-950/68 p-4 backdrop-blur-xl light-theme:bg-white/78 sm:p-5 ${destaque ? 'border-[var(--border-focus)] shadow-neon' : 'border-blue-500/35 light-theme:border-sky-200'}`}>
      <div className="flex items-center gap-4">
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-[var(--border-border)]">
          <img src={foto} alt={usuario.nome} className="h-full w-full object-cover" loading="lazy" />
          {onAlterarFoto ? (
            <label className="absolute inset-x-0 bottom-0 flex cursor-pointer items-center justify-center bg-black/55 py-1 text-white">
              <Camera className="h-3.5 w-3.5" />
              <input type="file" accept="image/png,image/jpeg,image/jpg,image/webp" className="hidden" onChange={(evento) => handleFoto(evento.target.files?.[0])} />
            </label>
          ) : null}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-lg font-black text-white light-theme:text-sky-950 sm:text-xl">{usuario.nome}</h3>
          <p className="truncate font-monoapp text-[10px] font-black uppercase tracking-[0.08em] text-blue-300 light-theme:text-sky-700 sm:tracking-[0.14em]">{usuario.usuario}</p>
        </div>
      </div>
      <p className="mt-4 text-sm leading-6 text-slate-300 light-theme:text-slate-700">{usuario.cargo} - {usuario.localizacaoAtual}</p>
      <p className="mt-3 text-sm leading-6 text-slate-300 light-theme:text-slate-700">{bio}</p>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <div className="min-w-0 rounded-2xl border border-blue-500/20 bg-blue-500/5 p-2.5">
          <p className="text-lg font-black text-white light-theme:text-sky-950">{formatarNumeroCompacto(usuario.seguidores)}</p>
          <p className="truncate font-monoapp text-[9px] uppercase tracking-[0.08em] text-blue-300">seguidores</p>
        </div>
        <div className="min-w-0 rounded-2xl border border-blue-500/20 bg-blue-500/5 p-2.5">
          <p className="text-lg font-black text-white light-theme:text-sky-950">{usuario.publicacoes}</p>
          <p className="truncate font-monoapp text-[9px] uppercase tracking-[0.08em] text-blue-300">posts</p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        {conquistasVisiveis.map((conquista) => <Badge key={conquista} tom="roxo">{conquista}</Badge>)}
        {quantidadeOculta > 0 ? (
          <button onClick={() => setModalConquistasAberto(true)} className="rounded-full border border-[var(--border-border)] px-3 py-1.5 text-xs font-black text-[var(--text-link)]">
            + mais {quantidadeOculta}
          </button>
        ) : null}
      </div>
      {destaque ? (
        <div className="mt-4 rounded-2xl border border-[var(--border-border)] bg-[var(--bg-muted)] p-3 text-xs leading-5 text-[var(--text-muted)]">
          <p className="font-black uppercase text-[var(--text-text)]">Temas preferidos</p>
          <p>Dark [Tema] [Paleta]</p>
          <p>Light [Tema] [Paleta]</p>
        </div>
      ) : null}
      {!destaque ? <Botao className="mt-4 w-full" variante="secundario"><UserPlus className="h-4 w-4" /> Seguir</Botao> : null}

      <Modal aberto={modalConquistasAberto} titulo="Conquistas do perfil" onFechar={() => setModalConquistasAberto(false)}>
        <div className="grid gap-2">
          {usuario.conquistas.map((conquista) => (
            <label key={conquista} className="flex cursor-pointer items-center gap-3 rounded-2xl border border-[var(--border-border)] bg-[var(--bg-muted)] p-3 text-sm font-bold text-[var(--text-text)]">
              <input
                type="checkbox"
                checked={conquistasAtivas.includes(conquista)}
                onChange={() => setConquistasAtivas((atuais) => atuais.includes(conquista) ? atuais.filter((item) => item !== conquista) : [...atuais, conquista])}
                className="h-4 w-4 accent-[var(--bg-primary)]"
              />
              {conquista}
            </label>
          ))}
        </div>
      </Modal>
    </article>
  );
}

function criarBioUsuario(usuario: UsuarioOrbitLink) {
  const bios: Record<string, string> = {
    astronauta: 'Compartilha rotina orbital, bastidores de missão e registros para aproximar ciência espacial da comunidade.',
    cientista: 'Transforma dados de clima, satélites e observação terrestre em publicações simples para o Orbifeed.',
    turista_espacial: 'Registra experiências de viagem, pontos turísticos e a sensação de ver a Terra por outro ângulo.',
    comunidade_terra: 'Leva relatos locais, fotos e alertas ambientais para conectar a superfície com quem observa do espaço.',
    observador_terra: 'Acompanha o céu, passagens orbitais e eventos astronômicos para alimentar os marks em tempo real.',
    estacao_espacial: 'Perfil institucional com status, diários técnicos e atualizações de infraestrutura orbital.',
    missao: 'Central de comunicação de uma missão ativa, reunindo objetivos, tripulação e marcos de exploração.',
  };

  return bios[usuario.tipo] ?? 'Participante Orbitlink com publicações conectadas à Terra, ao céu e a dados espaciais.';
}
/* === CARD PERFIL | fim === */

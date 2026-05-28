import { Camera, UserPlus } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Botao } from '@/components/ui/Botao';
import type { UsuarioOrbitLink } from '@/types/orbitlink.types';
import { formatarNumeroCompacto } from '@/utils/formatadores';

/* === CARD PERFIL | inicio === */
export function CardPerfil({ usuario, destaque = false, onAlterarFoto }: { usuario: UsuarioOrbitLink; destaque?: boolean; onAlterarFoto?: (foto: string) => void }) {
  const foto = usuario.fotoPerfil ?? `https://i.pravatar.cc/240?u=${usuario.id}`;
  const bio = criarBioUsuario(usuario);

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
          <img src={foto} alt={usuario.nome} className="h-full w-full object-cover" />
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
      <div className="mt-4 flex flex-wrap gap-2">
        {usuario.conquistas.map((conquista) => <Badge key={conquista} tom="roxo">{conquista}</Badge>)}
      </div>
      {destaque ? (
        <div className="mt-4 rounded-2xl border border-[var(--border-border)] bg-[var(--bg-muted)] p-3 text-xs leading-5 text-[var(--text-muted)]">
          <p className="font-black uppercase text-[var(--text-text)]">Temas preferidos</p>
          <p>Dark [Tema] [Paleta]</p>
          <p>Light [Tema] [Paleta]</p>
        </div>
      ) : null}
      {!destaque ? <Botao className="mt-4 w-full" variante="secundario"><UserPlus className="h-4 w-4" /> Seguir</Botao> : null}
    </article>
  );
}

function criarBioUsuario(usuario: UsuarioOrbitLink) {
  const bios: Record<string, string> = {
    astronauta: 'Compartilha rotina orbital, bastidores de missao e registros para aproximar ciencia espacial da comunidade.',
    cientista: 'Transforma dados de clima, satelites e observacao terrestre em publicacoes simples para o Orbifeed.',
    turista_espacial: 'Registra experiencias de viagem, pontos turisticos e a sensacao de ver a Terra por outro angulo.',
    comunidade_terra: 'Leva relatos locais, fotos e alertas ambientais para conectar a superficie com quem observa do espaco.',
    observador_terra: 'Acompanha o ceu, passagens orbitais e eventos astronomicos para alimentar os marks em tempo real.',
    estacao_espacial: 'Perfil institucional com status, diarios tecnicos e atualizacoes de infraestrutura orbital.',
    missao: 'Central de comunicacao de uma missao ativa, reunindo objetivos, tripulacao e marcos de exploracao.',
  };

  return bios[usuario.tipo] ?? 'Participante Orbitlink com publicacoes conectadas a Terra, ceu e dados espaciais.';
}
/* === CARD PERFIL | fim === */

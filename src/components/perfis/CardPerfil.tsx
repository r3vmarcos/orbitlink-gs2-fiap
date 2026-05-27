import { Camera, UserPlus } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Botao } from '@/components/ui/Botao';
import type { UsuarioOrbitLink } from '@/types/orbitlink.types';
import { formatarNumeroCompacto } from '@/utils/formatadores';

/* === CARD PERFIL | inicio === */
export function CardPerfil({ usuario, destaque = false, onAlterarFoto }: { usuario: UsuarioOrbitLink; destaque?: boolean; onAlterarFoto?: (foto: string) => void }) {
  const foto = usuario.fotoPerfil ?? `https://i.pravatar.cc/240?u=${usuario.id}`;

  function handleFoto(arquivo?: File) {
    if (!arquivo || !onAlterarFoto) return;
    const leitor = new FileReader();
    leitor.onload = () => onAlterarFoto(String(leitor.result));
    leitor.readAsDataURL(arquivo);
  }

  return (
    <article className={`rounded-[2rem] border bg-slate-950/68 p-5 backdrop-blur-xl light-theme:bg-white/78 ${destaque ? 'border-[var(--border-focus)] shadow-neon' : 'border-blue-500/35 light-theme:border-sky-200'}`}>
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
        <div className="min-w-0">
          <h3 className="truncate text-xl font-black text-white light-theme:text-sky-950">{usuario.nome}</h3>
          <p className="font-monoapp text-[10px] font-black uppercase tracking-[0.14em] text-blue-300 light-theme:text-sky-700">{usuario.usuario}</p>
        </div>
      </div>
      <p className="mt-4 text-sm leading-6 text-slate-300 light-theme:text-slate-700">{usuario.cargo} · {usuario.localizacaoAtual}</p>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-3">
          <p className="text-xl font-black text-white light-theme:text-sky-950">{formatarNumeroCompacto(usuario.seguidores)}</p>
          <p className="font-monoapp text-[10px] uppercase tracking-[0.12em] text-blue-300">seguidores</p>
        </div>
        <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-3">
          <p className="text-xl font-black text-white light-theme:text-sky-950">{usuario.publicacoes}</p>
          <p className="font-monoapp text-[10px] uppercase tracking-[0.12em] text-blue-300">posts</p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {usuario.conquistas.slice(0, 3).map((conquista) => <Badge key={conquista} tom="roxo">{conquista}</Badge>)}
      </div>
      {destaque ? (
        <div className="mt-4 rounded-2xl border border-[var(--border-border)] bg-[var(--bg-muted)] p-3 text-xs leading-5 text-[var(--text-muted)]">
          <p className="font-black uppercase text-[var(--text-text)]">Temas preferidos</p>
          <p>Dark [Tema] [Paleta]</p>
          <p>Light [Tema] [Paleta]</p>
        </div>
      ) : null}
      <Botao className="mt-4 w-full" variante="secundario"><UserPlus className="h-4 w-4" /> Seguir</Botao>
    </article>
  );
}
/* === CARD PERFIL | fim === */

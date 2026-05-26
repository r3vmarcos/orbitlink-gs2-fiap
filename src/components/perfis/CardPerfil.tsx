import { UserPlus } from 'lucide-react';
import { AvatarOrbital } from '@/components/ui/AvatarOrbital';
import { Badge } from '@/components/ui/Badge';
import { Botao } from '@/components/ui/Botao';
import type { UsuarioOrbitLink } from '@/types/orbitlink.types';
import { formatarNumeroCompacto } from '@/utils/formatadores';

/* === CARD PERFIL | inicio === */
export function CardPerfil({ usuario }: { usuario: UsuarioOrbitLink }) {
  return (
    <article className="rounded-[2rem] border border-blue-500/35 bg-slate-950/68 p-5 backdrop-blur-xl light-theme:border-sky-200 light-theme:bg-white/78">
      <div className="flex items-center gap-4">
        <AvatarOrbital gradiente={usuario.avatarGradiente} nome={usuario.nome} tamanho="lg" />
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
      <Botao className="mt-4 w-full" variante="secundario"><UserPlus className="h-4 w-4" /> Seguir</Botao>
    </article>
  );
}
/* === CARD PERFIL | fim === */

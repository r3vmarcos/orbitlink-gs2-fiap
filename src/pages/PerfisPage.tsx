import { CardPerfil } from '@/components/perfis/CardPerfil';
import { CardBase } from '@/components/ui/CardBase';
import { useOrbitLink } from '@/context/OrbitLinkContext';

/* === PERFIS PAGE | inicio === */
export function PerfisPage() {
  const { usuarios } = useOrbitLink();

  return (
    <div className="space-y-5">
      <CardBase>
        <p className="font-monoapp text-xs font-black uppercase tracking-[0.18em] text-blue-300">Perfis OrbitLink</p>
        <h1 className="mt-2 text-4xl font-black uppercase text-white light-theme:text-sky-950">Astronautas, comunidades e missões</h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300 light-theme:text-slate-700">Perfis sociais para usuários da Terra, astronautas, comunidades, estações e missões simuladas.</p>
      </CardBase>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {usuarios.map((usuario) => <CardPerfil key={usuario.id} usuario={usuario} />)}
      </div>
    </div>
  );
}
/* === PERFIS PAGE | fim === */

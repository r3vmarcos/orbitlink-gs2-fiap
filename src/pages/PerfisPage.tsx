import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CardPerfil } from '@/components/perfis/CardPerfil';
import { CardBase } from '@/components/ui/CardBase';
import { useOrbitLink } from '@/context/OrbitLinkContext';
import { lerLocalStorage, salvarLocalStorage } from '@/services/localStorageService';

/* === PERFIS PAGE | inicio === */
export function PerfisPage() {
  const { usuarios, usuarioAtual } = useOrbitLink();
  const [params] = useSearchParams();
  const [fotosLocais, setFotosLocais] = useState<Record<string, string>>(() => lerLocalStorage('orbitlink_fotos_perfil', {}));
  const usuarioFocoId = params.get('usuario') ?? usuarioAtual?.id;

  const usuariosComFoto = useMemo(() => usuarios.map((usuario) => ({
    ...usuario,
    fotoPerfil: fotosLocais[usuario.id] ?? usuario.fotoPerfil,
  })), [fotosLocais, usuarios]);

  const usuariosOrdenados = useMemo(() => {
    return [...usuariosComFoto].sort((a, b) => (a.id === usuarioFocoId ? -1 : b.id === usuarioFocoId ? 1 : 0));
  }, [usuarioFocoId, usuariosComFoto]);

  function alterarFoto(usuarioId: string, foto: string) {
    const proximo = { ...fotosLocais, [usuarioId]: foto };
    setFotosLocais(proximo);
    salvarLocalStorage('orbitlink_fotos_perfil', proximo);
  }

  return (
    <div className="space-y-5">
      <CardBase>
        <p className="font-monoapp text-xs font-black uppercase tracking-[0.18em] text-blue-300">Perfis Orbitlink</p>
        <h1 className="mt-2 text-4xl font-black uppercase text-white light-theme:text-sky-950">Astronautas, comunidades e missoes</h1>
      </CardBase>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {usuariosOrdenados.map((usuario) => (
          <CardPerfil
            key={usuario.id}
            usuario={usuario}
            destaque={usuario.id === usuarioFocoId}
            onAlterarFoto={usuario.id === usuarioAtual?.id ? (foto) => alterarFoto(usuario.id, foto) : undefined}
          />
        ))}
      </div>
    </div>
  );
}
/* === PERFIS PAGE | fim === */

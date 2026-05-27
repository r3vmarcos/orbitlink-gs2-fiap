import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CardPerfil } from '@/components/perfis/CardPerfil';
import { CardBase } from '@/components/ui/CardBase';
import { useOrbitLink } from '@/context/OrbitLinkContext';
import { lerLocalStorage, salvarLocalStorage } from '@/services/localStorageService';

/* === PERFIS PAGE | inicio === */
export function PerfisPage() {
  const { usuarios, usuarioAtual } = useOrbitLink();
  const { usuarioId } = useParams();
  const [fotosLocais, setFotosLocais] = useState<Record<string, string>>(() => lerLocalStorage('orbitlink_fotos_perfil', {}));
  const usuarioFocoId = usuarioId ?? usuarioAtual?.id;

  const usuariosComFoto = useMemo(() => usuarios.map((usuario) => ({
    ...usuario,
    fotoPerfil: fotosLocais[usuario.id] ?? usuario.fotoPerfil,
  })), [fotosLocais, usuarios]);

  const usuariosOrdenados = useMemo(() => usuariosComFoto.filter((usuario) => usuario.id === usuarioFocoId), [usuarioFocoId, usuariosComFoto]);

  function alterarFoto(usuarioId: string, foto: string) {
    const proximo = { ...fotosLocais, [usuarioId]: foto };
    setFotosLocais(proximo);
    salvarLocalStorage('orbitlink_fotos_perfil', proximo);
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-5 lg:max-w-3xl">
      <CardBase>
        <p className="font-monoapp text-xs font-black uppercase tracking-[0.18em] text-blue-300">Perfis Orbitlink</p>
        <h1 className="mt-2 text-4xl font-black uppercase text-white light-theme:text-sky-950">Meu perfil</h1>
      </CardBase>
      <div className="grid gap-5">
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

import { useMemo, useState } from 'react';
import { CardPerfil } from '@/components/perfis/CardPerfil';
import { CardBase } from '@/components/ui/CardBase';
import { useOrbitLink } from '@/context/OrbitLinkContext';
import { lerLocalStorage } from '@/services/localStorageService';

/* === PESSOAS PAGE | inicio === */
export function PessoasPage() {
  const { usuarios, usuarioAtual } = useOrbitLink();
  const [busca, setBusca] = useState('');
  const [fotosLocais] = useState<Record<string, string>>(() => lerLocalStorage('orbitlink_fotos_perfil', {}));

  const pessoas = useMemo(() => {
    const termo = busca.toLowerCase();

    return usuarios
      .filter((usuario) => usuario.id !== usuarioAtual?.id)
      .map((usuario) => ({ ...usuario, fotoPerfil: fotosLocais[usuario.id] ?? usuario.fotoPerfil }))
      .filter((usuario) => {
        const alvo = `${usuario.nome} ${usuario.usuario} ${usuario.tipo} ${usuario.cargo} ${usuario.localizacaoAtual} ${usuario.conquistas.join(' ')}`.toLowerCase();
        return alvo.includes(termo);
      });
  }, [busca, fotosLocais, usuarioAtual?.id, usuarios]);

  return (
    <div className="space-y-5">
      <CardBase>
        <h1 className="text-2xl font-black uppercase leading-tight text-[var(--text-text)] sm:text-4xl">Comunidade Orbitlink</h1>
        <input value={busca} onChange={(evento) => setBusca(evento.target.value)} className="input-form mt-4 max-w-xs rounded-full px-3 py-2 text-xs md:w-1/4" placeholder="Buscar pessoas..." />
      </CardBase>

      <div className="grid min-w-0 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {pessoas.map((usuario) => <CardPerfil key={usuario.id} usuario={usuario} />)}
      </div>
    </div>
  );
}
/* === PESSOAS PAGE | fim === */

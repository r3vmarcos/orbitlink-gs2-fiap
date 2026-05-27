import { useMemo, useState } from 'react';
import { CardPerfil } from '@/components/perfis/CardPerfil';
import { CardBase } from '@/components/ui/CardBase';
import { useOrbitLink } from '@/context/OrbitLinkContext';
import { lerLocalStorage } from '@/services/localStorageService';

/* === PESSOAS PAGE | inicio === */
export function PessoasPage() {
  const { usuarios } = useOrbitLink();
  const [busca, setBusca] = useState('');
  const [fotosLocais] = useState<Record<string, string>>(() => lerLocalStorage('orbitlink_fotos_perfil', {}));

  const pessoas = useMemo(() => {
    const termo = busca.toLowerCase();

    return usuarios
      .map((usuario) => ({ ...usuario, fotoPerfil: fotosLocais[usuario.id] ?? usuario.fotoPerfil }))
      .filter((usuario) => {
        const alvo = `${usuario.nome} ${usuario.usuario} ${usuario.tipo} ${usuario.cargo} ${usuario.localizacaoAtual} ${usuario.conquistas.join(' ')}`.toLowerCase();
        return alvo.includes(termo);
      });
  }, [busca, fotosLocais, usuarios]);

  return (
    <div className="space-y-5">
      <CardBase>
        <p className="font-monoapp text-xs font-black uppercase tracking-[0.18em] text-[var(--text-link)]">Pessoas</p>
        <h1 className="mt-2 text-4xl font-black uppercase text-[var(--text-text)]">Comunidade Orbitlink</h1>
        <input value={busca} onChange={(evento) => setBusca(evento.target.value)} className="input-form mt-5" placeholder="Buscar pessoas por nome, usuario, cargo, local ou selo..." />
      </CardBase>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {pessoas.map((usuario) => <CardPerfil key={usuario.id} usuario={usuario} />)}
      </div>
    </div>
  );
}
/* === PESSOAS PAGE | fim === */

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
        <p className="font-monoapp text-[11px] font-black uppercase tracking-[0.14em] text-[var(--text-link)]">Pessoas</p>
        <h1 className="mt-2 text-2xl font-black uppercase leading-tight text-[var(--text-text)] sm:text-4xl">Comunidade Orbitlink</h1>
        <input value={busca} onChange={(evento) => setBusca(evento.target.value)} className="input-form mt-4 rounded-full px-3 py-2 text-xs sm:rounded-2xl sm:px-4 sm:py-3 sm:text-sm" placeholder="Buscar pessoas..." />
      </CardBase>

      <div className="grid min-w-0 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {pessoas.map((usuario) => <CardPerfil key={usuario.id} usuario={usuario} />)}
      </div>
    </div>
  );
}
/* === PESSOAS PAGE | fim === */

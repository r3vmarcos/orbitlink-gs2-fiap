import { useEffect, useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { CardPerfil } from '@/components/perfis/CardPerfil';
import { CardBase } from '@/components/ui/CardBase';
import { useOrbitLink } from '@/context/OrbitLinkContext';
import { lerLocalStorage } from '@/services/localStorageService';

/* === PESSOAS PAGE | inicio === */
const placeholdersBuscaPessoas = ['CONECTE A PESSOAS', 'ENCONTRE MISSÕES', 'ACHE COMUNIDADES'];

export function PessoasPage() {
  const { usuarios, usuarioAtual } = useOrbitLink();
  const [busca, setBusca] = useState('');
  const [indicePlaceholderBusca, setIndicePlaceholderBusca] = useState(0);
  const [fotosLocais] = useState<Record<string, string>>(() => lerLocalStorage('orbitlink_fotos_perfil', {}));

  useEffect(() => {
    const temporizador = window.setInterval(() => {
      setIndicePlaceholderBusca((valorAtual) => (valorAtual + 1) % placeholdersBuscaPessoas.length);
    }, 2400);

    return () => window.clearInterval(temporizador);
  }, []);

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
      <CardBase className="grid items-center gap-3 md:grid-cols-[minmax(0,0.85fr)_minmax(16rem,1fr)_minmax(0,0.85fr)]">
        <h1 className="titulo-pagina text-center md:text-left">Comunidade Orbitlink</h1>
        <div className="relative w-full max-w-md justify-self-center">
          <input value={busca} onChange={(evento) => setBusca(evento.target.value)} className="input-form h-9 w-full rounded-[15px] border-[var(--bg-primary)] px-10 py-4 text-center text-[0.9rem] uppercase shadow-[0_0_22px_color-mix(in_srgb,var(--bg-primary)_18%,transparent)]" placeholder="" />
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-placeholder)]" />
          {busca.length === 0 ? (
            <span key={placeholdersBuscaPessoas[indicePlaceholderBusca]} className="animacao-morphing-placeholder pointer-events-none absolute inset-0 flex items-center justify-center font-monoapp text-[0.9rem] font-black uppercase tracking-[0.08em] text-[var(--text-placeholder)]">
              {placeholdersBuscaPessoas[indicePlaceholderBusca]}
            </span>
          ) : null}
        </div>
        <span className="hidden md:block" aria-hidden="true" />
      </CardBase>

      <div className="grid min-w-0 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {pessoas.map((usuario) => <CardPerfil key={usuario.id} usuario={usuario} />)}
      </div>
    </div>
  );
}
/* === PESSOAS PAGE | fim === */

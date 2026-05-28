import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';
import { CardPerfil } from '@/components/perfis/CardPerfil';
import { CardBase } from '@/components/ui/CardBase';
import { useOrbitLink } from '@/context/OrbitLinkContext';
import { lerLocalStorage, salvarLocalStorage } from '@/services/localStorageService';
import type { CategoriaTemaId, TemaVisual } from '@/types/tema';

/* === PERFIS PAGE | inicio === */
interface PerfisPageProps {
  onAlternarClaroEscuro: () => void;
  categoriasTema: Array<{ id: CategoriaTemaId; nome: string }>;
  paletasTema: TemaVisual[];
  categoriaAtivaId: CategoriaTemaId;
  paletaAtivaNome: string;
  onSelecionarCategoria: (id: CategoriaTemaId) => void;
  onSelecionarPaleta: (indice: number) => void;
}

export function PerfisPage({ onAlternarClaroEscuro, categoriasTema, paletasTema, categoriaAtivaId, paletaAtivaNome, onSelecionarCategoria, onSelecionarPaleta }: PerfisPageProps) {
  const { usuarios, usuarioAtual, posts, tema } = useOrbitLink();
  const { usuarioId } = useParams();
  const [fotosLocais, setFotosLocais] = useState<Record<string, string>>(() => lerLocalStorage('orbitlink_fotos_perfil', {}));
  const usuarioFocoId = usuarioId ?? usuarioAtual?.id;

  const usuariosComFoto = useMemo(() => usuarios.map((usuario) => ({
    ...usuario,
    fotoPerfil: fotosLocais[usuario.id] ?? usuario.fotoPerfil,
  })), [fotosLocais, usuarios]);

  const usuariosOrdenados = useMemo(() => usuariosComFoto.filter((usuario) => usuario.id === usuarioFocoId), [usuarioFocoId, usuariosComFoto]);
  const fotosDoPerfil = useMemo(() => posts.filter((post) => post.autorId === usuarioFocoId && post.imagem).slice(0, 9), [posts, usuarioFocoId]);
  const categoriasDark = useMemo(() => categoriasTema.filter((categoria) => categoria.id.startsWith('dark')), [categoriasTema]);
  const categoriasLight = useMemo(() => categoriasTema.filter((categoria) => categoria.id.startsWith('light')), [categoriasTema]);

  function alterarFoto(usuarioId: string, foto: string) {
    const proximo = { ...fotosLocais, [usuarioId]: foto };
    setFotosLocais(proximo);
    salvarLocalStorage('orbitlink_fotos_perfil', proximo);
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-5 md:max-w-xl lg:max-w-3xl">
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
      <CardBase>
        <p className="font-monoapp text-[11px] font-black uppercase tracking-[0.14em] text-[var(--text-link)]">Personalização</p>
        <div className="mt-4 grid gap-4">
          <div className="flex items-center justify-between gap-3 rounded-2xl border border-[var(--border-border)] bg-[var(--bg-muted)] p-3">
            <div className="min-w-0">
              <p className="text-sm font-black text-[var(--text-text)]">Modo visual</p>
              <p className="text-xs text-[var(--text-muted)]">{tema === 'dark' ? 'Escuro ativo' : 'Claro ativo'}</p>
            </div>
            <button title="Alternar claro e escuro" onClick={onAlternarClaroEscuro} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[var(--border-border)] text-[var(--text-link)]">
              {tema === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          </div>

          <div>
            <p className="label-form">Tema</p>
            <LinhaTemas categorias={categoriasDark} categoriaAtivaId={categoriaAtivaId} onSelecionarCategoria={onSelecionarCategoria} />
            <LinhaTemas categorias={categoriasLight} categoriaAtivaId={categoriaAtivaId} onSelecionarCategoria={onSelecionarCategoria} />
          </div>

          <div>
            <p className="label-form">Paleta</p>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {paletasTema.map((paleta, indice) => (
                <button key={paleta.name} onClick={() => onSelecionarPaleta(indice)} className={`flex min-w-0 items-center gap-2 rounded-2xl border px-3 py-2 text-left text-xs font-bold ${paleta.name === paletaAtivaNome ? 'border-[var(--bg-primary)] bg-[color-mix(in_srgb,var(--bg-primary)_14%,transparent)] text-[var(--text-text)]' : 'border-[var(--border-border)] text-[var(--text-muted)]'}`}>
                  <span className="h-4 w-4 shrink-0 rounded-full border border-[var(--border-border)]" style={{ backgroundColor: paleta.accent }} />
                  <span className="truncate">{paleta.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </CardBase>
      <CardBase>
        <p className="font-monoapp text-[11px] font-black uppercase tracking-[0.14em] text-[var(--text-link)]">Fotos do feed</p>
        <div className="mt-4 grid grid-cols-3 gap-1.5">
          {fotosDoPerfil.map((post) => (
            <img key={post.id} src={post.imagem} alt={post.titulo} className="aspect-square w-full rounded-xl object-cover" loading="lazy" />
          ))}
          {fotosDoPerfil.length === 0 ? <p className="col-span-3 text-sm text-[var(--text-muted)]">Este perfil ainda não publicou fotos.</p> : null}
        </div>
      </CardBase>
    </div>
  );
}

function LinhaTemas({ categorias, categoriaAtivaId, onSelecionarCategoria }: { categorias: Array<{ id: CategoriaTemaId; nome: string }>; categoriaAtivaId: CategoriaTemaId; onSelecionarCategoria: (id: CategoriaTemaId) => void }) {
  return (
    <div className="mb-2 flex gap-2 overflow-x-auto pb-1">
      {categorias.map((categoria) => (
        <button key={categoria.id} onClick={() => onSelecionarCategoria(categoria.id)} className={`shrink-0 rounded-full border px-3 py-2 text-xs font-bold ${categoria.id === categoriaAtivaId ? 'border-[var(--bg-primary)] bg-[var(--bg-primary)] text-[var(--text-primary)]' : 'border-[var(--border-border)] text-[var(--text-muted)]'}`}>
          {categoria.nome}
        </button>
      ))}
    </div>
  );
}
/* === PERFIS PAGE | fim === */

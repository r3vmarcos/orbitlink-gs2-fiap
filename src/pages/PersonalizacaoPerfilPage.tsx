import { useMemo, useState } from 'react';
import { ChevronDown, Moon, Sun } from 'lucide-react';
import { CardBase } from '@/components/ui/CardBase';
import { useOrbitLink } from '@/context/OrbitLinkContext';
import type { CategoriaTemaId, TemaVisual } from '@/types/tema';

/* === PERSONALIZAÇÃO PERFIL PAGE | inicio === */
interface PersonalizacaoPerfilPageProps {
  onAlternarClaroEscuro: () => void;
  categoriasTema: Array<{ id: CategoriaTemaId; nome: string }>;
  paletasTema: TemaVisual[];
  categoriaAtivaId: CategoriaTemaId;
  paletaAtivaNome: string;
  onSelecionarCategoria: (id: CategoriaTemaId) => void;
  onSelecionarPaleta: (indice: number) => void;
}

export function PersonalizacaoPerfilPage({
  onAlternarClaroEscuro,
  categoriasTema,
  paletasTema,
  categoriaAtivaId,
  paletaAtivaNome,
  onSelecionarCategoria,
  onSelecionarPaleta,
}: PersonalizacaoPerfilPageProps) {
  const { tema } = useOrbitLink();
  const [menuTemaAberto, setMenuTemaAberto] = useState<'dark' | 'light' | undefined>();

  const categoriasDark = useMemo(() => categoriasTema.filter((categoria) => categoria.id.startsWith('dark')), [categoriasTema]);
  const categoriasLight = useMemo(() => categoriasTema.filter((categoria) => categoria.id.startsWith('light')), [categoriasTema]);

  function selecionarTema(id: CategoriaTemaId) {
    const modoSelecionado = id.startsWith('dark') ? 'dark' : 'light';

    if (tema !== modoSelecionado) {
      onAlternarClaroEscuro();
    }

    onSelecionarCategoria(id);
    setMenuTemaAberto(undefined);
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-5 overflow-hidden md:max-w-xl lg:max-w-3xl">
      <CardBase>
        <p className="font-monoapp text-xs font-black uppercase tracking-[0.18em] text-blue-300">Perfil</p>
        <h1 className="titulo-pagina mt-2">Personalização</h1>
        <p className="mt-3 text-sm leading-6 text-slate-300 light-theme:text-slate-700">Altere o visual do seu perfil e personalize temas, paletas e cores orbitais.</p>
      </CardBase>

      <CardBase className="max-w-full overflow-hidden">
        <p className="font-monoapp text-[11px] font-black uppercase tracking-[0.14em] text-[var(--text-link)]">Personalização</p>
        <div className="mt-4 grid min-w-0 gap-4">
          <div className="flex min-w-0 items-center justify-between gap-3 rounded-2xl border border-[var(--border-border)] bg-[var(--bg-muted)] p-3">
            <div className="min-w-0">
              <p className="text-sm font-black text-[var(--text-text)]">Modo visual</p>
              <p className="text-xs text-[var(--text-muted)]">{tema === 'dark' ? 'Escuro ativo' : 'Claro ativo'}</p>
            </div>
            <button title="Alternar claro e escuro" onClick={onAlternarClaroEscuro} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[var(--border-border)] text-[var(--text-link)]">
              {tema === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          </div>

          <div className="min-w-0">
            <p className="label-form">Tema</p>
            <div className="grid min-w-0 gap-2">
              <MenuSuspensoTema rotulo="Dark" aberto={menuTemaAberto === 'dark'} categorias={categoriasDark} categoriaAtivaId={categoriaAtivaId} onAlternar={() => setMenuTemaAberto((valor) => valor === 'dark' ? undefined : 'dark')} onSelecionar={selecionarTema} />
              <MenuSuspensoTema rotulo="Light" aberto={menuTemaAberto === 'light'} categorias={categoriasLight} categoriaAtivaId={categoriaAtivaId} onAlternar={() => setMenuTemaAberto((valor) => valor === 'light' ? undefined : 'light')} onSelecionar={selecionarTema} />
            </div>
          </div>

          <div className="min-w-0">
            <p className="label-form">Paleta</p>
            <div className="grid min-w-0 grid-cols-2 gap-2">
              {paletasTema.map((paleta, indice) => (
                <button key={paleta.name} onClick={() => onSelecionarPaleta(indice)} className={`flex min-w-0 items-center gap-2 rounded-2xl border px-2 py-2 text-left text-[11px] font-bold ${paleta.name === paletaAtivaNome ? 'border-[var(--bg-primary)] bg-[color-mix(in_srgb,var(--bg-primary)_14%,transparent)] text-[var(--text-text)]' : 'border-[var(--border-border)] text-[var(--text-muted)]'}`}>
                  <span className="h-4 w-4 shrink-0 rounded-full border border-[var(--border-border)]" style={{ backgroundColor: paleta.accent }} />
                  <span className="truncate">{paleta.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </CardBase>
    </div>
  );
}

function MenuSuspensoTema({ rotulo, aberto, categorias, categoriaAtivaId, onAlternar, onSelecionar }: { rotulo: string; aberto: boolean; categorias: Array<{ id: CategoriaTemaId; nome: string }>; categoriaAtivaId: CategoriaTemaId; onAlternar: () => void; onSelecionar: (id: CategoriaTemaId) => void }) {
  const categoriaAtiva = categorias.find((categoria) => categoria.id === categoriaAtivaId);

  return (
    <div className="min-w-0 rounded-2xl border border-[var(--border-border)] bg-[var(--bg-muted)]">
      <button onClick={onAlternar} className="flex w-full min-w-0 items-center justify-between gap-2 px-3 py-2 text-left">
        <span className="min-w-0">
          <span className="block font-monoapp text-[10px] font-black uppercase text-[var(--text-link)]">{rotulo}</span>
          <span className="block truncate text-sm font-bold text-[var(--text-text)]">{categoriaAtiva?.nome ?? `Escolher ${rotulo}`}</span>
        </span>
        <ChevronDown className={`h-4 w-4 shrink-0 text-[var(--text-link)] transition ${aberto ? 'rotate-180' : ''}`} />
      </button>
      {aberto ? (
        <div className="grid gap-1 border-t border-[var(--border-border)] p-2">
          {categorias.map((categoria) => (
            <button key={categoria.id} onClick={() => onSelecionar(categoria.id)} className={`rounded-xl px-3 py-2 text-left text-xs font-bold ${categoria.id === categoriaAtivaId ? 'bg-[var(--bg-primary)] text-[var(--text-primary)]' : 'text-[var(--text-muted)] hover:bg-[var(--bg-surface-hover)]'}`}>
              {categoria.nome}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
/* === PERSONALIZAÇÃO PERFIL PAGE | fim === */

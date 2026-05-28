import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CardImagemGaleria } from '@/components/galeria/CardImagemGaleria';
import { Botao } from '@/components/ui/Botao';
import { CardBase } from '@/components/ui/CardBase';
import { Modal } from '@/components/ui/Modal';
import { useOrbitLink } from '@/context/OrbitLinkContext';
import type { ItemGaleria } from '@/types/orbitlink.types';

/* === GALERIA PAGE | inicio === */
type FiltroGaleria = ItemGaleria['categoria'] | 'todas';

export function GaleriaPage() {
  const { galeria, sincronizarApisNasa, carregandoApi } = useOrbitLink();
  const [itemAberto, setItemAberto] = useState<ItemGaleria | undefined>();
  const [filtro, setFiltro] = useState<FiltroGaleria>('todas');
  const navigate = useNavigate();
  const galeriaNasa = useMemo(() => galeria.filter((item) => item.origemDados === 'nasa_images' || item.origemDados === 'nasa_epic'), [galeria]);
  const itens = galeriaNasa.length > 0 ? galeriaNasa : galeria;
  const categorias = useMemo(() => ['todas', ...Array.from(new Set(itens.map((item) => item.categoria)))] as FiltroGaleria[], [itens]);
  const itensFiltrados = useMemo(() => itens.filter((item) => filtro === 'todas' || item.categoria === filtro), [filtro, itens]);

  useEffect(() => {
    if (galeriaNasa.length === 0 && !carregandoApi) {
      void sincronizarApisNasa();
    }
  }, [carregandoApi, galeriaNasa.length, sincronizarApisNasa]);

  return (
    <div className="space-y-5">
      <CardBase>
        <p className="font-monoapp text-[11px] font-black uppercase tracking-[0.14em] text-blue-300">Galeria Orbitlink</p>
        <h1 className="mt-2 text-2xl font-black uppercase leading-tight text-white light-theme:text-sky-950 sm:text-3xl">Galeria do Universo</h1>
        <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
          {categorias.map((categoria) => (
            <button key={categoria} onClick={() => setFiltro(categoria)} className={`shrink-0 rounded-full border px-3 py-2 font-monoapp text-[10px] font-black uppercase ${filtro === categoria ? 'border-[var(--bg-primary)] bg-[var(--bg-primary)] text-[var(--text-primary)]' : 'border-[var(--border-border)] text-[var(--text-muted)]'}`}>
              #{categoria}
            </button>
          ))}
        </div>
      </CardBase>

      <div className="grid grid-cols-3 gap-1.5 sm:gap-3 lg:grid-cols-4">
        {itensFiltrados.map((item) => <CardImagemGaleria key={item.id} item={item} onAbrir={setItemAberto} />)}
      </div>

      <Modal aberto={Boolean(itemAberto)} titulo={itemAberto?.titulo ?? 'Imagem'} onFechar={() => setItemAberto(undefined)} telaCheiaMobile>
        {itemAberto ? (
          <div className="space-y-4">
            <img src={itemAberto.imagem} alt={itemAberto.titulo} className="max-h-[70dvh] w-full rounded-[2rem] object-cover" />
            <p className="text-sm leading-6 text-slate-300 light-theme:text-slate-700">{itemAberto.descricao}</p>
            <div className="flex gap-3">
              <Botao variante="secundario" onClick={() => setItemAberto(undefined)}>Fechar</Botao>
              {itemAberto.pontoArId ? <Botao onClick={() => navigate(`/dualview-ar?ponto=${itemAberto.pontoArId}`)}>Ver no AR</Botao> : null}
            </div>
          </div>
        ) : null}
      </Modal>
    </div>
  );
}
/* === GALERIA PAGE | fim === */

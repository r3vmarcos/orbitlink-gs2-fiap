import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CardImagemGaleria } from '@/components/galeria/CardImagemGaleria';
import { Botao } from '@/components/ui/Botao';
import { Modal } from '@/components/ui/Modal';
import { useOrbitLink } from '@/context/OrbitLinkContext';
import type { ItemGaleria } from '@/types/orbitlink.types';

/* === GALERIA PAGE | inicio === */
type FiltroGaleria = ItemGaleria['categoria'] | 'todas';

const filtrosGaleria: FiltroGaleria[] = ['todas', 'espaco', 'terra', 'lua', 'marte', 'clima', 'cidade', 'turismo'];
const TAMANHO_LOTE_FOTOS = 20;

export function GaleriaPage() {
  const { galeria, sincronizarApisNasa, carregandoApi } = useOrbitLink();
  const [itemAberto, setItemAberto] = useState<ItemGaleria | undefined>();
  const [filtrosAtivos, setFiltrosAtivos] = useState<Array<ItemGaleria['categoria']>>([]);
  const [limiteFotos, setLimiteFotos] = useState(TAMANHO_LOTE_FOTOS);
  const sentinelaRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const itens = galeria;
  const itensFiltrados = useMemo(() => itens.filter((item) => filtrosAtivos.length === 0 || filtrosAtivos.includes(item.categoria)), [filtrosAtivos, itens]);
  const itensVisiveis = useMemo(() => itensFiltrados.slice(0, limiteFotos), [itensFiltrados, limiteFotos]);

  useEffect(() => {
    if (!carregandoApi) {
      void sincronizarApisNasa();
    }
  }, [carregandoApi, sincronizarApisNasa]);

  useEffect(() => {
    setLimiteFotos(TAMANHO_LOTE_FOTOS);
  }, [filtrosAtivos]);

  useEffect(() => {
    const sentinela = sentinelaRef.current;

    if (!sentinela) {
      return undefined;
    }

    const observador = new IntersectionObserver((entradas) => {
      if (entradas.some((entrada) => entrada.isIntersecting)) {
        setLimiteFotos((valorAtual) => Math.min(valorAtual + TAMANHO_LOTE_FOTOS, itensFiltrados.length));
      }
    }, { rootMargin: '420px 0px' });

    observador.observe(sentinela);

    return () => observador.disconnect();
  }, [itensFiltrados.length]);

  function alternarFiltro(categoria: FiltroGaleria) {
    if (categoria === 'todas') {
      setFiltrosAtivos([]);
      return;
    }

    setFiltrosAtivos((atuais) => atuais.includes(categoria) ? atuais.filter((item) => item !== categoria) : [...atuais, categoria]);
  }

  return (
    <div className="space-y-5">
      <section className="flex flex-col gap-3 rounded-[1.5rem] border border-[var(--border-border)] bg-[color-mix(in_srgb,var(--bg-surface)_82%,transparent)] p-5 shadow-soft backdrop-blur-xl md:flex-row md:items-center">
        <h1 className="titulo-pagina shrink-0 text-center md:text-left">Galeria do Universo</h1>
        <div className="flex min-w-0 flex-1 flex-wrap items-center justify-center gap-1.5 pb-1 text-center md:justify-end">
          {filtrosGaleria.map((categoria) => (
            <button key={categoria} onClick={() => alternarFiltro(categoria)} className={`shrink-0 rounded-full border px-2.5 py-1 font-monoapp text-[9px] font-black uppercase tracking-[0.06em] lg:text-[14px] ${(categoria === 'todas' && filtrosAtivos.length === 0) || (categoria !== 'todas' && filtrosAtivos.includes(categoria)) ? 'border-[var(--bg-primary)] bg-[var(--bg-primary)] text-[var(--text-primary)]' : 'border-[var(--border-border)] text-[var(--text-muted)]'}`}>
              #{categoria}
            </button>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-3 gap-1.5 sm:gap-3 lg:grid-cols-4">
        {itensVisiveis.map((item) => <CardImagemGaleria key={item.id} item={item} onAbrir={setItemAberto} />)}
      </div>
      <div ref={sentinelaRef} className="h-8" />

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

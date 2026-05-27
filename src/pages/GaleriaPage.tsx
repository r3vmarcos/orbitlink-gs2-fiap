import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CardImagemGaleria } from '@/components/galeria/CardImagemGaleria';
import { Botao } from '@/components/ui/Botao';
import { CardBase } from '@/components/ui/CardBase';
import { Modal } from '@/components/ui/Modal';
import { useOrbitLink } from '@/context/OrbitLinkContext';
import type { ItemGaleria } from '@/types/orbitlink.types';

/* === GALERIA PAGE | inicio === */
export function GaleriaPage() {
  const { galeria, sincronizarApisNasa, carregandoApi } = useOrbitLink();
  const [itemAberto, setItemAberto] = useState<ItemGaleria | undefined>();
  const navigate = useNavigate();
  const galeriaNasa = useMemo(() => galeria.filter((item) => item.origemDados === 'nasa_images' || item.origemDados === 'nasa_epic'), [galeria]);
  const itens = galeriaNasa.length > 0 ? galeriaNasa : galeria;

  useEffect(() => {
    if (galeriaNasa.length === 0 && !carregandoApi) {
      void sincronizarApisNasa();
    }
  }, [carregandoApi, galeriaNasa.length, sincronizarApisNasa]);

  return (
    <div className="space-y-5">
      <CardBase>
        <p className="font-monoapp text-xs font-black uppercase tracking-[0.18em] text-blue-300">Galeria Orbitlink</p>
        <h1 className="mt-2 text-4xl font-black uppercase text-white light-theme:text-sky-950">Galeria do Universo</h1>
      </CardBase>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {itens.map((item) => <CardImagemGaleria key={item.id} item={item} onAbrir={setItemAberto} />)}
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

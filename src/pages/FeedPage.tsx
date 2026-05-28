import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ListaUltimosChats } from '@/components/chats/ListaUltimosChats';
import { CardPost } from '@/components/feed/CardPost';
import { StatusOrbitalLista } from '@/components/feed/StatusOrbitalLista';
import { CardBase } from '@/components/ui/CardBase';
import { useOrbitLink } from '@/context/OrbitLinkContext';
import type { PostOrbitLink, StatusOrbital, TipoCategoriaPost } from '@/types/orbitlink.types';

/* === FEED PAGE | inicio === */
interface FeedPageProps {
  onAbrirPost: () => void;
  onAbrirStatus: () => void;
  onVisualizarStatus: (status: StatusOrbital) => void;
  onAbrirDetalhesPost: (post: PostOrbitLink) => void;
}

const TAMANHO_LOTE_POSTS = 10;
const filtrosFeed: Array<TipoCategoriaPost | 'todos'> = ['todos', 'diario_orbital', 'missao', 'estacao', 'lua', 'satelite', 'evento', 'cidade', 'turismo', 'comunidade', 'clima', 'bioma', 'ods'];
const anunciosPatrocinio = [
  ['Smartphone Astro X', 'Câmera noturna, giroscópio preciso e tela de alto brilho.', 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=700&q=82'],
  ['Telescópio Nebula 90', 'Lente compacta para observação lunar e planetária.', 'https://images.unsplash.com/photo-1454789548928-9efd52dc4031?auto=format&fit=crop&w=700&q=82'],
  ['Tripé SkyLock', 'Estabilização para fotos do céu e transmissão ao vivo.', 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=700&q=82'],
  ['Binóculo Cosmos 12x', 'Leve para observação de constelações, Lua e passagens orbitais.', 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=700&q=82'],
  ['Câmera Aurora Mini', 'Sensor amplo para timelapse noturno e registros de meteoros.', 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=700&q=82'],
  ['Mochila Orbital Pro', 'Compartimentos para lente, power bank e suporte de campo.', 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=700&q=82'],
  ['Power Bank Gaia', 'Energia extra para noites longas de observação e transmissão.', 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&w=700&q=82'],
  ['Notebook Mission 14', 'Tela calibrada e GPU leve para mapas, fotos e simulações.', 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=700&q=82'],
  ['Lente Lunar Clip', 'Acessório para aproximar fotos da Lua direto no smartphone.', 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=700&q=82'],
  ['Cadeira Campo Zero-G', 'Conforto para observar o céu por horas sem cansar.', 'https://images.unsplash.com/photo-1470145318698-cb03732f5ddf?auto=format&fit=crop&w=700&q=82'],
  ['Kit Limpeza Óptica', 'Panos, soprador e estojo para lentes e telescópios.', 'https://images.unsplash.com/photo-1495707902641-75cac588d2e9?auto=format&fit=crop&w=700&q=82'],
  ['Relógio Passagem ISS', 'Alertas de passagem visível e clima local no pulso.', 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=700&q=82'],
];

function formatarFiltroFeed(item: TipoCategoriaPost | 'todos') {
  return `#${item.replaceAll('_', '')}`;
}

export function FeedPage({ onAbrirStatus, onVisualizarStatus, onAbrirDetalhesPost }: FeedPageProps) {
  const { posts, pontosAr, usuarios } = useOrbitLink();
  const [filtro, setFiltro] = useState<TipoCategoriaPost | 'todos'>('todos');
  const [busca, setBusca] = useState('');
  const [limitePosts, setLimitePosts] = useState(TAMANHO_LOTE_POSTS);
  const sentinelaRef = useRef<HTMLDivElement | null>(null);
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const pontoFiltro = params.get('ponto');

  const postsFiltrados = useMemo(() => {
    const idsExibidos = new Set<string>();

    return posts
      .filter((post) => {
        if (idsExibidos.has(post.id)) {
          return false;
        }

        idsExibidos.add(post.id);
        return true;
      })
      .filter((post) => !pontoFiltro || post.pontoArId === pontoFiltro)
      .filter((post) => filtro === 'todos' || post.categoria === filtro)
      .filter((post) => {
        const ponto = pontosAr.find((item) => item.id === post.pontoArId);
        const autor = usuarios.find((item) => item.id === post.autorId);
        const alvo = `${post.titulo} ${post.texto} ${post.categoria} ${ponto?.nome ?? ''} ${autor?.nome ?? ''} ${autor?.usuario ?? ''} ${autor?.localizacaoAtual ?? ''}`.toLowerCase();
        return alvo.includes(busca.toLowerCase());
      })
      .sort((a, b) => new Date(b.criadoEm).getTime() - new Date(a.criadoEm).getTime());
  }, [busca, filtro, pontoFiltro, pontosAr, posts, usuarios]);

  const postsVisiveis = useMemo(() => postsFiltrados.slice(0, limitePosts), [limitePosts, postsFiltrados]);

  useEffect(() => {
    setLimitePosts(TAMANHO_LOTE_POSTS);
  }, [busca, filtro, pontoFiltro]);

  useEffect(() => {
    const sentinela = sentinelaRef.current;

    if (!sentinela) {
      return undefined;
    }

    const observador = new IntersectionObserver((entradas) => {
      const chegouPertoDoFim = entradas.some((entrada) => entrada.isIntersecting);

      if (chegouPertoDoFim) {
        setLimitePosts((valorAtual) => Math.min(valorAtual + TAMANHO_LOTE_POSTS, postsFiltrados.length));
      }
    }, { rootMargin: '420px 0px' });

    observador.observe(sentinela);

    return () => observador.disconnect();
  }, [postsFiltrados.length]);

  function handleVerAr(pontoId?: string) {
    const query = pontoId ? `?ponto=${pontoId}` : '';
    navigate(`/dualview-ar${query}`);
  }

  const marksRecomendados = useMemo(() => pontosAr.filter((ponto) => ponto.perspectiva === 'terra').slice(0, 8), [pontosAr]);
  const anunciosVisiveis = useMemo(() => {
    const inicio = Math.floor(Math.random() * anunciosPatrocinio.length);
    return Array.from({ length: 2 }, (_, indice) => anunciosPatrocinio[(inicio + indice) % anunciosPatrocinio.length]);
  }, []);

  return (
    <div className="space-y-4">
      <PainelFiltros filtro={filtro} onFiltro={setFiltro} />

      <div className="grid w-full min-w-0 gap-5 md:grid-cols-[230px_minmax(0,1fr)_230px] lg:grid-cols-[300px_minmax(0,1fr)_320px] xl:grid-cols-[340px_minmax(0,720px)_360px] 2xl:grid-cols-[360px_minmax(0,760px)_380px]">
        <aside className="hidden min-h-0 min-w-0 grid-rows-[auto_1fr_auto] gap-4 md:grid md:h-[calc(100dvh-7.5rem)]">
          <CardBase className="p-3">
            <input value={busca} onChange={(evento) => setBusca(evento.target.value)} className="input-form rounded-full px-3 py-2 text-xs" placeholder="Buscar..." />
          </CardBase>
          <div className="min-h-0">
            <StatusOrbitalLista onAbrirStatus={onVisualizarStatus} onCriarStatus={onAbrirStatus} />
          </div>
          <ListaUltimosChats />
        </aside>

        <div className="min-w-0 space-y-5 md:col-start-2 md:h-[calc(100dvh-7.5rem)] md:overflow-y-auto md:pr-1">
          <div className="md:hidden">
            <CardBase className="p-3">
              <input value={busca} onChange={(evento) => setBusca(evento.target.value)} className="input-form rounded-full px-3 py-2 text-xs" placeholder="Buscar..." />
            </CardBase>
          </div>

          <div className="md:hidden">
            <StatusOrbitalLista onAbrirStatus={onVisualizarStatus} onCriarStatus={onAbrirStatus} />
          </div>

          <div className="space-y-5">
            {postsVisiveis.map((post) => <CardPost key={post.id} post={post} onVerAr={handleVerAr} onAbrirDetalhes={onAbrirDetalhesPost} />)}
            {postsFiltrados.length === 0 ? <CardBase>Nenhuma publicação encontrada para a busca atual.</CardBase> : null}
            <div ref={sentinelaRef} className="h-8" />
          </div>
        </div>

        <aside className="hidden min-h-0 min-w-0 grid-rows-[1fr_auto] gap-4 md:grid md:h-[calc(100dvh-7.5rem)]">
          <CardBase className="min-h-0 overflow-hidden">
            <p className="font-monoapp text-xs font-black uppercase tracking-[0.18em] text-[var(--text-link)]">Patrocínio</p>
            <div className="mt-4 space-y-3">
              {anunciosVisiveis.map(([produto, texto, imagem]) => (
                <div key={produto} className="flex gap-3 overflow-hidden rounded-2xl border border-[var(--border-border)] bg-[var(--bg-muted)] p-2">
                  <img src={imagem} alt={produto} className="h-16 w-16 shrink-0 rounded-xl object-cover" loading="lazy" />
                  <div className="min-w-0 py-1">
                    <p className="text-sm font-black text-[var(--text-text)]">{produto}</p>
                    <p className="mt-1 text-xs leading-5 text-[var(--text-muted)]">{texto}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardBase>
          <CardBase>
            <p className="font-monoapp text-xs font-black uppercase tracking-[0.18em] text-[var(--text-link)]">Marks recomendados</p>
            <div className="mt-4 grid gap-2">
              {marksRecomendados.slice(0, 5).map((ponto) => (
                <button key={ponto.id} onClick={() => handleVerAr(ponto.id)} className="h-10 w-full rounded-2xl border border-[var(--border-border)] bg-[var(--bg-muted)] px-3 text-left text-xs font-bold text-[var(--text-text)] hover:bg-[var(--bg-surface-hover)]">
                  {ponto.nome}
                </button>
              ))}
            </div>
          </CardBase>
        </aside>
      </div>
    </div>
  );
}

function PainelFiltros({ filtro, onFiltro }: { filtro: TipoCategoriaPost | 'todos'; onFiltro: (valor: TipoCategoriaPost | 'todos') => void }) {
  return (
    <section className="relative left-1/2 w-screen -translate-x-1/2 border-y border-[var(--border-border)] bg-[color-mix(in_srgb,var(--bg-background)_90%,transparent)] px-3 py-2 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1440px] gap-2 overflow-x-auto px-2 pb-1">
        {filtrosFeed.map((item) => (
          <button key={item} onClick={() => onFiltro(item)} className={`shrink-0 rounded-full border px-3 py-2 font-monoapp text-[10px] font-black uppercase tracking-[0.08em] ${filtro === item ? 'border-[var(--bg-primary)] bg-[var(--bg-primary)] text-[var(--text-primary)]' : 'border-[var(--border-border)] text-[var(--text-muted)]'}`}>
            {formatarFiltroFeed(item)}
          </button>
        ))}
      </div>
    </section>
  );
}
/* === FEED PAGE | fim === */

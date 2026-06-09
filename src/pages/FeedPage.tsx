import { useEffect, useMemo, useRef, useState, type UIEvent } from 'react';
import { Menu, X } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ListaUltimosChats } from '@/components/chats/ListaUltimosChats';
import { CardPost } from '@/components/feed/CardPost';
import { StatusOrbitalLista } from '@/components/feed/StatusOrbitalLista';
import { CardBase } from '@/components/ui/CardBase';
import { useOrbitLink } from '@/context/OrbitLinkContext';
import { produtosOrbitLink, type ProdutoOrbitLink } from '@/data/produtos.data';
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
const layoutsMosaicoMarks = [
  ['col-span-2 row-span-2', 'col-span-2 row-span-1', 'col-span-1 row-span-1', 'col-span-1 row-span-1'],
  ['col-span-2 row-span-1', 'col-span-1 row-span-1', 'col-span-1 row-span-1', 'col-span-2 row-span-2'],
  ['col-span-1 row-span-1', 'col-span-1 row-span-1', 'col-span-2 row-span-2', 'col-span-2 row-span-1'],
];
const imagensFallbackMarks = [
  'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=700&q=82',
  'https://images.unsplash.com/photo-1517976547714-720226b864c1?auto=format&fit=crop&w=700&q=82',
  'https://images.unsplash.com/photo-1614642264762-d0a3b8bf3700?auto=format&fit=crop&w=700&q=82',
  'https://images.unsplash.com/photo-1454789548928-9efd52dc4031?auto=format&fit=crop&w=700&q=82',
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=700&q=82',
  'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=700&q=82',
];

function selecionarProdutosAleatorios() {
  const embaralhados = [...produtosOrbitLink].sort(() => Math.random() - 0.5);
  return embaralhados.slice(0, 3);
}

function embaralharLista<TipoItem>(lista: TipoItem[]) {
  return [...lista].sort(() => Math.random() - 0.5);
}

function formatarFiltroFeed(item: TipoCategoriaPost | 'todos') {
  return `#${item.replaceAll('_', '')}`;
}

export function FeedPage({ onAbrirStatus, onVisualizarStatus, onAbrirDetalhesPost }: FeedPageProps) {
  const { posts, pontosAr, usuarios } = useOrbitLink();
  const [filtro, setFiltro] = useState<TipoCategoriaPost | 'todos'>('todos');
  const [busca, setBusca] = useState('');
  const [buscaVisivel, setBuscaVisivel] = useState(true);
  const [limitePosts, setLimitePosts] = useState(TAMANHO_LOTE_POSTS);
  const sentinelaRef = useRef<HTMLDivElement | null>(null);
  const feedRef = useRef<HTMLDivElement | null>(null);
  const ultimaRolagemFeedRef = useRef(0);
  const ultimaRolagemJanelaRef = useRef(0);
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
  const marksRecomendados = useMemo(() => pontosAr.filter((ponto) => ponto.perspectiva === 'terra').slice(0, 8), [pontosAr]);
  const [anunciosVisiveis, setAnunciosVisiveis] = useState<ProdutoOrbitLink[]>(selecionarProdutosAleatorios);

  useEffect(() => {
    setLimitePosts(TAMANHO_LOTE_POSTS);
  }, [busca, filtro, pontoFiltro]);

  useEffect(() => {
    const temporizador = window.setInterval(() => setAnunciosVisiveis(selecionarProdutosAleatorios()), 60000);
    return () => window.clearInterval(temporizador);
  }, []);

  useEffect(() => {
    if (!buscaVisivel || busca.trim().length > 0) {
      return undefined;
    }

    const temporizador = window.setTimeout(() => {
      const rolagemFeed = feedRef.current?.scrollTop ?? 0;
      const rolagemAtual = rolagemFeed > 0 ? rolagemFeed : window.scrollY;

      if (rolagemAtual > 20) {
        setBuscaVisivel(false);
      }
    }, 5000);

    return () => window.clearTimeout(temporizador);
  }, [busca, buscaVisivel]);

  useEffect(() => {
    function controlarRolagemJanela() {
      const rolagemAtual = window.scrollY;
      const estaDescendo = rolagemAtual > ultimaRolagemJanelaRef.current;

      if (estaDescendo && rolagemAtual > 20) {
        setBuscaVisivel(false);
      } else {
        setBuscaVisivel(true);
      }

      ultimaRolagemJanelaRef.current = rolagemAtual;
    }

    window.addEventListener('scroll', controlarRolagemJanela, { passive: true });

    return () => window.removeEventListener('scroll', controlarRolagemJanela);
  }, []);

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

  function atualizarBusca(valor: string) {
    setBusca(valor);
    setBuscaVisivel(true);
  }

  function controlarRolagemFeed(evento: UIEvent<HTMLDivElement>) {
    const rolagemAtual = evento.currentTarget.scrollTop;
    const estaDescendo = rolagemAtual > ultimaRolagemFeedRef.current;

    if (estaDescendo && rolagemAtual > 20) {
      setBuscaVisivel(false);
    } else {
      setBuscaVisivel(true);
    }

    ultimaRolagemFeedRef.current = rolagemAtual;
  }

  function handleVerAr(pontoId?: string) {
    const query = pontoId ? `?ponto=${pontoId}` : '';
    navigate(`/dualview-ar${query}`);
  }

  function abrirProduto(produto: ProdutoOrbitLink) {
    navigate(`/loja/${produto.id}`);
  }

  return (
    <div className="flex h-[calc(100dvh-7rem)] min-h-0 flex-col overflow-hidden">
      <PainelFiltros filtro={filtro} onFiltro={setFiltro} />

      <div className="mt-2 grid min-h-0 w-full min-w-0 flex-1 items-start gap-5 overflow-hidden md:grid-cols-[230px_minmax(0,1fr)_230px] lg:grid-cols-[300px_minmax(0,1fr)_320px] xl:grid-cols-[340px_minmax(0,720px)_360px] 2xl:grid-cols-[360px_minmax(0,760px)_380px]">
        <aside className="hidden h-full min-h-0 min-w-0 grid-rows-[minmax(0,3fr)_minmax(0,2fr)] gap-4 overflow-hidden md:grid">
          <StatusOrbitalLista onAbrirStatus={onVisualizarStatus} onCriarStatus={onAbrirStatus} />
          <ListaUltimosChats />
        </aside>

        <div ref={feedRef} onScroll={controlarRolagemFeed} className="sem-scrollbar h-full min-h-0 min-w-0 space-y-4 overflow-y-auto md:col-start-2">
          <div className="md:hidden">
            <StatusOrbitalLista onAbrirStatus={onVisualizarStatus} onCriarStatus={onAbrirStatus} />
          </div>

          <div className={`w-full ${buscaVisivel ? 'block' : 'hidden'}`}>
            <input value={busca} onChange={(evento) => atualizarBusca(evento.target.value)} onFocus={() => setBuscaVisivel(true)} className="input-form h-9 w-full rounded-full border-[var(--bg-primary)] px-3 py-2 text-center text-xs shadow-[0_0_22px_color-mix(in_srgb,var(--bg-primary)_18%,transparent)]" placeholder="Encontre na Orbita" />
          </div>

          <div className="space-y-5">
            {postsVisiveis.map((post) => <CardPost key={post.id} post={post} onVerAr={handleVerAr} onAbrirDetalhes={onAbrirDetalhesPost} />)}
            {postsFiltrados.length === 0 ? <CardBase>Nenhuma publicacao encontrada para a busca atual.</CardBase> : null}
            <div ref={sentinelaRef} className="h-8" />
          </div>
        </div>

        <aside className="hidden h-full min-h-0 min-w-0 grid-rows-[minmax(0,1fr)_auto] gap-4 overflow-hidden md:grid">
          <section className="min-h-0 overflow-hidden rounded-[1.5rem] border border-[var(--border-border)] p-3 shadow-soft">
            <p className="titulo-painel">Patrocínio</p>
            <GaleriaPatrocinio produtos={anunciosVisiveis} onAbrirProduto={abrirProduto} />
          </section>
          <section className="mb-2 rounded-[1.5rem] border border-[var(--border-border)] p-5 shadow-soft">
            <p className="titulo-painel">Marks recomendados</p>
            <GaleriaMarksRecomendados pontos={marksRecomendados.slice(0, 5)} onAbrirMark={handleVerAr} />
          </section>
        </aside>
      </div>
    </div>
  );
}

function GaleriaMarksRecomendados({ pontos, onAbrirMark }: { pontos: ReturnType<typeof useOrbitLink>['pontosAr']; onAbrirMark: (pontoId?: string) => void }) {
  const [pontosMosaico, setPontosMosaico] = useState(() => embaralharLista(pontos).slice(0, 4));
  const [indiceLayout, setIndiceLayout] = useState(0);
  const [indiceImagem, setIndiceImagem] = useState(0);
  const layoutAtual = layoutsMosaicoMarks[indiceLayout % layoutsMosaicoMarks.length];

  useEffect(() => {
    setPontosMosaico(embaralharLista(pontos).slice(0, 4));
  }, [pontos]);

  useEffect(() => {
    const trocaImagens = window.setInterval(() => setIndiceImagem((valor) => valor + 1), 9000);
    const trocaLayout = window.setInterval(() => setIndiceLayout((valor) => valor + 1), 11000);
    const trocaMarks = window.setInterval(() => setPontosMosaico(embaralharLista(pontos).slice(0, 4)), 13000);

    return () => {
      window.clearInterval(trocaMarks);
      window.clearInterval(trocaLayout);
      window.clearInterval(trocaImagens);
    };
  }, [pontos]);

  return (
    <div className="mt-4 grid h-72 w-full grid-cols-4 grid-rows-3 gap-2 overflow-hidden">
      {pontosMosaico.slice(0, 4).map((ponto, indice) => (
        <CardMarkGaleria key={`${ponto.id}_${indice}`} ponto={ponto} classeTamanho={layoutAtual[indice] ?? 'col-span-1 row-span-1'} indiceImagem={indiceImagem + indice} onAbrirMark={onAbrirMark} />
      ))}
    </div>
  );
}

function CardMarkGaleria({ ponto, classeTamanho, indiceImagem, onAbrirMark }: { ponto: ReturnType<typeof useOrbitLink>['pontosAr'][number]; classeTamanho: string; indiceImagem: number; onAbrirMark: (pontoId?: string) => void }) {
  const cor = corCamadaMark(ponto.camada[0]);
  const imagem = ponto.imagem ?? imagensFallbackMarks[indiceImagem % imagensFallbackMarks.length];

  return (
    <button onClick={() => onAbrirMark(ponto.id)} className={`group relative h-full min-h-0 w-full overflow-hidden rounded-2xl border border-[var(--border-border)] bg-transparent text-left transition-all duration-1000 ease-in-out hover:-translate-y-0.5 hover:border-[var(--bg-primary)] ${classeTamanho}`}>
      <img src={imagem} alt={ponto.nome} className="h-full w-full object-cover transition duration-1000 ease-in-out group-hover:scale-105" loading="lazy" />
      <span className="absolute inset-0 opacity-30 mix-blend-screen" style={{ background: `radial-gradient(circle at 25% 20%, ${cor}, transparent 34%)` }} />
      <span className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
      <span className="absolute inset-x-0 bottom-0 p-2">
        <span className="block line-clamp-2 text-[11px] font-black uppercase leading-4 text-white">{ponto.nome}</span>
        <span className="mt-1 line-clamp-2 text-[9px] leading-3 text-white/80">{ponto.descricao}</span>
      </span>
      <span className="absolute left-2 top-2 rounded-full px-2 py-0.5 font-monoapp text-[8px] font-black uppercase text-slate-950" style={{ backgroundColor: cor }}>{ponto.camada[0]}</span>
    </button>
  );
}

function GaleriaPatrocinio({ produtos, onAbrirProduto }: { produtos: ProdutoOrbitLink[]; onAbrirProduto: (produto: ProdutoOrbitLink) => void }) {
  return (
    <div className="mt-4 flex h-[calc(100%-2rem)] min-h-[22rem] gap-2 overflow-hidden">
      {produtos.map((produto) => (
        <button key={produto.id} onClick={() => onAbrirProduto(produto)} className="group relative min-w-0 flex-1 overflow-hidden rounded-2xl border border-[var(--border-border)] bg-transparent text-left transition-[flex] duration-500 hover:flex-[2.4]">
          <img src={produto.imagem} alt={produto.nome} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
          <div className="absolute inset-x-0 top-0 z-20 bg-black/82 p-2">
            <p className="line-clamp-2 text-[11px] font-black leading-4 text-white">{produto.nome}</p>
            <p className="mt-1 line-clamp-3 text-[9px] leading-3 text-white/90">{produto.descricao}</p>
          </div>
        </button>
      ))}
    </div>
  );
}

function corCamadaMark(camada?: string) {
  const cores: Record<string, string> = {
    social: '#22d3ee',
    planetas: '#818cf8',
    lua: '#e5e7eb',
    estacoes: '#38bdf8',
    satelites: '#f97316',
    missoes: '#facc15',
    eventos: '#fb7185',
    cidades: '#34d399',
    turismo: '#a78bfa',
    clima: '#60a5fa',
    biomas: '#4ade80',
    ods: '#2dd4bf',
  };

  return camada ? cores[camada] ?? '#22d3ee' : '#22d3ee';
}

function PainelFiltros({ filtro, onFiltro }: { filtro: TipoCategoriaPost | 'todos'; onFiltro: (valor: TipoCategoriaPost | 'todos') => void }) {
  const [abertoMobile, setAbertoMobile] = useState(false);

  return (
    <section className="z-40 w-full border-y border-[var(--border-border)] bg-[color-mix(in_srgb,var(--bg-background)_92%,transparent)] px-3 py-1 backdrop-blur-xl">
      <button onClick={() => setAbertoMobile((valor) => !valor)} className="mx-auto flex h-8 items-center gap-2 rounded-full border border-[var(--border-border)] px-3 font-monoapp text-[10px] font-black uppercase text-[var(--text-muted)] md:hidden">
        {abertoMobile ? <X className="h-3.5 w-3.5" /> : <Menu className="h-3.5 w-3.5" />}
        Filtros
      </button>
      <div className={`mx-auto w-full flex-wrap items-center justify-center gap-1.5 text-center md:flex ${abertoMobile ? 'mt-2 flex' : 'hidden'}`}>
        {filtrosFeed.map((item) => (
          <button key={item} onClick={() => { onFiltro(item); setAbertoMobile(false); }} className={`shrink-0 rounded-full border px-2.5 py-1 font-monoapp text-[9px] font-black uppercase tracking-[0.06em] ${filtro === item ? 'border-[var(--bg-primary)] bg-[var(--bg-primary)] text-[var(--text-primary)]' : 'border-[var(--border-border)] text-[var(--text-muted)]'}`}>
            {formatarFiltroFeed(item)}
          </button>
        ))}
      </div>
    </section>
  );
}
/* === FEED PAGE | fim === */

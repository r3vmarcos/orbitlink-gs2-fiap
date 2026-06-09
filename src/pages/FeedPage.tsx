import { useEffect, useMemo, useRef, useState, type UIEvent } from "react";
import { Menu, Search, X } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ListaUltimosChats } from "@/components/chats/ListaUltimosChats";
import { CardPost } from "@/components/feed/CardPost";
import { StatusOrbitalLista } from "@/components/feed/StatusOrbitalLista";
import { CardBase } from "@/components/ui/CardBase";
import { useOrbitLink } from "@/context/OrbitLinkContext";
import { produtosOrbitLink, type ProdutoOrbitLink } from "@/data/produtos.data";
import type { PontoAr, PostOrbitLink, StatusOrbital, TipoCategoriaPost } from "@/types/orbitlink.types";

/* === FEED PAGE | inicio === */
interface FeedPageProps {
  onAbrirPost: () => void;
  onAbrirStatus: () => void;
  onVisualizarStatus: (status: StatusOrbital) => void;
  onAbrirDetalhesPost: (post: PostOrbitLink) => void;
}

interface PreviewMark {
  ponto: PontoAr;
  imagem: string;
}

const TAMANHO_LOTE_POSTS = 10;
const placeholdersBuscaFeed = ["ENCONTRE NA ORBITA", "ENCONTRE NO ESPAÇO", "ENCONTRE NA TERRA"];
const filtrosFeed: Array<TipoCategoriaPost | "todos"> = [
  "todos",
  "diario_orbital",
  "missao",
  "estacao",
  "lua",
  "satelite",
  "evento",
  "cidade",
  "turismo",
  "comunidade",
  "clima",
  "bioma",
  "ods",
];
const layoutsMosaicoMarks = [
  ["lg:col-span-2 lg:row-span-2", "lg:col-span-2 lg:row-span-1", "lg:col-span-1 lg:row-span-1", "lg:col-span-1 lg:row-span-1", "lg:col-span-4 lg:row-span-1"],
  ["lg:col-span-1 lg:row-span-1", "lg:col-span-1 lg:row-span-1", "lg:col-span-2 lg:row-span-2", "lg:col-span-2 lg:row-span-1", "lg:col-span-4 lg:row-span-1"],
  ["lg:col-span-4 lg:row-span-1", "lg:col-span-2 lg:row-span-2", "lg:col-span-1 lg:row-span-1", "lg:col-span-1 lg:row-span-1", "lg:col-span-2 lg:row-span-1"],
  ["lg:col-span-4 lg:row-span-1", "lg:col-span-2 lg:row-span-1", "lg:col-span-2 lg:row-span-2", "lg:col-span-1 lg:row-span-1", "lg:col-span-1 lg:row-span-1"],
];
const layoutsTabletMarks = [
  ["row-span-1", "row-span-1", "row-span-1", "row-span-1", "row-span-2"],
  ["row-span-2", "row-span-1", "row-span-1", "row-span-1", "row-span-1"],
  ["row-span-1", "row-span-1", "row-span-2", "row-span-1", "row-span-1"],
];
const imagensFallbackMarks = [
  "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=700&q=82",
  "https://images.unsplash.com/photo-1517976547714-720226b864c1?auto=format&fit=crop&w=700&q=82",
  "https://images.unsplash.com/photo-1614642264762-d0a3b8bf3700?auto=format&fit=crop&w=700&q=82",
  "https://images.unsplash.com/photo-1454789548928-9efd52dc4031?auto=format&fit=crop&w=700&q=82",
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=700&q=82",
  "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=700&q=82",
];

function selecionarProdutosAleatorios() {
  const embaralhados = [...produtosOrbitLink].sort(() => Math.random() - 0.5);
  return embaralhados.slice(0, 3);
}

function embaralharLista<TipoItem>(lista: TipoItem[]) {
  return [...lista].sort(() => Math.random() - 0.5);
}

function formatarFiltroFeed(item: TipoCategoriaPost | "todos") {
  return `#${item.replaceAll("_", "")}`;
}

function atualizarCabecalhoMobile(oculto: boolean) {
  if (!window.matchMedia("(max-width: 767px)").matches) {
    return;
  }

  window.dispatchEvent(new CustomEvent("orbitlink:cabecalho-mobile", { detail: { oculto } }));
}

export function FeedPage({ onAbrirStatus, onVisualizarStatus, onAbrirDetalhesPost }: FeedPageProps) {
  const { posts, pontosAr, usuarios } = useOrbitLink();
  const [filtrosAtivos, setFiltrosAtivos] = useState<TipoCategoriaPost[]>([]);
  const [busca, setBusca] = useState("");
  const [buscaVisivel, setBuscaVisivel] = useState(true);
  const [indicePlaceholderBusca, setIndicePlaceholderBusca] = useState(0);
  const [limitePosts, setLimitePosts] = useState(TAMANHO_LOTE_POSTS);
  const sentinelaRef = useRef<HTMLDivElement | null>(null);
  const feedRef = useRef<HTMLDivElement | null>(null);
  const ultimaRolagemFeedRef = useRef(0);
  const ultimaRolagemJanelaRef = useRef(0);
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const pontoFiltro = params.get("ponto");

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
      .filter((post) => filtrosAtivos.length === 0 || filtrosAtivos.includes(post.categoria))
      .filter((post) => {
        const ponto = pontosAr.find((item) => item.id === post.pontoArId);
        const autor = usuarios.find((item) => item.id === post.autorId);
        const alvo =
          `${post.titulo} ${post.texto} ${post.categoria} ${ponto?.nome ?? ""} ${autor?.nome ?? ""} ${autor?.usuario ?? ""} ${autor?.localizacaoAtual ?? ""}`.toLowerCase();
        return alvo.includes(busca.toLowerCase());
      })
      .sort((a, b) => new Date(b.criadoEm).getTime() - new Date(a.criadoEm).getTime());
  }, [busca, filtrosAtivos, pontoFiltro, pontosAr, posts, usuarios]);

  const postsVisiveis = useMemo(() => postsFiltrados.slice(0, limitePosts), [limitePosts, postsFiltrados]);
  const marksRecomendados = useMemo(() => selecionarMarksDiversos(pontosAr), [pontosAr]);
  const [anunciosVisiveis, setAnunciosVisiveis] = useState<ProdutoOrbitLink[]>(selecionarProdutosAleatorios);

  useEffect(() => {
    setLimitePosts(TAMANHO_LOTE_POSTS);
  }, [busca, filtrosAtivos, pontoFiltro]);

  useEffect(() => {
    const temporizador = window.setInterval(() => setAnunciosVisiveis(selecionarProdutosAleatorios()), 60000);
    return () => window.clearInterval(temporizador);
  }, []);

  useEffect(() => {
    const temporizador = window.setInterval(() => {
      setIndicePlaceholderBusca((valorAtual) => (valorAtual + 1) % placeholdersBuscaFeed.length);
    }, 2400);

    return () => window.clearInterval(temporizador);
  }, []);

  useEffect(() => {
    return () => {
      atualizarCabecalhoMobile(false);
    };
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
        atualizarCabecalhoMobile(true);
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
        atualizarCabecalhoMobile(true);
      } else {
        setBuscaVisivel(true);
        atualizarCabecalhoMobile(false);
      }

      ultimaRolagemJanelaRef.current = rolagemAtual;
    }

    window.addEventListener("scroll", controlarRolagemJanela, { passive: true });

    return () => window.removeEventListener("scroll", controlarRolagemJanela);
  }, []);

  useEffect(() => {
    const sentinela = sentinelaRef.current;

    if (!sentinela) {
      return undefined;
    }

    const observador = new IntersectionObserver(
      (entradas) => {
        const chegouPertoDoFim = entradas.some((entrada) => entrada.isIntersecting);

        if (chegouPertoDoFim) {
          setLimitePosts((valorAtual) => Math.min(valorAtual + TAMANHO_LOTE_POSTS, postsFiltrados.length));
        }
      },
      { rootMargin: "420px 0px" },
    );

    observador.observe(sentinela);

    return () => observador.disconnect();
  }, [postsFiltrados.length]);

  function atualizarBusca(valor: string) {
    setBusca(valor);
    setBuscaVisivel(true);
    atualizarCabecalhoMobile(false);
  }

  function controlarRolagemFeed(evento: UIEvent<HTMLDivElement>) {
    const rolagemAtual = evento.currentTarget.scrollTop;
    const estaDescendo = rolagemAtual > ultimaRolagemFeedRef.current;

    if (estaDescendo && rolagemAtual > 20) {
      setBuscaVisivel(false);
      atualizarCabecalhoMobile(true);
    } else {
      setBuscaVisivel(true);
      atualizarCabecalhoMobile(false);
    }

    ultimaRolagemFeedRef.current = rolagemAtual;
  }

  function handleVerAr(pontoId?: string, camada?: string) {
    const query = pontoId ? `?ponto=${encodeURIComponent(pontoId)}${camada ? `&camada=${encodeURIComponent(camada)}` : ""}` : "";
    navigate(`/dualview-ar${query}`);
  }

  function abrirProduto(produto: ProdutoOrbitLink) {
    navigate(`/loja/${produto.id}`);
  }

  return (
    <div className={`flex min-h-0 flex-col overflow-hidden transition-[height] duration-300 md:h-[calc(100dvh-7rem)] ${buscaVisivel ? "h-[calc(100dvh-7rem)]" : "h-[calc(100dvh-1rem)]"}`}>
      <PainelFiltros filtrosAtivos={filtrosAtivos} onFiltrosAtivos={setFiltrosAtivos} busca={busca} onBusca={atualizarBusca} indicePlaceholderBusca={indicePlaceholderBusca} buscaVisivel={buscaVisivel} onFocarBusca={() => setBuscaVisivel(true)} />

      <div className="mt-0 grid min-h-0 w-full min-w-0 flex-1 items-start gap-5 overflow-hidden pb-1 md:mt-4 md:grid-cols-[minmax(0,30%)_minmax(0,50%)_minmax(0,20%)] md:gap-0 lg:grid-cols-[300px_minmax(0,1fr)_320px] lg:gap-5 xl:grid-cols-[340px_minmax(0,720px)_360px] 2xl:grid-cols-[360px_minmax(0,760px)_380px]">
        <aside className="hidden h-full min-h-0 min-w-0 grid-rows-[minmax(0,2fr)_minmax(0,1.35fr)_minmax(0,1.45fr)] gap-2 overflow-hidden pr-2 md:grid lg:grid-rows-[minmax(0,3fr)_minmax(0,2fr)] lg:gap-4 lg:pr-0">
          <StatusOrbitalLista onAbrirStatus={onVisualizarStatus} onCriarStatus={onAbrirStatus} />
          <section className="min-h-0 overflow-hidden rounded-[1.5rem] border border-[var(--border-border)] p-2 shadow-soft lg:hidden">
            <p className="titulo-painel">Patrocínio</p>
            <GaleriaPatrocinio produtos={anunciosVisiveis.slice(0, 2)} onAbrirProduto={abrirProduto} />
          </section>
          <ListaUltimosChats />
        </aside>

        <div ref={feedRef} onScroll={controlarRolagemFeed} className="sem-scrollbar h-full min-h-0 min-w-0 space-y-4 overflow-y-auto px-2 pb-1 md:col-start-2 lg:px-0">
          <div className="md:hidden">
            <StatusOrbitalLista onAbrirStatus={onVisualizarStatus} onCriarStatus={onAbrirStatus} />
          </div>

          <div className={`relative w-full ${buscaVisivel ? "hidden md:block" : "hidden"}`}>
            <input
              value={busca}
              onChange={(evento) => atualizarBusca(evento.target.value)}
              onFocus={() => setBuscaVisivel(true)}
              className="input-form h-9 w-full rounded-[15px] border-[var(--bg-primary)] px-10 py-4 text-center text-[0.9rem] uppercase shadow-[0_0_22px_color-mix(in_srgb,var(--bg-primary)_18%,transparent)]"
              placeholder=""
            />
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-placeholder)]" />
            {busca.length === 0 ? (
              <span key={placeholdersBuscaFeed[indicePlaceholderBusca]} className="animacao-morphing-placeholder pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden whitespace-nowrap font-monoapp text-[0.9rem] font-black uppercase tracking-[0.08em] text-[var(--text-placeholder)]">
                {placeholdersBuscaFeed[indicePlaceholderBusca]}
              </span>
            ) : null}
          </div>

          <div className="space-y-5">
            {postsVisiveis.map((post) => (
              <CardPost key={post.id} post={post} onVerAr={handleVerAr} onAbrirDetalhes={onAbrirDetalhesPost} />
            ))}
            {postsFiltrados.length === 0 ? <CardBase>Nenhuma publicacao encontrada para a busca atual.</CardBase> : null}
            <div ref={sentinelaRef} className="h-8" />
          </div>
        </div>

        <aside className="hidden h-full min-h-0 min-w-0 grid-rows-1 overflow-hidden pl-2 md:grid lg:grid-rows-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-4 lg:pl-0">
          <section className="hidden min-h-0 overflow-hidden rounded-[1.5rem] border border-[var(--border-border)] p-3 shadow-soft lg:block">
            <p className="titulo-painel">Patrocínio</p>
            <GaleriaPatrocinio produtos={anunciosVisiveis} onAbrirProduto={abrirProduto} />
          </section>
          <section className="min-h-0 overflow-hidden rounded-[1.5rem] border border-[var(--border-border)] p-2 shadow-soft lg:p-5">
            <p className="titulo-painel">Marks recomendados</p>
            <GaleriaMarksRecomendados pontos={marksRecomendados} onAbrirMark={handleVerAr} />
          </section>
        </aside>
      </div>
    </div>
  );
}

function selecionarMarksDiversos(pontos: PontoAr[]) {
  const camadasPreferidas = ["social", "planetas", "lua", "estacoes", "satelites", "missoes", "eventos", "cidades", "turismo", "clima", "biomas", "ods"];
  const selecionados: PontoAr[] = [];
  const idsSelecionados = new Set<string>();

  camadasPreferidas.forEach((camada) => {
    const ponto = pontos.find((item) => item.perspectiva === "terra" && item.camada.includes(camada as PontoAr["camada"][number]) && !idsSelecionados.has(item.id));

    if (ponto) {
      selecionados.push(ponto);
      idsSelecionados.add(ponto.id);
    }
  });

  if (selecionados.length < 12) {
    pontos
      .filter((ponto) => ponto.perspectiva === "terra" && !idsSelecionados.has(ponto.id))
      .slice(0, 12 - selecionados.length)
      .forEach((ponto) => {
        selecionados.push(ponto);
        idsSelecionados.add(ponto.id);
      });
  }

  return selecionados.slice(0, 12);
}

function GaleriaMarksRecomendados({ pontos, onAbrirMark }: { pontos: ReturnType<typeof useOrbitLink>["pontosAr"]; onAbrirMark: (pontoId?: string, camada?: string) => void }) {
  const [pontosMosaico, setPontosMosaico] = useState(() => montarPontosMosaico(pontos));
  const [indiceImagem, setIndiceImagem] = useState(0);
  const [indiceLayout, setIndiceLayout] = useState(0);
  const [visivel, setVisivel] = useState(true);
  const [previewMark, setPreviewMark] = useState<PreviewMark | null>(null);
  const atrasoTrocaRef = useRef<number | null>(null);
  const layoutAtual = layoutsMosaicoMarks[indiceLayout % layoutsMosaicoMarks.length];
  const layoutTabletAtual = layoutsTabletMarks[indiceLayout % layoutsTabletMarks.length];

  useEffect(() => {
    setPontosMosaico(montarPontosMosaico(pontos));
  }, [pontos]);

  useEffect(() => {
    if (pontos.length === 0) {
      return undefined;
    }

    const trocaMarks = window.setInterval(() => {
      setVisivel(false);

      atrasoTrocaRef.current = window.setTimeout(() => {
        setIndiceImagem((valor) => valor + 1);
        setIndiceLayout((valor) => valor + 1);
        setPontosMosaico(montarPontosMosaico(pontos));
        setVisivel(true);
      }, 650);
    }, 9000);

    return () => {
      window.clearInterval(trocaMarks);
      if (atrasoTrocaRef.current) {
        window.clearTimeout(atrasoTrocaRef.current);
      }
    };
  }, [pontos]);

  return (
    <>
      <div
        className={`mt-4 grid h-[calc(100%-2rem)] min-h-0 w-full grid-flow-row-dense grid-cols-1 grid-rows-6 gap-2 overflow-hidden transition-opacity duration-700 ease-in-out lg:grid-cols-4 lg:grid-rows-3 ${visivel ? "opacity-100" : "opacity-0"}`}
      >
        {pontosMosaico.map((ponto, indice) => (
          <CardMarkGaleria
            key={`${ponto.id}_${indice}`}
            ponto={ponto}
            classeTamanho={`${classeTabletMark(indice, layoutTabletAtual)} ${layoutAtual[indice] ?? "lg:col-span-1 lg:row-span-1"}`}
            indiceImagem={indiceImagem + indice}
            onAbrirMark={onAbrirMark}
            onPreview={setPreviewMark}
          />
        ))}
      </div>
      <PreviewCentralMark preview={previewMark} />
    </>
  );
}

function classeTabletMark(indice: number, layoutTabletAtual: string[]) {
  return `col-span-1 ${layoutTabletAtual[indice] ?? "row-span-1"} lg:block`;
}

function montarPontosMosaico(pontos: PontoAr[]): PontoAr[] {
  if (pontos.length === 0) {
    return [];
  }

  const pontosAleatorios = embaralharLista(pontos);

  const quantidadeCardsMosaico = layoutsMosaicoMarks[0].length;

  if (pontosAleatorios.length >= quantidadeCardsMosaico) {
    return pontosAleatorios.slice(0, quantidadeCardsMosaico);
  }

  return Array.from({ length: quantidadeCardsMosaico }, (_, indice) => pontosAleatorios[indice % pontosAleatorios.length]);
}

function CardMarkGaleria({
  ponto,
  classeTamanho,
  indiceImagem,
  onAbrirMark,
  onPreview,
}: {
  ponto: ReturnType<typeof useOrbitLink>["pontosAr"][number];
  classeTamanho: string;
  indiceImagem: number;
  onAbrirMark: (pontoId?: string, camada?: string) => void;
  onPreview: (preview: PreviewMark | null) => void;
}) {
  const cor = corCamadaMark(ponto.camada[0]);
  const imagem = ponto.imagem ?? imagensFallbackMarks[indiceImagem % imagensFallbackMarks.length];

  return (
    <button
      onClick={() => onAbrirMark(ponto.id, ponto.camada[0])}
      onMouseEnter={() => onPreview({ ponto, imagem })}
      onMouseLeave={() => onPreview(null)}
      onFocus={() => onPreview({ ponto, imagem })}
      onBlur={() => onPreview(null)}
      className={`group relative h-full min-h-0 w-full overflow-hidden rounded-2xl bg-transparent text-left transition-all duration-1000 ease-in-out hover:-translate-y-0.5 ${classeTamanho}`}
    >
      <img src={imagem} alt={ponto.nome} className="block h-full w-[180%] max-w-none -translate-x-[22.222%] object-cover object-center transition duration-1000 ease-in-out group-hover:scale-105" loading="lazy" />
      <span className="absolute inset-0 opacity-30 mix-blend-screen" style={{ background: `radial-gradient(circle at 25% 20%, ${cor}, transparent 34%)` }} />
      <span className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
      <span className="absolute inset-x-0 bottom-0 p-2">
        <span className="block line-clamp-2 text-[11px] font-black uppercase leading-4 text-white">{ponto.nome}</span>
        <span className="mt-1 line-clamp-2 text-[9px] leading-3 text-white/80">{ponto.descricao}</span>
      </span>
      <span className="absolute left-2 top-2 rounded-full px-2 py-0.5 font-monoapp text-[8px] font-black uppercase text-slate-950" style={{ backgroundColor: cor }}>
        {ponto.camada[0]}
      </span>
    </button>
  );
}

function PreviewCentralMark({ preview }: { preview: PreviewMark | null }) {
  const cor = corCamadaMark(preview?.ponto.camada[0]);

  return (
    <div
      className={`pointer-events-none fixed left-1/2 top-1/2 z-[90] w-[min(76vw,26rem)] -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-out ${preview ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
      aria-hidden={!preview}
    >
      {preview ? (
        <div className="overflow-hidden rounded-[1.35rem] border border-[var(--border-border)] bg-[color-mix(in_srgb,var(--bg-popover)_94%,transparent)] shadow-[0_28px_80px_rgba(0,0,0,0.55)] backdrop-blur-xl">
          <div className="relative h-52 overflow-hidden">
            <img src={preview.imagem} alt="" className="h-full w-[180%] max-w-none -translate-x-[22.222%] object-cover object-center" />
            <span className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/18 to-transparent" />
            <span className="absolute left-4 top-4 rounded-full px-3 py-1 font-monoapp text-[10px] font-black uppercase text-slate-950" style={{ backgroundColor: cor }}>
              {preview.ponto.camada[0]}
            </span>
            <div className="absolute inset-x-0 bottom-0 p-4">
              <p className="text-xl font-black uppercase leading-6 text-white">{preview.ponto.nome}</p>
              <p className="mt-2 line-clamp-3 text-sm font-semibold leading-5 text-white/80">{preview.ponto.descricao}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 p-3">
            {preview.ponto.dadosResumo.slice(0, 4).map((dado) => (
              <span key={dado} className="rounded-xl border border-white/10 bg-white/[0.08] px-3 py-2 text-[11px] font-bold text-[var(--text-text)]">
                {dado}
              </span>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function GaleriaPatrocinio({ produtos, onAbrirProduto }: { produtos: ProdutoOrbitLink[]; onAbrirProduto: (produto: ProdutoOrbitLink) => void }) {
  return (
    <div className="mt-4 flex h-[calc(100%-2rem)] min-h-0 gap-2 overflow-hidden">
      {produtos.map((produto) => (
        <button
          key={produto.id}
          onClick={() => onAbrirProduto(produto)}
          className="group relative min-w-0 flex-1 overflow-hidden rounded-2xl border border-[var(--border-border)] bg-transparent text-left transition-[flex] duration-500 hover:flex-[2.4]"
        >
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
    social: "#22d3ee",
    planetas: "#818cf8",
    lua: "#e5e7eb",
    estacoes: "#38bdf8",
    satelites: "#f97316",
    missoes: "#facc15",
    eventos: "#fb7185",
    cidades: "#34d399",
    turismo: "#a78bfa",
    clima: "#60a5fa",
    biomas: "#4ade80",
    ods: "#2dd4bf",
  };

  return camada ? (cores[camada] ?? "#22d3ee") : "#22d3ee";
}

function PainelFiltros({
  filtrosAtivos,
  onFiltrosAtivos,
  busca,
  onBusca,
  indicePlaceholderBusca,
  buscaVisivel,
  onFocarBusca,
}: {
  filtrosAtivos: TipoCategoriaPost[];
  onFiltrosAtivos: (valor: TipoCategoriaPost[]) => void;
  busca: string;
  onBusca: (valor: string) => void;
  indicePlaceholderBusca: number;
  buscaVisivel: boolean;
  onFocarBusca: () => void;
}) {
  const [abertoMobile, setAbertoMobile] = useState(false);

  function alternarFiltro(item: TipoCategoriaPost | "todos") {
    if (item === "todos") {
      onFiltrosAtivos([]);
      return;
    }

    const proximoFiltro = filtrosAtivos.includes(item) ? filtrosAtivos.filter((valor) => valor !== item) : [...filtrosAtivos, item];
    onFiltrosAtivos(proximoFiltro);
  }

  return (
    <section className={`relative z-40 w-full border-y border-[var(--border-border)] bg-transparent px-3 py-2 backdrop-blur-xl md:block ${buscaVisivel ? "block" : "hidden"}`}>
      <div className="grid min-h-0 grid-cols-[2.5rem_minmax(0,1fr)] items-start gap-2 md:hidden">
        <div className="relative">
          <button onClick={() => setAbertoMobile((valor) => !valor)} className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border-border)] text-[var(--text-muted)]" aria-label="Abrir filtros">
            {abertoMobile ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
          {abertoMobile ? (
            <div className="sem-scrollbar absolute left-0 top-11 z-[100] flex max-h-[70dvh] w-32 flex-col items-stretch gap-1 overflow-y-auto rounded-2xl border border-[var(--border-border)] bg-[var(--bg-popover)] p-2 shadow-soft">
              {filtrosFeed.map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    alternarFiltro(item);
                  }}
                  className={`shrink-0 rounded-full border px-2.5 py-1 font-monoapp text-[9px] font-black uppercase tracking-[0.06em] backdrop-blur-sm ${(item === "todos" && filtrosAtivos.length === 0) || (item !== "todos" && filtrosAtivos.includes(item)) ? "border-[var(--bg-primary)] bg-[var(--bg-primary)] text-[var(--text-primary)]" : "border-[var(--border-border)] bg-[var(--bg-muted)] text-[var(--text-muted)]"}`}
                >
                  {formatarFiltroFeed(item)}
                </button>
              ))}
            </div>
          ) : null}
        </div>

        <div className={`relative w-full ${buscaVisivel ? "block" : "hidden"}`}>
          <input
            value={busca}
            onChange={(evento) => onBusca(evento.target.value)}
            onFocus={onFocarBusca}
            className="input-form h-9 w-full rounded-[15px] border-[var(--bg-primary)] px-10 py-4 text-center text-[0.78rem] uppercase shadow-[0_0_22px_color-mix(in_srgb,var(--bg-primary)_18%,transparent)]"
            placeholder=""
          />
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-placeholder)]" />
          {busca.length === 0 ? (
            <span key={placeholdersBuscaFeed[indicePlaceholderBusca]} className="animacao-morphing-placeholder pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden whitespace-nowrap px-9 text-center font-monoapp text-[clamp(0.58rem,2.2vw,0.72rem)] font-black uppercase tracking-[0.04em] text-[var(--text-placeholder)]">
              {placeholdersBuscaFeed[indicePlaceholderBusca]}
            </span>
          ) : null}
        </div>
      </div>

      <div className="sem-scrollbar mx-auto hidden w-full items-center justify-center gap-1 overflow-x-auto whitespace-nowrap text-center md:flex lg:flex-wrap lg:gap-1.5 lg:overflow-visible">
        {filtrosFeed.map((item) => (
          <button
            key={item}
            onClick={() => {
              alternarFiltro(item);
            }}
            className={`shrink-0 rounded-full border px-1.5 py-1 font-monoapp text-[8px] font-black uppercase tracking-[0.04em] lg:px-2.5 lg:text-[14px] lg:tracking-[0.06em] ${(item === "todos" && filtrosAtivos.length === 0) || (item !== "todos" && filtrosAtivos.includes(item)) ? "border-[var(--bg-primary)] bg-[var(--bg-primary)] text-[var(--text-primary)]" : "border-[var(--border-border)] text-[var(--text-muted)]"}`}
          >
            {formatarFiltroFeed(item)}
          </button>
        ))}
      </div>
    </section>
  );
}
/* === FEED PAGE | fim === */

import { Compass, Layers3, Map, ZoomIn, ZoomOut } from 'lucide-react';
import type { PointerEvent, TouchEvent } from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Badge } from '@/components/ui/Badge';
import { Botao } from '@/components/ui/Botao';
import { useOrbitLink } from '@/context/OrbitLinkContext';
import type { PontoAr, TipoCamadaAr } from '@/types/orbitlink.types';

/* === DUALVIEW AR | inicio === */
interface DualViewArProps {
  pontoInicialId?: string;
  onVerPosts: (pontoId: string) => void;
  onVerStatus: (pontoId: string) => void;
}

const camadasOrbitlink: TipoCamadaAr[] = ['social', 'planetas', 'lua', 'estacoes', 'satelites', 'missoes', 'eventos', 'cidades', 'turismo', 'clima', 'biomas', 'ods'];
const campoVisaoHorizontalBase = 72;
const campoVisaoVerticalBase = 58;
const intensidadeArrasteCamera = 0.32;
const perspectivaCamera = 'terra';

export function DualViewAr({ pontoInicialId, onVerPosts, onVerStatus }: DualViewArProps) {
  const { pontosAr, sincronizarApisNasa, carregandoApi } = useOrbitLink();
  const [camadasAtivas, setCamadasAtivas] = useState<TipoCamadaAr[]>(camadasOrbitlink);
  const [pontoSelecionadoId, setPontoSelecionadoId] = useState<string | undefined>(pontoInicialId);
  const [erroCamera, setErroCamera] = useState<string | undefined>();
  const [visaoCamera, setVisaoCamera] = useState({ azimute: 0, inclinacao: 70 });
  const [calibracaoInclinacao, setCalibracaoInclinacao] = useState(0);
  const [zoomCamera, setZoomCamera] = useState(1);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const arrasteRef = useRef<{ ativo: boolean; x: number; y: number }>({ ativo: false, x: 0, y: 0 });
  const toquePinchRef = useRef<{ distancia: number; zoom: number } | undefined>(undefined);
  const ultimaInclinacaoSensorRef = useRef(70);

  const pontosVisiveis = useMemo(() => {
    return pontosAr.filter((ponto) => ponto.perspectiva === perspectivaCamera && ponto.camada.some((camada) => camadasAtivas.includes(camada)));
  }, [camadasAtivas, pontosAr]);
  const pontosMapa = useMemo(() => {
    return pontosAr.filter((ponto) => ponto.perspectiva === 'espaco' && ponto.camada.some((camada) => camadasAtivas.includes(camada)));
  }, [camadasAtivas, pontosAr]);
  const pontoSelecionado = pontosAr.find((ponto) => ponto.id === pontoSelecionadoId);

  useEffect(() => {
    let streamAtual: MediaStream | undefined;

    async function iniciarCamera() {
      try {
        setErroCamera(undefined);
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { ideal: 'environment' } },
          audio: false,
        });
        streamAtual = stream;

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }
      } catch {
        setErroCamera('Camera indisponivel neste contexto. Use HTTPS, localhost ou mantenha a simulacao por arraste.');
      }
    }

    void iniciarCamera();

    return () => {
      streamAtual?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  function alternarCamada(camada: TipoCamadaAr) {
    setCamadasAtivas((atuais) => (atuais.includes(camada) ? atuais.filter((item) => item !== camada) : [...atuais, camada]));
  }

  async function solicitarPermissaoMovimento() {
    const eventoOrientacao = window.DeviceOrientationEvent as typeof DeviceOrientationEvent & {
      requestPermission?: () => Promise<'granted' | 'denied'>;
    } | undefined;

    if (typeof eventoOrientacao?.requestPermission === 'function') {
      try {
        await eventoOrientacao.requestPermission();
      } catch {
        setErroCamera('Permissao de movimento indisponivel. Use o arraste na tela para simular a camera 360.');
      }
    }
  }

  function iniciarArrasteCamera(evento: PointerEvent<HTMLDivElement>) {
    if (evento.target === evento.currentTarget) {
      setPontoSelecionadoId(undefined);
    }

    arrasteRef.current = { ativo: true, x: evento.clientX, y: evento.clientY };
    evento.currentTarget.setPointerCapture(evento.pointerId);
  }

  function moverArrasteCamera(evento: PointerEvent<HTMLDivElement>) {
    if (!arrasteRef.current.ativo) {
      return;
    }

    const deslocamentoX = evento.clientX - arrasteRef.current.x;
    const deslocamentoY = evento.clientY - arrasteRef.current.y;
    arrasteRef.current = { ativo: true, x: evento.clientX, y: evento.clientY };

    setVisaoCamera((atual) => ({
      azimute: normalizarGraus(atual.azimute + deslocamentoX * intensidadeArrasteCamera),
      inclinacao: limitar(atual.inclinacao - deslocamentoY * intensidadeArrasteCamera, -12, 88),
    }));
  }

  function finalizarArrasteCamera() {
    arrasteRef.current.ativo = false;
  }

  useEffect(() => {
    function atualizarOrientacaoCamera(evento: DeviceOrientationEvent) {
      if (typeof evento.alpha !== 'number' && typeof evento.beta !== 'number') {
        return;
      }

      const inclinacaoBruta = limitar(90 - (evento.beta ?? 90), -12, 88);
      ultimaInclinacaoSensorRef.current = inclinacaoBruta;

      setVisaoCamera({
        azimute: normalizarGraus(360 - (evento.alpha ?? 0)),
        inclinacao: limitar(inclinacaoBruta + calibracaoInclinacao, -12, 88),
      });
    }

    void solicitarPermissaoMovimento();
    window.addEventListener('deviceorientation', atualizarOrientacaoCamera);
    return () => window.removeEventListener('deviceorientation', atualizarOrientacaoCamera);
  }, [calibracaoInclinacao]);

  function calibrarCeu() {
    const deslocamento = 72 - ultimaInclinacaoSensorRef.current;
    setCalibracaoInclinacao(deslocamento);
    setVisaoCamera((atual) => ({ ...atual, inclinacao: 72 }));
  }

  function handleToquePinch(evento: TouchEvent<HTMLDivElement>) {
    if (evento.touches.length !== 2) {
      toquePinchRef.current = undefined;
      return;
    }

    const distancia = Math.hypot(
      evento.touches[0].clientX - evento.touches[1].clientX,
      evento.touches[0].clientY - evento.touches[1].clientY,
    );

    if (!toquePinchRef.current) {
      toquePinchRef.current = { distancia, zoom: zoomCamera };
      return;
    }

    setZoomCamera(limitar(toquePinchRef.current.zoom * (distancia / toquePinchRef.current.distancia), 0.8, 2.8));
  }

  return (
    <>
      <div className="fixed inset-0 z-[49] h-[100dvh] w-[100vw] overflow-hidden bg-slate-950 lg:hidden">
        <div
          className="relative h-[100dvh] w-[100vw] touch-none overflow-hidden bg-slate-950 light-theme:bg-sky-50"
          onPointerDown={iniciarArrasteCamera}
          onPointerMove={moverArrasteCamera}
          onPointerUp={finalizarArrasteCamera}
          onPointerCancel={finalizarArrasteCamera}
          onPointerLeave={finalizarArrasteCamera}
          onTouchMove={handleToquePinch}
          onTouchEnd={() => {
            toquePinchRef.current = undefined;
          }}
        >
          <video ref={videoRef} className="pointer-events-none absolute inset-0 h-full w-full object-cover" playsInline muted autoPlay />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0,rgba(2,6,23,.18)_40%,rgba(2,6,23,.65)_100%)] light-theme:bg-[radial-gradient(circle_at_center,transparent_0,rgba(255,247,237,.08)_40%,rgba(255,69,0,.18)_100%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(0,229,255,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(0,229,255,.12)_1px,transparent_1px)] bg-[length:42px_42px]" />
          {pontosVisiveis.map((ponto) => (
            <PontoArVisual key={ponto.id} ponto={ponto} ativo={ponto.id === pontoSelecionado?.id} visaoCamera={visaoCamera} zoomCamera={zoomCamera} onSelecionar={() => setPontoSelecionadoId(ponto.id)} onAbrir={() => onVerPosts(ponto.id)} />
          ))}
          <div className="pointer-events-none absolute left-2 top-2 z-10 rounded-full border border-cyan-300/25 bg-slate-950/35 px-2 py-0.5 font-monoapp text-[9px] font-black text-cyan-100 backdrop-blur-md light-theme:bg-white/55 light-theme:text-sky-900">
            {zoomCamera.toFixed(1)}x
          </div>
          <div className="absolute right-3 top-3 z-30 flex gap-2">
            <button aria-label="Calibrar ceu" onClick={calibrarCeu} className="flex h-10 items-center gap-1 rounded-full border border-cyan-300/35 bg-slate-950/55 px-3 font-monoapp text-[9px] font-black uppercase text-cyan-100 backdrop-blur-md light-theme:bg-white/65 light-theme:text-sky-900">
              <Compass className="h-4 w-4" />
              Calibrar
            </button>
            <button aria-label="Diminuir zoom" onClick={() => setZoomCamera((atual) => limitar(atual - 0.2, 0.8, 2.4))} className="flex h-10 w-10 items-center justify-center rounded-full border border-cyan-300/35 bg-slate-950/55 text-cyan-100 backdrop-blur-md light-theme:bg-white/65 light-theme:text-sky-900">
              <ZoomOut className="h-4 w-4" />
            </button>
            <button aria-label="Aumentar zoom" onClick={() => setZoomCamera((atual) => limitar(atual + 0.2, 0.8, 2.4))} className="flex h-10 w-10 items-center justify-center rounded-full border border-cyan-300/35 bg-slate-950/55 text-cyan-100 backdrop-blur-md light-theme:bg-white/65 light-theme:text-sky-900">
              <ZoomIn className="h-4 w-4" />
            </button>
          </div>
          <div className="absolute left-3 right-3 top-14 z-30">
            <MenuCamadas camadasAtivas={camadasAtivas} onAlternarCamada={alternarCamada} />
          </div>
          <div className="absolute bottom-24 left-3 right-3 flex flex-wrap gap-2">
            <Badge tom="azul">{pontosVisiveis.length} marks ativos</Badge>
            <Badge tom="verde">Camera ativa</Badge>
            <Badge tom="roxo">AR Terra</Badge>
          </div>
          {erroCamera ? <div className="absolute left-3 right-3 top-16 z-30 rounded-2xl border border-amber-400/50 bg-amber-500/15 p-3 text-xs font-bold leading-5 text-amber-100 light-theme:text-amber-800 sm:left-4 sm:right-4 sm:text-sm">{erroCamera}</div> : null}
        </div>
      </div>

      <section className="hidden lg:block">
        <div className="mb-3 flex items-center justify-between gap-3">
          <div>
            <p className="font-monoapp text-[10px] font-black uppercase tracking-[0.18em] text-[var(--text-link)]">Mapa</p>
            <h1 className="text-lg font-black uppercase text-[var(--text-text)]">Mapa Orbitlink</h1>
          </div>
          <Botao tamanho="sm" variante="secundario" onClick={() => void sincronizarApisNasa()} disabled={carregandoApi}>{carregandoApi ? 'Sincronizando' : 'NASA'}</Botao>
        </div>
        <MenuCamadas camadasAtivas={camadasAtivas} onAlternarCamada={alternarCamada} />
        <MapaMarks pontos={pontosMapa} pontoSelecionadoId={pontoSelecionadoId} onSelecionar={setPontoSelecionadoId} onAbrir={onVerPosts} />
      </section>
    </>
  );
}

function PontoArVisual({ ponto, ativo, visaoCamera, zoomCamera, onSelecionar, onAbrir }: { ponto: PontoAr; ativo: boolean; visaoCamera: { azimute: number; inclinacao: number }; zoomCamera: number; onSelecionar: () => void; onAbrir: () => void }) {
  const cor = corCamada(ponto.camada[0]);
  const campoVisaoHorizontal = campoVisaoHorizontalBase / zoomCamera;
  const campoVisaoVertical = campoVisaoVerticalBase / zoomCamera;
  const direcaoPonto = ponto.x * 3.6;
  const altitudePonto = calcularAltitudePonto(ponto);
  const deltaHorizontal = menorDiferencaGraus(direcaoPonto, visaoCamera.azimute);
  const deltaVertical = altitudePonto - visaoCamera.inclinacao;
  const visivel = Math.abs(deltaHorizontal) <= campoVisaoHorizontal && Math.abs(deltaVertical) <= campoVisaoVertical;
  const esquerda = 50 + (deltaHorizontal / campoVisaoHorizontal) * 48;
  const topo = 50 - (deltaVertical / campoVisaoVertical) * 44;

  if (!visivel) {
    return null;
  }

  return (
    <div className="absolute z-20 -translate-x-1/2 -translate-y-1/2 text-left" style={{ left: `${esquerda}%`, top: `${topo}%` }}>
      <button onPointerDown={(evento) => evento.stopPropagation()} onClick={onSelecionar}>
        <span className={`relative flex h-6 w-6 items-center justify-center rounded-full text-slate-950 shadow-neon ${ponto.statusAtivo ? 'animate-pulsar' : ''} ${ativo ? 'ring-4 ring-white/70' : ''}`} style={{ backgroundColor: cor }}>
          <span className="absolute h-10 w-10 rounded-full border border-current opacity-35 sm:h-12 sm:w-12" />
          <span className="h-2 w-2 rounded-full bg-slate-950" />
        </span>
      </button>
      {ativo ? (
        <button onPointerDown={(evento) => evento.stopPropagation()} onClick={onAbrir} className="mt-2 w-44 rounded-2xl border border-cyan-300/35 bg-slate-950/78 p-2 text-left shadow-neon backdrop-blur-md light-theme:bg-white/85">
          <p className="font-monoapp text-[9px] font-black uppercase tracking-[0.08em] text-cyan-200 light-theme:text-sky-800">{ponto.tipo.replaceAll('_', ' ')}</p>
          <h3 className="mt-0.5 line-clamp-1 text-xs font-black uppercase text-white light-theme:text-sky-950">{ponto.nome}</h3>
          <p className="mt-1 line-clamp-2 text-[10px] leading-4 text-slate-300 light-theme:text-slate-700">{ponto.descricao}</p>
        </button>
      ) : null}
    </div>
  );
}

function MenuCamadas({ camadasAtivas, onAlternarCamada }: { camadasAtivas: TipoCamadaAr[]; onAlternarCamada: (camada: TipoCamadaAr) => void }) {
  return (
    <div className="rounded-2xl border border-[var(--border-border)] bg-[color-mix(in_srgb,var(--bg-background)_78%,transparent)] p-2 backdrop-blur-xl">
      <div className="mb-2 flex items-center gap-1.5 font-monoapp text-[9px] font-black uppercase tracking-[0.12em] text-[var(--text-muted)]">
        <Layers3 className="h-3.5 w-3.5" />
        Camadas
      </div>
      <div className="flex max-w-full gap-2 overflow-x-auto">
        {camadasOrbitlink.map((camada) => {
          const ativa = camadasAtivas.includes(camada);

          return (
            <button
              key={camada}
              onClick={() => onAlternarCamada(camada)}
              className={`shrink-0 rounded-full border px-3 py-1.5 font-monoapp text-[9px] font-black uppercase tracking-[0.06em] ${ativa ? 'text-slate-950' : 'text-[var(--text-muted)]'}`}
              style={{ backgroundColor: ativa ? corCamada(camada) : 'transparent', borderColor: corCamada(camada) }}
            >
              {camada}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function MapaMarks({ pontos, pontoSelecionadoId, onSelecionar, onAbrir }: { pontos: PontoAr[]; pontoSelecionadoId?: string; onSelecionar: (id?: string) => void; onAbrir: (id: string) => void }) {
  return (
    <div onClick={() => onSelecionar(undefined)} className="relative mt-3 h-[calc(100dvh-15rem)] min-h-[620px] overflow-hidden rounded-[2rem] border border-[var(--border-border)] bg-[radial-gradient(circle_at_50%_45%,rgba(34,211,238,.18),transparent_18rem),linear-gradient(135deg,rgba(15,23,42,.96),rgba(2,6,23,.98))] shadow-neon light-theme:bg-[linear-gradient(135deg,#e0f2fe,#f8fafc)]">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(34,211,238,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,.12)_1px,transparent_1px)] bg-[length:44px_44px]" />
      <Map className="pointer-events-none absolute right-5 top-5 h-6 w-6 text-cyan-200/70 light-theme:text-sky-900/70" />
      {pontos.map((ponto) => {
        const ativo = ponto.id === pontoSelecionadoId;

        return (
          <div key={ponto.id} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${ponto.x}%`, top: `${ponto.y}%` }}>
            <button
              onClick={(evento) => {
                evento.stopPropagation();
                onSelecionar(ponto.id);
              }}
              className={`flex h-5 w-5 items-center justify-center rounded-full text-slate-950 shadow-neon ${ativo ? 'ring-4 ring-white/70' : ''}`}
              style={{ backgroundColor: corCamada(ponto.camada[0]) }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-slate-950" />
            </button>
            {ativo ? (
              <button
                onClick={(evento) => {
                  evento.stopPropagation();
                  onAbrir(ponto.id);
                }}
                className="absolute left-6 top-0 z-20 w-48 rounded-2xl border border-cyan-300/30 bg-slate-950/85 p-2 text-left shadow-neon backdrop-blur-md light-theme:bg-white/90"
              >
                <p className="font-monoapp text-[9px] font-black uppercase text-cyan-200 light-theme:text-sky-800">{ponto.camada[0]}</p>
                <h3 className="line-clamp-1 text-xs font-black uppercase text-white light-theme:text-sky-950">{ponto.nome}</h3>
                <p className="line-clamp-2 text-[10px] leading-4 text-slate-300 light-theme:text-slate-700">{ponto.descricao}</p>
              </button>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

function calcularAltitudePonto(ponto: PontoAr) {
  if (ponto.perspectiva === 'terra') {
    return limitar(64 + ((100 - ponto.y) / 100) * 24, 62, 88);
  }

  return limitar(78 - ponto.y * 0.72, 10, 62);
}

function normalizarGraus(valor: number) {
  return ((valor % 360) + 360) % 360;
}

function menorDiferencaGraus(destino: number, origem: number) {
  const diferenca = normalizarGraus(destino - origem);
  return diferenca > 180 ? diferenca - 360 : diferenca;
}

function limitar(valor: number, minimo: number, maximo: number) {
  return Math.min(Math.max(valor, minimo), maximo);
}

function corCamada(camada?: TipoCamadaAr) {
  const cores: Record<TipoCamadaAr, string> = {
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

  return camada ? cores[camada] : '#22d3ee';
}
/* === DUALVIEW AR | fim === */

import { ZoomIn, ZoomOut } from 'lucide-react';
import type { PointerEvent } from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { CardPontoAr } from '@/components/ar/CardPontoAr';
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

export function DualViewAr({ pontoInicialId, onVerPosts, onVerStatus }: DualViewArProps) {
  const { pontosAr, sincronizarApisNasa, carregandoApi } = useOrbitLink();
  const [camadasAtivas, setCamadasAtivas] = useState<TipoCamadaAr[]>(camadasOrbitlink);
  const [pontoSelecionadoId, setPontoSelecionadoId] = useState<string | undefined>(pontoInicialId);
  const [erroCamera, setErroCamera] = useState<string | undefined>();
  const [visaoCamera, setVisaoCamera] = useState({ azimute: 0, inclinacao: 42 });
  const [zoomCamera, setZoomCamera] = useState(1);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const arrasteRef = useRef<{ ativo: boolean; x: number; y: number }>({ ativo: false, x: 0, y: 0 });

  const pontosVisiveis = useMemo(() => {
    return pontosAr.filter((ponto) => ponto.camada.some((camada) => camadasAtivas.includes(camada)));
  }, [camadasAtivas, pontosAr]);
  const pontoSelecionado = pontosAr.find((ponto) => ponto.id === pontoSelecionadoId) ?? pontosVisiveis[0];

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
      inclinacao: limitar(atual.inclinacao + deslocamentoY * intensidadeArrasteCamera, -12, 88),
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

      setVisaoCamera({
        azimute: normalizarGraus(360 - (evento.alpha ?? 0)),
        inclinacao: limitar((evento.beta ?? 90) - 90, -12, 88),
      });
    }

    void solicitarPermissaoMovimento();
    window.addEventListener('deviceorientation', atualizarOrientacaoCamera);
    return () => window.removeEventListener('deviceorientation', atualizarOrientacaoCamera);
  }, []);

  return (
    <div className="grid w-full min-w-0 gap-4 xl:grid-cols-[minmax(0,1fr)_360px] xl:gap-5">
      <section className="min-w-0 overflow-hidden rounded-[1.5rem] border border-[var(--border-border)] bg-[var(--bg-surface)] shadow-neon">
        <div className="hidden flex-col gap-3 border-b border-[var(--border-border)] p-3 sm:flex sm:flex-row sm:items-center sm:justify-between sm:p-4">
          <div className="min-w-0">
            <p className="font-monoapp text-xs font-black uppercase tracking-[0.18em] text-[var(--text-link)]">DualView AR</p>
            <h1 className="mt-1 text-2xl font-black uppercase leading-tight text-[var(--text-text)]">Camada unica da Orbitlink</h1>
            <p className="mt-1 text-sm text-[var(--text-muted)]">Pontos da Terra e do ceu aparecem juntos, sem troca de modo.</p>
          </div>
          <Botao tamanho="sm" variante="secundario" onClick={() => void sincronizarApisNasa()} disabled={carregandoApi}>{carregandoApi ? 'Sincronizando' : 'APIs NASA'}</Botao>
        </div>

        <div className="flex max-w-full gap-2 overflow-x-auto border-b border-[var(--border-border)] p-3">
          {camadasOrbitlink.map((camada) => (
            <button
              key={camada}
              onClick={() => alternarCamada(camada)}
              className={`shrink-0 rounded-full border px-3 py-2 font-monoapp text-[10px] font-black uppercase tracking-[0.08em] ${
                camadasAtivas.includes(camada) ? 'border-[var(--bg-primary)] bg-[var(--bg-primary)] text-[var(--text-primary)]' : 'border-[var(--border-border)] text-[var(--text-muted)]'
              }`}
            >
              {camada}
            </button>
          ))}
        </div>

        <div
          className="relative h-[calc(100dvh-11rem)] min-h-[460px] touch-none overflow-hidden bg-slate-950 light-theme:bg-sky-50 md:h-[640px]"
          onPointerDown={iniciarArrasteCamera}
          onPointerMove={moverArrasteCamera}
          onPointerUp={finalizarArrasteCamera}
          onPointerCancel={finalizarArrasteCamera}
          onPointerLeave={finalizarArrasteCamera}
        >
          <video ref={videoRef} className="absolute inset-0 h-full w-full object-cover" playsInline muted autoPlay />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0,rgba(2,6,23,.18)_40%,rgba(2,6,23,.65)_100%)] light-theme:bg-[radial-gradient(circle_at_center,transparent_0,rgba(255,247,237,.08)_40%,rgba(255,69,0,.18)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,229,255,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(0,229,255,.12)_1px,transparent_1px)] bg-[length:42px_42px]" />
          {pontosVisiveis.map((ponto) => (
            <PontoArVisual key={ponto.id} ponto={ponto} ativo={ponto.id === pontoSelecionado?.id} visaoCamera={visaoCamera} zoomCamera={zoomCamera} onSelecionar={() => setPontoSelecionadoId(ponto.id)} />
          ))}
          <div className="pointer-events-none absolute left-3 top-3 z-10 rounded-full border border-cyan-300/35 bg-slate-950/45 px-3 py-1 font-monoapp text-[10px] font-black uppercase tracking-[0.12em] text-cyan-100 backdrop-blur-md light-theme:bg-white/55 light-theme:text-sky-900 sm:left-4 sm:top-4">
            {Math.round(visaoCamera.azimute)} graus / {Math.round(visaoCamera.inclinacao)} graus / {zoomCamera.toFixed(1)}x
          </div>
          <div className="absolute right-3 top-3 z-30 flex gap-2 sm:right-4 sm:top-4">
            <button aria-label="Diminuir zoom" onClick={() => setZoomCamera((atual) => limitar(atual - 0.2, 0.8, 2.4))} className="flex h-10 w-10 items-center justify-center rounded-full border border-cyan-300/35 bg-slate-950/55 text-cyan-100 backdrop-blur-md light-theme:bg-white/65 light-theme:text-sky-900">
              <ZoomOut className="h-4 w-4" />
            </button>
            <button aria-label="Aumentar zoom" onClick={() => setZoomCamera((atual) => limitar(atual + 0.2, 0.8, 2.4))} className="flex h-10 w-10 items-center justify-center rounded-full border border-cyan-300/35 bg-slate-950/55 text-cyan-100 backdrop-blur-md light-theme:bg-white/65 light-theme:text-sky-900">
              <ZoomIn className="h-4 w-4" />
            </button>
          </div>
          {pontoSelecionado ? <CaixaMark ponto={pontoSelecionado} onAbrir={() => onVerPosts(pontoSelecionado.id)} /> : null}
          <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-2 sm:bottom-4 sm:left-4 sm:right-4">
            <Badge tom="azul">{pontosVisiveis.length} marks ativos</Badge>
            <Badge tom="verde">Camera ativa</Badge>
            <Badge tom="roxo">Terra + ceu</Badge>
          </div>
          {erroCamera ? <div className="absolute left-3 right-3 top-16 z-30 rounded-2xl border border-amber-400/50 bg-amber-500/15 p-3 text-xs font-bold leading-5 text-amber-100 light-theme:text-amber-800 sm:left-4 sm:right-4 sm:text-sm">{erroCamera}</div> : null}
        </div>
      </section>
      <CardPontoAr ponto={pontoSelecionado} onVerPosts={onVerPosts} onVerStatus={onVerStatus} />
    </div>
  );
}

function CaixaMark({ ponto, onAbrir }: { ponto: PontoAr; onAbrir: () => void }) {
  return (
    <button onClick={onAbrir} className="absolute bottom-16 left-3 right-3 z-30 rounded-2xl border border-cyan-300/35 bg-slate-950/78 p-3 text-left shadow-neon backdrop-blur-md light-theme:bg-white/85 sm:bottom-20 sm:left-4 sm:right-auto sm:w-80">
      <p className="font-monoapp text-[10px] font-black uppercase tracking-[0.12em] text-cyan-200 light-theme:text-sky-800">{ponto.tipo.replaceAll('_', ' ')}</p>
      <h3 className="mt-1 text-sm font-black uppercase text-white light-theme:text-sky-950">{ponto.nome}</h3>
      <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-300 light-theme:text-slate-700">{ponto.descricao}</p>
    </button>
  );
}

function PontoArVisual({ ponto, ativo, visaoCamera, zoomCamera, onSelecionar }: { ponto: PontoAr; ativo: boolean; visaoCamera: { azimute: number; inclinacao: number }; zoomCamera: number; onSelecionar: () => void }) {
  const cor = ponto.perspectiva === 'espaco' ? 'bg-orange-400' : ponto.origemDados === 'nasa_eonet' ? 'bg-emerald-400' : ponto.statusAtivo ? 'bg-cyan-300' : 'bg-blue-400';
  const campoVisaoHorizontal = campoVisaoHorizontalBase / zoomCamera;
  const campoVisaoVertical = campoVisaoVerticalBase / zoomCamera;
  const direcaoPonto = ponto.x * 3.6;
  const altitudePonto = calcularAltitudePonto(ponto);
  const deltaHorizontal = menorDiferencaGraus(direcaoPonto, visaoCamera.azimute);
  const deltaVertical = altitudePonto - visaoCamera.inclinacao;
  const visivel = Math.abs(deltaHorizontal) <= campoVisaoHorizontal && Math.abs(deltaVertical) <= campoVisaoVertical;
  const esquerda = 50 + (deltaHorizontal / campoVisaoHorizontal) * 48;
  const topo = 50 + (deltaVertical / campoVisaoVertical) * 44;

  if (!visivel) {
    return null;
  }

  return (
    <button onClick={onSelecionar} className="absolute z-20 -translate-x-1/2 -translate-y-1/2 text-left" style={{ left: `${esquerda}%`, top: `${topo}%` }}>
      <span className={`relative flex h-6 w-6 items-center justify-center rounded-full ${cor} text-slate-950 shadow-neon ${ponto.statusAtivo ? 'animate-pulsar' : ''} ${ativo ? 'ring-4 ring-white/70' : ''}`}>
        <span className="absolute h-10 w-10 rounded-full border border-current opacity-35 sm:h-12 sm:w-12" />
        <span className="h-2 w-2 rounded-full bg-slate-950" />
      </span>
      <span className={`mt-2 hidden rounded-xl border border-[var(--border-border)] bg-[color-mix(in_srgb,var(--bg-background)_82%,transparent)] px-3 py-2 text-xs font-bold text-[var(--text-text)] backdrop-blur-md md:block ${ativo ? 'ring-2 ring-[var(--border-focus)]' : ''}`}>
        {ponto.nome}
      </span>
    </button>
  );
}

function calcularAltitudePonto(ponto: PontoAr) {
  if (ponto.perspectiva === 'terra') {
    return limitar(96 - ponto.y, 18, 84);
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
/* === DUALVIEW AR | fim === */

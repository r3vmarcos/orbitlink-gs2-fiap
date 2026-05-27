import { Camera, CameraOff } from 'lucide-react';
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
const intensidadeArrasteCamera = 0.12;

export function DualViewAr({ pontoInicialId, onVerPosts, onVerStatus }: DualViewArProps) {
  const { pontosAr, sincronizarApisNasa, carregandoApi } = useOrbitLink();
  const [camadasAtivas, setCamadasAtivas] = useState<TipoCamadaAr[]>(camadasOrbitlink);
  const [pontoSelecionadoId, setPontoSelecionadoId] = useState<string | undefined>(pontoInicialId);
  const [cameraAtiva, setCameraAtiva] = useState(false);
  const [erroCamera, setErroCamera] = useState<string | undefined>();
  const [visaoCamera, setVisaoCamera] = useState({ azimute: 0, inclinacao: 0 });
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const arrasteRef = useRef<{ ativo: boolean; x: number; y: number }>({ ativo: false, x: 0, y: 0 });

  const pontosVisiveis = useMemo(() => {
    return pontosAr.filter((ponto) => ponto.camada.some((camada) => camadasAtivas.includes(camada)));
  }, [camadasAtivas, pontosAr]);
  const pontoSelecionado = pontosAr.find((ponto) => ponto.id === pontoSelecionadoId) ?? pontosVisiveis[0];

  useEffect(() => {
    if (!cameraAtiva) {
      return undefined;
    }

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
        setCameraAtiva(false);
        setErroCamera('Câmera indisponível neste contexto. No celular, use localhost, HTTPS ou um navegador que permita câmera na rede local.');
      }
    }

    void iniciarCamera();

    return () => {
      streamAtual?.getTracks().forEach((track) => track.stop());
    };
  }, [cameraAtiva]);

  function alternarCamada(camada: TipoCamadaAr) {
    setCamadasAtivas((atuais) => (atuais.includes(camada) ? atuais.filter((item) => item !== camada) : [...atuais, camada]));
  }

  async function alternarCamera() {
    const eventoOrientacao = window.DeviceOrientationEvent as typeof DeviceOrientationEvent & {
      requestPermission?: () => Promise<'granted' | 'denied'>;
    } | undefined;

    if (!cameraAtiva && typeof eventoOrientacao?.requestPermission === 'function') {
      try {
        await eventoOrientacao.requestPermission();
      } catch {
        setErroCamera('Permissao de movimento indisponivel. Use o arraste na tela para simular a camera 360.');
      }
    }

    setCameraAtiva((ativa) => !ativa);
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
      azimute: normalizarPercentual(atual.azimute - deslocamentoX * intensidadeArrasteCamera),
      inclinacao: limitar(atual.inclinacao + deslocamentoY * intensidadeArrasteCamera, -32, 32),
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
        azimute: normalizarPercentual((evento.alpha ?? 0) / 3.6),
        inclinacao: limitar(((evento.beta ?? 0) - 45) * 0.45, -32, 32),
      });
    }

    window.addEventListener('deviceorientation', atualizarOrientacaoCamera);
    return () => window.removeEventListener('deviceorientation', atualizarOrientacaoCamera);
  }, []);

  return (
    <div className="grid w-full min-w-0 gap-4 xl:grid-cols-[minmax(0,1fr)_360px] xl:gap-5">
      <section className="min-w-0 overflow-hidden rounded-[1.5rem] border border-[var(--border-border)] bg-[var(--bg-surface)] shadow-neon">
        <div className="flex flex-col gap-3 border-b border-[var(--border-border)] p-3 sm:flex-row sm:items-center sm:justify-between sm:p-4">
          <div className="min-w-0">
            <p className="font-monoapp text-[11px] font-black uppercase tracking-[0.1em] text-[var(--text-link)] sm:text-xs sm:tracking-[0.18em]">DualView AR</p>
            <h1 className="mt-1 text-xl font-black uppercase leading-tight text-[var(--text-text)] sm:text-2xl">
              Camada única da Orbitlink
            </h1>
            <p className="mt-1 text-sm text-[var(--text-muted)]">Pontos da Terra e do céu aparecem juntos, sem troca de modo.</p>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
            <Botao tamanho="sm" variante={cameraAtiva ? 'primario' : 'secundario'} onClick={() => void alternarCamera()}>
              {cameraAtiva ? <CameraOff className="h-4 w-4" /> : <Camera className="h-4 w-4" />}
              {cameraAtiva ? 'Desligar' : 'Câmera'}
            </Botao>
            <Botao tamanho="sm" variante="secundario" onClick={() => void sincronizarApisNasa()} disabled={carregandoApi}>{carregandoApi ? 'Sincronizando' : 'APIs NASA'}</Botao>
          </div>
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
          className="relative h-[calc(100dvh-17rem)] min-h-[360px] touch-none overflow-hidden bg-slate-950 light-theme:bg-sky-50 min-[420px]:min-h-[420px] md:h-[640px]"
          onPointerDown={iniciarArrasteCamera}
          onPointerMove={moverArrasteCamera}
          onPointerUp={finalizarArrasteCamera}
          onPointerCancel={finalizarArrasteCamera}
          onPointerLeave={finalizarArrasteCamera}
        >
          {cameraAtiva ? (
            <video ref={videoRef} className="absolute inset-0 h-full w-full object-cover" playsInline muted autoPlay />
          ) : <CenaOrbitlink />}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0,rgba(2,6,23,.18)_40%,rgba(2,6,23,.65)_100%)] light-theme:bg-[radial-gradient(circle_at_center,transparent_0,rgba(255,247,237,.08)_40%,rgba(255,69,0,.18)_100%)]" />
          {cameraAtiva ? <div className="absolute inset-0 bg-[linear-gradient(rgba(0,229,255,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(0,229,255,.12)_1px,transparent_1px)] bg-[length:42px_42px]" /> : null}
          {pontosVisiveis.map((ponto) => (
            <PontoArVisual key={ponto.id} ponto={ponto} ativo={ponto.id === pontoSelecionado?.id} visaoCamera={visaoCamera} onSelecionar={() => setPontoSelecionadoId(ponto.id)} />
          ))}
          <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-2 sm:bottom-4 sm:left-4 sm:right-4">
            <Badge tom="azul">{pontosVisiveis.length} marks ativos</Badge>
            <Badge tom="verde">{cameraAtiva ? 'Câmera ativa' : 'Simulação ativa'}</Badge>
            <Badge tom="roxo">Terra + céu</Badge>
          </div>
          {erroCamera ? <div className="absolute left-3 right-3 top-3 rounded-2xl border border-amber-400/50 bg-amber-500/15 p-3 text-xs font-bold leading-5 text-amber-100 light-theme:text-amber-800 sm:left-4 sm:right-4 sm:top-4 sm:text-sm">{erroCamera}</div> : null}
        </div>
      </section>
      <CardPontoAr ponto={pontoSelecionado} onVerPosts={onVerPosts} onVerStatus={onVerStatus} />
    </div>
  );
}

function CenaOrbitlink() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[radial-gradient(circle_at_center,#0f172a,#020617_70%)] light-theme:bg-[radial-gradient(circle_at_center,#fff7ed,#ffffff_72%)]">
      <div className="absolute inset-0 opacity-50" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,.7) 1px, transparent 1px)', backgroundSize: '34px 34px' }} />
      <div className="absolute left-1/2 top-1/2 h-[70vmin] max-h-[560px] w-[70vmin] max-w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_35%_30%,#7dd3fc,#2563eb_32%,#064e3b_48%,#0f172a_72%)] shadow-[0_0_80px_rgba(56,189,248,.35)]">
        <div className="absolute inset-0 rounded-full border border-cyan-300/30" />
        <div className="absolute -inset-10 animate-orbitar rounded-full border border-dashed border-blue-300/25" />
      </div>
      <div className="absolute left-[8%] top-[18%] h-20 w-20 rounded-full border border-blue-400/20 bg-[radial-gradient(circle_at_30%_30%,#fef3c7,#64748b_45%,#0f172a_72%)] shadow-neon sm:h-28 sm:w-28" />
      <div className="absolute bottom-[18%] left-[42%] h-1 w-[56%] rotate-[-12deg] bg-gradient-to-r from-transparent via-cyan-300 to-transparent opacity-70" />
    </div>
  );
}

function PontoArVisual({ ponto, ativo, visaoCamera, onSelecionar }: { ponto: PontoAr; ativo: boolean; visaoCamera: { azimute: number; inclinacao: number }; onSelecionar: () => void }) {
  const cor = ponto.perspectiva === 'espaco' ? 'bg-orange-400' : ponto.origemDados === 'nasa_eonet' ? 'bg-emerald-400' : ponto.statusAtivo ? 'bg-cyan-300' : 'bg-blue-400';
  const esquerda = normalizarPercentual(ponto.x - visaoCamera.azimute);
  const topo = limitar(ponto.y + visaoCamera.inclinacao, 6, 92);

  return (
    <button
      onClick={onSelecionar}
      className="absolute z-20 -translate-x-1/2 -translate-y-1/2 text-left"
      style={{ left: `${esquerda}%`, top: `${topo}%` }}
    >
      <span className={`relative flex h-6 w-6 items-center justify-center rounded-full ${cor} text-slate-950 shadow-neon ${ponto.statusAtivo ? 'animate-pulsar' : ''}`}>
        <span className="absolute h-10 w-10 rounded-full border border-current opacity-35 sm:h-12 sm:w-12" />
        <span className="h-2 w-2 rounded-full bg-slate-950" />
      </span>
      <span className={`mt-2 hidden rounded-xl border border-[var(--border-border)] bg-[color-mix(in_srgb,var(--bg-background)_82%,transparent)] px-3 py-2 text-xs font-bold text-[var(--text-text)] backdrop-blur-md md:block ${ativo ? 'ring-2 ring-[var(--border-focus)]' : ''}`}>
        {ponto.nome}
      </span>
    </button>
  );
}

function normalizarPercentual(valor: number) {
  return ((valor % 100) + 100) % 100;
}

function limitar(valor: number, minimo: number, maximo: number) {
  return Math.min(Math.max(valor, minimo), maximo);
}
/* === DUALVIEW AR | fim === */

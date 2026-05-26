import { Camera, CameraOff } from 'lucide-react';
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

const camadasTerra: TipoCamadaAr[] = ['social', 'planetas', 'lua', 'estacoes', 'satelites', 'missoes', 'eventos'];
const camadasEspaco: TipoCamadaAr[] = ['social', 'cidades', 'turismo', 'clima', 'biomas', 'ods', 'missoes'];

export function DualViewAr({ pontoInicialId, onVerPosts, onVerStatus }: DualViewArProps) {
  const { perspectiva, pontosAr, definirPerspectiva, imagemEpic, sincronizarApisNasa, carregandoApi } = useOrbitLink();
  const [camadasAtivas, setCamadasAtivas] = useState<TipoCamadaAr[]>(perspectiva === 'terra' ? camadasTerra : camadasEspaco);
  const [pontoSelecionadoId, setPontoSelecionadoId] = useState<string | undefined>(pontoInicialId);
  const [cameraAtiva, setCameraAtiva] = useState(false);
  const [erroCamera, setErroCamera] = useState<string | undefined>();
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const camadas = perspectiva === 'terra' ? camadasTerra : camadasEspaco;
  const pontosVisiveis = useMemo(() => {
    return pontosAr.filter((ponto) => ponto.perspectiva === perspectiva && ponto.camada.some((camada) => camadasAtivas.includes(camada)));
  }, [camadasAtivas, perspectiva, pontosAr]);
  const pontoSelecionado = pontosAr.find((ponto) => ponto.id === pontoSelecionadoId && ponto.perspectiva === perspectiva) ?? pontosVisiveis[0];

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

  function trocarPerspectiva(novaPerspectiva: 'terra' | 'espaco') {
    definirPerspectiva(novaPerspectiva);
    setCamadasAtivas(novaPerspectiva === 'terra' ? camadasTerra : camadasEspaco);
    setPontoSelecionadoId(undefined);
  }

  return (
    <div className="grid w-full min-w-0 gap-5 xl:grid-cols-[minmax(0,1fr)_360px]">
      <section className="min-w-0 overflow-hidden rounded-[1.5rem] border border-[var(--border-border)] bg-[var(--bg-surface)] shadow-neon">
        <div className="flex flex-col gap-3 border-b border-[var(--border-border)] p-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-monoapp text-xs font-black uppercase tracking-[0.18em] text-[var(--text-link)]">DualView AR</p>
            <h1 className="mt-1 text-2xl font-black uppercase text-[var(--text-text)]">
              {perspectiva === 'terra' ? 'Terra olhando para o espaço' : 'Espaço olhando para a Terra'}
            </h1>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
            <Botao tamanho="sm" variante={perspectiva === 'terra' ? 'primario' : 'secundario'} onClick={() => trocarPerspectiva('terra')}>Modo Terra</Botao>
            <Botao tamanho="sm" variante={perspectiva === 'espaco' ? 'primario' : 'secundario'} onClick={() => trocarPerspectiva('espaco')}>Modo Espaço</Botao>
            <Botao tamanho="sm" variante={cameraAtiva ? 'primario' : 'secundario'} onClick={() => setCameraAtiva((ativa) => !ativa)}>
              {cameraAtiva ? <CameraOff className="h-4 w-4" /> : <Camera className="h-4 w-4" />}
              {cameraAtiva ? 'Desligar câmera' : 'Usar câmera'}
            </Botao>
            <Botao tamanho="sm" variante="secundario" onClick={() => void sincronizarApisNasa()} disabled={carregandoApi}>{carregandoApi ? 'Sincronizando' : 'APIs NASA'}</Botao>
          </div>
        </div>

        <div className="flex max-w-full gap-2 overflow-x-auto border-b border-[var(--border-border)] p-3">
          {camadas.map((camada) => (
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

        <div className="relative h-[calc(100dvh-15rem)] min-h-[460px] overflow-hidden bg-slate-950 light-theme:bg-sky-50 md:h-[640px]">
          {cameraAtiva ? (
            <video ref={videoRef} className="absolute inset-0 h-full w-full object-cover" playsInline muted autoPlay />
          ) : perspectiva === 'terra' ? <CenaTerra /> : <CenaEspaco imagemEpic={imagemEpic?.imagem} />}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0,rgba(2,6,23,.18)_40%,rgba(2,6,23,.65)_100%)] light-theme:bg-[radial-gradient(circle_at_center,transparent_0,rgba(255,247,237,.08)_40%,rgba(255,69,0,.18)_100%)]" />
          {cameraAtiva ? <div className="absolute inset-0 bg-[linear-gradient(rgba(0,229,255,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(0,229,255,.12)_1px,transparent_1px)] bg-[length:42px_42px]" /> : null}
          {pontosVisiveis.map((ponto) => (
            <PontoArVisual key={ponto.id} ponto={ponto} ativo={ponto.id === pontoSelecionado?.id} onSelecionar={() => setPontoSelecionadoId(ponto.id)} />
          ))}
          <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
            <Badge tom="azul">{pontosVisiveis.length} marks ativos</Badge>
            <Badge tom="verde">{cameraAtiva ? 'Câmera ativa' : 'Simulação ativa'}</Badge>
            <Badge tom="roxo">Posts + Status + API</Badge>
          </div>
          {erroCamera ? <div className="absolute left-4 right-4 top-4 rounded-2xl border border-amber-400/50 bg-amber-500/15 p-3 text-sm font-bold text-amber-100 light-theme:text-amber-800">{erroCamera}</div> : null}
        </div>
      </section>
      <CardPontoAr ponto={pontoSelecionado} onVerPosts={onVerPosts} onVerStatus={onVerStatus} />
    </div>
  );
}

function CenaTerra() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[radial-gradient(circle_at_70%_20%,rgba(96,165,250,.38),transparent_8rem),linear-gradient(135deg,#020617,#0f172a_48%,#111827)]">
      <div className="absolute inset-0 opacity-70" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,.75) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
      <div className="absolute left-[8%] top-[18%] h-44 w-44 rounded-full border border-blue-400/20 bg-[radial-gradient(circle_at_30%_30%,#fef3c7,#64748b_45%,#0f172a_72%)] shadow-neon" />
      <div className="absolute right-[12%] top-[12%] h-28 w-28 rounded-full bg-[radial-gradient(circle_at_35%_35%,#fde68a,#94a3b8_42%,#334155_72%)] opacity-80" />
      <div className="absolute bottom-[18%] left-[42%] h-1 w-[56%] rotate-[-12deg] bg-gradient-to-r from-transparent via-cyan-300 to-transparent opacity-70" />
    </div>
  );
}

function CenaEspaco({ imagemEpic }: { imagemEpic?: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[radial-gradient(circle_at_center,#0f172a,#020617_70%)] light-theme:bg-[radial-gradient(circle_at_center,#fff7ed,#ffffff_72%)]">
      <div className="absolute inset-0 opacity-50" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,.7) 1px, transparent 1px)', backgroundSize: '34px 34px' }} />
      <div className="absolute left-1/2 top-1/2 h-[70vmin] max-h-[560px] w-[70vmin] max-w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_35%_30%,#7dd3fc,#2563eb_32%,#064e3b_48%,#0f172a_72%)] shadow-[0_0_80px_rgba(56,189,248,.35)]">
        {imagemEpic ? <img src={imagemEpic} alt="Terra pela NASA EPIC" className="h-full w-full rounded-full object-cover opacity-90 mix-blend-screen" /> : null}
        <div className="absolute inset-0 rounded-full border border-cyan-300/30" />
        <div className="absolute -inset-10 animate-orbitar rounded-full border border-dashed border-blue-300/25" />
      </div>
    </div>
  );
}

function PontoArVisual({ ponto, ativo, onSelecionar }: { ponto: PontoAr; ativo: boolean; onSelecionar: () => void }) {
  const cor = ponto.nivelAlerta === 'alto' ? 'bg-orange-400' : ponto.origemDados === 'nasa_eonet' ? 'bg-emerald-400' : ponto.statusAtivo ? 'bg-cyan-300' : 'bg-blue-400';

  return (
    <button
      onClick={onSelecionar}
      className="absolute z-20 -translate-x-1/2 -translate-y-1/2 text-left"
      style={{ left: `${ponto.x}%`, top: `${ponto.y}%` }}
    >
      <span className={`relative flex h-6 w-6 items-center justify-center rounded-full ${cor} text-slate-950 shadow-neon ${ponto.statusAtivo ? 'animate-pulsar' : ''}`}>
        <span className="absolute h-12 w-12 rounded-full border border-current opacity-35" />
        <span className="h-2 w-2 rounded-full bg-slate-950" />
      </span>
      <span className={`mt-2 hidden rounded-xl border border-[var(--border-border)] bg-[color-mix(in_srgb,var(--bg-background)_82%,transparent)] px-3 py-2 text-xs font-bold text-[var(--text-text)] backdrop-blur-md md:block ${ativo ? 'ring-2 ring-[var(--border-focus)]' : ''}`}>
        {ponto.nome}
      </span>
    </button>
  );
}
/* === DUALVIEW AR | fim === */

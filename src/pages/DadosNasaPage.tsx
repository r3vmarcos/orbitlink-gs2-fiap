import { AlertTriangle, CheckCircle2, DatabaseZap, Image as ImageIcon, Loader2, Satellite } from 'lucide-react';
import { Botao } from '@/components/ui/Botao';
import { CardBase } from '@/components/ui/CardBase';
import { useOrbitLink } from '@/context/OrbitLinkContext';

/* === DADOS NASA PAGE | inicio === */
export function DadosNasaPage() {
  const { carregandoApi, erroApi, ultimaSincronizacaoApi, imagemEpic, pontosAr, galeria, sincronizarApisNasa } = useOrbitLink();
  const pontosNasa = pontosAr.filter((ponto) => ponto.origemDados === 'nasa_eonet');
  const imagensNasa = galeria.filter((item) => item.origemDados === 'nasa_images');

  return (
    <div className="space-y-5">
      <CardBase>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-monoapp text-xs font-black uppercase tracking-[0.18em] text-blue-300">Painel de APIs</p>
            <h1 className="mt-2 text-4xl font-black uppercase text-white light-theme:text-sky-950">APIs NASA funcionando com fallback</h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300 light-theme:text-slate-700">
              Este painel sincroniza EONET para eventos naturais, EPIC para imagem da Terra e Image and Video Library para galeria. Se a rede/API falhar, o app mantém dados simulados.
            </p>
          </div>
          <Botao onClick={() => void sincronizarApisNasa()} disabled={carregandoApi}>
            {carregandoApi ? <Loader2 className="h-4 w-4 animate-spin" /> : <DatabaseZap className="h-4 w-4" />}
            {carregandoApi ? 'Sincronizando' : 'Sincronizar APIs'}
          </Botao>
        </div>
      </CardBase>

      {erroApi ? (
        <CardBase className="border-orange-500/45">
          <div className="flex gap-3 text-orange-200 light-theme:text-orange-800">
            <AlertTriangle className="h-6 w-6" />
            <p>{erroApi}</p>
          </div>
        </CardBase>
      ) : null}

      <div className="grid gap-5 md:grid-cols-3">
        <CardBase>
          <Satellite className="h-8 w-8 text-blue-300" />
          <p className="mt-4 text-3xl font-black text-white light-theme:text-sky-950">{pontosNasa.length}</p>
          <h2 className="font-monoapp text-xs font-black uppercase tracking-[0.16em] text-blue-300">Eventos EONET</h2>
        </CardBase>
        <CardBase>
          <ImageIcon className="h-8 w-8 text-blue-300" />
          <p className="mt-4 text-3xl font-black text-white light-theme:text-sky-950">{imagensNasa.length}</p>
          <h2 className="font-monoapp text-xs font-black uppercase tracking-[0.16em] text-blue-300">Imagens NASA</h2>
        </CardBase>
        <CardBase>
          <CheckCircle2 className="h-8 w-8 text-emerald-300" />
          <p className="mt-4 text-lg font-black text-white light-theme:text-sky-950">{ultimaSincronizacaoApi ? new Date(ultimaSincronizacaoApi).toLocaleString('pt-BR') : 'Aguardando'}</p>
          <h2 className="font-monoapp text-xs font-black uppercase tracking-[0.16em] text-blue-300">Última sync</h2>
        </CardBase>
      </div>

      {imagemEpic ? (
        <CardBase>
          <div className="grid gap-5 lg:grid-cols-[.9fr_1.1fr]">
            <img src={imagemEpic.imagem} alt={imagemEpic.titulo} className="h-72 w-full rounded-[2rem] object-cover" />
            <div>
              <p className="font-monoapp text-xs font-black uppercase tracking-[0.18em] text-blue-300">NASA EPIC</p>
              <h2 className="mt-2 text-2xl font-black uppercase text-white light-theme:text-sky-950">{imagemEpic.titulo}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-300 light-theme:text-slate-700">{imagemEpic.descricao}</p>
            </div>
          </div>
        </CardBase>
      ) : null}

      <div className="grid gap-5 lg:grid-cols-2">
        <CardBase>
          <h2 className="text-2xl font-black uppercase text-white light-theme:text-sky-950">Marks EONET no Modo Espaço</h2>
          <div className="mt-4 space-y-3">
            {pontosNasa.slice(0, 6).map((ponto) => (
              <div key={ponto.id} className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-3 text-sm text-slate-300 light-theme:text-slate-700">
                <strong className="text-white light-theme:text-sky-950">{ponto.titulo}</strong><br />{ponto.dadosResumo.join(' · ')}
              </div>
            ))}
            {pontosNasa.length === 0 ? <p className="text-sm text-slate-400 light-theme:text-slate-600">Clique em sincronizar para baixar eventos naturais reais da NASA.</p> : null}
          </div>
        </CardBase>
        <CardBase>
          <h2 className="text-2xl font-black uppercase text-white light-theme:text-sky-950">Galeria NASA</h2>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {imagensNasa.slice(0, 4).map((item) => <img key={item.id} src={item.imagem} alt={item.titulo} className="h-32 w-full rounded-2xl object-cover" />)}
          </div>
        </CardBase>
      </div>
    </div>
  );
}
/* === DADOS NASA PAGE | fim === */

import { CloudSun, Factory, Globe2, Leaf, Rocket } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { CardBase } from '@/components/ui/CardBase';
import { useOrbitLink } from '@/context/OrbitLinkContext';

/* === IMPACTO PAGE | inicio === */
export function ImpactoPage() {
  const { ods } = useOrbitLink();

  return (
    <div className="space-y-5">
      <CardBase>
        <Badge>Justificativa acadêmica</Badge>
        <h1 className="mt-4 text-4xl font-black uppercase text-white light-theme:text-sky-950">Impacto, ODS e experiência de usuário</h1>
        <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-300 light-theme:text-slate-700">
          A Orbitlink foi desenhada como uma rede social espacial em feed único: todos veem as publicações de todos, e cada post registra se foi criado da Terra ou do céu. O projeto combina feed, status 24h, imagens, perfis, missões e marks AR para demonstrar como geolocalização, dados satelitais e comunidade podem se transformar em experiência social.
        </p>
      </CardBase>

      <div className="grid gap-5 lg:grid-cols-2">
        {ods.map((item, indice) => {
          const Icone = [CloudSun, Factory, Globe2, Leaf][indice] ?? Rocket;
          return (
            <CardBase key={item.id}>
              <Icone className="h-9 w-9 text-blue-300" />
              <Badge tom="verde">{item.id}</Badge>
              <h2 className="mt-4 text-2xl font-black uppercase text-white light-theme:text-sky-950">{item.titulo}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-300 light-theme:text-slate-700">{item.descricao}</p>
            </CardBase>
          );
        })}
      </div>

      <CardBase>
        <h2 className="text-2xl font-black uppercase text-white light-theme:text-sky-950">Próximas fases planejadas</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {[
            'Fase 02: NASA EPIC, EONET e Image Library com cache e fallback.',
            'Fase 03: Astronomy Engine, CelesTrak e satellite.js para posições reais.',
            'Fase 04: Stellarium Web Engine, Aladin Lite, sensores e WebXR experimental.',
          ].map((item) => (
            <div key={item} className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-4 text-sm leading-6 text-slate-300 light-theme:text-slate-700">{item}</div>
          ))}
        </div>
      </CardBase>
    </div>
  );
}
/* === IMPACTO PAGE | fim === */

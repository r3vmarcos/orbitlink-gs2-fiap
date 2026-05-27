import { ArrowRight, Camera, DatabaseZap, MapPin, Rocket, Satellite, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/Badge';
import { Botao } from '@/components/ui/Botao';
import { CardBase } from '@/components/ui/CardBase';
import { useOrbitLink } from '@/context/OrbitLinkContext';

/* === HOME PAGE | inicio === */
export function HomePage() {
  const { posts, statusOrbitais, pontosAr } = useOrbitLink();

  return (
    <div className="space-y-8">
      <section className="grid items-center gap-5 lg:grid-cols-[1.1fr_.9fr] lg:gap-6">
        <CardBase className="p-4 min-[380px]:p-5 md:p-10">
          <Badge tom="azul">Global Solution · Rede social espacial</Badge>
          <h1 className="mt-5 max-w-4xl text-3xl font-black uppercase leading-tight tracking-normal text-white light-theme:text-sky-950 min-[380px]:text-4xl md:text-6xl">
            Orbitlink conecta publicações da Terra e do céu em um feed único.
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-300 light-theme:text-slate-700 sm:text-base md:text-lg md:leading-8">
            Todos os usuários veem o mesmo Orbifeed. A diferença aparece na publicação: cada pessoa informa se está postando da Terra ou do céu.
          </p>
          <div className="mt-6 grid gap-3 min-[420px]:flex min-[420px]:flex-wrap">
            <Link to="/">
              <Botao>
                <Users className="h-4 w-4" /> Abrir Orbifeed
              </Botao>
            </Link>
            <Link to="/dualview-ar">
              <Botao variante="fantasma">
                Explorar AR <ArrowRight className="h-4 w-4" />
              </Botao>
            </Link>
          </div>
        </CardBase>
        <div className="relative min-h-[360px] overflow-hidden rounded-[1.75rem] border border-blue-500/35 bg-slate-950 shadow-neon light-theme:bg-sky-50 min-[420px]:min-h-[420px] md:min-h-[520px] md:rounded-[2.5rem]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(59,130,246,.28),transparent_18rem)]" />
          <div className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_35%_30%,#7dd3fc,#2563eb_35%,#064e3b_52%,#0f172a_78%)] shadow-[0_0_90px_rgba(56,189,248,.35)] sm:h-72 sm:w-72" />
          <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 animate-orbitar rounded-full border border-dashed border-blue-300/40 sm:h-[26rem] sm:w-[26rem]" />
          {['Lua', 'Aurora', 'Amazônia', 'Brasil', 'Selene'].map((item, indice) => (
            <div key={item} className="absolute rounded-2xl border border-blue-500/40 bg-slate-950/80 px-3 py-2 text-xs font-black text-blue-100 backdrop-blur-md light-theme:bg-white/80 light-theme:text-sky-900 sm:px-4 sm:py-3 sm:text-sm" style={{ left: `${8 + indice * 17}%`, top: `${18 + (indice % 3) * 22}%` }}>
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-4">
        {[
          { icon: Users, titulo: 'Feed social', valor: posts.length, texto: 'publicações da Terra e do céu' },
          { icon: Camera, titulo: 'Status 24h', valor: statusOrbitais.length, texto: 'câmeras e registros orbitais' },
          { icon: Satellite, titulo: 'Marks AR', valor: pontosAr.length, texto: 'pontos clicáveis no DualView' },
          { icon: DatabaseZap, titulo: 'APIs NASA', valor: '3', texto: 'EONET, EPIC e Image Library' },
        ].map((item) => (
          <CardBase key={item.titulo}>
            <item.icon className="h-7 w-7 text-blue-300" />
            <p className="mt-4 text-2xl font-black text-white light-theme:text-sky-950 sm:text-3xl">{item.valor}</p>
            <h3 className="font-monoapp text-[11px] font-black uppercase tracking-[0.08em] text-blue-300 light-theme:text-sky-700 sm:text-xs sm:tracking-[0.16em]">{item.titulo}</h3>
            <p className="mt-2 text-sm text-slate-300 light-theme:text-slate-700">{item.texto}</p>
          </CardBase>
        ))}
      </section>

      <section className="grid gap-5 lg:grid-cols-3">
        {[
          { titulo: 'Postagem por local', texto: 'Ao publicar, o usuário informa se está na Terra ou no céu. Essa informação aparece no card do post.', icon: MapPin },
          { titulo: 'Feed único', texto: 'Não existe alternância global. A rede mostra publicações de todos os lugares em uma experiência contínua.', icon: Users },
          { titulo: 'Status Orbitlink 24h', texto: 'Stories espaciais com texto, imagem, câmera orbital simulada e expiração automática em 24 horas.', icon: Rocket },
        ].map((item) => (
          <CardBase key={item.titulo}>
            <item.icon className="h-9 w-9 text-blue-300" />
            <h2 className="mt-4 text-xl font-black uppercase leading-tight text-white light-theme:text-sky-950 sm:text-2xl">{item.titulo}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300 light-theme:text-slate-700">{item.texto}</p>
          </CardBase>
        ))}
      </section>
    </div>
  );
}
/* === HOME PAGE | fim === */

import { UserPlus } from 'lucide-react';
import { useState } from 'react';
import { Botao } from '@/components/ui/Botao';
import { useOrbitLink } from '@/context/OrbitLinkContext';

/* === ACESSO DO USUARIO | inicio === */
export function AcessoUsuario() {
  const { cadastrarUsuario } = useOrbitLink();
  const [nome, setNome] = useState('');
  const [usuario, setUsuario] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [localizacaoAtual, setLocalizacaoAtual] = useState('São Paulo, Brasil');
  const [mensagem, setMensagem] = useState('');

  function handleCadastrar() {
    const resultado = cadastrarUsuario({ nome, usuario, email, senha, localizacaoAtual });
    setMensagem(resultado.mensagem ?? '');
  }

  return (
    <main className="min-h-[100dvh] overflow-x-hidden bg-[var(--bg-background)] px-3 py-4 font-orbit text-[var(--text-text)] sm:px-6 sm:py-6">
      <div className="mx-auto grid min-h-[calc(100dvh-3rem)] w-full max-w-6xl items-center gap-6 lg:grid-cols-[1fr_420px]">
        <section className="space-y-5">
          <p className="font-monoapp text-[11px] font-black uppercase tracking-[0.1em] text-[var(--text-link)] sm:text-xs sm:tracking-[0.18em]">Orbitlink social</p>
          <h1 className="max-w-3xl text-3xl font-black uppercase leading-tight text-[var(--text-text)] min-[380px]:text-4xl md:text-6xl">
            Crie seu perfil para entrar no Orbifeed.
          </h1>
          <p className="max-w-2xl text-sm leading-7 text-[var(--text-muted)] sm:text-base sm:leading-8">
            No primeiro acesso, cadastre seu perfil. Depois disso, este navegador entra automaticamente na sua conta.
          </p>
          <div className="grid max-w-2xl gap-3 sm:grid-cols-3">
            {['Perfil próprio', 'Posts com imagem', 'Câmera AR'].map((item) => (
              <div key={item} className="rounded-2xl border border-[var(--border-border)] bg-[var(--bg-surface)] p-3 text-xs font-black uppercase tracking-[0.04em] text-[var(--text-text)] sm:p-4 sm:text-sm sm:tracking-[0.08em]">
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[1.5rem] border border-[var(--border-border)] bg-[var(--bg-surface)] p-4 shadow-soft sm:p-5">
          <h2 className="mb-5 text-xl font-black uppercase text-[var(--text-text)]">Criar perfil</h2>
          <div className="space-y-4">
            <label className="block">
              <span className="label-form">Nome</span>
              <input value={nome} onChange={(evento) => setNome(evento.target.value)} className="input-form" placeholder="Seu nome na Orbitlink" />
            </label>
            <label className="block">
              <span className="label-form">Usuário</span>
              <input value={usuario} onChange={(evento) => setUsuario(evento.target.value)} className="input-form" placeholder="@seu.usuario" />
            </label>
            <label className="block">
              <span className="label-form">Localização</span>
              <input value={localizacaoAtual} onChange={(evento) => setLocalizacaoAtual(evento.target.value)} className="input-form" />
            </label>
            <label className="block">
              <span className="label-form">E-mail</span>
              <input value={email} onChange={(evento) => setEmail(evento.target.value)} className="input-form" type="email" />
            </label>
            <label className="block">
              <span className="label-form">Senha</span>
              <input value={senha} onChange={(evento) => setSenha(evento.target.value)} className="input-form" type="password" />
            </label>
            {mensagem ? <p className="rounded-2xl border border-rose-400/40 bg-rose-500/10 p-3 text-sm font-bold text-rose-200 light-theme:text-rose-700">{mensagem}</p> : null}
            <Botao onClick={handleCadastrar} className="w-full justify-center">
              <UserPlus className="h-4 w-4" />
              Criar perfil e entrar
            </Botao>
          </div>
        </section>
      </div>
    </main>
  );
}
/* === ACESSO DO USUARIO | fim === */

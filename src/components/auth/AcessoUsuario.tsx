import { LogIn, UserPlus } from 'lucide-react';
import { useState } from 'react';
import { Botao } from '@/components/ui/Botao';
import { useOrbitLink } from '@/context/OrbitLinkContext';

/* === ACESSO DO USUARIO | inicio === */
export function AcessoUsuario() {
  const { cadastrarUsuario, entrarUsuario } = useOrbitLink();
  const [modo, setModo] = useState<'entrar' | 'cadastro'>('cadastro');
  const [nome, setNome] = useState('');
  const [usuario, setUsuario] = useState('');
  const [email, setEmail] = useState('lia@orbitlink.local');
  const [senha, setSenha] = useState('orbitlink');
  const [localizacaoAtual, setLocalizacaoAtual] = useState('São Paulo, Brasil');
  const [mensagem, setMensagem] = useState('');

  function handleEntrar() {
    const resultado = entrarUsuario(email, senha);
    setMensagem(resultado.mensagem ?? '');
  }

  function handleCadastrar() {
    const resultado = cadastrarUsuario({ nome, usuario, email, senha, localizacaoAtual });
    setMensagem(resultado.mensagem ?? '');
  }

  return (
    <main className="min-h-[100dvh] overflow-x-hidden bg-[var(--bg-background)] px-4 py-6 font-orbit text-[var(--text-text)] sm:px-6">
      <div className="mx-auto grid min-h-[calc(100dvh-3rem)] w-full max-w-6xl items-center gap-6 lg:grid-cols-[1fr_420px]">
        <section className="space-y-5">
          <p className="font-monoapp text-xs font-black uppercase tracking-[0.18em] text-[var(--text-link)]">Orbitlink social</p>
          <h1 className="max-w-3xl text-4xl font-black uppercase leading-tight text-[var(--text-text)] md:text-6xl">
            Entre na rede social entre Terra e espaço.
          </h1>
          <p className="max-w-2xl text-base leading-8 text-[var(--text-muted)]">
            Crie posts, salve imagens, comente no Orbifeed e abra o DualView AR com câmera e pontos orbitais. O banco desta versão é local no navegador.
          </p>
          <div className="grid max-w-2xl gap-3 sm:grid-cols-3">
            {['Orbifeed central', 'Posts com imagem', 'Câmera AR'].map((item) => (
              <div key={item} className="rounded-2xl border border-[var(--border-border)] bg-[var(--bg-surface)] p-4 text-sm font-black uppercase tracking-[0.08em] text-[var(--text-text)]">
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[1.5rem] border border-[var(--border-border)] bg-[var(--bg-surface)] p-4 shadow-soft sm:p-5">
          <div className="mb-5 grid grid-cols-2 gap-2 rounded-2xl border border-[var(--border-border)] bg-[var(--bg-muted)] p-1">
            <button onClick={() => setModo('cadastro')} className={`rounded-xl px-3 py-3 text-xs font-black uppercase tracking-[0.12em] ${modo === 'cadastro' ? 'bg-[var(--bg-primary)] text-[var(--text-primary)]' : 'text-[var(--text-muted)]'}`}>
              Cadastro
            </button>
            <button onClick={() => setModo('entrar')} className={`rounded-xl px-3 py-3 text-xs font-black uppercase tracking-[0.12em] ${modo === 'entrar' ? 'bg-[var(--bg-primary)] text-[var(--text-primary)]' : 'text-[var(--text-muted)]'}`}>
              Entrar
            </button>
          </div>

          <div className="space-y-4">
            {modo === 'cadastro' ? (
              <>
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
              </>
            ) : null}
            <label className="block">
              <span className="label-form">E-mail</span>
              <input value={email} onChange={(evento) => setEmail(evento.target.value)} className="input-form" type="email" />
            </label>
            <label className="block">
              <span className="label-form">Senha</span>
              <input value={senha} onChange={(evento) => setSenha(evento.target.value)} className="input-form" type="password" />
            </label>
            {mensagem ? <p className="rounded-2xl border border-rose-400/40 bg-rose-500/10 p-3 text-sm font-bold text-rose-200 light-theme:text-rose-700">{mensagem}</p> : null}
            <Botao onClick={modo === 'cadastro' ? handleCadastrar : handleEntrar} className="w-full justify-center">
              {modo === 'cadastro' ? <UserPlus className="h-4 w-4" /> : <LogIn className="h-4 w-4" />}
              {modo === 'cadastro' ? 'Criar conta local' : 'Entrar como Lia'}
            </Botao>
          </div>
        </section>
      </div>
    </main>
  );
}
/* === ACESSO DO USUARIO | fim === */

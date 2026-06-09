import { UserPlus } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Botao } from "@/components/ui/Botao";
import { Modal } from "@/components/ui/Modal";
import { useOrbitLink } from "@/context/OrbitLinkContext";
import logoBlack from "@/assets/logo_black.png";
import logoWhite from "@/assets/logo_white.png";

/* === ACESSO DO USUARIO | inicio === */
export function AcessoUsuario() {
  const { cadastrarUsuario, entrarUsuario, entrarUsuarioPorId, tema } = useOrbitLink();
  const logo = tema === "dark" ? logoWhite : logoBlack;
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [usuario, setUsuario] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [localizacaoAtual, setLocalizacaoAtual] = useState("São Paulo, Brasil");
  const [mensagem, setMensagem] = useState("");
  const [mostrarLogin, setMostrarLogin] = useState(false);

  function handleCadastrar() {
    const resultado = cadastrarUsuario({ nome, usuario, email, senha, localizacaoAtual });
    setMensagem(resultado.mensagem ?? "");
  }

  function handleAbrirLogin() {
    setMensagem("");
    setMostrarLogin(true);
  }

  function handleFecharLogin() {
    setMostrarLogin(false);
    setMensagem("");
  }

  function handleEntrar() {
    const resultado = entrarUsuario(email, senha);
    setMensagem(resultado.mensagem ?? "E-mail ou senha inválidos.");

    if (resultado.sucesso) {
      setMostrarLogin(false);
    }
  }

  function handleAcessarTeste() {
    const resultado = entrarUsuarioPorId("marcos_nunes");
    if (resultado.sucesso) {
      setMostrarLogin(false);
      navigate("/perfis/marcos_nunes");
      return;
    }

    setMensagem(resultado.mensagem ?? "Falha ao acessar o teste GS - FIAP.");
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[var(--bg-background)] px-3 py-4 font-orbit text-[var(--text-text)] sm:px-6 sm:py-6">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[url('https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1400&q=80')] bg-cover bg-center bg-fixed opacity-25" />
      <div className="mx-auto grid min-h-[calc(100vh-3rem)] w-full max-w-6xl items-center gap-6 lg:grid-cols-[1fr_420px]">
        <section className="space-y-5">
          <div className="inline-flex items-center gap-3 rounded-full border border-[var(--border-border)] bg-[var(--bg-surface)] px-4 py-2 font-black uppercase tracking-[0.16em] shadow-soft">
            <span
              aria-label="Orbitlink"
              className="block h-10 w-[140px] bg-[var(--bg-primary)]"
              style={{ WebkitMask: `url(${logo}) center / contain no-repeat`, mask: `url(${logo}) center / contain no-repeat` }}
            />
          </div>
          <div className="space-y-3">
            <h1 className="max-w-3xl text-xl font-black text-nowrap uppercase leading-tight text-[var(--text-text)] tracking-[-0.04em] sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
              <div>
                Entre em <span className="text-[var(--text-link)]">ORBITA</span>
              </div>
              <div>
                Acompanhe o <span className="text-[var(--text-link)]">ORBITFEED</span>
              </div>
              <div>
                Seja <span className="text-[var(--text-link)]">ORBITLINK</span>
              </div>
            </h1>
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center ">
            <div className="h-fit w-full rounded-[1.5rem] border border-[var(--border-border)] bg-[var(--bg-surface)] p-4 shadow-soft sm:w-auto sm:p-5">
              <span className="block text-[var(--text-link)] text-sm font-black uppercase tracking-[0.1em]">Já tem conta?</span>
              <div className="mt-4">
                <Botao variante="secundario" onClick={handleAbrirLogin} className="w-full justify-center sm:w-auto">
                  Entrar com e-mail
                </Botao>
              </div>
            </div>
            <div className="h-fit w-full sm:w-auto  px-4">
              <Botao
                onClick={handleAcessarTeste}
                tamanho="lg"
                className="w-full text-fit h-[6rem] md:h-[7.2rem] lg:h-[7rem] justify-center bg-pink-700 text-white hover:bg-pink-500"
              >
                Acessar Teste <br />
                GS - FIAP
              </Botao>
            </div>
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

      <Modal aberto={mostrarLogin} titulo="Entrar com e-mail" onFechar={handleFecharLogin}>
        <div className="space-y-4">
          <label className="block">
            <span className="label-form">E-mail</span>
            <input value={email} onChange={(evento) => setEmail(evento.target.value)} className="input-form" type="email" />
          </label>
          <label className="block">
            <span className="label-form">Senha</span>
            <input value={senha} onChange={(evento) => setSenha(evento.target.value)} className="input-form" type="password" />
          </label>
          {mensagem ? <p className="rounded-2xl border border-rose-400/40 bg-rose-500/10 p-3 text-sm font-bold text-rose-200 light-theme:text-rose-700">{mensagem}</p> : null}
          <div className="grid gap-3 sm:flex sm:flex-wrap">
            <Botao onClick={handleEntrar} className="w-full justify-center sm:w-auto">
              Entrar
            </Botao>
            <Botao variante="secundario" onClick={handleFecharLogin} className="w-full justify-center sm:w-auto">
              Fechar
            </Botao>
          </div>
        </div>
      </Modal>
    </main>
  );
}
/* === ACESSO DO USUARIO | fim === */

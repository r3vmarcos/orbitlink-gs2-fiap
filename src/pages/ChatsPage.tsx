import { FormEvent, useMemo, useState } from "react";
import { ArrowLeft, Plus, Send, UserPlus, UsersRound, X } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CardBase } from "@/components/ui/CardBase";
import { useOrbitLink } from "@/context/OrbitLinkContext";
import type { ChatOrbitLink, UsuarioOrbitLink } from "@/types/orbitlink.types";
import { formatarTempoRelativo } from "@/utils/formatadores";

/* === CHATS PAGE | inicio === */
export function ChatsPage() {
  const { chats, usuarios, usuarioAtual, criarChat, enviarMensagemChat, adicionarParticipantesChat } = useOrbitLink();
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [mensagem, setMensagem] = useState("");
  const [busca, setBusca] = useState("");
  const [nomeGrupo, setNomeGrupo] = useState("");
  const [selecionados, setSelecionados] = useState<string[]>([]);
  const [telaMobile, setTelaMobile] = useState<"lista" | "conversa">("lista");
  const [painelAdicionarAberto, setPainelAdicionarAberto] = useState(false);

  const chatAtivo = useMemo(() => {
    return chats.find((chat) => chat.id === params.get("chat")) ?? chats[0];
  }, [chats, params]);

  const pessoasDisponiveis = useMemo(() => {
    const termo = busca.toLowerCase();
    return usuarios
      .filter((usuario) => usuario.id !== usuarioAtual?.id)
      .filter((usuario) => {
        const alvo = `${usuario.nome} ${usuario.usuario} ${usuario.cargo} ${usuario.localizacaoAtual}`.toLowerCase();
        return alvo.includes(termo);
      });
  }, [busca, usuarioAtual?.id, usuarios]);

  function obterTituloChat(chat: ChatOrbitLink) {
    if (chat.grupo) {
      return chat.nome ?? "Grupo Orbitlink";
    }

    const outroUsuario = usuarios.find((usuario) => usuario.id !== usuarioAtual?.id && chat.participanteIds.includes(usuario.id));
    return outroUsuario?.nome ?? "Conversa Orbitlink";
  }

  function obterFotoChat(chat: ChatOrbitLink) {
    const outroUsuario = usuarios.find((usuario) => usuario.id !== usuarioAtual?.id && chat.participanteIds.includes(usuario.id));
    const usuarioFoto = chat.grupo ? usuarios.find((usuario) => usuario.id === chat.criadoPorId) : outroUsuario;
    return usuarioFoto?.fotoPerfil ?? `https://i.pravatar.cc/120?u=${usuarioFoto?.id ?? chat.id}`;
  }

  function obterSubtituloChat(chat: ChatOrbitLink) {
    return chat.participanteIds
      .map((id) => usuarios.find((usuario) => usuario.id === id)?.nome)
      .filter(Boolean)
      .join(", ");
  }

  function alternarSelecionado(usuarioId: string) {
    setSelecionados((atuais) => (atuais.includes(usuarioId) ? atuais.filter((id) => id !== usuarioId) : [...atuais, usuarioId]));
  }

  function iniciarChat() {
    const chatId = criarChat(selecionados, nomeGrupo);

    if (chatId) {
      setSelecionados([]);
      setNomeGrupo("");
      setBusca("");
      navigate(`/chats?chat=${chatId}`);
    }
  }

  function adicionarAoChat() {
    if (!chatAtivo || selecionados.length === 0) {
      return;
    }

    adicionarParticipantesChat(chatAtivo.id, selecionados);
    setSelecionados([]);
    setPainelAdicionarAberto(false);
  }

  function enviarMensagem(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();

    if (!chatAtivo) {
      return;
    }

    enviarMensagemChat(chatAtivo.id, mensagem);
    setMensagem("");
  }

  return (
    <div className="flex h-[calc(100dvh-7.25rem)] min-h-0 flex-col gap-2 overflow-hidden md:h-[calc(100dvh-7rem)] md:gap-4">
      <h1 className="titulo-pagina hidden whitespace-nowrap text-center md:block md:text-left">Mensagens</h1>

      <div className="min-h-0 flex-1 overflow-hidden md:grid md:grid-cols-[40vw_minmax(0,60vw)] md:gap-4 lg:grid-cols-[300px_minmax(0,1fr)] xl:grid-cols-[360px_minmax(0,1fr)]">
      <div className={`${telaMobile === "lista" ? "grid" : "hidden"} h-full min-h-0 min-w-0 grid-rows-[minmax(0,1fr)_minmax(0,1fr)] gap-2 md:grid md:gap-4 md:grid-rows-[minmax(0,1fr)_minmax(0,1.15fr)]`}>
        <CardBase className="flex min-h-0 min-w-0 flex-col overflow-hidden p-2 md:p-3">
          <div className="flex items-center justify-between gap-3">
            <p className="font-monoapp text-[10px] font-black uppercase tracking-[0.14em] text-[var(--text-link)]">Chats</p>
            <button
              onClick={() => setTelaMobile("conversa")}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--bg-primary)] text-[var(--text-primary)] md:hidden"
              title="Abrir conversa"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-2 min-h-0 flex-1 space-y-1 overflow-y-auto pr-1 md:mt-3 md:space-y-2">
            {chats.map((chat) => {
              const ultimaMensagem = chat.mensagens[chat.mensagens.length - 1];
              const ativo = chat.id === chatAtivo?.id;

              return (
                <button
                  key={chat.id}
                  onClick={() => {
                    navigate(`/chats?chat=${chat.id}`);
                    setTelaMobile("conversa");
                    setPainelAdicionarAberto(false);
                  }}
                  className={`flex w-full min-w-0 items-center gap-2 rounded-xl border p-1.5 text-left transition md:gap-3 md:rounded-2xl md:p-2 ${ativo ? "border-[var(--bg-primary)] bg-[color-mix(in_srgb,var(--bg-primary)_14%,transparent)]" : "border-[var(--border-border)] bg-[var(--bg-muted)] hover:bg-[var(--bg-surface-hover)]"}`}
                >
                  <img
                    src={obterFotoChat(chat)}
                    alt={obterTituloChat(chat)}
                    className="h-8 w-8 shrink-0 rounded-lg border border-[var(--border-border)] object-cover md:h-10 md:w-10 md:rounded-xl"
                    loading="lazy"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-black text-[var(--text-text)] md:text-sm">{obterTituloChat(chat)}</p>
                    <p className="truncate text-[10px] text-[var(--text-muted)] md:text-xs">{ultimaMensagem?.texto ?? "Sem mensagens ainda."}</p>
                  </div>
                  <span className="shrink-0 font-monoapp text-[8px] uppercase text-[var(--text-muted)]">{formatarTempoRelativo(chat.atualizadoEm)}</span>
                </button>
              );
            })}
          </div>
        </CardBase>

        <CardBase className="flex min-h-0 min-w-0 flex-col overflow-hidden p-2 md:p-3">
          <p className="min-w-0 truncate font-monoapp text-[9px] font-black uppercase tracking-[0.1em] text-[var(--text-link)] md:text-[10px] md:tracking-[0.14em]">Nova conversa / Criar Grupo</p>
          <input value={busca} onChange={(evento) => setBusca(evento.target.value)} className="input-form mt-2 min-w-0 rounded-full px-3 py-1.5 text-[11px] md:mt-3 md:py-2 md:text-xs" placeholder="Buscar pessoas, grupos..." />

          <div className="mt-2 grid min-w-0 grid-cols-2 gap-2 md:mt-3">
            <button
              onClick={iniciarChat}
              disabled={selecionados.length === 0}
              className="inline-flex min-w-0 items-center justify-center gap-1.5 rounded-full bg-[var(--bg-primary)] px-2 py-1.5 font-monoapp text-[8px] font-black uppercase tracking-[0.06em] text-[var(--text-primary)] shadow-neon transition disabled:cursor-not-allowed disabled:opacity-50 md:py-2 md:text-[9px]"
            >
              <Plus className="h-3 w-3 shrink-0 md:h-3.5 md:w-3.5" />
              <span className="min-w-0 truncate">Criar</span>
            </button>
            <button
              onClick={adicionarAoChat}
              disabled={!chatAtivo || selecionados.length === 0}
              className="inline-flex min-w-0 items-center justify-center gap-1.5 rounded-full border border-[var(--border-border)] bg-[var(--bg-muted)] px-2 py-1.5 font-monoapp text-[8px] font-black uppercase tracking-[0.06em] text-[var(--text-text)] transition hover:bg-[var(--bg-surface-hover)] disabled:cursor-not-allowed disabled:opacity-50 md:py-2 md:text-[9px]"
            >
              <UserPlus className="h-3 w-3 shrink-0 md:h-3.5 md:w-3.5" />
              <span className="min-w-0 truncate">Adicionar</span>
            </button>
          </div>

          {selecionados.length ? (
            <div className="mt-2 hidden min-w-0 items-center gap-2 rounded-2xl border border-[var(--border-border)] bg-[var(--bg-muted)] px-3 py-2 md:flex">
              <UsersRound className="h-4 w-4 shrink-0 text-[var(--text-link)]" />
              <p className="min-w-0 truncate text-[10px] font-bold text-[var(--text-muted)]">{selecionados.length} pessoa(s) escolhida(s)</p>
            </div>
          ) : null}

          <div className="mt-2 min-h-0 flex-1 space-y-1.5 overflow-y-auto pr-1 md:mt-3 md:space-y-2">
            {pessoasDisponiveis.map((usuario) => (
              <PessoaSelecionavel key={usuario.id} usuario={usuario} ativo={selecionados.includes(usuario.id)} onClick={() => alternarSelecionado(usuario.id)} />
            ))}
          </div>

        </CardBase>
      </div>

      <CardBase className={`${telaMobile === "conversa" ? "flex" : "hidden"} h-full min-h-0 min-w-0 flex-col overflow-hidden p-0 md:flex md:h-full md:min-h-0`}>
        {chatAtivo ? (
          <>
            <div className="shrink-0 border-b border-[var(--border-border)] p-3 md:p-4">
              <div className="flex items-center gap-2 md:gap-3">
                <button
                  onClick={() => {
                    setTelaMobile("lista");
                    setPainelAdicionarAberto(false);
                  }}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--border-border)] bg-[var(--bg-muted)] text-[var(--text-text)] md:hidden"
                  title="Voltar para conversas"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <img
                  src={obterFotoChat(chatAtivo)}
                  alt={obterTituloChat(chatAtivo)}
                  className="h-9 w-9 shrink-0 rounded-xl border border-[var(--border-border)] object-cover md:h-12 md:w-12 md:rounded-2xl"
                  loading="lazy"
                />
                <div className="min-w-0 flex-1">
                  <h2 className="truncate text-base font-black text-[var(--text-text)] md:text-xl">{obterTituloChat(chatAtivo)}</h2>
                  <p className="truncate text-[10px] text-[var(--text-muted)] md:text-xs">{obterSubtituloChat(chatAtivo)}</p>
                </div>
                <button
                  onClick={() => setPainelAdicionarAberto((aberto) => !aberto)}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--bg-primary)] text-[var(--text-primary)]"
                  title="Adicionar pessoas"
                >
                  {painelAdicionarAberto ? <X className="h-4 w-4" /> : <UserPlus className="h-4 w-4" />}
                </button>
              </div>
              {painelAdicionarAberto ? (
                <div className="mt-3 rounded-2xl border border-[var(--border-border)] bg-[var(--bg-muted)] p-2">
                  <div className="flex items-center gap-2">
                    <input value={busca} onChange={(evento) => setBusca(evento.target.value)} className="input-form min-w-0 rounded-full px-3 py-1.5 text-[11px]" placeholder="Buscar pessoas..." />
                    <button
                      onClick={adicionarAoChat}
                      disabled={selecionados.length === 0}
                      className="inline-flex h-9 shrink-0 items-center justify-center rounded-full bg-[var(--bg-primary)] px-3 font-monoapp text-[8px] font-black uppercase text-[var(--text-primary)] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Add
                    </button>
                  </div>
                  <div className="mt-2 flex gap-2 overflow-x-auto pb-1">
                    {pessoasDisponiveis.map((usuario) => (
                      <PessoaSelecionavel key={usuario.id} usuario={usuario} ativo={selecionados.includes(usuario.id)} onClick={() => alternarSelecionado(usuario.id)} />
                    ))}
                  </div>
                </div>
              ) : null}
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto p-3 md:p-4">
              <div className="flex min-h-full flex-col justify-end space-y-2 md:space-y-3">
                {chatAtivo.mensagens.map((item) => {
                  const autor = usuarios.find((usuario) => usuario.id === item.autorId);
                  const minhaMensagem = item.autorId === usuarioAtual?.id;

                  return (
                    <div key={item.id} className={`flex ${minhaMensagem ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-[86%] rounded-2xl border px-3 py-2 md:max-w-[82%] md:px-4 md:py-3 ${minhaMensagem ? "border-[var(--bg-primary)] bg-[var(--bg-primary)] text-[var(--text-primary)]" : "border-[var(--border-border)] bg-[var(--bg-muted)] text-[var(--text-text)]"}`}
                      >
                        <p className="text-[9px] font-black uppercase opacity-80 md:text-[11px]">{autor?.nome ?? "Orbitlink"}</p>
                        <p className="mt-1 text-xs leading-5 md:text-sm md:leading-6">{item.texto}</p>
                        <p className="mt-1 text-right font-monoapp text-[8px] opacity-70 md:mt-2 md:text-[9px]">{formatarTempoRelativo(item.criadoEm)}</p>
                      </div>
                    </div>
                  );
                })}

                {chatAtivo.mensagens.length === 0 ? (
                  <div className="flex min-h-full items-center justify-center rounded-2xl border border-dashed border-[var(--border-border)] p-6 text-center text-sm text-[var(--text-muted)]">
                    Envie a primeira mensagem para iniciar a conversa.
                  </div>
                ) : null}
              </div>
            </div>

            <form onSubmit={enviarMensagem} className="flex shrink-0 gap-2 border-t border-[var(--border-border)] p-2 md:p-3">
              <input
                value={mensagem}
                onChange={(evento) => setMensagem(evento.target.value)}
                className="input-form rounded-full px-3 py-2 text-xs md:px-4 md:py-3 md:text-sm"
                placeholder="Digite sua mensagem..."
              />
              <button className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--bg-primary)] text-[var(--text-primary)] md:h-12 md:w-12" title="Enviar mensagem">
                <Send className="h-4 w-4 md:h-5 md:w-5" />
              </button>
            </form>
          </>
        ) : (
          <div className="flex flex-1 items-center justify-center p-6 text-center text-sm text-[var(--text-muted)]">Crie uma conversa para começar.</div>
        )}
      </CardBase>
      </div>
    </div>
  );
}

function PessoaSelecionavel({ usuario, ativo, onClick }: { usuario: UsuarioOrbitLink; ativo: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full min-w-0 items-center gap-2 rounded-xl border px-2 py-1.5 text-left md:rounded-2xl md:p-2 ${ativo ? "border-[var(--bg-primary)] bg-[color-mix(in_srgb,var(--bg-primary)_14%,transparent)]" : "border-[var(--border-border)] bg-[var(--bg-muted)]"}`}
    >
      <img
        src={usuario.fotoPerfil ?? `https://i.pravatar.cc/120?u=${usuario.id}`}
        alt={usuario.nome}
        className="h-7 w-7 shrink-0 rounded-lg border border-[var(--border-border)] object-cover md:h-10 md:w-10 md:rounded-xl"
        loading="lazy"
      />
      <div className="min-w-0 flex-1">
        <p className="truncate text-[11px] font-black text-[var(--text-text)] md:text-sm">{usuario.nome}</p>
        <p className="truncate text-[10px] text-[var(--text-muted)] md:text-xs">{usuario.usuario}</p>
      </div>
    </button>
  );
}
/* === CHATS PAGE | fim === */

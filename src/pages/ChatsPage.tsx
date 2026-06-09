import { FormEvent, useMemo, useState } from "react";
import { MessageCircle, Plus, Send, UserPlus, UsersRound } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Botao } from "@/components/ui/Botao";
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
    <div className="grid h-[calc(100dvh-7rem)] min-h-0 gap-4 overflow-hidden md:grid-cols-[300px_minmax(0,1fr)] xl:grid-cols-[360px_minmax(0,1fr)]">
      <CardBase className="flex min-h-0 min-w-0 flex-col overflow-hidden p-3">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="font-monoapp text-[10px] font-black uppercase tracking-[0.14em] text-[var(--text-link)]">Chats</p>
            <h1 className="titulo-pagina mt-1">Mensagens</h1>
          </div>
          <MessageCircle className="h-6 w-6 text-[var(--text-link)]" />
        </div>

        <div className="mt-4 min-h-0 flex-1 space-y-2 overflow-y-auto pr-1">
          {chats.map((chat) => {
            const ultimaMensagem = chat.mensagens[chat.mensagens.length - 1];
            const ativo = chat.id === chatAtivo?.id;

            return (
              <button
                key={chat.id}
                onClick={() => navigate(`/chats?chat=${chat.id}`)}
                className={`flex w-full min-w-0 items-center gap-3 rounded-2xl border p-2 text-left transition ${ativo ? "border-[var(--bg-primary)] bg-[color-mix(in_srgb,var(--bg-primary)_14%,transparent)]" : "border-[var(--border-border)] bg-[var(--bg-muted)] hover:bg-[var(--bg-surface-hover)]"}`}
              >
                <img
                  src={obterFotoChat(chat)}
                  alt={obterTituloChat(chat)}
                  className="h-10 w-10 shrink-0 rounded-xl border border-[var(--border-border)] object-cover"
                  loading="lazy"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-black text-[var(--text-text)]">{obterTituloChat(chat)}</p>
                  <p className="truncate text-xs text-[var(--text-muted)]">{ultimaMensagem?.texto ?? "Sem mensagens ainda."}</p>
                </div>
                <span className="shrink-0 font-monoapp text-[8px] uppercase text-[var(--text-muted)]">{formatarTempoRelativo(chat.atualizadoEm)}</span>
              </button>
            );
          })}
        </div>
      </CardBase>

      <div className="grid min-h-0 min-w-0 gap-4 md:grid-cols-[minmax(0,1fr)_280px] xl:grid-cols-[minmax(0,1fr)_320px]">
        <CardBase className="flex min-h-[520px] min-w-0 flex-col p-0 md:h-full md:min-h-0">
          {chatAtivo ? (
            <>
              <div className="border-b border-[var(--border-border)] p-4">
                <div className="flex items-center gap-3">
                  <img
                    src={obterFotoChat(chatAtivo)}
                    alt={obterTituloChat(chatAtivo)}
                    className="h-12 w-12 shrink-0 rounded-2xl border border-[var(--border-border)] object-cover"
                    loading="lazy"
                  />
                  <div className="min-w-0">
                    <h2 className="truncate text-xl font-black text-[var(--text-text)]">{obterTituloChat(chatAtivo)}</h2>
                    <p className="truncate text-xs text-[var(--text-muted)]">{obterSubtituloChat(chatAtivo)}</p>
                  </div>
                </div>
              </div>

              <div className="flex-1 space-y-3 overflow-y-auto p-4">
                {chatAtivo.mensagens.map((item) => {
                  const autor = usuarios.find((usuario) => usuario.id === item.autorId);
                  const minhaMensagem = item.autorId === usuarioAtual?.id;

                  return (
                    <div key={item.id} className={`flex ${minhaMensagem ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-[82%] rounded-2xl border px-4 py-3 ${minhaMensagem ? "border-[var(--bg-primary)] bg-[var(--bg-primary)] text-[var(--text-primary)]" : "border-[var(--border-border)] bg-[var(--bg-muted)] text-[var(--text-text)]"}`}
                      >
                        <p className="text-[11px] font-black uppercase opacity-80">{autor?.nome ?? "Orbitlink"}</p>
                        <p className="mt-1 text-sm leading-6">{item.texto}</p>
                        <p className="mt-2 text-right font-monoapp text-[9px] opacity-70">{formatarTempoRelativo(item.criadoEm)}</p>
                      </div>
                    </div>
                  );
                })}

                {chatAtivo.mensagens.length === 0 ? (
                  <div className="flex h-full items-center justify-center rounded-2xl border border-dashed border-[var(--border-border)] p-6 text-center text-sm text-[var(--text-muted)]">
                    Envie a primeira mensagem para iniciar a conversa.
                  </div>
                ) : null}
              </div>

              <form onSubmit={enviarMensagem} className="flex gap-2 border-t border-[var(--border-border)] p-3">
                <input
                  value={mensagem}
                  onChange={(evento) => setMensagem(evento.target.value)}
                  className="input-form rounded-full px-4 py-3"
                  placeholder="Digite sua mensagem..."
                />
                <button className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--bg-primary)] text-[var(--text-primary)]" title="Enviar mensagem">
                  <Send className="h-5 w-5" />
                </button>
              </form>
            </>
          ) : (
            <div className="flex flex-1 items-center justify-center p-6 text-center text-sm text-[var(--text-muted)]">Crie uma conversa para começar.</div>
          )}
        </CardBase>

        <CardBase className="flex min-h-0 min-w-0 flex-col overflow-hidden p-4">
          <p className="font-monoapp text-[10px] font-black uppercase tracking-[0.14em] text-[var(--text-link)]">Nova conversa</p>
          <input value={busca} onChange={(evento) => setBusca(evento.target.value)} className="input-form mt-3 rounded-full px-3 py-2 text-xs" placeholder="Buscar pessoas..." />
          <input
            value={nomeGrupo}
            onChange={(evento) => setNomeGrupo(evento.target.value)}
            className="input-form mt-2 rounded-full px-3 py-2 text-xs"
            placeholder="Nome do grupo, opcional"
          />

          <div className="mt-3 min-h-0 flex-1 space-y-2 overflow-y-auto pr-1">
            {pessoasDisponiveis.map((usuario) => (
              <PessoaSelecionavel key={usuario.id} usuario={usuario} ativo={selecionados.includes(usuario.id)} onClick={() => alternarSelecionado(usuario.id)} />
            ))}
          </div>

          <div className="mt-3 grid shrink-0 gap-2">
            <Botao onClick={iniciarChat} disabled={selecionados.length === 0}>
              <Plus className="h-4 w-4" /> Criar chat
            </Botao>
            <Botao variante="secundario" onClick={adicionarAoChat} disabled={!chatAtivo || selecionados.length === 0}>
              <UserPlus className="h-4 w-4" /> Adicionar ao chat
            </Botao>
          </div>

          <div className="mt-3 shrink-0 rounded-2xl border border-[var(--border-border)] bg-[var(--bg-muted)] p-3">
            <div className="flex items-center gap-2 text-xs font-black uppercase text-[var(--text-text)]">
              <UsersRound className="h-4 w-4" /> Selecionados
            </div>
            <p className="mt-2 text-xs leading-5 text-[var(--text-muted)]">
              {selecionados.length ? `${selecionados.length} pessoa(s) escolhida(s).` : "Escolha uma pessoa para chat direto ou várias para grupo."}
            </p>
          </div>
        </CardBase>
      </div>
    </div>
  );
}

function PessoaSelecionavel({ usuario, ativo, onClick }: { usuario: UsuarioOrbitLink; ativo: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full min-w-0 items-center gap-2 rounded-2xl border p-2 text-left ${ativo ? "border-[var(--bg-primary)] bg-[color-mix(in_srgb,var(--bg-primary)_14%,transparent)]" : "border-[var(--border-border)] bg-[var(--bg-muted)]"}`}
    >
      <img
        src={usuario.fotoPerfil ?? `https://i.pravatar.cc/120?u=${usuario.id}`}
        alt={usuario.nome}
        className="h-10 w-10 shrink-0 rounded-xl border border-[var(--border-border)] object-cover"
        loading="lazy"
      />
      <div className="min-w-0">
        <p className="truncate text-sm font-black text-[var(--text-text)]">{usuario.nome}</p>
        <p className="truncate text-xs text-[var(--text-muted)]">{usuario.usuario}</p>
      </div>
    </button>
  );
}
/* === CHATS PAGE | fim === */

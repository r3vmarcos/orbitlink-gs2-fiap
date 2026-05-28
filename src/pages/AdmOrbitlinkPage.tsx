import { UserPlus, UsersRound } from 'lucide-react';
import { useMemo, useState } from 'react';
import { CardBase } from '@/components/ui/CardBase';
import { useOrbitLink } from '@/context/OrbitLinkContext';
import type { TipoPerfil } from '@/types/orbitlink.types';

/* === ADM ORBITLINK PAGE | inicio === */
const tiposPerfil: TipoPerfil[] = ['observador_terra', 'comunidade_terra', 'cientista', 'astronauta', 'turista_espacial', 'estacao_espacial', 'missao'];

const estadoUsuarioInicial = {
  nome: '',
  usuario: '',
  email: '',
  senha: '',
  tipo: 'observador_terra' as TipoPerfil,
  cargo: '',
  localizacaoAtual: '',
  fotoPerfil: '',
};

export function AdmOrbitlinkPage() {
  const { usuarios, criarUsuarioAdmin } = useOrbitLink();
  const [usuarioForm, setUsuarioForm] = useState(estadoUsuarioInicial);
  const [mensagem, setMensagem] = useState('');

  const usuariosOrdenados = useMemo(() => [...usuarios].sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR')), [usuarios]);

  function atualizarUsuario(campo: keyof typeof estadoUsuarioInicial, valor: string) {
    setUsuarioForm((atual) => ({ ...atual, [campo]: valor }));
  }

  function handleCriarUsuario() {
    const resultado = criarUsuarioAdmin(usuarioForm);

    if (!resultado.sucesso) {
      setMensagem(resultado.mensagem ?? 'Não foi possível criar o usuário.');
      return;
    }

    setMensagem('Usuário criado no portal adm.');
    setUsuarioForm(estadoUsuarioInicial);
  }

  return (
    <div className="mx-auto w-full max-w-6xl space-y-5">
      <CardBase>
        <p className="font-monoapp text-xs font-black uppercase tracking-[0.18em] text-[var(--text-link)]">Portal adm</p>
        <h1 className="mt-2 text-3xl font-black uppercase leading-tight text-[var(--text-text)] sm:text-4xl">Gerenciar usuários</h1>
        <p className="mt-3 text-sm leading-6 text-[var(--text-muted)]">Nesta etapa, o painel administra apenas usuários. A rota não aparece no menu público.</p>
        {mensagem ? <p className="mt-4 rounded-2xl border border-[var(--border-border)] bg-[var(--bg-muted)] px-4 py-3 text-sm font-bold text-[var(--text-text)]">{mensagem}</p> : null}
      </CardBase>

      <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
        <CardBase>
          <div className="flex items-center gap-3">
            <UserPlus className="h-5 w-5 text-[var(--text-link)]" />
            <h2 className="text-xl font-black uppercase text-[var(--text-text)]">Criar usuário</h2>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <label className="block sm:col-span-2">
              <span className="label-form">Nome</span>
              <input value={usuarioForm.nome} onChange={(evento) => atualizarUsuario('nome', evento.target.value)} className="input-form" placeholder="Ex.: Marina Lopes" />
            </label>
            <label className="block">
              <span className="label-form">Usuário</span>
              <input value={usuarioForm.usuario} onChange={(evento) => atualizarUsuario('usuario', evento.target.value)} className="input-form" placeholder="@marina.orbita" />
            </label>
            <label className="block">
              <span className="label-form">Tipo</span>
              <select value={usuarioForm.tipo} onChange={(evento) => atualizarUsuario('tipo', evento.target.value)} className="input-form">
                {tiposPerfil.map((tipo) => <option key={tipo} value={tipo}>{tipo.replaceAll('_', ' ')}</option>)}
              </select>
            </label>
            <label className="block">
              <span className="label-form">E-mail</span>
              <input value={usuarioForm.email} onChange={(evento) => atualizarUsuario('email', evento.target.value)} className="input-form" placeholder="email@orbitlink.local" />
            </label>
            <label className="block">
              <span className="label-form">Senha</span>
              <input value={usuarioForm.senha} onChange={(evento) => atualizarUsuario('senha', evento.target.value)} className="input-form" placeholder="mínimo 6 caracteres" type="password" />
            </label>
            <label className="block sm:col-span-2">
              <span className="label-form">Cargo</span>
              <input value={usuarioForm.cargo} onChange={(evento) => atualizarUsuario('cargo', evento.target.value)} className="input-form" placeholder="Ex.: Observadora de passagens orbitais" />
            </label>
            <label className="block sm:col-span-2">
              <span className="label-form">Local atual</span>
              <input value={usuarioForm.localizacaoAtual} onChange={(evento) => atualizarUsuario('localizacaoAtual', evento.target.value)} className="input-form" placeholder="Ex.: São Paulo, Brasil" />
            </label>
            <label className="block sm:col-span-2">
              <span className="label-form">Foto de perfil opcional</span>
              <input value={usuarioForm.fotoPerfil} onChange={(evento) => atualizarUsuario('fotoPerfil', evento.target.value)} className="input-form" placeholder="https://..." />
            </label>
          </div>

          <button onClick={handleCriarUsuario} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[var(--bg-primary)] px-4 py-3 text-sm font-black uppercase text-[var(--text-primary)]">
            <UserPlus className="h-4 w-4" /> Criar usuário
          </button>
        </CardBase>

        <CardBase>
          <div className="flex items-center gap-3">
            <UsersRound className="h-5 w-5 text-[var(--text-link)]" />
            <h2 className="text-xl font-black uppercase text-[var(--text-text)]">Usuários cadastrados</h2>
          </div>
          <div className="mt-5 space-y-3">
            {usuariosOrdenados.map((usuario) => (
              <div key={usuario.id} className="rounded-2xl border border-[var(--border-border)] bg-[var(--bg-muted)] p-3">
                <p className="font-bold text-[var(--text-text)]">{usuario.nome}</p>
                <p className="text-xs leading-5 text-[var(--text-muted)]">{usuario.usuario} - {usuario.email ?? 'sem e-mail'} - {usuario.tipo.replaceAll('_', ' ')}</p>
                <p className="mt-1 text-xs leading-5 text-[var(--text-muted)]">{usuario.cargo} | {usuario.localizacaoAtual}</p>
              </div>
            ))}
          </div>
        </CardBase>
      </div>
    </div>
  );
}
/* === ADM ORBITLINK PAGE | fim === */

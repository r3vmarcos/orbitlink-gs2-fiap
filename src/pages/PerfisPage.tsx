import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AvatarOrbital } from '@/components/ui/AvatarOrbital';
import { Badge } from '@/components/ui/Badge';
import { CardPerfil } from '@/components/perfis/CardPerfil';
import { CardBase } from '@/components/ui/CardBase';
import { useOrbitLink } from '@/context/OrbitLinkContext';
import { lerLocalStorage, salvarLocalStorage } from '@/services/localStorageService';

/* === PERFIS PAGE | inicio === */
export function PerfisPage() {
  const { usuarios, usuarioAtual, posts, postsCurtidos, pontosAr, pontosSeguidos, usuariosSeguidos, seguirUsuario } = useOrbitLink();
  const { usuarioId } = useParams();
  const [fotosLocais, setFotosLocais] = useState<Record<string, string>>(() => lerLocalStorage('orbitlink_fotos_perfil', {}));
  const usuarioFocoId = usuarioId ?? usuarioAtual?.id;

  const usuariosComFoto = useMemo(() => usuarios.map((usuario) => ({
    ...usuario,
    fotoPerfil: fotosLocais[usuario.id] ?? usuario.fotoPerfil,
  })), [fotosLocais, usuarios]);

  const usuariosOrdenados = useMemo(() => usuariosComFoto.filter((usuario) => usuario.id === usuarioFocoId), [usuarioFocoId, usuariosComFoto]);
  const fotosDoPerfil = useMemo(() => posts.filter((post) => post.autorId === usuarioFocoId && post.imagem).slice(0, 9), [posts, usuarioFocoId]);
  const postsCurtidosVisiveis = useMemo(() => posts.filter((post) => postsCurtidos.includes(post.id)).slice(0, 4), [posts, postsCurtidos]);
  const conexoesPessoas = useMemo(() => usuariosComFoto.filter((usuario) => usuariosSeguidos.includes(usuario.id)), [usuariosComFoto, usuariosSeguidos]);
  const conexoesPaginas = useMemo(() => pontosAr.filter((ponto) => pontosSeguidos.includes(ponto.id)).slice(0, 4), [pontosAr, pontosSeguidos]);

  function alterarFoto(usuarioId: string, foto: string) {
    const proximo = { ...fotosLocais, [usuarioId]: foto };
    setFotosLocais(proximo);
    salvarLocalStorage('orbitlink_fotos_perfil', proximo);
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-5 overflow-hidden md:max-w-xl lg:max-w-3xl">
      <CardBase>
        <p className="font-monoapp text-xs font-black uppercase tracking-[0.18em] text-blue-300">Perfis Orbitlink</p>
        <h1 className="titulo-pagina mt-2">Minha órbita</h1>
      </CardBase>
      <div className="grid gap-5">
        {usuariosOrdenados.map((usuario) => (
          <CardPerfil
            key={usuario.id}
            usuario={usuario}
            destaque={usuario.id === usuarioAtual?.id}
            seguindo={usuariosSeguidos.includes(usuario.id)}
            onSeguir={usuario.id !== usuarioAtual?.id ? () => seguirUsuario(usuario.id) : undefined}
            onAlterarFoto={usuario.id === usuarioAtual?.id ? (foto) => alterarFoto(usuario.id, foto) : undefined}
          />
        ))}
      </div>
      <CardBase>
        <p className="font-monoapp text-[11px] font-black uppercase tracking-[0.14em] text-[var(--text-link)]">Fotos do feed</p>
        <div className="mt-4 grid grid-cols-3 gap-1.5">
          {fotosDoPerfil.map((post) => (
            <img key={post.id} src={post.imagem} alt={post.titulo} className="aspect-square w-full rounded-xl object-cover" loading="lazy" />
          ))}
          {fotosDoPerfil.length === 0 ? <p className="col-span-3 text-sm text-[var(--text-muted)]">Este perfil ainda não publicou fotos.</p> : null}
        </div>
      </CardBase>

      <CardBase>
        <p className="font-monoapp text-[11px] font-black uppercase tracking-[0.14em] text-[var(--text-link)]">Postagens curtidas</p>
        <div className="mt-4 grid gap-3">
          {postsCurtidosVisiveis.length > 0 ? (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {postsCurtidosVisiveis.map((post) => (
                <article key={post.id} className="overflow-hidden rounded-2xl border border-[var(--border-border)] bg-[var(--bg-muted)] p-3">
                  {post.imagem ? <img src={post.imagem} alt={post.titulo} className="mb-3 h-28 w-full rounded-2xl object-cover" loading="lazy" /> : null}
                  <p className="text-sm font-black text-[var(--text-text)] line-clamp-2">{post.titulo}</p>
                  <p className="mt-2 text-xs leading-5 text-[var(--text-muted)] line-clamp-2">{post.texto}</p>
                </article>
              ))}
            </div>
          ) : (
            <p className="text-sm text-[var(--text-muted)]">Você ainda não curtiu nenhuma publicação.</p>
          )}
        </div>
      </CardBase>

      <CardBase>
        <p className="font-monoapp text-[11px] font-black uppercase tracking-[0.14em] text-[var(--text-link)]">Conexões</p>
        <p className="mt-2 text-sm text-[var(--text-muted)]">Rede de pessoas e páginas conectadas ao seu perfil.</p>
        <div className="mt-4 grid gap-4">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.14em] text-blue-300">Pessoas</p>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              {conexoesPessoas.length > 0 ? conexoesPessoas.map((usuario) => (
                <div key={usuario.id} className="flex items-center justify-between gap-3 rounded-2xl border border-[var(--border-border)] bg-[var(--bg-muted)] p-3">
                  <div className="flex items-center gap-3">
                    <AvatarOrbital gradiente={usuario.avatarGradiente} nome={usuario.nome} tamanho="sm" />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-black text-[var(--text-text)]">{usuario.nome}</p>
                      <p className="truncate text-xs text-[var(--text-muted)]">{usuario.usuario}</p>
                    </div>
                  </div>
                  <Badge tom="azul">Seguindo</Badge>
                </div>
              )) : <p className="text-sm text-[var(--text-muted)]">Nenhuma conexão de pessoa disponível.</p>}
            </div>
          </div>

          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.14em] text-blue-300">Páginas</p>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {conexoesPaginas.length > 0 ? conexoesPaginas.map((ponto) => (
                <div key={ponto.id} className="rounded-2xl border border-[var(--border-border)] bg-[var(--bg-muted)] p-3">
                  <p className="text-sm font-black text-[var(--text-text)] line-clamp-2">{ponto.nome}</p>
                  <p className="mt-1 text-xs text-[var(--text-muted)] line-clamp-2">{ponto.camada.join(' · ')}</p>
                </div>
              )) : <p className="text-sm text-[var(--text-muted)]">Nenhuma página conectada no momento.</p>}
            </div>
          </div>
        </div>
      </CardBase>
    </div>
  );
}

/* === PERFIS PAGE | fim === */

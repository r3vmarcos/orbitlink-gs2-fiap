import { ExternalLink } from 'lucide-react';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { CardBase } from '@/components/ui/CardBase';
import { produtosOrbitLink, type ProdutoOrbitLink } from '@/data/produtos.data';

/* === LOJA PAGE | inicio === */
export function LojaPage() {
  const { produtoId } = useParams();
  const produtoDestacado = useMemo(() => produtosOrbitLink.find((produto) => produto.id === produtoId) ?? produtosOrbitLink[0], [produtoId]);

  return (
    <div className="mx-auto w-full max-w-md space-y-5 md:max-w-5xl">
      <CardProdutoDestaque produto={produtoDestacado} />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {produtosOrbitLink.map((produto) => (
          <CardProduto key={produto.id} produto={produto} destacado={produto.id === produtoDestacado.id} />
        ))}
      </section>
    </div>
  );
}

function CardProdutoDestaque({ produto }: { produto: ProdutoOrbitLink }) {
  return (
    <CardBase className="grid gap-4 overflow-hidden p-3 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:p-4">
      <img src={produto.imagem} alt={produto.nome} className="h-56 w-full rounded-[1.25rem] object-cover md:h-full" loading="lazy" />
      <div className="min-w-0 p-2">
        <p className="font-monoapp text-[11px] font-black uppercase tracking-[0.14em] text-[var(--text-link)]">Item em destaque</p>
        <h1 className="mt-2 text-3xl font-black uppercase leading-tight text-[var(--text-text)] md:text-4xl">{produto.nome}</h1>
        <p className="mt-3 text-sm leading-6 text-[var(--text-muted)]">{produto.descricao}</p>
        <p className="mt-4 text-2xl font-black text-[var(--text-text)]">{produto.preco}</p>
        <ul className="mt-4 grid gap-2 text-sm text-[var(--text-muted)]">
          {produto.dados.map((dado) => <li key={dado} className="rounded-2xl border border-[var(--border-border)] bg-[var(--bg-muted)] px-3 py-2">{dado}</li>)}
        </ul>
        <a href={produto.linkLoja} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-[var(--bg-primary)] px-4 py-3 font-monoapp text-xs font-black uppercase tracking-[0.1em] text-[var(--text-primary)] shadow-neon">
          Ir a Loja <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </CardBase>
  );
}

function CardProduto({ produto, destacado }: { produto: ProdutoOrbitLink; destacado: boolean }) {
  return (
    <CardBase className={`flex h-full flex-col overflow-hidden p-3 ${destacado ? 'border-[var(--bg-primary)]' : ''}`}>
      <img src={produto.imagem} alt={produto.nome} className="h-40 w-full rounded-[1.25rem] object-cover" loading="lazy" />
      <div className="flex flex-1 flex-col p-2">
        <h2 className="text-lg font-black uppercase text-[var(--text-text)]">{produto.nome}</h2>
        <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">{produto.resumo}</p>
        <p className="mt-auto pt-4 text-xl font-black text-[var(--text-text)]">{produto.preco}</p>
        <a href={produto.linkLoja} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center justify-center gap-2 rounded-2xl border border-[var(--bg-primary)] px-3 py-2 font-monoapp text-[10px] font-black uppercase tracking-[0.1em] text-[var(--bg-primary)]">
          Ir a Loja <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>
    </CardBase>
  );
}
/* === LOJA PAGE | fim === */

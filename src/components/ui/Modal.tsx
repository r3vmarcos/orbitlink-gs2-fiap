import { X } from 'lucide-react';
import type { ReactNode } from 'react';

/* === MODAL PADRAO | inicio === */
interface ModalProps {
  aberto: boolean;
  titulo: string;
  children: ReactNode;
  onFechar: () => void;
  telaCheiaMobile?: boolean;
}

export function Modal({ aberto, titulo, children, onFechar, telaCheiaMobile = false }: ModalProps) {
  if (!aberto) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[90] flex max-w-[100vw] items-end justify-center overflow-hidden bg-black/70 p-0 backdrop-blur-md md:items-center md:p-6">
      <div
        className={`relative flex w-full min-w-0 max-w-[100vw] flex-col overflow-hidden border border-blue-500/35 bg-slate-950 text-slate-100 shadow-neon light-theme:bg-white light-theme:text-slate-900 ${
          telaCheiaMobile ? 'h-[100dvh] rounded-none md:h-auto md:max-h-[92vh] md:max-w-4xl md:rounded-[2rem]' : 'max-h-[92vh] rounded-t-[2rem] md:max-w-3xl md:rounded-[2rem]'
        }`}
      >
        <header className="flex min-w-0 items-center justify-between gap-3 border-b border-blue-500/20 px-4 py-3 sm:px-5 sm:py-4">
          <h2 className="titulo-pagina min-w-0 text-balance">{titulo}</h2>
          <button onClick={onFechar} className="shrink-0 rounded-full p-2 text-slate-300 transition hover:bg-blue-500/10 hover:text-white light-theme:text-sky-900" aria-label="Fechar modal">
            <X className="h-5 w-5" />
          </button>
        </header>
        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4 sm:p-5">{children}</div>
      </div>
    </div>
  );
}
/* === MODAL PADRAO | fim === */

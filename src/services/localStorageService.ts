/* === SERVICO LOCALSTORAGE | inicio === */
export function lerLocalStorage<T>(chave: string, valorPadrao: T): T {
  try {
    const valor = window.localStorage.getItem(chave);
    if (!valor) {
      return valorPadrao;
    }
    return JSON.parse(valor) as T;
  } catch {
    return valorPadrao;
  }
}

export function salvarLocalStorage<T>(chave: string, valor: T): void {
  window.localStorage.setItem(chave, JSON.stringify(valor));
}

export function removerLocalStorage(chave: string): void {
  window.localStorage.removeItem(chave);
}
/* === SERVICO LOCALSTORAGE | fim === */

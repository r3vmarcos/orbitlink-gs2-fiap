import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';

/* === FORMATADORES | inicio === */
dayjs.locale('pt-br');

export function formatarNumeroCompacto(valor: number): string {
  return new Intl.NumberFormat('pt-BR', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(valor);
}

export function formatarTempoRelativo(dataIso: string): string {
  const agora = Date.now();
  const data = new Date(dataIso).getTime();
  const minutos = Math.max(1, Math.round((agora - data) / 60000));

  if (minutos < 60) {
    return `${minutos} min`;
  }

  const horas = Math.round(minutos / 60);
  if (horas < 24) {
    return `${horas} h`;
  }

  return dayjs(dataIso).format('DD/MM/YYYY');
}

export function calcularHorasRestantes(expiraEm: string): number {
  const diferenca = new Date(expiraEm).getTime() - Date.now();
  return Math.max(0, Math.ceil(diferenca / (1000 * 60 * 60)));
}

export function calcularProgressoStatus(criadoEm: string, expiraEm: string): number {
  const inicio = new Date(criadoEm).getTime();
  const fim = new Date(expiraEm).getTime();
  const agora = Date.now();
  const total = fim - inicio;

  if (total <= 0) {
    return 100;
  }

  return Math.min(100, Math.max(0, ((agora - inicio) / total) * 100));
}

export function gerarId(prefixo: string): string {
  return `${prefixo}_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}
/* === FORMATADORES | fim === */

import type { StatusOrbital } from '@/types/orbitlink.types';

/* === STATUS ORBITAIS SIMULADOS | inicio === */
const agora = Date.now();
const horas = 1000 * 60 * 60;

export const statusData: StatusOrbital[] = [
  {
    id: 'status_iss_live',
    autorId: 'helena_duarte',
    perspectiva: 'terra',
    titulo: 'Câmera orbital 24h',
    texto: 'Visual simulado da Terra vista da órbita. Na versão com API, esta área recebe imagem EPIC/NASA e fallback visual.',
    tipo: 'camera_orbital',
    imagem: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1200&q=80',
    pontoArId: 'aurora',
    criadoEm: new Date(agora - 6 * horas).toISOString(),
    expiraEm: new Date(agora + 18 * horas).toISOString(),
    origemDados: 'simulado',
  },
  {
    id: 'status_selene',
    autorId: 'selene_base',
    perspectiva: 'terra',
    titulo: 'Janela da Base Selene',
    texto: 'Status 24h da colônia lunar com atualização do módulo solar.',
    tipo: 'missao',
    imagem: 'https://images.unsplash.com/photo-1614642264762-d0a3b8bf3700?auto=format&fit=crop&w=1200&q=80',
    pontoArId: 'selene',
    criadoEm: new Date(agora - 3 * horas).toISOString(),
    expiraEm: new Date(agora + 21 * horas).toISOString(),
    origemDados: 'simulado',
  },
  {
    id: 'status_amazonia',
    autorId: 'amazonia_viva',
    perspectiva: 'espaco',
    titulo: 'Amazônia Viva agora',
    texto: 'Relato comunitário ativo por 24h para o mark Amazônia na camada da Orbitlink.',
    tipo: 'alerta',
    imagem: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=80',
    pontoArId: 'amazonia',
    criadoEm: new Date(agora - 2 * horas).toISOString(),
    expiraEm: new Date(agora + 22 * horas).toISOString(),
    origemDados: 'simulado',
  },
];
/* === STATUS ORBITAIS SIMULADOS | fim === */

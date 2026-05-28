import type { ChatOrbitLink } from '@/types/orbitlink.types';

/* === CHATS SIMULADOS | inicio === */
const agora = Date.now();
const minuto = 1000 * 60;

export const chatsData: ChatOrbitLink[] = [
  {
    id: 'chat_lia_helena',
    grupo: false,
    participanteIds: ['lia_novaes', 'helena_duarte'],
    criadoPorId: 'lia_novaes',
    criadoEm: new Date(agora - 95 * minuto).toISOString(),
    atualizadoEm: new Date(agora - 14 * minuto).toISOString(),
    mensagens: [
      {
        id: 'msg_lia_helena_1',
        autorId: 'helena_duarte',
        texto: 'A passagem sobre o Sudeste ficou limpa. Vou liberar um status com imagem orbital.',
        criadoEm: new Date(agora - 95 * minuto).toISOString(),
      },
      {
        id: 'msg_lia_helena_2',
        autorId: 'lia_novaes',
        texto: 'Perfeito. Vou cruzar com os marks de cidade e puxar para o feed.',
        criadoEm: new Date(agora - 14 * minuto).toISOString(),
      },
    ],
  },
  {
    id: 'chat_grupo_status',
    nome: 'Equipe Status 24h',
    grupo: true,
    participanteIds: ['lia_novaes', 'helena_duarte', 'kim_sato', 'amazonia_viva'],
    criadoPorId: 'helena_duarte',
    criadoEm: new Date(agora - 210 * minuto).toISOString(),
    atualizadoEm: new Date(agora - 32 * minuto).toISOString(),
    mensagens: [
      {
        id: 'msg_grupo_status_1',
        autorId: 'kim_sato',
        texto: 'EONET voltou com evento novo. Mantive fallback local caso a NASA oscile.',
        criadoEm: new Date(agora - 210 * minuto).toISOString(),
      },
      {
        id: 'msg_grupo_status_2',
        autorId: 'amazonia_viva',
        texto: 'Recebido. A comunidade da Amazônia pode validar o alerta antes de publicar.',
        criadoEm: new Date(agora - 32 * minuto).toISOString(),
      },
    ],
  },
];
/* === CHATS SIMULADOS | fim === */

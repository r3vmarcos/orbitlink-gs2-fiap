import type { MissaoOrbitLink } from '@/types/orbitlink.types';

/* === MISSÕES SIMULADAS | inicio === */
export const missoesData: MissaoOrbitLink[] = [
  {
    id: 'missao_aurora',
    nome: 'Estação Orbital Aurora',
    status: 'em_andamento',
    local: 'orbita',
    objetivo: 'Conectar experiências orbitais com comunidades na Terra.',
    descricao: 'Missão social orbital focada em registros visuais, status 24h e respostas para usuários terrestres.',
    participantes: ['Helena Duarte', 'Rafael Kim', 'Tripulação Aurora'],
    ods: ['ODS 9', 'ODS 13'],
    pontoArId: 'aurora',
    linhaTempo: [
      { id: 'm1', data: 'D-7', titulo: 'Preparação da transmissão', descricao: 'Testes do canal social e do status orbital.' },
      { id: 'm2', data: 'Hoje', titulo: 'Passagem sobre a América do Sul', descricao: 'Posts e marks vinculados ao Brasil.' },
      { id: 'm3', data: 'D+2', titulo: 'Sessão de perguntas da Terra', descricao: 'Usuários enviam perguntas pelo feed.' },
    ],
  },
  {
    id: 'missao_selene',
    nome: 'Colônia Lunar Selene',
    status: 'em_andamento',
    local: 'lua',
    objetivo: 'Simular a rotina social de uma base lunar.',
    descricao: 'Base lunar experimental com conteúdos de infraestrutura, energia e comunicação.',
    participantes: ['Base Selene', 'Leo Martins'],
    ods: ['ODS 9'],
    pontoArId: 'selene',
    linhaTempo: [
      { id: 's1', data: 'D-12', titulo: 'Módulo solar instalado', descricao: 'Infraestrutura energética da base.' },
      { id: 's2', data: 'Hoje', titulo: 'Status 24h ativo', descricao: 'Janela lunar publicada no Feed.' },
    ],
  },
  {
    id: 'missao_gaia',
    nome: 'Satélite Gaia-13',
    status: 'planejada',
    local: 'terra',
    objetivo: 'Monitorar eventos ambientais e transformar alertas em marks sociais.',
    descricao: 'Satélite simulado para conectar dados climáticos, posts e ODS 13.',
    participantes: ['Rafael Kim', 'Observatório Terra Viva'],
    ods: ['ODS 13', 'ODS 2'],
    pontoArId: 'gaia13',
    linhaTempo: [
      { id: 'g1', data: 'D+1', titulo: 'Sincronizar eventos EONET', descricao: 'Fase API transforma eventos naturais em marks.' },
    ],
  },
  {
    id: 'missao_ares',
    nome: 'Ares Link',
    status: 'planejada',
    local: 'marte',
    objetivo: 'Criar canal social de exploração marciana.',
    descricao: 'Missão fictícia para posts educativos e narrativa de exploração de Marte.',
    participantes: ['Equipe Ares', 'Comunidade Terra'],
    ods: ['ODS 9'],
    pontoArId: 'marte',
    linhaTempo: [
      { id: 'a1', data: 'D+10', titulo: 'Pré-lançamento social', descricao: 'Abrir perguntas para o público.' },
    ],
  },
];
/* === MISSÕES SIMULADAS | fim === */

import type { PostOrbitLink, TipoCategoriaPost, TipoOds, TipoPerspectiva } from '@/types/orbitlink.types';

/* === POSTS SIMULADOS | inicio === */
interface SementePostagem {
  autorId: string;
  perspectiva: TipoPerspectiva;
  titulo: string;
  texto: string;
  imagem: string;
  categoria: TipoCategoriaPost;
  pontoArId: string;
  ods: TipoOds[];
}

const imagensOrbitais = [
  'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1454789548928-9efd52dc4031?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1543059080-f9b1272213d5?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80',
] as const;

const sementesPostagens: SementePostagem[] = [
  { autorId: 'helena_duarte', perspectiva: 'terra', titulo: 'Passando sobre a América do Sul', texto: 'A costa brasileira apareceu como uma fita de luz. Marquei o registro para comparar cidade, oceano e nuvens no Orbifeed.', imagem: imagensOrbitais[0], categoria: 'estacao', pontoArId: 'aurora', ods: ['ODS 11', 'ODS 13'] },
  { autorId: 'selene_base', perspectiva: 'terra', titulo: 'Diário 42 da Colônia Selene', texto: 'O módulo solar norte voltou ao nominal. A próxima janela será dedicada à conversa Terra-Lua com baixa latência.', imagem: imagensOrbitais[1], categoria: 'lua', pontoArId: 'selene', ods: ['ODS 9'] },
  { autorId: 'rafael_kim', perspectiva: 'terra', titulo: 'Gaia-13 detecta mudança atmosférica', texto: 'A camada climática simulada mostra aerossóis e frente úmida sobre o litoral. Dados abertos ajudam comunidades a reagir mais cedo.', imagem: imagensOrbitais[3], categoria: 'satelite', pontoArId: 'gaia13', ods: ['ODS 13'] },
  { autorId: 'amazonia_viva', perspectiva: 'espaco', titulo: 'Registro local de fumaça no horizonte', texto: 'Moradores enviaram relatos e fotos. O ponto social aparece para tripulações em órbita acompanharem a situação em tempo quase real.', imagem: imagensOrbitais[4], categoria: 'clima', pontoArId: 'amazonia', ods: ['ODS 13', 'ODS 2'] },
  { autorId: 'lia_novaes', perspectiva: 'espaco', titulo: 'São Paulo como pulso urbano', texto: 'A cidade vira mapa de conversa sobre mobilidade, luz noturna, calor e conexão entre bairros.', imagem: imagensOrbitais[5], categoria: 'cidade', pontoArId: 'sao_paulo', ods: ['ODS 11'] },
  { autorId: 'leo_martins', perspectiva: 'espaco', titulo: 'Cristo Redentor na camada de turismo orbital', texto: 'O ponto turístico abre histórias de quem acompanha lançamentos e passagens visíveis do Rio de Janeiro.', imagem: imagensOrbitais[6], categoria: 'turismo', pontoArId: 'rio_cristo', ods: ['ODS 11'] },
  { autorId: 'maria_okafor', perspectiva: 'espaco', titulo: 'Biomas conectados por relatos locais', texto: 'Cruzamos relatos de agricultores com imagens orbitais para entender pressão hídrica e produção alimentar.', imagem: imagensOrbitais[4], categoria: 'bioma', pontoArId: 'brasil', ods: ['ODS 2', 'ODS 13'] },
  { autorId: 'tomas_sato', perspectiva: 'terra', titulo: 'Telemetria azul do satélite Gaia', texto: 'A trilha do satélite ficou limpa durante a passagem. Adicionei o mark para testar filtros sociais no AR.', imagem: imagensOrbitais[2], categoria: 'satelite', pontoArId: 'gaia13', ods: ['ODS 9'] },
  { autorId: 'nina_alvarez', perspectiva: 'espaco', titulo: 'Roteiro orbital pelo Rio', texto: 'Turismo visto do alto precisa mostrar beleza e impacto local. O Orbifeed ajuda a contextualizar os pontos.', imagem: imagensOrbitais[6], categoria: 'turismo', pontoArId: 'rio_cristo', ods: ['ODS 8', 'ODS 11'] },
  { autorId: 'omar_haddad', perspectiva: 'terra', titulo: 'Janela Marte em simulação social', texto: 'A equipe abriu uma conversa pública sobre habitat, energia e rotina de missão para estudantes acompanharem.', imagem: imagensOrbitais[2], categoria: 'missao', pontoArId: 'marte', ods: ['ODS 9'] },
  { autorId: 'ines_carvalho', perspectiva: 'espaco', titulo: 'Atlântico em atenção', texto: 'Comunidades costeiras adicionaram relatos de maré e vento. A camada social ficou útil para leitura rápida.', imagem: imagensOrbitais[7], categoria: 'clima', pontoArId: 'alerta_atlantico', ods: ['ODS 13'] },
  { autorId: 'kai_roberts', perspectiva: 'terra', titulo: 'Checklist de manutenção externa', texto: 'O braço robótico respondeu bem. Publiquei o resumo para a turma acompanhar como um EVA é documentado.', imagem: imagensOrbitais[0], categoria: 'estacao', pontoArId: 'aurora', ods: ['ODS 9'] },
  { autorId: 'ayla_fernandes', perspectiva: 'espaco', titulo: 'Mapa urbano com foco em ODS 11', texto: 'Quando a cidade é vista de cima, áreas de conexão e sombra social ficam mais fáceis de discutir.', imagem: imagensOrbitais[5], categoria: 'ods', pontoArId: 'sao_paulo', ods: ['ODS 11'] },
  { autorId: 'benicio_luna', perspectiva: 'terra', titulo: 'Sinal limpo na janela lunar', texto: 'A estação de rádio captou uma sequência estável. Marquei a Lua para comparar ruído e visibilidade.', imagem: imagensOrbitais[1], categoria: 'lua', pontoArId: 'lua', ods: ['ODS 9'] },
  { autorId: 'sora_park', perspectiva: 'espaco', titulo: 'Imagem EPIC para abrir debate', texto: 'A foto completa da Terra sempre muda a conversa. Hoje o foco ficou em nuvens, oceanos e cidades.', imagem: imagensOrbitais[0], categoria: 'clima', pontoArId: 'brasil', ods: ['ODS 13'] },
  { autorId: 'bruno_vega', perspectiva: 'terra', titulo: 'Contagem regressiva comunitária', texto: 'Antes do lançamento, o Orbifeed reuniu perguntas de escolas e observadores espalhados pelo mapa.', imagem: imagensOrbitais[2], categoria: 'missao', pontoArId: 'aurora', ods: ['ODS 9'] },
  { autorId: 'camila_torres', perspectiva: 'espaco', titulo: 'Cidades noturnas e poluição luminosa', texto: 'A camada de luz ajuda a conversar sobre energia, segurança e qualidade do céu urbano.', imagem: imagensOrbitais[5], categoria: 'cidade', pontoArId: 'sao_paulo', ods: ['ODS 11', 'ODS 13'] },
  { autorId: 'noah_silva', perspectiva: 'espaco', titulo: 'Alerta costeiro no Atlântico', texto: 'Relatos de pesca e maré foram reunidos no mesmo ponto para apoiar leitura comunitária.', imagem: imagensOrbitais[7], categoria: 'comunidade', pontoArId: 'alerta_atlantico', ods: ['ODS 13'] },
  { autorId: 'yara_mendes', perspectiva: 'terra', titulo: 'Transferência Terra-Lua em tempo social', texto: 'A trajetória ficou visível no painel. A missão Selene ganhou perguntas de estudantes em minutos.', imagem: imagensOrbitais[1], categoria: 'lua', pontoArId: 'selene', ods: ['ODS 9'] },
  { autorId: 'diego_amaral', perspectiva: 'espaco', titulo: 'Paris vista como constelação urbana', texto: 'O mark de Paris abriu uma sequência de fotos comparando cultura, turismo e fluxo de pessoas.', imagem: imagensOrbitais[5], categoria: 'turismo', pontoArId: 'paris', ods: ['ODS 8', 'ODS 11'] },
  { autorId: 'mei_lin', perspectiva: 'terra', titulo: 'Sala de missão aberta', texto: 'Transformamos a simulação em aula ao vivo. Cada etapa da órbita virou uma postagem comentável.', imagem: imagensOrbitais[0], categoria: 'missao', pontoArId: 'aurora', ods: ['ODS 9'] },
  { autorId: 'samira_nasser', perspectiva: 'espaco', titulo: 'Alerta ambiental em linguagem simples', texto: 'O desafio é traduzir dados rápidos para decisões locais. A rede ajuda a explicar o risco sem alarmismo.', imagem: imagensOrbitais[3], categoria: 'clima', pontoArId: 'brasil', ods: ['ODS 13'] },
  { autorId: 'lucas_ribeiro', perspectiva: 'terra', titulo: 'Passagem visível no céu de BH', texto: 'A estação cruzou o horizonte por quatro minutos. Publiquei o horário para outros observadores confirmarem.', imagem: imagensOrbitais[0], categoria: 'estacao', pontoArId: 'aurora', ods: ['ODS 9'] },
  { autorId: 'priya_menon', perspectiva: 'espaco', titulo: 'Monte Fuji como ponto afetivo', texto: 'Pontos icônicos funcionam melhor quando misturam imagem, contexto cultural e conversa local.', imagem: imagensOrbitais[7], categoria: 'turismo', pontoArId: 'monte_fuji', ods: ['ODS 8'] },
  { autorId: 'enzo_moretti', perspectiva: 'terra', titulo: 'Camada AR com leitura mais limpa', texto: 'Testei os pontos com contraste alto para funcionar em câmera real e também em simulação.', imagem: imagensOrbitais[2], categoria: 'evento', pontoArId: 'venus', ods: ['ODS 9'] },
  { autorId: 'clara_monteiro', perspectiva: 'espaco', titulo: 'Ciência cidadã no Orbifeed', texto: 'A turma comparou relatos locais com imagens orbitais e criou perguntas para a próxima missão.', imagem: imagensOrbitais[4], categoria: 'comunidade', pontoArId: 'amazonia', ods: ['ODS 9', 'ODS 13'] },
  { autorId: 'lia_novaes', perspectiva: 'terra', titulo: 'Orbifeed em modo curadoria', texto: 'Organizei os posts por missão, cidade e alerta para deixar o feed mais vivo logo na abertura.', imagem: imagensOrbitais[0], categoria: 'diario_orbital', pontoArId: 'aurora', ods: ['ODS 9'] },
  { autorId: 'helena_duarte', perspectiva: 'terra', titulo: 'Aurora sobre o terminador', texto: 'A linha entre dia e noite apareceu nítida. É um bom ponto para explicar órbita e percepção de tempo.', imagem: imagensOrbitais[2], categoria: 'diario_orbital', pontoArId: 'aurora', ods: ['ODS 9'] },
  { autorId: 'rafael_kim', perspectiva: 'espaco', titulo: 'Nuvens sobre o Brasil central', texto: 'A leitura orbital conversa com relatos de calor no solo. Marquei o post para acompanhamento climático.', imagem: imagensOrbitais[3], categoria: 'clima', pontoArId: 'brasil', ods: ['ODS 13'] },
  { autorId: 'selene_base', perspectiva: 'terra', titulo: 'Rotina de cultivo lunar', texto: 'O módulo de cultivo registrou estabilidade. O debate sobre alimento fora da Terra segue aberto.', imagem: imagensOrbitais[1], categoria: 'lua', pontoArId: 'selene', ods: ['ODS 2', 'ODS 9'] },
  { autorId: 'amazonia_viva', perspectiva: 'espaco', titulo: 'Relato de rio baixo', texto: 'A comunidade marcou trechos com baixa navegação. O post fica vinculado ao bioma para comparação futura.', imagem: imagensOrbitais[4], categoria: 'bioma', pontoArId: 'amazonia', ods: ['ODS 2', 'ODS 13'] },
  { autorId: 'leo_martins', perspectiva: 'terra', titulo: 'Vista suborbital em primeira pessoa', texto: 'O salto visual entre atmosfera e espaço ainda é a melhor forma de explicar fragilidade planetária.', imagem: imagensOrbitais[0], categoria: 'evento', pontoArId: 'aurora', ods: ['ODS 13'] },
  { autorId: 'maria_okafor', perspectiva: 'espaco', titulo: 'Agricultura e satélite na mesma conversa', texto: 'O post cruza relato de plantio com leitura climática. Simples, mas poderoso para aprendizagem.', imagem: imagensOrbitais[4], categoria: 'ods', pontoArId: 'brasil', ods: ['ODS 2', 'ODS 13'] },
  { autorId: 'tomas_sato', perspectiva: 'terra', titulo: 'Órbita calibrada para aula', texto: 'Reduzi ruído visual da telemetria e deixei a rota pronta para demonstração no modo AR.', imagem: imagensOrbitais[2], categoria: 'satelite', pontoArId: 'gaia13', ods: ['ODS 9'] },
  { autorId: 'nina_alvarez', perspectiva: 'espaco', titulo: 'Turismo também é contexto', texto: 'Cada ponto turístico ganha comentários, fotos e ODS para não virar só cartão postal.', imagem: imagensOrbitais[6], categoria: 'turismo', pontoArId: 'rio_cristo', ods: ['ODS 8', 'ODS 11'] },
  { autorId: 'omar_haddad', perspectiva: 'terra', titulo: 'Marte em perguntas rápidas', texto: 'A simulação recebeu dúvidas sobre energia, poeira e comunicação. O feed segurou bem a conversa.', imagem: imagensOrbitais[2], categoria: 'missao', pontoArId: 'marte', ods: ['ODS 9'] },
  { autorId: 'ines_carvalho', perspectiva: 'espaco', titulo: 'Comunidade costeira em rede', texto: 'Quando o oceano muda, a primeira informação costuma vir de quem mora perto dele.', imagem: imagensOrbitais[7], categoria: 'comunidade', pontoArId: 'alerta_atlantico', ods: ['ODS 13'] },
  { autorId: 'kai_roberts', perspectiva: 'terra', titulo: 'Ferramentas presas, missão tranquila', texto: 'Pequenos detalhes de segurança rendem bons posts educativos para quem acompanha a operação.', imagem: imagensOrbitais[0], categoria: 'estacao', pontoArId: 'aurora', ods: ['ODS 9'] },
  { autorId: 'ayla_fernandes', perspectiva: 'espaco', titulo: 'Mobilidade vista de cima', texto: 'A cidade conta outra história quando olhamos fluxo, calor e ocupação na mesma tela.', imagem: imagensOrbitais[5], categoria: 'cidade', pontoArId: 'sao_paulo', ods: ['ODS 11'] },
  { autorId: 'benicio_luna', perspectiva: 'terra', titulo: 'Rádio profundo antes do amanhecer', texto: 'A janela de escuta ficou limpa. Adicionei marca para quem quiser comparar com a posição da Lua.', imagem: imagensOrbitais[1], categoria: 'lua', pontoArId: 'lua', ods: ['ODS 9'] },
  { autorId: 'sora_park', perspectiva: 'espaco', titulo: 'Arquivo visual da Terra', texto: 'Escolhi uma sequência para mostrar como nuvens e luz urbana mudam ao longo do dia.', imagem: imagensOrbitais[3], categoria: 'clima', pontoArId: 'brasil', ods: ['ODS 13'] },
  { autorId: 'bruno_vega', perspectiva: 'terra', titulo: 'Lançamento comentado em tempo real', texto: 'A contagem regressiva virou conversa pública, com perguntas sobre empuxo e janela orbital.', imagem: imagensOrbitais[2], categoria: 'missao', pontoArId: 'aurora', ods: ['ODS 9'] },
  { autorId: 'camila_torres', perspectiva: 'espaco', titulo: 'Noite urbana sem perder humanidade', texto: 'Luz não é só dado técnico. Também revela hábitos, desigualdade e encontros.', imagem: imagensOrbitais[5], categoria: 'cidade', pontoArId: 'sao_paulo', ods: ['ODS 11'] },
  { autorId: 'noah_silva', perspectiva: 'espaco', titulo: 'Rede azul em alerta', texto: 'O ponto do Atlântico reuniu relatos curtos e imagens para uma leitura rápida da costa.', imagem: imagensOrbitais[7], categoria: 'clima', pontoArId: 'alerta_atlantico', ods: ['ODS 13'] },
  { autorId: 'yara_mendes', perspectiva: 'terra', titulo: 'Ponte Selene confirmada', texto: 'A rota de transferência foi revisada e publicada como diário de missão para a comunidade.', imagem: imagensOrbitais[1], categoria: 'lua', pontoArId: 'selene', ods: ['ODS 9'] },
  { autorId: 'diego_amaral', perspectiva: 'espaco', titulo: 'Paris em escala orbital', texto: 'A cidade aparece como textura de luz. O turismo ganha outra camada quando visto do espaço.', imagem: imagensOrbitais[5], categoria: 'turismo', pontoArId: 'paris', ods: ['ODS 8', 'ODS 11'] },
  { autorId: 'mei_lin', perspectiva: 'terra', titulo: 'Missão como sala de aula', texto: 'Cada etapa publicada no feed recebeu comentários de estudantes e virou trilha de aprendizagem.', imagem: imagensOrbitais[0], categoria: 'missao', pontoArId: 'aurora', ods: ['ODS 9'] },
  { autorId: 'samira_nasser', perspectiva: 'espaco', titulo: 'Alertas que cabem no celular', texto: 'O texto curto, a imagem e o ponto AR precisam explicar o risco sem empurrar pânico.', imagem: imagensOrbitais[3], categoria: 'clima', pontoArId: 'brasil', ods: ['ODS 13'] },
  { autorId: 'lucas_ribeiro', perspectiva: 'terra', titulo: 'Céu limpo para observar a estação', texto: 'A previsão ajudou a comunidade local a combinar o melhor horário para olhar para cima.', imagem: imagensOrbitais[0], categoria: 'estacao', pontoArId: 'aurora', ods: ['ODS 9'] },
  { autorId: 'priya_menon', perspectiva: 'espaco', titulo: 'Fuji entre cultura e órbita', texto: 'O ponto conecta turismo, paisagem e observação remota sem perder o contexto das pessoas.', imagem: imagensOrbitais[7], categoria: 'turismo', pontoArId: 'monte_fuji', ods: ['ODS 8'] },
];

export const postsData: PostOrbitLink[] = sementesPostagens.map((postagem, indice) => ({
  id: `post_orbifeed_${String(indice + 1).padStart(2, '0')}`,
  ...postagem,
  curtidas: 340 + indice * 73,
  comentarios: indice % 4 === 0
    ? [{ id: `comentario_base_${indice}`, autor: 'Orbifeed', texto: 'Discussão aberta para a comunidade.', criadoEm: new Date(Date.now() - 1000 * 60 * (indice + 8)).toISOString() }]
    : [],
  compartilhamentos: 24 + indice * 9,
  criadoEm: new Date(Date.now() - 1000 * 60 * (indice * 17 + 12)).toISOString(),
  origemDados: 'simulado',
}));
/* === POSTS SIMULADOS | fim === */

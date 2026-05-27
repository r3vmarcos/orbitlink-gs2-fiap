import type { PostOrbitLink, TipoCategoriaPost, TipoOds, TipoPerspectiva } from '@/types/orbitlink.types';

/* === POSTS SIMULADOS | inicio === */
interface SementePostagem {
  autorId: string;
  perspectiva: TipoPerspectiva;
  titulo: string;
  texto: string;
  consultaImagem: string;
  categoria: TipoCategoriaPost;
  pontoArId: string;
  ods: TipoOds[];
}

function gerarImagemDaPostagem(consulta: string, indice: number): string {
  const tags = consulta
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ',')
    .replace(/^,+|,+$/g, '');

  return `https://loremflickr.com/1200/800/${tags}?lock=${indice + 101}`;
}

const sementesPostagens: SementePostagem[] = [
  { autorId: 'helena_duarte', perspectiva: 'terra', titulo: 'Passando sobre a América do Sul', texto: 'A costa brasileira apareceu como uma fita de luz. Marquei o registro para comparar cidade, oceano e nuvens no Orbifeed.', consultaImagem: 'south america from space night lights coast', categoria: 'estacao', pontoArId: 'aurora', ods: ['ODS 11', 'ODS 13'] },
  { autorId: 'selene_base', perspectiva: 'terra', titulo: 'Diário 42 da Colônia Selene', texto: 'O módulo solar norte voltou ao nominal. A próxima janela será dedicada à conversa Terra-Lua com baixa latência.', consultaImagem: 'moon base solar panels astronaut habitat', categoria: 'lua', pontoArId: 'selene', ods: ['ODS 9'] },
  { autorId: 'rafael_kim', perspectiva: 'terra', titulo: 'Gaia-13 detecta mudança atmosférica', texto: 'A camada climática simulada mostra aerossóis e frente úmida sobre o litoral. Dados abertos ajudam comunidades a reagir mais cedo.', consultaImagem: 'weather satellite clouds atmosphere earth', categoria: 'satelite', pontoArId: 'gaia13', ods: ['ODS 13'] },
  { autorId: 'amazonia_viva', perspectiva: 'espaco', titulo: 'Registro local de fumaça no horizonte', texto: 'Moradores enviaram relatos e fotos. O ponto social aparece para tripulações em órbita acompanharem a situação em tempo quase real.', consultaImagem: 'amazon rainforest smoke horizon community', categoria: 'clima', pontoArId: 'amazonia', ods: ['ODS 13', 'ODS 2'] },
  { autorId: 'lia_novaes', perspectiva: 'espaco', titulo: 'São Paulo como pulso urbano', texto: 'A cidade vira mapa de conversa sobre mobilidade, luz noturna, calor e conexão entre bairros.', consultaImagem: 'sao paulo skyline night city lights', categoria: 'cidade', pontoArId: 'sao_paulo', ods: ['ODS 11'] },
  { autorId: 'leo_martins', perspectiva: 'espaco', titulo: 'Cristo Redentor na camada de turismo orbital', texto: 'O ponto turístico abre histórias de quem acompanha lançamentos e passagens visíveis do Rio de Janeiro.', consultaImagem: 'christ redeemer rio de janeiro aerial', categoria: 'turismo', pontoArId: 'rio_cristo', ods: ['ODS 11'] },
  { autorId: 'maria_okafor', perspectiva: 'espaco', titulo: 'Biomas conectados por relatos locais', texto: 'Cruzamos relatos de agricultores com imagens orbitais para entender pressão hídrica e produção alimentar.', consultaImagem: 'farmland satellite irrigation africa', categoria: 'bioma', pontoArId: 'brasil', ods: ['ODS 2', 'ODS 13'] },
  { autorId: 'tomas_sato', perspectiva: 'terra', titulo: 'Telemetria azul do satélite Gaia', texto: 'A trilha do satélite ficou limpa durante a passagem. Adicionei o mark para testar filtros sociais no AR.', consultaImagem: 'satellite orbit telemetry blue earth', categoria: 'satelite', pontoArId: 'gaia13', ods: ['ODS 9'] },
  { autorId: 'nina_alvarez', perspectiva: 'espaco', titulo: 'Roteiro orbital pelo Rio', texto: 'Turismo visto do alto precisa mostrar beleza e impacto local. O Orbifeed ajuda a contextualizar os pontos.', consultaImagem: 'rio de janeiro aerial coastline tourism', categoria: 'turismo', pontoArId: 'rio_cristo', ods: ['ODS 8', 'ODS 11'] },
  { autorId: 'omar_haddad', perspectiva: 'terra', titulo: 'Janela Marte em simulação social', texto: 'A equipe abriu uma conversa pública sobre habitat, energia e rotina de missão para estudantes acompanharem.', consultaImagem: 'mars desert habitat simulation rover', categoria: 'missao', pontoArId: 'marte', ods: ['ODS 9'] },
  { autorId: 'ines_carvalho', perspectiva: 'espaco', titulo: 'Atlântico em atenção', texto: 'Comunidades costeiras adicionaram relatos de maré e vento. A camada social ficou útil para leitura rápida.', consultaImagem: 'atlantic ocean storm coast waves', categoria: 'clima', pontoArId: 'alerta_atlantico', ods: ['ODS 13'] },
  { autorId: 'kai_roberts', perspectiva: 'terra', titulo: 'Checklist de manutenção externa', texto: 'O braço robótico respondeu bem. Publiquei o resumo para a turma acompanhar como um EVA é documentado.', consultaImagem: 'astronaut spacewalk space station maintenance', categoria: 'estacao', pontoArId: 'aurora', ods: ['ODS 9'] },
  { autorId: 'ayla_fernandes', perspectiva: 'espaco', titulo: 'Mapa urbano com foco em ODS 11', texto: 'Quando a cidade é vista de cima, áreas de conexão e sombra social ficam mais fáceis de discutir.', consultaImagem: 'urban map aerial streets sustainable city', categoria: 'ods', pontoArId: 'sao_paulo', ods: ['ODS 11'] },
  { autorId: 'benicio_luna', perspectiva: 'terra', titulo: 'Sinal limpo na janela lunar', texto: 'A estação de rádio captou uma sequência estável. Marquei a Lua para comparar ruído e visibilidade.', consultaImagem: 'radio telescope moon night sky', categoria: 'lua', pontoArId: 'lua', ods: ['ODS 9'] },
  { autorId: 'sora_park', perspectiva: 'espaco', titulo: 'Imagem EPIC para abrir debate', texto: 'A foto completa da Terra sempre muda a conversa. Hoje o foco ficou em nuvens, oceanos e cidades.', consultaImagem: 'full earth clouds ocean from space', categoria: 'clima', pontoArId: 'brasil', ods: ['ODS 13'] },
  { autorId: 'bruno_vega', perspectiva: 'terra', titulo: 'Contagem regressiva comunitária', texto: 'Antes do lançamento, o Orbifeed reuniu perguntas de escolas e observadores espalhados pelo mapa.', consultaImagem: 'rocket launch countdown crowd night', categoria: 'missao', pontoArId: 'aurora', ods: ['ODS 9'] },
  { autorId: 'camila_torres', perspectiva: 'espaco', titulo: 'Cidades noturnas e poluição luminosa', texto: 'A camada de luz ajuda a conversar sobre energia, segurança e qualidade do céu urbano.', consultaImagem: 'city night lights aerial light pollution', categoria: 'cidade', pontoArId: 'sao_paulo', ods: ['ODS 11', 'ODS 13'] },
  { autorId: 'noah_silva', perspectiva: 'espaco', titulo: 'Alerta costeiro no Atlântico', texto: 'Relatos de pesca e maré foram reunidos no mesmo ponto para apoiar leitura comunitária.', consultaImagem: 'fishing coast rough sea community', categoria: 'comunidade', pontoArId: 'alerta_atlantico', ods: ['ODS 13'] },
  { autorId: 'yara_mendes', perspectiva: 'terra', titulo: 'Transferência Terra-Lua em tempo social', texto: 'A trajetória ficou visível no painel. A missão Selene ganhou perguntas de estudantes em minutos.', consultaImagem: 'earth moon trajectory spacecraft', categoria: 'lua', pontoArId: 'selene', ods: ['ODS 9'] },
  { autorId: 'diego_amaral', perspectiva: 'espaco', titulo: 'Paris vista como constelação urbana', texto: 'O mark de Paris abriu uma sequência de fotos comparando cultura, turismo e fluxo de pessoas.', consultaImagem: 'paris aerial night lights city', categoria: 'turismo', pontoArId: 'paris', ods: ['ODS 8', 'ODS 11'] },
  { autorId: 'mei_lin', perspectiva: 'terra', titulo: 'Sala de missão aberta', texto: 'Transformamos a simulação em aula ao vivo. Cada etapa da órbita virou uma postagem comentável.', consultaImagem: 'mission control room screens spacecraft', categoria: 'missao', pontoArId: 'aurora', ods: ['ODS 9'] },
  { autorId: 'samira_nasser', perspectiva: 'espaco', titulo: 'Alerta ambiental em linguagem simples', texto: 'O desafio é traduzir dados rápidos para decisões locais. A rede ajuda a explicar o risco sem alarmismo.', consultaImagem: 'environmental alert dashboard climate data', categoria: 'clima', pontoArId: 'brasil', ods: ['ODS 13'] },
  { autorId: 'lucas_ribeiro', perspectiva: 'terra', titulo: 'Passagem visível no céu de BH', texto: 'A estação cruzou o horizonte por quatro minutos. Publiquei o horário para outros observadores confirmarem.', consultaImagem: 'space station passing night sky long exposure', categoria: 'estacao', pontoArId: 'aurora', ods: ['ODS 9'] },
  { autorId: 'priya_menon', perspectiva: 'espaco', titulo: 'Monte Fuji como ponto afetivo', texto: 'Pontos icônicos funcionam melhor quando misturam imagem, contexto cultural e conversa local.', consultaImagem: 'mount fuji japan aerial landscape', categoria: 'turismo', pontoArId: 'monte_fuji', ods: ['ODS 8'] },
  { autorId: 'enzo_moretti', perspectiva: 'terra', titulo: 'Camada AR com leitura mais limpa', texto: 'Testei os pontos com contraste alto para funcionar em câmera real e também em simulação.', consultaImagem: 'augmented reality interface night sky', categoria: 'evento', pontoArId: 'venus', ods: ['ODS 9'] },
  { autorId: 'clara_monteiro', perspectiva: 'espaco', titulo: 'Ciência cidadã no Orbifeed', texto: 'A turma comparou relatos locais com imagens orbitais e criou perguntas para a próxima missão.', consultaImagem: 'students science citizen satellite map', categoria: 'comunidade', pontoArId: 'amazonia', ods: ['ODS 9', 'ODS 13'] },
  { autorId: 'lia_novaes', perspectiva: 'terra', titulo: 'Orbifeed em modo curadoria', texto: 'Organizei os posts por missão, cidade e alerta para deixar o feed mais vivo logo na abertura.', consultaImagem: 'social media dashboard space data', categoria: 'diario_orbital', pontoArId: 'aurora', ods: ['ODS 9'] },
  { autorId: 'helena_duarte', perspectiva: 'terra', titulo: 'Aurora sobre o terminador', texto: 'A linha entre dia e noite apareceu nítida. É um bom ponto para explicar órbita e percepção de tempo.', consultaImagem: 'earth terminator line orbit sunrise', categoria: 'diario_orbital', pontoArId: 'aurora', ods: ['ODS 9'] },
  { autorId: 'rafael_kim', perspectiva: 'espaco', titulo: 'Nuvens sobre o Brasil central', texto: 'A leitura orbital conversa com relatos de calor no solo. Marquei o post para acompanhamento climático.', consultaImagem: 'brazil clouds satellite weather', categoria: 'clima', pontoArId: 'brasil', ods: ['ODS 13'] },
  { autorId: 'selene_base', perspectiva: 'terra', titulo: 'Rotina de cultivo lunar', texto: 'O módulo de cultivo registrou estabilidade. O debate sobre alimento fora da Terra segue aberto.', consultaImagem: 'space greenhouse plants lunar habitat', categoria: 'lua', pontoArId: 'selene', ods: ['ODS 2', 'ODS 9'] },
  { autorId: 'amazonia_viva', perspectiva: 'espaco', titulo: 'Relato de rio baixo', texto: 'A comunidade marcou trechos com baixa navegação. O post fica vinculado ao bioma para comparação futura.', consultaImagem: 'amazon river drought aerial rainforest', categoria: 'bioma', pontoArId: 'amazonia', ods: ['ODS 2', 'ODS 13'] },
  { autorId: 'leo_martins', perspectiva: 'terra', titulo: 'Vista suborbital em primeira pessoa', texto: 'O salto visual entre atmosfera e espaço ainda é a melhor forma de explicar fragilidade planetária.', consultaImagem: 'suborbital flight earth curvature window', categoria: 'evento', pontoArId: 'aurora', ods: ['ODS 13'] },
  { autorId: 'maria_okafor', perspectiva: 'espaco', titulo: 'Agricultura e satélite na mesma conversa', texto: 'O post cruza relato de plantio com leitura climática. Simples, mas poderoso para aprendizagem.', consultaImagem: 'satellite agriculture fields climate', categoria: 'ods', pontoArId: 'brasil', ods: ['ODS 2', 'ODS 13'] },
  { autorId: 'tomas_sato', perspectiva: 'terra', titulo: 'Órbita calibrada para aula', texto: 'Reduzi ruído visual da telemetria e deixei a rota pronta para demonstração no modo AR.', consultaImagem: 'satellite orbit classroom visualization', categoria: 'satelite', pontoArId: 'gaia13', ods: ['ODS 9'] },
  { autorId: 'nina_alvarez', perspectiva: 'espaco', titulo: 'Turismo também é contexto', texto: 'Cada ponto turístico ganha comentários, fotos e ODS para não virar só cartão postal.', consultaImagem: 'sustainable tourism aerial landmark', categoria: 'turismo', pontoArId: 'rio_cristo', ods: ['ODS 8', 'ODS 11'] },
  { autorId: 'omar_haddad', perspectiva: 'terra', titulo: 'Marte em perguntas rápidas', texto: 'A simulação recebeu dúvidas sobre energia, poeira e comunicação. O feed segurou bem a conversa.', consultaImagem: 'mars rover red desert habitat questions', categoria: 'missao', pontoArId: 'marte', ods: ['ODS 9'] },
  { autorId: 'ines_carvalho', perspectiva: 'espaco', titulo: 'Comunidade costeira em rede', texto: 'Quando o oceano muda, a primeira informação costuma vir de quem mora perto dele.', consultaImagem: 'coastal community ocean climate', categoria: 'comunidade', pontoArId: 'alerta_atlantico', ods: ['ODS 13'] },
  { autorId: 'kai_roberts', perspectiva: 'terra', titulo: 'Ferramentas presas, missão tranquila', texto: 'Pequenos detalhes de segurança rendem bons posts educativos para quem acompanha a operação.', consultaImagem: 'astronaut tools space station repair', categoria: 'estacao', pontoArId: 'aurora', ods: ['ODS 9'] },
  { autorId: 'ayla_fernandes', perspectiva: 'espaco', titulo: 'Mobilidade vista de cima', texto: 'A cidade conta outra história quando olhamos fluxo, calor e ocupação na mesma tela.', consultaImagem: 'urban traffic aerial mobility heat map', categoria: 'cidade', pontoArId: 'sao_paulo', ods: ['ODS 11'] },
  { autorId: 'benicio_luna', perspectiva: 'terra', titulo: 'Rádio profundo antes do amanhecer', texto: 'A janela de escuta ficou limpa. Adicionei marca para quem quiser comparar com a posição da Lua.', consultaImagem: 'radio observatory dawn moon', categoria: 'lua', pontoArId: 'lua', ods: ['ODS 9'] },
  { autorId: 'sora_park', perspectiva: 'espaco', titulo: 'Arquivo visual da Terra', texto: 'Escolhi uma sequência para mostrar como nuvens e luz urbana mudam ao longo do dia.', consultaImagem: 'earth observation archive satellite clouds city lights', categoria: 'clima', pontoArId: 'brasil', ods: ['ODS 13'] },
  { autorId: 'bruno_vega', perspectiva: 'terra', titulo: 'Lançamento comentado em tempo real', texto: 'A contagem regressiva virou conversa pública, com perguntas sobre empuxo e janela orbital.', consultaImagem: 'rocket launch spectators real time', categoria: 'missao', pontoArId: 'aurora', ods: ['ODS 9'] },
  { autorId: 'camila_torres', perspectiva: 'espaco', titulo: 'Noite urbana sem perder humanidade', texto: 'Luz não é só dado técnico. Também revela hábitos, desigualdade e encontros.', consultaImagem: 'night city people lights aerial', categoria: 'cidade', pontoArId: 'sao_paulo', ods: ['ODS 11'] },
  { autorId: 'noah_silva', perspectiva: 'espaco', titulo: 'Rede azul em alerta', texto: 'O ponto do Atlântico reuniu relatos curtos e imagens para uma leitura rápida da costa.', consultaImagem: 'atlantic coast blue network alert map', categoria: 'clima', pontoArId: 'alerta_atlantico', ods: ['ODS 13'] },
  { autorId: 'yara_mendes', perspectiva: 'terra', titulo: 'Ponte Selene confirmada', texto: 'A rota de transferência foi revisada e publicada como diário de missão para a comunidade.', consultaImagem: 'lunar spacecraft route moon mission', categoria: 'lua', pontoArId: 'selene', ods: ['ODS 9'] },
  { autorId: 'diego_amaral', perspectiva: 'espaco', titulo: 'Paris em escala orbital', texto: 'A cidade aparece como textura de luz. O turismo ganha outra camada quando visto do espaço.', consultaImagem: 'paris city lights from above night', categoria: 'turismo', pontoArId: 'paris', ods: ['ODS 8', 'ODS 11'] },
  { autorId: 'mei_lin', perspectiva: 'terra', titulo: 'Missão como sala de aula', texto: 'Cada etapa publicada no feed recebeu comentários de estudantes e virou trilha de aprendizagem.', consultaImagem: 'students mission control classroom space', categoria: 'missao', pontoArId: 'aurora', ods: ['ODS 9'] },
  { autorId: 'samira_nasser', perspectiva: 'espaco', titulo: 'Alertas que cabem no celular', texto: 'O texto curto, a imagem e o ponto AR precisam explicar o risco sem empurrar pânico.', consultaImagem: 'mobile climate alert satellite map', categoria: 'clima', pontoArId: 'brasil', ods: ['ODS 13'] },
  { autorId: 'lucas_ribeiro', perspectiva: 'terra', titulo: 'Céu limpo para observar a estação', texto: 'A previsão ajudou a comunidade local a combinar o melhor horário para olhar para cima.', consultaImagem: 'clear night sky space station observation', categoria: 'estacao', pontoArId: 'aurora', ods: ['ODS 9'] },
  { autorId: 'priya_menon', perspectiva: 'espaco', titulo: 'Fuji entre cultura e órbita', texto: 'O ponto conecta turismo, paisagem e observação remota sem perder o contexto das pessoas.', consultaImagem: 'mount fuji culture landscape aerial', categoria: 'turismo', pontoArId: 'monte_fuji', ods: ['ODS 8'] },
];

export const postsData: PostOrbitLink[] = sementesPostagens.map((postagem, indice) => {
  const { consultaImagem, ...dadosPostagem } = postagem;

  return {
    id: `post_orbifeed_${String(indice + 1).padStart(2, '0')}`,
    ...dadosPostagem,
    imagem: gerarImagemDaPostagem(consultaImagem, indice),
    curtidas: 340 + indice * 73,
    comentarios: indice % 4 === 0
      ? [{ id: `comentario_base_${indice}`, autor: 'Orbifeed', texto: 'Discussão aberta para a comunidade.', criadoEm: new Date(Date.now() - 1000 * 60 * (indice + 8)).toISOString() }]
      : [],
    compartilhamentos: 24 + indice * 9,
    criadoEm: new Date(Date.now() - 1000 * 60 * (indice * 17 + 12)).toISOString(),
    origemDados: 'simulado',
  };
});
/* === POSTS SIMULADOS | fim === */

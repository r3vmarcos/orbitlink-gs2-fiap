o que aconteceu com a versão Em note/PC/ultrawide,
esta uma bagunça total.

quero o que é exibido no mobile
[FEED]
dimensionado para os breakpoints note/PC/ultrawide
exibir [Tendencias] e [Marks recomendados]

[AR]
dimensionado para os breakpoints note/PC/ultrawide
nessa versão AR sera [MAPA]
Onde tenha um mapa 2d com os marks distribuidos proporcionalmente aos pontos Ar 3d
[POST]
dimensionado para os breakpoints note/PC/ultrawide
[FOTOS]
dimensionado para os breakpoints note/PC/ultrawide
tem um grid com 2 colunas
[PERFIL]
dimensionado para os breakpoints note/PC/ultrawide
Perfil deve exibir selos do participante

Faça uma pequena bio de cada usuario tb

no [AR 360 terra]
os marks estão no chão
quero eles no teto, simulando o local no espaço
ao clicar fora feche o card do mark aberto

---

no Mobile/tablet
em [AR] o menu [CAMADAS]
deixe o itens escondidos no botão camada e abra os itens horizontalmente

no note/PC/ultrawide
[MAPA] deve caber em 100vh e 100vw

FEED | MAPA | POST | FOTOS | PERFIL
devem ficar no header

no [FEED]
deve ser em 3 colunas

exiba o feed na coluna do meio e os outros itens na esquerda e direita

=====================

no Mobile/tablet
em [AR] o menu [CAMADAS]
quando abrir o menu, anime abrindo de cima pra baixo os itens

social
planetas
lua
estacoes
satelites
missoes
eventos
cidades
turismo
clima
biomas
ods

os marks estão fixos na tela
estou viranndo o celular e o item esta ficando fixo.
quero que simule um ambiente 3d para mostrar o céu.

Não vejo o botão [CALIBRAR]

no note/PC/ultrawide
no [header] deixe na sequencia
Feed | Mapa | Post| FotosPerfil

No [MAPA]
coloque as camadas ao lado de "Mapa Mapa Orbitlink"
Coloque um bg paralax de espaço

no [FEED]
deve ser em 3 colunas
deixe a [Buscar] acima dos feeds no meio

retire [Tendencias]

Coloque [Patrocinio]
e faca cards com anuncios de produtos
com produtos como Smartphones, telescopios, etc.

congele os menus laterais e role somente o FEED central
os menus laterais devem caber sempre em 100vh

em [Status Orbitlink 24h] retire o botão [criar]
e deixe os botoes menores (Câmera orbital 24h 13h restantes)etc

os [Marks recomendados] Devem ter marks reais e não
ex: Comunidade Amazônia Viva
Andes vistos do espaco

============================================================================================
no [GLOBAL]
[POST]
Tenha bg transparent com borda cor do tema
[PERFIL]
Apareça somente as informações do usuario.

faça uma pagina para [pessoas]
tenha um botão [Pessoas] que leva a uma pagina que exiba pessoas com busca global.
Deixe [pessoas] entre [post] e [fotos]

no note/PC/ultrawide
no [FEED]

[Marks recomendados]
deixe so 3 na tela
use https://inspira-ui.com/docs/en/components/miscellaneous/animated-list
para passar os demais, tenha pelo menos 10 passando

[Status Orbitlink 24h]
use https://inspira-ui.com/docs/en/components/miscellaneous/marquee para passar os cards
tenha pelo menos 10 cards
com 1 linha so

no mobile
[PERFIL]
nao cobre 100vw como [FEED] [FOTOS]
Deixe como [FEED] [FOTOS]

faça a branch no main
e deploy no main

=====================================================
Faltou as fotos no feed que tinham, uma direfente da outra

refaça os posts
em [Fotos] Traduza o conteudo da NASA, e coloque mais fotos. Coloque umas 30

=================================

deixe os anuncios pequenos como estavam mas com fotos
volte ao tamanho que estavam

no Mobile/tablet
[PERFIL]
Apareça somente as informações do usuario.

em [AR] 360 terra

nao esta simulando o ambiente 3d
como mostra as imagens

veja que "Copernicus Eco" moveu-se junto com o mover do celular
nao criou um ambiente 3d

arrume isso e coloque os pontos em posição superior simulando um ceu com os pontos

================ 28/05 ============================
crie [CHATS]
faça todo a logica para criar um sistema de mensagens entre pessoas

-- nivel global
em [Pessoas]
nao exiba o meu perfil

no [Header]
tablet/note/PC/ultrawide
Tema e Paletas fique ao lado do logo

Deixe na ordem
Feed
Mapa
chats
Post
Pessoas
Fotos
Perfil

em mobile
deixe abaixo a ordem
Feed
AR
Post
Pessoas
Fotos

deixe no header
[chats] somente icone
[Perfil] somente icone

-- no Mobile/tablet
em [PERFIL]
Pegue todos os temas do projeto em
X:\0projetos_organizados\page_test_theme\page_test_theme_v1
e implemente na parte do perfil
separe por Dark e light
deixe 2 linhas para os temas
deixe a ultima escolha do usuario como ativa para Dark e light

Ajuste isso no Mobile/tablet
como as imagens monstram, estão usando o tamanho pc/note
ajuste

-- no tablet
em [FEED]
deixe como note/PC/ultrawide
com as 3 colunas
deixe o feed com o tamanho que esta, so add a coluna a esquerda e a direita e ajuste

-- no tablet/note/PC/ultrawide
em [FEED]
"Status Orbitlink 24h" nao estava funcionando, revise o funcionamento

abaixo de "Status Orbitlink 24h" mostre os [CHATS]
as ultimas conversas

reviser a ortografia em pt-br
verifique se tem mojibakes
faça a branch no github na main
faça o deploy no cloudflare

## ===2222222222222==============================

## cada "---" separa um pedido

no [HEADER]
em tablet/note/PC/ultrawide
"Chats" deve ser Nome
somente icone no MOBILE

---

o [HEADER] deve ser fixo em todas as resoluções
mas ao rolar para baixo ele deve ocultado para cima (espere 2s para fazer)
e ao rolar para cima apareça novamente

---

exiba no mobile
no [header]
na esquerda: Logo, Tema, Paletas
na direita: Perfil, troca tema
abaixo: Feed, AR, Post, Pessoas, Fotos

---

exiba no Tablet
no [header]
na esquerda: Logo, Tema, Paletas
centro: Feed, Mapa, Post, Pessoas, Fotos
na direita: Perfil, troca tema

---

exiba no note/PC/ultrawide
no [header]
na esquerda: Logo, Tema, Paletas
centro: Feed, Mapa, Post, Pessoas, Fotos
na direita: Perfil, troca tema

---

note/PC/ultrawide
no [FEED]
as colunas 1 e 3 devem estar distribuidas em 100vh sem rolagem
somente role as postagens

diminua a pesquisa

deixe os filtros
(#todos
#diarioorbital
#missao
#estacao
#lua
#satelite
#evento
#cidade
#turismo
#comunidade
#clima
#bioma
#odsa)
acima de tudo em 100vw

a busca fique na coluna 1 acima de "Status Orbitlink 24h"
"Status Orbitlink 24h" deixe maior H com a imagem no card

---

Precisamos rever a aruiterura de dados
o [FEED]
precisamos que as postagens sejam "Infinite Scrolling"
carregue somente 10 postagens e ao chegar em um ponto seguro, carregue mais 10
faça que cada postagem tenha um id para nao ser exibida com duplicidade
conseguimos que seja "Lazy Loading" para melhor fluidez?
conseguimos tambem implantar "Redis" ? para melhorar o desenpenho?
uma vez que precisamos ter poucos requests

---

Em [Pessoas]
deixe a busca 75% menor e coloque as conquistas (ex: Ponte Terra-Espaço, Sentinela climático) ao lado ate acabar a linha, quando acabar a linha deixe um botão com a quantidade que tem (Ex: "+ mais 58") que devem aparecer como modal para ativar quais o usuario quer

---

no MOBILE
em [PERFIL]
em Personalização
[Modo visual], [Tema], [Paleta]
nao estão ajsutados para 100vw![alt text]
estão passando da tela
ajuste para caber

Deixe em menu suspenso personalizado
[Dark] com os temas darks
[Light] com os temas Lights

"PALETA"
seja em 2 colunas
sem ultrapassar a tela em W

---

revise somente o codigo add a ortografia em pt-br e mojibakes
faça a branch no github na main
faça o deploy no cloudflare

=========333==========================================

note/PC/ultrawide

[FEED]
ajuste para caber sem scrool em 100vh as colunas 1 e 3
somente role as postagens

tenha no banco 100 postagens para a terra
tenha no banco 100 postagens para o espaço

cada postagem deve ser relacioanada com a foto

[MAPA] esta correto

[CHATS]
ajuste para caber sem scrool em 100vh

[PESSOAS]

deixe #todas
#espaco
#terra
#lua
#marte
#clima
#cidade
#turismo

na mesma linha de "Galeria do Universo"

retire "Galeria Orbitlink"

[FOTOS]

# Decisões técnicas - Orbitlink

## 01 - Feed único

A Orbitlink não usa alternância global entre Terra e Espaço. O Orbifeed lista publicações de todos os usuários, e cada post informa o local de origem da postagem.

## 02 - Local da postagem

O campo interno `perspectiva` continua existindo como dado do post/status, mas agora representa de onde o usuário está postando: Terra ou céu.

## 03 - APIs NASA

01 - NASA EONET: eventos naturais viram marks na camada única da Orbitlink.  
02 - NASA EPIC: imagem da Terra pode enriquecer status e visualizações.  
03 - NASA Image and Video Library: imagens para galeria.

## 04 - Fallback local

O app precisa continuar funcional mesmo se APIs externas falharem, usando dados simulados e `localStorage`.

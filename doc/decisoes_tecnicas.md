# Decisoes tecnicas - Orbitlink

## 01 - Feed unico

A Orbitlink nao usa alternancia global entre Terra e Espaco. O Orbifeed lista publicacoes de todos os usuarios, e cada post informa o local de origem da postagem.

## 02 - Local da postagem

O campo interno `perspectiva` continua existindo como dado do post/status, mas agora representa de onde o usuario esta postando: Terra ou ceu.

## 03 - APIs NASA

01 - NASA EONET: eventos naturais viram marks na camada unica da Orbitlink.  
02 - NASA EPIC: imagem da Terra pode enriquecer status e visualizacoes.  
03 - NASA Image and Video Library: imagens para galeria.

## 04 - Fallback local

O app precisa continuar funcional mesmo se APIs externas falharem, usando dados simulados e `localStorage`.

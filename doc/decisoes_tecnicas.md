# Decisões técnicas — OrbitLink

## 01 - MVP com fallback

A Fase 01 usa dados simulados e localStorage para garantir funcionamento mesmo sem internet.

## 02 - APIs NASA

Foram integradas funções para:

01 - NASA EONET: eventos naturais convertidos em marks no Modo Espaço.  
02 - NASA EPIC: imagem da Terra usada no status/câmera orbital e globo.  
03 - NASA Image and Video Library: imagens para galeria.

## 03 - Tela cheia no celular

Modais, Status Orbital e DualView AR usam `100dvh` para melhor adaptação em celulares.

## 04 - Tema visual

O visual segue a referência dark/light enviada pelo usuário: grid técnico, cards arredondados, tipografia forte, azul/ciano, bordas neon e layout mobile-first.

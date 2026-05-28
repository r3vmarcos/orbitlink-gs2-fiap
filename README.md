# Orbitlink

Rede social espacial criada para a Global Solution - Indústria Espacial.

![React](https://img.shields.io/badge/React-TSX-61DAFB?style=flat-square)
![Vite](https://img.shields.io/badge/Vite-Dev-646CFF?style=flat-square)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38BDF8?style=flat-square)
![NASA](https://img.shields.io/badge/NASA-APIs-0B3D91?style=flat-square)

## Visão geral

A Orbitlink usa um feed único: todos os usuários veem publicações da Terra e do céu no mesmo Orbifeed.

A diferença acontece na postagem. Ao publicar, o usuário informa onde está:

01 - Estou na Terra.  
02 - Estou no céu.

Essa informação aparece no card da publicação como contexto social.

## Stack

01 - React  
02 - Vite  
03 - TypeScript  
04 - Tailwind CSS  
05 - React Router  
06 - Lucide React  
07 - NASA EONET, EPIC e Image Library

## Como rodar

```bash
cd orbitlink_v1
npm install
npm run dev
```

O Vite mostra o caminho local e o caminho da rede.

```txt
http://localhost:5191
http://SEU-IP:5191
```

## Banco local

A versão atual usa `localStorage`.

01 - Usuários criados ficam no navegador.  
02 - Posts criados ficam no navegador.  
03 - Status 24h ficam no navegador.  
04 - Curtidas, salvos, comentários e compartilhamentos ficam no navegador.  
05 - APIs NASA possuem fallback local/simulado.

## Fluxo

01 - Entrar ou criar cadastro local.  
02 - Abrir o Orbifeed.  
03 - Ver publicações de todos.  
04 - Criar post escolhendo se está na Terra ou no céu.  
05 - Criar Status Orbitlink 24h.  
06 - Abrir DualView AR com camada única.  
07 - Clicar em marks da Terra e do céu.  
08 - Sincronizar APIs NASA quando desejar.

## Validação

```bash
npm run build
```

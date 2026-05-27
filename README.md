# Orbitlink

Rede social espacial criada para a Global Solution - Industria Espacial.

![React](https://img.shields.io/badge/React-TSX-61DAFB?style=flat-square)
![Vite](https://img.shields.io/badge/Vite-Dev-646CFF?style=flat-square)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38BDF8?style=flat-square)
![NASA](https://img.shields.io/badge/NASA-APIs-0B3D91?style=flat-square)

## Visao geral

A Orbitlink usa um feed unico: todos os usuarios veem publicacoes da Terra e do ceu no mesmo Orbifeed.

A diferenca acontece na postagem. Ao publicar, o usuario informa onde esta:

01 - Estou na Terra.  
02 - Estou no ceu.

Essa informacao aparece no card da publicacao como contexto social.

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

A versao atual usa `localStorage`.

01 - Usuarios criados ficam no navegador.  
02 - Posts criados ficam no navegador.  
03 - Status 24h ficam no navegador.  
04 - Curtidas, salvos, comentarios e compartilhamentos ficam no navegador.  
05 - APIs NASA possuem fallback local/simulado.

## Fluxo

01 - Entrar ou criar cadastro local.  
02 - Abrir o Orbifeed.  
03 - Ver publicacoes de todos.  
04 - Criar post escolhendo se esta na Terra ou no ceu.  
05 - Criar Status Orbitlink 24h.  
06 - Abrir DualView AR com camada unica.  
07 - Clicar em marks da Terra e do ceu.  
08 - Sincronizar APIs NASA quando desejar.

## Validacao

```bash
npm run build
```

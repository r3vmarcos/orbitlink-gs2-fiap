# 🚀 OrbitLink

Rede social espacial criada para a Global Solution — Indústria Espacial.  
O projeto conecta usuários da Terra e do espaço por meio de feed, Status Orbital 24h, DualView AR simulado, perfis, missões, galeria e APIs NASA.

![React](https://img.shields.io/badge/React-TSX-61DAFB?style=flat-square)
![Vite](https://img.shields.io/badge/Vite-Dev-646CFF?style=flat-square)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38BDF8?style=flat-square)
![NASA](https://img.shields.io/badge/NASA-APIs-0B3D91?style=flat-square)

## Índice

01 - [Visão geral](#visão-geral)  
02 - [Stack](#stack)  
03 - [Como rodar](#como-rodar)  
04 - [Ambiente](#ambiente)  
05 - [Banco](#banco)  
06 - [Documentação](#documentação)  
07 - [Prints](#prints)  
08 - [Fluxo do sistema](#fluxo-do-sistema)  
09 - [Deploy](#deploy)  
10 - [Próximos passos](#próximos-passos)

## Visão geral

O OrbitLink é uma rede social espacial com dupla perspectiva:

01 - Usuário da Terra visualiza Lua, planetas, estações, satélites, colônias e posts orbitais.  
02 - Usuário do espaço visualiza países, cidades, comunidades, pontos turísticos, alertas ambientais e posts terrestres.

A Fase 01 entrega o produto final visual e funcional com dados simulados, localStorage e APIs NASA com fallback.

## Stack

01 - React  
02 - Vite  
03 - TypeScript  
04 - Tailwind CSS  
05 - React Router  
06 - Lucide React  
07 - Framer Motion  
08 - NASA EONET  
09 - NASA EPIC  
10 - NASA Image and Video Library

## Como rodar

```bash
cd orbitlink_v1
npm install
npm run dev
```

Depois acesse:

```txt
http://localhost:5191
```

## Ambiente

Copie o arquivo `.env.example` para `.env` se desejar configurar chave da NASA:

```bash
VITE_NASA_API_KEY=DEMO_KEY
```

O projeto funciona sem chave própria usando `DEMO_KEY`, mas uma chave pessoal da NASA melhora limites de uso.

## Banco

A Fase 01 não usa banco real.

01 - Posts criados pelo usuário ficam no `localStorage`.  
02 - Status Orbitais 24h ficam no `localStorage`.  
03 - Curtidas, salvos e pontos seguidos ficam no `localStorage`.  
04 - APIs NASA possuem fallback para dados simulados.

## Documentação

A pasta `doc` contém:

01 - `doc/info_project_files.md` — função dos arquivos do projeto.  
02 - `doc/decisoes_tecnicas.md` — decisões técnicas.  
03 - `doc/changelog.md` — histórico da versão.  
04 - `doc/validacao_final.md` — checklist de validação.  
05 - `doc/proximos_ajustes.md` — rascunho para próximos pedidos.

## Prints

As imagens de referência de tema estão em:

01 - `doc/referencias/tema_dark_referencia.jpg`  
02 - `doc/referencias/tema_light_referencia.jpg`

## Fluxo do sistema

01 - Entrar na Home.  
02 - Escolher Modo Terra ou Modo Espaço.  
03 - Abrir Feed.  
04 - Criar post com texto/imagem.  
05 - Criar Status Orbital 24h.  
06 - Abrir DualView AR.  
07 - Clicar em marks.  
08 - Sincronizar APIs NASA.  
09 - Ver galeria e perfis.  
10 - Consultar impacto/ODS.

## Deploy

O projeto está pronto para Cloudflare Pages, Vercel ou Netlify.

Build:

```bash
npm run build
```

Saída:

```txt
dist
```

## Próximos passos

01 - Integrar banco real com Cloudflare D1.  
02 - Login e perfis reais.  
03 - Upload real de imagens.  
04 - Astronomy Engine e CelesTrak.  
05 - Stellarium Web Engine e WebXR em fase avançada.

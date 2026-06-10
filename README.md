# OrbitLink — GS | Indústria Espacial

> Rede social espacial desenvolvida para a Global Solution FIAP — Indústria Espacial.

O **OrbitLink** é uma plataforma social interativa criada para conectar pessoas na Terra com astronautas, cientistas, missões e comunidades em contexto espacial. A proposta simula uma rede social do futuro, onde usuários podem acompanhar publicações, explorar pontos em mapa/AR, visualizar missões, acessar galeria espacial, seguir perfis, interagir com postagens e compreender como dados orbitais podem gerar impacto social e ambiental.

---

## Índice

- [Sobre o projeto](#sobre-o-projeto)
- [Objetivo acadêmico](#objetivo-acadêmico)
- [Funcionalidades](#funcionalidades)
- [Diferenciais](#diferenciais)
- [Tecnologias utilizadas](#tecnologias-utilizadas)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Como executar localmente](#como-executar-localmente)
- [Banco de dados e persistência](#banco-de-dados-e-persistência)
- [Deploy](#deploy)
- [Links da entrega](#links-da-entrega)
- [Equipe](#equipe)
- [Licença](#licença)

---

## Sobre o projeto

O espaço deixou de ser apenas um campo de exploração científica e passou a fazer parte de um novo ecossistema econômico, tecnológico e social. Satélites monitoram o clima, conectam regiões remotas, ajudam no agronegócio, apoiam ações contra desastres naturais e geram dados estratégicos para decisões globais.

Partindo desse contexto, o **OrbitLink** foi criado como uma rede social espacial: uma plataforma onde astronautas, cientistas, turistas espaciais, pesquisadores e pessoas na Terra podem compartilhar experiências, imagens, localização, missões e descobertas.

A ideia principal é projetar uma rede social para o espaço, mas também mostrar como essa mesma lógica pode ser aplicada na Terra para jornalismo cidadão, turismo de experiência, monitoramento ambiental colaborativo, educação científica e conexão entre comunidades.

---

## Objetivo acadêmico

Este projeto foi desenvolvido para a **Global Solution | Indústria Espacial — FIAP**, com o objetivo de criar um site funcional, interativo e publicado online que represente uma rede social conectando pessoas no espaço e na Terra.

A solução contempla:

- feed social com postagens;
- perfis de usuários;
- publicações com imagens e descrições;
- mapa com pontos interativos;
- experiência mobile com câmera AR simulada;
- missões espaciais;
- galeria de imagens;
- dados espaciais e ambientais simulados;
- integração preparada para APIs externas;
- banco remoto com Cloudflare D1;
- interface responsiva;
- conexão com ODS da ONU.

---

## Funcionalidades

### Rede social

- Feed principal com postagens espaciais e terrestres.
- Publicações com título, descrição, imagem, categoria e ODS relacionados.
- Curtidas, comentários, compartilhamentos e posts salvos.
- Perfis de usuários com informações, publicações e conexões.
- Sistema de seguir usuários.
- Exibição de quem o usuário está seguindo.
- Status orbital de 24 horas.
- Dados sociais salvos remotamente.

### Mapa e AR

- Mapa social com marks interativos.
- Camadas de visualização:
  - social;
  - planetas;
  - lua;
  - estações;
  - satélites;
  - missões;
  - eventos;
  - cidades;
  - turismo;
  - clima;
  - biomas;
  - ODS.
- Pelo menos 5 locais por camada.
- Marks vinculados a postagens.
- Imagens e descrições únicas para os pontos.
- Experiência mobile com câmera AR simulada.
- Visualização de planetas, estações, satélites e missões pelo celular.

### Conteúdo e dados

- Banco com usuários simulados.
- Postagens únicas por usuário.
- De 3 a 8 postagens por usuário.
- Imagens únicas por postagem.
- Títulos e descrições personalizados.
- Dados espaciais, ambientais e sociais simulados.
- Estrutura preparada para integração com APIs da NASA.

### Área de exploração

- Galeria espacial.
- Linha do tempo de missões.
- Perfis de astronautas, cientistas, turistas e comunidades.
- Loja e personalização de perfil.
- Tema claro e escuro.
- Layout responsivo para desktop e mobile.

---

## Diferenciais

O principal diferencial do OrbitLink é unir **rede social**, **dados espaciais**, **mapa interativo** e **experiência AR mobile** em uma única plataforma.

Na versão mobile, o usuário pode usar a câmera do celular em uma experiência de realidade aumentada simulada. A proposta é permitir que ele aponte para o céu e visualize elementos como planetas, estações espaciais, satélites, missões e pontos de interesse relacionados ao espaço.

Além disso, o projeto simula uma rede social funcional, com usuários seguindo outros usuários, postagens por perfil, interações, comentários, dados persistidos remotamente e marks conectados ao conteúdo.

---

## Conexão com os ODS

O OrbitLink se conecta principalmente aos seguintes Objetivos de Desenvolvimento Sustentável da ONU:

### ODS 9 — Indústria, Inovação e Infraestrutura

O projeto explora o uso de tecnologia espacial, dados orbitais, conectividade e interfaces digitais para criar uma nova forma de interação entre pessoas, ciência e infraestrutura espacial.

### ODS 11 — Cidades e Comunidades Sustentáveis

A plataforma permite imaginar aplicações para cidades inteligentes, turismo de experiência, monitoramento urbano e comunidades conectadas por dados geográficos e ambientais.

### ODS 13 — Ação contra a Mudança Global do Clima

O uso de dados satelitais e registros ambientais permite representar eventos climáticos, biomas, impactos ambientais e ações de conscientização sobre o planeta.

---

## Tecnologias utilizadas

- **React**
- **Vite**
- **TypeScript**
- **Tailwind CSS**
- **React Router**
- **Lucide React**
- **Cloudflare Pages**
- **Cloudflare Functions**
- **Cloudflare D1**
- **LocalStorage como fallback/cache**
- **APIs espaciais preparadas para integração**
- **Design responsivo mobile first**

---

## Estrutura do projeto

```txt
orbitlink/
├── functions/
│   └── api/
│       └── orbitlink.ts
├── migrations/
│   └── 0001_orbitlink_store.sql
├── public/
├── src/
│   ├── components/
│   ├── context/
│   ├── data/
│   ├── pages/
│   ├── services/
│   ├── types/
│   ├── utils/
│   ├── App.tsx
│   └── main.tsx
├── README.md
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
└── wrangler.toml
```

---

## Como executar localmente

### 1. Clonar o repositório

```bash
git clone https://github.com/r3vmarcos/orbitlink-gs2-fiap.git
```

### 2. Entrar na pasta do projeto

```bash
cd orbitlink-gs2-fiap
```

### 3. Instalar dependências

```bash
npm install
```

### 4. Rodar em modo desenvolvimento

```bash
npm run dev
```

### 5. Acessar no navegador

```txt
http://localhost:5191
```

> Caso a porta esteja ocupada, o Vite pode abrir em outra porta. Verifique o terminal após executar `npm run dev`.

---

## Build de produção

Para gerar a versão final do projeto:

```bash
npm run build
```

A pasta de saída será:

```txt
dist/
```

Para visualizar o build localmente:

```bash
npm run preview
```

---

## Banco de dados e persistência

O OrbitLink usa uma arquitetura híbrida de persistência.

### Remoto

O salvamento principal é feito via **Cloudflare D1**, usando a API:

```txt
/api/orbitlink
```

O banco remoto armazena dados como:

- usuários;
- novos usuários cadastrados;
- postagens;
- curtidas;
- comentários;
- compartilhamentos;
- posts salvos;
- usuários seguidos;
- pontos/marks seguidos;
- status orbitais;
- chats;
- mensagens;
- dados de perfil;
- dados sincronizados de APIs externas.

### Local

O `localStorage` é usado como cache e fallback. Isso permite que o projeto continue funcionando durante a navegação mesmo se o remoto estiver indisponível.

---

## Configuração Cloudflare D1

Criar banco D1:

```bash
npx wrangler d1 create orbitlink_db
```

Executar migration local:

```bash
npx wrangler d1 execute orbitlink_db --local --file=./migrations/0001_orbitlink_store.sql
```

Executar migration remota:

```bash
npx wrangler d1 execute orbitlink_db --remote --file=./migrations/0001_orbitlink_store.sql
```

O `wrangler.toml` deve conter o binding do banco:

```toml
[[d1_databases]]
binding = "DB"
database_name = "orbitlink_db"
database_id = "SEU_DATABASE_ID"
```

---

## Deploy

O projeto foi preparado para deploy em **Cloudflare Pages**.

### Build command

```bash
npm run build
```

### Output directory

```txt
dist
```

### Framework preset

```txt
Vite
```

---

## Links da entrega

### Repositório GitHub

```txt
https://github.com/r3vmarcos/orbitlink-gs2-fiap
```

---

## Equipe

| Nome | RM |
|---|---|
| Felipe Xavier Gomes dos Santos | RM568543 |
| Julia Rafaela Ribeiro Revoredo | RM567009 |
| Laura Franco Pigosso | RM562157 |
| Marcos Nunes Silva | RM567631 |
| Mariana Rodrigues Trindade da Silva | RM567137 |

---

## Critérios atendidos

- Site funcional.
- Interface responsiva.
- Rede social espacial.
- Feed com postagens.
- Perfis de usuários.
- Sistema de seguir usuários.
- Curtidas, comentários e compartilhamentos.
- Mapa com marks.
- Experiência AR mobile.
- Galeria espacial.
- Missões.
- Banco remoto com Cloudflare D1.
- Dados simulados coerentes com a proposta.
- Alinhamento com ODS.
- Design com identidade visual espacial.
- Deploy preparado para Cloudflare Pages.

---

## Melhorias futuras

- Integração completa com NASA Image and Video Library.
- Integração com dados reais de satélites.
- Autenticação real de usuários.
- Upload real de imagens.
- Notificações em tempo real.
- Chat em tempo real.
- Sistema de ranking de missões.
- Painel administrativo.
- Moderação de conteúdo.
- Banco relacional separado por entidades.
- Geolocalização real com permissões do navegador.
- AR com WebXR em dispositivos compatíveis.

---

## Licença

Projeto acadêmico desenvolvido para fins educacionais na FIAP.

---

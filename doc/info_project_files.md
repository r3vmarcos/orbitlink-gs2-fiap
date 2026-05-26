# Info Project Files — OrbitLink

## Páginas

Esta seção documenta as telas principais do sistema.

- [`src/pages/HomePage.tsx`](../src/pages/HomePage.tsx) -> página que apresenta o conceito, métricas, modos de perspectiva e entrada para o Feed/DualView; usada no início da experiência; arquivo crítico de apresentação.
- [`src/pages/FeedPage.tsx`](../src/pages/FeedPage.tsx) -> página que renderiza feed, status, filtros e criação rápida; usada no fluxo social principal; crítica para interação do usuário.
- [`src/pages/DualViewArPage.tsx`](../src/pages/DualViewArPage.tsx) -> página que abre o DualView AR com ponto inicial via query string; usada para navegação de marks.
- [`src/pages/MissoesPage.tsx`](../src/pages/MissoesPage.tsx) -> página que lista missões e linhas do tempo; usada no fluxo de exploração espacial.
- [`src/pages/GaleriaPage.tsx`](../src/pages/GaleriaPage.tsx) -> página que mostra imagens simuladas, enviadas e importadas da NASA; usada no fluxo de mídia.
- [`src/pages/PerfisPage.tsx`](../src/pages/PerfisPage.tsx) -> página que lista perfis sociais; usada para simular rede social.
- [`src/pages/ImpactoPage.tsx`](../src/pages/ImpactoPage.tsx) -> página de justificativa acadêmica, ODS e próximas fases; usada na entrega da Global Solution.
- [`src/pages/DadosNasaPage.tsx`](../src/pages/DadosNasaPage.tsx) -> painel de sincronização das APIs NASA; usado para validar EONET, EPIC e Image Library.

## Componentes

Esta seção documenta componentes reutilizáveis da interface.

- [`src/components/layout/Cabecalho.tsx`](../src/components/layout/Cabecalho.tsx) -> componente de navegação desktop, troca de perspectiva, tema e ações; usado globalmente; crítico para navegação.
- [`src/components/layout/MenuMobile.tsx`](../src/components/layout/MenuMobile.tsx) -> menu inferior mobile; usado para tela cheia no celular.
- [`src/components/layout/LayoutPrincipal.tsx`](../src/components/layout/LayoutPrincipal.tsx) -> layout global com fundo, header e menu mobile; usado por todo o app.
- [`src/components/feed/CardPost.tsx`](../src/components/feed/CardPost.tsx) -> card social de publicação; usado no feed.
- [`src/components/feed/CriarPostModal.tsx`](../src/components/feed/CriarPostModal.tsx) -> modal para criar post com texto e imagem; crítico para persistência local.
- [`src/components/feed/CriarStatusModal.tsx`](../src/components/feed/CriarStatusModal.tsx) -> modal para criar Status Orbital 24h; crítico para stories/status.
- [`src/components/feed/StatusOrbitalLista.tsx`](../src/components/feed/StatusOrbitalLista.tsx) -> lista horizontal de status; usada no Feed.
- [`src/components/feed/VisualizadorStatus.tsx`](../src/components/feed/VisualizadorStatus.tsx) -> visualizador full-screen de status; usado em mobile e desktop.
- [`src/components/ar/DualViewAr.tsx`](../src/components/ar/DualViewAr.tsx) -> cena AR simulada com marks e camadas; crítico para o diferencial do projeto.
- [`src/components/ar/CardPontoAr.tsx`](../src/components/ar/CardPontoAr.tsx) -> card de detalhes do ponto AR; usado no DualView.
- [`src/components/missoes/CardMissao.tsx`](../src/components/missoes/CardMissao.tsx) -> card de missão; usado na página de missões.
- [`src/components/galeria/CardImagemGaleria.tsx`](../src/components/galeria/CardImagemGaleria.tsx) -> card de imagem; usado na galeria.
- [`src/components/perfis/CardPerfil.tsx`](../src/components/perfis/CardPerfil.tsx) -> card de perfil; usado em Perfis.
- [`src/components/ui/Botao.tsx`](../src/components/ui/Botao.tsx) -> botão padrão do sistema; usado em todos os fluxos.
- [`src/components/ui/Badge.tsx`](../src/components/ui/Badge.tsx) -> etiqueta visual de categoria/ODS; usado em cards.
- [`src/components/ui/CardBase.tsx`](../src/components/ui/CardBase.tsx) -> card base glass/neon; usado em páginas.
- [`src/components/ui/Modal.tsx`](../src/components/ui/Modal.tsx) -> modal responsivo com tela cheia mobile; usado em posts, status e galeria.
- [`src/components/ui/AvatarOrbital.tsx`](../src/components/ui/AvatarOrbital.tsx) -> avatar visual com gradiente; usado em perfis/status/posts.

## Features

Não há pasta `features` nesta versão; os módulos estão organizados diretamente em `src/components`, `src/pages`, `src/data` e `src/services`.

## Hooks

- [`src/context/OrbitLinkContext.tsx`](../src/context/OrbitLinkContext.tsx) -> provider/hook global do app; centraliza estado, localStorage, APIs e ações sociais; crítico para funcionamento.

## Services

- [`src/services/localStorageService.ts`](../src/services/localStorageService.ts) -> serviço de leitura e gravação local; usado em posts, status, curtidas e preferências.
- [`src/services/nasaService.ts`](../src/services/nasaService.ts) -> serviço de integração com NASA EONET, EPIC e Image Library; crítico para APIs.

## Utils

- [`src/utils/formatadores.ts`](../src/utils/formatadores.ts) -> funções de formatação, tempo relativo, progresso de status e geração de ids; usado em feed/status.

## Types

- [`src/types/orbitlink.types.ts`](../src/types/orbitlink.types.ts) -> tipagens globais do app; usado por páginas, serviços e contexto.

## Assets

- [`doc/referencias/tema_dark_referencia.jpg`](referencias/tema_dark_referencia.jpg) -> referência visual dark enviada pelo usuário; usada como guia de tema.
- [`doc/referencias/tema_light_referencia.jpg`](referencias/tema_light_referencia.jpg) -> referência visual light enviada pelo usuário; usada como guia de tema.

## Configurações

- [`package.json`](../package.json) -> scripts, dependências e metadados do projeto; crítico para instalação/build.
- [`vite.config.ts`](../vite.config.ts) -> configuração do Vite e alias `@`; crítico para dev/build.
- [`tailwind.config.ts`](../tailwind.config.ts) -> configuração visual e animações Tailwind; crítico para estilo.
- [`postcss.config.js`](../postcss.config.js) -> pipeline PostCSS/Tailwind; crítico para CSS.
- [`.env.example`](../.env.example) -> exemplo de variável NASA API; usado em ambiente.
- [`.npmrc`](../.npmrc) -> configurações npm estáveis para Windows; usado na instalação.

## Scripts BAT

- [`z_menu.bat`](../z_menu.bat) -> menu rápido da raiz; usado no Windows.
- [`z_run_dev.bat`](../z_run_dev.bat) -> roda o dev server com host/porta do env; usado no Windows.
- [`z_npm_install.bat`](../z_npm_install.bat) -> instala dependências; usado no Windows.
- [`z_bat_vscode.bat`](../z_bat_vscode.bat) -> abre o projeto no VS Code.
- [`bats/Cloudflare/Opcoes_Cloudflare.bat`](../bats/Cloudflare/Opcoes_Cloudflare.bat) -> menu de build/deploy Cloudflare.

## Documentação

- [`README.md`](../README.md) -> documentação principal do projeto.
- [`AGENTS.md`](../AGENTS.md) -> regras do projeto para uso com Codex/agentes.
- [`prompts.md`](../prompts.md) -> histórico dos pedidos do projeto.
- [`doc/changelog.md`](changelog.md) -> histórico da versão.
- [`doc/decisoes_tecnicas.md`](decisoes_tecnicas.md) -> decisões técnicas.
- [`doc/proximos_ajustes.md`](proximos_ajustes.md) -> rascunho vazio para próximos ajustes.
- [`doc/validacao_final.md`](validacao_final.md) -> validação final do ZIP.

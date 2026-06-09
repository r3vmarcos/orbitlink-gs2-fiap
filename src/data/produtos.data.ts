/* === PRODUTOS FICTICIOS ORBITLINK | inicio === */
export interface ProdutoOrbitLink {
  id: string;
  nome: string;
  resumo: string;
  descricao: string;
  preco: string;
  imagem: string;
  dados: string[];
  linkLoja: string;
}

export const produtosOrbitLink: ProdutoOrbitLink[] = [
  {
    id: 'astro-x',
    nome: 'Smartphone Astro X',
    resumo: 'Camera noturna, giroscopio preciso e tela de alto brilho.',
    descricao: 'Modelo ficticio para registros de ceu urbano, trilhas de estrelas e transmissao de marks em campo.',
    preco: 'R$ 4.899,00',
    imagem: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=700&q=82',
    dados: ['Sensor noturno 64 MP', 'Tela 1800 nits', 'Bateria estimada de 36h'],
    linkLoja: 'https://loja.orbitlink.local/astro-x',
  },
  {
    id: 'nebula-90',
    nome: 'Telescopio Nebula 90',
    resumo: 'Lente compacta para observacao lunar e planetaria.',
    descricao: 'Telescopio ficticio de entrada para acompanhar Lua, Venus e passagens orbitais em areas abertas.',
    preco: 'R$ 1.290,00',
    imagem: 'https://images.unsplash.com/photo-1454789548928-9efd52dc4031?auto=format&fit=crop&w=700&q=82',
    dados: ['Abertura 90 mm', 'Tripé leve incluso', 'Ocular grande angular'],
    linkLoja: 'https://loja.orbitlink.local/nebula-90',
  },
  {
    id: 'skylock',
    nome: 'Tripe SkyLock',
    resumo: 'Estabilizacao para fotos do ceu e transmissao ao vivo.',
    descricao: 'Suporte ficticio com trava rapida para smartphone, camera compacta e pequenos sensores de campo.',
    preco: 'R$ 349,00',
    imagem: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=700&q=82',
    dados: ['Altura ate 1,65 m', 'Cabeca fluida', 'Bolsa de transporte'],
    linkLoja: 'https://loja.orbitlink.local/skylock',
  },
  {
    id: 'cosmos-12x',
    nome: 'Binoculo Cosmos 12x',
    resumo: 'Leve para constelacoes, Lua e passagens orbitais.',
    descricao: 'Binoculo ficticio para turismo espacial em terra, observacao casual e validacao visual de eventos.',
    preco: 'R$ 579,00',
    imagem: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=700&q=82',
    dados: ['Ampliação 12x', 'Corpo emborrachado', 'Peso estimado 620 g'],
    linkLoja: 'https://loja.orbitlink.local/cosmos-12x',
  },
  {
    id: 'aurora-mini',
    nome: 'Camera Aurora Mini',
    resumo: 'Sensor amplo para timelapse noturno e meteoros.',
    descricao: 'Camera ficticia para capturar sequencias longas do ceu com preset de baixa luminosidade.',
    preco: 'R$ 2.149,00',
    imagem: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=700&q=82',
    dados: ['Timelapse 4K', 'Lente 18 mm', 'Modo meteoros'],
    linkLoja: 'https://loja.orbitlink.local/aurora-mini',
  },
  {
    id: 'gaia-power',
    nome: 'Power Bank Gaia',
    resumo: 'Energia extra para noites longas de observacao.',
    descricao: 'Bateria ficticia para manter celular, camera e pequenos acessorios conectados durante expedicoes.',
    preco: 'R$ 229,00',
    imagem: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&w=700&q=82',
    dados: ['20.000 mAh', 'USB-C rapido', 'Lanterna integrada'],
    linkLoja: 'https://loja.orbitlink.local/gaia-power',
  },
];
/* === PRODUTOS FICTICIOS ORBITLINK | fim === */

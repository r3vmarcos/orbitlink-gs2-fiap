// === TIPOS DE TEMA | inicio ===
export type CategoriaTemaId =
  | "dark"
  | "light"
  | "dark-neon"
  | "light-neon"
  | "dark-cyber"
  | "light-cyber"
  | "dark-sci"
  | "light-sci"
  | "dark-editorial"
  | "light-editorial"
  | "dark-nature"
  | "light-nature"
  | "dark-luxury"
  | "light-luxury";

export type TemaVisual = {
  name: string;
  bg: string;
  text: string;
  sec: string;
  accent: string;
  border: string;
};

export type FonteVisual = {
  name: string;
  value: string;
};

export type SelecoesFonte = {
  titulo: string;
  subtitulo: string;
  corpo: string;
};

export type IdSecao = 
  | "tipografia"
  | "cards"
  | "midia"
  | "formulario"
  | "feedback"
  | "parallax"
  | "grid"
  | "universe"
  | "animacoes"
  | "fundos";

export type VisibilidadeSecoes = Record<IdSecao, boolean>;
// === TIPOS DE TEMA | fim ===

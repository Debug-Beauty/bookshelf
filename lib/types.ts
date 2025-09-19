export type ReadingStatus = "QUERO_LER" | "LENDO" | "LIDO" | "PAUSADO" | "ABANDONADO";

export interface Book {
  id: string;
  title: string;
  author: string;
  synopsis: string;
  pages: number;
  year: number;
  cover: string;
  genre: string;
  rating: number;
  status: ReadingStatus;
}



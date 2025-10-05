export const READING_STATUS = {
  QUERO_LER: "QUERO_LER",
  LENDO: "LENDO",
  LIDO: "LIDO",
  PAUSADO: "PAUSADO",
  ABANDONADO: "ABANDONADO",
} as const; 

export type ReadingStatus = (typeof READING_STATUS)[keyof typeof READING_STATUS];
export interface Book {
  id: string;
  title: string;
  author: string;
  synopsis: string;
  pages: number;
  year: number;
  cover: string;
  genre: { id: string; name: string };
  rating: number;
  status: ReadingStatus;
  currentPage?: number;
  isbn?: string;
  notes?: string;
}
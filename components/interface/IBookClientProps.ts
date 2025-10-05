// lib/interfaces/IBookClientProps.ts
import { ReadingStatus } from "@/lib/types";

export interface BookClientProps {
  initialBook: {
    id: string;
    title: string;
    author: string;
    genre: { id: string; name: string };
    year: number;          
    pages: number;          
    rating: number;         
    synopsis: string;      
    cover: string;          
    status: ReadingStatus;
    currentPage: number;
    isbn?: string;
    notes?: string;
  };
}

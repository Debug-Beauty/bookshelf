import { BookRepository } from './repositories/BookRepository';
import { Genre, Prisma, Book as PrismaBook } from './generated/prisma';
import { ReadingStatus } from './types';
import { BookClientProps } from '@/components/interface/IBookClientProps';

const bookRepo = new BookRepository();

export type BookWithGenre = PrismaBook & { genre: Genre | null };


export const getBooks = async (
  searchTerm?: string,
  genre?: string
): Promise<BookWithGenre[]> => {
  let books = await bookRepo.findAll();

  if (searchTerm) {
    books = books.filter(
      (book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  if (genre) {
    books = books.filter((book) => book.genre?.name === genre);
  }

  return books.map((b): BookWithGenre => ({
    ...b,
    synopsis: b.synopsis ?? '',          
    cover: b.cover ?? '',                 
    notes: b.notes ?? '',               
    genre: b.genre ?? { id: '', name: 'Sem gênero' }
  }));
};

export const addBook = async (newBook: Prisma.BookCreateInput): Promise<PrismaBook> => {
  return await bookRepo.create(newBook);
};

export const removeBook = async (bookId: string): Promise<void> => {
  await bookRepo.delete(bookId);
};

export const updateBookStatus = async (bookId: string, newStatus: ReadingStatus): Promise<void> => {
  await bookRepo.update(bookId, { status: newStatus });
};

export const getBookById = async (id: string): Promise<BookClientProps['initialBook'] | null> => {
  const book = await bookRepo.findById(id);
  if (!book) return null;

  return {
    id: book.id,
    title: book.title,
    author: book.author,
    genre: book.genre ?? { id: '', name: 'Sem gênero' },
    year: book.year ?? 0,
    pages: book.pages ?? 0,
    rating: book.rating ?? 0,
    synopsis: book.synopsis ?? '',
    cover: book.cover ?? '/fallback.png',
    status: book.status,
    currentPage: book.currentPage ?? 0,
    isbn: book.isbn ?? undefined,
    notes: book.notes ?? undefined,
  };
};

export const updateBook = async (updatedBook: Prisma.BookUpdateInput & { id: string }): Promise<PrismaBook> => {
  const { id, ...data } = updatedBook;
  return await bookRepo.update(id, data);
};

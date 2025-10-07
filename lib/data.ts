import { BookRepository } from './repositories/BookRepository';
import { Book as PrismaBook, Genre, Prisma } from './generated/prisma';
import { ReadingStatus } from './types';
import { BookClientProps } from '@/components/interface/IBookClientProps';
import { Book } from './types';

const bookRepo = new BookRepository();
export const getBooks = async (
  searchTerm?: string,
  genre?: string
): Promise<Book[]> => {
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

  return books.map((b) => ({
    id: b.id,
    title: b.title,
    author: b.author,
    genre: b.genre ?? { id: '', name: 'Sem gênero' },
    year: b.year ?? 0,
    pages: b.pages ?? 0,
    rating: b.rating ?? 0,
    synopsis: b.synopsis ?? '',
    cover: b.cover ?? '/fallback.png',
    status: b.status,
    currentPage: b.currentPage ?? 0,
    isbn: b.isbn ?? '',
    notes: b.notes ?? '',
  }));
};

export const addBook = async (newBook: Prisma.BookCreateInput): Promise<Book> => {
  const b = await bookRepo.create(newBook);
  return {
    id: b.id,
    title: b.title,
    author: b.author,
    genre: b.genre ?? { id: '', name: 'Sem gênero' },
    year: b.year ?? 0,
    pages: b.pages ?? 0,
    rating: b.rating ?? 0,
    synopsis: b.synopsis ?? '',
    cover: b.cover ?? '/fallback.png',
    status: b.status,
    currentPage: b.currentPage ?? 0,
    isbn: b.isbn ?? '',
    notes: b.notes ?? '',
  };
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
    isbn: book.isbn ?? '',
    notes: book.notes ?? '',
  };
};

export const updateBook = async (updatedBook: Prisma.BookUpdateInput & { id: string }): Promise<Book> => {
  const { id, ...data } = updatedBook;
  const b = await bookRepo.update(id, data);
  return {
    id: b.id,
    title: b.title,
    author: b.author,
    genre: b.genre ?? { id: '', name: 'Sem gênero' },
    year: b.year ?? 0,
    pages: b.pages ?? 0,
    rating: b.rating ?? 0,
    synopsis: b.synopsis ?? '',
    cover: b.cover ?? '/fallback.png',
    status: b.status,
    currentPage: b.currentPage ?? 0,
    isbn: b.isbn ?? '',
    notes: b.notes ?? '',
  };
};

import { BookRepository } from './repositories/BookRepository';
import { Prisma, Book } from './generated/prisma';
import { ReadingStatus } from './types';

const bookRepo = new BookRepository();

export const getBooks = async (searchTerm?: string, genre?: string): Promise<Book[]> => {
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

  return books;
};

export const addBook = async (newBook: Prisma.BookCreateInput): Promise<Book> => {
  return await bookRepo.create(newBook);
};

export const removeBook = async (bookId: string): Promise<void> => {
  await bookRepo.delete(bookId);
};

export const updateBookStatus = async (bookId: string, newStatus: ReadingStatus): Promise<void> => {
  await bookRepo.update(bookId, { status: newStatus });
};

export const getBookById = async (bookId: string): Promise<Book | null> => {
  return await bookRepo.findById(bookId);
};

export const updateBook = async (updatedBook: Prisma.BookUpdateInput & { id: string }): Promise<Book> => {
  const { id, ...data } = updatedBook;
  return await bookRepo.update(id, data);
};

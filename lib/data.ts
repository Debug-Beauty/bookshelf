import { BookRepository } from './repositories/BookRepository';
import { ReadingStatus } from './types';

const bookRepo = new BookRepository();

export const getBooks = async (searchTerm?: string, genre?: string) => {
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

export const addBook = async (newBook: any) => {
  return await bookRepo.create(newBook);
};

export const removeBook = async (bookId: string) => {
  await bookRepo.delete(bookId);
};

export const updateBookStatus = async (bookId: string, newStatus: ReadingStatus) => {
  await bookRepo.update(bookId, { status: newStatus });
};

export const getBookById = async (bookId: string) => {
  return await bookRepo.findById(bookId);
};

export const updateBook = async (updatedBook: any) => {
  return await bookRepo.update(updatedBook.id, updatedBook);
};

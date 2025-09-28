import { Book, ReadingStatus } from './types';
import fs from 'fs/promises';
import path from 'path';

const dbPath = path.join(process.cwd(), 'database.json');

const readBooksFromFile = async (): Promise<Book[]> => {
  try {
    const data = await fs.readFile(dbPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('ERRO ao ler o database.json:', error);
    return [];
  }
};

const saveBooks = async (books: Book[]) => {
  await fs.writeFile(dbPath, JSON.stringify(books, null, 2));
};

export const getBooks = async (searchTerm?: string, genre?: string): Promise<Book[]> => {
  let books = await readBooksFromFile();

  if (searchTerm) {
    books = books.filter(
      (book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  if (genre) {
    books = books.filter((book) => book.genre === genre);
  }

  return books;
};

export const addBook = async (newBook: Book): Promise<void> => {
  const books = await readBooksFromFile();
  const updatedBooks = [newBook, ...books];
  await saveBooks(updatedBooks);
};

export const removeBook = async (bookId: string): Promise<void> => {
  const books = await readBooksFromFile();
  const updatedBooks = books.filter(book => book.id !== bookId);
  await saveBooks(updatedBooks);
};

export const updateBookStatus = async (bookId: string, newStatus: ReadingStatus): Promise<void> => {
  const books = await readBooksFromFile();
  const updatedBooks = books.map(book =>
    book.id === bookId ? { ...book, status: newStatus } : book
  );
  await saveBooks(updatedBooks);
};

export const getBookById = async (bookId: string): Promise<Book | undefined> => {
  const books = await readBooksFromFile();
  return books.find(book => book.id === bookId);
};

export const updateBook = async (updatedBook: Book): Promise<void> => {
  let books = await readBooksFromFile();
  books = books.map(book => book.id === updatedBook.id ? updatedBook : book);
  await saveBooks(books);
};
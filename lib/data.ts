import { Book, ReadingStatus } from './types';
import fs from 'fs/promises';
import path from 'path';

const dbPath = path.join(process.cwd(), 'database.json');

export const getBooks = async (): Promise<Book[]> => {
  try {
    const data = await fs.readFile(dbPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

const saveBooks = async (books: Book[]) => {
  await fs.writeFile(dbPath, JSON.stringify(books, null, 2));
};

export const addBook = async (newBook: Book): Promise<void> => {
  const books = await getBooks();
  const updatedBooks = [newBook, ...books];
  await saveBooks(updatedBooks);
};

export const removeBook = async (bookId: string): Promise<void> => {
  const books = await getBooks();
  const updatedBooks = books.filter(book => book.id !== bookId);
  await saveBooks(updatedBooks);
};

export const updateBookStatus = async (bookId: string, newStatus: ReadingStatus): Promise<void> => {
  const books = await getBooks();
  const updatedBooks = books.map(book =>
    book.id === bookId ? { ...book, status: newStatus } : book
  );
  await saveBooks(updatedBooks);
};
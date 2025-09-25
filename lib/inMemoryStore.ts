import { initialBooks } from './data';
import { Book } from './types';

declare global {
  var genresStore: string[];
  var booksStore: Book[];
}

if (!global.genresStore) {
  const allInitialGenres = initialBooks.map(book => book.genre);
  global.genresStore = Array.from(new Set(allInitialGenres)).sort();
}

if (!global.booksStore) {
  global.booksStore = [...initialBooks];
}

export const genres = global.genresStore;
export const books = global.booksStore;
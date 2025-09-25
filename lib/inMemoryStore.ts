import { initialBooks } from './data';

declare global {
  var genresStore: string[];
}

if (!global.genresStore) {
  console.log('--- Inicializando o repositório de géneros PELA PRIMEIRA VEZ ---');
  const allInitialGenres = initialBooks.map(book => book.genre);
  global.genresStore = Array.from(new Set(allInitialGenres)).sort();
}

export const genres = global.genresStore;
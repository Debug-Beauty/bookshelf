import { getBooks } from '../lib/data';
import HomeDashboard from './HomeDashboard';

interface LibraryContentProps {
  search?: string;
  genre?: string;
}

export default async function LibraryContent({ search, genre }: LibraryContentProps) {
  const books = await getBooks(search, genre);

  return <HomeDashboard books={books} />;
}
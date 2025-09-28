import HomeDashboard from '@/components/HomeDashboard';
import { getBooks } from '@/lib/data';

export default async function HomePage() {
  const initialBooks = await getBooks();

  return (
    <HomeDashboard books={initialBooks} />
  );
}
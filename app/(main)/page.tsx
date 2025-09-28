import LibraryContent from '../../components/LibraryContent';

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; genre?: string }>;
}) {
  const params = await searchParams; 

  return (
    <LibraryContent
      search={params.search}
      genre={params.genre}
    />
  );
}

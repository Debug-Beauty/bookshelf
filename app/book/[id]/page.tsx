import { getBookById } from "@/lib/data";
import { notFound } from "next/navigation";
import BookDetailClient from "@/components/BookDetailClient";

export const dynamic = 'force-dynamic';

interface BookDetailPageProps {
  params: { id: string };
}

export default async function BookDetailPage({ params }: BookDetailPageProps) {
  const { id } = params;

  const book = await getBookById(id);

  if (!book) {
    notFound();
  }


  const initialBook = {
    ...book,
    genre: book.genre ?? { id: "", name: "Sem gênero" },
    year: book.year ?? 0,
    pages: book.pages ?? 0,
    rating: book.rating ?? 0,
    synopsis: book.synopsis ?? "",
    cover: book.cover ?? "/fallback.png",
    isbn: book.isbn ?? undefined,
    notes: book.notes ?? "",
  };

  return <BookDetailClient initialBook={initialBook} />;
}

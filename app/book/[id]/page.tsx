import { getBookById } from "@/lib/data";
import { notFound } from "next/navigation";
import BookDetailClient from "@/components/BookDetailClient";

export const dynamic = 'force-dynamic';

export default async function BookDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const book = await getBookById(id);

  if (!book) {
    notFound();
  }

  return <BookDetailClient initialBook={book} />;
}

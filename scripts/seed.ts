import { readFileSync } from "fs";
import path from "path";
import prisma from "../lib/prisma";

type BookJSON = {
  id: string;
  title: string;
  author: string;
  cover?: string;
  genre: string;
  status: string;
  year?: number;
  pages?: number;
  synopsis?: string;
  rating?: number;
  currentPage?: number;
  isbn?: string;
  notes?: string;
};

async function main() {
  const filePath = path.join(process.cwd(), "database.json");
  const rawData = readFileSync(filePath, "utf-8");
  const books: BookJSON[] = JSON.parse(rawData);

  const genresSet = new Set(books.map((b) => b.genre));

  console.log("Criando gêneros...");
  const genresMap = new Map<string, string>();

  for (const genreName of genresSet) {
    const genre = await prisma.genre.upsert({
      where: { name: genreName },
      update: {},
      create: { name: genreName },
    });
    genresMap.set(genreName, genre.id);
  }

  console.log("Inserindo livros...");
  for (const b of books) {
    await prisma.book.upsert({
      where: { id: b.id },
      update: {},
      create: {
        id: b.id,
        title: b.title,
        author: b.author,
        cover: b.cover,
        genreId: genresMap.get(b.genre)!,
        status: b.status as any,          
        year: b.year ?? null,
        pages: b.pages ?? null,
        synopsis: b.synopsis ?? null,
        rating: b.rating ?? null,
        currentPage: b.currentPage ?? undefined,
        isbn: b.isbn ?? null,
        notes: b.notes ?? null,
      },
    });
  }

  console.log("✅ Migração concluída com sucesso!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

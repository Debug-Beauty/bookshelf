import { Book, Prisma } from "../generated/prisma";
import prisma from "../prisma";

type BookWithGenre = Prisma.BookGetPayload<{
  include: { genre: true };
}>;

export class BookRepository {
   async findAll(): Promise<BookWithGenre[]> {
    return prisma.book.findMany({
      include: { genre: true },
      orderBy: { createdAt: "desc" },
    });
  }

  async findById(id: string): Promise<BookWithGenre | null> {
    return prisma.book.findUnique({
      where: { id },
      include: { genre: true },
    });
  }

  async create(data: Prisma.BookCreateInput): Promise<BookWithGenre> {
    return prisma.book.create({
      data,
      include: { genre: true },
    });
  }

   async update(id: string, data: Prisma.BookUpdateInput): Promise<BookWithGenre> {
    return prisma.book.update({
      where: { id },
      data,
      include: { genre: true },
    });
  }

  async delete(id: string): Promise<BookWithGenre> {
    return prisma.book.delete({
      where: { id },
      include: { genre: true },
    });
  }
}

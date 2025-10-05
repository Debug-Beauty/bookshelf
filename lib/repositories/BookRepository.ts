import { Book, Prisma } from "../generated/prisma";
import prisma from "../prisma";

export class BookRepository {
  async findAll(): Promise<Book[]> {
    return prisma.book.findMany({
      include: { genre: true },
      orderBy: { createdAt: "desc" },
    });
  }

  async findById(id: string): Promise<Book | null> {
    return prisma.book.findUnique({
      where: { id },
      include: { genre: true },
    });
  }

  async create(data: Prisma.BookCreateInput): Promise<Book> {
    return prisma.book.create({ data });
  }

  async update(id: string, data: Prisma.BookUpdateInput): Promise<Book> {
    return prisma.book.update({ where: { id }, data });
  }

  async delete(id: string): Promise<Book> {
    return prisma.book.delete({ where: { id } });
  }
}

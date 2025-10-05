import { Genre } from "../generated/prisma";
import prisma from "../prisma";

export class GenreRepository {
  async findAll(): Promise<Genre[]> {
    return prisma.genre.findMany({ orderBy: { name: "asc" } });
  }

  async findById(id: string): Promise<Genre | null> {
    return prisma.genre.findUnique({ where: { id } });
  }

  async findByName(name: string): Promise<Genre | null> {
    return prisma.genre.findUnique({ where: { name } });
  }

  async create(name: string): Promise<Genre> {
    return prisma.genre.create({ data: { name } });
  }
}

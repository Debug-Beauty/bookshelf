import { Genre } from "../generated/prisma";
import prisma from "../prisma";

export class GenreRepository {
  async findAll(): Promise<Genre[]> {
    return await prisma.genre.findMany({ orderBy: { name: "asc" } });
  }

  async findById(id: string): Promise<Genre | null> {
    return await prisma.genre.findUnique({ where: { id } });
  }

  async findByName(name: string): Promise<Genre | null> {
    return await prisma.genre.findUnique({ where: { name } });
  }

  async create(name: string): Promise<Genre> {
    return await prisma.genre.create({ data: { name } });
  }

  async delete(id:string):Promise<Genre | null>{
    return await prisma.genre.delete({where:{id}});
  }
}

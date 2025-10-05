import { GenreRepository } from "../repositories/GenreRepository";

export class GenreService{
    constructor(private readonly genreRepository = new GenreRepository()){}

    async listGenres() {
    return this.genreRepository.findAll();
  }

  async getOrCreateGenre(name: string) {
    let genre = await this.genreRepository.findByName(name);
    if (!genre) {
      genre = await this.genreRepository.create(name);
    }
    return genre;
  }
}
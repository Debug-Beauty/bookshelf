import { BookRepository } from "../repositories/BookRepository";

export class BookService{
    constructor(private readonly bookRepository = new BookRepository()){}

    async listBooks(){
        return await this.bookRepository.findAll();
    }

    async getBook(id:string){
        return await  this.bookRepository.findById(id);
    }

    async createBook(data:any){
        return await this.bookRepository.create(data);
    }

    async update(id:string,data:any){
        return await this.bookRepository.update(id,data);
    }

    async delete(id:string){
        return await this.bookRepository.delete(id);
    }
}
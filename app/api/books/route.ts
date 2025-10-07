import { NextRequest, NextResponse } from 'next/server';
import { BookRepository } from '@/lib/repositories/BookRepository';

const bookRepo = new BookRepository();

export async function GET(_request: NextRequest) {
  try {
    const books = await bookRepo.findAll();
    return NextResponse.json(books);
  } catch (error) {
    console.error('GET /books error:', error);
    return NextResponse.json({ error: 'Erro ao listar livros' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const createData: Parameters<typeof bookRepo.create>[0] = {
      id: data.id,
      title: data.title,
      author: data.author,
      genre: data.genreId,
      status: data.status,
      currentPage: data.currentPage ?? 0,
      isbn: data.isbn,
      notes: data.notes,
      year: data.year,
      pages: data.pages,
      rating: data.rating,
      synopsis: data.synopsis,
      cover: data.cover,
    };

    const newBook = await bookRepo.create(createData);
    return NextResponse.json(newBook, { status: 201 });
  } catch (error) {
    console.error('POST /books error:', error);
    return NextResponse.json({ error: 'Erro ao criar o livro' }, { status: 500 });
  }
}

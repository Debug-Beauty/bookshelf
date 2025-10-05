import { BookRepository } from '@/lib/repositories/BookRepository';
import { NextResponse } from 'next/server';

const bookRepo = new BookRepository();

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const newBook = await bookRepo.create(data);
    return NextResponse.json(newBook, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erro ao criar o livro' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const books = await bookRepo.findAll();
    return NextResponse.json(books);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erro ao listar livros' }, { status: 500 });
  }
}

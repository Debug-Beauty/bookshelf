import { NextResponse } from 'next/server';
import { books } from '@/lib/inMemoryStore';
import { Book } from '@/lib/types';

export async function GET() {
  return NextResponse.json(books);
}

export async function POST(request: Request) {
  try {
    const newBook: Book = await request.json();

    if (!newBook.title || !newBook.author) {
      return NextResponse.json({ error: 'Título e autor são obrigatórios' }, { status: 400 });
    }

    books.unshift(newBook);
    return NextResponse.json(newBook, { status: 201 });

  } catch (error) {
    return NextResponse.json({ error: 'Corpo da requisição inválido' }, { status: 400 });
  }
}
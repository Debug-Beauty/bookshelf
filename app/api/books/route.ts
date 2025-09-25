import { NextResponse } from "next/server";
import { initialBooks } from "@/lib/data";
import { Book } from '@/lib/types';

export let books: Book[]= [...initialBooks];

export async function GET(){
  return NextResponse.json(initialBooks);
}

export async function POST (request: Request) {
  try{
  const newBook = await request.json();

  if (!newBook.title || !newBook.author) {
    return NextResponse.json(
      { error: 'Titulo e autor são obrigatórios' },
      { status: 400 }
    );
  }

  books.unshift(newBook);

  return NextResponse.json(newBook,{ status: 201 });

  } catch (error) {
    return NextResponse.json(
      {error: 'Corpo da requisição inválido' },
      { status: 400 }
    );
  }
}
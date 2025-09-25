import { NextResponse } from 'next/server';
import { books } from '@/lib/inMemoryStore'; 

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const book = books.find(b => b.id === id);
  if (!book) return NextResponse.json({ error: 'Livro não encontrado' }, { status: 404 });
  return NextResponse.json(book);
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const bookIndex = books.findIndex(b => b.id === id);
  if (bookIndex === -1) return NextResponse.json({ error: 'Livro não encontrado' }, { status: 404 });
  
  const updatedBookData = await request.json();
  books[bookIndex] = { ...books[bookIndex], ...updatedBookData };
  return NextResponse.json(books[bookIndex]);
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const bookIndex = books.findIndex(b => b.id === id);
  if (bookIndex === -1) return NextResponse.json({ error: 'Livro não encontrado' }, { status: 404 });

  books.splice(bookIndex, 1);
  return NextResponse.json({ message: 'Livro removido com sucesso' });
}
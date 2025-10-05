import { BookRepository } from '@/lib/repositories/BookRepository';
import { NextResponse } from 'next/server';


const bookRepo = new BookRepository();

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  try {
    const book = await bookRepo.findById(id);
    if (!book) {
      return NextResponse.json({ error: 'Livro não encontrado' }, { status: 404 });
    }
    return NextResponse.json(book);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erro ao buscar o livro' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  try {
    const data = await request.json();
    const updatedBook = await bookRepo.update(id, data);
    return NextResponse.json(updatedBook);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erro ao atualizar o livro' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  try {
    await bookRepo.delete(id);
    return NextResponse.json({ message: 'Livro removido com sucesso' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erro ao remover o livro' }, { status: 500 });
  }
}

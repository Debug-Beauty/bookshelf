import { NextResponse } from 'next/server';
import { BookRepository } from '@/lib/repositories/BookRepository';

const bookRepo = new BookRepository();

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const book = await bookRepo.findById(id);
    if (!book) {
      return NextResponse.json({ error: 'Livro não encontrado' }, { status: 404 });
    }
    return NextResponse.json(book);
  } catch (error) {
    console.error('GET /books/[id] error:', error);
    return NextResponse.json({ error: 'Erro ao buscar o livro' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const data = await request.json();

    const updateData: Parameters<typeof bookRepo.update>[1] = {
      title: data.title,
      author: data.author,
      genre: data.genreId,
      status: data.status,
      currentPage: data.currentPage,
      isbn: data.isbn,
      notes: data.notes,
      year: data.year,
      pages: data.pages,
      rating: data.rating,
      synopsis: data.synopsis,
      cover: data.cover,
    };

    const updatedBook = await bookRepo.update(id, updateData);
    return NextResponse.json(updatedBook);
  } catch (error) {
    console.error('PUT /books/[id] error:', error);
    return NextResponse.json({ error: 'Erro ao atualizar o livro' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    await bookRepo.delete(id);
    return NextResponse.json({ message: 'Livro removido com sucesso' });
  } catch (error) {
    console.error('DELETE /books/[id] error:', error);
    return NextResponse.json({ error: 'Erro ao remover o livro' }, { status: 500 });
  }
}

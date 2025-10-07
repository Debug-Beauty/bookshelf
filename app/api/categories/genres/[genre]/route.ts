import { NextResponse } from 'next/server';
import { GenreRepository } from '@/lib/repositories/GenreRepository';

const genreRepo = new GenreRepository();

export async function DELETE(
  request: Request,
  { params }: { params: { genre: string } }
) {
  try {
    const genreToDelete = decodeURIComponent(params.genre);

    const genreIndex = await genreRepo.findById(genreToDelete);

    if (!genreIndex) {
      return NextResponse.json(
        { error: 'Gênero não encontrado.' },
        { status: 404 }
      );
    }

    await genreRepo.delete(genreIndex.id);

    return NextResponse.json({ message: `Gênero '${genreToDelete}' removido com sucesso.` });

  } catch (error) {
    return NextResponse.json(
      { error: 'Ocorreu um erro ao processar a requisição.' },
      { status: 500 }
    );
  }
}
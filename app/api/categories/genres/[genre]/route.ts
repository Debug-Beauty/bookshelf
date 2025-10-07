import { NextRequest, NextResponse } from 'next/server';
import { GenreRepository } from '@/lib/repositories/GenreRepository';

const genreRepo = new GenreRepository();

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ genre: string }> }
) {
  try {
    // 👇 aguarda a resolução da Promise
    const { genre } = await params;
    const genreToDelete = decodeURIComponent(genre);

    const genreEntity = await genreRepo.findById(genreToDelete);

    if (!genreEntity) {
      return NextResponse.json({ error: 'Gênero não encontrado.' }, { status: 404 });
    }

    await genreRepo.delete(genreEntity.id);

    return NextResponse.json({ message: `Gênero '${genreToDelete}' removido com sucesso.` });
  } catch (error) {
    console.error('DELETE /categories/genres/[genre] error:', error);
    return NextResponse.json(
      { error: 'Ocorreu um erro ao processar a requisição.' },
      { status: 500 }
    );
  }
}

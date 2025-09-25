import { NextResponse } from 'next/server';
import { genres } from '@/lib/inMemoryStore'; 

export async function DELETE(
  request: Request,
  { params }: { params: { genre: string } }
) {
  try {
    const genreToDelete = decodeURIComponent(params.genre);

    const genreIndex = genres.findIndex(
      (g) => g.toLowerCase() === genreToDelete.toLowerCase()
    );

    if (genreIndex === -1) {
      return NextResponse.json(
        { error: 'Gênero não encontrado.' },
        { status: 404 }
      );
    }

    genres.splice(genreIndex, 1);

    return NextResponse.json({ message: `Gênero '${genreToDelete}' removido com sucesso.` });

  } catch (error) {
    return NextResponse.json(
      { error: 'Ocorreu um erro ao processar a requisição.' },
      { status: 500 }
    );
  }
}
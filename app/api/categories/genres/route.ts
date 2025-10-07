import { NextResponse } from 'next/server';
import { GenreRepository } from '@/lib/repositories/GenreRepository';

const genreRepo = new GenreRepository();

export async function POST(request: Request) {
  try {
    const { genre } = await request.json();

    if (!genre || typeof genre !== 'string') {
      return NextResponse.json({ error: 'O nome do género é obrigatório.' }, { status: 400 });
    }

    const genreExist = await genreRepo.findByName(genre);

    if (genreExist?.name || genreExist?.name.toLowerCase()) {
      return NextResponse.json({ error: 'Este género já existe.' }, { status: 409 });
    }

    await genreRepo.create(genre);

    return NextResponse.json({ message: 'Gênero adicionado com sucesso', genre }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Corpo da requisição inválido' }, { status: 400 });
  }
}
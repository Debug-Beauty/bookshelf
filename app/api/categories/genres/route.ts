import { NextResponse } from 'next/server';
import { genres } from '@/lib/inMemoryStore'; 

export async function POST(request: Request) {
  try {
    const { genre } = await request.json();

    if (!genre || typeof genre !== 'string') {
      return NextResponse.json({ error: 'O nome do género é obrigatório.' }, { status: 400 });
    }

    if (genres.some(g => g.toLowerCase() === genre.toLowerCase())) {
      return NextResponse.json({ error: 'Este género já existe.' }, { status: 409 });
    }

    genres.push(genre);
    genres.sort();

    return NextResponse.json({ message: 'Gênero adicionado com sucesso', genre }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Corpo da requisição inválido' }, { status: 400 });
  }
}
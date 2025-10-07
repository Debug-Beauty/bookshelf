import { NextResponse } from 'next/server';
import { GenreRepository } from '@/lib/repositories/GenreRepository';

const genreRepo = new GenreRepository();

export async function GET() {
  const genres = await genreRepo.findAll();
  return NextResponse.json(genres);
}
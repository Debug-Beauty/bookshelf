import { NextResponse } from 'next/server';
import { genres } from '@/lib/inMemoryStore'; 

export async function GET() {
  return NextResponse.json(genres);
}
"use server";

import { revalidatePath } from 'next/cache';
import prisma from "../lib/prisma";
import { ReadingStatus } from '@/lib/types';

export async function addBookAction(formData: FormData) {
    const title = formData.get('title') as string;
    const author = formData.get('author') as string;

    if (!title || !author) {
        console.error("Título e Autor são obrigatórios.");       
        return { error: "Título e Autor são obrigatórios." };
    }

    const genreName = formData.get('genre') as string || "Não especificado";

    await prisma.book.create({
        data: {
            title,
            author,
            cover: formData.get('coverUrl') as string || "/fallback.png",
            genre: {
                connectOrCreate: {
                    where: { name: genreName },
                    create: { name: genreName }
                }
            },
            status: (formData.get('status') as ReadingStatus) || "QUERO_LER",
            year: Number(formData.get('year')) || null,
            pages: Number(formData.get('pages')) || null,
            synopsis: formData.get('synopsis') as string || null,
            rating: Number(formData.get('rating')) || 0,
            currentPage: Number(formData.get('currentPage')) || 0,
            isbn: formData.get('isbn') as string || null,
            notes: formData.get('notes') as string || null,
        }
    });

    revalidatePath('/'); 
}

export async function removeBookAction(id: string) {
  await prisma.book.delete({
    where: { id },
  });
  revalidatePath('/');
}

export async function updateBookStatusAction(id: string, newStatus: ReadingStatus) {
  await prisma.book.update({
    where: { id },
    data: { status: newStatus },
  });
  revalidatePath('/');
  revalidatePath(`/book/${id}`);
}

export async function updateBookAction(id: string, formData: FormData) {
  const title = formData.get('title') as string;
  const author = formData.get('author') as string;
  const coverUrl = formData.get('coverUrl') as string;
  const genreName = formData.get('genre') as string || "Não especificado";

  if (!title || !author) {
    console.error("Título e Autor são obrigatórios.");
    return { error: "Título e Autor são obrigatórios." };
  }

  const dataToUpdate: any = {
    title,
    author,
    genre: {
      connectOrCreate: {
        where: { name: genreName },
        create: { name: genreName },
      },
    },
    status: (formData.get('status') as ReadingStatus) || "QUERO_LER",
    year: Number(formData.get('year')) || null,
    pages: Number(formData.get('pages')) || null,
    synopsis: formData.get('synopsis') as string || null,
    currentPage: Number(formData.get('currentPage')) || 0,
    isbn: formData.get('isbn') as string || null,
    notes: formData.get('notes') as string || null,
  };

  if (coverUrl) {
    dataToUpdate.cover = coverUrl;
  }

  await prisma.book.update({
    where: { id },
    data: dataToUpdate,
  });

  revalidatePath('/');
  revalidatePath(`/book/${id}`);
}

export async function updateBookRatingAction(bookId: string, newRating: number) {
  try {
    await prisma.book.update({
      where: { id: bookId },
      data: { rating: newRating },
    });
    revalidatePath('/');
    revalidatePath(`/book/${bookId}`);
  } catch (error) {
    console.error("Falha ao atualizar a avaliação:", error);
    return { error: "Não foi possível atualizar a avaliação." };
  }
}
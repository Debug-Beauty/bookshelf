"use server";

import { revalidatePath } from 'next/cache';
import { addBook, removeBook, updateBook, updateBookStatus, getBookById } from '../lib/data';
import { Book, ReadingStatus } from '../lib/types';
import prisma from "../lib/prisma";

export async function addBookAction(formData: FormData) {
    const title = formData.get('title') as string;
    const author = formData.get('author') as string;

    if (!title || !author) {
        console.error("Título e Autor são obrigatórios.");       
        return;
    }

    const newBook = await prisma.book.create({
        data: {
            title,
            author,
            cover: formData.get('coverUrl') as string || "/fallback.png",
            genre: {
                connectOrCreate: {
                    where: { name: formData.get('genre') as string || "Não especificado" },
                    create: { name: formData.get('genre') as string || "Não especificado" }
                }
            },
            status: (formData.get('status') as ReadingStatus) || "QUERO_LER",
            year: Number(formData.get('year')) || null,
            pages: Number(formData.get('pages')) || null,
            synopsis: formData.get('synopsis') as string || "Nenhuma sinopse adicionada.",
            rating: 0,
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
    data: {
      status: newStatus,
      updatedAt: new Date(),
    },
  });

  revalidatePath('/');
  revalidatePath(`/book/${id}`);
}


export async function getBookByIdAction(id: string) {
  return prisma.book.findUnique({
    where: { id },
    include: { genre: true },
  });
}


export async function updateBookAction(id: string, formData: FormData) {
  const title = formData.get('title') as string;
  const author = formData.get('author') as string;

  if (!title || !author) {
    console.error("Título e Autor são obrigatórios.");
    return;
  }

  await prisma.book.update({
    where: { id },
    data: {
      title,
      author,
      cover: formData.get('coverUrl') as string || "/fallback.png",
      genre: {
        connectOrCreate: {
          where: { name: formData.get('genre') as string || "Não especificado" },
          create: { name: formData.get('genre') as string || "Não especificado" }
        }
      },
      status: (formData.get('status') as ReadingStatus) || "QUERO_LER",
      year: Number(formData.get('year')) || null,
      pages: Number(formData.get('pages')) || null,
      synopsis: formData.get('synopsis') as string || "Nenhuma sinopse adicionada.",
      currentPage: Number(formData.get('currentPage')) || 0,
      isbn: formData.get('isbn') as string || null,
      notes: formData.get('notes') as string || null,
      updatedAt: new Date(),
    },
  });

  revalidatePath('/');
  revalidatePath(`/book/${id}`);
}
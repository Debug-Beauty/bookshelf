"use server";

import { revalidatePath } from 'next/cache';
import { addBook, removeBook, updateBookStatus } from '@/lib/data';
import { Book, ReadingStatus } from '../lib/types';

export async function addBookAction(formData: FormData) {
    const title = formData.get('title') as string;
    const author = formData.get('author') as string;

    if (!title || !author) {
        console.error("Título e Autor são obrigatórios.");       
        return;
    }

    const newBook: Book = {
        id: crypto.randomUUID(),
        title,
        author,
        cover: formData.get('coverUrl') as string || "/fallback.png",
        genre: formData.get('genre') as string || "Não especificado",
        status: formData.get('status') as ReadingStatus || "QUERO_LER",       
        year: Number(formData.get('year')) || 0,
        pages: Number(formData.get('pages')) || 0,
        synopsis: formData.get('synopsis') as string || "Nenhuma sinopse adicionada.",
        rating: 0,
    };

    await addBook(newBook);
    revalidatePath('/'); 
}

export async function removeBookAction(bookId: string) {
    await removeBook(bookId);
    revalidatePath('/');
}

export async function updateBookStatusAction(bookId: string, newStatus: ReadingStatus) {
    await updateBookStatus(bookId, newStatus);
    revalidatePath('/');
}
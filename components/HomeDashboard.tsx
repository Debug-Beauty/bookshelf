"use client";

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import ReadingGoal from './ReadingGoal';
import MyLibrary from './MyLibrary';
import DashboardStats from './DashboardStats';
import AddBookModal from './AddBookModal';
import { SelectBookModal } from './SelectBookModal';
import { Button } from './ui/button';
import { Book, ReadingStatus, READING_STATUS } from '../lib/types';
import { toast } from "sonner";
import { removeBookAction, updateBookStatusAction, updateBookAction } from '@/app/actions';

export default function HomeDashboard({ books: initialBooks }: { books: Book[] }) {
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [isAddBookModalOpen, setIsAddBookModalOpen] = useState(false);
  const [isSelectBookModalOpen, setIsSelectBookModalOpen] = useState(false);  

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setBooks(initialBooks);
  }, [initialBooks]);

  const searchTerm = searchParams.get('search') || "";
  const selectedGenre = searchParams.get('genre') || "";

  const handleFilterChange = (key: 'search' | 'genre', value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleRemoveFromLibrary = async (bookId: string) => {
    await removeBookAction(bookId);
    setBooks(prevBooks => prevBooks.filter(book => book.id !== bookId));
    toast.info("Livro removido.");
  };

  const handleUpdateBookStatus = async (bookId: string, newStatus: ReadingStatus) => {
    await updateBookStatusAction(bookId, newStatus);
    setBooks(prevBooks => prevBooks.map(book => book.id === bookId ? { ...book, status: newStatus } : book));
    toast.success("Status atualizado!");
  };

  const handleBookUpdate = async (updatedBook: Book) => {
    const formData = new FormData();
    Object.entries(updatedBook).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        if (key === 'genre' && typeof value === 'object' && value.name) {
          formData.append('genre', value.name);
        } else {
          formData.append(key, String(value));
        }
      }
    });
    formData.append('coverUrl', updatedBook.cover);

    await updateBookAction(updatedBook.id, formData);
    setBooks(prevBooks => prevBooks.map(book => book.id === updatedBook.id ? updatedBook : book));
    toast.success("Livro atualizado com sucesso!");
  };
  
  const handleSelectBookToRead = (bookId: string) => {
    handleUpdateBookStatus(bookId, READING_STATUS.LENDO);
    setIsSelectBookModalOpen(false);
  };

  const allGenres = useMemo(() => {
    const genres = new Set(
        books
            .map((book) => book.genre?.name)
            .filter((genreName): genreName is string => !!genreName)
    );
    return Array.from(genres).sort();
  }, [books]);

  const booksToSelect = books.filter(book => book.status === READING_STATUS.QUERO_LER);
  
  const filteredBooks = books.filter(book =>
    (book.title.toLowerCase().includes(searchTerm.toLowerCase()) || book.author.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedGenre === "" || book.genre?.name === selectedGenre)
  );

  return (
    <>
      <div className="container mx-auto px-6 py-8">
        <AddBookModal isOpen={isAddBookModalOpen} onOpenChange={setIsAddBookModalOpen} />
        <SelectBookModal 
          isOpen={isSelectBookModalOpen} 
          onOpenChange={setIsSelectBookModalOpen} 
          booksToSelect={booksToSelect} 
          onBookSelect={handleSelectBookToRead} 
        />
        <DashboardStats library={books} /> 
        <ReadingGoal library={books} onAddBookClick={() => setIsSelectBookModalOpen(true)} onUpdateBookStatus={handleUpdateBookStatus} />

        <div className="flex justify-end mb-4">
          <Button onClick={() => setIsAddBookModalOpen(true)}>Adicionar Novo Livro</Button>
        </div>        
    
        <MyLibrary
          library={filteredBooks}
          allGenres={allGenres}
          onRemoveFromLibrary={handleRemoveFromLibrary}
          onUpdateBookStatus={handleUpdateBookStatus}
          onBookUpdate={handleBookUpdate}          
          searchTerm={searchTerm}
          selectedGenre={selectedGenre}
          onFilterChange={handleFilterChange}
        />
      </div>
    </>
  );
};
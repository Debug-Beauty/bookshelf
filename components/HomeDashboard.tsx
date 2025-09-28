"use client";

import { useState } from 'react';
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

export default function HomeDashboard({ books }: { books: Book[] }) {
  const [isAddBookModalOpen, setIsAddBookModalOpen] = useState(false);
  const [isSelectBookModalOpen, setIsSelectBookModalOpen] = useState(false);  

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const searchTerm = searchParams.get('search') || "";
  const selectedGenre = searchParams.get('genre') || "";

  const handleFilterChange = (key: 'search' | 'genre', value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.replace(`${pathname}?${params.toString()}`);
  };

  const handleRemoveFromLibrary = async (bookId: string) => {
    await removeBookAction(bookId);
    toast.info("Livro removido.");
  };

  const handleUpdateBookStatus = async (bookId: string, newStatus: ReadingStatus) => {
    await updateBookStatusAction(bookId, newStatus);
    toast.success("Status atualizado!");
  };

  const handleBookUpdate = async (updatedBook: Book) => {
    await updateBookAction(updatedBook);
    toast.success("Livro atualizado com sucesso!");
  };

  const handleSelectBookToRead = (bookId: string) => {
    handleUpdateBookStatus(bookId, READING_STATUS.LENDO);
    setIsSelectBookModalOpen(false);
  };

  const booksToSelect = books.filter(book => book.status === READING_STATUS.QUERO_LER);

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
          library={books}
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
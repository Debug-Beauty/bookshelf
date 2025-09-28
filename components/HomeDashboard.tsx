"use client";

import { useState } from 'react';
import ReadingGoal from './ReadingGoal';
import MyLibrary from './MyLibrary';
import DashboardStats from './DashboardStats';
import AddBookModal from './AddBookModal';
import { SelectBookModal } from './SelectBookModal';
import { Button } from './ui/button';
import { Book, ReadingStatus, READING_STATUS } from '../lib/types';
import { toast } from "sonner";
import { removeBookAction, updateBookStatusAction } from '@/app/actions';

export default function HomeDashboard({ initialBooks }: { initialBooks: Book[] }) {
  const [myLibrary, setMyLibrary] = useState<Book[]>(initialBooks);
  const [isAddBookModalOpen, setIsAddBookModalOpen] = useState(false);
  const [isSelectBookModalOpen, setIsSelectBookModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");

  const handleRemoveFromLibrary = async (bookId: string) => {
    await removeBookAction(bookId);
    toast.info("Livro removido.");
  };

  const handleUpdateBookStatus = async (bookId: string, newStatus: ReadingStatus) => {
    await updateBookStatusAction(bookId, newStatus);
    toast.success("Status atualizado!");
  };

  const handleSelectBookToRead = (bookId: string) => {
    handleUpdateBookStatus(bookId, READING_STATUS.LENDO);
    setIsSelectBookModalOpen(false);
  };

  const booksToSelect = myLibrary.filter(book => book.status === READING_STATUS.QUERO_LER);

  return (
    <>
      <div className="container mx-auto px-6 py-8">
        <AddBookModal isOpen={isAddBookModalOpen} onOpenChange={setIsAddBookModalOpen} />
        
        <SelectBookModal isOpen={isSelectBookModalOpen} onOpenChange={setIsSelectBookModalOpen} booksToSelect={booksToSelect} onBookSelect={handleSelectBookToRead} />
        
        <DashboardStats library={myLibrary} /> 
        <ReadingGoal library={myLibrary} onAddBookClick={() => setIsSelectBookModalOpen(true)} onUpdateBookStatus={handleUpdateBookStatus} />

        <div className="flex justify-end mb-4">
          <Button onClick={() => setIsAddBookModalOpen(true)}>Adicionar Novo Livro</Button>
        </div>
        
        <MyLibrary
          library={myLibrary}
          onRemoveFromLibrary={handleRemoveFromLibrary}
          onUpdateBookStatus={handleUpdateBookStatus}
          onBookUpdate={() => {}}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedGenre={selectedGenre}
          setSelectedGenre={setSelectedGenre}
        />
      </div>
    </>
  );
};
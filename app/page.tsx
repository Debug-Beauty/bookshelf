"use client";

import { useState } from 'react';
import ReadingGoal from './components/ReadingGoal';
import MyLibrary from './components/MyLibrary';
import DashboardStats from './components/DashboardStats';
import AddBookModal from './components/AddBookModal';
import { SelectBookModal } from './components/SelectBookModal';
import { Button } from '../components/ui/button';
import { Book, ReadingStatus, READING_STATUS } from '../lib/types';
import { initialBooks } from '../lib/data';
import useLocalStorageState from '../hooks/useLocalStorageState';

const HomePage = () => {
  const [myLibrary, setMyLibrary] = useLocalStorageState<Book[]>('myBookLibrary', initialBooks);
  const [isAddBookModalOpen, setIsAddBookModalOpen] = useState(false);
  const [isSelectBookModalOpen, setIsSelectBookModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");

  const handleAddBook = (newBook: Book) => {
    setMyLibrary(prevLibrary => [newBook, ...prevLibrary]);
    setSearchTerm("");
    setSelectedGenre("");
  };

  const handleRemoveFromLibrary = (bookId: string) => {
    setMyLibrary(prevLibrary => prevLibrary.filter(book => book.id !== bookId));
  };

  const handleUpdateBookStatus = (bookId: string, newStatus: ReadingStatus) => {
    setMyLibrary(prevLibrary =>
      prevLibrary.map(book =>
        book.id === bookId ? { ...book, status: newStatus } : book
      )
    );
  };

  const handleSelectBookToRead = (bookId: string) => {
    handleUpdateBookStatus(bookId, READING_STATUS.LENDO);
    setIsSelectBookModalOpen(false);
  };

  const booksToSelect = myLibrary.filter(book => book.status === READING_STATUS.QUERO_LER);

  return (
    <div className="container mx-auto px-6 py-8">
      <AddBookModal 
        isOpen={isAddBookModalOpen}
        onOpenChange={setIsAddBookModalOpen}
        onBookAdd={handleAddBook}
      />
      
      <SelectBookModal
        isOpen={isSelectBookModalOpen}
        onOpenChange={setIsSelectBookModalOpen}
        booksToSelect={booksToSelect}
        onBookSelect={handleSelectBookToRead}
      />

      <DashboardStats library={myLibrary} />
      
      <ReadingGoal 
        library={myLibrary} 
        onAddBookClick={() => setIsSelectBookModalOpen(true)}
        onUpdateBookStatus={handleUpdateBookStatus}
      />

      <div className="flex justify-end mb-4">
        <Button onClick={() => setIsAddBookModalOpen(true)}>
          Adicionar Novo Livro
        </Button>
      </div>
      
      <MyLibrary
        library={myLibrary}
        onRemoveFromLibrary={handleRemoveFromLibrary}
        onUpdateBookStatus={handleUpdateBookStatus}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
      />
    </div>
  );
};

export default HomePage;
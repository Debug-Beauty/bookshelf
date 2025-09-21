"use client";

import { useState, useEffect } from 'react';
import ReadingGoal from './components/ReadingGoal';
import MyLibrary from './components/MyLibrary';
import DashboardStats from './components/DashboardStats';
import AddBookModal from './components/AddBookModal';
import { Button } from '../components/ui/button';
import { Book } from '../lib/types';
import { initialBooks } from '../lib/data';

const HomePage = () => {
  const [myLibrary, setMyLibrary] = useState<Book[]>([]);
  const [isAddBookModalOpen, setIsAddBookModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");

  useEffect(() => {
    const savedLibrary = localStorage.getItem('myBookLibrary');
    if (savedLibrary && savedLibrary !== 'undefined') {
        try {
            const parsedLibrary = JSON.parse(savedLibrary);
            if (Array.isArray(parsedLibrary) && parsedLibrary.length > 0) {
                setMyLibrary(parsedLibrary);
                return;
            }
        } catch (error) {
            console.error("Falha ao carregar a biblioteca.", error);
            setMyLibrary(initialBooks);
        }
    } else {
        setMyLibrary(initialBooks);
    }
  }, []);

  useEffect(() => {
    try {
      if (myLibrary.length > 0) {
        localStorage.setItem('myBookLibrary', JSON.stringify(myLibrary));
      }
    } catch (error) {
      console.error("Não foi possível salvar a biblioteca no localStorage", error);
    }
  }, [myLibrary]);

  const handleAddBook = (newBook: Book) => {
    setMyLibrary(prevLibrary => [newBook, ...prevLibrary]);
    setSearchTerm("");
    setSelectedGenre("");
  };

  const handleRemoveFromLibrary = (bookId: string) => {
    setMyLibrary(prevLibrary => prevLibrary.filter(book => book.id !== bookId));
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <AddBookModal 
        isOpen={isAddBookModalOpen}
        onOpenChange={setIsAddBookModalOpen}
        onBookAdd={handleAddBook}
      />
      <DashboardStats library={myLibrary} />
      <ReadingGoal library={myLibrary} />
      <div className="flex justify-end mb-4">
        <Button onClick={() => setIsAddBookModalOpen(true)}>
          Adicionar Novo Livro
        </Button>
      </div>
      <MyLibrary
        library={myLibrary}
        onRemoveFromLibrary={handleRemoveFromLibrary}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
      />
    </div>
  );
};

export default HomePage;
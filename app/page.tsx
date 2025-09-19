"use client";

import { useState, useEffect } from 'react';
import BookCard from './components/BookCard';
import ReadingGoal from './components/ReadingGoal';
import MyLibrary from './components/MyLibrary';
import DashboardStats from './components/DashboardStats';
import { Book, ReadingStatus } from '@/lib/types';
import { initialBooks } from '@/lib/data';

const HomePage = () => {
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [myLibrary, setMyLibrary] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    try {
     
      localStorage.removeItem('myBookLibrary');

      const savedLibrary = localStorage.getItem('myBookLibrary');
      if (savedLibrary && savedLibrary !== 'undefined') {
        const parsedLibrary = JSON.parse(savedLibrary);
        if (Array.isArray(parsedLibrary) && parsedLibrary.length > 0) {
          setMyLibrary(parsedLibrary);
          return;
        }
      }
      setMyLibrary(initialBooks);
    } catch (error) {
      console.error("Não foi possível carregar a biblioteca do localStorage", error);
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

  const handleSearch = async (query: string) => {
    if (!query) {
      setSearchResults([]);
      return;
    }
    setIsLoading(true);
    setSearchResults([]);
    try {
      const response = await fetch(`/api/books?query=${encodeURIComponent(query)}`);
      if (!response.ok) throw new Error('Falha na busca');
      const data: Book[] = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Erro na busca:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const addToLibrary = (bookToAdd: Book, status: ReadingStatus) => {
    if (myLibrary.some(book => book.id === bookToAdd.id)) {
      alert("Este livro já está na sua biblioteca!");
      return;
    }
    const newLibraryBook: Book = { ...bookToAdd, status };
    setMyLibrary(prevLibrary => [...prevLibrary, newLibraryBook]);
    alert(`"${bookToAdd.title}" adicionado à sua biblioteca!`);
    setSearchResults([]);
  };

  const handleRemoveFromLibrary = (bookId: string) => {
    setMyLibrary(prevLibrary => prevLibrary.filter(book => book.id !== bookId));
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <DashboardStats library={myLibrary} />
      <ReadingGoal library={myLibrary} />

      {searchResults.length > 0 && (
        <div className="mt-8">
          <h2 className="text-3xl font-bold text-foreground my-6">Resultados da Busca</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {searchResults.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                isInLibrary={false}               
              />
            ))}
          </div>
        </div>
      )}

      <MyLibrary
        library={myLibrary}
        onRemoveFromLibrary={handleRemoveFromLibrary}
      />
    </div>
  );
};

export default HomePage;
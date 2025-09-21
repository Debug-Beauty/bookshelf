// app/book/[id]/page.tsx
"use client";

import { useState, useEffect } from 'react';
// 1. Importar useParams
import { useParams, useRouter } from 'next/navigation';
import { Book, ReadingStatus } from '@/lib/types';
import { initialBooks } from '@/lib/data';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Edit } from 'lucide-react';
import EditBookModal from '@/components/EditBookModal';
import useLocalStorageState from '@/hooks/useLocalStorageState';

const LOCAL_FALLBACK_SRC = '/fallback.png';

const BookDetailPage = () => { // 2. Remover 'params' das props
  const router = useRouter();
  const params = useParams(); // 3. Usar o hook para obter os parâmetros
  const [myLibrary, setMyLibrary] = useLocalStorageState<Book[]>('myBookLibrary', initialBooks);
  const [book, setBook] = useState<Book | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    // 4. Acessar o id diretamente do objeto 'params' do hook
    const bookId = Array.isArray(params.id) ? params.id[0] : params.id;
    const foundBook = myLibrary.find(b => b.id === bookId);
    if (foundBook) {
      setBook(foundBook);
    }
  }, [params.id, myLibrary]);

  const handleBookUpdate = (updatedBook: Book) => {
    setMyLibrary(prevLibrary => 
        prevLibrary.map(b => (b.id === updatedBook.id ? updatedBook : b))
    );
  };

  if (!book) {
    return (
      <div className="container mx-auto px-6 py-8 text-center">
        <h1 className="text-2xl font-bold text-destructive">Carregando livro...</h1>
        <p className="text-muted-foreground">Se o livro não for encontrado, ele pode ter sido removido.</p>
        <Link href="/" passHref>
            <Button variant="outline" className="mt-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar para a Biblioteca
            </Button>
        </Link>
      </div>
    );
  }
  
  const renderStars = () => {
      let stars = [];
      for (let i = 1; i <= 5; i++) {
          stars.push(
              <span key={i} className={i <= book.rating ? 'text-yellow-400' : 'text-gray-300'}>★</span>
          );
      }
      return stars;
  };

  return (
    <>
      <EditBookModal 
        isOpen={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        bookToEdit={book}
        onBookUpdate={handleBookUpdate}
      />
      <div className="container mx-auto px-6 py-8">
          <div className="mb-6 flex justify-between items-center">
              <Link href="/" passHref>
                  <Button variant="outline">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Voltar
                  </Button>
              </Link>
              <Button onClick={() => setIsEditModalOpen(true)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Editar Livro
              </Button>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-1">
                  <div className="relative w-full h-[450px] shadow-lg rounded-lg overflow-hidden">
                      <Image 
                          src={book.cover} 
                          alt={`Capa de ${book.title}`} 
                          fill
                          style={{ objectFit: 'cover' }}
                          className="rounded-lg"
                          onError={(e) => { (e.target as HTMLImageElement).src = LOCAL_FALLBACK_SRC; }}
                      />
                  </div>
              </div>
              <div className="md:col-span-2">
                  <h1 className="text-4xl font-bold text-primary mb-2">{book.title}</h1>
                  <h2 className="text-xl text-muted-foreground mb-4">{book.author} ({book.year})</h2>
                  <div className="flex items-center gap-4 mb-4">
                      <Badge>{book.genre}</Badge>
                      <div className="flex items-center">{renderStars()}</div>
                  </div>
                  <div>
                      <h3 className="text-2xl font-semibold text-primary mt-6 mb-2">Sinopse</h3>
                      <p className="text-base text-foreground/80 leading-relaxed">{book.synopsis || "Sinopse não disponível."}</p>
                  </div>
              </div>
          </div>
      </div>
    </>
  );
};

export default BookDetailPage;
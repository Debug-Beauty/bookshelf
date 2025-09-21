"use client";

import { useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Input } from "../components/ui/input";
import { Book, ReadingStatus, READING_STATUS } from "../lib/types";
import BookCard from "./BookCard";

interface MyLibraryProps {
    library: Book[];
    onRemoveFromLibrary: (bookId: string) => void;
    onUpdateBookStatus: (bookId: string, newStatus: ReadingStatus) => void;
    onBookUpdate: (updatedBook: Book) => void; // 1. Adicionar a nova prop aqui
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    selectedGenre: string;
    setSelectedGenre: (genre: string) => void;
}

const BookGrid = ({ books, onRemoveFromLibrary, onUpdateBookStatus, onBookUpdate }: { 
    books: Book[], 
    onRemoveFromLibrary: (bookId: string) => void,
    onUpdateBookStatus: (bookId: string, newStatus: ReadingStatus) => void,
    onBookUpdate: (updatedBook: Book) => void; // 2. E aqui também
}) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6">
        {books.map(book => (
            <BookCard
                key={book.id}
                book={book}
                onRemoveFromLibrary={onRemoveFromLibrary}
                onUpdateBookStatus={onUpdateBookStatus}
                onBookUpdate={onBookUpdate} // 3. Passar a prop para o BookCard
            />
        ))}
    </div>
);

const MyLibrary = ({ 
    library, 
    onRemoveFromLibrary, 
    onUpdateBookStatus,
    onBookUpdate, // 4. Receber a prop aqui
    searchTerm, 
    setSearchTerm, 
    selectedGenre, 
    setSelectedGenre 
}: MyLibraryProps) => {

    const availableGenres = useMemo(() => {
        const genres = new Set(library.map(book => book.genre));
        return Array.from(genres).sort();
    }, [library]);

    const filteredBooks = useMemo(() => {
        return library.filter(book => {
            const matchesSearchTerm = 
                book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                book.author.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesGenre = selectedGenre ? book.genre === selectedGenre : true;
            return matchesSearchTerm && matchesGenre;
        });
    }, [library, searchTerm, selectedGenre]);

    const statusOrder: ReadingStatus[] = [
        READING_STATUS.LENDO,
        READING_STATUS.QUERO_LER,
        READING_STATUS.LIDO,
        READING_STATUS.PAUSADO,
        READING_STATUS.ABANDONADO
    ];
    const allTabs: Array<"TODOS" | ReadingStatus> = ["TODOS", ...statusOrder];

    const formatTabTitle = (tab: (typeof allTabs)[number]) => {
        if (tab === "TODOS") return "Todos";
        return tab.charAt(0) + tab.slice(1).toLowerCase().replace('_', ' ');
    };

    return (
        <div className="mt-12">
            <h2 className="text-3xl font-bold text-primary mb-6">Minha Biblioteca</h2>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Input type="text" placeholder="Buscar por título ou autor..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="flex-grow" />
                <select value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)} className="flex-grow bg-background border border-input rounded-md px-3 py-2 text-sm h-10">
                    <option value="">Todos os Gêneros</option>
                    {availableGenres.map(genre => (<option key={genre} value={genre}>{genre}</option>))}
                </select>
            </div>
            <Tabs defaultValue="TODOS" className="w-full">
                <TabsList className="grid w-full bg-card grid-cols-3 sm:grid-cols-3 md:grid-cols-6">
                    {allTabs.map(tab => (<TabsTrigger key={tab} value={tab}>{formatTabTitle(tab)}</TabsTrigger>))}
                </TabsList>
                {allTabs.map(tab => {
                    const booksForTab = tab === "TODOS" ? filteredBooks : filteredBooks.filter(book => book.status === tab);
                    return (
                        <TabsContent key={tab} value={tab}>
                            <BookGrid 
                                books={booksForTab} 
                                onRemoveFromLibrary={onRemoveFromLibrary} 
                                onUpdateBookStatus={onUpdateBookStatus} 
                                onBookUpdate={onBookUpdate} // 5. E finalmente passar para o BookGrid
                            />
                            {booksForTab.length === 0 && (<p className="text-center text-muted-foreground mt-10">Nenhum livro encontrado com esses filtros.</p>)}
                        </TabsContent>
                    );
                })}
            </Tabs>
        </div>
    );
};

export default MyLibrary;
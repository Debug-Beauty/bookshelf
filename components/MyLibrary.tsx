"use client";

import { useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Book, ReadingStatus, READING_STATUS } from "../lib/types";
import BookCard from "./BookCard";
import { motion, AnimatePresence } from "framer-motion";

interface MyLibraryProps {
    library: Book[];
    onRemoveFromLibrary: (bookId: string) => void;
    onUpdateBookStatus: (bookId: string, newStatus: ReadingStatus) => void;
    onUpdateBookRating: (bookId: string, newRating: number) => void;
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    selectedGenre: string;
    setSelectedGenre: (genre: string) => void;
}

const BookGrid = ({ books, onRemoveFromLibrary, onUpdateBookStatus, onUpdateBookRating }: { 
    books: Book[], 
    onRemoveFromLibrary: (bookId: string) => void,
    onUpdateBookStatus: (bookId: string, newStatus: ReadingStatus) => void,
    onUpdateBookRating: (bookId: string, newRating: number) => void;
}) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6">
        <AnimatePresence>
            {books.map(book => (
                <motion.div key={book.id} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.3, ease: "easeInOut" }}>
                    <BookCard
                        book={book}
                        isInLibrary={true}
                        onRemoveFromLibrary={onRemoveFromLibrary}
                        onUpdateBookStatus={onUpdateBookStatus}
                        onUpdateBookRating={onUpdateBookRating}
                    />
                </motion.div>
            ))}
        </AnimatePresence>
    </div>
);

const MyLibrary = ({ library, onRemoveFromLibrary, onUpdateBookStatus, onUpdateBookRating, searchTerm, setSearchTerm, selectedGenre, setSelectedGenre }: MyLibraryProps) => {
    const availableGenres = useMemo(() => new Set(library.map(book => book.genre)), [library]);
    const filteredBooks = useMemo(() => {
        return library.filter(book => {
            const matchesSearchTerm = book.title.toLowerCase().includes(searchTerm.toLowerCase()) || book.author.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesGenre = selectedGenre ? book.genre === selectedGenre : true;
            return matchesSearchTerm && matchesGenre;
        });
    }, [library, searchTerm, selectedGenre]);
    const statusOrder: ReadingStatus[] = [READING_STATUS.LENDO, READING_STATUS.QUERO_LER, READING_STATUS.LIDO, READING_STATUS.PAUSADO, READING_STATUS.ABANDONADO];
    const allTabs: Array<"TODOS" | ReadingStatus> = ["TODOS", ...statusOrder];
    const formatTabTitle = (tab: (typeof allTabs)[number]) => {
        if (tab === "TODOS") return "Todos";
        return tab.charAt(0) + tab.slice(1).toLowerCase().replace('_', ' ');
    };

    return (
        <div className="mt-12">
            <h2 className="text-3xl font-bold text-foreground mb-6">Minha Biblioteca</h2>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Input type="text" placeholder="Buscar..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="flex-grow border-2" />
                <Select value={selectedGenre} onValueChange={(value) => setSelectedGenre(value === "todos" ? "" : value)}>
                    <SelectTrigger className="flex-grow border-2"><SelectValue placeholder="Todos os Gêneros" /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="todos">Todos os Gêneros</SelectItem>
                        {Array.from(availableGenres).sort().map(genre => (<SelectItem key={genre} value={genre}>{genre}</SelectItem>))}
                    </SelectContent>
                </Select>
            </div>
            <Tabs defaultValue="TODOS" className="w-full">
                <TabsList className="grid w-full bg-card grid-cols-3 sm:grid-cols-3 md:grid-cols-6">{allTabs.map(tab => (<TabsTrigger key={tab} value={tab}>{formatTabTitle(tab)}</TabsTrigger>))}</TabsList>
                {allTabs.map(tab => {
                    const booksForTab = tab === "TODOS" ? filteredBooks : filteredBooks.filter(book => book.status === tab);
                    return (
                        <TabsContent key={tab} value={tab}>
                            <BookGrid books={booksForTab} onRemoveFromLibrary={onRemoveFromLibrary} onUpdateBookStatus={onUpdateBookStatus} onUpdateBookRating={onUpdateBookRating} />
                            {booksForTab.length === 0 && (<p className="text-center text-muted-foreground mt-10">Nenhum livro encontrado.</p>)}
                        </TabsContent>
                    );
                })}
            </Tabs>
        </div>
    );
};

export default MyLibrary;
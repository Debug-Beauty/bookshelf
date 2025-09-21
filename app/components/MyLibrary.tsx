"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Input } from "../../components/ui/input";
import { Book, ReadingStatus } from "../../lib/types";
import BookCard from "./BookCard";

interface MyLibraryProps {
    library: Book[];
    onRemoveFromLibrary: (bookId: string) => void;
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    selectedGenre: string;
    setSelectedGenre: (genre: string) => void;
}

const availableGenres = [
    "Fantasia", "Ficção Científica", "Literatura Brasileira", "Realismo Mágico",
    "Ficção", "Romance", "Biografia", "História", "Psicologia", "Programação",
    "Negócios", "Filosofia", "Poesia", "Tecnologia", "Clássico", "Humor",
    "Mistério", "Política", "Aventura"
];

const MyLibrary = ({ 
    library, 
    onRemoveFromLibrary, 
    searchTerm, 
    setSearchTerm, 
    selectedGenre, 
    setSelectedGenre 
}: MyLibraryProps) => {

    const filterBooks = (books: Book[]) => {
        return books.filter(book => {
            const matchesSearchTerm = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                     book.author.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesGenre = selectedGenre ? book.genre === selectedGenre : true;
            return matchesSearchTerm && matchesGenre;
        });
    };

    const allFilteredBooks = filterBooks(library);
    
    const filterBooksByStatus = (status: ReadingStatus) => {
        const booksInStatus = library.filter(book => book.status === status);
        return filterBooks(booksInStatus);
    };

    const otherStatuses: ReadingStatus[] = ["LENDO", "QUERO_LER", "LIDO", "PAUSADO", "ABANDONADO"];
    const allTabs = ["TODOS", ...otherStatuses] as const;

    const formatTabTitle = (tab: (typeof allTabs)[number]) => {
        if (tab === "TODOS") return "Todos os Livros";
        return tab.replace('_', ' ');
    }

    return (
        <div className="mt-12">
            <h2 className="text-3xl font-bold text-foreground mb-6">Minha Biblioteca</h2>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Input
                    type="text"
                    placeholder="Buscar por título ou autor..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-grow"
                />
                <select
                    value={selectedGenre}
                    onChange={(e) => setSelectedGenre(e.target.value)}
                    className="flex-grow bg-background border border-input rounded-md px-3 py-2 text-sm h-9"
                >
                    <option value="">Todos os Gêneros</option>
                    {availableGenres.sort().map(genre => (
                        <option key={genre} value={genre}>{genre}</option>
                    ))}
                </select>
            </div>
            <Tabs defaultValue="TODOS">
                <TabsList className="grid w-full grid-cols-3 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-6 xl:grid-cols-6">
                    {allTabs.map(tab => (
                        <TabsTrigger key={tab} value={tab}>{formatTabTitle(tab)}</TabsTrigger>
                    ))}
                </TabsList>

                <TabsContent key="TODOS" value="TODOS">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6">
                        {allFilteredBooks.map(book => (
                            <BookCard
                                key={book.id}
                                book={book}
                                isInLibrary={true}
                                onRemoveFromLibrary={onRemoveFromLibrary}
                            />
                        ))}
                    </div>
                    {allFilteredBooks.length === 0 && (
                        <p className="text-center text-muted-foreground mt-6">Nenhum livro encontrado com esses filtros.</p>
                    )}
                </TabsContent>

                {otherStatuses.map(status => {
                    const booksForStatus = filterBooksByStatus(status);
                    return (
                        <TabsContent key={status} value={status}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6">
                                {booksForStatus.map(book => (
                                    <BookCard
                                        key={book.id}
                                        book={book}
                                        isInLibrary={true}
                                        onRemoveFromLibrary={onRemoveFromLibrary}
                                    />
                                ))}
                            </div>
                            
                            {booksForStatus.length === 0 && (
                                <p className="text-center text-muted-foreground mt-6">Nenhum livro com este estado e filtros.</p>
                            )}
                        </TabsContent>
                    );
                })}
            </Tabs>
        </div>
    );
};

export default MyLibrary;
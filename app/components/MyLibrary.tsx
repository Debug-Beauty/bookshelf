"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Book, ReadingStatus } from "@/lib/types";
import BookCard from "./BookCard";

interface MyLibraryProps {
    library: Book[];
    onRemoveFromLibrary: (bookId: string) => void;
}

const MyLibrary = ({ library, onRemoveFromLibrary }: MyLibraryProps) => {   
    const filterBooksByStatus = (status: ReadingStatus) => {
        return library.filter(book => book.status === status);
    };

    const otherStatuses: ReadingStatus[] = ["LENDO", "QUERO_LER", "LIDO", "PAUSADO"];
  
    const allTabs = ["TODOS", ...otherStatuses] as const;

    const formatTabTitle = (tab: (typeof allTabs)[number]) => {
        if (tab === "TODOS") return "Todos os Livros";
        return tab.replace('_', ' ');
    }

    return (
        <div className="mt-12">
            <h2 className="text-3xl font-bold text-foreground mb-6">Minha Biblioteca</h2>
            <Tabs defaultValue="TODOS"> 
                <TabsList className="grid w-full grid-cols-3 md:grid-cols-5">
                    {allTabs.map(tab => (
                        <TabsTrigger key={tab} value={tab}>{formatTabTitle(tab)}</TabsTrigger>
                    ))}
                </TabsList>
       
                <TabsContent key="TODOS" value="TODOS">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6">
                        {library.map(book => ( 
                            <BookCard
                                key={book.id}
                                book={book}
                                isInLibrary={true}
                                onRemoveFromLibrary={onRemoveFromLibrary}
                            />
                        ))}
                    </div>
                    {library.length === 0 && (
                        <p className="text-center text-muted-foreground mt-6">Sua biblioteca está vazia.</p>
                    )}
                </TabsContent>
           
                {otherStatuses.map(status => (
                    <TabsContent key={status} value={status}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6">
                            {filterBooksByStatus(status).map(book => (
                                <BookCard
                                    key={book.id}
                                    book={book}
                                    isInLibrary={true}
                                    onRemoveFromLibrary={onRemoveFromLibrary}
                                />
                            ))}
                        </div>
                        {filterBooksByStatus(status).length === 0 && (
                            <p className="text-center text-muted-foreground mt-6">Nenhum livro com este estado.</p>
                        )}
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    );
};

export default MyLibrary;
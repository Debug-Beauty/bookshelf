"use client";

import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Book, ReadingStatus, READING_STATUS } from '@/lib/types';
import { X } from 'lucide-react';

interface ReadingGoalProps {
    library: Book[];
    onAddBookClick: () => void;
    onUpdateBookStatus: (bookId: string, newStatus: ReadingStatus) => void;
}

const LOCAL_FALLBACK_SRC = '/fallback.png';

const ReadingGoal = ({ library, onAddBookClick, onUpdateBookStatus }: ReadingGoalProps) => {
    
    const completedBooks = library.filter(book => book.status === READING_STATUS.LIDO);
    const readingBooks = library.filter(book => book.status === READING_STATUS.LENDO);
    
    const dynamicGoal = completedBooks.length + readingBooks.length;
    const booksInGoal = [...readingBooks, ...completedBooks];

    const progress = dynamicGoal > 0 ? (completedBooks.length / dynamicGoal) * 100 : 0;

    const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => { 
        e.currentTarget.src = LOCAL_FALLBACK_SRC;
    };

    return (
        <Card className="mb-8 p-4">
            <CardHeader>
                <CardTitle>Sua Meta de Leitura</CardTitle>
                <CardDescription>
                    {completedBooks.length} de {dynamicGoal} livros concluídos
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Progress value={progress} className="mb-6 h-3" />
                <h3 className="text-lg font-semibold text-card-foreground mb-4">Acompanhamento da Meta:</h3>
                <div className="flex space-x-4 overflow-x-auto pb-4 -mx-4 px-4">
                    {booksInGoal.map((book) => (                    
                        <div key={book.id} className="relative flex-shrink-0 group w-[80px] h-[120px]" title={book.title}>
                            <Image
                                src={book.cover}
                                alt={`Capa do livro ${book.title}`}
                                fill                                
                                sizes="80px" 
                                style={{ objectFit: 'cover' }}
                                onError={handleError} 
                                className="rounded-md shadow-md transition-transform duration-300 group-hover:scale-105"
                            />
                            <Badge 
                                className={`absolute top-1 right-1 text-white text-[10px] p-1 h-auto ${
                                    book.status === READING_STATUS.LIDO ? 'bg-chart-2' : 'bg-chart-3'
                                }`}
                            >
                                {book.status === READING_STATUS.LIDO ? 'Lido' : 'Lendo'}
                            </Badge>

                            {book.status === READING_STATUS.LENDO && (
                                <button
                                    onClick={() => onUpdateBookStatus(book.id, READING_STATUS.QUERO_LER)}
                                    className="absolute top-1 left-1 bg-black/60 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    title="Tirar da meta (mover para Quero Ler)"
                                >
                                    <X size={14} />
                                </button>
                            )}
                        </div>
                    ))}

                    <button 
                        onClick={onAddBookClick}                   
                        className="flex-shrink-0 w-[80px] h-[120px] bg-muted rounded-md flex items-center justify-center border-2 border-dashed hover:border-primary transition-colors" 
                        title="Adicionar livro da sua lista"
                    >
                        <span className="text-3xl text-muted-foreground group-hover:text-primary">+</span>
                    </button>
                </div>
            </CardContent>
        </Card>
    );
};

export default ReadingGoal;
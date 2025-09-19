"use client";

import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Book } from '@/lib/types';

interface ReadingGoalProps {
    library: Book[];}


const LOCAL_FALLBACK_SRC = '/placeholder-fallback.png';

const ReadingGoal = ({ library }: ReadingGoalProps) => {
    const totalGoal = 10;

    const completedBooks = library.filter(book => book.status === 'LIDO').length;
    const progress = totalGoal > 0 ? (completedBooks / totalGoal) * 100 : 0;

    const currentlyReadingBooks = library.filter(book => book.status === 'LENDO');

    const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => { 
        e.currentTarget.src = LOCAL_FALLBACK_SRC;
    };

    return (
        <Card className="mb-8">
            <CardHeader>
                <CardTitle>Meta de Leitura 2025</CardTitle>
                <CardDescription>{completedBooks} de {totalGoal} livros concluídos</CardDescription>
            </CardHeader>
            <CardContent>
                <Progress value={progress} className="mb-6 h-3" />

                <h3 className="text-lg font-semibold text-card-foreground mb-4">Lendo Atualmente:</h3>
                <div className="flex space-x-4 overflow-x-auto pb-4">
                    {currentlyReadingBooks.length > 0 ? (
                        currentlyReadingBooks.map((book) => (
                            <div key={book.id} className="flex-shrink-0 group" title={book.title}>
                                <Image
                                    src={book.cover}
                                    alt={`Capa do livro ${book.title}`}
                                    width={100}
                                    height={150}
                                    onError={handleError} 
                                    className="rounded-md shadow-md object-cover transform group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                        ))
                    ) : (
                        <p className="text-sm text-muted-foreground">Nenhum livro sendo lido no momento.</p>
                    )}

                    <div className="flex-shrink-0 w-[100px] h-[150px] bg-muted rounded-md flex items-center justify-center border-2 border-dashed" title="Adicionar livro à meta">
                        <span className="text-muted-foreground text-3xl">+</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default ReadingGoal;
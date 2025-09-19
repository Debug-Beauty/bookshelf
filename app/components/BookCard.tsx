"use client";

import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Book, ReadingStatus } from '@/lib/types';
import { Pencil, Trash2 } from "lucide-react";

const LOCAL_FALLBACK_SRC = '/fallback.png';

const statusColorMap: Record<ReadingStatus, string> = {
    "QUERO_LER": "bg-chart-1", 
    "LIDO": "bg-chart-2",   
    "LENDO": "bg-chart-3", 
    "PAUSADO": "bg-chart-4",  
    "ABANDONADO": "bg-chart-5", 
};

const genreColorMap: Record<string, string> = {
    "Fantasia": "bg-chart-5",
    "Ficção Científica": "bg-blue-700",
    "Literatura Brasileira": "bg-teal-700",
    "Realismo Mágico": "bg-fuchsia-700",
    "Ficção": "bg-red-700",
    "Romance": "bg-pink-700",
    "Biografia": "bg-orange-700",
    "História": "bg-lime-700",
    "Psicologia": "bg-emerald-700",
    "Programação": "bg-gray-700",
    "Negócios": "bg-amber-700",
    "Filosofia": "bg-rose-700",
    "Poesia": "bg-violet-700",
    "Humor": "bg-sky-700",
    "Mistério": "bg-slate-700",
    "Política": "bg-red-900",
};


interface BookCardProps {
    book: Book;
    isInLibrary: boolean;
    onRemoveFromLibrary?: (bookId: string) => void;
}

const BookCard = ({ book, onRemoveFromLibrary }: BookCardProps) => {

    const formatStatus = (status: string) => {
        return status.replace('_', ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
    };

    const renderStars = () => {
        let stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <span key={i} className={i <= book.rating ? 'text-yellow-400' : 'text-gray-300'}>
                    ★
                </span>
            );
        }
        return stars;
    };

    const statusClass = statusColorMap[book.status as ReadingStatus] || "bg-slate-500 hover:bg-slate-600";
    const genreClass = genreColorMap[book.genre] || "bg-slate-700 hover:bg-slate-800";
   
    const [coverSrc, setCoverSrc] = React.useState(book.cover);
    const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        if (coverSrc !== LOCAL_FALLBACK_SRC) {
            setCoverSrc(LOCAL_FALLBACK_SRC);
        }
    };
    React.useEffect(() => {
        setCoverSrc(book.cover);
    }, [book.cover]);


    return (
        <Card className="overflow-hidden flex flex-col h-full">
            <CardHeader className="p-0 relative h-80 w-full">
                <Image
                    src={coverSrc}
                    alt={`Capa do livro ${book.title}`}
                    fill
                    priority={true}
                    style={{ objectFit: 'cover' }}
                    onError={handleError} 
                />
            </CardHeader>
            <CardContent className="p-4 flex-grow flex flex-col justify-between">
                <div className="flex-grow">
                    <div className="flex justify-between items-start mb-1">                      
                        <Badge className={`${statusClass} text-white`}>{formatStatus(book.status)}</Badge>
                        <div className="flex items-center ml-2">
                            {renderStars()}
                        </div>
                    </div>
                    <h3 className="text-lg font-bold text-card-foreground line-clamp-2">{book.title}</h3>
                    <p className="text-sm text-muted-foreground">{book.author} ({book.year})</p>
                </div>
              
                <div className="mt-auto pt-2 flex flex-wrap gap-2">
                    <Badge className={`${genreClass} text-white`}>{book.genre}</Badge>
                </div>

            </CardContent>
            <CardFooter className="p-4 pt-0">
                <div className="w-full flex justify-between space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        className="w-10"
                        onClick={() => alert(`Visualizando detalhes de: ${book.title}`)}
                    >
                        Ver
                    </Button>
                    <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => alert(`Editando status de: ${book.title}`)}
                    >
                        <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => onRemoveFromLibrary && onRemoveFromLibrary(book.id)}
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
};

export default BookCard;
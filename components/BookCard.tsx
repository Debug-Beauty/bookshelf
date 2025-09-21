"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Book, ReadingStatus, READING_STATUS } from '@/lib/types';
import { Trash2, ChevronRight } from "lucide-react";

const statusColorMap: Record<ReadingStatus, string> = {
    "QUERO_LER": "bg-chart-1", 
    "LIDO": "bg-chart-2",   
    "LENDO": "bg-chart-3", 
    "PAUSADO": "bg-chart-4",  
    "ABANDONADO": "bg-chart-5", 
};

const genreColorMap: Record<string, string> = {
    "Fantasia": "bg-chart-5", "Ficção Científica": "bg-blue-700", "Literatura Brasileira": "bg-teal-700",
    "Realismo Mágico": "bg-fuchsia-700", "Ficção": "bg-red-700", "Romance": "bg-pink-700",
    "Biografia": "bg-orange-700", "História": "bg-lime-700", "Psicologia": "bg-emerald-700",
    "Programação": "bg-gray-700", "Negócios": "bg-amber-700", "Filosofia": "bg-rose-700",
    "Poesia": "bg-violet-700", "Humor": "bg-sky-700", "Mistério": "bg-slate-700", "Política": "bg-red-900",
};

// Componente para as estrelas interativas (quando o livro está lido)
const StarRating = ({ currentRating, onRatingChange }: { currentRating: number, onRatingChange: (newRating: number) => void }) => {
    const [hoverRating, setHoverRating] = useState(0);

    return (
        <div className="flex items-center" onMouseLeave={() => setHoverRating(0)}>
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    onClick={() => onRatingChange(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    className="bg-transparent border-none cursor-pointer p-0"
                >
                    <span className={
                        (hoverRating >= star || (!hoverRating && currentRating >= star)) 
                        ? 'text-yellow-400 text-xl' 
                        : 'text-gray-300 text-xl'
                    }>
                        ★
                    </span>
                </button>
            ))}
        </div>
    );
};

// Componente para as estrelas estáticas e apagadas
const StaticStars = () => (
    <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
            <span key={star} className="text-gray-300 text-xl">★</span>
        ))}
    </div>
);

interface BookCardProps {
    book: Book;
    isInLibrary: boolean;
    onRemoveFromLibrary: (bookId: string) => void;
    onUpdateBookStatus: (bookId: string, newStatus: ReadingStatus) => void;
    onUpdateBookRating: (bookId: string, newRating: number) => void;
}

const LOCAL_FALLBACK_SRC = '/fallback.png';

const BookCard = ({ book, onRemoveFromLibrary, onUpdateBookStatus, onUpdateBookRating }: BookCardProps) => {
    const statusClass = statusColorMap[book.status] || "bg-gray-500";
    const genreClass = genreColorMap[book.genre] || "bg-gray-700";

    const formatStatus = (status: string) => status.replace('_', ' ').charAt(0) + status.replace('_', ' ').slice(1).toLowerCase();
    
    const [coverSrc, setCoverSrc] = React.useState(book.cover);
    const handleError = () => { if (coverSrc !== LOCAL_FALLBACK_SRC) setCoverSrc(LOCAL_FALLBACK_SRC) };
    React.useEffect(() => { setCoverSrc(book.cover) }, [book.cover]);
    
    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => onUpdateBookStatus(book.id, e.target.value as ReadingStatus);

    return (
        <Card className="overflow-hidden flex flex-col h-full justify-between">
            <div>
                <CardHeader className="p-0 relative w-full aspect-[2/3]">
                    <Link href={`/livros/${book.id}`} passHref>
                        <Image src={coverSrc} alt={`Capa de ${book.title}`} fill style={{ objectFit: 'cover' }} onError={handleError} className="transition-transform duration-300 hover:scale-105" />
                    </Link>
                </CardHeader>
                <CardContent className="p-4">
                    <div className="flex justify-between items-center mb-2 h-6">
                        <Badge className={`${statusClass} text-white`}>{formatStatus(book.status)}</Badge>
                        {book.status === READING_STATUS.LIDO ? (
                            <StarRating 
                                currentRating={book.rating}
                                onRatingChange={(newRating) => onUpdateBookRating(book.id, newRating)}
                            />
                        ) : (
                            <StaticStars />
                        )}
                    </div>
                    <h3 className="text-lg font-bold text-card-foreground line-clamp-2 mt-2">{book.title}</h3>
                    <p className="text-sm text-muted-foreground">{book.author} ({book.year})</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                        <Badge className={`${genreClass} text-white`}>{book.genre}</Badge>
                    </div>
                </CardContent>
            </div>
            <CardFooter className="p-4 pt-0">
                <div className="w-full flex items-center gap-2">
                    <Link href={`/livros/${book.id}`} passHref>
                       <Button
                        variant="outline"
                        size="sm"
                        onClick={() => alert(`Visualizando detalhes de: ${book.title}`)}
                        className='bg-card border-2 border-transparent shadow-sm text-card-foreground'
                    >
                       <ChevronRight />
                    </Button>      
                    </Link>
                    <select value={book.status} onChange={handleStatusChange} className="flex-grow bg-card border-2 border-input shadow-sm rounded-md px-3 text-sm h-9">
                        {Object.values(READING_STATUS).map(status => (<option key={status} value={status}>{formatStatus(status)}</option>))}
                    </select>
                    <Button variant="destructive" size="icon" onClick={() => onRemoveFromLibrary(book.id)} className="flex-shrink-0" title="Remover da biblioteca">
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
};

export default BookCard;
"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Book, ReadingStatus, READING_STATUS } from '@/lib/types';
import { Trash2, Eye, Edit } from "lucide-react"; // 1. Importar o ícone de Edição
import ConfirmationModal from './ConfirmationModal';
import EditBookModal from './EditBookModal'; // 2. Importar o modal de Edição
import { toast } from 'sonner';

const LOCAL_FALLBACK_SRC = '/fallback.png';

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

interface BookCardProps {
    book: Book;
    onRemoveFromLibrary: (bookId: string) => void;
    onUpdateBookStatus: (bookId: string, newStatus: ReadingStatus) => void;
    onBookUpdate: (updatedBook: Book) => void; // 3. Adicionar a nova prop
}

const BookCard = ({ book, onRemoveFromLibrary, onUpdateBookStatus, onBookUpdate }: BookCardProps) => {
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false); // 4. Estado para o modal de edição

    const [coverSrc, setCoverSrc] = React.useState(book.cover);
    const handleError = () => { if (coverSrc !== LOCAL_FALLBACK_SRC) setCoverSrc(LOCAL_FALLBACK_SRC); };
    React.useEffect(() => { setCoverSrc(book.cover); }, [book.cover]);
    const formatStatus = (status: string) => { return status.replace('_', ' ').charAt(0) + status.replace('_', ' ').slice(1).toLowerCase(); };
    const renderStars = () => { let stars = []; for (let i = 1; i <= 5; i++) { stars.push(<span key={i} className={i <= book.rating ? 'text-yellow-400' : 'text-gray-300'}>★</span>); } return stars; };
    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => { onUpdateBookStatus(book.id, e.target.value as ReadingStatus); };
    
    const handleConfirmDelete = () => {
        onRemoveFromLibrary(book.id);
        toast.success("Livro removido", { description: `"${book.title}" foi removido da sua biblioteca.` });
    };

    const statusClass = statusColorMap[book.status] || "bg-slate-500";
    const genreClass = genreColorMap[book.genre] || "bg-slate-700";

    return (
        <>
            <ConfirmationModal isOpen={isConfirmModalOpen} onOpenChange={setIsConfirmModalOpen} onConfirm={handleConfirmDelete} title="Você tem certeza?" description="Esta ação não pode ser desfeita. O livro será removido." />
            {/* 5. Renderizar o modal de edição e passar a função de update */}
            <EditBookModal isOpen={isEditModalOpen} onOpenChange={setIsEditModalOpen} bookToEdit={book} onBookUpdate={onBookUpdate} />
            
            <Card className="overflow-hidden flex flex-col h-full justify-between">
                <div>
                    <CardHeader className="p-0 relative h-80 w-full"><Image src={coverSrc} alt={`Capa do livro ${book.title}`} fill priority style={{ objectFit: 'cover' }} onError={handleError} /></CardHeader>
                    <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2"><Badge className={`${statusClass} text-white`}>{formatStatus(book.status)}</Badge><div className="flex items-center">{renderStars()}</div></div>
                        <h3 className="text-lg font-bold text-card-foreground line-clamp-2">{book.title}</h3>
                        <p className="text-sm text-muted-foreground">{book.author} ({book.year})</p>
                        <div className="mt-2 flex flex-wrap gap-2"><Badge className={`${genreClass} text-white`}>{book.genre}</Badge></div>
                    </CardContent>
                </div>
                <CardFooter className="p-4 pt-0">
                    <div className="w-full flex items-center gap-2">
                        <Button asChild variant="outline" size="sm" className='bg-card border-2 border-transparent shadow-sm text-card-foreground'><Link href={`/book/${book.id}`}><Eye className="h-4 w-4" /></Link></Button>
                        
                        {/* 6. Adicionar o novo botão de Edição */}
                        <Button variant="outline" size="sm" onClick={() => setIsEditModalOpen(true)} className='bg-card border-2 border-transparent shadow-sm text-card-foreground'>
                            <Edit className="h-4 w-4" />
                        </Button>

                        <select value={book.status} onChange={handleStatusChange} className="flex-grow border-2 border-transparent shadow-sm rounded-md px-3 text-sm h-9">
                            {Object.values(READING_STATUS).map(status => (<option key={status} value={status}>{formatStatus(status)}</option>))}
                        </select>
                        
                        <Button variant="destructive" size="icon" onClick={() => setIsConfirmModalOpen(true)} className="flex-shrink-0"><Trash2 className="h-4 w-4" /></Button>
                    </div>
                </CardFooter>
            </Card>
        </>
    );
};

export default BookCard;
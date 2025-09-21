// app/components/AddBookModal.tsx

"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Book, ReadingStatus } from '@/lib/types';

interface AddBookModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onBookAdd: (newBook: Book) => void;
}

const availableGenres = [
    "Fantasia", "Ficção Científica", "Literatura Brasileira", "Realismo Mágico",
    "Ficção", "Romance", "Biografia", "História", "Psicologia", "Programação",
    "Negócios", "Filosofia", "Poesia", "Tecnologia", "Clássico", "Humor",
    "Mistério", "Política", "Aventura"
];

const readingStatuses: ReadingStatus[] = ["QUERO_LER", "LENDO", "LIDO", "PAUSADO", "ABANDONADO"];

const AddBookModal = ({ isOpen, onOpenChange, onBookAdd }: AddBookModalProps) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [cover, setCover] = useState('');
  const [genre, setGenre] = useState(availableGenres[0]);
  const [status, setStatus] = useState<ReadingStatus>('QUERO_LER');

  const handleSubmit = () => {
    if (!title || !author) {
      alert('Título e Autor são obrigatórios!');
      return;
    }

    const newBook: Book = {
      id: new Date().toISOString(), // Gerando um ID único simples
      title,
      author,
      cover: cover || '/covers/fallback.png', // Fallback se a capa não for fornecida
      genre,
      status,
      year: new Date().getFullYear(), // Default
      pages: 0, // Default
      rating: 0, // Default
      synopsis: '', // Default
    };

    onBookAdd(newBook);
    onOpenChange(false); // Fecha o modal
    
    // Limpa os campos
    setTitle('');
    setAuthor('');
    setCover('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicionar Novo Livro</DialogTitle>
          <DialogDescription>
            Preencha as informações para adicionar um novo livro à sua biblioteca.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">Título</Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="author" className="text-right">Autor</Label>
            <Input id="author" value={author} onChange={(e) => setAuthor(e.target.value)} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="cover" className="text-right">URL da Capa</Label>
            <Input id="cover" value={cover} onChange={(e) => setCover(e.target.value)} className="col-span-3" />
          </div>
           <div className="grid grid-cols-4 items-center gap-4">
             <Label htmlFor="genre" className="text-right">Gênero</Label>
             <select id="genre" value={genre} onChange={(e) => setGenre(e.target.value)} className="col-span-3 bg-background border border-input rounded-md px-3 py-2 text-sm h-9">
                 {availableGenres.map(g => <option key={g} value={g}>{g}</option>)}
             </select>
          </div>
           <div className="grid grid-cols-4 items-center gap-4">
             <Label htmlFor="status" className="text-right">Status</Label>
             <select id="status" value={status} onChange={(e) => setStatus(e.target.value as ReadingStatus)} className="col-span-3 bg-background border border-input rounded-md px-3 py-2 text-sm h-9">
                 {readingStatuses.map(s => <option key={s} value={s}>{s.replace('_', ' ')}</option>)}
             </select>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>Salvar Livro</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddBookModal;
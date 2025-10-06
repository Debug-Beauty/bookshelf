"use client";

import { useState, useEffect, FormEvent } from 'react';
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
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Book, ReadingStatus, READING_STATUS } from '@/lib/types';
import { toast } from 'sonner';

const Textarea = (props: React.ComponentProps<"textarea">) => (
  <textarea
    className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
    {...props}
  />
);

interface EditBookModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  bookToEdit: Book | null;
  onBookUpdate: (updatedBook: Book) => void;
}

const availableGenres = [
    "Fantasia", "Ficção Científica", "Literatura Brasileira", "Realismo Mágico",
    "Ficção", "Romance", "Biografia", "História", "Psicologia", "Programação",
    "Negócios", "Filosofia", "Poesia", "Tecnologia", "Clássico", "Humor",
    "Mistério", "Política", "Aventura"
];

const readingStatuses = Object.values(READING_STATUS);

const EditBookModal = ({ isOpen, onOpenChange, bookToEdit, onBookUpdate }: EditBookModalProps) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    coverUrl: '',
    genre: '',
    status: 'QUERO_LER' as ReadingStatus,
    year: '',
    rating: 0,
    pages: '',
    currentPage: '',
    isbn: '',
    notes: '',
  });

  useEffect(() => {
    if (bookToEdit) {
      setFormData({
        title: bookToEdit.title || '',
        author: bookToEdit.author || '',
        coverUrl: bookToEdit.cover || '',
        genre: bookToEdit.genre?.name || '',
        status: bookToEdit.status || 'QUERO_LER',
        year: String(bookToEdit.year || ''),
        rating: bookToEdit.rating || 0,
        pages: String(bookToEdit.pages || ''),
        currentPage: String(bookToEdit.currentPage || ''),
        isbn: bookToEdit.isbn || '',
        notes: bookToEdit.notes || '',
      });
    }
  }, [bookToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: 'status' | 'genre') => (value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.author || !bookToEdit) {
      toast.error("Erro de Validação", {
        description: "Os campos Título e Autor são obrigatórios.",
      });
      return;
    }

    const updatedBookObject: Book = {
      ...bookToEdit,
      ...formData,
      cover: formData.coverUrl,
      year: Number(formData.year) || 0,
      pages: Number(formData.pages) || 0,
      currentPage: Number(formData.currentPage) || 0,
      rating: Number(formData.rating) || 0,
      genre: { id: bookToEdit.genre?.id || '', name: formData.genre },
    };

    onBookUpdate(updatedBookObject);
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Editar Livro</DialogTitle>
          <DialogDescription>
            Altere as informações do livro selecionado.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4 max-h-[70vh] overflow-y-auto pr-4">
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">Título</Label>
            <Input id="title" name="title" value={formData.title} onChange={handleChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="author" className="text-right">Autor</Label>
            <Input id="author" name="author" value={formData.author} onChange={handleChange} className="col-span-3" />
          </div>
           <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="year" className="text-right">Ano</Label>
            <Input id="year" name="year" type="number" value={formData.year} onChange={handleChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="coverUrl" className="text-right">URL da Capa</Label>
            <Input id="coverUrl" name="coverUrl" placeholder="https://..." value={formData.coverUrl} onChange={handleChange} className="col-span-3" />
          </div>

          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="notes" className="text-right pt-2">Notas</Label>
            <Textarea 
              id="notes" 
              name="notes" 
              value={formData.notes} 
              onChange={handleChange} 
              className="col-span-3" 
              rows={4}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="genre" className="text-right">Gênero</Label>
            <Select name="genre" value={formData.genre} onValueChange={handleSelectChange('genre')}>
                <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Selecione um gênero" />
                </SelectTrigger>
                <SelectContent>
                    {availableGenres.map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}
                </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">Status</Label>
            <Select name="status" value={formData.status} onValueChange={handleSelectChange('status')}>
                <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Selecione um status" />
                </SelectTrigger>
                <SelectContent>
                    {readingStatuses.map(s => <SelectItem key={s} value={s}>{s.replace('_', ' ')}</SelectItem>)}
                </SelectContent>
            </Select>
          </div>
          
          <DialogFooter>
            <Button type="submit">Salvar Alterações</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditBookModal;
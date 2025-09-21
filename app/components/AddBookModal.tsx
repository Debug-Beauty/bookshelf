"use client";

import { useState } from 'react';
import { Button } from '../../components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../components/ui/dialog';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Book, ReadingStatus } from '../../lib/types';
import { ImageIcon } from 'lucide-react';

interface AddBookModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onBookAdd: (newBook: Book) => void;
}

const availableGenres = [
    "Fantasia", "Ficção Científica", "Literatura Brasileira", "Realismo Mágico",
    "Ficção", "Romance", "Biografia", "História", "Psicologia", "Programação",
    "Negócios", "Filosofia", "Poesia", "Humor", "Mistério", "Política", "Aventura", "Clássico"
];

const readingStatuses: ReadingStatus[] = ["QUERO_LER", "LENDO", "LIDO", "PAUSADO", "ABANDONADO"];

const AddBookModal = ({ isOpen, onOpenChange, onBookAdd }: AddBookModalProps) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [cover, setCover] = useState("");
  const [genre, setGenre] = useState(availableGenres[0]);
  const [status, setStatus] = useState<ReadingStatus>("QUERO_LER");
  const [coverError, setCoverError] = useState(false);

  const handleSubmit = () => {
    if (!title || !author) {
      alert("Título e Autor são obrigatórios!");
      return;
    }

    const newBook: Book = {
      id: new Date().toISOString(),
      title,
      author,
      cover: cover && !coverError ? cover : "/fallback.png",
      genre,
      status,
      year: new Date().getFullYear(),
      pages: 0,
      rating: 0,
      synopsis: "",
    };

    onBookAdd(newBook);
    onOpenChange(false);
    
    setTitle("");
    setAuthor("");
    setCover("");
    setGenre(availableGenres[0]);
    setStatus("QUERO_LER");
  };
  
  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCover(e.target.value);
    setCoverError(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl"> 
        <DialogHeader>
          <DialogTitle>Adicionar Novo Livro</DialogTitle>
          <DialogDescription>
            Preencha as informações para adicionar um novo livro à sua biblioteca.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-4">
          
          <div className="grid gap-4">
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
              <Input id="cover" value={cover} onChange={handleCoverChange} className="col-span-3" />
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

          <div className="flex items-center justify-center">
            {cover && !coverError ? (
              <img
                src={cover}
                alt="Preview da capa"
                className="rounded-lg object-cover h-64 w-48 border shadow-md"
                onError={() => setCoverError(true)}
              />
            ) : (
              <div className="flex flex-col items-center justify-center w-48 h-64 bg-muted rounded-lg border-2 border-dashed text-sm text-muted-foreground">
                <ImageIcon className="h-10 w-10 mb-2" />
                <span>Preview da Capa</span>
              </div>
            )}
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
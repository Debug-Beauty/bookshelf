"use client";

import { useState, useEffect } from 'react';
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
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../../components/ui/select";
import { Progress } from "../../components/ui/progress";
import { Book, ReadingStatus, READING_STATUS } from '../../lib/types';
import { toast } from 'sonner';

// 1. Adicionar um novo componente Textarea para a sinopse
const Textarea = (props: React.ComponentProps<"textarea">) => (
  <textarea 
    className="flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" 
    {...props} 
  />
);

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

const readingStatuses = Object.values(READING_STATUS);

const AddBookModal = ({ isOpen, onOpenChange, onBookAdd }: AddBookModalProps) => {
  // 2. Adicionar estados para os novos campos
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [cover, setCover] = useState('');
  const [genre, setGenre] = useState('');
  const [status, setStatus] = useState<ReadingStatus>('QUERO_LER');
  const [year, setYear] = useState('');
  const [pages, setPages] = useState('');
  const [synopsis, setSynopsis] = useState('');

  const [formProgress, setFormProgress] = useState(0);

  // 3. Atualizar o cálculo do progresso para incluir os novos campos
  useEffect(() => {
    const fields = [title, author, cover, genre, status, year, pages, synopsis];
    const filledFields = fields.filter(field => field !== '' && field !== null).length;
    const totalFields = fields.length;
    const progress = (filledFields / totalFields) * 100;
    setFormProgress(progress);
  }, [title, author, cover, genre, status, year, pages, synopsis]);


  const resetForm = () => {
    setTitle('');
    setAuthor('');
    setCover('');
    setGenre('');
    setStatus('QUERO_LER');
    setYear('');
    setPages('');
    setSynopsis('');
  };

  const handleSubmit = () => {
    if (!title || !author) {
      toast.error("Erro de Validação", {
        description: "Os campos Título e Autor são obrigatórios.",
      });
      return;
    }

    const newBook: Book = {
      id: crypto.randomUUID(),
      title,
      author,
      cover: cover || '/fallback.png',
      genre: genre || "Não especificado",
      status,
      // 4. Adicionar os novos valores ao objeto do livro
      year: Number(year) || 0,
      pages: Number(pages) || 0,
      synopsis: synopsis || "Nenhuma sinopse adicionada.",
      rating: 0,
    };

    onBookAdd(newBook);
    onOpenChange(false);
    resetForm();
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
        
        <div className="px-6 pt-2">
            <Progress value={formProgress} className="h-2" />
        </div>

        {/* 5. Adicionar os novos campos ao JSX do formulário */}
        <div className="grid gap-4 py-4 max-h-[70vh] overflow-y-auto px-6">
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
            <Input id="cover" placeholder="https://..." value={cover} onChange={(e) => setCover(e.target.value)} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="year" className="text-right">Ano</Label>
            <Input id="year" type="number" value={year} onChange={(e) => setYear(e.target.value)} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="pages" className="text-right">Páginas</Label>
            <Input id="pages" type="number" value={pages} onChange={(e) => setPages(e.target.value)} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="synopsis" className="text-right">Sinopse</Label>
            <Textarea id="synopsis" value={synopsis} onChange={(e) => setSynopsis(e.target.value)} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="genre" className="text-right">Gênero</Label>
            <Select value={genre} onValueChange={(value) => setGenre(value)}>
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
            <Select value={status} onValueChange={(value: ReadingStatus) => setStatus(value)}>
                <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Selecione um status" />
                </SelectTrigger>
                <SelectContent>
                    {readingStatuses.map(s => <SelectItem key={s} value={s}>{s.replace('_', ' ')}</SelectItem>)}
                </SelectContent>
            </Select>
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
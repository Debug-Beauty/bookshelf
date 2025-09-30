"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { ReadingStatus, READING_STATUS } from "@/lib/types";
import { toast } from "sonner";
import { ImageIcon } from "lucide-react";
import { addBookAction } from "@/app/actions";

const Textarea = (props: React.ComponentProps<"textarea">) => (
  <textarea
    className="flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
    {...props}
  />
);
interface AddBookModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

const availableGenres = [
  "Fantasia", "Ficção Científica", "Literatura Brasileira", "Realismo Mágico", "Ficção", "Romance", "Biografia", "História", "Psicologia", "Programação", "Negócios", "Filosofia", "Poesia", "Tecnologia", "Clássico", "Humor", "Mistério", "Política", "Aventura",
];

const readingStatuses = Object.values(READING_STATUS);

const AddBookModal = ({ isOpen, onOpenChange }: AddBookModalProps) => {
  const formRef = useRef<HTMLFormElement>(null);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [coverUrl, setCoverUrl] = useState("");
  const [genre, setGenre] = useState("");
  const [status, setStatus] = useState<ReadingStatus>("QUERO_LER");
  const [year, setYear] = useState("");
  const [pages, setPages] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [currentPage, setCurrentPage] = useState("");
  const [isbn, setIsbn] = useState("");
  const [notes, setNotes] = useState("");
  const [formProgress, setFormProgress] = useState(0);
  const [coverError, setCoverError] = useState(false);

  useEffect(() => {
    const fields = [title, author, coverUrl, genre, status, year, pages, synopsis, currentPage, isbn, notes];
    const filledFields = fields.filter((field) => field !== "" && field !== null).length;
    const progress = (filledFields / fields.length) * 100;
    setFormProgress(progress);
  }, [title, author, coverUrl, genre, status, year, pages, synopsis, currentPage, isbn, notes]);

  const handleFormSubmit = async (formData: FormData) => {
    const title = formData.get('title') as string;
    if (!title) {
      toast.error("O campo Título é obrigatório.");
      return;
    }

    await addBookAction(formData);

    toast.success("Livro adicionado!", {
      description: `“${title}” foi incluído na sua biblioteca.`,
    });

    onOpenChange(false);
    formRef.current?.reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Adicionar Novo Livro</DialogTitle>
          <DialogDescription>
            Preencha as informações para adicionar um novo livro à sua biblioteca.
          </DialogDescription>
        </DialogHeader>

        <div className="px-1 pt-2">
          <Progress value={formProgress} className="h-2" />
        </div>

        <form
          ref={formRef}
          action={handleFormSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 py-4 max-h-[70vh] overflow-y-auto pr-4"
        >
          <div className="grid gap-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">Título</Label>
              <Input id="title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="author" className="text-right">Autor</Label>
              <Input id="author" name="author" value={author} onChange={(e) => setAuthor(e.target.value)} className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="coverUrl" className="text-right">URL da Capa</Label>
              <Input id="coverUrl" name="coverUrl" value={coverUrl} onChange={(e) => { setCoverUrl(e.target.value); setCoverError(false); }} className="col-span-3" placeholder="https://..." />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="year" className="text-right">Ano</Label>
              <Input id="year" name="year" type="number" value={year} onChange={(e) => setYear(e.target.value)} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="pages" className="text-right">Páginas</Label>
              <Input id="pages" name="pages" type="number" value={pages} onChange={(e) => setPages(e.target.value)} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="currentPage" className="text-right">Página Atual</Label>
              <Input id="currentPage" name="currentPage" type="number" value={currentPage} onChange={(e) => setCurrentPage(e.target.value)} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="isbn" className="text-right">ISBN</Label>
              <Input id="isbn" name="isbn" value={isbn} onChange={(e) => setIsbn(e.target.value)} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="synopsis" className="text-right pt-2">Sinopse</Label>
              <Textarea
                id="synopsis"
                name="synopsis"
                value={synopsis}
                onChange={(e) => setSynopsis(e.target.value)}
                className="col-span-3 bg-white dark:bg-gray-800 text-black dark:text-gray-200"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="notes" className="text-right pt-2">Notas</Label>
                <Textarea
                    id="notes"
                    name="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="col-span-3 bg-white dark:bg-gray-800 text-black dark:text-gray-200"
                    rows={3}
                />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="genre" className="text-right">Gênero</Label>
              <Select name="genre" value={genre} onValueChange={(value: string) => setGenre(value)}>
                <SelectTrigger className="col-span-3 bg-white dark:bg-gray-800 text-black dark:text-gray-200">
                  <SelectValue placeholder="Selecione um gênero" />
                </SelectTrigger>
                <SelectContent>
                  {availableGenres.map((g) => <SelectItem key={g} value={g}>{g}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">Status</Label>
              <Select name="status" value={status} onValueChange={(value: ReadingStatus) => setStatus(value)}>
                <SelectTrigger className="col-span-3 bg-white dark:bg-gray-800 text-black dark:text-gray-200">
                  <SelectValue placeholder="Selecione um status" />
                </SelectTrigger>
                <SelectContent>
                  {readingStatuses.map((s) => <SelectItem key={s} value={s}>{s.replace("_", " ")}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center justify-center">
            {coverUrl && !coverError ? (
              <img src={coverUrl} alt="Preview da capa" className="rounded-lg object-cover h-64 w-48 border shadow-md" onError={() => setCoverError(true)} />
            ) : (
              <div className="flex flex-col items-center justify-center w-48 h-64 bg-muted rounded-lg border-2 border-dashed text-sm text-muted-foreground">
                <ImageIcon className="h-10 w-10 mb-2" /><span>Preview da Capa</span>
              </div>
            )}
          </div>
          <DialogFooter className="col-span-1 md:col-span-2 mt-4">
            <Button type="submit">Salvar Livro</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddBookModal;
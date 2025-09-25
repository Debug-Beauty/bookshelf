"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Book, ReadingStatus, READING_STATUS } from "@/lib/types";
import { Trash2, Eye, Edit } from "lucide-react";
import ConfirmationModal from "./ConfirmationModal";
import EditBookModal from "./EditBookModal";
import { toast } from "sonner";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const LOCAL_FALLBACK_SRC = "/fallback.png";

const statusColorMap: Record<ReadingStatus, string> = {
  QUERO_LER: "bg-chart-1",
  LIDO: "bg-chart-2",
  LENDO: "bg-chart-3",
  PAUSADO: "bg-chart-4",
  ABANDONADO: "bg-chart-5",
};

const genreColorMap: Record<string, string> = {
  Fantasia: "bg-chart-5",
  "Ficção Científica": "bg-blue-700",
  "Literatura Brasileira": "bg-teal-700",
  "Realismo Mágico": "bg-fuchsia-700",
  Ficção: "bg-red-700",
  Romance: "bg-pink-700",
  Biografia: "bg-orange-700",
  História: "bg-lime-700",
  Psicologia: "bg-emerald-700",
  Programação: "bg-gray-700",
  Negócios: "bg-amber-700",
  Filosofia: "bg-rose-700",
  Poesia: "bg-violet-700",
  Humor: "bg-sky-700",
  Mistério: "bg-slate-700",
  Política: "bg-red-900",
};

interface BookCardProps {
  book: Book;
  onRemoveFromLibrary: (bookId: string) => void;
  onUpdateBookStatus: (bookId: string, newStatus: ReadingStatus) => void;
  onBookUpdate: (updatedBook: Book) => void;
}

const BookCard = ({
  book,
  onRemoveFromLibrary,
  onUpdateBookStatus,
  onBookUpdate,
}: BookCardProps) => {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [coverSrc, setCoverSrc] = React.useState(book.cover);
  const handleError = () => {
    if (coverSrc !== LOCAL_FALLBACK_SRC) setCoverSrc(LOCAL_FALLBACK_SRC);
  };
  React.useEffect(() => {
    setCoverSrc(book.cover);
  }, [book.cover]);

  const formatStatus = (status: string) => {
    const s = status.replace(/_/g, " ").toLowerCase();
    return s.charAt(0).toUpperCase() + s.slice(1); // ✅ com ()
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={i <= book.rating ? "text-yellow-400" : "text-gray-300"}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  // Exclusão: o modal já dispara o toast destrutivo; aqui só removemos do estado
  const handleConfirmDelete = () => {
    onRemoveFromLibrary(book.id);
  };

  // Status atualizado: toast de sucesso
  const handleChangeStatus = (newStatus: ReadingStatus) => {
    onUpdateBookStatus(book.id, newStatus);
    toast.success("Status atualizado", {
      description: `“${book.title}” agora está marcado como ${formatStatus(
        newStatus
      )}.`,
    });
  };

  const statusClass = statusColorMap[book.status] || "bg-slate-500";
  const genreClass = genreColorMap[book.genre] || "bg-slate-700";

  return (
    <>
      <ConfirmationModal
        isOpen={isConfirmModalOpen}
        onOpenChange={setIsConfirmModalOpen}
        onConfirm={handleConfirmDelete}
        title="Você tem certeza?"
        description={`Esta ação não pode ser desfeita. “${book.title}” será removido da sua biblioteca.`}
      />

      <EditBookModal
        isOpen={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        bookToEdit={book}
        onBookUpdate={onBookUpdate}
      />

      <Card className="overflow-hidden flex flex-col h-full justify-between">
        <div>
          <div className="relative aspect-[2/3] w-full">
            <Image
              src={coverSrc || LOCAL_FALLBACK_SRC}
              alt={`Capa do livro ${book.title}`}
              fill
              priority
              style={{ objectFit: "cover" }}
              onError={handleError}
            />
          </div>

          <CardContent className="p-4 pt-4">
            <div className="flex justify-between items-start mb-2">
              <Badge className={`${statusClass} text-white`}>
                {formatStatus(book.status)}
              </Badge>
              <div className="flex items-center">{renderStars()}</div>
            </div>

            <h3 className="text-lg font-bold text-card-foreground line-clamp-2">
              {book.title}
            </h3>
            <p className="text-sm text-muted-foreground">
              {book.author} ({book.year})
            </p>

            <div className="mt-2 flex flex-wrap gap-2">
              <Badge className={`${genreClass} text-white`}>{book.genre}</Badge>
            </div>
          </CardContent>
        </div>

        <CardFooter className="p-4 pt-0">
          <div className="w-full flex items-center gap-2">
            <Button
              asChild
              variant="outline"
              size="icon"
              className="flex-shrink-0"
              title="Visualizar detalhes"
            >
              <Link href={`/book/${book.id}`}>
                <Eye className="h-4 w-4" />
              </Link>
            </Button>

            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsEditModalOpen(true)}
              className="flex-shrink-0"
              title="Editar livro"
            >
              <Edit className="h-4 w-4" />
            </Button>

            <Select
              value={book.status}
              onValueChange={(v) => handleChangeStatus(v as ReadingStatus)} // ✅ tipado
            >
              <SelectTrigger
                className="flex-grow w-full border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground"
                title="Mudar status"
              >
                <SelectValue placeholder="Selecione um status" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(READING_STATUS).map((status) => (
                  <SelectItem key={status} value={status}>
                    {formatStatus(status)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              variant="destructive"
              size="icon"
              onClick={() => setIsConfirmModalOpen(true)}
              className="flex-shrink-0"
              title="Remover livro"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </>
  );
};

export default BookCard;

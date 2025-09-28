"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Book, ReadingStatus, READING_STATUS } from "@/lib/types";
import { updateBookAction, removeBookAction, updateBookStatusAction } from "@/app/actions";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit, Trash2 } from "lucide-react";
import EditBookModal from "@/components/EditBookModal";
import Breadcrumbs from "@/components/Breadcrumbs";
import ConfirmationModal from "@/components/ConfirmationModal";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { toast } from "sonner";

const LOCAL_FALLBACK_SRC = "/fallback.png";

export default function BookDetailClient({ initialBook }: { initialBook: Book }) {
  const router = useRouter();
  const [book, setBook] = useState<Book>(initialBook);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleBookUpdate = async (updatedBook: Book) => {
    setBook(updatedBook); 
    setIsEditModalOpen(false);
    await updateBookAction(updatedBook);
    toast.success("Livro atualizado!");
  };

  const handleChangeStatus = async (newStatus: ReadingStatus) => {
    setBook(prev => ({ ...prev, status: newStatus })); 
    await updateBookStatusAction(book.id, newStatus); 
    toast.success("Status atualizado!");
  };

  const handleConfirmDelete = async () => {
    await removeBookAction(book.id); 
    toast.error(`"${book.title}" foi removido da sua estante.`);
    router.push("/"); 
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= book.rating ? "text-yellow-400" : "text-gray-300"}>
          ★
        </span>
      );
    }
    return stars;
  };

  const formatStatus = (status: string) => {
    const s = status.replace(/_/g, " ").toLowerCase();
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  return (
    <>
      <EditBookModal
        isOpen={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        bookToEdit={book}
        onBookUpdate={handleBookUpdate}
      />
      <ConfirmationModal
        isOpen={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        title="Excluir livro?"
        description={`Tem certeza que deseja excluir “${book.title}”? Essa ação não pode ser desfeita.`}
        onConfirm={handleConfirmDelete}
      />

      <Breadcrumbs bookTitle={book.title} />

      <div className="container mx-auto px-6 py-8">
        <div className="mb-6 flex justify-between items-center gap-2">
          <Link href="/" passHref>
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar
            </Button>
          </Link>
          <div className="flex gap-2">
            <Button onClick={() => setIsEditModalOpen(true)}>
              <Edit className="mr-2 h-4 w-4" />
              Editar Livro
            </Button>
            <Button variant="destructive" onClick={() => setIsDeleteOpen(true)}>
              <Trash2 className="mr-2 h-4 w-4" />
              Excluir
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <div className="relative w-full aspect-[2/3] shadow-lg rounded-lg overflow-hidden">
              <Image
                src={book.cover}
                alt={`Capa de ${book.title}`}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                style={{ objectFit: "cover" }}
                className="rounded-lg"
                onError={(e) => { (e.target as HTMLImageElement).src = LOCAL_FALLBACK_SRC; }}
              />
            </div>
          </div>
          <div className="md:col-span-2">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-4xl font-bold text-primary mb-2">{book.title}</h1>
                <h2 className="text-xl text-muted-foreground mb-4">{book.author} ({book.year})</h2>
                <div className="flex items-center gap-4 mb-4">
                  <Badge>{book.genre}</Badge>
                  <div className="flex items-center">{renderStars()}</div>
                </div>
              </div>
              <div className="min-w-[200px]">
                <Select value={book.status} onValueChange={handleChangeStatus}>
                  <SelectTrigger title="Mudar status">
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
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-primary mt-6 mb-2">Sinopse</h3>
              <p className="text-base text-foreground/80 leading-relaxed">
                {book.synopsis || "Sinopse não disponível."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
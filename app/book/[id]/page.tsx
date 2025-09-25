"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Book, ReadingStatus, READING_STATUS } from "@/lib/types";
import { initialBooks } from "@/lib/data";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit, Trash2 } from "lucide-react";
import EditBookModal from "@/components/EditBookModal";
import useLocalStorageState from "@/hooks/useLocalStorageState";
import Breadcrumbs from "@/components/Breadcrumbs";
import ConfirmationModal from "@/components/ConfirmationModal";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

// Toasts
import { toast } from "sonner";

const LOCAL_FALLBACK_SRC = "/fallback.png";

const BookDetailPage = () => {
  const router = useRouter();
  const params = useParams();
  const [myLibrary, setMyLibrary] = useLocalStorageState<Book[]>(
    "myBookLibrary",
    initialBooks
  );
  const [book, setBook] = useState<Book | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  useEffect(() => {
    const bookId = Array.isArray(params.id) ? params.id[0] : params.id;
    const foundBook = myLibrary.find((b) => b.id === bookId);
    if (foundBook) {
      setBook(foundBook);
    }
  }, [params.id, myLibrary]);

  const handleBookUpdate = (updatedBook: Book) => {
    try {
      setMyLibrary((prevLibrary) =>
        prevLibrary.map((b) => (b.id === updatedBook.id ? updatedBook : b))
      );
      setBook(updatedBook);
      setIsEditModalOpen(false);

      // TOAST de sucesso (editar)
      toast.success("Livro atualizado", {
        description: "As alterações foram salvas com sucesso.",
      });
    } catch (e) {
      // TOAST de erro
      toast.error("Erro ao atualizar", {
        description: "Não foi possível salvar as alterações.",
      });
    }
  };

  //  Mudança de status (detalhes)
  const handleChangeStatus = (newStatus: ReadingStatus) => {
    if (!book) return;
    const updated: Book = { ...book, status: newStatus };
    setMyLibrary((prev) => prev.map((b) => (b.id === book.id ? updated : b)));
    setBook(updated);

    toast.success("Status atualizado", {
      description: `“${book.title}” agora está marcado como ${formatStatus(
        newStatus
      )}.`,
    });
  };

  // Exclusão: o ConfirmationModal já dispara o toast destrutivo.
  const handleConfirmDelete = () => {
    if (!book) return;
    setMyLibrary((prev) => prev.filter((b) => b.id !== book.id));
    router.push("/"); // volta para a biblioteca/dashboard após excluir
  };

  if (!book) {
    return (
      <div className="container mx-auto px-6 py-8 text-center">
        <Breadcrumbs />
        <h1 className="text-2xl font-bold text-destructive">
          Carregando livro...
        </h1>
        <p className="text-muted-foreground">
          Se o livro não for encontrado, ele pode ter sido removido.
        </p>
        <Link href="/" passHref>
          <Button variant="outline" className="mt-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para a Biblioteca
          </Button>
        </Link>
      </div>
    );
  }

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

  const formatStatus = (status: string) => {
    const s = status.replace(/_/g, " ").toLowerCase();
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  return (
    <>
      {/* Modal de edição */}
      <EditBookModal
        isOpen={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        bookToEdit={book}
        onBookUpdate={handleBookUpdate}
      />

      {/* Modal de confirmação de exclusão (com toast destrutivo embutido) */}
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
                style={{ objectFit: "cover" }}
                className="rounded-lg"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = LOCAL_FALLBACK_SRC;
                }}
              />
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-4xl font-bold text-primary mb-2">
                  {book.title}
                </h1>
                <h2 className="text-xl text-muted-foreground mb-4">
                  {book.author} ({book.year})
                </h2>

                <div className="flex items-center gap-4 mb-4">
                  <Badge>{book.genre}</Badge>
                  <div className="flex items-center">{renderStars()}</div>
                </div>
              </div>

              {/* Select de status no detalhe */}
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
              <h3 className="text-2xl font-semibold text-primary mt-6 mb-2">
                Sinopse
              </h3>
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

export default BookDetailPage;

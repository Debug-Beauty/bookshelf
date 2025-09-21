"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Book } from "@/lib/types";
import Image from "next/image";

interface SelectBookModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  booksToSelect: Book[];
  onBookSelect: (bookId: string) => void;
}

const LOCAL_FALLBACK_SRC = '/fallback.png';

export const SelectBookModal = ({
  isOpen,
  onOpenChange,
  booksToSelect,
  onBookSelect,
}: SelectBookModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Começar a ler um novo livro</DialogTitle>
          <DialogDescription>
            Escolha um livro da sua lista "Quero Ler" para adicionar à sua meta.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 py-4 max-h-[60vh] overflow-y-auto">
          {booksToSelect.length > 0 ? (
            booksToSelect.map((book) => (
              <button
                key={book.id}
                onClick={() => onBookSelect(book.id)}
                className="text-left group transition-transform duration-200 hover:scale-105"
                title={`Começar a ler: ${book.title}`}
              >
                <div className="relative w-full h-40">
                  <Image
                    src={book.cover}
                    alt={`Capa de ${book.title}`}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="rounded-md shadow-lg"
                    onError={(e) => { e.currentTarget.src = LOCAL_FALLBACK_SRC; }}
                  />
                </div>
                <p className="mt-2 text-sm font-medium line-clamp-2">{book.title}</p>
              </button>
            ))
          ) : (
            <p className="col-span-full text-center text-muted-foreground">
              Você não tem livros na sua lista "Quero Ler".
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
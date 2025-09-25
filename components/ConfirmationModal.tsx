"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ConfirmationModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onConfirm: () => void | Promise<void>;
  title: string;
  description: string;
}

const ConfirmationModal = ({
  isOpen,
  onOpenChange,
  onConfirm,
  title,
  description,
}: ConfirmationModalProps) => {
  const handleConfirm = async () => {
    try {
      await onConfirm();

      // 🔔 Toast destrutivo (exclusão)
      toast.error("Livro excluído", {
        description: "O livro foi removido da sua biblioteca.",
      });
    } catch {
      // 🔔 Toast de erro (falha na exclusão)
      toast.error("Erro ao excluir", {
        description: "Não foi possível concluir a exclusão. Tente novamente.",
      });
    } finally {
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>

          <Button variant="destructive" onClick={handleConfirm}>
            Confirmar Exclusão
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationModal;

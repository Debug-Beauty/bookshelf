"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { validateChangePasswordForm } from '@/lib/validators';
import { ShieldAlert } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const DeleteAccountModal = ({ isOpen, onClose, onConfirm }: { isOpen: boolean; onClose: () => void; onConfirm: () => void; }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
            <div className="bg-card rounded-lg shadow-xl p-6 w-full max-w-md m-4 border">
                <div className="flex flex-col items-center text-center">
                    <div className="bg-destructive/10 p-3 rounded-full mb-4">
                        <ShieldAlert className="h-8 w-8 text-destructive" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground">Você tem certeza?</h2>
                    <p className="text-sm text-muted-foreground mt-2">
                        Esta ação é irreversível. Todos os seus dados, incluindo sua biblioteca e preferências, serão permanentemente excluídos.
                    </p>
                </div>
                <div className="mt-6 flex justify-end space-x-3">
                    <Button variant="outline" onClick={onClose}>
                        Cancelar
                    </Button>
                    <Button variant="destructive" onClick={onConfirm}>
                        Sim, excluir conta
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default function PreferenciasPage() {
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [confirmEmailPassword, setConfirmEmailPassword] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const handleEmailChange = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !confirmEmailPassword) {
            toast.error("Por favor, preencha todos os campos para alterar o e-mail.");
            return;
        }
        console.log("Alterando e-mail para:", { email, confirmEmailPassword });
        toast.success("E-mail alterado com sucesso!");
        setEmail('');
        setConfirmEmailPassword('');
    };

    const handlePasswordChange = (e: React.FormEvent) => {
        e.preventDefault();
        const validationError = validateChangePasswordForm({ currentPassword, newPassword, confirmNewPassword });

        if (validationError) {
            toast.error(validationError.message);
            return;
        }

        console.log("Validação OK. Alterando senha...");
        toast.success("Senha alterada com sucesso!");
        setCurrentPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
    };
    
    const confirmDeleteAccount = () => {
        console.log("Excluindo conta...");
        toast.success("Sua conta foi excluída com sucesso.");
        
        localStorage.removeItem('bookshelf_isLoggedIn');
        setIsModalOpen(false); 

        setTimeout(() => {
            router.push('/login');
        }, 1500);
    };

    return (
        <>
            <div className="container mx-auto max-w-2xl py-10 px-4">
                <h1 className="text-3xl font-bold mb-8 text-primary text-center">
                    Minhas Preferências
                </h1>

                <div className="bg-card rounded-lg shadow-md p-6 mb-8 border">
                    <h2 className="text-xl font-semibold mb-4 text-foreground">Alterar E-mail</h2>
                    <form onSubmit={handleEmailChange} className="space-y-4">
                        <div className="space-y-1">
                            <Label htmlFor="email">Novo E-mail</Label>
                            <Input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="confirmEmailPassword">Sua Senha Atual (para confirmar)</Label>
                            <Input type="password" id="confirmEmailPassword" value={confirmEmailPassword} onChange={(e) => setConfirmEmailPassword(e.target.value)} />
                        </div>
                        <div className="flex justify-end">
                            <Button type="submit">Salvar Novo E-mail</Button>
                        </div>
                    </form>
                </div>

                <div className="bg-card rounded-lg shadow-md p-6 mb-8 border">
                    <h2 className="text-xl font-semibold mb-4 text-foreground">Alterar Senha</h2>
                    <form onSubmit={handlePasswordChange} className="space-y-4">
                        <div className="space-y-1">
                            <Label htmlFor="currentPassword">Senha Atual</Label>
                            <Input type="password" id="currentPassword" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="newPassword">Nova Senha</Label>
                            <Input type="password" id="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="confirmNewPassword">Confirmar Nova Senha</Label>
                            <Input type="password" id="confirmNewPassword" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} />
                        </div>
                        <div className="flex justify-end">
                            <Button type="submit">Salvar Nova Senha</Button>
                        </div>
                    </form>
                </div>

                <div className="bg-destructive/10 border-l-4 border-destructive rounded-r-lg p-6">
                    <h2 className="text-xl font-semibold mb-2 text-destructive">Zona de Perigo</h2>
                    <p className="mb-4 text-destructive/90">
                        A exclusão da sua conta é uma ação permanente e todos os seus dados serão perdidos.
                    </p>
                    <div className="flex justify-end">
                        <Button variant="destructive" onClick={() => setIsModalOpen(true)}>
                            Excluir Minha Conta
                        </Button>
                    </div>
                </div>
            </div>

            <DeleteAccountModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={confirmDeleteAccount}
            />
        </>
    );
}
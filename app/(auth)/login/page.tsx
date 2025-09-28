"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Por favor, preencha o e-mail e a senha.');
      return;
    }
    console.log('Tentando fazer login com:', { email, password });
    toast.success('Login realizado com sucesso!');
    
    localStorage.setItem('bookshelf_isLoggedIn', 'true');
    router.push('/');
  };

  return (
    <div className="w-11/12 lg:w-1/4 space-y-8 rounded-xl border bg-card p-8 shadow-lg">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-primary">
          Entrar na sua conta
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Não tem uma conta?{' '}
          <Link href="/register" className="font-medium text-primary hover:underline">
            Cadastre-se
          </Link>
        </p>
      </div>
      
      <form onSubmit={handleLogin} className="space-y-6">
        <div className="space-y-1">
          <Label htmlFor="email">E-mail</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="password">Senha</Label>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div>
          <Button type="submit" className="w-1/2 block mx-auto">
            Entrar
          </Button>
        </div>
      </form>
    </div>
  );
}
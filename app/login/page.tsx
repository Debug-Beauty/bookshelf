"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const LoginPage = () => { 
  const [email, setEmail] = useState('test@test.com');
  const [password, setPassword] = useState('123456');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (email === 'test@test.com' && password === '123456') {
      toast.success('Login de teste bem-sucedido!');
      localStorage.setItem('bookshelf_isLoggedIn', 'true');
      setTimeout(() => {
        router.push('/');
      }, 1500);
      return;
    }

    const storedUser = localStorage.getItem('bookshelf_user');
    
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user.email === email && user.password === password) {
        toast.success('Login bem-sucedido! A redirecionar...');
        localStorage.setItem('bookshelf_isLoggedIn', 'true');
        
        setTimeout(() => {
          router.push('/');
        }, 1500);
        return;
      }
    }
    
    toast.error('Email ou senha inválidos.');
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-gray-800">Login</h1>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-violet-500 focus:border-violet-500"
            />
          </div>
          <div>
            <label htmlFor="password"  className="block text-sm font-medium text-gray-700">
              Senha
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-violet-500 focus:border-violet-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-md shadow-sm transition-colors"
          >
            Entrar
          </button>
        </form>
        <p className="text-sm text-center text-gray-600">
          Não tem uma conta?{' '}
          <a href="/register" className="font-medium text-violet-600 hover:underline">
            Cadastre-se 
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;


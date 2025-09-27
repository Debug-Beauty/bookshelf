"use client";

import { useActionState } from 'react';
import { loginUser, LoginState } from './actions';

export default function LoginPage() {
  const initialState: LoginState = { message: '' };
  const [state, formAction] = useActionState(loginUser, initialState);

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-gray-800">Login</h1>
        
        <form action={formAction} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              // email para teste
              defaultValue="test@test.com"
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-violet-500 focus:border-violet-500"
            />
          </div>
          <div>
            <label htmlFor="password"  className="block text-sm font-medium text-gray-700">
              Senha
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
             // senha para teste
              defaultValue="123456"
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-violet-500 focus:border-violet-500"
            />
          </div>

          {state?.message && (
            <p className="text-sm text-red-600 text-center font-medium">
              {state.message}
            </p>
          )}

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
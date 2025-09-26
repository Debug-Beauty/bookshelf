import { redirect } from 'next/navigation';
import { addUser } from '../../lib/users';

export default function RegisterPage() {

  async function registerUser(formData: FormData) {
    'use server';


    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;


    if (password !== confirmPassword) {
      console.error('As senhas não coincidem!');
     
      return;
    }

    try {
      await addUser({ email, password });
    } catch (error) {
      console.error(error);      
      return;
    }

    redirect('/login');
  }

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-gray-800">Crie a sua Conta</h1>

        <form action={registerUser} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email 
            </label>
            <input
              id="email"
              name="email" 
              type="email"
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
              name="password"
              type="password"
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-violet-500 focus:border-violet-500"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword"  className="block text-sm font-medium text-gray-700">
              Confirme a Senha
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-violet-500 focus:border-violet-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-md shadow-sm transition-colors"
          >
            Registar
          </button>
        </form>
         <p className="text-sm text-center text-gray-600">
          Já tem uma conta?{' '}
          <a href="/login" className="font-medium text-violet-600 hover:underline">
            Faça login
          </a>
        </p>
      </div>
    </div>
  );
}


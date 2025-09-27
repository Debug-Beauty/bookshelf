"use server";

import { redirect } from 'next/navigation';
import { findUserByEmail } from '../../lib/users';

export interface LoginState {
  message: string;
}

export async function loginUser(prevState: LoginState, formData: FormData): Promise<LoginState> {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { message: 'Por favor, preencha todos os campos.' };
  }

  const user = await findUserByEmail(email);

  if (!user || user.password !== password) {
    return { message: 'Email ou senha inválidos.' };
  }

  redirect('/');
}
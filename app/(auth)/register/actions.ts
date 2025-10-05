"use server";

import { redirect } from 'next/navigation';
import { addUser } from '../../../lib/users';
import { validateRegistrationForm } from '../../../lib/validators';

export interface RegisterState {
  message: string;
}

export async function registerUser(
  state: void | RegisterState,
  formData: FormData
): Promise<RegisterState | void> {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirmPassword') as string;

  const validationError = validateRegistrationForm({ email, password, confirmPassword });
  if (validationError) return validationError;

  try {
    await addUser({ email, password });
    redirect('/login');
  } catch (error: any) {
    return { message: error.message };
  }
}

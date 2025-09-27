"use client";

import { useActionState, useState } from 'react';
import { registerUser, RegisterState } from './actions';
import { validateEmail, validateConfirmPassword, checkPasswordStrength } from '../../lib/validators';

const initialPasswordCriteria = {
  hasMinLength: false,
  hasUppercase: false,
  hasLowercase: false,
  hasNumber: false,
  hasSpecialChar: false,
};

export default function RegisterPage() {
  const initialState: RegisterState = { message: '' };
  const [serverState, formAction] = useActionState(registerUser, initialState);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [formErrors, setFormErrors] = useState({
    email: '',
    confirmPassword: '',
  });

  const [passwordCriteria, setPasswordCriteria] = useState(initialPasswordCriteria);

  const handleValidation = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({ ...prev, [name]: value }));
    
    let error = '';
    if (name === 'email') {
      error = validateEmail(value) || '';
      setFormErrors(prev => ({ ...prev, email: error }));
    }
    if (name === 'password') {
      const criteriaMet = checkPasswordStrength(value);
      setPasswordCriteria(criteriaMet);
    }
    if (name === 'confirmPassword') {
      error = validateConfirmPassword(formData.password, value) || '';
      setFormErrors(prev => ({ ...prev, confirmPassword: error }));
    }
  };

  const criteriaLabels = {
    hasMinLength: 'Pelo menos 8 caracteres',
    hasUppercase: 'Pelo menos uma letra maiúscula (A-Z)',
    hasLowercase: 'Pelo menos uma letra minúscula (a-z)',
    hasNumber: 'Pelo menos um número (0-9)',
    hasSpecialChar: 'Pelo menos um caractere especial (!@#$%^&*)',
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-gray-800">Crie a sua Conta</h1>

        <form action={formAction} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input 
              id="email" name="email" type="email" required 
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-violet-500 focus:border-violet-500"
              value={formData.email}
              onChange={handleValidation}
            />
            {formErrors.email && <p className="text-sm text-red-600 mt-1">{formErrors.email}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Senha</label>
            <input 
              id="password" name="password" type="password" required 
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-violet-500 focus:border-violet-500"
              value={formData.password}
              onChange={handleValidation}
            />
            <div className="mt-2 space-y-1">
              {Object.entries(criteriaLabels).map(([key, label]) => (
                <p key={key} className={`text-sm ${passwordCriteria[key as keyof typeof passwordCriteria] ? 'text-green-600' : 'text-gray-500'}`}>
                  {passwordCriteria[key as keyof typeof passwordCriteria] ? '✓' : '•'} {label}
                </p>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirme a Senha</label>
            <input 
              id="confirmPassword" name="confirmPassword" type="password" required 
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-violet-500 focus:border-violet-500"
              value={formData.confirmPassword}
              onChange={handleValidation}
            />
            {formErrors.confirmPassword && <p className="text-sm text-red-600 mt-1">{formErrors.confirmPassword}</p>}
          </div>

          {serverState.message && (
            <p className="text-sm text-red-600 text-center font-medium">
              {serverState.message}
            </p>
          )}

          <button type="submit" className="w-full py-2 px-4 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-md shadow-sm transition-colors">
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
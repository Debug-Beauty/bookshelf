"use client";

import { useActionState, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; 
import { toast } from 'sonner';
import { registerUser, RegisterState } from './actions';
import { validateEmail, validateConfirmPassword, checkPasswordStrength } from '@/lib/validators';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initialPasswordCriteria = {
  hasMinLength: false,
  hasUppercase: false,
  hasLowercase: false,
  hasNumber: false,
  hasSpecialChar: false,
};

export default function RegisterPage() {
  const router = useRouter(); 
  const initialState: RegisterState = { message: '', success: false };
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
  
  useEffect(() => {
    if (serverState?.success) {
      toast.success("Cadastro realizado com sucesso!", {
        description: "Você será redirecionado para a página de login.",
      });
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    }
  }, [serverState, router]);

  const handleValidation = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (name === 'email') {
      setFormErrors(prev => ({ ...prev, email: validateEmail(value) || '' }));
    }
    if (name === 'password') {
      setPasswordCriteria(checkPasswordStrength(value));
      setFormErrors(prev => ({ ...prev, confirmPassword: validateConfirmPassword(value, formData.confirmPassword) || '' }));
    }
    if (name === 'confirmPassword') {
      setFormErrors(prev => ({ ...prev, confirmPassword: validateConfirmPassword(formData.password, value) || '' }));
    }
  };
  
  const criteriaLabels = {
    hasMinLength: 'Pelo menos 8 caracteres',
    hasUppercase: 'Letra maiúscula (A-Z)',
    hasLowercase: 'Letra minúscula (a-z)',
    hasNumber: 'Número (0-9)',
    hasSpecialChar: 'Caractere especial (!@#$%^&*)',
  };

  return (
    <div className="w-11/12 lg:w-1/4 space-y-8 rounded-xl border bg-card p-8 shadow-lg">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-primary">
          Crie a sua Conta
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Já tem uma conta?{' '}
          <Link href="/login" className="font-medium text-primary hover:underline">
            Faça login
          </Link>
        </p>
      </div>

      <form action={formAction} className="space-y-6">
        <div className="space-y-1">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email" name="email" type="email" required 
            value={formData.email}
            onChange={handleValidation}
          />
          {formErrors.email && <p className="text-sm text-destructive mt-1">{formErrors.email}</p>}
        </div>

        <div className="space-y-1">
          <Label htmlFor="password">Senha</Label>
          <Input 
            id="password" name="password" type="password" required 
            value={formData.password}
            onChange={handleValidation}
          />
          <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-x-4">
            {Object.entries(criteriaLabels).map(([key, label]) => (
              <p key={key} className={`text-xs transition-colors duration-200 ${passwordCriteria[key as keyof typeof passwordCriteria] ? 'text-green-600' : 'text-muted-foreground'}`}>
                {passwordCriteria[key as keyof typeof passwordCriteria] ? '✓' : '•'} {label}
              </p>
            ))}
          </div>
        </div>

        <div className="space-y-1">
          <Label htmlFor="confirmPassword">Confirme a Senha</Label>
          <Input 
            id="confirmPassword" name="confirmPassword" type="password" required 
            value={formData.confirmPassword}
            onChange={handleValidation}
          />
          {formErrors.confirmPassword && <p className="text-sm text-destructive mt-1">{formErrors.confirmPassword}</p>}
        </div>

        {serverState?.message && (
          <p className="text-sm text-destructive text-center font-medium">
            {serverState.message}
          </p>
        )}

        <Button type="submit" className="w-1/2 block mx-auto">
          Cadastrar
        </Button>
      </form>
    </div>
  );
}
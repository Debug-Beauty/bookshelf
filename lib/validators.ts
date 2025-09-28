interface FormState {
  message: string;
}

interface RegistrationData {
  email?: string;
  password?: string;
  confirmPassword?: string;
}


export const validateEmail = (email?: string): string | null => {
  if (!email) return 'Por favor, preencha o email.';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return 'Por favor, insira um email válido.';
  return null;
};

export const validateConfirmPassword = (password?: string, confirmPassword?: string): string | null => {
  if (!confirmPassword) return 'Por favor, confirme a senha.';
  if (password !== confirmPassword) return 'As senhas não coincidem.';
  return null;
};

export const checkPasswordStrength = (password?: string) => {
  const p = password || '';
  return {
    hasMinLength: p.length >= 8,
    hasUppercase: /[A-Z]/.test(p),
    hasLowercase: /[a-z]/.test(p),
    hasNumber: /\d/.test(p),
    hasSpecialChar: /[!@#$%^&*]/.test(p),
  };
};

const validatePasswordForServer = (password?: string): string | null => {
  if (!password) return 'Por favor, preencha a senha.';
  const criteria = checkPasswordStrength(password);
  if (Object.values(criteria).some(v => !v)) {
    return 'A senha não atende a todos os critérios de segurança.';
  }
  return null;
};

export function validateRegistrationForm(data: RegistrationData): FormState | null {
  const emailError = validateEmail(data.email);
  if (emailError) return { message: emailError };

  const passwordError = validatePasswordForServer(data.password);
  if (passwordError) return { message: passwordError };

  const confirmPasswordError = validateConfirmPassword(data.password, data.confirmPassword);
  if (confirmPasswordError) return { message: confirmPasswordError };

  return null;
}
interface ChangePasswordData {
  currentPassword?: string;
  newPassword?: string;
  confirmNewPassword?: string;
}

export const validateNewPassword = (password?: string): string | null => {
  if (!password) return 'Por favor, preencha a nova senha.';

  const criteria = checkPasswordStrength(password);
  const errors = [];
  if (!criteria.hasMinLength) errors.push('pelo menos 8 caracteres');
  if (!criteria.hasUppercase) errors.push('uma letra maiúscula');
  if (!criteria.hasLowercase) errors.push('uma letra minúscula');
  if (!criteria.hasNumber) errors.push('um número');
  if (!criteria.hasSpecialChar) errors.push('um caractere especial (!@#$%^&*)');

  if (errors.length > 0) {
    return `A nova senha deve conter: ${errors.join(', ')}.`;
  }

  return null;
};

export function validateChangePasswordForm(data: ChangePasswordData): FormState | null {
  if (!data.currentPassword) {
    return { message: 'Por favor, informe sua senha atual.' };
  }

  const newPasswordError = validateNewPassword(data.newPassword);
  if (newPasswordError) {
    return { message: newPasswordError };
  }

  const confirmPasswordError = validateConfirmPassword(data.newPassword, data.confirmNewPassword);
  if (confirmPasswordError) {
    return { message: confirmPasswordError };
  }

  return null;
}
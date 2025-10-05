import prisma  from './prisma';
import { hash, compare } from 'bcryptjs';

export interface User {
  id: string;
  email: string;
  password: string;
}

export const addUser = async (newUser: Omit<User, 'id'>): Promise<User> => {
  const existing = await prisma.user.findUnique({
    where: { email: newUser.email }
  });

  if (existing) {
    throw new Error('Este email já está em uso. Tente outro.');
  }

  const hashedPassword = await hash(newUser.password, 10);

  const user = await prisma.user.create({
    data: {
      email: newUser.email,
      password: hashedPassword
    }
  });

  return user;
};

export const findUserByEmail = async (email: string): Promise<User | null> => {
  const user = await prisma.user.findUnique({
    where: { email }
  });
  return user;
};

export const validateUser = async (email: string, password: string): Promise<User | null> => {
  const user = await findUserByEmail(email);
  if (!user) return null;

  const isValid = await compare(password, user.password);
  if (!isValid) return null;

  return user;
};

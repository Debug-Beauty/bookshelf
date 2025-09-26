interface User {
  id: string;
  email: string;
  password: string; 
}

const users: User[] = [];

export const addUser = async (newUser: Omit<User, 'id'>): Promise<User> => {
  await new Promise(resolve => setTimeout(resolve, 500));

  if (users.find(user => user.email === newUser.email)) {
    throw new Error('Este email já está em uso.');
  }

  const user = { id: Date.now().toString(), ...newUser };
  users.push(user);
  console.log('Utilizadores no servidor após registo:', users); 
  return user;
};

export const findUserByEmail = async (email: string): Promise<User | undefined> => {
  await new Promise(resolve => setTimeout(resolve, 500));

  const user = users.find(u => u.email === email);
  console.log(`Procurando por ${email}, encontrado:`, user); 
  
  if (user) {
    return user;
  }

  return undefined;
};


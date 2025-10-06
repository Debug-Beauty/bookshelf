interface User {
  id: string;
  email: string;
  password: string; 
}

const users: User[] = [
  {
    id: 'test-user-01',
    email: 'test@test.com',
    password: '123456'
  }
];

export const addUser = async (newUser: Omit<User, 'id'>): Promise<User> => {
  await new Promise(resolve => setTimeout(resolve, 500));

  if (users.find(user => user.email === newUser.email)) {
    throw new Error('Este email já está em uso. Tente outro.');
  }

  const user = { id: Date.now().toString(), ...newUser };
  users.push(user);
  console.log('Usuários no "banco de dados" após registro:', users); 
  return user;
};

export const findUserByEmail = async (email: string): Promise<User | undefined> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const user = users.find(u => u.email === email);
  console.log(`Procurando por ${email}, encontrado:`, user);
  return user;
};

export const deleteUserByEmail = async (email: string): Promise<boolean> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const userIndex = users.findIndex(user => user.email === email);

  if (userIndex === -1) {
    return true; 
  }

  users.splice(userIndex, 1);
  console.log(`Usuário ${email} excluído.`);
  console.log('Usuários restantes no "banco de dados":', users);
  return true;
};
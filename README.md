# 📖 BookShelf: Sua Biblioteca Pessoal Moderna

<p align="center">
  <img src="./public/assets/livros.png" alt="BookShelf Logo" width="200"/>
</p>

<p align="center">
  Um aplicativo web moderno e elegante para gerenciar sua biblioteca pessoal, acompanhar seu progresso de leitura e descobrir novas obras.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-14.x-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-18.x-blue?style=for-the-badge&logo=react&logoColor=white" alt="React" />
<img src="https://img.shields.io/badge/Prisma-5.x-2D3748?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/PostgreSQL-blue?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
</p>

---

## ✨ Funcionalidades

O BookShelf foi projetado para ser intuitivo e poderoso, oferecendo uma experiência completa para os amantes de livros.

-   **📚 Biblioteca Visual:** Visualização de todos os seus livros em um layout de cartões elegante, com capas, títulos, autores e gêneros.
-   **🔍 Busca e Filtragem:** Encontre livros facilmente por título, autor ou gênero.
-   **📊 Dashboard de Leitura:** Acompanhe suas estatísticas, como total de livros, livros lidos, e páginas lidas.
-   **🎯 Metas de Leitura:** Defina e acompanhe suas metas de leitura de forma visual e motivadora.
-   **🔖 Status de Leitura:** Organize seus livros com status como "Quero Ler", "Lendo", "Lido", "Pausado" e "Abandonado".
-   **⭐ Sistema de Avaliação:** Dê notas de 1 a 5 estrelas para os seus livros.
-   **✏️ CRUD Completo:** Adicione, edite e remova livros da sua estante com modais interativos.
-   **🌙 Tema Claro e Escuro:** Alterne entre os temas para uma experiência de leitura mais confortável.
-   **🔐 Autenticação de Usuários:** Sistema de login e registro para proteger sua biblioteca.
-   **⚙️ Preferências de Conta:** Altere seu e-mail, senha e gerencie sua conta.

## 🚀 Tecnologias Utilizadas

Este projeto foi construído com tecnologias do ecossistema JavaScript/TypeScript, garantindo performance e uma ótima experiência de desenvolvimento.

-   **Frontend:**
    -   [Next.js](https://nextjs.org/) (com App Router)
    -   [React](https://react.dev/)
    -   [TypeScript](https://www.typescriptlang.org/)
    -   [Tailwind CSS](https://tailwindcss.com/) para estilização
    -   [shadcn/ui](https://ui.shadcn.com/) para componentes de UI
    -   [Lucide React](https://lucide.dev/) para ícones
    -   [Sonner](https://sonner.emilkowal.ski/) para notificações (toasts)
    -   [Next-Themes](https://github.com/pacocoursey/next-themes) para gerenciamento de temas

-   **Backend:**
    -   [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
    -   [Prisma](https://www.prisma.io/) como ORM para o banco de dados
    -   [PostgreSQL](https://www.postgresql.org/) como banco de dados

-   **Ferramentas de Desenvolvimento:**
    -   [ESLint](https://eslint.org/) para linting
    -   [tsx](https://github.com/esbuild-kit/tsx) para executar scripts TypeScript

## 🏁 Começando

Siga os passos abaixo para executar o projeto em seu ambiente local.

### Pré-requisitos

-   [Node.js](https://nodejs.org/en/) (versão 18.18.0 ou superior)
-   [npm](https://www.npmjs.com/), [yarn](https://yarnpkg.com/), ou [pnpm](https://pnpm.io/)
-   Uma instância do [PostgreSQL](https://www.postgresql.org/download/) rodando

### Instalação

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/seu-usuario/bookshelf.git](https://github.com/seu-usuario/bookshelf.git)
    cd bookshelf
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    # ou
    yarn install
    # ou
    pnpm install
    ```

3.  **Configure as variáveis de ambiente:**
    -   Renomeie o arquivo `.env.example` para `.env`.
    -   Adicione a sua URL de conexão do PostgreSQL no arquivo `.env`:
        ```
        DATABASE_URL="postgresql://USUARIO:SENHA@HOST:PORTA/DATABASE"
        ```

4.  **Aplique as migrações do Prisma:**
    Isso irá criar as tabelas no seu banco de dados com base no schema.
    ```bash
    npx prisma migrate dev
    ```

5.  **Popule o banco de dados (Opcional):**
    Para ter alguns livros pré-cadastrados, execute o script de seed:
    ```bash
    npm run seed
    ```

6.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.

## 📜 Scripts Disponíveis

-   `npm run dev`: Inicia o servidor de desenvolvimento.
-   `npm run build`: Compila a aplicação para produção.
-   `npm run start`: Inicia um servidor de produção.
-   `npm run lint`: Executa o linter para verificar a qualidade do código.
-   `npm run seed`: Popula o banco de dados com os dados do arquivo `database.json`.

## 📂 Estrutura do Projeto

```
/
├── app/                  # Rotas e páginas do Next.js (App Router)
│   ├── (auth)/           # Rotas de autenticação (login, registro)
│   ├── (main)/           # Rotas principais da aplicação
│   ├── api/              # API Routes
│   └── ...
├── components/           # Componentes React reutilizáveis
│   └── ui/               # Componentes do shadcn/ui
├── lib/                  # Funções utilitárias, repositórios, serviços
├── prisma/               # Schema e migrações do Prisma
├── public/               # Arquivos estáticos (imagens, fontes)
├── scripts/              # Scripts de utilidades (ex: seed)
└── ...
```

## ⚖️ Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

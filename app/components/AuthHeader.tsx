import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';

const AuthHeader = () => {
  return (
    <header className="bg-gradient-to-r from-sky-200 to-violet-400 shadow-md dark:from-slate-800 dark:to-slate-900">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <Link href="/" className="text-3xl font-bold text-white dark:text-white">
          Book<span className="text-indigo-600 dark:text-sky-400">Shelf</span>
        </Link>
        <ThemeToggle />
      </div>
    </header>
  );
};

export default AuthHeader;
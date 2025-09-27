import React from 'react';
import { ThemeToggle } from './ThemeToggle';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-sky-200 to-violet-400 shadow-md dark:from-slate-800 dark:to-slate-900">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">
          Book<span className="text-indigo-600 dark:text-sky-400">Shelf</span>
        </h1>
        <ThemeToggle /> 
      </nav>
    </header>
  );
};

export default Header;
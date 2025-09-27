// app/components/Footer.tsx

import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-sky-200 to-violet-400 shadow-inner mt-auto dark:from-slate-800 dark:to-slate-900">
      <div className="container mx-auto px-6 py-4">
        <p className="text-center text-sm text-white dark:text-slate-300">
          © {currentYear} Debug & Beauty - BookShelf. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
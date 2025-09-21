import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-sky-200 to-violet-400 shadow-inner mt-auto">
      <div className="container mx-auto px-6 py-4">
        <p className="text-center text-sm text-white">
          © {currentYear} Debug & Beauty - BookShelf. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
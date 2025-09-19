import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white shadow-inner mt-auto">
      <div className="container mx-auto px-6 py-4">
        <p className="text-center text-sm text-gray-500">
          © {currentYear} Debug & Beauty - BookShelf. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
import React from 'react';

const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-6 py-4">
        <h1 className="text-3xl font-bold text-gray-800">
          Book<span className="text-indigo-600">Shelf</span>
        </h1>
      </nav>
    </header>
  );
};

export default Header;
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { User, BookMarked, LogOut } from 'lucide-react';
import { toast } from 'sonner';

const ProfileMenu = ({ isOpen }: { isOpen: boolean }) => {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('bookshelf_isLoggedIn');
        toast.info("Sessão terminada.");
        
        setTimeout(() => {
          window.location.href = '/login';
        }, 1000);
    };

    return (
        <div className={`absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none transition-all duration-200 ease-out ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`} role="menu">
            <div className="py-1" role="none">
                <a href="/#minha-biblioteca" className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100" role="menuitem">
                    <span className="flex items-center gap-3">                     
                        <BookMarked className="h-4 w-4" /> Minha Estante
                    </span>
                </a>
                <a href="/preferencias" className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100" role="menuitem">
                    <span className="flex items-center gap-3">
                        <User className="h-4 w-4" /> Preferências
                    </span>
                </a>
                <div className="border-t my-1"></div>
                <button
                    onClick={handleLogout}
                    className="w-full text-left text-red-600 block px-4 py-2 text-sm hover:bg-red-50"
                    role="menuitem"
                >
                    <span className="flex items-center gap-3 font-medium">
                        <LogOut className="h-4 w-4" /> Sair
                    </span>
                </button>
            </div>
        </div>
    );
};

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <header className="bg-gradient-to-r from-sky-200 to-violet-400 shadow-inner mt-auto">
            <div className="container mx-auto px-6 py-3 flex justify-between items-center">
                <a href="/" className="text-3xl font-bold text-gray-800">
                    Book<span className="text-violet-600">Shelf</span>
                </a>
                <div className="relative" ref={menuRef}>
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
                    >                        
                        <User className="h-6 w-6 text-gray-600" />
                    </button>
                    <ProfileMenu isOpen={isMenuOpen} />
                </div>
            </div>
        </header>
    );
};

export default Header;


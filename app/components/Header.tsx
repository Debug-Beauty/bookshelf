"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { User, BookMarked, LogOut, CircleUserRound } from 'lucide-react';
import { toast } from 'sonner';
import { ThemeToggle } from './ThemeToggle';

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
        <div 
            className={`absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none transition-all duration-200 ease-out ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`} 
            role="menu"
        >
            <div className="py-1" role="none">
                <a href="/#library" className="text-gray-700 dark:text-gray-200 block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700" role="menuitem">
                    <span className="flex items-center gap-3">
                        <BookMarked className="h-4 w-4" /> Minha Estante
                    </span>
                </a>
                <a href="/preferences" className="text-gray-700 dark:text-gray-200 block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700" role="menuitem">
                    <span className="flex items-center gap-3">
                        <User className="h-4 w-4" /> Preferências
                    </span>
                </a>
                <div className="text-gray-700 dark:text-gray-200 flex justify-between items-center px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700" role="menuitem">
                    <span>Tema</span>
                    <ThemeToggle />
                </div>
                <div className="border-t my-1 dark:border-gray-600"></div>
                <button
                    onClick={handleLogout}
                    className="w-full text-left text-red-600 dark:text-red-400 block px-4 py-2 text-sm hover:bg-red-50 dark:hover:bg-red-900/20"
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
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
   
    return (
        <header className="bg-gradient-to-r from-sky-200 to-violet-400 shadow-md dark:from-slate-800 dark:to-slate-900">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <a href="/" className="text-3xl font-bold text-white dark:text-white">Book<span className="text-indigo-600 dark:text-sky-400">Shelf</span></a>
                
                <div className="relative" ref={menuRef}>
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        <CircleUserRound className="h-6 w-6 text-white dark:text-gray-300" />
                    </button>
                    
                    <ProfileMenu isOpen={isMenuOpen} />
                </div>
            </div>
        </header>
    );
};

export default Header;
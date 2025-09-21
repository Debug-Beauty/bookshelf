"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Library } from 'lucide-react';

const QuickNav = () => {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold text-primary mb-4">Acesso Rápido</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link href="#library" passHref>
          <Button variant="outline" className="w-full justify-start">
            <Library className="mr-2 h-4 w-4" />
            Minha Biblioteca
          </Button>
        </Link>
        
      </div>
    </div>
  );
};

export default QuickNav;
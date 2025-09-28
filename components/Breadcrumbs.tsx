"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbsProps {
  bookTitle?: string;
}

const Breadcrumbs = ({ bookTitle }: BreadcrumbsProps) => {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  const translations: { [key: string]: string } = {
    'book': 'Biblioteca'
  };

  if (segments.length === 0) {
    return null;
  }

  return (
    <nav aria-label="Breadcrumb" className="container mx-auto px-6 py-4">
      <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
        <li>
          <Link href="/" className="hover:text-primary transition-colors">
            Início
          </Link>
        </li>
        {segments.map((segment, index) => {
          const isLast = index === segments.length - 1;
               
          const href = segment === 'book' ? '/#library' : `/${segments.slice(0, index + 1).join('/')}`;
          
          let text = translations[segment] || segment;
          if (isLast && bookTitle) {
            text = bookTitle;
          }

          return (
            <li key={segment} className="flex items-center space-x-2">
              <ChevronRight className="h-4 w-4" />
              {isLast ? (
                <span className="font-semibold text-foreground">{text}</span>
              ) : (
                <Link href={href} className="hover:text-primary transition-colors">
                  {text}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
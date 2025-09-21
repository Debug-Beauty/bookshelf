"use client";

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbsProps {
  bookTitle?: string;
}

const Breadcrumbs = ({ bookTitle }: BreadcrumbsProps) => {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter(segment => segment);

  if (pathSegments.length === 0) {
    return null;
  }

  return (
    <nav aria-label="breadcrumb" className="container mx-auto px-6 py-4">
      <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
        <li>
          <Link href="/" className="hover:text-primary">Início</Link>
        </li>
        {pathSegments.map((segment, index) => {
          const href = `/${pathSegments.slice(0, index + 1).join('/')}`;
          const isLast = index === pathSegments.length - 1;
          
          let segmentDisplay = decodeURIComponent(segment);
          if (isLast && segment === "book" && pathSegments.length > 1) {
             segmentDisplay = "Livro";
          } else if (isLast && pathSegments[index - 1] === "book" && bookTitle) {
            segmentDisplay = bookTitle;
          }

          return (
            <li key={href} className="flex items-center space-x-2">
              <ChevronRight className="h-4 w-4" />
              {isLast ? (
                <span className="font-semibold text-foreground">{segmentDisplay}</span>
              ) : (
                <Link href={href} className="hover:text-primary">{segmentDisplay}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
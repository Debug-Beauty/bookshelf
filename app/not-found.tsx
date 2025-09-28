import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center px-6 py-8">
            <div className="max-w-md w-full">
                <Image
                    src="/assets/livros.png"
                    alt="Ilustração de livros empilhados"
                    width={250}
                    height={250}
                    className="mx-auto mb-8"
                    priority
                    quality={100} 
                />

                <h1 className="text-6xl font-extrabold text-primary tracking-tighter">
                    404
                </h1>
                <h2 className="text-2xl font-semibold mt-4 mb-2 text-foreground">
                    Página Não Encontrada
                </h2>
                <p className="text-muted-foreground mb-8">
                    Oops! Parece que o livro ou a página que você procura não está na nossa estante.
                </p>

                <Link href="/" passHref>
                    <Button>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Voltar para a Biblioteca
                    </Button>
                </Link>
            </div>
        </div>
    );
}
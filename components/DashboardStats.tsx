"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookCheck, BookOpen, FileDigit } from "lucide-react";
import React from "react";
import { Book, READING_STATUS } from "@/lib/types";
import { Book as BookIcon } from "lucide-react";

interface DashboardStatsProps {
    library: Book[];
}

const StatCard = ({ title, value, icon }: { title: string, value: string | number, icon: React.ReactNode }) => (
    <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            {icon}
        </CardHeader>
        <CardContent>
            <div className="text-2xl font-bold">{value}</div>
        </CardContent>
    </Card>
);

const DashboardStats = ({ library }: DashboardStatsProps) => {
    const totalBooks = library.length;
    const readingBooks = library.filter(book => book.status === READING_STATUS.LENDO).length;
    const finishedBooks = library.filter(book => book.status === READING_STATUS.LIDO).length;
    
    const totalPagesRead = library
        .filter(book => book.status === READING_STATUS.LIDO) 
        .reduce((sum, book) => sum + (book.pages || 0), 0); 

    return (
        <div className="mb-8">
            <h2 className="text-3xl font-bold text-primary mb-6">Dashboard</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    title="Total de Livros"
                    value={totalBooks}
                    icon={<BookIcon className="h-4 w-4 text-primary" />}
                />
                <StatCard
                    title="Lendo Atualmente"
                    value={readingBooks}
                    icon={<BookOpen className="h-4 w-4 text-primary" />}
                />
                <StatCard
                    title="Livros Finalizados"
                    value={finishedBooks}
                    icon={<BookCheck className="h-4 w-4 text-primary" />}
                />
                <StatCard
                    title="Páginas Lidas"
                    value={totalPagesRead.toLocaleString('pt-BR')}
                    icon={<FileDigit className="h-4 w-4 text-primary" />}
                />
            </div>
        </div>
    );
};

export default DashboardStats;
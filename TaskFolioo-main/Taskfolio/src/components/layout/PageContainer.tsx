
import React from 'react';
import { cn } from '@/lib/utils';
import Navbar from './Navbar';

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

const PageContainer: React.FC<PageContainerProps> = ({ children, className }) => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className={cn("flex-1 container mx-auto px-4 py-6 md:py-8", className)}>
        {children}
      </main>
    </div>
  );
};

export default PageContainer;

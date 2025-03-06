
import React from 'react';
import { Link } from 'react-router-dom';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  linkText: string;
  linkTo: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  title,
  subtitle,
  linkText,
  linkTo
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-background">
      <div className="w-full max-w-md space-y-8 animate-fade-in">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            {title}
          </h1>
          <p className="mt-3 text-muted-foreground">
            {subtitle}
          </p>
        </div>
        
        <div className="bg-card rounded-2xl shadow-sm border p-8 animate-scale-in">
          {children}
          
          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>
              {linkText}{' '}
              <Link to={linkTo} className="font-medium text-primary hover:text-primary/90 transition-colors">
                Click here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;

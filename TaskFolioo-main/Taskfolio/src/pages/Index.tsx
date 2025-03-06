
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const Index: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="max-w-3xl mx-auto text-center animate-fade-in">
        <div className="mb-8 flex items-center justify-center">
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="32" 
              height="32" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="text-primary"
            >
              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          </div>
        </div>

        <h1 className="text-4xl font-bold mb-4 tracking-tight md:text-5xl">Taskfolio</h1>
        <p className="text-muted-foreground text-xl mb-8 max-w-2xl mx-auto">
          A clean, minimalist task management system to help you organize your workflow and boost productivity.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {isAuthenticated ? (
            <Button asChild size="lg" className="h-12 px-8">
              <Link to="/dashboard">Go to Dashboard</Link>
            </Button>
          ) : (
            <>
              <Button asChild size="lg" className="h-12 px-8">
                <Link to="/login">Sign In</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 px-8">
                <Link to="/register">Create Account</Link>
              </Button>
            </>
          )}
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto text-left">
          <div className="bg-card rounded-xl p-6 border shadow-sm transition-all duration-200 hover:shadow-md animate-slide-up">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="M3 9h18" />
                <path d="M9 21V9" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold mb-2">Organize Tasks</h2>
            <p className="text-muted-foreground">
              Create, edit, and organize your tasks with an intuitive and clean interface.
            </p>
          </div>

          <div className="bg-card rounded-xl p-6 border shadow-sm transition-all duration-200 hover:shadow-md animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="M8 12h8" />
                <path d="M12 8v8" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold mb-2">Track Progress</h2>
            <p className="text-muted-foreground">
              Mark tasks as pending, in progress, or completed to track your productivity.
            </p>
          </div>

          <div className="bg-card rounded-xl p-6 border shadow-sm transition-all duration-200 hover:shadow-md animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                <path d="M12 6v6l4 2" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold mb-2">Set Due Dates</h2>
            <p className="text-muted-foreground">
              Assign due dates to your tasks and never miss a deadline again.
            </p>
          </div>
        </div>
      </div>

      <footer className="bg-gray-800 text-white  mt-10">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        <div className="w-full md:w-1/3 text-center md:text-left mb-4 md:mb-0">
          <h2 className="text-lg font-bold">Company Name</h2>
          <p className="text-sm">© 2025 Er Pradeep Sahani. All rights reserved.</p>
        </div>

        <div className="w-full md:w-1/3 text-center mb-4 md:mb-0">
          <h2 className="text-lg font-bold">Navigation</h2>
          
        </div>

        <div className="w-full md:w-1/3 text-center md:text-right">
          <h2 className="text-lg font-bold">Follow Us</h2>
          <div className="flex justify-center md:justify-end mt-2">
            <a href="#" className="text-white mx-2 hover:text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.5c-.9.4-1.8.6-2.8.8 1-1 1.8-2.3 2.2-3.6-.9.5-1.9.9-2.9 1.1-1-1-2.3-1.6-3.7-1.6-2.8 0-5 2.2-5 5 0 .4 0 .7.1 1-4.2-.2-7.9-2.2-10.3-5.3-.4.7-.5 1.5-.5 2.3 0 1.6.8 3 2.1 3.9-.8 0-1.5-.2-2.2-.6v.1c0 2.3 1.6 4.3 3.8 4.7-.4.1-.8.2-1.2.2-.3 0-.6 0-.9-.1.6 1.9 2.4 3.3 4.4 3.3-1.6 1.2-3.6 1.9-5.7 1.9H0c2 1.3 4.5 2 7 2 8.4 0 13-7 13-13.1 0-.2 0-.5 0-.7.9-.6 1.7-1.4 2.3-2.3z"/>
              </svg>
            </a>
            <a href="#" className="text-white mx-2 hover:text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.2c-5.4 0-9.8 4.4-9.8 9.8 0 4.2 2.7 7.8 6.5 9.1-.1-.8-.2-2 .1-2.9.2-.5 1.3-3.6 1.3-3.6s-.3-.6-.3-1.5c0-1.4.8-2.4 1.8-2.4.8 0 1.2.6 1.2 1.4 0 .8-.5 2-1 3.1-.3.8.2 1.4.8 1.4 1 0 1.8-1 2.2-2.5.5-1.4.9-2.9.9-3.9 0-2-.9-3.5-3.4-3.5-2.6 0-4.2 1.9-4.2 4.1 0 .7.2 1.1.6 1.5.2.2.2.3.2.6 0 .2-.1.7-.2.8-.1.2-.3.3-.5.2-1.1-.4-1.5-1.4-1.5-2.6 0-2.1 1.5-4.1 4.5-4.1 2.4 0 4.2 1.7 4.2 4.1 0 2.4-1.4 4.2-3.3 4.2-.7 0-1.4-.4-1.6-1 .2-.5 1-2.5 1-3.3 0-.9-.5-1.6-1.4-1.6-1.1 0-2 1.1-2 2.6 0 .8.3 1.3.3 1.3s-1.1 4.5-1.3 5.2c-.2.7-.1 1.8-.1 2.6-3.8-1.3-6.5-4.9-6.5-9.1 0-5.4 4.4-9.8 9.8-9.8 5.4 0 9.8 4.4 9.8 9.8 0 4.3-2.7 7.9-6.5 9.1.1-.8.2-2 .1-2.9-.2-.5-1.3-3.6-1.3-3.6s.3-.6.3-1.5c0-1.4-.8-2.4-1.8-2.4-.8 0-1.2.6-1.2 1.4 0 .8.5 2 1 3.1.3.8-.2 1.4-.8 1.4-1 0-1.8-1-2.2-2.5-.5-1.4-.9-2.9-.9-3.9 0-2 .9-3.5 3.4-3.5 2.6 0 4.2 1.9 4.2 4.1 0 .7-.2 1.1-.6 1.5-.2.2-.2.3-.2.6 0 .2.1.7.2.8.1.2.3.3.5.2 1.1-.4 1.5-1.4 1.5-2.6 0-2.1-1.5-4.1-4.5-4.1-2.4 0-4.2 1.7-4.2 4.1 0 2.4 1.4 4.2 3.3 4.2.7 0 1.4-.4 1.6-1-.2-.5-1-2.5-1-3.3 0-.9.5-1.6 1.4-1.6 1.1 0 2 1.1 2 2.6 0 .8-.3 1.3-.3 1.3s1.1 4.5 1.3 5.2c.2.7.1 1.8.1 2.6 3.8-1.3 6.5-4.9 6.5-9.1 0-5.4-4.4-9.8-9.8-9.8z"/>
              </svg>
            </a>
            <a href="#" className="text-white mx-2 hover:text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.6 3H4.4C3 3 2 4 2 5.4v13.3C2 20 3 21 4.4 21h15.2c1.4 0 2.4-1 2.4-2.4V5.4c0-1.4-1-2.4-2.4-2.4zM8.8 16.7H6.2V10h2.6v6.7zm-1.3-7.7c-.8 0-1.3-.6-1.3-1.3 0-.8.6-1.3 1.3-1.3.8 0 1.3.6 1.3 1.3 0 .7-.6 1.3-1.3 1.3zm10.2 7.7h-2.6v-3.6c0-2.6-3.2-2.4-3.2 0v3.6H9.2V10h2.6v1h.1c1.1-2 5.4-2.1 5.4 1.8v4.9z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
    </div>
  );
};

export default Index;

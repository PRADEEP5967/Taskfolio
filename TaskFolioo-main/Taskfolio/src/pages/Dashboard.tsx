
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import PageContainer from '@/components/layout/PageContainer';
import TaskList from '@/components/tasks/TaskList';

const Dashboard: React.FC = () => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const navigate = useNavigate();
  
  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <PageContainer>
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <div className="inline-block bg-primary/10 rounded-lg px-3 py-1 text-sm font-medium text-primary mb-2">
            Dashboard
          </div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">My Tasks</h1>
          <p className="text-muted-foreground">
            Manage your tasks and stay organized
          </p>
        </header>
        
        <TaskList />
      </div>
    </PageContainer>
  );
};

export default Dashboard;

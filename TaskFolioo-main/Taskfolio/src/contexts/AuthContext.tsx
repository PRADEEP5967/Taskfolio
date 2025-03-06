
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from "sonner";

// Define types
export interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock data for demo purposes - in a real app this would connect to your API
const MOCK_USERS = [
  {
    id: '1',
    name: 'Demo User',
    email: 'demo@example.com',
    password: 'password123'
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Check if user is already logged in on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('taskUser');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('taskUser');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Find user in mock data
      const foundUser = MOCK_USERS.find(u => 
        u.email === email && u.password === password
      );
      
      if (!foundUser) {
        throw new Error('Invalid email or password');
      }
      
      // Create user object without password
      const { password: _, ...userWithoutPassword } = foundUser;
      
      // Store in state and localStorage
      setUser(userWithoutPassword);
      localStorage.setItem('taskUser', JSON.stringify(userWithoutPassword));
      
      toast.success("Login successful", {
        description: `Welcome back, ${userWithoutPassword.name}!`,
      });
    } catch (error) {
      toast.error("Login failed", {
        description: error instanceof Error ? error.message : "An unknown error occurred",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if email already exists
      if (MOCK_USERS.some(u => u.email === email)) {
        throw new Error('Email already in use');
      }
      
      // Create new user (in real app, this would be an API call)
      const newUser = {
        id: String(MOCK_USERS.length + 1),
        name,
        email,
        password
      };
      
      // Add to mock data (for demo purposes only)
      MOCK_USERS.push(newUser);
      
      // Create user object without password
      const { password: _, ...userWithoutPassword } = newUser;
      
      // Store in state and localStorage
      setUser(userWithoutPassword);
      localStorage.setItem('taskUser', JSON.stringify(userWithoutPassword));
      
      toast.success("Registration successful", {
        description: `Welcome, ${name}!`,
      });
    } catch (error) {
      toast.error("Registration failed", {
        description: error instanceof Error ? error.message : "An unknown error occurred",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('taskUser');
    toast.success("Logged out successfully");
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      isAuthenticated: !!user,
      login,
      register,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

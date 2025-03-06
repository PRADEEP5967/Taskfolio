
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { toast } from "sonner";
import { useAuth } from './AuthContext';

// Define task types
export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  dueDate: string | null;
  userId: string;
  createdAt: string;
}

export type TaskFilter = 'all' | 'pending' | 'in-progress' | 'completed';

// Define action types
type TaskAction =
  | { type: 'INIT_TASKS'; payload: Task[] }
  | { type: 'ADD_TASK'; payload: Task }
  | { type: 'UPDATE_TASK'; payload: Task }
  | { type: 'DELETE_TASK'; payload: string }
  | { type: 'SET_FILTER'; payload: TaskFilter };

// Define the state type
interface TaskState {
  tasks: Task[];
  filter: TaskFilter;
  isLoading: boolean;
}

// Create the context
interface TaskContextType extends TaskState {
  addTask: (task: Omit<Task, 'id' | 'userId' | 'createdAt'>) => Promise<void>;
  updateTask: (id: string, updates: Partial<Omit<Task, 'id' | 'userId' | 'createdAt'>>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  setFilter: (filter: TaskFilter) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

// Create a reducer to handle state updates
const taskReducer = (state: TaskState, action: TaskAction): TaskState => {
  switch (action.type) {
    case 'INIT_TASKS':
      return {
        ...state,
        tasks: action.payload,
        isLoading: false
      };
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [...state.tasks, action.payload]
      };
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task => 
          task.id === action.payload.id ? action.payload : task
        )
      };
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload)
      };
    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload
      };
    default:
      return state;
  }
};

// Mock tasks for demo purposes
const MOCK_TASKS: Task[] = [
  {
    id: '1',
    title: 'Complete project documentation',
    description: 'Write comprehensive documentation for the current project',
    status: 'in-progress',
    dueDate: '2023-12-15',
    userId: '1',
    createdAt: '2023-11-28T10:30:00.000Z'
  },
  {
    id: '2',
    title: 'Review pull requests',
    description: 'Review pending pull requests from the team',
    status: 'pending',
    dueDate: '2023-12-10',
    userId: '1',
    createdAt: '2023-11-29T14:15:00.000Z'
  },
  {
    id: '3',
    title: 'Update dependencies',
    description: 'Update all project dependencies to their latest versions',
    status: 'completed',
    dueDate: '2023-12-05',
    userId: '1',
    createdAt: '2023-11-27T09:45:00.000Z'
  }
];

// Provider component
export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  
  const initialState: TaskState = {
    tasks: [],
    filter: 'all',
    isLoading: true
  };
  
  const [state, dispatch] = useReducer(taskReducer, initialState);

  // Load tasks from localStorage or API when component mounts or user changes
  useEffect(() => {
    if (user) {
      // In a real app, we would fetch from an API here
      // For now, we'll use local storage and our mock data for demo
      const loadTasks = async () => {
        try {
          const storedTasks = localStorage.getItem(`tasks_${user.id}`);
          
          if (storedTasks) {
            dispatch({ type: 'INIT_TASKS', payload: JSON.parse(storedTasks) });
          } else {
            // Use mock data for initial demonstration
            dispatch({ type: 'INIT_TASKS', payload: MOCK_TASKS });
            localStorage.setItem(`tasks_${user.id}`, JSON.stringify(MOCK_TASKS));
          }
        } catch (error) {
          console.error('Failed to load tasks:', error);
          toast.error("Failed to load tasks", {
            description: "We couldn't load your tasks. Please try again later.",
          });
          dispatch({ type: 'INIT_TASKS', payload: [] });
        }
      };

      loadTasks();
    } else {
      // If no user, reset tasks
      dispatch({ type: 'INIT_TASKS', payload: [] });
    }
  }, [user]);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    if (user && !state.isLoading) {
      localStorage.setItem(`tasks_${user.id}`, JSON.stringify(state.tasks));
    }
  }, [state.tasks, user, state.isLoading]);

  // API methods
  const addTask = async (taskData: Omit<Task, 'id' | 'userId' | 'createdAt'>) => {
    if (!user) {
      toast.error("Authentication required", {
        description: "You need to be logged in to add tasks."
      });
      return;
    }

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newTask: Task = {
        ...taskData,
        id: Date.now().toString(),
        userId: user.id,
        createdAt: new Date().toISOString()
      };
      
      dispatch({ type: 'ADD_TASK', payload: newTask });
      
      toast.success("Task added", {
        description: `"${taskData.title}" has been added to your tasks.`
      });
    } catch (error) {
      toast.error("Failed to add task", {
        description: error instanceof Error ? error.message : "An unknown error occurred"
      });
    }
  };

  const updateTask = async (id: string, updates: Partial<Omit<Task, 'id' | 'userId' | 'createdAt'>>) => {
    if (!user) {
      toast.error("Authentication required", {
        description: "You need to be logged in to update tasks."
      });
      return;
    }

    try {
      // Find the task to update
      const taskToUpdate = state.tasks.find(task => task.id === id);
      
      if (!taskToUpdate) {
        throw new Error('Task not found');
      }
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedTask: Task = {
        ...taskToUpdate,
        ...updates
      };
      
      dispatch({ type: 'UPDATE_TASK', payload: updatedTask });
      
      toast.success("Task updated", {
        description: `"${updatedTask.title}" has been updated.`
      });
    } catch (error) {
      toast.error("Failed to update task", {
        description: error instanceof Error ? error.message : "An unknown error occurred"
      });
    }
  };

  const deleteTask = async (id: string) => {
    if (!user) {
      toast.error("Authentication required", {
        description: "You need to be logged in to delete tasks."
      });
      return;
    }

    try {
      // Find the task to delete (for the success message)
      const taskToDelete = state.tasks.find(task => task.id === id);
      
      if (!taskToDelete) {
        throw new Error('Task not found');
      }
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      dispatch({ type: 'DELETE_TASK', payload: id });
      
      toast.success("Task deleted", {
        description: `"${taskToDelete.title}" has been deleted.`
      });
    } catch (error) {
      toast.error("Failed to delete task", {
        description: error instanceof Error ? error.message : "An unknown error occurred"
      });
    }
  };

  const setFilter = (filter: TaskFilter) => {
    dispatch({ type: 'SET_FILTER', payload: filter });
  };

  return (
    <TaskContext.Provider value={{
      ...state,
      addTask,
      updateTask,
      deleteTask,
      setFilter
    }}>
      {children}
    </TaskContext.Provider>
  );
};

// Custom hook to use the task context
export const useTask = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
};

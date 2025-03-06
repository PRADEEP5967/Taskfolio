
import React, { useState } from 'react';
import { useTask, Task, TaskFilter } from '@/contexts/TaskContext';
import TaskCard from './TaskCard';
import TaskForm from './TaskForm';
import TaskFilters from './TaskFilters';
import { Button } from '@/components/ui/button';
import { Plus, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const TaskList: React.FC = () => {
  const { tasks, filter, isLoading, addTask, updateTask, deleteTask, setFilter } = useTask();
  
  const [taskFormOpen, setTaskFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);
  
  // Filter tasks based on current filter
  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    return task.status === filter;
  });
  
  // Sort tasks: completed at the bottom, then by due date (earlier first)
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    // Completed tasks go at the bottom
    if (a.status === 'completed' && b.status !== 'completed') return 1;
    if (a.status !== 'completed' && b.status === 'completed') return -1;
    
    // Sort by due date, null dates at the bottom
    if (a.dueDate && b.dueDate) {
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    }
    if (a.dueDate && !b.dueDate) return -1;
    if (!a.dueDate && b.dueDate) return 1;
    
    // If both don't have due dates or are both completed, sort by created date
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const handleAddTask = () => {
    setEditingTask(undefined);
    setTaskFormOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setTaskFormOpen(true);
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await deleteTask(id);
    } catch (error) {
      // Error is handled in the task context
    }
  };

  const handleStatusChange = async (id: string, status: 'pending' | 'in-progress' | 'completed') => {
    try {
      await updateTask(id, { status });
    } catch (error) {
      // Error is handled in the task context
    }
  };

  const handleTaskSubmit = async (taskData: Omit<Task, 'id' | 'userId' | 'createdAt'>) => {
    try {
      if (editingTask) {
        await updateTask(editingTask.id, taskData);
      } else {
        await addTask(taskData);
      }
    } catch (error) {
      // Error is handled in the task context
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <Loader2 className="h-8 w-8 text-primary animate-spin mb-4" />
        <p className="text-muted-foreground">Loading tasks...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <TaskFilters currentFilter={filter} onFilterChange={setFilter} />
        
        <Button onClick={handleAddTask} className="w-full sm:w-auto whitespace-nowrap">
          <Plus className="h-5 w-5 mr-1" />
          Add Task
        </Button>
      </div>
      
      {sortedTasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 px-4 text-center animate-fade-in">
          <div className="bg-muted/50 rounded-full p-4 mb-4">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="40" 
              height="40" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="text-muted-foreground"
            >
              <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
              <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
              <path d="M12 11h4" />
              <path d="M12 16h4" />
              <path d="M8 11h.01" />
              <path d="M8 16h.01" />
            </svg>
          </div>
          <h3 className="text-xl font-medium mb-2">No tasks found</h3>
          <p className="text-muted-foreground mb-6 max-w-md">
            {filter === 'all' 
              ? "You don't have any tasks yet. Click the button below to create your first task." 
              : `You don't have any ${filter} tasks. Change the filter or add a new task.`}
          </p>
          <Button onClick={handleAddTask}>
            <Plus className="h-5 w-5 mr-1" />
            Add Your First Task
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 animate-fade-in">
          {sortedTasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>
      )}
      
      {/* Task form dialog */}
      <TaskForm
        open={taskFormOpen}
        onClose={() => setTaskFormOpen(false)}
        onSubmit={handleTaskSubmit}
        initialData={editingTask}
        mode={editingTask ? 'edit' : 'create'}
      />
    </div>
  );
};

export default TaskList;

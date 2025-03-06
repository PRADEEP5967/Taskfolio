
import React from 'react';
import { format, parseISO } from 'date-fns';
import { 
  CheckCircle, 
  Circle, 
  Trash2, 
  Edit, 
  Clock, 
  AlertCircle
} from 'lucide-react';
import { Task } from '@/contexts/TaskContext';
import { formatDate, isOverdue } from '@/utils/dateUtils';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: 'pending' | 'in-progress' | 'completed') => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onEdit,
  onDelete,
  onStatusChange
}) => {
  const handleStatusToggle = () => {
    if (task.status === 'completed') {
      onStatusChange(task.id, 'pending');
    } else {
      onStatusChange(task.id, 'completed');
    }
  };

  const isTaskOverdue = task.dueDate && isOverdue(task.dueDate, task.status);
  
  const statusColor = {
    pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'in-progress': 'bg-blue-100 text-blue-800 border-blue-200',
    completed: 'bg-green-100 text-green-800 border-green-200'
  };

  return (
    <div 
      className={cn(
        "bg-card p-5 rounded-xl border shadow-sm task-card-shadow transition-all hover:shadow-md",
        {
          "opacity-75": task.status === 'completed',
          "border-red-200 bg-red-50": isTaskOverdue
        }
      )}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <button 
            onClick={handleStatusToggle}
            className="focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-full transition-all duration-200"
          >
            {task.status === 'completed' ? (
              <CheckCircle className="h-6 w-6 text-green-500" />
            ) : (
              <Circle className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" />
            )}
          </button>
          <h3 className={cn(
            "font-medium text-lg transition-colors",
            task.status === 'completed' && "text-muted-foreground line-through"
          )}>
            {task.title}
          </h3>
        </div>
        
        <span className={cn(
          "px-2.5 py-0.5 rounded-full text-xs font-medium border",
          statusColor[task.status]
        )}>
          {task.status === 'in-progress' ? 'In Progress' : task.status.charAt(0).toUpperCase() + task.status.slice(1)}
        </span>
      </div>
      
      {task.description && (
        <p className={cn(
          "text-muted-foreground text-sm mb-4",
          task.status === 'completed' && "line-through opacity-75"
        )}>
          {task.description}
        </p>
      )}
      
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center text-sm">
          {task.dueDate ? (
            <div className={cn(
              "flex items-center",
              isTaskOverdue ? "text-red-600" : "text-muted-foreground"
            )}>
              {isTaskOverdue ? (
                <AlertCircle className="h-4 w-4 mr-1" />
              ) : (
                <Clock className="h-4 w-4 mr-1" />
              )}
              <span>
                {isTaskOverdue ? 'Overdue: ' : ''}
                {formatDate(task.dueDate)}
              </span>
            </div>
          ) : (
            <span className="text-muted-foreground">No due date</span>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit(task)}
            className="h-8 w-8 rounded-full hover:bg-secondary"
          >
            <Edit className="h-4 w-4" />
            <span className="sr-only">Edit</span>
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(task.id)}
            className="h-8 w-8 rounded-full hover:bg-secondary text-destructive hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Delete</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;

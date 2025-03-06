
import React from 'react';
import { TaskFilter } from '@/contexts/TaskContext';
import { Button } from '@/components/ui/button';
import { CheckCircle, Circle, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TaskFiltersProps {
  currentFilter: TaskFilter;
  onFilterChange: (filter: TaskFilter) => void;
}

const TaskFilters: React.FC<TaskFiltersProps> = ({ currentFilter, onFilterChange }) => {
  // Filter options
  const filters: { value: TaskFilter; label: string; icon: React.ReactNode }[] = [
    {
      value: 'all',
      label: 'All',
      icon: (
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.5 3C1.22386 3 1 3.22386 1 3.5C1 3.77614 1.22386 4 1.5 4H13.5C13.7761 4 14 3.77614 14 3.5C14 3.22386 13.7761 3 13.5 3H1.5ZM1.5 7C1.22386 7 1 7.22386 1 7.5C1 7.77614 1.22386 8 1.5 8H13.5C13.7761 8 14 7.77614 14 7.5C14 7.22386 13.7761 7 13.5 7H1.5ZM1 11.5C1 11.2239 1.22386 11 1.5 11H13.5C13.7761 11 14 11.2239 14 11.5C14 11.7761 13.7761 12 13.5 12H1.5C1.22386 12 1 11.7761 1 11.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
        </svg>
      ),
    },
    {
      value: 'pending',
      label: 'Pending',
      icon: <Circle className="h-4 w-4" />,
    },
    {
      value: 'in-progress',
      label: 'In Progress',
      icon: <Clock className="h-4 w-4" />,
    },
    {
      value: 'completed',
      label: 'Completed',
      icon: <CheckCircle className="h-4 w-4" />,
    },
  ];

  return (
    <div className="flex items-center space-x-2 overflow-x-auto pb-2 w-full sm:w-auto">
      {filters.map((filter) => (
        <Button
          key={filter.value}
          variant={currentFilter === filter.value ? 'default' : 'outline'}
          size="sm"
          onClick={() => onFilterChange(filter.value)}
          className={cn(
            "h-9 transition-all",
            currentFilter === filter.value 
              ? "" 
              : "hover:bg-secondary text-muted-foreground"
          )}
        >
          <span className="mr-1.5">{filter.icon}</span>
          {filter.label}
        </Button>
      ))}
    </div>
  );
};

export default TaskFilters;
